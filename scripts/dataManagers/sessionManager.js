(function () {
	'use strict';
	this.SessionManager = function(){

		this.apis = new ApiResource();
		this.sessionUser = new User();

		this.sessionUser.overrideUrl(this.apis.users_findSession);

		this.timeStamp = new Date();

		//this is used to reset all manager data upon logouts
		this.sessionRegistraTable = [];
		
		this.cur_notifications = new Notifications();
		this.cur_notificationsTimeStamp = new Date();
		this.cur_socialList = new Users();
		this.cur_socialListTimeStamp = new Date();
		this.cur_letters = new Letters();
		this.cur_lettersTimeStamp = new Date();

		this.cur_uncheckedNotifications = new Notifications();
		this.cur_uncheckedLetters = new Letters();
		this.cur_searchHistory = new SearchRepresentations();

	};

	SessionManager.prototype.resgisterManager = function(manager) {
		this.sessionRegistraTable.push(manager);
	};

	SessionManager.prototype.releaseManager = function() {
		for (var managerIndex = 0; managerIndex < this.sessionRegistraTable.length; managerIndex++){
			this.sessionRegistraTable[managerIndex].release();
		}
	};

	SessionManager.prototype.hasSession = function(){
		if (testMockObj.testMode) return true;
		return this.sessionUser.id >= 0;
	};

	//avoid using this
	SessionManager.prototype.getSessionUser = function(){
		return this.sessionUser;
	};

	SessionManager.prototype.getUserId = function() {
		return  this.sessionUser.id;
	};

	SessionManager.prototype.getTimeStamp = function() {
		return this.timeStamp;
	};
	
	SessionManager.prototype.getCurUserNotifications = function(){
		return this.cur_notifications;
	};
	
	SessionManager.prototype.getCurUserFavorites = function(){
		return this.cur_socialList;
	};

	SessionManager.prototype.getCurUserLetters = function() {
		return this.cur_letters;
	};

	SessionManager.prototype.getCurUserUncheckedNotifications = function() {
		return this.cur_uncheckedNotifications;
	};

	SessionManager.prototype.getCurUserUncheckedLetters = function() {
		return this.cur_uncheckedLetters;
	};
	
	//using the find session API to determine if the uer has logged in or not
	SessionManager.prototype.fetchSession = function(asyncFlag, callback){
		var self = this;
		
		this.sessionUser.overrideUrl(this.apis.users_findSession);
		if (testMockObj.testMode) {
			this.sessionUser = testMockObj.sampleUser;
			if(callback){
				callback.success();
			}
			return;
		}
		//make sure the session user is new, and sends Get to /findSession
		this.sessionUser.fetch({
			async:asyncFlag,
            dataType:'json',

            success:function(model, response){
				self.releaseManager();
				if (self.hasSession()){
					self.fetchCurUserNotifications();
					self.fetchCurUserLetters();
					self.fetchCurUserFavorites();
				}
				if(callback){
					callback.success();
				}
            },

            error: function(model, response){
                Constants.dWarn("SessionManager::updateSession:: fetch failed with response:");
                Constants.dLog(response);

                if(callback){
					callback.error(response);
				}
            }
        });

        this.timeStamp = new Date();

	};

	SessionManager.prototype.login = function(emailVal, passwordVal, callback){
		//if invalid input or is already logged in, can not login
		if (!(emailVal && passwordVal)){
			Constants.dWarn("SessionManager::lougout:: invalid parameter");
			return;
		}
		if (this.hasSession()){
			Constants.dWarn("SessionManager::login::already logged in, conflict, still sending the login request");
			app.navigate("/main", true);
		}
		var self = this;

		this.sessionUser.overrideUrl(this.apis.users_login);
		//make sure the user is new, so no id is in the api path
		this.sessionUser.set('email', emailVal);
		this.sessionUser.set('password', passwordVal);
		this.sessionUser.save({},{
            dataType:'json',

            success:function(model, response){

				self.fetchCurUserNotifications();
				self.fetchCurUserLetters();
				self.fetchCurUserFavorites();

				Constants.dLog(model);
				if(callback){
					callback.success(response);
				}
            },

            error: function(model, response){
                Constants.dWarn("SessionManager::login:: login failed with response:");
                Constants.dLog(response);
                if(callback){
					callback.error(response);
				}
            }
        });

        this.timeStamp = new Date();

	};

	SessionManager.prototype.logout = function(callback){
		if (!this.hasSession()){
			Constants.dWarn("SessionManager::logout::not logged in, conflict, still sending the logout request");
		}

		var self = this;

		this.sessionUser.overrideUrl(this.apis.users_logout);
		//if session user is new, no id in path, then already logged out
		//if session user is not new, then has id in path, will launch right call
		this.sessionUser.save({},{
            dataType:'json',

            success:function(model, response){
				if(callback){
					callback.success(response);
				}
            },

            error: function(model, response){
                Constants.dWarn("SessionManager::logout:: logout failed with response:");
                Constants.dLog(response);

                if(callback){
					callback.error(response);
				}
            }
        });

        this.timeStamp = new Date();
	};

	
	SessionManager.prototype.fetchCurUserNotifications = function(callback){
        var self = this;
        if (!this.hasSession()){
                Constants.dWarn("SessionManager::fetchNotificationList:: session does not exist, exit");
                return;
        }

        this.cur_notifications.fetch({
			data: $.param({ 'userId': this.getUserId()}),
			dataType:'json',
			reset: true,

			success:function(model, response){
				self.cur_notificationsTimeStamp = new Date();
				if(callback){
					//should've used binding, not retrurning or passing models back
					callback.success(response);
				}
			},
			error: function(model, response){
				Constants.dWarn("SessionManager::fetchNotificationList:: fetch failed with response:");
				Constants.dLog(response);
				if(callback){
					callback.error(response);
				}
			}
		});
	};

	SessionManager.prototype.fetchCurUserUncheckedNotifications = function(callback) {
		var self = this;
        if (!this.hasSession()){
                Constants.dWarn("SessionManager::fetchCurUserUncheckedNotifications:: session does not exist, exit");
                return;
        }
        this.cur_uncheckedNotifications.overrideUrl(users_uncheckedNotification + '/' + this.getUserId());
        this.cur_uncheckedNotifications.fetch({
			dataType:'json',
			reset: true,

			success:function(model, response){
				if(callback){
					callback.success();
				}
			},
			error: function(model, response){
				Constants.dWarn("SessionManager::fetchCurUserUncheckedNotifications:: fetch failed with response:");
				Constants.dLog(response);
				if(callback){
					callback.error(response);
				}
			}
		});
	};


	SessionManager.prototype.fetchCurUserLetters = function(callback){
		var self = this;
        if (!this.hasSession()){
                Constants.dWarn("SessionManager::fetchCurUserLetters:: session does not exist, exit");
                return;
        }
        var letterFetchOptions = {};
        letterFetchOptions.direction = Constants.LetterDirection.inbound;
        letterFetchOptions.userId = this.getUserId();
        letterFetchOptions.targetUserId = -1;
        letterFetchOptions.targetType = Constants.LetterType.user;

        this.cur_letters.overrideUrl(this.apis.letter_letter + '/' + this.getUserId());
        this.cur_letters.fetch({
			data: $.param(letterFetchOptions),
			dataType:'json',
			reset: true,

			success:function(model, response){
				self.cur_lettersTimeStamp = new Date();
				if(callback){
					callback.success();
				}
			},
			error: function(model, response){
				Constants.dWarn("SessionManager::fetchCurUserLetters:: fetch failed with response:");
				Constants.dLog(response);
				if(callback){
					callback.error(response);
				}
			}
		});
	};

	SessionManager.prototype.fetchCurUserUncheckedLetters = function(callback) {
		var self = this;
        if (!this.hasSession()){
                Constants.dWarn("SessionManager::fetchCurUserUncheckedLetters:: session does not exist, exit");
                return;
        }
        this.cur_uncheckedLetters.overrideUrl(this.apis.users_uncheckedLetter + '/' + this.getUserId());
        this.cur_uncehckedLetters.fetch({
			dataType:'json',
			reset: true,

			success:function(model, response){
				if(callback){
					callback.success();
				}
			},
			error: function(model, response){
				Constants.dWarn("SessionManager::fetchCurUserUncheckedLetters:: fetch failed with response:");
				Constants.dLog(response);
				if(callback){
					callback.error(response);
				}
			}
		});
	};
	
	SessionManager.prototype.fetchCurUserFavorites = function(callback) {
		var self = this;

		if (!this.hasSession()){
			Constants.dWarn("SessionManager::fetchWatchedUsers:: session does not exist, exit");
			return;
		}

		this.cur_socialList.overrideUrl(this.apis.users_watchUser + '/' + this.getUserId());
		this.cur_socialList.fetch({
			data: $.param({ 'intendedUserId': this.getUserId()}),
			dataType:'json',
			reset: true,

			success:function(model, response){
				self.socialList_timeStamp = new Date();
				if(callback){
					callback.success();
				}
			},
			error: function(model, response){
				Constants.dWarn("SessionManager::fetchSocialList:: fetch failed with response:");
				Constants.dLog(response);
				if(callback){
					callback.error(response);
				}
			}
		});
	};

	SessionManager.prototype.fetchCurUserSearchHistory = function(callback) {
		var self = this;

		if (!this.hasSession()){
			Constants.dWarn("SessionManager::fetchCurUserSearchHistory:: session does not exist, exit");
			return;
		}

		this.cur_searchHistory.overrideUrl(this.apis.users_searchHistory + '/' + this.getUserId());
		this.cur_searchHistory.fetch({
			dataType:'json',
			reset: true,

			success:function(model, response){
				if(callback){
					callback.success();
				}
			},
			error: function(model, response){
				Constants.dWarn("SessionManager::fetchCurUserSearchHistory:: fetch failed with response:");
				Constants.dLog(response);
				if(callback){
					callback.error(response);
				}
			}
		});
	};
	
	SessionManager.prototype.handleSocket = function(eventName, data) {
		Info.log("Session Manager received socket with event: " + eventName + " and data: " + data);
		if (eventName === 'newNotification'){
			this.fetchCurUserNotifications();
		}
		else if (eventName === 'newLetter'){
			this.fetchCurUserLetters();
			if (app.letterView){
				app.letterView.onNewLetter(data);
			}
		}
	};


	SessionManager.prototype.fetchUserVerificationStatus = function (callback) {

	}

}).call(this);
