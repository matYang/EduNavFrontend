(function () {
    'use strict';

    this.UserManager = function(sessionManager){

        this.apis = new ApiResource();


        this.sessionManager = sessionManager;
        this.sessionManager.resgisterManager(this);
    };


    //reset the manager state upon logout
    UserManager.prototype.release = function() {
        this.sessionUser = this.sessionManager.getSessionUser();

    };


    UserManager.prototype.registerUser = function(newUser, callback) {
        var self = this;

        if (this.sessionManager.hasSession()){
            Info.warn("UserManager::registerUser::currentUser already has session, conflict, exit");
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
                Info.warn("UserManager::register:: action failed");
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
            Info.warn("UserManager::getUser::currentUser does not have session, exit");
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
                Info.warn("UserManager::getUser:: fetch failed with response:");
                Info.log(response);
                if(callback){
                    callback.error(response);
                }
            }
        });
    };




    UserManager.prototype.changeContactInfo = function(name, gender, phone, qq, birthday, location, callback) {
        //if invalid input or is already logged in, can not change contact information
        if (!(name && (typeof gender === 'number'))){
            Info.warn("UserManager::changeContactInfo:: invalid parameter");
            return;
        }

        if (!this.sessionManager.hasSession()){
            Info.warn("UserManager::changeContactInfo:: session does not exist, exit");
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
                Info.warn("UserManager::changeContactInfo:: action failed");
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
            Info.warn("UserManager::changePassword:: invalid parameter");
            return;
        }

        if (!this.sessionManager.hasSession()){
            Info.warn("UserManager::changePassword:: session does not exist, exit");
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
                Info.warn("UserManager::changePassword:: action failed");
                if(callback){
                    callback.error(data);
                }
            }
        });
        this.timeStamp = new Date();
    };



    UserManager.prototype.forgetPassword = function(email, callback) {
        var self = this;
        if (!(email)){
            Info.warn("UserManager::forgetPassword:: invalid parameter");
            return;
        }
        if (this.sessionManager.hasSession()){
            Info.warn("UserManager::forgetPassword:: session already exists, exit");
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
                Info.warn("UserManager::forgetPassword:: action failed");
                if(callback){
                    callback.error(data);
                }
            }
        });
    };

    UserManager.prototype.findPassword = function(key, newPassword, confirmNewPassword, callback) {
        var self = this;
        if (!(key && newPassword && confirmNewPassword)){
            Info.warn("UserManager::findPassword:: invalid parameter");
            return;
        }
        if (this.sessionManager.hasSession()){
            Info.warn("UserManager::findPassword:: session already exists, exit");
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
                Info.warn("UserManager::findPassword:: action failed");
                if(callback){
                    callback.error(data);
                }
            }
        });
    };

    /********************* User Relations ***************************/



    UserManager.prototype.fetchBookings = function(bookingId, callback) {
        if (typeof bookingId !== 'number' ){
            Info.warn("BookingManager::fetchBooking:: invalid parameter");
            return;
        }
        if (!this.sessionManager.hasSession()){
            Info.warn("BookingManager::fetchBooking:: session does not exist, exit");
            return;
        }

        var self = this;

        var booking = new Booking();
        booking.overrideUrl(this.apis.booking_booking);
        booking.set('bookingId', bookingId);

        booking.fetch({
            data: $.param({ 'userId': this.sessionManager.getUserId()}),
            dataType:'json',

            success:function(model, response){
                self.timeStamp = new Date();
                if(callback){
                    callback.success(booking);
                }
            },

            error: function(model, response){
                Info.warn("BookingManager::fetchBooking:: fetch failed with response:");
                Info.log(response);
                if(callback){
                    callback.error(response);
                }
            }
        });
    };

    UserManager.prototype.initBooking = function(newBooking, callback){
        if (!newBooking || typeof newBooking !== 'object'){
            Info.warn("BookingManager::initBooking:: invalid parameter");
            return;
        }
        if (!this.sessionManager.hasSession()){
            Info.warn("BookingManager::initBooking:: session does not exist, exit");
            return;
        }

        var self = this;

        newBooking.overrideUrl(this.apis.booking_booking);
        newBooking.set('bookingId', -1);
        newBooking.set('userId', this.sessionManager.getUserId());
        newBooking.save({},{
            dataType:'json',

            success:function(model, response){
                self.booking = newBooking;
                self.timeStamp = new Date();

                if(callback){
                    callback.success();
                }
            },

            error: function(model, response){
                Info.warn("BookingManager::initBooking:: save failed with response:");
                Info.log(response);
                if(callback){
                    callback.error(response);
                }
            }
        });

    };


    //if evaluate, pass in score as well
    UserManager.prototype.changeBookingState = function(booking, callback) {
        var bookingId = booking.id;

        if (typeof bookingId !== 'number'){
            Info.warn("BookingManager::changeBookingState:: invalid parameter");
            return;
        }
        if (!this.sessionManager.hasSession()){
            Info.warn("BookingManager::changeBookingState:: session does not exist, exit");
            return;
        }

        var self = this;
        booking.overrideUrl(this.apis.booking_booking);

        booking.save({},{
            data: JSON.stringify({ 'userId': this.sessionManager.getUserId(), 'stateChangeAction': stateChangeAction, 'score': score}),
            dataType:'json',

            success:function(model, response){
                self.timeStamp = new Date();
                if(callback){
                    callback.success(booking);
                }
            },

            error: function(model, response){
                Info.warn("BookingManager::changeBookingState:: save failed with response:");
                Info.log(response);
                if(callback){
                    callback.error(response);
                }
            }
        });
    };
}).call(this);
