var AdminLoginView = Backbone.View.extend({
    el:"#content",
    initialize: function () {
        this.isClosed = false;
        _.bindAll(this, "render", "bindEvents", "login", "close");
        app.viewRegistration.register(this);
        this.loginTemplate = _.template(tpl.get('adminLogin'));
        this.render();
        this.bindEvents();
    },
    render: function () {
        $("body").attr("class","login");
        this.$el.attr("class", "login_box").append(this.loginTemplate);
        this.$usernameInput = $("#login_username");
        this.$passwordInput = $("#login_password");
    },
    bindEvents: function (){

        var that = this;
        $('#login_button').on("click", function() {
            that.login();
        });
        $('#login_password,#login_username').on("keyup", function (e) {
            if (e.which === 13) {
                that.login();
            }
        });
    },
    login: function () {
        var username = this.$usernameInput.val(), password = this.$passwordInput.val(), self = this;
        if (username !== "" && password !== "") {
            $('#login_button').val("登录中...").prop("disabled", true);
            app.sessionManager.login(username, password, {
                success: function (response) {
                    Info.log("server login response: ");
                    Info.log(response);
                    //fetching session, with async flag to true
                    app.sessionManager.fetchSession(true, {
                        success: function () {
                            if (that.loginView) {
                                that.loginView.close();
                            }
                            that.baseView = new AdminBaseView();
                            app.navigate("manage", true);
                        },
                        error: function () {
                            
                        }
                    });
                },
                error: function (response) {
                    $('#login_button').val("登 录").prop("disabled", false);
                    self.$passwordInput.val("");
                }
            });
        } else if (username) {
            $('#login_password').focus();
        } else {
            
        }
    },
    close: function () {
        if (!this.isClosed){
            $("body").removeClass("login");
            this.$el.attr("class", "").empty();
            this.isClosed = false;
        }
    }
});
