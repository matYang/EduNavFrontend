var FindPasswordView = BaseFormView.extend({
    el: "#content",
    model: {},
    submitButtonId: "nextButton",
    form:false,
    fields: [
        new BaseField({
            name: "手机",
            fieldId: "findPassCellInput",
            type: "text",
            mandatory: true,
            validatorFunction: Utilities.phoneValid,
            modelAttr: "phone",
            buildValidatorDiv: Utilities.defaultValidDivBuilder
        }),
        new BaseField({
            name: "验证码",
            fieldId: "authCode",
            type: "text",
            mandatory: true,
            modelAttr: "authCode",
            buildValidatorDiv: Utilities.defaultValidDivBuilder
        }),
        new BaseField({
            name: "密码",
            fieldId: "findPassPassInput",
            type: "text",
            mandatory: true,
            validatorFunction: Utilities.passValid,
            modelAttr: "newPassword",
            buildValidatorDiv: Utilities.defaultValidDivBuilder
        }),
        new BaseField({
            name: "确认密码",
            fieldId: "findPassConfirmInput",
            type: "text",
            mandatory: true,
            validatorFunction: Utilities.passValid,
            modelAttr: "confirmNewPassword",
            buildValidatorDiv: Utilities.defaultValidDivBuilder
        })
    ],
    initialize: function (params) {
        _.bindAll(this, 'render', 'bindEvents', 'submitAction', 'changeError', 'successCallback', 'close');
        app.viewRegistration.register(this);
        this.isClosed = false;
        this.template1 = _.template(tpl.get("findPassword_1"));
        this.template2 = _.template(tpl.get("findPassword_2"));
        // this.template3 = _.template(tpl.get("findPassword_3"));
        $("#viewStyle").attr("href", "style/css/reg.css");
        this.render(1);
    },
    render: function (state) {
        var that = this;
        this.state = state;
        this.$el.empty();
        if (state === 2) {
            this.$el.append(this.template2);
        } else {
            this.$el.append(this.template1);
            this.fields[0].set("validatorContainer", $("#cellContainer"));
            this.fields[1].set("validatorContainer", $("#authContainer"));
            this.fields[2].set("validatorContainer", $("#passContainer"));
            this.fields[3].set("validatorContainer", $("#confirmContainer"));
        }
        this.bindEvents(this.state);
    },
    bindEvents: function (state) {
        var that = this;
         if (state === 2) {

        } else {
            $("#getSms").on("click", function() {
                if (Utilities.phoneValid(that.model.phone).valid) {
                    app.forgetPassword(that.model.phone, Utilities.defaultSmsRequestHandler($("#getSms"), $("#smsInfo") ));
                } else {
                    $("#smsInfo").html("请先输入您的手机号");
                }
            });
            BaseFormView.prototype.bindEvents.call(this);
        }
    },
    submitAction: function () {
        app.userManager.recoverPassword(this.model, {
            success: this.successCallback,
            error: this.changeError
        });

    },
    successCallback: function () {
        $("#confirmChange").val("修改成功");       
        
    },
    changeError: function (data) {
        var message;
        $("#confirmChange").val("确定");
        if (data.status == 401){
            message = "更改密码请求无效或已过期";
        }
        else if (data.status == 400){
            message = "更改密码请求无效";
        }
        else{
            message = "请稍后再试";
        }
        app.infoModal.setMessage(message).show();
    },
    close: function () {
        if (!this.isClosed) {
            this.isClosed = true;
            this.$el.empty();
        }
    }

});
