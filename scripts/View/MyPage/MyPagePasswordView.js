var MyPagePasswordView = BaseFormView.extend({
    el: "#mypage_content",
    form: false,
    submitButtonId: "submit_password",
    model: {},
    initialize: function () {

        _.bindAll(this, 'render', 'close', 'passwordSuccess', 'passwordError', 'bindEvents', 'clearPassword', 'oldPasswordValid', 'newPasswordValid', 'confirmPasswordValid');
        this.isClosed = false;
        app.viewRegistration.register(this);
        this.fields = [
            new BaseField({
                name: "原密码",
                fieldId: "oldPassword",
                fieldType: "text",
                mandatory: true,
                validatorFunction: this.oldPasswordValid,
                modelAttr: "oldPassword",
                buildValidatorDiv: Utilities.defaultValidDivBuilder
            }),
            new BaseField({
                name: "新密码",
                fieldId: "newPassword",
                fieldType: "text",
                mandatory: true,
                validatorFunction: this.newPasswordValid,
                modelAttr: "newPassword",
                buildValidatorDiv: Utilities.defaultValidDivBuilder
            }),
            new BaseField({
                name: "确认密码",
                fieldId: "confirmPassword",
                fieldType: "text",
                mandatory: true,
                validatorFunction: this.confirmPasswordValid,
                modelAttr: "confirmNewPassword",
                buildValidatorDiv: Utilities.defaultValidDivBuilder
            })
        ];
        this.sessionUser = app.userManager.sessionModel;
        this.template = _.template(tpl.get('mypage_password'));

        this.render();
        this.bindEvents();
    },
    render: function () {
        this.$el.append(this.template);
        this.clearPassword();
    },
    bindEvents: function () {
        var that = this;
        $("#getAuthCode").add($("#gotAuthCode")).on("click", function () {
            app.userManager.changePasswordVerification({
                success: that.getSmsSuccess,
                error: that.getSmsError,
            });
            $(this).prop("disable", true).val("发送中...").css("background", "#999");
        });
        $("#cancelPassword").on("click", function (e) {
            e.preventDefault();
            app.navigate("mypage", true);
        });
        $("#reset_password").on('click', this.clearPassword);
        BaseFormView.prototype.bindEvents.call(this);
    },

    submitAction: function () {
        app.userManager.changePassword(this.model, {
            "success": this.passwordSuccess,
            "error": this.passwordError
        });
    },
    oldPasswordValid: function (val) {
        if (!val || val.length < 6) {
            return {valid: false, text: "密码长度至少6位"};
        } else {
            $("#oldPassword").removeClass("wrong_color");
            return {valid: true};
        }
    },
    newPasswordValid: function (val) {
        var value2 = $("#confirmPassword").val();
        if (value2 !== undefined && value2.length > 0 && val !== value2) {
            return {valid: false, text: "两次密码不一致"};
        }
        if (!val || val.length < 6) {
            return {valid: false, text: "密码长度至少6位"};
        }
        $("#confirmPassword_wrong").remove();
        $("#confirmPassword").removeClass("wrong_color");

        return {valid: true};
    },
    confirmPasswordValid: function (val) {
        var value1 = $("#newPassword").val();
        if (value1 !== val) {
            return {valid: false, text: "两次密码不一致"};
        }
        if (!val || val.length < 6) {
            return {valid: false, text: "密码长度至少6位"};
        }
        $("#newPassword_wrong").remove();
        $("#newPassword").removeClass("wrong_color");
        return {valid: true};
    },
    passwordSuccess: function () {
        Info.displayNotice("密码修改成功");
        app.navigate("mypage/setting", {
            trigger: true
        });
    },
    passwordError: function (data) {
        Info.displayNotice(data.message ? data.message : "密码修改失败，请重试");
        this.clearPassword();
    },
    clearPassword: function () {
        this.model = {};
        $("#oldPassword").val("");
        $("#newPassword").val("");
        $("#confirmPassword").val("");
    },
    buildValidatorDiv: function (valid, type, text) {
        //This function overloads baseField's default buildValidatorDiv. It should only be invoked by BaseField's testValue function, thus this refers the BaseForm model in this case,
        //This function is not bound to the view.
        $("#" + this.get("fieldId") + "_info").remove();
        if (valid) {
            $("#" + this.get("fieldId")).removeClass("wrong_color");
            return '<span class="success" id="' + this.get("fieldId") + '_right"></span>';
        } else if (type === "empty") {
            $("#" + this.get("fieldId")).addClass("wrong_color");
            return '<span class="wrong" id="' + this.get("fieldId") + '_wrong" ><span class="form_tip"><span class="form_tip_top">' + this.get("name") + "不能为空" + '</span><span class="form_tip_bottom"></span></span></span>';
        } else if (text) {
            $("#" + this.get("fieldId")).addClass("wrong_color");
            return '<span class="wrong" id="' + this.get("fieldId") + '_wrong"><span class="form_tip"><span class="form_tip_top">' + text + '</span><span class="form_tip_bottom"></span></span></span>';
        } else {
            $("#" + this.get("fieldId")).addClass("wrong_color");
            return '<span class="wrong" id="' + this.get("fieldId") + '_wrong"><span class="form_tip"><span class="form_tip_top">' + this.get("errorText") + '</span><span class="form_tip_bottom"></span></span></span>';
        }
    },
    close: function () {
        if (!this.isClosed) {
            this.isClosed = true;
            this.$el.empty();
        }
    }
});