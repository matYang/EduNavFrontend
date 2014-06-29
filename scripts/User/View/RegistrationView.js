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
        // $("#viewStyle").attr("href", "style/css/reg.css");
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
    render: function () {
        var that = this;
        $("#loginBox").hide();
        $("#getSms").on("click", function (e) {
            if (Utilities.phoneValid(that.model.phone).valid) {
                $("#getSms").val("发送中...");
                app.userManager.smsVerification(that.model.phone, Utilities.defaultSmsRequestHandler($("#getSms"), $("#smsInfo") ));
            } else {
                $("#smsInfo").html("请先输入您的手机号");
            }
            $("#registerVeriCode_wrong").remove();
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
            success:function () {
                app.topBarView.reRender();
                setTimeout(function () {
                    app.navigate(toPage, true);
                },5000);
            },
            error: function (data) {
                
            }
        });

    },
    submitAction: function () {
        this.phoneCache = true;
        app.userManager.registerUser(this.model, {
            success: this.successCallback,
            error: function (data){
                if (data === "error" || !data) {
                    data = "服务器连接失败，请稍后再试。";
                }
                Info.displayNotice(data);
            }
        });

    },
    passValid: function (val) {
        var p1 = val, p2 = $("#registerPasswordConfirmInput").val();
        if ( p2 && p1 !== p2 ) {
            return {valid: false, text:"两次输入密码不匹配"};
        } else if (val.length < 8 ){
            return {valid: false, text:"密码长度至少为8位"};
        } else {
            return {valid:true};
        }
    },
    confirmValid: function (val) {
        var p1 = $("#registerPasswordInput").val(), p2 = val;
        if ( p1 !== p2 ) {
            return {valid: false, text:"两次输入密码不匹配"};
        } else if (val.length < 8 ){
            return {valid: false, text:"密码长度至少为8位"};
        } else {
            if ($("#registerPasswordInput_wrong").length) {
                $("#registerPasswordInput_wrong").remove();
                $("#passContainer").append($("<div>").attr("id","registerPasswordInput_right").attr("class", "success"));
            }
            return {valid:true};
        }
    },
    close: function () {
        if (!this.isClosed){
            BaseFormView.prototype.close.call(this);
            this.$el.empty();
            this.isClosed = true;
        }
    }
});