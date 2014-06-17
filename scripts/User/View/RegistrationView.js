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
                validatorFunction: this.phoneValid,
                modelAttr: "phone",
                validatorContainer: $("#cellContainer")
            }),
            new BaseField({
                name: "密码",
                fieldId: "registerPasswordInput",
                type: "text",
                mandatory: true,
                validatorFunction: this.passValid,
                modelAttr: "password",
                validatorContainer: $("#passContainer")
            }),
            new BaseField({
                name: "确认密码",
                fieldId: "registerPasswordConfirmInput",
                type: "text",
                mandatory: true,
                validatorFunction: this.passValid,
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
                app.userManager.smsVerification(that.model.phone);
            }
        });
        BaseFormView.prototype.bindEvents.call(this);
    },
    phoneValid: function(val) {
        if (!val || val.length !== 11 || isNaN(parseInt(val,10)) ){
            return {valid: false, text:"手机号码格式不正确"};
        } else {
            return {valid: true};
        }
    },
    passValid: function (val) {
        var p1 = $("#password").val(), p2 = $("#passwordConfirm").val();
        if ( p1 !== p2 ) {
            return {valid: false, text:"密码长度至少为6位"};
        } else if (val.length < 6 ){
            return {valid: false, text:"两次输入密码不匹配"};
        } else {
            return {valid:true};
        }
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