/*dedicated view for user registration, deep linking will not be used for registrtion states, this view holds the session data*/
var RegistrationView = BaseFormView.extend({
    el: "#content",
    form: false,
    submitButtonId: "complete",
    model: {},
    initialize: function(params){
        _.bindAll(this, 'render', 'bindEvents', 'successCallback', 'submitAction', 'close');
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
                validatorContainer: $("#cellContainer"),
                buildValidatorDiv: Utilities.defaultValidDivBuilder
            }),
            new BaseField({
                name: "密码",
                fieldId: "registerPasswordInput",
                type: "text",
                mandatory: true,
                validatorFunction: Utilities.passValid,
                modelAttr: "password",
                validatorContainer: $("#passContainer"),
                buildValidatorDiv: Utilities.defaultValidDivBuilder
            }),
            new BaseField({
                name: "确认密码",
                fieldId: "registerPasswordConfirmInput",
                type: "text",
                mandatory: true,
                validatorFunction: Utilities.passValid,
                modelAttr: "confirmPassword",
                validatorContainer: $("#confirmContainer"),
                buildValidatorDiv: Utilities.defaultValidDivBuilder
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
                validatorContainer: $("#authContainer"),
                buildValidatorDiv: Utilities.defaultValidDivBuilder
            }),
        ];
        this.ref = params.ref;
        this.render();
    },
    render: function(){
        var that = this;
        $("#loginBox").hide();
        $("#getSms").on("click", function (e) {
            if (Utilities.phoneValid(that.model.phone).valid) {
                $("#getSms").val("发送中...");
                app.userManager.smsVerification(that.model.phone, Utilities.defaultSmsRequestHandler($("#getSms"), $("#smsInfo") ));
            } else {
                $("#smsInfo").html("请先输入您的手机号");
            }
        });
        BaseFormView.prototype.bindEvents.call(this);
    },
    successCallback: function(data){
        this.state = "finish";
        var that = this;
        var toPage = this.ref || "mypage";
        app.sessionManager.sessionModel = new User(data, {parse: true});
        this.$el.empty().append(this.finishTemplate);
        app.sessionManager.fetchSession(true, {
            success:function(){
                app.topBarView.reRender();
                setTimeout(function(){
                    app.navigate(toPage, true);
                },5000);
            },
            error: function () {

            }
        });

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