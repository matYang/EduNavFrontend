(function () {
    'use strict';

    //partner module currently is not greatest importance, it will be left to be finished when both admin and user modules are finished
    this.PartnerManager = function(sessionManager){
        this.sessionManager = sessionManager;
        this.sessionManager.registerManager(this);
    };


    //reset the manager state upon logout
    PartnerManager.prototype.release = function() {};


    PartnerManager.prototype.fetchPartner = function(callback){
        var self = this;
        var partner = new Partner();
        
        if (testMockObj.testMode) {
            callback.success(testMockObj.samplePartner);
            return;
        }
        if (!this.sessionManager.hasSession()){
            Info.warn('PartnerManager::fetchPartner::currentPartner does not have session, exit');
            return;
        }
        
        partner.overrideUrl(ApiResource.partner_partner);
        partner.set('partnerId', this.sessionManager.getId());
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

    /****************
    *   Authentication Related
    ****************/
    PartnerManager.prototype.changePasswordVerification = function(callback) {
        var self = this;
        if (!this.sessionManager.hasSession()){
            Info.warn('PartnerManager::changePasswordVerification:: session already exists, exit');
            return;
        }

        $.ajax({
            type: 'GET',
            url: ApiResource.partner_changePassword + '/' + self.sessionManager.getId(),
            dataType: 'json',
            success: function(data){
                if(callback){
                    callback.success();
                }
            },
            error: function (data, textStatus, jqXHR){
                Info.warn('PartnerManager::changePasswordVerification:: action failed');
                Info.warn(data);
                if(callback){
                    callback.error(data);
                }
            }
        });
    };

    //desired opt format:  { 'oldPassword': oldPassword, 'newPassword': newPassword, 'confirmNewPassword': confirmNewPassword, 'authCode': authCode}
    PartnerManager.prototype.changePassword = function(opt, callback) {
        var self = this;

        if (!(opt.oldPassword && opt.newPassword && opt.confirmNewPassword && opt.authCode)){
            Info.warn('PartnerManager::changePassword:: invalid parameter');
            return;
        }
        if (!this.sessionManager.hasSession()){
            Info.warn('PartnerManager::changePassword:: session does not exist, exit');
            return;
        }

        $.ajax({
            type: 'PUT',
            url: ApiResource.partner_changePassword + '/' + self.sessionManager.getId(),
            data: JSON.stringify(opt),
            dataType: 'json',
            contentType: 'application/json',
            success: function(data){
                if(callback){
                    callback.success();
                }
            },
            error: function (data, textStatus, jqXHR){
                Info.warn('PartnerManager::changePassword:: action failed');
                Info.warn();
                if(callback){
                    callback.error(data);
                }
            }
        });
    };

    PartnerManager.prototype.forgetPassword = function(phone, callback) {
        var self = this;
        if (!phone){
            Info.warn('PartnerManager::forgetPassword:: invalid parameter');
            return;
        }
        if (this.sessionManager.hasSession()){
            Info.warn('PartnerManager::forgetPassword:: session already exists, exit');
            return;
        }

        $.ajax({
            type: 'GET',
            async: true,
            url: ApiResource.partner_forgetPassword,
            data: $.param({'phone': phone}),
            dataType: 'json',
            success: function(data){
                if(callback){
                    callback.success();
                }
            },
            error: function (data, textStatus, jqXHR){
                Info.warn('PartnerManager::forgetPassword:: action failed');
                Info.warn(data);
                if(callback){
                    callback.error(data);
                }
            }
        });
    };

    //desired opt format:  { 'phone': phone, 'newPassword': newPassword, 'confirmNewPassword': confirmNewPassword, 'authCode': authCode}
    PartnerManager.prototype.recoverPassword = function(opt, callback) {
        var self = this;
        if (!(opt.phone && opt.newPassword && opt.confirmNewPassword && opt.authCode)){
            Info.warn('PartnerManager::recoverPassword:: invalid parameter');
            return;
        }
        if (this.sessionManager.hasSession()){
            Info.warn('PartnerManager::recoverPassword:: session already exists, exit');
            return;
        }

        $.ajax({
            type: 'POST',
            url: ApiResource.partner_forgetPassword,
            data: JSON.stringify(opt),
            dataType: 'json',
            contentType: 'application/json',
            success: function(data){
                self.sessionManager.fetchSession(false, callback);
            },
            error: function (data, textStatus, jqXHR){
                Info.warn('PartnerManager::recoverPassword:: action failed');
                Info.warn(data);
                if(callback){
                    callback.error(data);
                }
            }
        });
    };

}).call(this);
