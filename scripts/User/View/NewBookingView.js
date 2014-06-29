var NewBookingView = BaseFormView.extend({
    el:"#content",
    form: false,
    submitButtonId:"initBooking",
    initialize: function (params) {
        this.isClosed = false;
        _.bindAll(this, "render", "bindEvents", "bookingSuccess", "login", "loginSuccess", "loginError", "close");
        app.viewRegistration.register(this);
        // $("#viewStyle").attr("href", "style/css/booking.css");
        this.template = _.template(tpl.get("newBooking"));
        this.finishTemplate = _.template(tpl.get("booking_submitted"));
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
                name: "E-mail",
                fieldId: "booking_email",
                type: "text",
                mandatory: false,
                modelAttr: "email",
                validClass: "success",
                validatorFunction: Utilities.emailValid,
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
        ];
        if (params.courseId) {
            app.generalManager.fetchCourse(params.courseId, {
                success: this.render,
                error: function(){}
            });
        } else if (params.course) {
            this.render(params.course);
        } else if (params.reference) {
            this.reference = params.reference;
            var booking = app.sessionManager.sessionModel.get("bookingList").findBookingByReference(this.reference);
            if (booking) {
                this.renderEditView(booking);
            } else {
                app.userManager.fetchUser({
                    success: this.render,
                    error: function () {}
                });
            }
        } else if (params.booking) {
            this.renderEditView(params.booking);
        }
    },
    render: function (course) {
        this.model = new Booking();
        this.model.set("course", course);
        this.$el.append(this.template(this.model._toJSON()));
        this.model.initBookingFromCourse(course);
        this.bindEvents();
    },
    renderEditView: function (booking) {
        if (booking instanceof User) {
            this.user = booking;
            booking = booking.get("bookingList").findBookingByReference(this.reference);
        }
        if (booking) {
            this.model = booking;
            this.$el.append(this.template(this.model._toJSON()));
            // $("#booking_applicantName").val(this.model.get("name"));
            // $("#booking_cellphone").val(this.model.get("phone"));
            // $("#booking_email").val(this.model.get("email"));
            // $("#booking_date").val(Utilities.getDateString(this.model.get("scheduledTime")));
            this.bindEvents();
        } else {

        }
    },
    login: function() {
        var username = $("#booking_loginUsername").val(), pwd = $("#booking_loginPassword").val();
        if (username && pwd) {
            app.sessionManager.login(username, pwd, {
                success: this.loginSuccess,
                error: this.loginError
            });
        } else {

        }
    },
    loginSuccess: function(){
        app.sessionManager.fetchSession(true, {
            success: function () {
                $("#booking_loginbox").remove();
                $("#booking_loginnote").remove();
                $("#"+ this.submitButtonId).removeClass("hidden");
                $("#bookingDesc").removeClass("hidden");
                app.topBarView.reRender();
            },
            error: function (response) {
                Info.displayNotice(response);
            }
        });

    },
    loginError: function(){
        $("#booking_loginPassword").val("");
    },
    bindEvents: function () {
        var that = this;
        if (!app.sessionManager.hasSession()) {
            $("#quickLogin").on("click", function(){
                $("#booking_loginbox").show();
            });
            $("#quickRegister").on("click", function(){
                app.navigate("register", true);
            });
            $("#booking_login").on("click", this.login);
            $("#booking_loginUsername").on("keypress", function (e) {
                if (e.which === 13) {
                    var username = $("#booking_loginUsername").val(), pwd = $("#booking_loginPassword").val();
                    if (username && pwd) {
                        that.login();
                    } else if (username) {
                        $("#booking_loginPassword").focus();
                    }
                }
            });
            $("#booking_forgotPassword").on("click", function (e) {
                e.preventDefault();
                app.navigate("forgetPassword/", true);
            });
            $("#"+ this.submitButtonId).addClass("hidden");
            $("#bookingDesc").addClass("hidden");
        }
        $("#booking_date").on("keypress", function(e){
            e.preventDefault();
        }).datepicker({
            buttonImageOnly: true,
            buttonImage: "calendar.gif",
            buttonText: "Calendar",
            minDate: new Date (),
            onSelect: function (text, inst) {
                var d = new Date ();
                d.setDate(inst.selectedDay);
                d.setMonth(inst.selectedMonth);
                d.setYear(inst.selectedYear);
                that.model.set("scheduledTime", d);
                $(this).val(Utilities.getDateString(d));
            }
        });
        BaseFormView.prototype.bindEvents.call(this);
    },
    submitAction:function () {
        var that = this;
        $("#"+ this.submitButtonId).val("预订中...");
        this.model.set("cashback", this.model.get("cashbackAmount"));
        app.userManager.initBooking(this.model, {
            success: this.bookingSuccess,
            error: function(){
                $("#"+ that.submitButtonId).val("预订失败, 请重试");
            }
        });
    },
    bookingSuccess: function (booking) {
        this.$el.empty().append(this.finishTemplate(booking._toJSON()));
        $("#viewMore").on("click", function() {
            app.navigate("search", true);
        });
        $("#viewBooking").on("click", function() {
            app.navigate("mypage/booking", true);
        });
        $("#printBooking").on("click", function () {
            window.print();
        });
    },
    close: function () {
        if (!this.isClosed) {
            $("#booking_date").datepicker( "destroy" );
            this.$el.empty();
            this.isClosed = true;
        }
    },
    buildValidatorDiv: function (valid, type, text) {
        //This function overloads baseField's default buildValidatorDiv. It should only be invoked by BaseField's testValue function, thus this refers the BaseForm model in this case,
        //This function is not bound to the view.
        $("#"+this.get("fieldId")+"_info").remove();
        if (valid) {
            return '<span class="success" id="'+this.get("fieldId")+'_right"></span>';
        } else if (type === "empty") {
            return '<span class="wrong" id="'+this.get("fieldId")+'_wrong" ><span class="form_tip"><span class="form_tip_top">' + this.get("name")+"不能为空" + '</span><span class="form_tip_bottom"></span></span></span>';
        } else if (text) {
            return '<span class="wrong" id="'+this.get("fieldId")+'_wrong"><span class="form_tip"><span class="form_tip_top">' + text + '</span><span class="form_tip_bottom"></span></span></span>';
        } else {
            return '<span class="wrong" id="'+this.get("fieldId")+'_wrong"><span class="form_tip"><span class="form_tip_top">' +  this.get("errorText") + '</span><span class="form_tip_bottom"></span></span></span>';
        }
    }, 
});