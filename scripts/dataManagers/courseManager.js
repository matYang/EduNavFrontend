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


	CourseManager.prototype.fetchCourse = function(courseId, callback){
		var course = new Course();
		if (typeof courseId !== 'number'){
			courseId = parseInt(courseId, 10);
		}

		var self = this;

		course.overrideUrl(this.apis.course_course);
		course.set('courseId', courseId);

		course.fetch({
			//data: $.param({ 'userId': self.sessionManager.getUserId()}),
			dataType:'json',

			success:function(model, response){
				self.timeStamp = new Date();
				if(callback && callback.transaction){
					callback.success(course, callback.transaction);
				} else if (callback) {
					callback.success(course);
				}
			},
			error: function(model, response){
				Constants.dWarn("CourseManager::fetchCourse:: fetch failed with response:");
				Constants.dLog(response);
				if(callback){
					callback.error(response);
				}
			}
		});
	};


	CourseManager.prototype._postSingleCourse = function(newCourse, promiseback, callback){
		var self = this;

		newCourse.overrideUrl(this.apis.course_course);
		newCourse.set('courseId', -1);
		newCourse.set('ownerId', this.sessionManager.getUserId());
		newCourse.save({},{
			dataType:'json',

			success:function(model, response){
				self.timeStamp = new Date();

				if(promiseback){
					promiseback(newCourse, callback, self);
				}
			},
			error: function(model, response){
				Constants.dWarn("CourseManager::postCourse:: post failed with response:");
				Constants.dLog(response);
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
			Constants.dWarn("CourseManager::postCourse::invalid parameter, exit");
			return;
		}
		if (!this.sessionManager.hasSession()){
			Constants.dWarn("CourseManager::postCourse::currentCourse does not have session, exit");
			return;
		}
		if (postCount > 0){
			Constants.dWarn("CoursePost Queue not cleared yet");
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
			Constants.dWarn("CourseManager::updateCourse:: invalid parameter");
			return;
		}
		if (!this.sessionManager.hasSession()){
			Constants.dWarn("CourseManager::updateCourse:: session does not exist, exit");
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
                Constants.dWarn("CourseManager::updateCourse:: update failed with response:");
                Constants.dLog(response);
                if(callback){
					callback.error(response);
				}
            }
        });

	};


	CourseManager.prototype.deactivateCourse = function(courseId, callback) {
		var self = this;
		if (typeof courseId !== 'number'){
			Constants.dWarn("CourseManager::deleteCourse:: invalid parameter");
			return;
		}
		if (!this.sessionManager.hasSession()){
			Constants.dWarn("CourseManager::deleteCourse::current user does not have session, exit");
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
                Constants.dWarn("CourseManager::deleteCourse:: delete failed with response:");
                Constants.dLog(response);
                if(callback){
					callback.error(response);
				}
            }
        });

	};

	//cannot use search because of naming collisions
	CourseManager.prototype.searchCourse = function(searchRepresentationObj, callback) {
		var self = this;
		var searchResults = new Courses();
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
		searchResults.overrideUrl(this.apis.course_search);
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

	CourseManager.prototype.fetchRecents = function(callback) {
		var recents = new Courses();
		if (testMockObj.testMode){
			recents = testMockObj.sampleCourses;
			callback.success(recents);
			return;
		}
		var self = this;
		recents.overrideUrl(this.apis.course_recent);
		recents.fetch({
            dataType:'json',
            success:function(model, response){
				self.recents_timeStamp = new Date();
				if(callback){
					callback.success(recents);
				}
            },
            error: function(model, response){
                Constants.dWarn("CourseManager::fetchRecents:: fetch failed with response:");
                Constants.dLog(response);
                if(callback){
					callback.error(response);
				}
            }
        });


	};
	
}).call(this);
