var NewBookingView = BaseFormView.extend({
    el: "#content",
    template: _.template(tpl.get("newBooking")),
    finishTemplate: _.template(tpl.get("booking_submitted")),
    priceContainer: '#summaryPrice',
    priceTemplate: _.template(tpl.get('newBooking_price')),
    form: false,
    submitButtonId: "initBooking",
    initialize: function (params) {
        this.isClosed = false;
        _.bindAll(this, "render", "bindEvents", "bookingSuccess", "login", "loginError", "close");
        app.viewRegistration.register(this);
        // $("#viewStyle").attr("href", "style/css/booking.css");

        this.fields = [
            new BaseField({
                name: "姓名",
                fieldId: "booking_applicantName",
                type: "text",
                mandatory: true,
                modelAttr: "name",
                validClass: "success",
                buildValidatorDiv: Utilities.defaultValidDivBuilder
            }),
            new BaseField({
                name: "手机号码",
                fieldId: "booking_cellphone",
                type: "text",
                mandatory: true,
                modelAttr: "phone",
                validClass: "success",
                validatorFunction: Utilities.phoneValid,
                buildValidatorDiv: Utilities.defaultValidDivBuilder
            }),
            new BaseField({
                name: "预约报名日期",
                fieldId: "booking_date",
                modelAttr: "scheduledTime",
                validClass: "success",
                type: "text",
                mandatory: true,
                buildValidatorDiv: Utilities.defaultValidDivBuilder
            })
//            new BaseField({
//                name: "支付方式",
//                fieldId: "booking_type",
//                modelAttr: "type",
//                validClass: "success",
//                type: "select",
//                mandatory: true,
//                buildValidatorDiv: Utilities.defaultValidDivBuilder
//            })
        ];
        if (params.courseId) {
            app.generalManager.fetchCourse(params.courseId, {
                success: this.render,
                error: function () {
                }
            });
        } else if (params.course) {
            this.render(params.course);
        }
    },
    render: function (course) { //渲染课程信息
        var date = new Date();
        if (course.get("status") !== EnumConfig.CourseStatus.onlined) {
            Info.displayNotice("该课程报名已经结束，看一下其他类似的课程吧。");
            var sr = new CourseSearchRepresentation();
            sr.set("categoryValue", course.get("categoryValue"));
            app.navigate("search/" + sr.toQueryString(), {replace: true, trigger: true});
        }
        this.model = new Booking();
        this.model.set("course", course);
        this.$el.append(this.template(this.model._toJSON()));

        this.renderPrice(EnumConfig.PayType.offline);
        this.model.initBookingFromCourse(course);
        //render dom后根据判断是否登录来进行dom'的更改
        this.bindEvents();
        this.autoName();
    },

    login: function () {
        var $loginError = $('#bookingLoginError');
        $loginError.html();
        var username = $("#booking_loginUsername").val(),
            pwd = $("#booking_loginPassword").val(),
            remember = $("#booking_loginRemember").val() ? 1 : 0;
        if (!username) {
            $loginError.html('请输入用户名');
            return;
        }
        if (!pwd) {
            $loginError.html('请输入密码');
            return;
        }
        if (username && pwd) {
            app.sessionManager.login(username, pwd, remember, {
                success: function () {
                    app.userManager.sessionUser = app.sessionManager.sessionModel;
                    app.topBarView.render();
                },
                error: this.loginError
            });
        } else if (username) {
            $("#booking_loginPassword").focus();
        }
    },
    loginError: function (data) {
        $("#booking_loginPassword").val("");
        $('#bookingLoginError').html(data.message || '登录失败');
    },
    //自动填充用户名等
    autoName: function () {
        if (app.sessionManager.hasSession()) {
            //自动填充手机号和用户名 如果存在的话
            var name = app.sessionManager.sessionModel.get('username');
            var phone = app.sessionManager.sessionModel.get('phone');
            if (name) $('#booking_applicantName').val(name).trigger('change');
            if (phone) $('#booking_cellphone').val(phone).trigger('change');
        }
    },
    bindEvents: function () {
        var that = this;
        //监听用户session更改事件
        app.sessionManager.sessionModel.on("change", function () {
            that.autoName();
            if (this.get("userId") >= 0) {
                //已登录
                $("#cashback_box_notLoggedIn").addClass("hidden");
                $("#cashback_box").removeClass("hidden");
                $("#booking_loginbox").addClass("hidden");
                $('input[name=bookingType]').removeAttr('disabled');
            } else {
                //未登录
                $("#cashback_box_notLoggedIn").removeClass("hidden");
                $("#cashback_box").addClass("hidden");
                $('input[name=bookingType]').attr('disabled', 'disabled');
            }
            app.topBarView.render();
        });
        //返回到课程详情
        $('#content').on('click', '.js_gotoCourse', function () {
            app.navigate("course/" + that.model.get("courseId"), true);
        });
        $('#js_needHelp').on('click',function(){
            app.navigate('service/help',true);
            $.smoothScroll()
        });
        //判断是否已经登录 来绑定相应的事件
        if (!app.sessionManager.hasSession()) {
            $("#quickLogin").on("click", function () {
                $("#booking_loginbox").show();
            });
            $("#quickRegister").on("click", function () {
                app.navigate("register/ref=" + location.hash.substr(1, location.hash.length - 1), true);
            });
            $("#cashback_box").addClass("hidden");
            $("#booking_loginbox").addClass("hidden");
            $("#booking_login").on("click", this.login);
            $("#booking_loginUsername,#booking_loginPassword").on("keypress", function (e) {
                if (e.which === 13) {
                    that.login();
                }
            });
            $("#booking_forgotPassword").on("click", function (e) {
                e.preventDefault();
                app.navigate("forgetPassword/", true);
            });
        } else {
            $("#cashback_box_notLoggedIn").addClass("hidden");
            $("#booking_loginbox").addClass("hidden");
        }
        //表单中触发回车
        $("#bookingInfo").on("keypress", "input", function (e) {
            if (e.which === 13) {
                $("#initBooking").trigger("click");
            }
        });
        //有具体开课日期则限制预约报名日期的max为开课日期
        if (this.model.get("course").get("startUponArrival")) {
            $("#booking_date").on("keypress", function (e) {
                e.preventDefault();
            }).datepicker({
                buttonImageOnly: true,
                buttonImage: "calendar.gif",
                buttonText: "Calendar",
                minDate: new Date(),
                maxDate: this.model.get("course").get("startDate"),
                defaultDate: that.model.get("scheduledTime"),
                onSelect: function (text, inst) {
                    var d = new Date();
                    d.setDate(inst.selectedDay);
                    d.setMonth(inst.selectedMonth);
                    d.setYear(inst.selectedYear);
                    that.model.set("scheduledTime", d);
                }
            });
        } else {
            $("#booking_date").on("keypress", function (e) {
                e.preventDefault();
            }).datepicker({
                buttonImageOnly: true,
                buttonImage: "calendar.gif",
                buttonText: "Calendar",
                minDate: new Date(),
                defaultDate: that.model.get("scheduledTime"),
                onSelect: function (text, inst) {
                    var d = new Date();
                    d.setDate(inst.selectedDay);
                    d.setMonth(inst.selectedMonth);
                    d.setYear(inst.selectedYear);
                    that.model.set("scheduledTime", d);
                }
            });
        }
        //登录框的展开和收起
        $(".js_loginBoxToggle").on("click", function (e) {
            var $bookingLogin = $("#booking_loginbox");
            $bookingLogin.toggleClass("hidden");
        });

        //"注册"的点击事件
        $("#booking_register").on("click", function () {
            app.navigate("register/ref=" + location.hash.substr(1, location.hash.length - 1), true);
        });

        //支付方式选择事件
        $('input[name=bookingType]').change(function (e) {
            //只有登录后才能选择在线支付
            var payType = parseInt($(this).val(), 10);
            if (payType==EnumConfig.PayType.online && !app.sessionManager.hasSession()) {
                $('input[name=bookingType][value='+EnumConfig.PayType.offline+']').prop('checked',true);
                Info.displayNotice('登录后才能享受线上支付优惠哦~');
                $("#booking_loginbox").show();
                $.smoothScroll({scrollTarget:'#bookingDetail'});
                //todo focus应移至提示信息的回调中
                $('#booking_loginUsername').focus();
                return;
            }
            that.renderPrice(payType);
        });

        BaseFormView.prototype.bindEvents.call(this);
    },
    /**
     * 根据支付类型的改变render相应的所需支付费用的摘要
     * @param payType 支付类型(0 or 1)
     */
    renderPrice: function (payType) {
        //在线付款直接显示价格减去commisson的价格 右边显示已减多少钱
        //线下支付直接显示原价 右侧显示cashback的数量
        $(this.priceContainer).html(this.priceTemplate({
            payType: payType,
            price: this.model.get('course').get('price'),
            commission: this.model.get('course').get('commission'),
            cashback: this.model.get('course').get('cashback')
        }));
    },
//    loginCheck: function () {
//        if (!app.sessionManager.hasSession()) {
//            Info.displayNotice("您尚未登录，请先登录再进行预订");
//        }
//    },
    submitAction: function () {
        var self = this;
        //非登录用户返现值设为0
        if (!app.sessionManager.hasSession()) {
            //未登录的可以使用返现券啦
//            this.model.set("cashbackAmount", 0);
            //这里再次强制设置支付类型 防止网页上的更改
            this.model.set('type', EnumConfig.PayType.offline);
        } else {
            //登录用户可选择是否选择使用优惠券 这里注释下行 设为默认已使用
            //this.model.set("cashback", $("#booking_useCashback").prop("checked") ? this.model.get("cashbackAmount") : 0);
        }
        $("#" + this.submitButtonId).val("预订中...");
        this.model.set('type', $('input[name="bookingType"]:checked').val());
        //如果选择在线支付价格需要减去在线支付折扣 course.commission
        if (this.model.get('type') == EnumConfig.PayType.online && this.model.get('course').get('commission')) {
            this.model.set('price', this.model.get('price') - this.model.get('course').get('commission'));
        }
        this.model.set("userId", app.sessionManager.sessionModel.get("userId"));


        this.model.set("course", undefined);
        app.userManager.initBooking(this.model, {
            success: function (booking) {
                self.autoLogin.call(self, booking);
            },
            error: function () {
                $("#" + self.submitButtonId).val("预订失败, 请重试");
            }
        });
    },
    autoLogin: function (booking) {
        var self = this;
        if (!app.sessionManager.hasSession() && booking.get('enabled') == 1) {
            var pwd = booking.get('note');
            booking.unset('note');
            //TODO 这里进行自动登录
            app.sessionManager.login(self.model.get('phone'), pwd, 1, {
                success: function (response) {
                    //重置sessionUser并且render topBar
                    app.userManager.sessionUser = app.sessionManager.sessionModel;
                    app.topBarView.render();
                    self.bookingSuccess(booking);
                },
                error: function (data) {
                    self.bookingSuccess(booking);
                }
            });

        } else {
            self.bookingSuccess(booking);
        }
    },
    bookingSuccess: function (booking) {
        var login = false;
        if (app.sessionManager.hasSession()) {
            login = true;
        }else{
            //没有登录自动填充手机号 这里没写在事件绑定中是为了防止对象引用
            $('#login_username').val(booking.get('phone'));
        }
        this.$el.empty().append(this.finishTemplate(_.extend(booking._toJSON(), {login: login})));
        $("#viewMore").on("click", function () {
            app.navigate("search", true);
        });
        $("#viewBooking").on("click", function (e) {
            if (!app.sessionManager.hasSession()) {
                $("#topbar_loginbox").show();
                //focus到密码框 帮助用户输入
                $('#login_password').focus();
                //由于body上加了点击除loginBox外的元素会关闭loginBox的事件 应停止事件冒泡
                e.stopPropagation();
            } else {
                app.navigate("mypage/booking", true);
            }
        });
        //进入支付页面
        $(".js_btnGoToPay").on("click", function () {
            app.navigate("mypage/booking/" + booking.id + "/pay", true);
        });
        $("#printBooking").on("click", function () {
            window.print();
        });
    },
    close: function () {
        if (!this.isClosed) {
            $("#booking_date").datepicker("destroy");
            $("#ui-datepicker-div").remove();	//The destroy method does not work in IE, therefore manually remove it.
            this.$el.off();
            this.$el.empty();
            this.isClosed = true;
        }
    },
    buildValidatorDiv: function (valid, type, text) {
        //This function overloads baseField's default buildValidatorDiv. It should only be invoked by BaseField's testValue function, thus this refers the BaseForm model in this case,
        //This function is not bound to the view.
        $("#" + this.get("fieldId") + "_info").remove();
        if (valid) {
            return '<span class="success" id="' + this.get("fieldId") + '_right"></span>';
        } else if (type === "empty") {
            return '<span class="wrong" id="' + this.get("fieldId") + '_wrong" ><span class="form_tip"><span class="form_tip_top">' + this.get("name") + "不能为空" + '</span><span class="form_tip_bottom"></span></span></span>';
        } else if (text) {
            return '<span class="wrong" id="' + this.get("fieldId") + '_wrong"><span class="form_tip"><span class="form_tip_top">' + text + '</span><span class="form_tip_bottom"></span></span></span>';
        } else {
            return '<span class="wrong" id="' + this.get("fieldId") + '_wrong"><span class="form_tip"><span class="form_tip_top">' + this.get("errorText") + '</span><span class="form_tip_bottom"></span></span></span>';
        }
    }
});
