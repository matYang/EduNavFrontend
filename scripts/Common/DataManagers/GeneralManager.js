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
        this.apis = new ApiResource();
        this.sessionManager = sessionManager;
        this.sessionManager.resgisterManager(this);

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
        var course = new Course();

        course.overrideUrl(this.apis.general_course);
        course.set('courseId', courseId);
        course.fetch({
            dataType:'json',

            success:function(model, response){
                if(callback){
                    callback.success(model);
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
        var self = this,
            searchResults = new Courses();

        if(testMockObj.testMode){
            searchResults = testMockObj.sampleCourses;
            callback.success(searchResults);
            return;
        }
        if (!(courseSearchRepresentation instanceof Backbone.model)){
            Info.warn('CourseManager:: invalid parameter, exit');
            return;
        }

        searchResults.overrideUrl(this.apis.general_course);
        searchResults.fetch({
            data: $.param(courseSearchRepresentation.toJSON()),
            dataType:'json',

            success:function(model, response){
                if(callback){
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
        $.ajax({
            url:this.apis.general_category,
            type:'GET',
            dataType:'json',
            success: function(data, textStatus, jqXHR){
                self.categoryList = data;
                self.categoryTimeStamp = new Date();
                var i = 0;
                for (i = 0; i < self.categoryQueue.length; i++){
                    self.categoryQueue[i].renderCategories(self.categoryList.slice());
                    self.categoryQueue[i] = null;
                }
                if (callback) {
                    callback.success(self.categoryList.slice());
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
        $.ajax({
            url:this.apis.general_location,
            type:'GET',
            dataType:'json',
            success: function(data, textStatus, jqXHR){
                self.locationList = data;
                self.locationTimeStamp = new Date();
                var i = 0;
                for (i = 0; i < self.locationQueue.length; i++){
                    self.locationQueue[i].renderLocations(self.locationList.slice());
                    self.locationQueue[i] = null;
                }
                if (callback) {
                    callback.success(self.locationList.slice());
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
            this.fetchCategories();
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
            this.fetchLocations();
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
