var MyPagePasswordView = BaseFormView.extend({
    el:"#mypage_content",
    form: false,
    submitButtonId: "submit_password",
    model: {},
    initialize: function () {

        _.bindAll(this, 'render', 'close', 'savePassword', 'passwordSuccess', 'getSmsSuccess', 'getSmsError', 'passwordError', 'bindEvents'， 'clearPassword', 'oldPasswordValid', 'newPasswordValid', 'confirmPasswordValid');
        this.isClosed = false;
        this.field = [
            new BaseField({
                name:"原密码",
                fieldId: "oldPassword",
                fieldType: "text",
                mandatory: true,
                validatorFunction: this.oldPasswordValid,
                modelAttr: "oldPassword"
            }),
            new BaseField({
                name:"原密码",
                fieldId: "newPassword",
                fieldType: "text",
                mandatory: true,
                validatorFunction: this.newPasswordValid,
                modelAttr: "newPassword"
            }),
            new BaseField({
                name:"原密码",
                fieldId: "confirmPassword",
                fieldType: "text",
                mandatory: true,
                validatorFunction: this.confirmPasswordValid,
                modelAttr: "confirmNewPassword"
            }),
            new BaseField({
                name:"手机验证码",
                fieldId: "smsAuthCode",
                fieldType: "text",
                mandatory: true,
                modelAttr: "authCode"   
            })
        ];
        this.sessionUser = app.userManager.sessionModel;
        this.template = _.template(tpl.get('mypage_password'));

        this.render();
        this.bindEvents();
    },
    render: function (){
        this.$el.append(this.template);
    },
    bindEvents:function (){
        $("#getAuthCode").on("click", function () {
            app.userManager.changePasswordVerification({
                success: this.getSmsSuccess,
                error: this.getSmsError,
            });
            $("#getAuthCodeNote").html("短信发送中...");
            $("#getAuthCode").prop("disable", true);
        });

        $("#reset_password").on('click', this.clearPassword);
        BaseFormView.prototype.bindEvents.call(this);
    },
    getSmsSuccess: function () {
        $("#getAuthCodeNote").html("短信发送成功, 请确认短信。");
        $("#getAuthCode").prop("disable", false).val("重新发送");
    },
    getSmsError: function () {
        $("#getAuthCodeNote").html("验证请求失败，请检查网络状态然后重试。");
        $("#getAuthCode").prop("disable", false);
    },
    submitAction: function () {
        app.userManager.changePassword(this.model, {
            "success": this.passwordSuccess,
            "error": this.passwordError
        });
    },
    oldPasswordValid: function (val) {
        if (!val || val.length < 6) {
            return {valid:false, text:"密码长度至少6位"};
        } else {
            return {valid: true};
        }
    },
    newPasswordValid: function (val) {
        var value2 = $("#confirmPassword"),val();
        if (val !== value2) {
            return {valid:false, text:"两次密码不一致"};
        }
        if (!val || val.length < 6) {
            return {valid:false, text:"密码长度至少6位"};
        }
        return {valid:true};
    },
    confirmPasswordValid: function (val) {
        var value1 = $("#newPassword").val();
        if (value1 !== val) {
            return {valid:false, text:"两次密码不一致"};
        }
        if (!val || val.length < 6) {
            return {valid:false, text:"密码长度至少6位"};
        }
        return {valid:true};
    },
    passwordSuccess: function () {
        Info.displayNotice("密码修改成功");
        app.navigate('/temp', {
            replace: true
        });
        app.navigate("mypage/setting", {
            trigger: true
        });
    },
    passwordError: function () {
        Info.displayNotice("密码修改失败，请重试");
        this.clearPassword();
    },
    clearPassword: function () {
        $("#oldPassword").val("");
        $("#newPassword").val("");
        $("#confirmPassword").val("");
    },
    close: function (){

    }
});