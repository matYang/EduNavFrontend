//该模块为用户，合作伙伴，管理员的会话管理服务
//该模块用来处理用户登录，登出，以及检查登录状态

(function () {

    this.SessionManager = function (identifier) {
        this.identifier = identifier;
        switch (this.identifier) {
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

    //记录其他的数据管理服务
    SessionManager.prototype.registerManager = function (manager) {
        this.sessionRegistraTable.push(manager);
    };

    SessionManager.prototype.releaseManager = function () {
        for (var managerIndex = 0; managerIndex < this.sessionRegistraTable.length; managerIndex++) {
            this.sessionRegistraTable[managerIndex].release();
        }
    };

    //检查当前用户是否有会话(是否在已登录状态)
    SessionManager.prototype.hasSession = function () {
        if (testMockObj.testMode) return true;
        return this.sessionModel.id > 0;
    };

    //avoid using this
    //获取当前会话的用户对象
    SessionManager.prototype.getSessionModel = function () {
        if (testMockObj.testMode) {
            return testMockObj.sessionModel[this.identifier];
        }
        return this.sessionModel;
    };

    //获取当前用户的id
    SessionManager.prototype.getId = function () {
        return  this.sessionModel.id;
    };


    //using the find session API to determine if the uer has logged in or not
    //尝试获取会话
    //若是用户与服务器能正常连接，ajax请求应该会返回一个成功的结果。
    //若是用户有一个有效的cookie, 服务器会将当前用户的对象的id填充，以此告知当前用户在已登录状态
    //若是用户没有cookie, 服务器同样会告知前端拉取会话才成功，但用户的id仍然会是-1, 以此表示用户是未登录状态。
    //该方法需要在每次login, logout的回调方法里使用，因为login logout不会改变前端用户对象的id。
    SessionManager.prototype.fetchSession = function (asyncFlag, callback) {
        var self = this;
        switch (this.identifier) {
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
            if (callback) {
                callback.success();
            }
            return;
        }

        //make sure the session model is new
        this.sessionModel.fetch({
            async: asyncFlag,
            dataType: 'json',

            success: function (model, response) {
                self.releaseManager();
                if (callback) {
                    callback.success();
                }
            },

            error: function (model, response) {
                Info.warn('Session redirect failed');
                Info.warn(response);

                if (callback) {
                    callback.error(response);
                }
            }
        });
    };

    //登陆
    SessionManager.prototype.login = function (key, password, remember, callback) {
        var self = this;

        if (this.hasSession()) {
            Info.alert('已经登录，请刷新页面');
            app.navigate('/main', {trigger: true});
        }
        if (!(key && password)) {
            Info.alert('');
            return;
        }
        $.ajax({
            url: ApiResource.user_login,
            type: 'POST',
            data: {
                accountIdentifier: key,
                password: password,
                remember: remember
            },
            dataType: 'json',
            success: function (model, response) {
                Info.log(model);
                if (callback) {
                    callback.success();
                }
            },

            error: function (model, response) {
                Info.warn('login failed');
                Info.warn(response);
                if (callback) {
                    callback.error(response);
                }
            }
        });
    };

    //登出
    SessionManager.prototype.logout = function (callback) {
        var self = this, url;

        if (!this.hasSession()) {
            Info.alert('尚未登录');
            if (callback) {
                callback.success();
            }
        }
        switch (this.identifier) {
            case EnumConfig.ModuleIdentifier.user:
                url = ApiResource.user_logout;
                break;
//
//            case EnumConfig.ModuleIdentifier.partner:
//                url = ApiResource.partner_logout;
//                break;
//
//            case EnumConfig.ModuleIdentifier.admin:
//                url = AdminApiResource.admin_logout;
//                break;

            default:
                throw new Error('fetchSession模块识别失败');
        }
        this.sessionModel.overrideUrl(url);
        $.ajax({
            type: 'PUT',
            url: url.format(this.sessionModel.id),
            dataType: 'json',
            success: function (data) {
                self.sessionModel.set(self.sessionModel.idAttribute, -1);
                if (callback) {
                    callback.success();
                }
            },
            error: function (data, textStatus, jqXHR) {
                Info.warn('SessionManager::Logout:: action failed');
                Info.warn(data);
                if (callback) {
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
