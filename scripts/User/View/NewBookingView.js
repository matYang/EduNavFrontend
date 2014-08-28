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
        _.bindAll(this, "render", "bindEvents", "bookingSuccess", "login", "loginCheck", "loginSuccess", "loginError", "close");
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
        this.bindEvents();
    },

    login: function () {
        var username = $("#booking_loginUsername").val(),
            pwd = $("#booking_loginPassword").val(),
            remember = $("#booking_loginRemember").val() ? 1 : 0;
        if (username && pwd) {
            app.sessionManager.login(username, pwd, remember, {
                success: this.loginSuccess,
                error: this.loginError
            });
        } else if (username) {
            $("#booking_loginPassword").focus();
        }
    },
    loginSuccess: function () {
        var that = this;
        app.sessionManager.fetchSession(true, {
            success: function () {
            },
            error: function (response) {
                Info.displayNotice(response.responseJSON.message);
            }
        });
    },
    loginError: function () {
        $("#booking_loginPassword").val("");
    },
    bindEvents: function () {
        var that = this;
        app.sessionManager.sessionModel.on("change", function () {
            if (this.get("userId") >= 0) {
                $("#cashback_box_notLoggedIn").addClass("hidden");
                $("#cashback_box").removeClass("hidden");
                $("#booking_loginbox").addClass("hidden");
            } else {
                $("#cashback_box_notLoggedIn").removeClass("hidden");
                $("#cashback_box").addClass("hidden");

            }
            app.topBarView.reRender();
        });
        //返回到课程详情
        $(".gotoCourse").on("click", function () {
            app.navigate("course/" + that.model.get("courseId"), true);
        });
        //判断是否已经登录
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
        $("#booking_loginToggler").on("click", function (e) {
            var $bookingLogin = $("#booking_loginbox");
            if ($bookingLogin.hasClass("hidden")) {
                $bookingLogin.removeClass("hidden");
            } else {
                $bookingLogin.addClass("hidden");
            }
        });
        //支付方式选择事件
        $('input[name=bookingType]').change(function () {
            that.renderPrice($(this).val());
        });

        //注册事件
        $("#booking_register").on("click", function () {
            app.navigate("register/ref=" + location.hash.substr(1, location.hash.length - 1), true);
        });
        BaseFormView.prototype.bindEvents.call(this);
    },
    renderPrice: function (payType) {
        //todo 在线付款直接显示价格减去commisson的价格 右边显示已减多少钱
        //todo 线下支付直接显示原价 右侧显示cashback的数量
        $(this.priceContainer).html(this.priceTemplate({
            payType:payType,
            price:this.model.get('course').get('price'),
            commission:this.model.get('course').get('commission'),
            cashback:this.model.get('course').get('cashback')
        }));
    },
    loginCheck: function () {
        if (!app.sessionManager.hasSession()) {
            Info.displayNotice("您尚未登录，请先登录再进行预订");
        }
    },
    submitAction: function () {
        var that = this;
        that.loginCheck();
        $("#" + this.submitButtonId).val("预订中...");
        this.model.set('type', $('input[name="bookingType"]:checked').val());
        //如果选择在线支付价格需要减去在线支付折扣 course.commission
        if (this.model.get('type') == EnumConfig.PayType.online && this.model.get('course').get('commission')) {
            this.model.set('price', this.model.get('price') - this.model.get('course').get('commission'));
        }
        this.model.set("userId", app.sessionManager.sessionModel.get("userId"));
//        this.model.set("cashback", $("#booking_useCashback").prop("checked") ? this.model.get("cashbackAmount") : 0);
        //todo 非登录用户设为0
        if(false){
            this.model.set("cashbackAmount", 0);
        }
        this.model.set("course", undefined);
        app.userManager.initBooking(this.model, {
            success: this.bookingSuccess,
            error: function () {
                $("#" + that.submitButtonId).val("预订失败, 请重试");
            }
        });
    },
    bookingSuccess: function (booking) {
        this.$el.empty().append(this.finishTemplate(booking._toJSON()));
        $("#viewMore").on("click", function () {
            app.navigate("search", true);
        });
        $("#viewBooking").on("click", function () {
            app.navigate("mypage/booking", true);
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
