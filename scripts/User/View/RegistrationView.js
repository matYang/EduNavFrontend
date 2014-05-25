
/*dedicated view for user registration, deep linking will not be used for registrtion states, this view holds the session data*/
var RegistrationView = BaseFormView.extend({
    el: "#content",
    form: true,
    submitButtonId: "#register_submit",
    fields = [
        new BaseField({
            name: "用户名",
            fieldId: "username",
            type: "text",
            mandatory: true
        }),
        new BaseField({
            name: "密码",
            fieldId: "password",
            type: "text",
            mandatory: true,
            validatorFunction: this.passValid
        }),
        new BaseField({
            name: "确认密码",
            fieldId: "confirmPassword",
            type: "text",
            mandatory: true,
            validatorFunction: this.passValid
        }),
        new BaseField({
            name: "确认密码",
            fieldId: "confirmPassword",
            type: "text",
            mandatory: true,
            validatorFunction: this.passValid
        }),
    ],
    initialize: function(params){
        _.bindAll(this, 'render', 'bindEvents', 'finish', 'acceptDefaultLocation', 'closeLocationDropDown', 'verifyEmail', 'close');
        app.viewRegistration.register("registration", this, true);
        this.isClosed = false;
        this.template = _.template(tpl.get('registration'));
        this.finishTemplate = _.template(tpl.get('registration_finish'));
        this.registerInfo = {"location":new UserLocation(),"gender":Constants.gender.female};
        this.out = false;

        this.render(1);
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
            this.$email = $('#registerEmailInput');
            this.$year = $("#birthyear");
            this.$month = $("#birthmonth");
            this.$day = $("#birthday");
            this.$name = $("#registerNameInput");
            this.bindEvents();
            this.bindValidator();
        } else {
            this.domContainer.append(this.finishTemplate);
            $("#emailValue").html(this.emailCache);
            
            if (!this.emailCache) {
                this.emailCache = Utilities.getCookie("registrationEmail");
            }
            if (!this.emailCache) {
                app.navigate("front", {trigger:true, replace:true});
            }
            var domain = this.emailCache.split("@")[1];
            var emailDomain = Constants.emailLink[domain] || domain;
            $("#gotoEmail").on("click", function (e) {
                window.open("http://"+emailDomain);
            });
            $("#resendEmail").on("click", function (e) {
                app.userManager.resendActivationEmail();
            });
        }

        // --- events binding ---
    },
    textValid: function(val) {

    },
    passValid: function (val) {
        var p1 = $("#password").val(), p2 = $("#passwordConfirm").val();
        if ( p1 !== p2 ) {
            return {valid: false, text:"密码长度至少为6位"}
        } else if (val.length < 6 ){
            return {valid: false, text:"两次输入密码不匹配"}
        } else {
            return {valid:true};
        }
    },
    bindValidator: function(){
        
    },
    bindEvents: function(){
    
    },

    successCallback: function(){
        Info.displayNotice("注册成功");
    },

    verifyEmail: function (available) {
        if (available) {
            if ($("#vemail").length === 0) {
                this.$email.after('<span id="vemail" class="right"></span>');
            }
        } else {
            this.valid.email = false;
            $("#vemail").remove();
            this.$email.parent().addClass("wrong").append('<p class="sign_up_err" title="该邮箱已经被注册"><span>该邮箱已经被注册</span></p>');
        }
    },

    close: function(){
        if (!this.isClosed){
            if (this.state !== "finish") {
                this.$name.off();
                this.$email.off();
                this.$password.off();
                this.$year.off();
            }
            document.cookie="registrationEmail=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
            $("#registerGenderSelect").off();

            $('#pivotLocation').off();

            $("#myAddress").off();
            $("#complete").off();
            this.domContainer.empty();
            this.isClosed = true;
        }
    }


});