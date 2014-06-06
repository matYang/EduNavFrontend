var NewBookingView = BaseFormView.extend({
    el:"#content",
    form: false,
    initialize: function (params) {
        this.isClosed = false;
        _.bindAll(this, "render", "bindEvents", "close");
        app.viewRegistration.register(this);
        this.template = _.template(tpl.get("newBooking"));
        this.field = [
            new BaseField({
                name: "入学人姓名",
                fieldId: "booking_applicantName",
                type: "text",
                mandatory: true,
                modelAttr: "name",
            }),
            new BaseField({
                name: "联系手机",
                fieldId: "booking_cellphone",
                type: "text",
                mandatory: true,
                modelAttr: "phone",
                validatorFunction: Utilities.phoneValid
            }),
            new BaseField({
                name: "E-mail",
                fieldId: "booking_email",
                type: "text",
                mandatory: false,
                modelAttr: "email",
                validatorFunction: Utilities.emailValid
            }),
            new BaseField({
                name: "预约报名日期",
                fieldId: "booking_date",
                type: "text",
                mandatory: true,
            })
        ]
        if (params.courseId) {
            app.generalManager.fetchCourse(params.courseId, {
                success: this.render,
                error: function(){}
            });
        } else if (params.course) {
            this.render(params.course);
        }
    },
    render: function (course) {
        this.$el.append(this.template(course._toJSON()));
        this.model = new Booking();
        this.model.initBookingFromCourse(course);
        this.bindEvents();
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
        $("#booking_loginbox").remove();
    },
    loginError: function(){
        $("#booking_loginPassword").val("");
    },
    bindEvents: function () {
        var that = this;
        if (app.sessionManager.hasSession()) {
            this.loginSuccess();
        } else {
            $("#booking_login").on("click", this.login);
            $("#booking_loginUsername").on("click", function(){
                var username = $("#booking_loginUsername").val(), pwd = $("#booking_loginPassword").val();
                if (username && pwd) {
                    that.login();
                } else if (username) {
                    $("#booking_loginPassword").focus();
                }
            });
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
                d.setMonth(inst.selectedMonth);x
                d.setYear(inst.selectedYear);
                that.model.set("scheduledTime", d);
                $(this).val(Utilities.getDateString(d));
            }
        });
        $("initBooking").on("click", function(){
            app.userManager.newBooking(this.model. {
                success: function(){
                    app.navigate("mypage/booking/" + id, true);
                },
                error: function(){

                }
            });
        });
    },
    close: function () {
        if (!this.isClosed) {
            this.$el.empty();
            this.isClosed = true;
        }
    }
});