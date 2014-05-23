(function () {
    'use strict';

    this.UserManager = function(sessionManager){

        this.apis = new ApiResource();

        //time stamp updates when user data changes or sycns
        this.timeStamp = new Date();

        this.sessionManager = sessionManager;
        this.sessionManager.resgisterManager(this);
    };


    //reset the manager state upon logout
    UserManager.prototype.release = function() {
        this.sessionUser = this.sessionManager.getSessionUser();

        this.timeStamp = new Date();
    };


    UserManager.prototype.getTimeStamp = function() {
        return this.timeStamp;
    };

    UserManager.prototype.registerUser = function(newUser, callback) {
        var self = this;

        if (this.sessionManager.hasSession()){
            Constants.dWarn("UserManager::registerUser::currentUser already has session, conflict, exit");
            return;
        }

        var sessionUser = newUser;
        sessionUser.overrideUrl(this.apis.user_user);
        sessionUser.set('userId', -1);
        sessionUser.save({},{
            dataType:'json',

            success:function(model, response){
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
        this.timeStamp = new Date();
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
        user.overrideUrl(this.apis.user_user);
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
            url: self.apis.user_email,
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
        sessionUser.overrideUrl(this.apis.user_contactInfo);
        sessionUser.set('name', name);
        sessionUser.set('gender', gender);
        sessionUser.set('phone', phone);
        sessionUser.set('location', location);
        sessionUser.save({},{
            dataType:'json',

            success:function(model, response){
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
        this.timeStamp = new Date();
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
        sessionUser.overrideUrl(this.apis.user_singleLocation);
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
        this.timeStamp = new Date();
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
            url: self.apis.user_changePassword + '/' + self.sessionManager.getUserId(),
            data: JSON.stringify({ 'oldPassword': oldPassword, 'newPassword': newPassword, 'confirmNewPassword': confirmNewPassword}),
            dataType: 'json',
            contentType: 'application/json',    //setting this should be covering the data into PUT body
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
        this.timeStamp = new Date();
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
            url: self.apis.user_emailActivation,
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
        this.timeStamp = new Date();
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
            url: self.apis.user_resendActivationEmail + '/' + self.sessionManager.getUserId(),
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
            url: self.apis.user_forgetPassword,
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
            url: self.apis.user_forgetPassword,
            data: JSON.stringify({ 'key': key, 'newPassword': newPassword, 'confirmNewPassword': confirmNewPassword}),
            dataType: 'json',
            contentType: 'application/json',    //setting this should be covering the data into PUT body
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

}).call(this);
