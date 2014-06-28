(function () {
    'use strict';

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

    GeneralManager.prototype.fetchCourse = function (courseId, callback) {
        var cache = app.cache.get("course", courseId);
        if (cache) {
            if(callback){
                callback.success(cache);
            }
        }
        var course = new Course();
        if (testMockObj.testMode) {
            callback.success(testMockObj.testCourses.get(courseId));
            return;
        }
        course.overrideUrl(ApiResource.general_course);
        course.set('courseId', courseId);
        course.fetch({
            dataType:'json',

            success:function(model, response){
                if(callback){
                    callback.success(model);
                    app.cache.set("course", courseId, course);
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

    GeneralManager.prototype.batchFetchCourses = function (courseIds, callback) {
        var cache, i, requestList = [], courses = new Courses();
        if (testMockObj.testMode) {
            for (var i = 0; i < courseIds.length; i++) {
                courses.add(testMockObj.testCourses.get(courseIds[i]));
            }
            callback.success(courses);
            return;
        }
        for (i = 0; i < courseIds.length; i++) {
            cache = app.cache.get("course", courseIds[i]);
            if (cache) {
                courses.add(cache);
            } else {
                requestList.push(courseIds[i]);
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
        courses.fetch({
            dataType:'json',
            data: idList,
            success:function(model, response){
                if (callback) {
                    var array = requestCourses.toArray(), i = 0;
                    for (i = 0; i < array.length; i++ ) {
                        app.cache.set("course", array[i].get("courseId"), array[i]);
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
                        app.cache.set("course", searchResults.at(i).get("courseId"), searchResults.at(i));
                    }
                    app.cache.set("queryCourse", courseSearchRepresentation.toQueryString(), searchResults.pluck("courseId"));
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
            error: function() {
                if (callback) {
                    callback.error();
                }
            }
        });
    };

    
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
            error: function() {
                if (callback) {
                    callback.error();
                }
            }
        });
    };

    //caller view must provide a function called renderCategories || renderLocations, must store the returned index and call remove when close
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
    GeneralManager.prototype.removeFromCategoryQueue = function(index){
        if (typeof index === 'undefined' && index < 0){
            return;
        }
        this.categoryQueue[index] = null;
    };

    GeneralManager.prototype.removeFromLocationQueue = function(index) {
        if (typeof index === 'undefined' && index < 0){
            return;
        }
        this.locationQueue[index] = null;
    };


}).call(this);
