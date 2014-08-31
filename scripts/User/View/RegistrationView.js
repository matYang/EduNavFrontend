/*dedicated view for user registration, deep linking will not be used for registrtion states, this view holds the session data*/
var RegistrationView = BaseFormView.extend({
    el: "#content",
    form: false,
    submitButtonId: "complete",
    model: {},
    initialize: function (params) {
        _.bindAll(this, 'render', 'bindEvents', 'successCallback', 'submitAction', 'close');
        app.viewRegistration.register(this);
        this.isClosed = false;
        this.template = _.template(tpl.get('registration'));
        this.finishTemplate = _.template(tpl.get('registration_finish'));
        this.$el.append(this.template);
        this.fields = [
            new BaseField({
                name: "手机",
                fieldId: "registerCellInput",
                type: "text",
                mandatory: true,
                validatorFunction: Utilities.phoneValid,
                modelAttr: "phone",
                validatorContainer: $("#cellContainer"),
                buildValidatorDiv: Utilities.defaultValidDivBuilder
            }),
//            new BaseField({
//                name: "用户名",
//                fieldId: "registerUsernameInput",
//                type: "text",
//                mandatory: true,
//                validatorFunction: Utilities.usernameValid,
//                modelAttr: "invitationCode",
//                validatorContainer: $("#usernameContainer"),
//                buildValidatorDiv: Utilities.defaultValidDivBuilder
//            }),
            new BaseField({
                name: "密码",
                fieldId: "registerPasswordInput",
                type: "text",
                mandatory: true,
                validatorFunction: this.passValid,
                modelAttr: "password",
                validatorContainer: $("#passContainer"),
                buildValidatorDiv: Utilities.defaultValidDivBuilder
            }),
            new BaseField({
                name: "确认密码",
                fieldId: "registerPasswordConfirmInput",
                type: "text",
                mandatory: true,
                validatorFunction: this.confirmValid,
                modelAttr: "confirmPassword",
                validatorContainer: $("#confirmContainer"),
                buildValidatorDiv: Utilities.defaultValidDivBuilder
            }),
            new BaseField({
                name: "邀请码",
                fieldId: "invitationCodeInput",
                type: "text",
                mandatory: false,
                modelAttr: "appliedInvitationCode",
                validatorContainer: $("#invitationCodeContainer")
            }),
            new BaseField({
                name: "验证码",
                fieldId: "registerVeriCode",
                type: "text",
                mandatory: true,
                modelAttr: "authCode",
                validatorContainer: $("#authContainer"),
                buildValidatorDiv: Utilities.defaultValidDivBuilder
            })
        ];
        this.ref = params.ref;
        this.invite = params.invite;
        this.render();
        if (this.invite) {
            this.model.appliedInvitationCode = this.invite;
            $("#invitationCodeInput").val(this.invite).prop("disabled", true);
        }
    },
    render: function () {
        var that = this;
        $("#loginBox").hide();
        $("#getSms").on("click", function (e) {
            if (Utilities.phoneValid(that.model.phone).valid) {
                var $btnGetSms = $(this);
                $btnGetSms.val("发送中...").prop("disabled", true);
                app.userManager.smsVerification(that.model.phone, Utilities.defaultSmsRequestHandler($btnGetSms, $("#smsInfo")));
            } else {
                $("#smsInfo").html("请先输入您的手机号");
            }
            $("#registerVeriCode_wrong").remove();
        });
        this.$el.find("input").on("keypress", function (e) {
            if (e.which === 13) {
                $("#" + that.submitButtonId).trigger("click");
            }
        });
        BaseFormView.prototype.bindEvents.call(this);
    },
    successCallback: function (data) {
        this.state = "finish";
        var that = this, counter = 5;
        app.topBarView.render();

        var toPage = this.ref || "mypage";
        this.$el.empty().append(this.finishTemplate);
        var timeout = setInterval(function () {
            $("#countdown").html(--counter);
            if (counter === 0) {
                clearInterval(timeout);
                app.navigate(toPage, true);
            }
        }, 1000);
    },
    submitAction: function () {
        this.model.authCode = this.model.authCode.toUpperCase();
        app.userManager.registerUser(this.model, {
            success: this.successCallback,
            error: function (data) {
                Info.displayNotice(data.message);
            }
        });

    },
    passValid: function (val) {
        var p1 = val,
            p2 = $("#registerPasswordConfirmInput").val();
        if (p2 && p1 !== p2) {
            return {valid: false, text: "两次输入密码不匹配"};
        } else if (val.length < 6) {
            return {valid: false, text: "密码长度至少为6位"};
        } else {
            return {valid: true};
        }
    },
    confirmValid: function (val) {
        var p1 = $("#registerPasswordInput").val(), p2 = val;
        if (p1 !== p2) {
            return {valid: false, text: "两次输入密码不匹配"};
        } else if (val.length < 6) {
            return {valid: false, text: "密码长度至少为6位"};
        } else {
            if ($("#registerPasswordInput_wrong").length) {
                $("#registerPasswordInput_wrong").remove();
                $("#passContainer").append($("<div>").attr("id", "registerPasswordInput_right").attr("class", "success"));
            }
            return {valid: true};
        }
    },
    close: function () {
        if (!this.isClosed) {
            BaseFormView.prototype.close.call(this);
            this.$el.empty();
            this.isClosed = true;
        }
    }
});