//处理用户模块与后台交互的服务

(function () {

    this.UserManager = function (sessionManager) {

        this.sessionManager = sessionManager;
        this.sessionManager.registerManager(this);
    };

    //短信验证
    //该方法用于发送注册时的验证短信
    UserManager.prototype.smsVerification = function (obj, callback) {
        var self = this;
        if (!obj.phone||!obj.vcode) {
            Info.warn('UserManager::smsVerification:: invalid parameter');
            return;
        }
        if (this.sessionManager.hasSession()) {
            Info.warn('UserManager::smsVerification:: session already exists, exit');
            return;
        }
        if (testMockObj.testMode) {
            callback.success();
            return;
        }

        $.ajax({
            type: 'GET',
            url: ApiResource.user_smsVerification,
            data: $.param(obj),
            dataType: 'json',
            success: function (data) {
                if (callback) {
                    callback.success();
                }
            },
            error: function (data, textStatus, jqXHR) {
                Info.warn('UserManager::smsVerification:: action failed');
                if (callback) {
                    callback.error($.parseJSON(data.responseText));
                }
            }
        });
    };

    //免注册 快速登陆使用短信验证 obj -->{phone:'',vcode:''}
    //该方法用于发送注册时的验证短信
    UserManager.prototype.fastLoginSms = function (obj, callback) {
        var self = this;
        if (!obj.phone||!obj.vcode) {
            Info.warn('UserManager::smsVerification:: invalid parameter');
            return;
        }
        if (this.sessionManager.hasSession()) {
            Info.warn('UserManager::smsVerification:: session already exists, exit');
            return;
        }

        if (testMockObj.testMode) {
            callback.success();
            return;
        }

        $.ajax({
            type: 'GET',
            url: ApiResource.user_fastLoginSms,
            data: $.param(obj),
            dataType: 'json',
            success: function (data) {
                if (callback) {
                    callback.success();
                }
            },
            error: function (data, textStatus, jqXHR) {
                Info.warn('UserManager::smsVerification:: action failed');
                if (callback) {
                    callback.error($.parseJSON(data.responseText));
                }
            }
        });
    };


    //@Deprecated
    UserManager.prototype.verifySMSAuthCode = function (phone, authCode, callback) {
        var self = this;
        if (!phone) {
            Info.warn('UserManager::verifySMSAuthCode:: invalid parameter');
            return;
        }
        if (this.sessionManager.hasSession()) {
            Info.warn('UserManager::verifySMSAuthCode:: session already exists, exit');
            return;
        }

        $.ajax({
            type: 'POST',
            url: ApiResource.user_smsVerification,
            data: JSON.stringify({'phone': phone, 'authCode': authCode.toUpperCase()}),
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                if (callback) {
                    callback.success();
                }
            },
            error: function (data, textStatus, jqXHR) {
                Info.warn('UserManager::verifySMSAuthCode:: action failed');
                if (callback) {
                    callback.error($.parseJSON(data.responseText));
                }
            }
        });
    };

    //注册用户
    //new User是一个native javascript object, 包含手机，密码，密码确认，邀请码(可选)，短信验证码
    UserManager.prototype.registerUser = function (newUser, callback) {
        var self = this;
        if (this.sessionManager.hasSession()) {
            Info.warn('UserManager::registerUser::currentUser already has session, conflict, exit');
            return;
        }
        $.ajax({
            type: "POST",
            url: ApiResource.user_register,
            dataType: "json",
            async: true,
            data: JSON.stringify(newUser),
            contentType: 'application/json',
            success: function (data, response) {
                if (callback) {
                    callback.success(data);
                }
            },
            error: function (data) {
                Info.warn('UserManager::register failed');
                if (callback) {
                    //todo parseJSON may throw exception
                    callback.error($.parseJSON(data.responseText));
                }
            }
        });
    };

    //用户登录后，获取当前用户(用于更新前端的用户对象，使其与后台数据同步)
    UserManager.prototype.fetchUser = function (callback) {
        var self = this;
        var user = new User();

        if (testMockObj.testMode) {
            callback.success(testMockObj.testUser);
            return;
        }
        if (!this.sessionManager.hasSession()) {
            Info.warn("UserManager::fetchUser::currentUser does not have session, exit");
            return;
        }

        user.overrideUrl(ApiResource.user_info);
        user.set('userId', this.sessionManager.getId());
        user.set('id', this.sessionManager.getId());
        user.fetch({
            dataType: 'json',

            success: function (model, response) {
                if (callback) {
                    callback.success(user);
                }
            },
            error: function (model, response) {
                Info.warn("UserManager::fetchUser:: fetch failed with response:");
                if (callback) {
                    callback.error($.parseJSON(response.responseText));
                }
            }
        });
    };


    UserManager.prototype.changeInfo = function (user, callback) {
        var self = this;

        if (!this.sessionManager.hasSession()) {
            Info.warn('UserManager::changeContactInfo:: session does not exist, exit');
            return;
        }

        user.overrideUrl(ApiResource.user_info);
        user.set('id', this.sessionManager.getId());
        user.save({}, {
            dataType: 'json',

            success: function (model, response) {
                if (callback) {
                    callback.success(user);
                }
            },
            error: function (model, response) {
                Info.warn('UserManager::changeContactInfo failed');
                if (callback) {
                    callback.error($.parseJSON(response.responseText));
                }
            }
        });
    };

    /****************
     *   Authentication Related
     ****************/

        //用于发送修改密码时所需的验证短信
    UserManager.prototype.changePasswordVerification = function (callback) {
        var self = this;
        if (!this.sessionManager.hasSession()) {
            Info.warn('UserManager::changePasswordVerification:: session already exists, exit');
            return;
        }

        $.ajax({
            type: 'GET',
            url: ApiResource.user_changePassword.format(self.sessionManager.getId()),
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                if (callback) {
                    callback.success();
                }
            },
            error: function (data, textStatus, jqXHR) {
                Info.warn('UserManager::changePasswordVerification:: action failed');
                if (callback) {
                    callback.error($.parseJSON(data.responseText));
                }
            }
        });
    };

    //用于修改密码
    //desired opt format:  { 'oldPassword': oldPassword, 'newPassword': newPassword, 'confirmNewPassword': confirmNewPassword, 'authCode': authCode}
    UserManager.prototype.changePassword = function (opt, callback) {
        opt = _.clone(opt);
        var self = this;

        if (!(opt.oldPassword && opt.newPassword && opt.confirmNewPassword)) {
            Info.warn('UserManager::changePassword:: something not typed in');
            return;
        }
        if (!this.sessionManager.hasSession()) {
            Info.warn('UserManager::changePassword:: session does not exist, exit');
            return;
        }
        //remove confirm password
        opt.confirmNewPassword = undefined;
        $.ajax({
            type: 'PUT',
            url: ApiResource.user_changePassword.format(self.sessionManager.getId()),
            data: JSON.stringify(opt),
            dataType: 'text',
            contentType: 'application/json',
            success: function (data) {
                if (callback) {
                    callback.success();
                }
            },
            error: function (data, textStatus, jqXHR) {
                Info.warn('UserManager::changePassword:: action failed');
                Info.warn();
                if (callback) {
                    callback.error($.parseJSON(data.responseText));
                }
            }
        });
    };

    //用于用户选择重设密码时发送取回密码用的验证短信
    UserManager.prototype.forgetPassword = function (obj, callback) {
        var self = this;
        if (!obj.phone||!obj.vcode) {
            Info.warn('UserManager::forgetPassword:: invalid parameter');
            return;
        }
        if (this.sessionManager.hasSession()) {
            Info.warn('UserManager::forgetPassword:: session already exists, exit');
            return;
        }

        $.ajax({
            type: 'GET',
            async: true,
            url: ApiResource.user_forgetPassword,
            data: $.param(obj),
            dataType: 'json',
            contentType: 'application/json',

            success: function (data) {
                if (callback) {
                    callback.success();
                }
            },
            error: function (data, textStatus, jqXHR) {
                Info.warn('UserManager::forgetPassword:: action failed');
                if (callback) {
                    callback.error($.parseJSON(data.responseText));
                }
            }
        });
    };

    //用于重新设定密码
    //desired opt format:  { 'accountIdentifier': accountIdentifier, 'newPassword': newPassword, 'confirmNewPassword': confirmNewPassword, 'authCode': authCode}
    UserManager.prototype.recoverPassword = function (opt, callback) {
        var self = this;
        if (!(opt.accountIdentifier && opt.newPassword && opt.confirmNewPassword && opt.authCode)) {
            Info.warn('UserManager::recoverPassword:: invalid parameter');
            return;
        }
        if (this.sessionManager.hasSession()) {
            Info.warn('UserManager::recoverPassword:: session already exists, exit');
            return;
        }
        opt.authCode = opt.authCode.toUpperCase();
        //remove confirm password
        opt.confirmNewPassword = undefined;
        $.ajax({
            type: 'POST',
            url: ApiResource.user_forgetPassword,
            data: JSON.stringify(opt),
            dataType: 'text',
            contentType: 'application/json',
            success: function (data) {
                self.sessionManager.fetchSession(false, callback);
            },
            error: function (data, textStatus, jqXHR) {
                Info.warn('UserManager::recoverPassword:: action failed');
                if (callback) {
                    callback.error($.parseJSON(data.responseText));
                }
            }
        });
    };

    /****************
     *   User Relations
     ****************/
        //查找订单
        //具体参考BookingSearchRepresentation
    UserManager.prototype.fetchBookings = function (bookingSearchRepresentation, callback) {
        var self = this;

        if (!this.sessionManager.hasSession()) {
            Info.warn('UserManager::fetchBookings:: session does not exist, exit');
            return;
        }
        if (testMockObj.testMode) {
            callback.success(testMockObj.testBookings);
            return;
        }
        var bookings = new Bookings();
        bookings.overrideUrl(ApiResource.user_booking);
        bookings.fetch({
            data: bookingSearchRepresentation.toQueryString(),
            dataType: 'json',

            success: function (model, response) {
                if (callback) {
                    callback.success(bookings);
                }
            },

            error: function (model, response) {
                Info.warn('UserManager::fetchBookings:: fetch failed with response:');
                if (callback) {
                    callback.error($.parseJSON(response.responseText));
                }
            }
        });
    };

    //查找某个订单的历史记录
    //具体参考BookingSearchRepresentation
    UserManager.prototype.fetchBookingHistories = function (bookingId, callback) {
        var self = this;

        if (!this.sessionManager.hasSession()) {
            Info.warn('UserManager::fetchBookingHistories:: session does not exist, exit');
            return;
        }
        if (testMockObj.testMode) {
            callback.success(testMockObj.testBookingHistories);
            return;
        }
        var bookingHistories = new BookingHistories();
        bookingHistories.overrideUrl(ApiResource.user_booking_history);
        bookingHistories.fetch({
            data: 'bookingId='+bookingId,
            dataType: 'json',

            success: function (model, response) {
                if (callback) {
                    callback.success(bookingHistories);
                }
            },

            error: function (data) {
                Info.warn('UserManager::fetchBookingHistories:: fetch failed with response:');
                Info.warn(model, response);
                if (callback) {
                    callback.error($.parseJSON(response.responseText));
                }
            }
        });
    };
    //查找返现券
    UserManager.prototype.fetchCoupons = function (couponSearchRepresentation, callback) {
        var self = this;

        if (!this.sessionManager.hasSession()) {
            Info.warn('UserManager::fetchCoupons:: session does not exist, exit');
            return;
        }
        if (testMockObj.testMode) {
            callback.success(testMockObj.testCoupons);
            return;
        }
        var coupons = new Coupons();
        coupons.overrideUrl(ApiResource.user_coupon);
        coupons.fetch({
            data: couponSearchRepresentation.toQueryString(),
            dataType: 'json',

            success: function (model, response) {
                if (callback) {
                    callback.success(coupons);
                }
            },

            error: function (model, response) {
                Info.warn('UserManager::fetchCoupons:: fetch failed with response:');
                if (callback) {
                    callback.error($.parseJSON(response.responseText));
                }
            }
        });
    };

    //查找积分历史
    UserManager.prototype.fetchCreditHistories = function (creditHistorySearchRepresentation, callback) {
        var self = this;

        if (!this.sessionManager.hasSession()) {
            Info.warn('UserManager::fetchCoupons:: session does not exist, exit');
            return;
        }
        if (testMockObj.testMode) {
            callback.success(testMockObj.testCreditHistories);
            return;
        }
        var creditHistories = new CreditHistories();
        creditHistories.overrideUrl(ApiResource.user_credit_history);
        creditHistories.fetch({
            data: creditHistorySearchRepresentation.toQueryString(),
            dataType: 'json',

            success: function (model, response) {
                if (callback) {
                    callback.success(creditHistories);
                }
            },

            error: function (model, response) {
                Info.warn('UserManager::fetchCreditHistories:: fetch failed with response:');
                if (callback) {
                    callback.error($.parseJSON(model.responseText));
                }
            }
        });
    };

    //查找现金账户历史
    UserManager.prototype.fetchAccountHistories = function (accountHistorySearchRepresentation, callback) {
        var self = this;

        if (!this.sessionManager.hasSession()) {
            Info.warn('UserManager::fetchAccount:: session does not exist, exit');
            return;
        }
        if (testMockObj.testMode) {
            callback.success(testMockObj.testAccountHistories);
            return;
        }
        var accountHistories = new AccountHistories();
        accountHistories.overrideUrl(ApiResource.user_account_history);
        accountHistories.fetch({
            data: accountHistorySearchRepresentation.toQueryString(),
            dataType: 'json',

            success: function (model, response) {
                if (callback) {
                    callback.success(accountHistories);
                }
            },

            error: function (model, response) {
                Info.warn('UserManager::fetchAccountHistories:: fetch failed with response:');
                if (callback) {
                    callback.error($.parseJSON(response.responseText));
                }
            }
        });
    };

    //用于根据订单id查询单个订单
    UserManager.prototype.fetchBooking = function (id, callback) {

        var booking = new Booking();
        if (testMockObj.testMode) {
            callback.success(testMockObj.testBookings.get(id));
            return;
        }
        if (!this.sessionManager.hasSession()) {
            Info.warn('UserManager::bookingDetail:: session does not exist, exit');
            return;
        }

        booking.overrideUrl(ApiResource.user_booking);
        booking.set('id', id);
        booking.fetch({
            dataType: 'json',

            success: function (model, response) {
                if (callback) {
                    callback.success(model);
                }
            },
            error: function (model, response) {
                Info.warn('fetch booking failed');
                if (callback) {
                    callback.error($.parseJSON(response.responseText));
                }
            }
        });
    };

    //发起订单
    UserManager.prototype.initBooking = function (newBooking, callback) {
        var self = this;
        if (testMockObj.testMode) {
            callback.success(testMockObj.testBooking1);
            return;
        }
        if (!(newBooking instanceof Backbone.Model) || newBooking.id > 0) {
            Info.warn('UserManager::initBooking:: invalid parameter');
            return;
        }
        newBooking.overrideUrl(ApiResource.user_booking);
        newBooking.set('bookingId', -1);
        newBooking.set('id', -1);
        newBooking.set("course", undefined);
        newBooking.set('userId', this.sessionManager.getId());
        newBooking.save({}, {
            dataType: 'json',

            success: function (model, response) {
                if (callback) {
                    callback.success(newBooking);
                }
            },
            error: function (model, response) {
                Info.warn('UserManager::initBooking:: save failed with response:');
                if (callback) {
                    callback.error($.parseJSON(model.responseText));
                }
            }
        });

    };

    //用于对订单进行操作
    UserManager.prototype.changeBookingState = function (bookingId, operate, callback) {
        var self = this;
        if (!this.sessionManager.hasSession()) {
            Info.warn('UserManager::changeBookingState:: session does not exist, exit');
            return;
        }

        $.ajax({
            type: 'PUT',
            url: ApiResource.user_booking_operate.format(bookingId, operate),
            dataType: 'json',
            data: JSON.stringify({id: bookingId}),
            contentType: 'application/json',
            success: function (data, response) {
                if (callback) {
                    callback.success(new Booking(data,{parse:true}));
                }
            },
            error: function (data) {
                Info.warn('UserManager::changeBookingState:: save failed with response:');
                if (callback) {
                    callback.error($.parseJSON(data.responseText));
                }
            }
        });
    };

    //发起申请 申请人工选课 申请助学贷款等
    UserManager.prototype.initApply = function (newApply, callback) {
        var self = this;
        if (testMockObj.testMode) {
            callback.success();
            return;
        }
        if (!(newApply instanceof Backbone.Model)) {
            Info.warn('UserManager::newApply:: invalid parameter');
            return;
        }
        newApply.overrideUrl(ApiResource.user_apply);
        newApply.set('id', -1);
        newApply.save({}, {
            dataType: 'json',

            success: function (model, response) {
                if (callback) {
                    callback.success(newApply);
                }
            },
            error: function (model, response) {
                Info.warn('UserManager::initApply:: save failed with response:');
                if (callback) {
                    callback.error($.parseJSON(response.responseText));
                }
            }
        });

    };

    //提交评论
    UserManager.prototype.addComment = function (newComment, callback) {
        var self = this;
        if (testMockObj.testMode) {
            newComment.set('id',Math.ceil(Math.random()*1000));
            newComment.set('user',{phone:'123****123'});
            newComment.set('createTime',new Date());
            callback.success(newComment);
            return;
        }
        if (!(newComment instanceof Backbone.Model)) {
            Info.warn('UserManager::newComment:: invalid parameter');
            return;
        }
        newComment.overrideUrl(ApiResource.create_comment);
        newComment.set('id', -1);
        newComment.save({}, {
            dataType: 'json',

            success: function (model, response) {
                if (callback) {
                    callback.success(model);
                }
            },
            error: function (model, response) {
                Info.warn('UserManager::addComment:: save failed with response:');
                if (callback) {
                    callback.error($.parseJSON(response.responseText));
                }
            }
        });

    };

    //发起团购订单
    UserManager.prototype.initGroupBuyBooking = function (groupBuyBooking, callback) {
        var self = this;
        if (testMockObj.testMode) {
            callback.success(testMockObj.testGroupBuyBooking1);
            return;
        }
        if (!(groupBuyBooking instanceof Backbone.Model) || groupBuyBooking.id > 0) {
            Info.warn('UserManager::initGroupBuyBooking:: invalid parameter');
            return;
        }
        groupBuyBooking.overrideUrl(ApiResource.groupBuy_booking);
        groupBuyBooking.set('id', -1);
        groupBuyBooking.set('userId', this.sessionManager.getId());
        groupBuyBooking.save({}, {
            dataType: 'json',

            success: function (model, response) {
                if (callback) {
                    callback.success(groupBuyBooking);
                }
            },
            error: function (model, response) {
                Info.warn('UserManager::initGroupBuyBooking:: save failed with response:');
                if (callback) {
                    callback.error($.parseJSON(model.responseText));
                }
            }
        });

    };
    //用于根据订单id查询单个团购订单
    UserManager.prototype.fetchGroupBuyBooking = function (id, callback) {

        var groupBuyBooking = new GroupBuyBooking();
        if (testMockObj.testMode) {
            callback.success(testMockObj.testGroupBuyBooking1);
            return;
        }
        if (!this.sessionManager.hasSession()) {
            Info.warn('UserManager::groupBuyBooking:: session does not exist, exit');
            return;
        }

        groupBuyBooking.overrideUrl(ApiResource.groupBuy_booking);
        groupBuyBooking.set('id', id);
        groupBuyBooking.fetch({
            dataType: 'json',

            success: function (model, response) {
                if (callback) {
                    callback.success(model);
                }
            },
            error: function (model, response) {
                Info.warn('fetch groupBuyBooking failed');
                if (callback) {
                    callback.error($.parseJSON(response.responseText));
                }
            }
        });
    };

    /**
     * 根据搜索条件抓取团购订单列表
     * @param groupBuyBookingSr 见GroupBuyBookingSearchRepresentation.js
     * @param callback
     */
    UserManager.prototype.fetchGroupBuyBookings = function (groupBuyBookingSr, callback) {
        var self = this;

        if (!this.sessionManager.hasSession()) {
            Info.warn('UserManager::fetchGroupBuyBookings:: session does not exist, exit');
            return;
        }
        if (testMockObj.testMode) {
            callback.success(testMockObj.testGroupBuyBookings);
            return;
        }
        var bookings = new GroupBuyBookings();
        bookings.overrideUrl(ApiResource.groupBuy_booking);
        bookings.fetch({
            data: groupBuyBookingSr.toQueryString(),
            dataType: 'json',

            success: function (model, response) {
                if (callback) {
                    callback.success(bookings);
                }
            },

            error: function (model, response) {
                Info.warn('UserManager::fetchGroupBuyBookings:: fetch failed with response:');
                if (callback) {
                    callback.error($.parseJSON(response.responseText));
                }
            }
        });
    };

}).call(this);
