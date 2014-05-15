(function () {
	'use strict';

	this.UserManager = function(sessionManager){

		this.apis = new ApiResource();

		//time stamp updates when user data changes or sycns
		this.timeStamp = new Date();

		//thses time stamps records the time when the lastest data is fetches from server
		this.socialList_timeStamp = new Date();
		this.historyList_timeStamp = new Date();
		this.transactionList_timeStamp = new Date();
		this.notificationList_timeStamp = new Date();
		this.letter_timeStamp = new Date();

		this.sessionManager = sessionManager;
		this.sessionManager.resgisterManager(this);
	};


	//reset the manager state upon logout
	UserManager.prototype.release = function() {
		this.sessionUser = this.sessionManager.getSessionUser();

		this.timeStamp = new Date();
		this.socialList_timeStamp = new Date();
		this.historyList_timeStamp = new Date();
		this.transactionList_timeStamp = new Date();
		this.notificationList_timeStamp = new Date();
		this.letter_timeStamp = new Date();

	};


	UserManager.prototype.getTimeStamp = function() {
		return this.timeStamp;
	};
	UserManager.prototype.getSocialListTimeStamp = function() {
		return this.socialList_timeStamp;
	};
	UserManager.prototype.getHistoryListTimeStamp = function() {
		return this.historyList_timeStamp;
	};
	UserManager.prototype.getTransactionListTimeStamp = function() {
		return this.transactionList_timeStamp;
	};
	UserManager.prototype.getNotificationListTimeStamp = function() {
		return this.notificationList_timeStamp;
	};
	UserManager.prototype.getLetterTimeStamp = function() {
		return this.letter_timeStamp;
	};



	UserManager.prototype.registerUser = function(newUser, callback) {
		var self = this;

		if (this.sessionManager.hasSession()){
			Constants.dWarn("UserManager::registerUser::currentUser already has session, conflict, exit");
			return;
		}

		var sessionUser = newUser;
		sessionUser.overrideUrl(this.apis.users_user);
		sessionUser.set('userId', -1);
		sessionUser.save({},{
            dataType:'json',

            success:function(model, response){
				self.timeStamp = new Date();
				//app.sessionManager.sessionUser = sessionUser;
				if(callback){
					callback.success(sessionUser);
				}
            },
            error: function(model, response){
				Constants.dWarn("UserManager::register:: action failed");
				if(callback){
					callback.error(response);
				}
            }
        });
	};

	//will be used to display personal informatiom page only
	UserManager.prototype.fetchUser = function(intendedUserId, callback){
		if (testMockObj.testMode) {
			callback.success(testMockObj.sampleUser);
			return;
		}
		var self = this;

		if (!this.sessionManager.hasSession()){
			Constants.dWarn("UserManager::getUser::currentUser does not have session, exit");
			return;
		}

		var user = new User();
		user.overrideUrl(this.apis.users_user);
		user.set('userId', this.sessionManager.getUserId());
		user.fetch({
			data: $.param({ 'intendedUserId': intendedUserId}),
            dataType:'json',

            success:function(model, response){
				if(callback){
					callback.success(user);
				}
            },
            error: function(model, response){
                Constants.dWarn("UserManager::getUser:: fetch failed with response:");
                Constants.dLog(response);
                if(callback){
					callback.error(response);
				}
            }
        });
	};


	UserManager.prototype.postImage = function(callback) {
		//TODO
	};

	//the call back should accept the return data (true or false)
	UserManager.prototype.verifyEmail = function(emailVal, callback) {
		//don't care about session
		if (!emailVal){
			Constants.dWarn("UserManager::verifyEmail:: invalid parameter");
			return;
		}

		var self = this;

		$.ajax({
			type: "GET",
			async: true,
			url: self.apis.users_email,
			data: $.param({ email: emailVal}),
			dataType: 'json',
			success: function(data){
				Constants.dLog("email verification call succeeded with response:");
				Constants.dLog(data);

				if(callback && callback.success){
					callback.success(data.val);
				}
			},
			error: function (data, textStatus, jqXHR){
				alert("请稍后再试");
				Constants.dWarn("UserManager::verifyEmail:: action failed");
				if(callback && callback.error){
					callback.error(data.val);
				}
			}
		});
	};



	UserManager.prototype.changeContactInfo = function(name, gender, phone, qq, birthday, location, callback) {
		//if invalid input or is already logged in, can not change contact information
		if (!(name && (typeof gender === 'number'))){
			Constants.dWarn("UserManager::changeContactInfo:: invalid parameter");
			return;
		}

		if (!this.sessionManager.hasSession()){
			Constants.dWarn("UserManager::changeContactInfo:: session does not exist, exit");
			return;
		}

		var self = this;

		var sessionUser = app.sessionManager.getSessionUser();
		sessionUser.overrideUrl(this.apis.users_contactInfo);
		sessionUser.set('name', name);
		sessionUser.set('gender', gender);
		sessionUser.set('phone', phone);
		sessionUser.set('qq', qq);
		sessionUser.set('birthday', birthday);
		sessionUser.set('location', location);
		sessionUser.save({},{
            dataType:'json',

            success:function(model, response){
				self.timeStamp = new Date();
				if(callback){
					callback.success(sessionUser);
				}
            },
            error: function(model, response){
                alert("请稍后再试");
				Constants.dWarn("UserManager::changeContactInfo:: action failed");
				if(callback){
					callback.error(response);
				}
            }
        });

	};

	UserManager.prototype.changeLocation = function(location, callback) {
		//if invalid input or is already logged in, can not change location
		if (!(location)){
			Constants.dWarn("UserManager::changeLocation:: invalid parameter");
			return;
		}

		if (!this.sessionManager.hasSession()){
			Constants.dWarn("UserManager::changeLocation:: session does not exist, exit");
			return;
		}

		var self = this;

		var sessionUser = app.sessionManager.getSessionUser();
		sessionUser.overrideUrl(this.apis.users_singleLocation);
		//url encoded, not setting in user
		sessionUser.save({},{
			data: JSON.stringify({ 'location': location.toString()}),
            dataType:'json',

            success:function(model, response){
				self.timeStamp = new Date();
				if(callback){
					callback.success(sessionUser);
				}
            },
            error: function(model, response){
                alert("请稍后再试");
				Constants.dWarn("UserManager::changeLocation:: action failed");
				if(callback){
					callback.error(response);
				}
            }
        });
	};



	UserManager.prototype.toggleNotices = function(shouldEmail, shouldPhone, callback) {
		var self = this;

		if (!this.sessionManager.hasSession()){
			Constants.dWarn("UserManager::toggleEmailNotice:: session does not exist, exit");
			return;
		}

		var sessionUser = app.sessionManager.getSessionUser();
		sessionUser.overrideUrl(this.apis.users_toggleNotices);
		//url encoded, not setting in user
		sessionUser.fetch({
			data: $.param({ 'emailNotice': shouldEmail, 'phoneNotice': shouldPhone}),
            dataType:'json',

            success:function(model, response){
				self.timeStamp = new Date();
				if(callback){
					callback.success(sessionUser);
				}
            },
            error: function(model, response){
                alert("请稍后再试");
				Constants.dWarn("UserManager::toggleNotices:: action failed");
				if(callback){
					callback.error(response);
				}
            }
        });

	};




	/********************* Authentication Related ***************************/

	UserManager.prototype.changePassword = function(oldPassword, newPassword, confirmNewPassword, callback) {
		//if invalid input or is already logged in, can not change password
		if (!(oldPassword && newPassword && confirmNewPassword)){
			Constants.dWarn("UserManager::changePassword:: invalid parameter");
			return;
		}

		if (!this.sessionManager.hasSession()){
			Constants.dWarn("UserManager::changePassword:: session does not exist, exit");
			return;
		}

		var self = this;

		$.ajax({
			type: "PUT",
			async: true,
			url: self.apis.users_changePassword + '/' + self.sessionManager.getUserId(),
			data: JSON.stringify({ 'oldPassword': oldPassword, 'newPassword': newPassword, 'confirmNewPassword': confirmNewPassword}),
			dataType: 'json',
			contentType: 'application/json',	//setting this should be covering the data into PUT body
			success: function(data){
				if(callback){
					callback.success();
				}
			},
			error: function (data, textStatus, jqXHR){
				alert("请稍后再试");
				Constants.dWarn("UserManager::changePassword:: action failed");
				if(callback){
					callback.error(data);
				}
			}
		});
	};

	UserManager.prototype.activateAccount = function(key, callback) {
		var self = this;

		if (!(key)){
			Constants.dWarn("UserManager::activateAccount:: invalid parameter");
			return;
		}
		if (this.sessionManager.hasSession()){
			Constants.dWarn("UserManager::activateAccount:: session already exists, exit");
			app.navigate("/main", true);
			return;
		}


		$.ajax({
			type: "GET",
			async: true,
			url: self.apis.users_emailActivation,
			data: $.param({'key': key}),
			dataType: 'json',
			success: function(data){
				//update session
				if(callback){
					callback.success();
				}

			},
			error: function (data, textStatus, jqXHR){
				alert("请稍后再试");
				Constants.dWarn("UserManager::activateAccount:: action failed");
				if(callback){
					callback.error(data);
				}
			}
		});
	};

	UserManager.prototype.resendActivationEmail = function(callback) {
		var self = this,
			newTopBarUser = new User();

		if (this.sessionManager.hasSession()){
			Constants.dWarn("UserManager::resendActivationEmail:: session already exists, exit");
			return;
		}


		$.ajax({
			type: "GET",
			async: true,
			url: self.apis.users_resendActivationEmail + '/' + self.sessionManager.getUserId(),
			dataType: 'json',
			success: function(data){
				if(callback){
					callback.success();
				}
			},
			error: function (data, textStatus, jqXHR){
				alert("请稍后再试");
				Constants.dWarn("UserManager::resendActivationEmail:: action failed");
				if(callback){
					callback.error(data);
				}
			}
		});
	};

	UserManager.prototype.forgetPassword = function(email, callback) {
		var self = this;
		if (!(email)){
			Constants.dWarn("UserManager::forgetPassword:: invalid parameter");
			return;
		}
		if (this.sessionManager.hasSession()){
			Constants.dWarn("UserManager::forgetPassword:: session already exists, exit");
			return;
		}

		$.ajax({
			type: "GET",
			async: true,
			url: self.apis.users_forgetPassword,
			data: $.param({'email': email}),
			dataType: 'json',
			success: function(data){
				if(callback){
					callback.success(2);
				}
			},
			error: function (data, textStatus, jqXHR){
				alert("请稍后再试");
				Constants.dWarn("UserManager::forgetPassword:: action failed");
				if(callback){
					callback.error(data);
				}
			}
		});
	};

	UserManager.prototype.findPassword = function(key, newPassword, confirmNewPassword, callback) {
		var self = this;
		if (!(key && newPassword && confirmNewPassword)){
			Constants.dWarn("UserManager::findPassword:: invalid parameter");
			return;
		}
		if (this.sessionManager.hasSession()){
			Constants.dWarn("UserManager::findPassword:: session already exists, exit");
			return;
		}


		$.ajax({
			type: "POST",
			async: true,
			url: self.apis.users_forgetPassword,
			data: JSON.stringify({ 'key': key, 'newPassword': newPassword, 'confirmNewPassword': confirmNewPassword}),
			dataType: 'json',
			contentType: 'application/json',	//setting this should be covering the data into PUT body
			success: function(data){
				self.sessionManager.fetchSession(false, callback);

			},
			error: function (data, textStatus, jqXHR){
				Constants.dWarn("UserManager::findPassword:: action failed");
				if(callback){
					callback.error(data);
				}
			}
		});
	};

	/********************* User Relations ***************************/

	UserManager.prototype.watchUser = function(targetUserId, callback) {
		var self = this;
		if (typeof targetUserId !== 'number'){
			Constants.dWarn("UserManager::watchUser:: invalid parameter");
			return;
		}
		if (!this.sessionManager.hasSession()){
			Constants.dWarn("UserManager::watchUser:: session does not exist, exit");
			return;
		}


		var tempCurUser = new User();
		tempCurUser.overrideUrl(this.apis.users_watchUser);
		tempCurUser.set('userId', self.sessionManager.getUserId());
		tempCurUser.save({},{
			data: JSON.stringify({'targetUserId': targetUserId, 'action': 'watch'}),
            dataType:'json',

            success:function(model, response){
				self.timeStamp = new Date();
				if(callback){
					callback.success(tempCurUser);
				}
            },
            error: function(model, response){
                Constants.dWarn("UserManager::watchUser:: update failed with response:");
                Constants.dLog(response);
                if(callback){
					callback.error(response);
				}
            }
        });
	};

	UserManager.prototype.deWatchUser = function(targetUserId, callback) {
		var self = this;
		if (typeof targetUserId !== 'number'){
			Constants.dWarn("UserManager::deWatchUser:: invalid parameter");
			return;
		}
		if (!this.sessionManager.hasSession()){
			Constants.dWarn("UserManager::deWatchUser:: session does not exist, exit");
			return;
		}


		var tempCurUser = new User();
		//set the id of the temp user to curUserId to confront to API requirements
		tempCurUser.overrideUrl(this.apis.users_watchUser);
		tempCurUser.set('userId', self.sessionManager.getUserId());
		tempCurUser.save({}, {
			data: JSON.stringify({'userId':self.sessionManager.getUserId(),'targetUserId': targetUserId, 'action': 'dewatch'}),
            dataType:'json',

            success:function(model, response){
				self.timeStamp = new Date();
				if(callback){
					callback.success(tempCurUser);
				}
            },
            error: function(model, response){
                Constants.dWarn("UserManager::deWatchUser:: delete failed with response:");
                Constants.dLog(response);
                if(callback){
					callback.error(response);
				}
            }
        });
	};
	
	UserManager.prototype.isUserWatched = function(intendedUserId, callback) {
		//don't care about session
		if (typeof intendedUserId !== 'number'){
			Constants.dWarn("UserManager::isUserWatched:: invalid parameter");
			return;
		}

		var self = this;

		$.ajax({
			type: "GET",
			async: true,
			url: self.apis.users_isUserWatched+'/'+self.sessionManager.getUserId(),
			data: $.param({ 'intendedUserId': intendedUserId}),
			dataType: 'json',
			success: function(data){
				Info.log("isUserWatched call succeeded with response:");
				Info.log(data);

				if(callback && callback.success){
					callback.success(data.val === 'true' || data.val === true);
				}
			},
			error: function (data, textStatus, jqXHR){
				alert("请稍后再试");
				Constants.dWarn("UserManager::isUserWatched:: action failed");
				if(callback && callback.error){
					callback.error(data === 'true');
				}
			}
		});
	};


	UserManager.prototype.fetchWatchedUsers = function(intendedUserId, callback) {
		if(testMockObj.testMode){
			watchedUsers = testMockObj.sampleUsers;
			callback.success(watchedUsers, 0);
			return;
		}
		var self = this;

		if (typeof intendedUserId !== 'number'){
			Constants.dWarn("UserManager::fetchWatchedUsers:: invalid parameter, exit");
			return;
		}
		if (!this.sessionManager.hasSession()){
			Constants.dWarn("UserManager::fetchWatchedUsers:: session does not exist, exit");
			return;
		}


		var watchedUsers = new Users();
		//set the id of the temp user to curUserId to confront to API requirements
		watchedUsers.overrideUrl(this.apis.users_watchUser + '/' + self.sessionManager.getUserId());
		watchedUsers.fetch({
			data: $.param({ 'intendedUserId': intendedUserId}),
            dataType:'json',

            success:function(model, response){
				self.socialList_timeStamp = new Date();
				if(callback){
					callback.success(watchedUsers, 0);
				}
            },
            error: function(model, response){
                Constants.dWarn("UserManager::fetchWatchedUsers:: fetch failed with response:");
                Constants.dLog(response);
                if(callback){
					callback.error(response);
				}
            }
        });
	};


	UserManager.prototype.fetchMessageHistory = function(intendedUserId, callback) {
		if (testMockObj.testMode) {
			callback.success(testMockObj.sampleMessages);
			return;
		}

		var self = this;

		if (typeof intendedUserId !== 'number'){
			Constants.dWarn("UserManager::fetchMessageHistory:: invalid parameter, exit");
			return;
		}
		if (!this.sessionManager.hasSession()){
			Constants.dWarn("UserManager::fetchMessageHistory:: session does not exist, exit");
			return;
		}


		var messageHistory = new Messages();
		//confront to API requirements
		messageHistory.overrideUrl(this.apis.users_messageHistory + '/' + self.sessionManager.getUserId());
		messageHistory.fetch({
			data: $.param({ 'intendedUserId': intendedUserId}),
            dataType:'json',

            success:function(model, response){
				//TODO
				self.historyList_timeStamp = new Date();
				if(callback){
					callback.success(messageHistory);
				}
            },

            error: function(model, response){
                Constants.dWarn("UserManager::fetchMessageHistory:: fetch failed with response:");
                Constants.dLog(response);
                if(callback){
					callback.error(response);
				}
            }
        });
	};

	UserManager.prototype.fetchTransactionList = function(intendedUserId, callback) {
		if(testMockObj.testMode){
			callback.success(testMockObj.sampleTransactions);
			return;
		}
		var self = this;

		if (typeof intendedUserId !== 'number'){
			Constants.dWarn("UserManager::fetchTransactionList:: invalid parameter, exit");
			return;
		}
		if (!this.sessionManager.hasSession()){
			Constants.dWarn("UserManager::fetchTransactionList:: session does not exist, exit");
			return;
		}


		var transactionList = new Transactions();
		transactionList.overrideUrl(this.apis.users_transaction + '/' + self.sessionManager.getUserId());
		transactionList.fetch({
			data: $.param({ 'intendedUserId': intendedUserId}),
            dataType:'json',

            success:function(model, response){
				//caching?
				self.transactionList_timeStamp = new Date();
				if(callback){
					callback.success(transactionList);
				}
            },

            error: function(model, response){
                Constants.dWarn("UserManager::fetchTransactionList:: fetch failed with response:");
                Constants.dLog(response);
                if(callback){
					callback.error(response);
				}
            }
        });
	};


	UserManager.prototype.fetchNotificationList = function(intendedUserId, callback){
		if (testMockObj.testMode) {
			callback.success(testMockObj.sampleNotifications);
			return;
		}
		if (typeof intendedUserId !== 'number'){
			Constants.dWarn("UserManager::fetchNotification:: userId invalid");
			return;
		}
		if (!this.sessionManager.hasSession()){
			Constants.dWarn("UserManager::fetchNotification:: session does not exist, exit");
			return;
		}

		var self = this;
		//passing reset true to make sure notifications are always sync with server
		var notifications = new Notifications();
		notifications.overrideUrl(this.apis.users_notification + '/' + self.sessionManager.getUserId());
		notifications.fetch({
			reset: true,
			data: $.param({ 'userId': intendedUserId}),
			dataType:'json',
			success:function(model, response){
				self.notificationList_timeStamp = new Date();
				if(callback){
					callback.success(notifications);
				}
			},
			error: function(model, response){
				Constants.dWarn("UserManager::fetchNotification:: fetch failed with response:");
				Constants.dLog(response);
				if(callback){
					callback.error(response);
				}
			}
		});
	};



	/*
	* letters will only be fetched from sessionManager, as letters have highest privacy levels
	* letterFetchOptions can be empty, and can optionally inlude
		{
			direction: 0 | 1 | 2,  0, inbound letters, 1. outbound letters 2: both direction, 
			targetUserId: the userId I am fetching chat history from, this userId can be sender or receiver or both, depending on direction
			targetType: if user, when user messges will be fetch, if system, then you know..
		}
	*
	*/
	UserManager.prototype.fetchLetters = function(letterFetchOptions, callback){
		if (!this.sessionManager.hasSession()){
			Constants.dWarn("UserManager::fetchLetter:: session does not exist, exit");
			return;
		}

		var self = this,
			letters = new Letters();

		letterFetchOptions.userId = self.sessionManager.getUserId();
		letters.overrideUrl(this.apis.letter_letter + '/' + self.sessionManager.getUserId());
		letters.fetch({
			data: $.param(letterFetchOptions),
			dataType:'json',

			success:function(model, response){
				self.letter_timeStamp = new Date();
				if (callback) {
					callback.success(letters);
				}
			},
			error: function(model, response){
				Constants.dWarn("UserManager::fetchLetter:: fetch failed with response:");
				Constants.dLog(response);
				if(callback){
					callback.error(response);
				}
			}
		});
	};
	
	UserManager.prototype.fetchLetterUsers = function(callback){
		if (testMockObj.testMode) {
			callback.success(testMockObj.sampleUsers);
			return;
		}
		if (!this.sessionManager.hasSession()){
			Constants.dWarn("UserManager::fetchLetterUsers:: session does not exist, exit");
			return;
		}

		var self = this,
			users = new Users();

		users.overrideUrl(this.apis.letter_user + '/' + self.sessionManager.getUserId());
		users.fetch({
			dataType:'json',

			success:function(model, response){
				if (callback) {
					callback.success(users);
				}
			},
			error: function(model, response){
				Constants.dWarn("UserManager::fetchLetterUsers:: fetch failed with response:");
				Constants.dLog(response);
				if(callback){
					callback.error(response);
				}
			}
		});
	};

	UserManager.prototype.searchUsers = function(userSearchRepresentation, callback) {
		debugger;
		if (testMockObj.testMode) {
			callback.success(testMockObj.sampleUsers);
			return;
		}
		if (!this.sessionManager.hasSession()){
			Constants.dWarn("UserManager::searchUsers:: session does not exist, exit");
			return;
		}

		var self = this,
			users = new Users();

		users.overrideUrl(this.apis.users_searchUser);
		users.fetch({
			data: $.param({'userSearchRepresentation': userSearchRepresentation, 'userId': self.sessionManager.getUserId()}),
			dataType:'json',

			success:function(model, response){
				if (callback) {
					callback.success(users);
				}
			},
			error: function(model, response){
				Constants.dWarn("UserManager::searchUsers:: fetch failed with response:");
				Constants.dLog(response);
				if(callback){
					callback.error(response);
				}
			}
		});
	};

}).call(this);
