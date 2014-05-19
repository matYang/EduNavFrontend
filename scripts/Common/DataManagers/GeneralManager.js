(function () {
    'use strict';

    this.GeneralManager = function(sessionManager){

        this.apis = new ApiResource();

        //time stamp updates when user data changes or sycns
        this.timeStamp = new Date();
    };


    //reset the manager state upon logout
    GeneralManager.prototype.release = function() {
        this.timeStamp = new Date();
    };

    GeneralManager.prototype.fetchCourse = function (courseId, callback) {
        $.ajax({
            url:this.apis.general_location + "/" + courseId,
            type:"GET",
            dataType:"json",
            success: function(data, textStatus, jqXHR){
                if (callback) {
                    callback.success();
                }
            },
            error: function() {
                if (callback) {
                    callback.error();
                }
            }
        });
    }

    GeneralManager.prototype.fetchLocations = function(callback) {
        $.ajax({
            url:this.apis.general_location,
            type:"GET",
            dataType:"json",
            success: function(data, textStatus, jqXHR){
                if (callback) {
                    callback.success();
                }
            },
            error: function() {
                if (callback) {
                    callback.error();
                }
            }
        });
    }

    GeneralManager.prototype.fetchCategories = function(callback) {
        $.ajax({
            url:this.apis.general_category,
            type:"GET",
            dataType:"json",
            success: function(data, textStatus, jqXHR){
                if (callback) {
                    callback.success();
                }
            },
            error: function() {
                if (callback) {
                    callback.error();
                }
            }
        });
    }

    GeneralManager.prototype.fetchPartnerNames = function(partner, callback) {
        $.ajax({
            url:this.apis.general_partner,
            type:"GET",
            dataType:"json",
            success: function(data, textStatus, jqXHR){
                if (callback) {
                    callback.success();
                }
            },
            error: function() {
                if (callback) {
                    callback.error();
                }
            }
        });
    }

    GeneralManager.prototype.searchCourses = function(searchRepresentationObj, callback) {
        var self = this, searchResults = new Courses();
        if(testMockObj.testMode){
            searchResults = testMockObj.sampleCourses;
            callback.success(searchResults);
            return;
        }
        if (typeof searchRepresentationObj !== 'object'){
            Constants.dWarn("CourseManager::fetchSearchResult:: invalid parameter, exit");
            return;
        }

        var userId = this.sessionManager.hasSession() ? this.sessionManager.getUserId() : -1;
        searchResults.overrideUrl(this.apis.course_course);
        searchResults.fetch({
            data: $.param({'searchRepresentation': searchRepresentationObj.toString(), 'userId' : userId}),
            dataType:'json',

            success:function(model, response){
                self.searchResults_timeStamp = new Date();
                if(callback){
                    callback.success(searchResults);
                }
            },
            error: function(model, response){
                Constants.dWarn("CourseManager::fetchSearchResult:: fetch failed with response:");
                Constants.dLog(response);
                if(callback){
                    callback.error(response);
                }
            }
        });
    };
}).call(this);
