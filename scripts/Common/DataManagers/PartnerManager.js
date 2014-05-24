(function () {
    'use strict';

    //partner module currently is not greatest importance, it will be left to be finished when both admin and user modules are finished
    this.PartnerManager = function(sessionManager){

        this.apis = new ApiResource();

        this.sessionManager = sessionManager;
        this.sessionManager.resgisterManager(this);
    };


    //reset the manager state upon logout
    PartnerManager.prototype.release = function() {};

    PartnerManager.prototype.forgetPassword = function(phone, callback) {
        var self = this;
        if (!phone){
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
            data: $.param({'phone': phone}),
            dataType: 'json',
            success: function(data){
                if(callback){
                    callback.success();
                }
            },
            error: function (data, textStatus, jqXHR){
                Info.warn("PartnerManager::forgetPassword:: action failed");
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
            url: self.apis.partner_forgetPassword,
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
