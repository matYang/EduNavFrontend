(function () {
    'use strict';

    this.UserManager = function(sessionManager){

        this.sessionManager = sessionManager;
        this.sessionManager.registerManager(this);
    };


    //reset the manager state upon logout
    UserManager.prototype.release = function() {};

    UserManager.prototype.smsVerification = function(phone, callback) {
        var self = this;
        if (!phone){
            Info.warn('UserManager::smsVerification:: invalid parameter');
            return;
        }
        if (this.sessionManager.hasSession()){
            Info.warn('UserManager::smsVerification:: session already exists, exit');
            return;
        }

        $.ajax({
            type: 'GET',
            url: ApiResource.user_smsVerification,
            data: $.param({'phone': phone}),
            dataType: 'json',
            success: function(data){
                if(callback){
                    callback.success();
                }
            },
            error: function (data, textStatus, jqXHR){
                Info.warn('UserManager::smsVerification:: action failed');
                Info.warn(data);
                if(callback){
                    callback.error(data);
                }
            }
        });
    };

    UserManager.prototype.verifySMSAuthCode = function(phone, authCode, callback) {
        var self = this;
        if (!phone){
            Info.warn('UserManager::verifySMSAuthCode:: invalid parameter');
            return;
        }
        if (this.sessionManager.hasSession()){
            Info.warn('UserManager::verifySMSAuthCode:: session already exists, exit');
            return;
        }

        $.ajax({
            type: 'POST',
            url: ApiResource.user_smsVerification,
            data: JSON.stringify({'phone': phone, 'authCode': authCode.toUpperCase()}),
            dataType: 'json',
            contentType: 'application/json',
            success: function(data){
                if(callback){
                    callback.success();
                }
            },
            error: function (data, textStatus, jqXHR){
                Info.warn('UserManager::verifySMSAuthCode:: action failed');
                Info.warn(data);
                if(callback){
                    callback.error(data);
                }
            }
        });
    };


    UserManager.prototype.registerUser = function(newUser, callback) {
        var self = this;

        if (this.sessionManager.hasSession()){
            Info.warn('UserManager::registerUser::currentUser already has session, conflict, exit');
            return;
        }
        $.ajax({
            type: "POST",
            url: ApiResource.user_user,
            dataType: "json",
            async: true,
            data: JSON.stringify(newUser),
            contentType: 'application/json',
            success: function (data, response) {
                if (callback) {
                    callback.success(data);
                }
            },
            error: function (data, response) {
                Info.warn('UserManager::register failed');
                Info.warn(response);
                if(callback){
                    callback.error(response);
                }
            }
        });
    };

    UserManager.prototype.fetchUser = function(callback){
        var self = this;
        var user = new User();

        if (testMockObj.testMode) {
            callback.success(testMockObj.testUser);
            return;
        }
        if (!this.sessionManager.hasSession()){
            Info.warn("UserManager::fetchUser::currentUser does not have session, exit");
            return;
        }

        user.overrideUrl(ApiResource.user_user);
        user.set('userId', this.sessionManager.getId());
        user.fetch({
            dataType:'json',

            success:function(model, response){
                if(callback){
                    callback.success(user);
                }
            },
            error: function(model, response){
                Info.warn("UserManager::fetchUser:: fetch failed with response:");
                Info.warn(response);
                if(callback){
                    callback.error(response);
                }
            }
        });
    };


    UserManager.prototype.changeInfo = function(user, callback) {
        var self = this;

        if (!this.sessionManager.hasSession()){
            Info.warn('UserManager::changeContactInfo:: session does not exist, exit');
            return;
        }

        user.overrideUrl(ApiResource.user_info);
        user.set('userId', this.sessionManager.getId());
        user.save({},{
            dataType:'json',

            success:function(model, response){
                if(callback){
                    callback.success(user);
                }
            },
            error: function(model, response){
                Info.warn('UserManager::changeContactInfo failed');
                Info.warn(response);
                if(callback){
                    callback.error(response);
                }
            }
        });
    };

    /****************
    *   Authentication Related
    ****************/
    UserManager.prototype.changePasswordVerification = function(callback) {
        var self = this;
        if (!this.sessionManager.hasSession()){
            Info.warn('UserManager::changePasswordVerification:: session already exists, exit');
            return;
        }

        $.ajax({
            type: 'GET',
            url: ApiResource.user_changePassword + '/' + self.sessionManager.getId(),
            dataType: 'json',
            contentType: 'application/json',
            success: function(data){
                if(callback){
                    callback.success();
                }
            },
            error: function (data, textStatus, jqXHR){
                Info.warn('UserManager::changePasswordVerification:: action failed');
                Info.warn(data);
                if(callback){
                    callback.error(data);
                }
            }
        });
    };

    //desired opt format:  { 'oldPassword': oldPassword, 'newPassword': newPassword, 'confirmNewPassword': confirmNewPassword, 'authCode': authCode}
    UserManager.prototype.changePassword = function(opt, callback) {
        var self = this;

        if (!(opt.oldPassword && opt.newPassword && opt.confirmNewPassword && opt.authCode)){
            Info.warn('UserManager::changePassword:: invalid parameter');
            return;
        }
        if (!this.sessionManager.hasSession()){
            Info.warn('UserManager::changePassword:: session does not exist, exit');
            return;
        }
        opt.authCode = opt.authCode.toUpperCase();
        $.ajax({
            type: 'PUT',
            url: ApiResource.user_changePassword + '/' + self.sessionManager.getId(),
            data: JSON.stringify(opt),
            dataType: 'text',
            contentType: 'application/json',
            success: function(data){
                if(callback){
                    callback.success();
                }
            },
            error: function (data, textStatus, jqXHR){
                Info.warn('UserManager::changePassword:: action failed');
                Info.warn();
                if(callback){
                    callback.error(data);
                }
            }
        });
    };



    UserManager.prototype.forgetPassword = function(phone, callback) {
        var self = this;
        if (!phone){
            Info.warn('UserManager::forgetPassword:: invalid parameter');
            return;
        }
        if (this.sessionManager.hasSession()){
            Info.warn('UserManager::forgetPassword:: session already exists, exit');
            return;
        }

        $.ajax({
            type: 'GET',
            async: true,
            url: ApiResource.user_forgetPassword,
            data: $.param({'phone': phone}),
            dataType: 'json',
            contentType: 'application/json',

            success: function(data){
                if(callback){
                    callback.success();
                }
            },
            error: function (data, textStatus, jqXHR){
                Info.warn('UserManager::forgetPassword:: action failed');
                Info.warn(data);
                if(callback){
                    callback.error(data);
                }
            }
        });
    };

    //desired opt format:  { 'phone': phone, 'newPassword': newPassword, 'confirmNewPassword': confirmNewPassword, 'authCode': authCode}
    UserManager.prototype.recoverPassword = function(opt, callback) {
        var self = this;
        if (!(opt.phone && opt.newPassword && opt.confirmNewPassword && opt.authCode)){
            Info.warn('UserManager::recoverPassword:: invalid parameter');
            return;
        }
        if (this.sessionManager.hasSession()){
            Info.warn('UserManager::recoverPassword:: session already exists, exit');
            return;
        }
        opt.authCode = opt.authCode.toUpperCase();
        $.ajax({
            type: 'POST',
            url: ApiResource.user_forgetPassword,
            data: JSON.stringify(opt),
            dataType: 'json',
            contentType: 'application/json',
            success: function(data){
                self.sessionManager.fetchSession(false, callback);
            },
            error: function (data, textStatus, jqXHR){
                Info.warn('UserManager::recoverPassword:: action failed');
                Info.warn(data);
                if(callback){
                    callback.error(data);
                }
            }
        });
    };

    /****************
    *   User Relations
    ****************/
    UserManager.prototype.fetchBookings = function(bookingSearchRepresentation, callback) {
        var self = this;

        if (!this.sessionManager.hasSession()){
            Info.warn('UserManager::fetchBookings:: session does not exist, exit');
            return;
        }

        var bookings = new Bookings();
        bookings.overrideUrl(ApiResource.user_booking);
        bookings.fetch({
            data: bookingSearchRepresentation.toQueryString(),
            dataType:'json',

            success:function(model, response){
                if(callback){
                    callback.success(bookings);
                }
            },

            error: function(model, response){
                Info.warn('UserManager::fetchBookings:: fetch failed with response:');
                Info.warn(response);
                if(callback){
                    callback.error(response);
                }
            }
        });
    };

    UserManager.prototype.initBooking = function(newBooking, callback){
        var self = this;
        if (testMockObj.testMode) {
            callback.success(testMockObj.testBooking1);
            return;
        }
        if (!(newBooking instanceof Backbone.Model) || newBooking.id > 0){
            Info.warn('UserManager::initBooking:: invalid parameter');
            return;
        }
        newBooking.overrideUrl(ApiResource.user_booking);
        newBooking.set('bookingId', -1);
        newBooking.set("course", undefined);
        newBooking.set('userId', this.sessionManager.getId());
        newBooking.save({},{
            dataType:'json',

            success:function(model, response){
                if(callback){
                    callback.success(newBooking);
                }
            },
            error: function(model, response){
                Info.warn('UserManager::initBooking:: save failed with response:');
                Info.log(response);
                if(callback){
                    callback.error(response);
                }
            }
        });

    };


    UserManager.prototype.changeBookingState = function(booking, callback) {
        var self = this;

        if (!(booking instanceof Backbone.Model) || booking.id < 0){
            Info.warn('UserManager::changeBookingState:: invalid parameter');
            return;
        }
        if (!this.sessionManager.hasSession()){
            Info.warn('UserManager::changeBookingState:: session does not exist, exit');
            return;
        }

       
        booking.overrideUrl(ApiResource.user_booking);
        booking.set('userId', this.sessionManager.getId());
        booking.save({},{
            dataType:'json',

            success:function(model, response){
                if(callback){
                    callback.success(booking);
                }
            },
            error: function(model, response){
                Info.warn('UserManager::changeBookingState:: save failed with response:');
                Info.warn(response);
                if(callback){
                    callback.error(response);
                }
            }
        });
    };

    /* Coupons */
    UserManager.prototype.claimCoupon =  function (couponId, callback) {
        var self = this;
        if (!this.sessionManager.hasSession()){
            Info.warn('UserManager::claimCoupon:: session does not exist.');
            return;
        }

        $.ajax({
            type: 'PUT',
            url: ApiResource.user_coupon + "/" + couponId,
            dataType: 'json',
            success: function(data){
                if(callback){
                    callback.success();
                }
            },
            error: function (data, textStatus, jqXHR){
                Info.warn('UserManager::claimCoupon:: action failed');
                Info.warn(data);
                if(callback){
                    callback.error(data);
                }
            }
        });
    };

}).call(this);
