var FindPasswordView = Backbone.View.extend({
    el: "#content",
    initialize: function (params) {
        _.bindAll(this, 'render', 'validatePassword', 'submitNewPassword', 'close');
        app.viewRegistration.register("findPassword", this, true);
        this.isClosed = false;
        this.template1 = _.template(tpl.get("findPassword_1"));
        this.template2 = _.template(tpl.get("findPassword_2"));
        this.template3 = _.template(tpl.get("findPassword_3"));
        if (params.token) {
            this.token = params.token;
            this.state = 3;
        } else {
            this.state = 1;
        }
        this.render(this.state);
    },
    render: function (state) {
        var that = this;
        this.state = state;
        this.$el.empty();
        if (state === 3) {
            this.$el.append(this.template3);
        } else if (state === 2) {
            this.$el.append(this.template2);
            $("#email_value").html(this.email);
            $("#go_to_email").on("click", function (e) {
                e.preventDefault();
                window.open("http://"+that.email.split("@")[1]);
            });
        } else {
            this.re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            this.$el.append(this.template1);
        }
        this.bindEvents(this.state);
    },
    bindEvents: function (state) {
        var that = this,
            email;
        if (state === 3) {
            this.$password = $("#newPassword");
            this.$confirm = $("#confirmPassword");
            this.valid = {password: false};
            this.$password.add(this.$confirm).on("blur", function (e) {
                that.validatePassword();
            });
            $("#confirmChange").on("click", this.submitNewPassword );
            $('#newPassword, #confirmPassword').on("keyup", this.submitNewPassword);

        } else if (state === 2) {
            $("#go_to_email").on("click", function (e) {
                e.preventDefault();
                window.open("http://"+that.email.split("@")[1]);
            });
        } else {
            $("#emailAddress").on("blur", function (e) {
                if ($("#forgotWrong").length) {
                    $("#forgotWrong").remove();
                }
                email = $("#emailAddress").val();
                if (!email || !that.re.test(email)) {
                    $("#forgot_container .btns").before("<div id='forgotWrong' class='wrong'><p>邮箱格式不正确，请输入正确的邮箱</p></div>");
                    that.email = "";
                } else {
                    that.email = $(this).val();
                }
            }).on("keyup", function (e) {
                if (e.which === 13) {
                    $(this).trigger("blur");
                    $("#resetButton").trigger("click");
                }
            });
            $("#resetButton").on("click", function() {
                email = $("#emailAddress").val();
                if (email && that.re.test(email)) {
                    that.email = $("#emailAddress").val();
                    app.userManager.forgetPassword(that.email, {
                        "success": that.render,
                        "error": that.forgetError
                    });
                    $("#resetButton").val("重置中...");
                }
            });
        }
    },
    submitNewPassword: function (e) {
        if ( e.which!== 1 && e.which !==13 ) {
            return;
        }
        this.validatePassword();
        if (this.valid.password){
            app.userManager.findPassword(this.token, this.$password.val(), this.$confirm.val(), {
                "success": this.changeSuccess,
                "error": this.changeError
            });
            $("#confirmChange").val("更改中...");
        } 
    },
    validatePassword: function(){
        var p = this.$password.val();
        $("#vpass").remove();
        $("#vpass2").remove();
        this.$password.parent().removeClass("wrong");
        this.$confirm.parent().removeClass("wrong");
        if (p && p.length >= 6 && this.$password.val() === this.$confirm.val()) {
            this.$password.after('<span id="vpass" class="right"></span>');
            this.$confirm.after('<span id="vpass2" class="right"></span>');
            this.valid.password = true;
        } else {
            if (!p || p.length < 6) {
                this.$password.parent().addClass("wrong").append('<p id="vpass" title="密码长度至少为6位">密码长度至少为6位</p>');
            } else {
                if (this.$confirm.val().length !== 0){
                    this.$confirm.parent().addClass("wrong").append('<p id="vpass2" title="两次输入密码不匹配">两次输入密码不匹配</p>');
                }
            }
            this.valid.password = false;
        }
    },
    forgetError: function (response) {
        if (!$("#forgotWrong").length) {
            $("#forgot_container").append("<div id='forgotWrong' class='wrong'><p>"+response.responseText+"</p></div>");
        }
        $("#resetButton").val("重置密码");
    },
    changeSuccess: function () {
        $("#confirmChange").val("修改成功");
        setTimeout(function(){app.navigate('front', {trigger: true})},5000 );
        
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
