
/*dedicated view for user registration, deep linking will not be used for registrtion states, this view holds the session data*/
var RegistrationView = BaseFormView.extend({
    el: "#content",
    form: false,
    submitButtonId: "#register_submit",
    fields: [
        new BaseField({
            name: "手机",
            fieldId: "registerCellInput",
            type: "text",
            mandatory: true,
            validatorFunction: this.passValid
        }),
        new BaseField({
            name: "密码",
            fieldId: "registerPasswordInput",
            type: "text",
            mandatory: true,
            validatorFunction: this.passValid
        }),
        new BaseField({
            name: "确认密码",
            fieldId: "registerPasswordConfirmInput",
            type: "text",
            mandatory: true,
            validatorFunction: this.passValid
        }),
        new BaseField({
            name: "验证码",
            fieldId: "registerCaptchaInput",
            type: "text",
            mandatory: true,
            validatorFunction: this.captchaValid
        }),
    ],
    initialize: function(params){
        _.bindAll(this, 'render', 'bindEvents', 'phoneValid', 'passValid', 'captchaValid', 'successCallback', 'submitAction', 'close');
        app.viewRegistration.register("registration", this, true);
        this.isClosed = false;
        this.template = _.template(tpl.get('registration'));
        this.finishTemplate = _.template(tpl.get('registration_finish'));
        this.render();
    },
    render: function(){
        this.domContainer = $('#content');
        this.domContainer.empty();
        if (this.state !== "finish") {
            this.domContainer.append(this.baseTemplate);
            this.registerContainer = $('#registerContainer');
            this.contentContainer = $('#registerContent');
            $("#loginBox").hide();
            this.$password = $("#registerPasswordInput");
            this.$confirm = $("#registerPasswordConfirmInput");
            this.$cell = $('#registerCellInput');
            BaseFormView.prototype.bindEvents.call(this);
        } else {
            this.domContainer.append(this.finishTemplate);
            if (this.user) {
                $("#phoneNumber").val(this.user.get("phone"));
            } else {
                this.phoneCache = Utilities.getCookie("registrationCell");
                if (this.phoneCache) {
                    $("#phoneNumber").val(this.phoneCache);
                }
            }
            $("#verifyAccount").on("click", function (e) {
                app.userManager.verifySMSAuthCode($("#phoneNumber").val(),$("#smsAuthCode").val(), {
                    success: function () {
                        app.navigate("front", true);
                    },
                    error: function () {

                    }
                });
            });
            $("#resendSMS").on("click", function (e) {
                app.userManager.smsVerification();
            });
        }

        // --- events binding ---
    },
    phoneValid: function(val) {
        if (val.length !== 11 || isNaN(parseInt(val,10)) ){
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
    captchaValid: function (val) {

    },

    successCallback: function(){
        this.state = "finish";
        this.render();
    },
    submitAction: function () {
        this.user = new User();
        var phone = $("#registerCellInput").val();

        this.user.set("phone", phone);
        this.user.set("password", $("#registerPasswordInput").val());
        document.cookie="registrationPhone="+phone+";"
        this.phoneCache = true;
        app.userManager.registerUser(this.user, {
            success: this.successCallback,
            error: function (){}
        });

    },


    close: function(){
        if (!this.isClosed){
            if (this.state !== "finish") {
                this.$cell.off();
                this.$password.off();
            }
            this.phoneCache = false;
            document.cookie="registrationPhone=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
            $("#complete").off();
            this.domContainer.empty();
            this.isClosed = true;
        }
    }


});