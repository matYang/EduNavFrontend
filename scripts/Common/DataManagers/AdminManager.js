(function () {
    


    this.AdminManager = function(sessionManager){
        this.sessionManager = sessionManager;
        this.sessionManager.registerManager(this);
    };


    AdminManager.prototype.release = function() {};

    AdminManager.prototype.createAdmin = function(admin, callback, keys){
        if (keys){
            admin.overrideUrl(AdminApiResource.admin_admin + '?secret1=' + keys.secret1 + '&secret2=' + keys.secret2 + '&secret3=' + keys.secret3);
        }
        else{
            admin.overrideUrl(AdminApiResource.admin_admin);
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
                Info.warn('AdminManager::createAdmin:: createAdmin failed with response:');
                Info.warn(response);
                if(callback){
                    callback.error(response);
                }
            }
        });
    };

    AdminManager.prototype.fetchAdmin = function(adminId, callback) {
        var self = this;
        var admin = new Admin();
        if (!this.sessionManager.hasSession()){
            Info.warn("AdminManager::fetchAdmin::currentAdmin does not have session, exit");
            return;
        }
        if (testMockObj.testMode) {
            callback.success(testMockObj.testAdmin);
            return;
        }

        admin.overrideUrl(AdminApiResource.admin_admin + "/" + adminId);
        admin.set('adminId', this.sessionManager.getId());
        admin.fetch({
            dataType:'json',

            success:function(model, response){
                if(callback){
                    callback.success(admin);
                }
            },
            error: function(model, response){
                Info.warn("AdminManager::fetchAdmin:: fetch failed with response:");
                Info.warn(response);
                if(callback){
                    callback.error(response);
                }
            }
        });
    };


    AdminManager.prototype.listAdmin = function(adminSearchRepresentation, callback, keys){
        var admins = new Users();
        var queryObj = adminSearchRepresentation.toQueryString();

        if (keys){
            queryObj.secret1 = keys.secret1;
            queryObj.secret2 = keys.secret2;
            queryObj.secret3 = keys.secret3;
        }

        admins.overrideUrl(AdminApiResource.admin_admin);
        admins.fetch({
            data: queryObj,
            dataType:'json',

            success:function(model, response){
                if(callback){
                    callback.success(admins);
                }
            },
            error: function(model, response){
                Info.warn('AdminManager::listAdmin:: listAdmin failed with response:');
                Info.warn(response);
                if(callback){
                    callback.error(response);
                }
            }
        });
    };

    AdminManager.prototype.updateAdmin = function(admin, callback){
        if (!this.sessionManager.hasSession()){
            Info.warn('AdminManager::findCourse:: session does not exist, exit');
            return;
        }
        admin.overrideUrl(AdminApiResource.admin_admin);
        admin.save({}, {
            dataType:'json',

            success:function(model, admin){
                if(callback){
                    callback.success(admin);
                }
            },
            error: function(model, response){
                Info.warn('AdminManager::updateAdmin:: updateAdmin failed with response:');
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
            url: AdminApiResource.admin_changePassword + '/' + adminId,
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
    AdminManager.prototype.fetchPartner = function(partnerId, callback){
        var self = this;
        var partner = new Partner();
        
        if (testMockObj.testMode) {
            callback.success(testMockObj.testPartner1);
            return;
        }
        if (!this.sessionManager.hasSession()){
            Info.warn('PartnerManager::fetchPartner::currentPartner does not have session, exit');
            return;
        }
        
        partner.overrideUrl(ApiResource.partner_partner);
        partner.set('partnerId', partnerId);
        partner.fetch({
            dataType:'json',

            success:function(model, response){
                if(callback){
                    callback.success(partner);
                }
            },
            error: function(model, response){
                Info.warn('PartnerManager::fetchPartner:: fetch failed with response:');
                Info.warn(response);
                if(callback){
                    callback.error(response);
                }
            }
        });
    };

    AdminManager.prototype.updatePartner = function(partner, callback){
        var self = this;
        if (testMockObj.testMode) {
            callback.success(testMockObj.testPartner1);
            return;
        }
        if (!this.sessionManager.hasSession()){
            Info.warn('PartnerManager::fetchPartner::currentPartner does not have session, exit');
            return;
        }
        
        partner.overrideUrl(ApiResource.partner_partner);
        partner.save({}, {
            dataType:'json',
            success:function(model, response){
                if(callback){
                    callback.success(partner);
                }
            },
            error: function(model, response){
                Info.warn('PartnerManager::fetchPartner:: fetch failed with response:');
                Info.warn(response);
                if(callback){
                    callback.error(response);
                }
            }
        });
    };


    AdminManager.prototype.listPartner = function(partnerSearchRepresentation, callback){
        var self = this,
            searchResults = new Partners();

        if (!this.sessionManager.hasSession()){
            Info.warn('AdminManager::listPartner:: session does not exist, exit');
            return;
        }

        searchResults.overrideUrl(AdminApiResource.admin_partner);
        searchResults.fetch({
            data: partnerSearchRepresentation.toQueryString(),
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

        searchResults.overrideUrl(AdminApiResource.admin_user);
        searchResults.fetch({
            data: userSearchRepresentation.toQueryString(),
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
            Info.warn('AdminManager::update:: session does not exist, exit');
            return;
        }
        user.overrideUrl(AdminApiResource.admin_user + "/" + user.get("userId"));
        user.save({}, {
            dataType:'json',
            success:function(model, response){
                if(callback){
                    callback.success(user);
                }
            },
            error: function(model, response){
                Info.warn('AdminManager::updateUser:: updateUser failed with response:');
                Info.warn(response);
                if(callback){
                    callback.error(response);
                }
            }
        });
    };

    AdminManager.prototype.fetchUser = function(userId, callback){
        var self = this;
        if (testMockObj.testMode) {
            callback.success(testMockObj.testUser);
            return;
        }
        if (!this.sessionManager.hasSession()){
            Info.warn("AdminManager::fetchUser::currentUser does not have session, exit");
            return;
        }

        var user = new User();
        user.overrideUrl(AdminApiResource.admin_user);
        user.set('userId', userId);
        user.fetch({
            dataType:'json',

            success:function(model, response){
                if(callback){
                    callback.success(user);
                }
            },
            error: function(model, response){
                Info.warn("AdminManager::fetchUser:: fetch failed with response:");
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

        searchResults.overrideUrl(AdminApiResource.admin_booking);
        searchResults.fetch({
            data: bookingSearchRepresentation.toQueryString(),
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
            Info.warn('AdminManager::updateBooking:: session does not exist, exit');
            return;
        }
        booking.overrideUrl(AdminApiResource.admin_booking);
        booking.save({},{
            dataType:'json',

            success:function(model, response){
                if(callback){
                    callback.success(booking);
                }
            },
            error: function(model, response){
                Info.warn('AdminManager::updateBooking:: save failed with response:');
                Info.warn(response);
                if(callback){
                    callback.error(response);
                }
            }
        });
    };

    AdminManager.prototype.getBooking = function(bookingId, callback) {
        if (!this.sessionManager.hasSession()){
            Info.warn('AdminManager::updateBooking:: session does not exist, exit');
            return;
        }
        if (testMockObj.testMode) {
        	callback.success(testMockObj.testBooking1);
        	return;
        }
        var booking = new Booking();
        booking.overrideUrl(AdminApiResource.admin_booking);
        booking.set("bookingId", bookingId);
        booking.fetch({},{
            dataType:'json',
            success:function(model, response){
                if(callback){
                    callback.success(booking);
                }
            },
            error: function(model, response){
                Info.warn('AdminManager::updateBooking:: save failed with response:');
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
    //JSON, use for both create and update
    AdminManager.prototype.updateCourse = function(course, callback) {
        if (!this.sessionManager.hasSession()){
            Info.warn('AdminManager::updateBooking:: session does not exist, exit');
            return;
        }
        
        course.overrideUrl(AdminApiResource.admin_course);
        course.save({},{
            dataType:'json',
            success:function(model, response){
                if(callback){
                    callback.success(course);
                }
            },
            error: function(model, response){
                Info.warn('AdminManager::updateBooking:: save failed with response:');
                Info.warn(response);
                if(callback){
                    callback.error(response);
                }
            }
        });
    };

}).call(this);