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
        this.state = params.state;
        if (this.state){
            this.ref = this.state.split("_")[1];
        }
        this.render();
    },
    render: function(){
        var that = this;
        if (this.state !== "finish") {
            
            $("#loginBox").hide();
            $("#getSms").on("click", function (e) {
                if (that.phoneValid(that.model.phone).valid) {
                    app.userManager.smsVerification(that.model.phone);
                }
            });
            BaseFormView.prototype.bindEvents.call(this);
        } else {
            this.$el.append(this.finishTemplate);
        }
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
        if (this.ref) {
            app.navigate(this.ref, true);
        } else {
            app.navigate("front", true);
        }
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