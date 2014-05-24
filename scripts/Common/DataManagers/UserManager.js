(function () {
    'use strict';

    this.UserManager = function(sessionManager){

        this.apis = new ApiResource();

        this.sessionManager = sessionManager;
        this.sessionManager.resgisterManager(this);
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
            url: self.apis.user_smsVerification,
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


    UserManager.prototype.registerUser = function(newUser, callback) {
        var self = this;

        if (this.sessionManager.hasSession()){
            Info.warn('UserManager::registerUser::currentUser already has session, conflict, exit');
            return;
        }

        newUser.overrideUrl(this.apis.user_user);
        newUser.set('userId', -1);
        newUser.save({},{
            dataType:'json',

            success:function(model, response){
                if(callback){
                    callback.success(newUser);
                }
            },
            error: function(model, response){
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
        if (testMockObj.testMode) {
            callback.success(testMockObj.sampleUser);
            return;
        }
        if (!this.sessionManager.hasSession()){
            Info.warn("UserManager::fetchUser::currentUser does not have session, exit");
            return;
        }

        var user = new User();
        user.overrideUrl(this.apis.user_user);
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

        user.overrideUrl(this.apis.user_info);
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

    /********************* Authentication Related ***************************/
    UserManager.prototype.changePasswordVerification = function(callback) {
        var self = this;
        if (!this.sessionManager.hasSession()){
            Info.warn('UserManager::changePasswordVerification:: session already exists, exit');
            return;
        }

        $.ajax({
            type: 'GET',
            url: self.apis.user_changePassword + '/' + self.sessionManager.getUserId(),
            dataType: 'json',
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

        $.ajax({
            type: 'PUT',
            url: self.apis.user_changePassword + '/' + self.sessionManager.getUserId(),
            data: JSON.stringify(opt),
            dataType: 'json',
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
            url: self.apis.user_forgetPassword,
            data: $.param({'phone': phone}),
            dataType: 'json',
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
            Info.warn('UserManager::findPassword:: invalid parameter');
            return;
        }
        if (this.sessionManager.hasSession()){
            Info.warn('UserManager::findPassword:: session already exists, exit');
            return;
        }

        $.ajax({
            type: 'POST',
            url: self.apis.user_forgetPassword,
            data: JSON.stringify(opt),
            dataType: 'json',
            contentType: 'application/json',
            success: function(data){
                self.sessionManager.fetchSession(false, callback);
            },
            error: function (data, textStatus, jqXHR){
                Info.warn('UserManager::findPassword:: action failed');
                Info.warn(data);
                if(callback){
                    callback.error(data);
                }
            }
        });
    };

    /********************* User Relations ***************************/
    UserManager.prototype.fetchBookings = function(bookingSearchRepresentation, callback) {
        var self = this;

        if (!this.sessionManager.hasSession()){
            Info.warn('BookingManager::fetchBookings:: session does not exist, exit');
            return;
        }

        var bookings = new Bookings();
        bookings.overrideUrl(this.apis.user_booking);
        bookings.fetch({
            data: $.param(bookingSearchRepresentation.toJSON()),
            dataType:'json',

            success:function(model, response){
                if(callback){
                    callback.success(bookings);
                }
            },

            error: function(model, response){
                Info.warn('BookingManager::fetchBookings:: fetch failed with response:');
                Info.warn(response);
                if(callback){
                    callback.error(response);
                }
            }
        });
    };

    UserManager.prototype.initBooking = function(newBooking, callback){
        var self = this;

        if (!(booking instanceof Backbone.Model) || booking.id > 0){
            Info.warn('BookingManager::initBooking:: invalid parameter');
            return;
        }
        if (!this.sessionManager.hasSession()){
            Info.warn('BookingManager::initBooking:: session does not exist, exit');
            return;
        }

        newBooking.overrideUrl(this.apis.user_booking);
        newBooking.set('bookingId', -1);
        newBooking.set('userId', this.sessionManager.getUserId());
        newBooking.save({},{
            dataType:'json',

            success:function(model, response){
                if(callback){
                    callback.success(newBooking);
                }
            },
            error: function(model, response){
                Info.warn('BookingManager::initBooking:: save failed with response:');
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
            Info.warn('BookingManager::changeBookingState:: invalid parameter');
            return;
        }
        if (!this.sessionManager.hasSession()){
            Info.warn('BookingManager::changeBookingState:: session does not exist, exit');
            return;
        }

       
        booking.overrideUrl(this.apis.user_booking);
        booking.set('userId', this.sessionManager.getUserId());
        booking.save({},{
            dataType:'json',

            success:function(model, response){
                if(callback){
                    callback.success(booking);
                }
            },
            error: function(model, response){
                Info.warn('BookingManager::changeBookingState:: save failed with response:');
                Info.warn(response);
                if(callback){
                    callback.error(response);
                }
            }
        });
    };

}).call(this);
