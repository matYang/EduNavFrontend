var MyPagePasswordView = BaseFormView.extend({
    el:"#mypage_content",
    form: false,
    submitButtonId: "submit_password",
    model: {},
    initialize: function () {

        _.bindAll(this, 'render', 'close', 'passwordSuccess', 'getSmsSuccess', 'getSmsError', 'passwordError', 'bindEvents', 'clearPassword', 'oldPasswordValid', 'newPasswordValid', 'confirmPasswordValid');
        this.isClosed = false;
        app.viewRegistration.register(this);
        this.fields = [
            new BaseField({
                name:"原密码",
                fieldId: "oldPassword",
                fieldType: "text",
                mandatory: true,
                validatorFunction: this.oldPasswordValid,
                modelAttr: "oldPassword",
                buildValidatorDiv: Utilities.defaultValidDivBuilder
            }),
            new BaseField({
                name:"新密码",
                fieldId: "newPassword",
                fieldType: "text",
                mandatory: true,
                validatorFunction: this.newPasswordValid,
                modelAttr: "newPassword",
                buildValidatorDiv: Utilities.defaultValidDivBuilder
            }),
            new BaseField({
                name:"确认密码",
                fieldId: "confirmPassword",
                fieldType: "text",
                mandatory: true,
                validatorFunction: this.confirmPasswordValid,
                modelAttr: "confirmNewPassword",
                buildValidatorDiv: Utilities.defaultValidDivBuilder
            }),
            new BaseField({
                name:"手机验证码",
                fieldId: "smsAuthCode",
                fieldType: "text",
                mandatory: true,
                modelAttr: "authCode",
                buildValidatorDiv: this.smsValidator
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
        var that = this;
        $("#getAuthCode").add($("#gotAuthCode")).on("click", function () {
            app.userManager.changePasswordVerification({
                success: that.getSmsSuccess,
                error: that.getSmsError,
            });
            $(this).prop("disable", true).val("发送中...");
        });
        $("#cancelPassword").on("click", function (e) {
            e.preventDefault();
            app.navigate("mypage", true);
        });
        $("#reset_password").on('click', this.clearPassword);
        BaseFormView.prototype.bindEvents.call(this);
    },
    getSmsSuccess: function () {
        $("#getAuthCodeNote").html("短信发送成功, 请确认短信。");
        $("#getAuthCode").prop("disable", false).val("发送验证码").addClass("hidden");
        $("#gotAuthCode").removeClass("hidden");
    },
    getSmsError: function () {
        $("#getAuthCodeNote").html("验证请求失败，请检查网络状态然后重试。").removeClass("hidden");
        $("#getAuthCode").prop("disable", false).val("发送验证码").removeClass("hidden");
        $("#gotAuthCode").addClass("hidden");
    },
    submitAction: function () {
        app.userManager.changePassword(this.model, {
            "success": this.passwordSuccess,
            "error": this.passwordError
        });
    },
    oldPasswordValid: function (val) {
        if (!val || val.length < 8) {
            return {valid:false, text:"密码长度至少8位"};
        } else {
            $("#oldPassword").removeClass("wrong_color");
            return {valid: true};
        }
    },
    newPasswordValid: function (val) {
        var value2 = $("#confirmPassword").val();
        if (val !== value2) {
            return {valid:false, text:"两次密码不一致"};
        }
        if (!val || val.length < 8) {
            return {valid:false, text:"密码长度至少8位"};
        }
        $("#confirmPassword_wrong").remove();
        $("#confirmPassword").removeClass("wrong_color");

        return {valid:true};
    },
    confirmPasswordValid: function (val) {
        var value1 = $("#newPassword").val();
        if (value1 !== val) {
            return {valid:false, text:"两次密码不一致"};
        }
        if (!val || val.length < 8) {
            return {valid:false, text:"密码长度至少8位"};
        }
        $("#newPassword_wrong").remove();
        $("#newPassword").removeClass("wrong_color");
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
    buildValidatorDiv: function (valid, type, text) {
        //This function overloads baseField's default buildValidatorDiv. It should only be invoked by BaseField's testValue function, thus this refers the BaseForm model in this case,
        //This function is not bound to the view.
        $("#"+this.get("fieldId")+"_info").remove();
        if (valid) {
            $("#"+this.get("fieldId")).removeClass("wrong_color");
            return '<span class="success" id="'+this.get("fieldId")+'_right"></span>';
        } else if (type === "empty") {
            $("#"+this.get("fieldId")).addClass("wrong_color");
            return '<span class="wrong" id="'+this.get("fieldId")+'_wrong" ><span class="form_tip"><span class="form_tip_top">' + this.get("name")+"不能为空" + '</span><span class="form_tip_bottom"></span></span></span>';
        } else if (text) {
            $("#"+this.get("fieldId")).addClass("wrong_color");
            return '<span class="wrong" id="'+this.get("fieldId")+'_wrong"><span class="form_tip"><span class="form_tip_top">' + text + '</span><span class="form_tip_bottom"></span></span></span>';
        } else {
            $("#"+this.get("fieldId")).addClass("wrong_color");
            return '<span class="wrong" id="'+this.get("fieldId")+'_wrong"><span class="form_tip"><span class="form_tip_top">' +  this.get("errorText") + '</span><span class="form_tip_bottom"></span></span></span>';
        }
    },
    smsValidator: function (valid, type, text) {
        if (valid) {
            $("#"+this.get("fieldId")).removeClass("wrong_color");
        } else {
            $("#"+this.get("fieldId")).addClass("wrong_color");
        }
        return "";
    }, 
    close: function (){
        if (!this.isClosed) {
            this.isClosed = true;
            this.$el.empty();
        }
    }
});