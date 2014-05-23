(function () {
    'use strict';

    var postCount = 0;
    var firstSuccessCourse = null;

    this.CourseManager = function(sessionManager,  userManager){

        this.apis = new ApiResource();

        this.sessionManager = sessionManager;
        this.userManager = userManager;

        this.timeStamp = new Date();
        this.searchResults_timeStamp = new Date();
        this.recents_timeStamp = new Date();

        this.sessionManager.resgisterManager(this);
    };


    //only reset the detailed course upon logout
    CourseManager.prototype.release = function() {
        this.timeStamp = new Date();
    };

    CourseManager.prototype._postSingleCourse = function(newCourse, promiseback, callback){
        var partnerId = this.sessionManager.getSessionUser().get("partnerId");
        if (!partnerId) {
            Info.warn("CourseManager::postCourse:: fetch failed with response:");
        }
        var self = this;

        newCourse.overrideUrl(this.apis.course_course);
        newCourse.set('courseId', -1);
        newCourse.set('partnerId', app.sessionManager.getSessionUser().getId());
        newCourse.save({},{
            dataType:'json',

            success:function(model, response){
                self.timeStamp = new Date();

                if(promiseback){
                    promiseback(newCourse, callback, self);
                }
            },
            error: function(model, response){
                Info.warn("CourseManager::postCourse:: post failed with response:");
                Info.log(response);
                if(promiseback){
                    promiseback(null, callback, self);
                }
            }
        });
    };

    CourseManager.prototype._executePromise = function(course, callback, immediateCaller) {
        //always point to the last successful one
        if (firstSuccessCourse === null){
            firstSuccessCourse = course;
        }
        postCount -= 1;
        if (postCount === 0){
            immediateCaller.course = firstSuccessCourse;

            if (firstSuccessCourse !== null){
                callback.success(firstSuccessCourse);
                firstSuccessCourse = null;
            }
            else{
                callback.error();
            }
        }
    };

    CourseManager.prototype.postCourse = function(newCourses, callback) {
        var self = this,
            i = 0;
        if (!newCourses || !(newCourses instanceof Backbone.Collection)){
            Info.warn("CourseManager::postCourse::invalid parameter, exit");
            return;
        }
        if (!this.sessionManager.hasSession()){
            Info.warn("CourseManager::postCourse::currentCourse does not have session, exit");
            return;
        }
        if (postCount > 0){
            Info.warn("CoursePost Queue not cleared yet");
            return;
        }

        postCount = newCourses.length;
        firstSuccessCourse = null;
        for (i = 0; i < postCount; i++){
            this._postSingleCourse(newCourses.at(i), this._executePromise, callback);
        }
    };


    CourseManager.prototype.updateCourse = function(updatedCourse, callback) {
        if (!updatedCourse || typeof updatedCourse !== 'object'){
            Info.warn("CourseManager::updateCourse:: invalid parameter");
            return;
        }
        if (!this.sessionManager.hasSession()){
            Info.warn("CourseManager::updateCourse:: session does not exist, exit");
            return;
        }

        var self = this;

        updatedCourse.overrideUrl(this.apis.course_course);
        updatedCourse.set('ownerId', this.sessionManager.getUserId());
        updatedCourse.save({},{
            dataType:'json',
            success:function(model, response){
                if(callback){
                    callback.success(updatedCourse);
                }
            },
            error: function(model, response){
                Info.warn("CourseManager::updateCourse:: update failed with response:");
                Info.log(response);
                if(callback){
                    callback.error(response);
                }
            }
        });

    };


    CourseManager.prototype.deactivateCourse = function(courseId, callback) {
        var self = this;
        if (typeof courseId !== 'number'){
            Info.warn("CourseManager::deleteCourse:: invalid parameter");
            return;
        }
        if (!this.sessionManager.hasSession()){
            Info.warn("CourseManager::deleteCourse::current user does not have session, exit");
            return;
        }
        //do not destory the course itself
        var course = new Course();
        course.overrideUrl(this.apis.course_course);
        course.set('courseId', courseId);
        course.destroy({
            dataType:'json',
            success:function(model, response){
                if(callback){
                    callback.success();
                }
            },
            error: function(model, response){
                Info.warn("CourseManager::deleteCourse:: delete failed with response:");
                Info.log(response);
                if(callback){
                    callback.error(response);
                }
            }
        });

    };

    
}).call(this);
