//该模块为用户，合作伙伴，管理员的会话管理服务
//该模块用来处理用户登录，登出，以及检查登录状态

(function () {

    this.SessionManager = function () {
        this.sessionModel = new User();
        //this is used to reset all manager data upon logouts
        this.sessionRegistraTable = [];
        this.sessionCookie = document.cookie;
    };

    //记录其他的数据管理服务
    SessionManager.prototype.registerManager = function (manager) {
        this.sessionRegistraTable.push(manager);
    };


    //检查当前用户是否有会话(是否在已登录状态)
    SessionManager.prototype.hasSession = function () {
//        if (testMockObj.testMode) return true;
        return this.sessionModel.id > 0;
    };

    //avoid using this
    //获取当前会话的用户对象
    SessionManager.prototype.getSessionModel = function () {
        if (testMockObj.testMode) {
            return testMockObj.testUser;
        }
        return this.sessionModel;
    };

    //获取当前用户的id
    SessionManager.prototype.getId = function () {
        return  this.sessionModel.id;
    };


    //using the find session API to determine if the uer has logged in or not
    SessionManager.prototype.fetchSession = function (asyncFlag, callback) {
        var self = this;
        this.sessionModel.overrideUrl(ApiResource.user_findSession);
        if (testMockObj.testMode) {
            this.sessionModel = testMockObj.testUser;
            if (callback) {
                callback.success();
            }
            return;
        }
        this.sessionModel.fetch({
            async: asyncFlag,
            dataType: 'json',

            success: function (model, response) {
                //success自动parse成sessionModel
//                app.sessionManager.sessionModel;
                if (callback) {
                    callback.success(model);
                }
            },

            error: function (model, response) {
                Info.warn('Session redirect failed');

                if (callback) {
                    callback.error($.parseJSON(response.responseText));
                }
            }
        });
    };

    //登录
    SessionManager.prototype.login = function (key, password, remember, callback) {
        var self = this;
        if (testMockObj.testMode) {
            this.sessionModel = testMockObj.testUser;
            if (callback) {
                callback.success();
            }
            return;
        }
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
            data: JSON.stringify({
                accountIdentifier: key,
                password: password,
                remember: remember
            }),
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                self.sessionModel = new User(data,{parse:true});
                if (callback) {
                    callback.success();
                }
            },

            error: function (data) {
                Info.warn('login failed');
                if (callback) {
                    callback.error($.parseJSON(data.responseText));
                }
            }
        });
    };

    //登出
    SessionManager.prototype.logout = function (callback) {
        var self = this, url;
        if (testMockObj.testMode) {
            this.sessionModel = new User();
            if (callback) {
                callback.success();
            }
            return;
        }
        if (!this.hasSession()) {
            Info.alert('尚未登录');
            if (callback) {
                callback.success();
            }
        }
        url = ApiResource.user_logout;
        this.sessionModel.overrideUrl(url);
        $.ajax({
            type: 'PUT',
            url: url.format(this.sessionModel.id),
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                self.sessionModel = new User();
                if (callback) {
                    callback.success();
                }
            },
            error: function (data, textStatus, jqXHR) {//textStatus will be a string of 'error'
                Info.warn('SessionManager::Logout:: action failed');
                if (callback) {
                    callback.error($.parseJSON(data.responseText));
                }
            }
        });
    };


}).call(this);
