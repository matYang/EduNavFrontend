(function () {
    'use strict';


    this.AdminManager = function(sessionManager, userManager){

        this.apis = new AdminApiResource();

        this.sessionManager = sessionManager;
        this.userManager = userManager;

        this.sessionManager.resgisterManager(this);
    };


    AdminManager.prototype.release = function() {
    };

    AdminManager.prototype.login = function(emailVal, passwordVal, callback){
        //if invalid input or is already logged in, can not login
        if (!(emailVal && passwordVal)){
            Info.warn("AdminManager::lougout:: invalid parameter");
            return;
        }
        if (this.hasSession()){
            Info.warn("AdminManager::login::already logged in, conflict, still sending the login request");
            app.navigate("/main", true);
        }
        var self = this;

        this.sessionUser.overrideUrl(this.apis.admin_login);
        //make sure the user is new, so no id is in the api path
        this.sessionUser.set('email', emailVal);
        this.sessionUser.set('password', passwordVal);
        this.sessionUser.save({},{
            dataType:'json',

            success:function(model, response){

                self.fetchCurUserNotifications();
                self.fetchCurUserLetters();
                self.fetchCurUserFavorites();

                Info.log(model);
                if(callback){
                    callback.success(response);
                }
            },

            error: function(model, response){
                Info.warn("AdminManager::login:: login failed with response:");
                Info.log(response);
                if(callback){
                    callback.error(response);
                }
            }
        });
    };

    AdminManager.prototype.logout = function(callback){
        if (!this.hasSession()){
            Info.warn("AdminManager::logout::not logged in, conflict, still sending the logout request");
        }
        var self = this;

        this.sessionUser.overrideUrl(this.apis.admin_logout);
        this.sessionUser.save({},{
            dataType:'json',

            success:function(model, response){
                if(callback){
                    callback.success(response);
                }
            },

            error: function(model, response){
                Info.warn("AdminManager::logout:: logout failed with response:");
                Info.log(response);

                if(callback){
                    callback.error(response);
                }
            }
        });
    };

    AdminManager.prototype.createAdmin = function(admin, callback){
        if (!this.sessionManager.hasSession()){
            Info.warn("AdminManager::findCourse:: session does not exist, exit");
            return;
        }
        admin.overrideUrl(this.apis.admin_admin);
        admin.save({}, {
            dataType:'json',

            success:function(model, response){
                if(callback){
                    callback.success(response);
                }
            },

            error: function(model, response){
                Info.warn("AdminManager::createAdmin:: createAdmin failed with response:");
                Info.log(response);
                if(callback){
                    callback.error(response);
                }
            }
        });
    };

    AdminManager.prototype.listAdmin = function(callback){
        var Admins = new Users();
        Admins.overrideUrl(this.apis.admin_admin);
        Admins.fetch({});
    };

    AdminManager.prototype.updateAdmin = function(admin, callback){
        if (!this.sessionManager.hasSession()){
            Info.warn("AdminManager::findCourse:: session does not exist, exit");
            return;
        }
        admin.overrideUrl(this.apis.admin_admin);
        admin.save({}, {
            dataType:'json',

            success:function(model, response){
                if(callback){
                    callback.success(response);
                }
            },

            error: function(model, response){
                Info.warn("AdminManager::updateAdmin:: updateAdmin failed with response:");
                Info.log(response);
                if(callback){
                    callback.error(response);
                }
            }
        });
    };

    AdminManager.prototype.createPartner = function(partner, callback){
        //MultiForm
    };

    AdminManager.prototype.listPartner = function(callback){
        var partners = new Users();
        partners.overrideUrl(this.apis.admin_partner);
        partners.fetch({});
    };

    AdminManager.prototype.updatePartner = function(partner, callback){
        if (!this.sessionManager.hasSession()){
            Info.warn("AdminManager::findCourse:: session does not exist, exit");
            return;
        }
        partner.overrideUrl(this.apis.admin_partner);
        partner.save({}, {
            dataType:'json',
            data: $.param({ 'adminId': this.sessionManager.getUserId()}),
            success:function(model, response){
                if(callback){
                    callback.success(response);
                }
            },
            error: function(model, response){
                Info.warn("AdminManager::updatePartner:: updatePartner failed with response:");
                Info.log(response);
                if(callback){
                    callback.error(response);
                }
            }
        });
    };

    AdminManager.prototype.listUser = function(callback){
        var users = new Users();
        users.overrideUrl(this.apis.admin_user);
        users.fetch({}); 
    };

    AdminManager.prototype.updateUser = function(user, callback){
        if (!this.sessionManager.hasSession()){
            Info.warn("AdminManager::findCourse:: session does not exist, exit");
            return;
        }
        user.overrideUrl(this.apis.admin_partner);
        user.save({}, {
            dataType:'json',
            data: $.param({ 'adminId': this.sessionManager.getUserId()}),
            success:function(model, response){
                if(callback){
                    callback.success(response);
                }
            },
            error: function(model, response){
                Info.warn("AdminManager::updateUser:: updateUser failed with response:");
                Info.log(response);
                if(callback){
                    callback.error(response);
                }
            }
        });
    };

    AdminManager.prototype.listBookings = function(callback){
        var partners = new Users();
        partners.overrideUrl(this.apis.admin_partner);
        partners.fetch({
            data: $.param({ 'adminId': this.sessionManager.getUserId()}),
            dataType:'json',
            success:function(model, response){
                self.timeStamp = new Date();
                if(callback){
                    callback.success(booking);
                }
            },

            error: function(model, response){
                Info.warn("AdminManager::listBookings:: fetch failed with response:");
                Info.log(response);
                if(callback){
                    callback.error(response);
                }
            }
        });
    };

    AdminManager.prototype.findBooking = function(bookingId, callback) {
        if (typeof bookingId !== 'number' ){
            Info.warn("AdminManager::findBooking:: invalid parameter");
            return;
        }
        if (!this.sessionManager.hasSession()){
            Info.warn("AdminManager::findBooking:: session does not exist, exit");
            return;
        }

        var self = this;

        var booking = new Booking();
        booking.overrideUrl(this.apis.admin_booking);
        booking.set('bookingId', bookingId);

        booking.fetch({
            data: $.param({ 'adminId': this.sessionManager.getUserId()}),
            dataType:'json',

            success:function(model, response){
                self.timeStamp = new Date();
                if(callback){
                    callback.success(booking);
                }
            },

            error: function(model, response){
                Info.warn("AdminManager::findBooking:: fetch failed with response:");
                Info.log(response);
                if(callback){
                    callback.error(response);
                }
            }
        });
    };

    AdminManager.prototype.updateBooking = function(booking, callback) {
        if (!this.sessionManager.hasSession()){
            Info.warn("AdminManager::updateBooking:: session does not exist, exit");
            return;
        }
        booking.overrideUrl(this.apis.admin_booking);
        booking.save({},{
            data: $.param({ 'adminId': this.sessionManager.getUserId()}),
            dataType:'json',

            success:function(model, response){
                self.timeStamp = new Date();
                if(callback){
                    callback.success(booking);
                }
            },

            error: function(model, response){
                Info.warn("AdminManager::updateBooking:: save failed with response:");
                Info.log(response);
                if(callback){
                    callback.error(response);
                }
            }
        });
    };


    AdminManager.prototype.findCourse = function(courseId, callback) {
        if (typeof bookingId !== 'number' ){
            Info.warn("AdminManager::findCourse:: invalid parameter");
            return;
        }
        if (!this.sessionManager.hasSession()){
            Info.warn("AdminManager::findCourse:: session does not exist, exit");
            return;
        }

        var self = this;

        var course = new Course();
        course.overrideUrl(this.apis.admin_course);
        course.set('courseId', courseId);

        course.fetch({
            data: $.param({ 'adminId': this.sessionManager.getUserId()}),
            dataType:'json',

            success:function(model, response){
                self.timeStamp = new Date();
                if(callback){
                    callback.success(booking);
                }
            },

            error: function(model, response){
                Info.warn("AdminManager::findCourse:: fetch failed with response:");
                Info.log(response);
                if(callback){
                    callback.error(response);
                }
            }
        });
    };


}).call(this);