var TopBarView = Backbone.View.extend({

    el: '#topBar',
    initialize: function () {
        _.bindAll(this, 'render', 'reRender', 'bindEvents', 'close', 'login', 'logout');
        app.viewRegistration.register(this);
        this.isClosed = false;

        this.loggedInTemplate = _.template(tpl.get('topBar-loggedIn'));
        this.notLoggedInTemplate = _.template(tpl.get('topBar-notLoggedIn'));

        this.sessionUser = app.sessionManager.sessionModel;

        this.render();
    },

    render: function () {
        this.listenTo(this.sessionUser, 'change:userId', this.reRender);
        this.$pdropdown = $('#profileDropdown>dd');
        if (app.sessionManager.hasSession()) {
            this.$el.append(this.loggedInTemplate(this.sessionUser._toJSON()));
            this.bindEvents();
        } else {
            this.$el.append(this.notLoggedInTemplate);
            this.bindEvents();
        }

    },

    reRender: function () {
        this.$el.empty();
        this.render();
    },

    bindEvents: function () {
        var self = this;
        var username, password;

        /*  navigation events  */
        //main nav
        
        this.$passwordInput = $("#login_password");
        this.$usernameInput = $("#login_username");
        $('#navigate_search').on('click', function () {
            app.navigate("search", true);
        });
        $('#navigate_compare').on('click', function () {
            app.navigate("compare", true);
        });
        $('#logo').on('click', function () {
            app.navigate("front", true);
        });
        if (!app.sessionManager.hasSession()) {
            $("#loginBoxToggler").on("click", function (e) {
                self.$lb.toggle();
                self.$usernameInput.trigger("focus");
            });
            $('#signup_button').on('click', function (e) {
                e.preventDefault();
                app.navigate("/register", {trigger: true, replace: true});
            });
            this.$usernameInput.on("click", function (e){
                $("#credentialWrong").hide();
            });
            this.$passwordInput.on("focus", function (e){
                $("#credentialWrong").hide();
            });
            this.$passwordInput.add(this.$usernameInput).on("keydown", function (e) {
                if (e.which == 13) {
                    self.login();
                }
            });
            $("#forget_password").on("click", function (e) {
                e.preventDefault();
                app.navigate("lost", true);
                self.$("#loginBox").toggle();
            });
            this.remember = $("#remember_password").on("click", function (e) {
                if ($(this).hasClass("checked")){
                    $(this).removeClass("checked");
                } else {
                    $(this).addClass("checked");
                }
            });
            $('#login_button').on('click', function () {
                self.login();
            });
            $(document).click(function (e)
            {
                var container = $("#loginBox");
                if (!container.is(e.target) // if the target of the click isn't the container...
                    && container.has(e.target).length === 0 && e.target.id !== "loginBoxToggler") // ... nor a descendant of the container
                {
                    container.hide();
                }
                e.stopPropagation();
            });
        } else {
            $('#navigate_personal').on('click', function () {
                app.navigate("mypage", true);
            });
            $('#logout').on('click', function (e) {
                e.preventDefault();
                self.logout();
            });
            $("#topBar-avatar").add("#topBar-myPage").on('click', function (e) {
                e.preventDefault();
                app.navigate("mypage", true);
            });
            $("#topBar-utility").on('click', function (e) {
                e.preventDefault();
                app.navigate("mypage/setting", true);
            });
        }
        
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
                            app.userManager.sessionUser = app.sessionManager.sessionModel;
                            app.letterView = new LetterView({
                                "toUserId": app.storage.getLastContact()
                            });
                            $("#chat").show();
                        },
                        error: function () {
                            Info.displayNotice("登录失败，请稍后再试");
                        }
                    });
                },
                error: function (response) {
                    self.$wrong.show().html(response.responseText || "服务器好像睡着了，请稍后再试");
                    $('#login_button').val("登 录").prop("disabled", false);
                    self.$passwordInput.val("");
                }
            });
        } else {
            //请输入密码
            self.$wrong.show().html("输入有误，请重新输入");
        }
    },
    logout: function () {
        app.sessionManager.logout({
            success: function (response) {
                Info.log("server logout response: ");
                Info.log(response);

                app.sessionManager.fetchSession(true, {
                    success: function () {
                        app.userManager.sessionUser = app.sessionManager.sessionModel;
                        app.letterView.close();
                        location.reload();
                    },
                    error: function () {
                        Info.warn("Session fetch failed");
                        app.userManager.sessionUser = app.sessionManager.sessionModel;
                    }
                });
            },

            error: function (status) {
                Info.displayNotice("登出失败，请稍后再试");
            }
        });
    },

    close: function () {
        if (!this.isClosed) {
            this.stopListening();
            this.$el.empty();
            this.isClosed = true;
        }
    }
});