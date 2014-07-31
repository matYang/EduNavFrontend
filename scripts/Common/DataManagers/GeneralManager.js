//该模块为用户，合作伙伴，管理员的通用接口
//该模块用来拉取课程，地址，分类等公开信息

(function () {
    

    var addToQueue = function(queue, reference){
        var i = 0;
        //if there is an empty spot in queue, insert the funcPtr to that spot, return index
        for (i = 0; i < queue.length; i++){
            if (queue[i] === null){
                queue[i] = reference;
                return i;
            }
        }
        //if no empty spot in queue, append the funcPtr, return index
        queue.push(reference);
        return (queue.length - 1);
    };
    
    //判断是否需要重新拉取地区/分类信息
    var shouldReload = function(timeStamp) {
        if (typeof timeStamp === 'undefined'){
            return true;
        }
        var expireTime = 3600*1000,   //expires in 1 hours
            curTime = new Date(),
            timeDiff = curTime.getTime() - timeStamp.getTime();
        
        return timeDiff >= expireTime;
    };

    this.GeneralManager = function(sessionManager){
        this.sessionManager = sessionManager;
        this.sessionManager.registerManager(this);

        this.categoryList = [];
        this.locationList = [];

        this.categoryQueue = [];
        this.locationQueue = [];

        this.categoryTimeStamp = new Date();
        this.locationTimeStamp = new Date();
    };

    //reset the manager state upon logout
    GeneralManager.prototype.release = function() {};

    //根据ID拉取单个课程
    GeneralManager.prototype.fetchCourse = function (id, callback) {
        var cache = app.cache.get("course", id);
        if (cache) {
            if(callback){
                callback.success(new Course(cache, {parse: true}));
                return;
            }
        }
        var course = new Course();
        if (testMockObj.testMode) {
            callback.success(testMockObj.testCourses.get(id));
            return;
        }
        course.overrideUrl(ApiResource.general_course);
        course.set('id', id);
        course.fetch({
            dataType:'json',

            success:function(model, response){
                if(callback){
                    callback.success(model);
                    app.cache.set("course", id, course.toJSON()); //course很少会发生变化，所以缓存起来
                }
            },

            error: function(model, response){
                Info.warn('fetch course failed');
                Info.warn(response);
                if(callback){
                    callback.error(response);
                }
            }
        });
    };

    //根据ID列表批量拉取单个课程
    GeneralManager.prototype.batchFetchCourses = function (ids, callback) {
        var cache, i, requestList = [], courses = new Courses();
        if (testMockObj.testMode) {
            for (var i = 0; i < ids.length; i++) {
                courses.add(testMockObj.testCourses.get(ids[i]));
            }
            callback.success(courses);
            return;
        }
        //优先检查缓存里课程是否已经存在，仅重新拉取过期或者不存在的课程
        for (i = 0; i < ids.length; i++) {
            cache = app.cache.get("course", ids[i]);
            if (cache) {
                courses.add(new Course(cache, {parse: true}));
            } else {
                requestList.push(ids[i]); //根据缓存那内容重新建立拉取列表
            }
        }
        if (requestList.length === 0) {
            if(callback){
                callback.success(courses);
            }
            return;
        }
        var requestCourses = new Courses();
        requestCourses.overrideUrl(ApiResource.general_courseByIdList);
        var idList = "idList=" + requestList.join("-");
        requestCourses.fetch({
            dataType:'json',
            data: idList,
            success:function(response, model){
                if (callback) {
                    var array = requestCourses.toArray(), i = 0;
                    for (i = 0; i < array.length; i++ ) {
                        app.cache.set("course", array[i].get("id"), array[i].toJSON());
                    }
                    courses.add(array);
                    // app.storage.setCoursesToCompare(courses.pluck("courseId"));
                    callback.success(courses);
                }
            },

            error: function(model, response){
                Info.warn('fetch course failed');
                Info.warn(response);
                if(callback){
                    callback.error(response);
                }
            }
        });
    };

    //根据搜索条件搜索课程
    //具体条件参考CourseSearchRepresentation.js
    GeneralManager.prototype.findCourse = function(courseSearchRepresentation, callback) {
        var self = this, cache, i, requestList = [], searchResults = new Courses();
        if (!(courseSearchRepresentation instanceof Backbone.Model)){
            Info.warn('GeneralManager::findCourse invalid parameter, exit');
            return;
        }
        cache = app.cache.get("queryCourse", courseSearchRepresentation.toQueryString());
        if (cache) {
            this.batchFetchCourses(cache, callback);
            return;
        }

        if (testMockObj.testMode){
            searchResults = testMockObj.testCourses;
            callback.success(searchResults);
            return;
        }

        searchResults.overrideUrl(ApiResource.general_course);
        searchResults.fetch({
            data: courseSearchRepresentation.toQueryString(),
            dataType:'json',

            success:function(model, response){
                if(callback){
                    for (var i = 0; i < searchResults.length; i++) {
                        app.cache.set("course", searchResults.at(i).get("id"), searchResults.at(i).toJSON());
                    }
                    app.cache.set("queryCourse", courseSearchRepresentation.toQueryString(), searchResults.pluck("id"));
                    callback.success(searchResults);
                }
            },
            error: function(model, response){
                Info.warn('CourseManager::fetchSearchResult:: fetch failed with response:');
                Info.log(response);
                if(callback){
                    callback.error(response);
                }
            }
        });
    };

    //拉取课程类目
    GeneralManager.prototype.fetchCategories = function(callback) {
        var self = this;
        if (testMockObj.testMode) {
            callback.success(testMockObj.testCategories);
            return;
        }
        $.ajax({
            url:ApiResource.general_category,
            type:'GET',
            dataType:'json',
            success: function(data, textStatus, jqXHR){
                self.categoryList = data;
                self.categoryTimeStamp = new Date();
                if (callback) {
                    callback.success(self.categoryList);
                }
            },
            error: function(data, textStatus, jqXHR) {
                if (callback) {
                    callback.error(data);
                }
            }
        });
    };

    //拉取地点
    GeneralManager.prototype.fetchLocations = function(callback) {
        var self = this;
        if (testMockObj.testMode) {
            callback.success(testMockObj.testLocations);
            return;
        }
        $.ajax({
            url:ApiResource.general_location,
            type:'GET',
            dataType:'json',
            success: function(data, textStatus, jqXHR){
                self.locationList = data;
                self.locationTimeStamp = new Date();
                if (callback) {
                    callback.success(self.locationList);
                }
            },
            error: function(data, textStatus, jqXHR) {
                if (callback) {
                    callback.error(data);
                }
            }
        });
    };

    //caller view must provide a function called renderCategories || renderLocations, must store the returned index and call remove when close
    //如果本地存有类目的缓存并且尚为过期，该方法会自动调用reference里的renderCategories方法。
    //如果本地没有类目信息或者类目信息已经过期，该方法会触发fetchCategories方法，并在成功后触发reference里的renderCategories方法
    //reference为调用该方法的view的自身 
    //e.g: app.generalManager.getCategoreis(this)
    GeneralManager.prototype.getCategories = function(reference){
        var index = -1;
        if (this.categoryList.length === 0 || shouldReload(this.categoryTimeStamp)){
            index = addToQueue(this.categoryQueue, reference);
            this.fetchCategories({
            	success: reference.renderCategories,
            	error: function () {}
            });
        }
        else {
            reference.renderCategories(this.categoryList);
        }
        return index;
    };

    //如果本地存有地区信息的缓存并且尚为过期，该方法会自动调用reference里的renderLocations方法。
    //如果本地没有地区信息或者地区信息已经过期，该方法会触发fetchCategories方法，并在成功后触发reference里的renderLocations方法
    //reference为调用该方法的view的自身 
    //e.g: app.generalManager.getCategoreis(this)
    GeneralManager.prototype.getLocations = function(reference) {
        var index = -1;
        if (this.locationList.length === 0 || shouldReload(this.locationTimeStamp)){
            index = addToQueue(this.locationQueue, reference);
            this.fetchLocations({
                success: reference.renderLocations,
                error: function () {}
            });
        }
        else {
            reference.renderLocations(this.locationList);
        }
        return index;
    };

    //@deprecated (actually I don't know what this method does, it's never used)
    GeneralManager.prototype.removeFromCategoryQueue = function(index){
        if (typeof index === 'undefined' && index < 0){
            return;
        }
        this.categoryQueue[index] = null;
    };

    //@deprecated (actually I don't know what this method does, it's never used)
    GeneralManager.prototype.removeFromLocationQueue = function(index) {
        if (typeof index === 'undefined' && index < 0){
            return;
        }
        this.locationQueue[index] = null;
    };


}).call(this);
