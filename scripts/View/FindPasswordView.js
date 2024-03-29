var FindPasswordView = BaseFormView.extend({
    el: "#content",
    model: {},
    submitButtonId: "nextButton",
    form: false,
    template1: _.template(tpl.get("findPassword_1")),
    template2: _.template(tpl.get("findPassword_2")),
    fields: [
        new BaseField({
            name: "手机",
            fieldId: "findPassCellInput",
            type: "text",
            mandatory: true,
            validatorFunction: Utilities.phoneValid,
            modelAttr: "accountIdentifier",
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
            name: "短信验证码",
            fieldId: "vcodeInput",
            type: "text",
            mandatory: true,
            modelAttr: "vcode",
            buildValidatorDiv: Utilities.defaultValidDivBuilder
        }),
        new BaseField({
            name: "密码",
            fieldId: "findPassPassInput",
            type: "text",
            mandatory: true,
            modelAttr: "newPassword",
            buildValidatorDiv: Utilities.defaultValidDivBuilder
        }),
        new BaseField({
            name: "确认密码",
            fieldId: "findPassConfirmInput",
            type: "text",
            mandatory: true,
            modelAttr: "confirmNewPassword",
            buildValidatorDiv: Utilities.defaultValidDivBuilder
        })
    ],
    initialize: function () {
        _.bindAll(this, 'render', 'bindEvents', 'submitAction', 'changeError', 'successCallback', 'passValid', 'confirmValid', 'close');
        app.viewRegistration.register(this);
        this.fields[2].validatorFunction = FindPasswordView.prototype.passValid;
        this.fields[3].validatorFunction = FindPasswordView.prototype.confirmValid;
        this.isClosed = false;
        // $("#viewStyle").attr("href", "style/css/reg.css");
        this.render(1);
    },
    render: function (state) {
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
            $("#findPassCellInput").val($("#login_username").val());
        }
        this.bindEvents(this.state);
        $("#findPassCellInput").trigger("blur");
    },
    bindEvents: function (state) {
        var that = this;
        if (state !== 2) {
            $("#getSms").on("click", function () {
                if (!that.model.vcode) {
                    $("#smsInfo").html("请输入图片验证码");
                } else if (Utilities.phoneValid(that.model.accountIdentifier).valid) {
                    app.userManager.forgetPassword({phone: that.model.accountIdentifier, vcode: that.model.vcode}, Utilities.defaultSmsRequestHandler($("#getSms"), $("#smsInfo")));
                } else {
                    $("#smsInfo").html("请先输入正确的手机号");
                }
                $("#authCode_wrong").remove();
            });
            BaseFormView.prototype.bindEvents.call(this);
        }
        this.$el.on('click', '.vcode', function (e) {
            var src = $(this).attr('src').split('?')[0] + '?_=' + (new Date()).getTime();
            $(this).attr('src', src)
        });
    },
    submitAction: function () {
        app.userManager.recoverPassword(this.model, {
            success: this.successCallback,
            error: this.changeError
        });
    },
    successCallback: function () {
//        $("#confirmChange").val("修改成功");
//        app.navigate("mypage", true);
        this.render(2);
    },
    changeError: function (data) {
        Info.displayNotice(data.message);
    },
    passValid: function (val) {
        var p1 = val, p2 = $("#findPassConfirmInput").val();
        if (p2 && p1 !== p2) {
            return {valid: false, text: "两次输入密码不匹配"};
        } else if (val.length < 6) {
            return {valid: false, text: "密码长度至少为6位"};
        } else {
            return {valid: true};
        }
    },
    confirmValid: function (val) {
        var p1 = $("#findPassPassInput").val(), p2 = val;
        if (p1 !== p2) {
            return {valid: false, text: "两次输入密码不匹配"};
        } else if (val.length < 6) {
            return {valid: false, text: "密码长度至少为6位"};
        } else {
            if ($("#findPassPassInput_wrong").length) {
                $("#findPassPassInput_wrong").remove();
                $("#passContainer").append($("<div>").attr("id", "findPassPassInput_right").attr("class", "success"));
            }
            return {valid: true};
        }
    },
    close: function () {
        if (!this.isClosed) {
            this.isClosed = true;
            this.$el.empty();
        }
    }

});
