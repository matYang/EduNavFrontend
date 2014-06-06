
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
        app.viewRegistration.register(this);
        this.isClosed = false;
        this.template = _.template(tpl.get('registration'));
        this.finishTemplate = _.template(tpl.get('registration_finish'));
        this.render();
    },
    render: function(){
        var that = this;
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
            $("#getSms").on("click", function (e) {
                var phone = that.$cell.val();
                if (that.phoneValid(phone).valid) {
                    app.userManager.smsVerification(phone);
                }
            });
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

    successCallback: function(data){
        this.state = "finish";
        app.sessionManager.sessionModel = new User(data, {parse: true}); 
        this.render();
    },
    submitAction: function () {
        var phone = $("#registerCellInput").val();
        this.user.set("phone", phone);
        this.user.set("password", $("#registerPasswordInput").val());
        this.user = {
            "phone": encodeURI(phone),
            "password": encodeURI($("#registerPasswordInput").val()),
            "confirmPassword": encodeURI($("#registerConfirmPasswordInput").val()),
            "authCode": encodeURI($("#smsAuthCode").val())
        };

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