(function () {
    'use strict';


    this.AdminManager = function(sessionManager){

        this.apis = new AdminApiResource();

        this.sessionManager = sessionManager;
        this.sessionManager.resgisterManager(this);
    };


    AdminManager.prototype.release = function() {};



    AdminManager.prototype.createAdmin = function(admin, callback, opt){
        if (opt){
            admin.overrideUrl(this.apis.admin_admin + '?secret1=' + opt.secret1 + '&secret2=' + opt.secret2 + '&secret3=' + opt.secret3);
        }
        else{
            admin.overrideUrl(this.apis.admin_admin);
        }
        admin.set('adminId', -1);
        admin.save({}, {
            dataType:'json',

            success:function(model, response){
                if(callback){
                    callback.success(admin);
                }
            },
            error: function(model, response){
                Info.warn("AdminManager::createAdmin:: createAdmin failed with response:");
                Info.warn(response);
                if(callback){
                    callback.error(response);
                }
            }
        });
    };

    AdminManager.prototype.listAdmin = function(callback, opt){
        var admins = new Users();
        if (opt){
            admins.overrideUrl(this.apis.admin_admin + '?secret1=' + opt.secret1 + '&secret2=' + opt.secret2 + '&secret3=' + opt.secret3);
        }
        else{
            admins.overrideUrl(this.apis.admin_admin);
        }

        admins.fetch({
            dataType:'json',

            success:function(model, response){
                if(callback){
                    callback.success(admins);
                }
            },
            error: function(model, response){
                Info.warn("AdminManager::listAdmin:: listAdmin failed with response:");
                Info.warn(response);
                if(callback){
                    callback.error(response);
                }
            }
        });
    };

    AdminManager.prototype.updateAdmin = function(admin, callback){
        if (!this.sessionManager.hasSession()){
            Info.warn("AdminManager::findCourse:: session does not exist, exit");
            return;
        }
        admin.overrideUrl(this.apis.admin_admin);
        admin.save({}, {
            dataType:'json',

            success:function(model, admin){
                if(callback){
                    callback.success(admin);
                }
            },
            error: function(model, response){
                Info.warn("AdminManager::updateAdmin:: updateAdmin failed with response:");
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
    AdminManager.prototype.changePassword = function(adminId, password, callback){
        var self = this;
        if (!(adminId && password)){
            Info.warn('AdminManager::changePassword:: invalid parameter');
            return;
        }
        if (!this.sessionManager.hasSession()){
            Info.warn('AdminManager::changePassword:: session does not exist, exit');
            return;
        }

        $.ajax({
            type: 'PUT',
            url: self.apis.admin_changePassword + '/' + adminId,
            data: JSON.stringify({'password': password}),
            dataType: 'json',
            contentType: 'application/json',
            success: function(data){
                if(callback){
                    callback.success();
                }
            },
            error: function (data, textStatus, jqXHR){
                Info.warn('AdminManager::changePassword:: action failed');
                Info.warn();
                if(callback){
                    callback.error(data);
                }
            }
        });
    };


    /****************
    *   Partner Related
    ****************/
    AdminManager.prototype.listPartner = function(partnerSearchRepresentation, callback){
        var self = this,
            searchResults = new Partners();

        if (!this.sessionManager.hasSession()){
            Info.warn('AdminManager::listPartner:: session does not exist, exit');
            return;
        }

        searchResults.overrideUrl(this.apis.admin_partner);
        searchResults.fetch({
            data: $.param(partnerSearchRepresentation.toJSON()),
            dataType:'json',

            success:function(model, response){
                if(callback){
                    callback.success(searchResults);
                }
            },
            error: function(model, response){
                Info.warn('AdminManager::listPartner:: fetch failed with response:');
                Info.warn(response);
                if(callback){
                    callback.error(response);
                }
            }
        });
    };


    /****************
    *   User Related
    ****************/
    AdminManager.prototype.listUser = function(userSearchRepresentation, callback){
        var self = this,
            searchResults = new Users();

        if (!this.sessionManager.hasSession()){
            Info.warn('AdminManager::listUser:: session does not exist, exit');
            return;
        }

        searchResults.overrideUrl(this.apis.admin_user);
        searchResults.fetch({
            data: $.param(userSearchRepresentation.toJSON()),
            dataType:'json',

            success:function(model, response){
                if(callback){
                    callback.success(searchResults);
                }
            },
            error: function(model, response){
                Info.warn('AdminManager::listUser:: fetch failed with response:');
                Info.warn(response);
                if(callback){
                    callback.error(response);
                }
            }
        });
    };

    AdminManager.prototype.updateUser = function(user, callback){
        if (!this.sessionManager.hasSession()){
            Info.warn("AdminManager::update:: session does not exist, exit");
            return;
        }
        user.overrideUrl(this.apis.admin_user);
        user.save({}, {
            dataType:'json',
            success:function(model, response){
                if(callback){
                    callback.success(user);
                }
            },
            error: function(model, response){
                Info.warn("AdminManager::updateUser:: updateUser failed with response:");
                Info.warn(response);
                if(callback){
                    callback.error(response);
                }
            }
        });
    };



    /****************
    *   Booking Related
    ****************/
    AdminManager.prototype.listBooking = function(bookingSearchRepresentation, callback){
        var self = this,
            searchResults = new Bookings();

        if (!this.sessionManager.hasSession()){
            Info.warn('AdminManager::listBooking:: session does not exist, exit');
            return;
        }

        searchResults.overrideUrl(this.apis.admin_booking);
        searchResults.fetch({
            data: $.param(bookingSearchRepresentation.toJSON()),
            dataType:'json',

            success:function(model, response){
                if(callback){
                    callback.success(searchResults);
                }
            },
            error: function(model, response){
                Info.warn('AdminManager::listBooking:: fetch failed with response:');
                Info.warn(response);
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
            dataType:'json',

            success:function(model, response){
                if(callback){
                    callback.success(booking);
                }
            },
            error: function(model, response){
                Info.warn("AdminManager::updateBooking:: save failed with response:");
                Info.warn(response);
                if(callback){
                    callback.error(response);
                }
            }
        });
    };



    /****************
    *   Course Related
    ****************/
    //multi-form


}).call(this);