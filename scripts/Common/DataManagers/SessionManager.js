(function () {
    'use strict';
    this.SessionManager = function(identifier){
        this.identifier = identifier;
        switch (this.identifier){
            case EnumConfig.ModuleIdentifier.user:
                this.apis = new ApiResource();
                this.sessionModel = new User();
                break;
            case EnumConfig.ModuleIdentifier.partner:
                this.apis = new ApiResource();
                this.sessionModel = new Partner();
                break;

            case EnumConfig.ModuleIdentifier.admin:
                this.apis = new AdminApiResource();
                this.sessionModel = new Admin();
                break;
            default:
                throw new Error('SessionManage模块识别失败');
        }
        //this is used to reset all manager data upon logouts
        this.sessionRegistraTable = [];
    };

    SessionManager.prototype.resgisterManager = function(manager) {
        this.sessionRegistraTable.push(manager);
    };

    SessionManager.prototype.releaseManager = function() {
        for (var managerIndex = 0; managerIndex < this.sessionRegistraTable.length; managerIndex++){
            this.sessionRegistraTable[managerIndex].release();
        }
    };

    SessionManager.prototype.hasSession = function(){
        if (testMockObj.testMode) return true;
        return this.sessionModel.id > 0;
    };

    //avoid using this
    SessionManager.prototype.getSessionUser = function(){
        return this.sessionModel;
    };

    SessionManager.prototype.getUserId = function() {
        return  this.sessionModel.id;
    };

    
    //using the find session API to determine if the uer has logged in or not
    SessionManager.prototype.fetchSession = function(asyncFlag, callback){
        var self = this;
        
        switch (this.identifier){
            case EnumConfig.ModuleIdentifier.user:
                this.sessionModel.overrideUrl(this.apis.user_findSession);
                this.sessionModel.set('userId', -1);
                break;

            case EnumConfig.ModuleIdentifier.partner:
                this.sessionModel.overrideUrl(this.apis.partner_findSession);
                this.sessionModel.set('partnerId', -1);
                break;

            case EnumConfig.ModuleIdentifier.admin:
                this.sessionModel.overrideUrl(this.apis.admin_findSession);
                this.sessionModel.set('adminId', -1);
                break;

            default:
                throw new Error('fetchSession模块识别失败');
        }
        
        if (testMockObj.testMode) {
            this.sessionModel = testMockObj.sampleUser;
            if(callback){
                callback.success();
            }
            return;
        }
        
        //make sure the session model is new
        this.sessionModel.fetch({
            async:asyncFlag,
            dataType:'json',

            success:function(model, response){
                self.releaseManager();
                if(callback){
                    callback.success();
                }
            },

            error: function(model, response){
                Info.warn('Session redirect failed');
                Info.warn(response);

                if(callback){
                    callback.error(response);
                }
            }
        });
    };

    SessionManager.prototype.login = function(key, password, callback){
        var self = this;

        if (this.hasSession()){
            Info.alert('已经登录，请刷新页面');
            app.navigate('/main', {trigger: true});
        }
        if (!(key && password)){
            Info.alert('');
            return;
        }

        switch (this.identifier){
            case EnumConfig.ModuleIdentifier.user:
                this.sessionModel.overrideUrl(this.apis.user_login);
                this.sessionModel.set('phone', key);
                this.sessionModel.set('password', password);
                this.sessionModel.set('userId', -1);
                break;

            case EnumConfig.ModuleIdentifier.partner:
                this.sessionModel.overrideUrl(this.apis.partner_login);
                this.sessionModel.set('phone', key);
                this.sessionModel.set('password', password);
                this.sessionModel.set('partnerId', -1);
                break;

            case EnumConfig.ModuleIdentifier.admin:
                this.sessionModel.overrideUrl(this.apis.admin_login);
                this.sessionModel.set('reference', key);
                this.sessionModel.set('password', password);
                this.sessionModel.set('adminId', -1);
                break;

            default:
                throw new Error('fetchSession模块识别失败');
        }
        
        this.sessionModel.save({},{
            dataType:'json',

            success:function(model, response){
                Info.log(model);
                if(callback){
                    callback.success();
                }
            },

            error: function(model, response){
                Info.warn('login failed');
                Info.warn(response);
                if(callback){
                    callback.error(response);
                }
            }
        });

    };

    SessionManager.prototype.logout = function(callback){
        var self = this;

        if (!this.hasSession()){
            Info.alert('尚未登录');
            if(callback){
                callback.success();
            }
        }

        switch (this.identifier){
            case EnumConfig.ModuleIdentifier.user:
                this.sessionModel.overrideUrl(this.apis.user_logout);
                break;

            case EnumConfig.ModuleIdentifier.partner:
                this.sessionModel.overrideUrl(this.apis.partner_logout);
                break;

            case EnumConfig.ModuleIdentifier.admin:
                this.sessionModel.overrideUrl(this.apis.admin_logout);
                break;

            default:
                throw new Error('fetchSession模块识别失败');
        }

        this.sessionModel.save({},{
            dataType:'json',

            success:function(model, response){
                if(callback){
                    callback.success();
                }
            },

            error: function(model, response){
                Info.warn('logout failed');
                Info.warn(response);
                if(callback){
                    callback.error(response);
                }
            }
        });
    };


}).call(this);
