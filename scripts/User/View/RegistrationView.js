/*dedicated view for user registration, deep linking will not be used for registrtion states, this view holds the session data*/
var RegistrationView = BaseFormView.extend({
    el: "#content",
    form: false,
    submitButtonId: "complete",
    model: {},
    initialize: function(params){
        _.bindAll(this, 'render', 'bindEvents', 'phoneValid', 'passValid', 'successCallback', 'submitAction', 'close');
        app.viewRegistration.register(this);
        this.isClosed = false;
        $("#viewStyle").attr("href", "style/css/reg.css");
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
                validatorContainer: $("#cellContainer")
            }),
            new BaseField({
                name: "密码",
                fieldId: "registerPasswordInput",
                type: "text",
                mandatory: true,
                validatorFunction: Utilities.passValid,
                modelAttr: "password",
                validatorContainer: $("#passContainer")
            }),
            new BaseField({
                name: "确认密码",
                fieldId: "registerPasswordConfirmInput",
                type: "text",
                mandatory: true,
                validatorFunction: Utilities.passValid,
                modelAttr: "confirmPassword",
                validatorContainer: $("#confirmContainer")
            }),
            new BaseField({
                name: "邀请码",
                fieldId: "invitationCodeInput",
                type: "text",
                mandatory: false,
                modelAttr: "appliedInvitationalCode",
                validatorContainer: $("#invitationCodeContainer")
            }),
            new BaseField({
                name: "验证码",
                fieldId: "registerVeriCode",
                type: "text",
                mandatory: true,
                modelAttr: "authCode",
                validatorContainer: $("#authContainer")
            }),
        ];
        this.ref = params.ref;
        this.render();
    },
    render: function(){
        var that = this;
        $("#loginBox").hide();
        $("#getSms").on("click", function (e) {
            if (that.phoneValid(that.model.phone).valid) {
                $("#getSms").val("发送中...");
                app.userManager.smsVerification(that.model.phone,{
                    success: function () {
                        $("#smsInfo").html("验证码已经发送至您的手机，若2分钟没有收到短信，请确认手机号填写正确并重试").prop("disabled", true);
                        $("#getSms").val("重新发送");
                        setTimeout(function(){
                            $("#smsInfo").prop("disabled", false);
                        }, 120000);
                    },
                    error: function () {
                        $("#getSms").val("重新发送");
                        $("#smsInfo").html("验证码发送失败，请检查网络正常并重试");
                    },
                });
            }
        });
        BaseFormView.prototype.bindEvents.call(this);
    },
    successCallback: function(data){
        this.state = "finish";
        app.sessionManager.sessionModel = new User(data, {parse: true});
        this.$el.append(this.finishTemplate);
        var toPage = this.ref || "mypage";
        setTimeout(function(){
            app.navigate(toPage, true);
        },5000);
    },
    submitAction: function () {
        this.phoneCache = true;
        app.userManager.registerUser(this.model, {
            success: this.successCallback,
            error: function (){}
        });

    },
    close: function(){
        if (!this.isClosed){
            BaseFormView.prototype.close.call(this);
            this.$el.empty();
            this.isClosed = true;
        }
    }
});