var FindPasswordView = BaseFormView.extend({
    el: "#content",
    model: {},
    initialize: function (params) {
        _.bindAll(this, 'render', 'validatePassword', 'submitAction', 'changeError', 'successCallback', 'close');
        app.viewRegistration.register(this);
        this.isClosed = false;
        this.template1 = _.template(tpl.get("findPassword_1"));
        this.template2 = _.template(tpl.get("findPassword_2"));
        this.template3 = _.template(tpl.get("findPassword_3"));
        this.fields = [
            new BaseField({
                name: "手机",
                fieldId: "registerCellInput",
                type: "text",
                mandatory: true,
                validatorFunction: Utilities.phoneValid,
                modelAttr: "phone",
                validatorContainer: $("#cellContainer")
            }),
            new BaseField({
                name: "密码",
                fieldId: "registerPasswordInput",
                type: "text",
                mandatory: true,
                validatorFunction: Utilities.passValid,
                modelAttr: "password",
                validatorContainer: $("#passContainer")
            }),
            new BaseField({
                name: "确认密码",
                fieldId: "registerPasswordConfirmInput",
                type: "text",
                mandatory: true,
                validatorFunction: Utilities.passValid,
                modelAttr: "confirmPassword",
                validatorContainer: $("#confirmContainer")
            }),
            new BaseField({
                name: "验证码",
                fieldId: "authCode",
                type: "text",
                mandatory: true,
                modelAttr: "authCode",
                validatorContainer: $("#authContainer")
            }),
        ];
        this.render(this.state);
    },
    render: function (state) {
        var that = this;
        this.state = state;
        this.$el.empty();
        if (state === 2) {
            this.$el.append(this.template2);
        } else {
            this.$el.append(this.template1);
        }
        this.bindEvents(this.state);
    },
    bindEvents: function (state) {
        var that = this;
         if (state === 2) {

        } else {
            $("#registerCellInput").on("blur", function (e) {
                if ($("#forgotWrong").length) {
                    $("#forgotWrong").remove();
                }
                phone = $("#registerCellInput").val();
                if (!phone || phone.length  !== 11 || isNaN(parseInt(phone, 10)))  {
                    $(this).after("<div id='forgotWrong' class='wrong'><p>手机格式不正确，请输入正确的手机号</p></div>");
                    that.phone = "";
                } else {
                    that.phone = $(this).val();
                }
            });
            $("#getSms").on("click", function() {
                if (that.phoneValid(that.model.phone).valid) {
                    app.forgetPassword(that.phone, {
                        success: function () {
                            $("#smsInfo").html("验证码已经发送至您的手机，若2分钟没有收到短信，请确认手机号填写正确并重试").prop("disabled", true);

                            setTimeout(function(){
                                $("#smsInfo").prop("disabled", false);
                            }, 120000);
                        },
                        error: function () {
                            $("#smsInfo").html("验证码发送失败，请检查网络正常并重试");
                        },
                    });
                }
            });
            BaseFormView.prototype.bindEvents.call(this);
        }
    },
    submitAction: function () {
        app.userManager.recoverPassword(this.model, {
            success: this.successCallback,
            error: this.changeError
        });

    },
    successCallback: function () {
        $("#confirmChange").val("修改成功");       
        
    },
    changeError: function (data) {
        $("#confirmChange").val("确定");
        if (data.status == 401){
            $("#forgot_container").children('.wrong').remove();
            $("#forgot_container").append("<div class='wrong'><p>更改密码请求无效或已过期</p></div>");
        }
        else if (data.status == 400){
            $("#forgot_container").children('.wrong').remove();
            $("#forgot_container").append("<div class='wrong'><p>更改密码请求无效</p></div>");
        }
        else{
            $("#forgot_container").children('.wrong').remove();
            $("#forgot_container").append("<div class='wrong'><p>请稍后再试</p></div>");
        }
        
    },
    close: function () {
        if (!this.isClosed) {
            this.isClosed = true;
            this.$el.empty();
        }
    }

});
