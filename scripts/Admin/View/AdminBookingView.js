var AdminBookingView = BaseFormView.extend({
	el: "#bookingCRUDContainer",
    form: false,
    submitButtonId: "bookingPostSubmit",
    callback: "uploadTarget",
    initialize: function(params){
        _.bindAll(this, "render", "bindEvents", "close");
        BaseFormView.prototype.initialize.call(this);
        app.viewRegistration.register(this);
        params = params || {};
        this.template = _.template(tpl.get("adminBooking"));
        this.fields = [
            new BaseField({
                name: "姓名",
                fieldId: "name_Input",
                type: "text",
                mandatory: true,
                modelAttr: "name",
                validClass: "success"
            }),
            new BaseField({
                name: "手机号码",
                fieldId: "phone_Input",
                type: "text",
                mandatory: true,
                modelAttr: "phone",
                validClass: "success",
                validatorFunction: Utilities.phoneValid
            }),
            new BaseField({
                name: "E-mail",
                fieldId: "email_Input",
                type: "text",
                mandatory: false,
                modelAttr: "email",
                validClass: "success",
                validatorFunction: Utilities.emailValid
            }),
            new BaseField({
                name: "预约报名日期",
                fieldId: "scheduledTime_Input",
                modelAttr: "scheduledTime",
                validClass: "success",
                type: "text",
                mandatory: true
            }),
            new BaseField({
                name: "记录",
                fieldId: "note_Input",
                modelAttr: "note",
                validClass: "success",
                type: "text",
                mandatory: false
            })
        ];
        if (params.booking) {
            this.render(params.booking);
        } else if (params.bookingId) {
            app.adminManager.getBooking(params.bookingId, {
                success: this.render,
                error: function() {
                    app.navigate("manage/booking", true);
                }
            });
        }
    },

    render: function (booking) {
        this.model = booking;
        this.$el.append(this.template(booking._toJSON()));
        $("#adminBookingForm").find(".edit").hide();
        $("#adminBookingForm").find(".detail").show();
        $("#searchResult").addClass("hidden");
        this.bindEvents();
    },
    submitAction: function () {
        app.adminManager.updateBooking(this.model, {
            success: function() {
                $("#submitResult").remove();
                $("#bookingPostSubmit").after("<p id='submitResult'>修改成功</p>");
            },
            error: function() {
                $("#submitResult").remove();
                $("#bookingPostSubmit").after("<p id='submitResult'>修改失败，请重试</p>");
            }
        });
    },
    bindEvents: function () {
        var that = this;
        BaseFormView.prototype.bindEvents.call(this);
        $("#cancel").on("click", function () {
            $("#adminBookingForm").find(".edit").hide();
            $("#adminBookingForm").find(".detail").show();   
        });
        $("#editBooking").on("click", function () {
            $("#adminBookingForm").find(".edit").show();
            $("#adminBookingForm").find(".detail").hide(); 
			var json = that.model._toJSON();
            for (var attr in json) {
                var $edit = $("input[name="+attr+"]");
                if ($edit.attr("type") === "checkbox") {
                    $edit.prop("checked", json[attr]);
                }
                $edit.val(json[attr]);
            }
        });
        $("input[name=scheduledTime]").datepicker({
                buttonImageOnly: true,
                buttonImage: "calendar.gif",
                buttonText: "Calendar",
                onSelect: function (text, inst) {
                    var d = new Date ();
                    d.setDate(inst.selectedDay);
                    d.setMonth(inst.selectedMonth);
                    d.setYear(inst.selectedYear);
                    $(this).val(Utilities.castToAPIFormat(d));
                }
            });
    },  
    successCallback: function () {
        app.navigate("manage/booking", true);
    },
    close: function () {
        if (!this.isClosed) {
            this.isClosed = false;
            this.$el.empty();
        }
    }
});