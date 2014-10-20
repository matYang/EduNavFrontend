//该模块为用户，合作伙伴，管理员的通用接口
//该模块用来拉取课程，地址，分类等公开信息

(function () {


    var addToQueue = function (queue, reference) {
        var i = 0;
        //if there is an empty spot in queue, insert the funcPtr to that spot, return index
        for (i = 0; i < queue.length; i++) {
            if (queue[i] === null) {
                queue[i] = reference;
                return i;
            }
        }
        //if no empty spot in queue, append the funcPtr, return index
        queue.push(reference);
        return (queue.length - 1);
    };

    //判断是否需要重新拉取地区/分类信息
    var shouldReload = function (timeStamp) {
        if (typeof timeStamp === 'undefined') {
            return true;
        }
        var expireTime = 3600 * 1000,   //expires in 1 hours
            curTime = new Date(),
            timeDiff = curTime.getTime() - timeStamp.getTime();

        return timeDiff >= expireTime;
    };

    this.GeneralManager = function () {

        this.categoryList = [];
        this.locationList = [];
        this.circleList = [];

        this.categoryQueue = [];
        this.locationQueue = [];
        this.circleQueue = [];

        this.categoryTimeStamp = new Date();
        this.locationTimeStamp = new Date();
        this.circleTimeStamp = new Date();
    };

    //根据ID拉取单个课程
    GeneralManager.prototype.fetchCourse = function (id, callback) {
        var cache = app.cache.get("course", id);
        if (cache) {
            if (callback) {
                callback.success(new Course(cache, {parse: true}));
                return;
            }
        }
        var course = new Course();
        if (testMockObj.testMode) {
            callback.success(testMockObj.testCourses.get(id));
            return;
        }
        course.overrideUrl(ApiResource.courses);
        course.set('id', id);
        course.fetch({
            dataType: 'json',

            success: function (model, response) {
                if (callback) {
                    callback.success(model);
                    app.cache.set("course", id, course.toJSON()); //course很少会发生变化，所以缓存起来
                }
            },

            error: function (model, response) {
                Info.warn('fetch course failed');
                if (callback) {
                    callback.error($.parseJSON((response.responseText)));
                }
            }
        });
    };

    //根据ID拉取单个团购
    GeneralManager.prototype.fetchTuan = function (id, callback) {
        var tuan = new Tuan();
        if (testMockObj.testMode) {
            callback.success(testMockObj.testTuans.get(id));
            return;
        }
        tuan.overrideUrl(ApiResource.groupBuy);
        tuan.set('id', id);
        tuan.fetch({
            dataType: 'json',

            success: function (model, response) {
                if (callback) {
                    callback.success(model);
                }
            },

            error: function (model, response) {
                Info.warn('fetch tuan failed');
                if (callback) {
                    callback.error($.parseJSON((response.responseText)));
                }
            }
        });
    };


    //根据ID列表批量拉取单个课程
    GeneralManager.prototype.batchFetchCourses = function (idSet, callback) {
        var cache, i, requestList = [], courses = new Courses();
        if (testMockObj.testMode) {
            for (i = 0; i < idSet.length; i++) {
                courses.add(testMockObj.testCourses.get(idSet[i]));
            }
            callback.success(courses);
            return;
        }
        //优先检查缓存里课程是否已经存在，仅重新拉取过期或者不存在的课程
        for (i = 0; i < idSet.length; i++) {
            cache = app.cache.get("course", idSet[i]);
            if (cache) {
                courses.add(new Course(cache, {parse: true}));
            } else {
                requestList.push(idSet[i]); //根据缓存那内容重新建立拉取列表
            }
        }
        if (requestList.length === 0) {
            if (callback) {
                callback.success(courses);
            }
            return;
        }
        var requestCourses = new Courses();
        requestCourses.overrideUrl(ApiResource.courses);
        requestCourses.fetch({
            dataType: 'json',
            data: $.param({'idSet': idSet}, true),//traditional is true
            success: function (response, model) {
                if (callback) {
                    var array = requestCourses.toArray(), i = 0;
                    for (i = 0; i < array.length; i++) {
                        app.cache.set("course", array[i].get("id"), array[i].toJSON());
                    }
                    courses.add(array);
                    // app.storage.setCoursesToCompare(courses.pluck("courseId"));
                    callback.success(courses);
                }
            },

            error: function (model, response) {
                Info.warn('fetch course failed');
                if (callback) {
                    callback.error($.parseJSON(response.responseText));
                }
            }
        });
    };

    //根据搜索条件搜索课程
    //具体条件参考CourseSearchRepresentation.js
    GeneralManager.prototype.findCourse = function (courseSearchRepresentation, callback) {
        var self = this, cache, i, requestList = [], searchResults = new Courses();
        if (!(courseSearchRepresentation instanceof Backbone.Model)) {
            Info.warn('GeneralManager::findCourse invalid parameter, exit');
            return;
        }
        cache = app.cache.get("queryCourse", courseSearchRepresentation.toQueryString());
        if (cache) {
            this.batchFetchCourses(cache, callback);
            return;
        }

        if (testMockObj.testMode) {
            searchResults = testMockObj.testCourses;
            callback.success(searchResults);
            return;
        }

        searchResults.overrideUrl(ApiResource.courses);
        searchResults.fetch({
            data: courseSearchRepresentation.toQueryString(),
            dataType: 'json',

            success: function (model, response) {
                if (callback) {
                    for (var i = 0; i < searchResults.length; i++) {
                        app.cache.set("course", searchResults.at(i).get("id"), searchResults.at(i).toJSON());
                    }
                    app.cache.set("queryCourse", courseSearchRepresentation.toQueryString(), searchResults.pluck("id"));
                    callback.success(searchResults);
                }
            },
            error: function (model, response) {
                Info.warn('CourseManager::fetchSearchResult:: fetch failed with response:');
                if (callback) {
                    callback.error($.parseJSON(response.responseText));
                }
            }
        });
    };

    //根据搜索条件搜索团购
    GeneralManager.prototype.findTuan = function (tuanSearchRepresentation, callback) {
        var searchResults = new Tuans();
        if (!(tuanSearchRepresentation instanceof Backbone.Model)) {
            Info.warn('GeneralManager::findTuan invalid parameter, exit');
            return;
        }

        if (testMockObj.testMode) {
            searchResults = testMockObj.testTuans;
            callback.success(searchResults);
            return;
        }

        searchResults.overrideUrl(ApiResource.groupBuy);
        searchResults.fetch({
            data: tuanSearchRepresentation.toQueryString(),
            dataType: 'json',

            success: function (model, response) {
                if (callback) {
                    //todo tuan sr cache
                    app.cache.set("queryTuan", tuanSearchRepresentation.toQueryString(), searchResults.pluck("id"));
                    callback.success(searchResults);
                }
            },
            error: function (model, response) {
                Info.warn('TuanManager::fetchSearchResult:: fetch failed with response:');
                if (callback) {
                    callback.error($.parseJSON(response.responseText));
                }
            }
        });
    };

    //搜索置顶的团购 一个不显示 不足4个补齐 超过4个  取4个
    GeneralManager.prototype.findTopTuan = function (callback) {
        var searchResults = new Tuans();

        if (testMockObj.testMode) {
            searchResults = testMockObj.testTuans;
            callback.success(searchResults);
            return;
        }

        searchResults.overrideUrl(ApiResource.groupBuy);
        searchResults.fetch({
            data: 'hot=1',
            dataType: 'json',

            success: function (model, response) {
                var length = searchResults.length;
                var i;
                for (i = length; i > 4; i--) {
                    searchResults.pop();
                }
                callback.success(searchResults);
            },
            error: function (model, response) {
                Info.warn('TuanManager::fetchSearchResult:: fetch failed with response:');
                if (callback) {
                    callback.error($.parseJSON(response.responseText));
                }
            }
        });
    };

    //根据搜索条件搜索机构列表 partnerSearchRepresentation
    GeneralManager.prototype.findPartner = function (sr, callback) {
        var searchResults = new Tuans();
        if (!(sr instanceof Backbone.Model)) {
            Info.warn('GeneralManager::findPartner invalid parameter, exit');
            return;
        }

        if (testMockObj.testMode) {
            searchResults = testMockObj.testTuans;
            callback.success(searchResults);
            return;
        }

        searchResults.overrideUrl(ApiResource.groupBuy);
        searchResults.fetch({
            data: sr.toQueryString(),
            dataType: 'json',

            success: function (model, response) {
                if (callback) {
                    //todo tuan sr cache
                    app.cache.set("queryTuan", sr.toQueryString(), searchResults.pluck("id"));
                    callback.success(searchResults);
                }
            },
            error: function (model, response) {
                Info.warn('TuanManager::fetchSearchResult:: fetch failed with response:');
                if (callback) {
                    callback.error($.parseJSON(response.responseText));
                }
            }
        });
    };

    //拉取课程类目
    GeneralManager.prototype.fetchCategories = function (callback) {
        var self = this;
        if (testMockObj.testMode) {
            var cats = testMockObj.testCategories;
            for (var i = 0; i < cats.data.length; i++) {
                var cat2 = cats.data[i].children;
                for (var j = 0; j < cat2.length; j++) {
                    var cat3 = cat2[j].children;
                    for (var k = 0; k < cat3.length; k++) {
                        if (cat3[k].enabled == 1) {
                            cat3.splice(k, 1);
                            k--;
                        }

                    }
                }
            }
            callback.success(cats);
            return;
        }

        if (this.categoryList.length === 0 || shouldReload(this.categoryTimeStamp)) {
            $.ajax({
                url: ApiResource.general_category,
                type: 'GET',
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {
                    var cats = data;
                    for (var i = 0; i < cats.data.length; i++) {
                        var cat2 = cats.data[i].children;
                        for (var j = 0; j < cat2.length; j++) {
                            var cat3 = cat2[j].children;
                            for (var k = 0; k < cat3.length; k++) {
                                if (cat3[k].enabled == 1) {
                                    cat3.splice(k, 1);
                                    k--;
                                }

                            }
                        }
                    }
                    self.categoryList = data;
                    self.categoryTimeStamp = new Date();
                    if (callback) {
                        callback.success(self.categoryList);
                    }
                },
                error: function (data, textStatus, jqXHR) {
                    if (callback) {
                        callback.error($.parseJSON(data.responseText));
                    }
                }
            });
        } else {
            callback.success(this.categoryList);
        }

    };

    //拉取地点
    GeneralManager.prototype.fetchLocations = function (callback) {
        var self = this;
        if (testMockObj.testMode) {
            callback.success(testMockObj.testLocations.data);
            return;
        }
        $.ajax({
            url: ApiResource.general_location,
            type: 'GET',
            dataType: 'json',
            success: function (data, textStatus, jqXHR) {
                self.locationList = data.data;
                self.locationTimeStamp = new Date();
                if (callback) {
                    callback.success(self.locationList);
                }
            },
            error: function (data, textStatus, jqXHR) {
                if (callback) {
                    callback.error($.parseJSON(data.responseText));
                }
            }
        });
    };

    //拉取商圈
    GeneralManager.prototype.fetchCircle = function (callback) {
        var self = this;
        if (testMockObj.testMode) {
            callback.success(testMockObj.testCircle.data);
            return;
        }
        $.ajax({
            url: ApiResource.general_circle,//todo 改成商圈的api
            type: 'GET',
            dataType: 'json',
            success: function (data, textStatus, jqXHR) {
                self.circleList = data.data;
                self.circleTimeStamp = new Date();
                if (callback) {
                    callback.success(self.circleList);
                }
            },
            error: function (data, textStatus, jqXHR) {
                if (callback) {
                    callback.error($.parseJSON(data.responseText));
                }
            }
        });
    };

    //拉取学校
    GeneralManager.prototype.fetchSchools = function (locationId, callback) {
        var self = this;
        if (testMockObj.testMode) {
            callback.success(testMockObj.testSchools.data);
            return;
        }
        $.ajax({
            url: ApiResource.general_school,
            data: 'locationId=' + locationId,
            type: 'GET',
            dataType: 'json',
            success: function (data, textStatus, jqXHR) {
                if (!data.data) {
                    data = [];
                }
                if (callback) {
                    callback.success(data.data);
                }
            },
            error: function (response, textStatus, jqXHR) {
                if (callback) {
                    callback.error($.parseJSON(response.responseText));
                }
            }
        });
    };

    //caller view must provide a function called renderCategories || renderLocations, must store the returned index and call remove when close
    //如果本地存有类目的缓存并且尚为过期，该方法会自动调用reference里的renderCategories方法。
    //如果本地没有类目信息或者类目信息已经过期，该方法会触发fetchCategories方法，并在成功后触发reference里的renderCategories方法
    //reference为调用该方法的view的自身 
    //e.g: app.generalManager.getCategoreis(this)
    GeneralManager.prototype.getCategories = function (reference) {
        var index = -1;
        if (this.categoryList.length === 0 || shouldReload(this.categoryTimeStamp)) {
            index = addToQueue(this.categoryQueue, reference);
            this.fetchCategories({
                //todo should be changed, just return data
                success: reference.renderCategories,
                error: function () {
                }
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
    GeneralManager.prototype.getLocations = function (reference) {
        var index = -1;
        if (this.locationList.length === 0 || shouldReload(this.locationTimeStamp)) {
            index = addToQueue(this.locationQueue, reference);
            this.fetchLocations({
                //todo should be changed, just return data
                success: reference.renderLocations,
                error: function () {
                }
            });
        }
        else {
            reference.renderLocations(this.locationList);
        }
        return index;
    };

    //如果本地存有地区信息的缓存并且尚为过期，该方法会自动调用reference里的renderCircle方法。
    //如果本地没有地区信息或者地区信息已经过期，该方法会触发fetchCategories方法，并在成功后触发reference里的renderCircle方法
    //reference为调用该方法的view的自身
    //e.g: app.generalManager.getCategoreis(this)
    GeneralManager.prototype.getCircle = function (reference) {
        var index = -1;
        if (this.circleList.length === 0 || shouldReload(this.circleTimeStamp)) {
            index = addToQueue(this.circleQueue, reference);
            this.fetchCircle({
                //todo should be changed, just return data
                success: reference.renderCircle,
                error: function () {
                }
            });
        }
        else {
            reference.renderCircle(this.circleList);
        }
        return index;
    };

    //拉取评论
    GeneralManager.prototype.findComments = function (sr, callback) {
        var searchResults = new Comments();
        if (!(sr instanceof Backbone.Model) || !sr.get('courseTemplateId')) {
            Info.warn('GeneralManager::findComments invalid parameter, exit');
            return;
        }

        if (testMockObj.testMode) {
            searchResults = testMockObj.testComments;
            callback.success(searchResults);
            return;
        }

        searchResults.overrideUrl(ApiResource.course_comment);
        searchResults.fetch({
            data: sr.toQueryString(),
            dataType: 'json',

            success: function (model, response) {
                if (callback) {
                    callback.success(searchResults);
                }
            },
            error: function (model, response) {
                if (callback) {
                    callback.error($.parseJSON(response.responseText));
                }
            }
        });
    };


}).call(this);
