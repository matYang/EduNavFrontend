(function () {
    'use strict';

    this.PartnerManager = function(sessionManager){

        this.apis = new ApiResource();

        //time stamp updates when user data changes or sycns
        this.timeStamp = new Date();
        
        this.sessionManager = sessionManager;
        this.sessionManager.resgisterManager(this);
    };


    //reset the manager state upon logout
    PartnerManager.prototype.release = function() {
        this.sessionUser = this.sessionManager.getSessionUser();
        this.timeStamp = new Date();
    };


    PartnerManager.prototype.getTimeStamp = function() {
        return this.timeStamp;
    };

    //will be used to display personal informatiom page only
    PartnerManager.prototype.login = function(callback){
        if (testMockObj.testMode) {
            callback.success(testMockObj.sampleUser);
            return;
        }
        var self = this;

        if (this.sessionManager.hasSession()){
            Info.warn("PartnerManager::login::session already exists, exit");
            return;
        }

        var user = new User();
        user.overrideUrl(this.apis.partner_login);
        user.set('userId', this.sessionManager.getUserId());
        user.fetch({
            data: $.param({ 'intendedUserId': intendedUserId}),
            dataType:'json',

            success:function(model, response){
                self.timeStamp = new Date();
                if(callback){
                    callback.success(user);
                }
            },
            error: function(model, response){
                Info.warn("PartnerManager::login:: session fetch failed with response:");
                Info.log(response);
                if(callback){
                    callback.error(response);
                }
            }
        });
    };

    PartnerManager.prototype.logout = function(callback){
        var self = this;

        if (!this.sessionManager.hasSession()){
            Info.warn("PartnerManager::logout::Session does not exist");
            return;
        }

        var user = new User();
        user.overrideUrl(this.apis.partner_login);
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
                Info.warn("PartnerManager::getUser:: fetch failed with response:");
                Info.log(response);
                if(callback){
                    callback.error(response);
                }
            }
        });
    };
    PartnerManager.prototype.forgetPassword = function(email, callback) {
        var self = this;
        if (!(email)){
            Info.warn("PartnerManager::forgetPassword:: invalid parameter");
            return;
        }
        if (this.sessionManager.hasSession()){
            Info.warn("PartnerManager::forgetPassword:: session already exists, exit");
            return;
        }

        $.ajax({
            type: "GET",
            async: true,
            url: self.apis.partner_forgetPassword,
            data: $.param({'email': email}),
            dataType: 'json',
            success: function(data){
                if(callback){
                    callback.success(2);
                }
            },
            error: function (data, textStatus, jqXHR){
                alert("请稍后再试");
                Info.warn("PartnerManager::forgetPassword:: action failed");
                if(callback){
                    callback.error(data);
                }
            }
        });
    };

    PartnerManager.prototype.recoverPassword = function(key, newPassword, confirmNewPassword, callback) {
        var self = this;
        if (!(key && newPassword && confirmNewPassword)){
            Info.warn("PartnerManager::findPassword:: invalid parameter");
            return;
        }
        if (this.sessionManager.hasSession()){
            Info.warn("PartnerManager::findPassword:: session already exists, exit");
            return;
        }


        $.ajax({
            type: "POST",
            async: true,
            url: self.apis.partner_recoverPassword,
            data: JSON.stringify({ 'key': key, 'newPassword': newPassword, 'confirmNewPassword': confirmNewPassword}),
            dataType: 'json',
            contentType: 'application/json',    //setting this should be covering the data into PUT body
            success: function(data){
                self.sessionManager.fetchSession(false, callback);

            },
            error: function (data, textStatus, jqXHR){
                Info.warn("PartnerManager::findPassword:: action failed");
                if(callback){
                    callback.error(data);
                }
            }
        });
    };

    /********************* courses ***************************/
    PartnerManager.prototype.postCourse = function(course, callback) {
        var self = this;
        if (this.sessionManager.hasSession()){
            Info.warn("PartnerManager::postCourse:: session already exists, exit");
            return;
        }

        course.overrideUrl(this.apis.partner_course);
        course.save({},{
            data: $.param({partnerId: this.sessionUser.id}),
            dataType: 'json',
            success: function(data){
                if(callback){
                    callback.success(data);
                }
            },
            error: function (data, textStatus, jqXHR){
                Info.warn("PartnerManager::postCourse:: action failed");
                if(callback){
                    callback.error(data);
                }
            }
        });
    };

    PartnerManager.prototype.updateCourse = function(course, callback) {
        var self = this;
        if (this.sessionManager.hasSession()){
            Info.warn("PartnerManager::updateCourse:: session already exists, exit");
            return;
        }

        course.overrideUrl(this.apis.partner_course);
        course.save({},{
            data: $.param({partnerId: this.sessionUser.id}),
            dataType: 'json',
            success: function(data){
                if(callback){
                    callback.success(data);
                }
            },
            error: function (data, textStatus, jqXHR){
                Info.warn("PartnerManager::updateCourse:: action failed");
                if(callback){
                    callback.error(data);
                }
            }
        });
    };
}).call(this);
