(function () {
    
    this.SessionManager = function(identifier){
        this.identifier = identifier;
        switch (this.identifier){
            case EnumConfig.ModuleIdentifier.user:
                this.sessionModel = new User();
                break;
            case EnumConfig.ModuleIdentifier.partner:
                this.sessionModel = new Partner();
                break;

            case EnumConfig.ModuleIdentifier.admin:
                this.sessionModel = new Admin();
                break;
            default:
                throw new Error('SessionManage模块识别失败');
        }
        //this is used to reset all manager data upon logouts
        this.sessionRegistraTable = [];
        this.sessionCookie = document.cookie;
    };

    SessionManager.prototype.registerManager = function(manager) {
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
    SessionManager.prototype.getSessionModel = function(){
        if (testMockObj.testMode) {
            return testMockObj.sessionModel[this.identifier];
        }
        return this.sessionModel;
    };

    SessionManager.prototype.getId = function() {
        return  this.sessionModel.id;
    };

    
    //using the find session API to determine if the uer has logged in or not
    SessionManager.prototype.fetchSession = function(asyncFlag, callback){
        var self = this;
        switch (this.identifier){
            case EnumConfig.ModuleIdentifier.user:
                this.sessionModel.overrideUrl(ApiResource.user_findSession);
                this.sessionModel.set('userId', -1);
                break;

            case EnumConfig.ModuleIdentifier.partner:
                this.sessionModel.overrideUrl(ApiResource.partner_findSession);
                this.sessionModel.set('partnerId', -1);
                break;

            case EnumConfig.ModuleIdentifier.admin:
                this.sessionModel.overrideUrl(AdminApiResource.admin_findSession);
                this.sessionModel.set('adminId', -1);
                break;

            default:
                throw new Error('fetchSession模块识别失败');
        }
        
        if (testMockObj.testMode) {
            this.sessionModel = testMockObj[this.identifier];
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
                this.sessionModel.overrideUrl(ApiResource.user_login);
                this.sessionModel.set('phone', key);
                this.sessionModel.set('password', password);
                this.sessionModel.set('userId', -1);
                break;

            case EnumConfig.ModuleIdentifier.partner:
                this.sessionModel.overrideUrl(ApiResource.partner_login);
                this.sessionModel.set('phone', key);
                this.sessionModel.set('password', password);
                this.sessionModel.set('partnerId', -1);
                break;

            case EnumConfig.ModuleIdentifier.admin:
                this.sessionModel.overrideUrl(AdminApiResource.admin_login);
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
        var self = this, url;

        if (!this.hasSession()){
            Info.alert('尚未登录');
            if(callback){
                callback.success();
            }
        }
        switch (this.identifier){
            case EnumConfig.ModuleIdentifier.user:
                url = ApiResource.user_logout;
                break;

            case EnumConfig.ModuleIdentifier.partner:
                url = ApiResource.partner_logout;
                break;

            case EnumConfig.ModuleIdentifier.admin:
                url = AdminApiResource.admin_logout;
                break;

            default:
                throw new Error('fetchSession模块识别失败');
        }
        this.sessionModel.overrideUrl(url);
        $.ajax({
            type: 'PUT',
            url: url + "/" + this.sessionModel.id,
            dataType: 'json',
            success: function(data){
                self.sessionModel.set(self.sessionModel.idAttribute, -1);
                if(callback){
                    callback.success();
                }
            },
            error: function (data, textStatus, jqXHR){
                Info.warn('SessionManager::Logout:: action failed');
                Info.warn(data);
                if(callback){
                    callback.error(data);
                }
            }
        });
        // this.sessionModel.save({
        //     dataType:'json',
        //     data: JSON.stringify({}),
        //     // contentType:"application/json",
        //     success:function(model, response){
        //         if(callback){
        //             callback.success();
        //         }
        //     },

        //     error: function(model, response){
        //         Info.warn('logout failed');
        //         Info.warn(response);
        //         if(callback){
        //             callback.error(response);
        //         }
        //     }
        // });
    };


}).call(this);
