var TopBarView = Backbone.View.extend({

    el: $('#topBar'),

    events: {

    },

    initialize: function () {
        _.bindAll(this, 'render', 'reRender', 'bindEvents', 'renderNotificationDropdown', 'renderLetterDropdown', 'renderFavoriteDropdown', 'bindDropdownEvents', 'close', 'login', 'logout', '_clearAll');
        app.viewRegistration.register("topBar", this, true);
        this.isClosed = false;

        this.loggedInTemplate = _.template(tpl.get('topBar-loggedIn'));
        this.notLoggedInTemplate = _.template(tpl.get('topBar-notLoggedIn'));
        this.dropdown_notifiationTemplate = _.template(tpl.get('notificationDropdown'));
        this.dropdown_letterTemplate = _.template(tpl.get('letterDropdown'));
        this.dropdown_favoriteTemplate = _.template(tpl.get('favoriteDropdown'));

        this.sessionUser = app.sessionManager.getSessionUser();

        this.render();
    },

    render: function () {
        this.listenTo(this.sessionUser, 'change:userId', this.reRender);
        this.$ndropdown = $('#notifications').find("ul");
        this.$ldropdown = $('#letters').find("ul");
        this.$fdropdown = $('#favorites').find("ul");
        this.$pdropdown = $('#profileDropdown>dd');
        if (app.sessionManager.hasSession()) {
            $(this.el).append(this.loggedInTemplate(this.sessionUser._toJSON()));
            this.bindEvents();

            //dropdown specific data binding
            this.notifications = app.sessionManager.getCurUserNotifications();
            this.listenTo(this.notifications, 'reset', this.renderNotificationDropdown);
            this.letters = app.sessionManager.getCurUserLetters();
            this.listenTo(this.letters, 'reset', this.renderLetterDropdown);
            this.favorites = app.sessionManager.getCurUserFavorites();
            this.listenTo(this.favorites, 'reset', this.renderFavoriteDropdown);

            this.renderNotificationDropdown();
            this.renderLetterDropdown();
            this.renderFavoriteDropdown();
            this.bindDropdownEvents();
        } else {
            $(this.el).append(this.notLoggedInTemplate);
            this.bindEvents();
        }

    },

    reRender: function () {
        this._clearAll();
        this.render();
    },

    renderNotificationDropdown: function (notifications) {
        var i = 0, htmlContext = '';
        if ( this.notifications.length === 0 ) {
            return;
        }
        for ( i = 0; i < this.notifications.length; i++) {
            htmlContext += this.dropdown_notifiationTemplate(this.notifications.at(i).toDropdownJSON());
        }
        this.$ndropdown.empty().append(htmlContext);
    },

    renderLetterDropdown: function () {
        var i = 0, htmlContext = '';
        if ( this.letters.length === 0 ) {
            return;
        }
        for ( i = 0; i < this.letters.length; i++) {
            htmlContext += this.dropdown_letterTemplate(this.letters.at(i).toDropdownJSON());
        }

        this.$ldropdown.empty().append(htmlContext);
    },

    renderFavoriteDropdown: function () {
        var i = 0, htmlContext = '';
        if ( this.favorites.length === 0 ) {
            return;
        }
        for ( i = 0; i < this.favorites.length; i++) {
            htmlContext += this.dropdown_favoriteTemplate(this.favorites.at(i).toDropdownJSON());
        }

        this.$fdropdown.empty().append(htmlContext);
    },

    bindDropdownEvents: function () {
        var self = this;
        this.$ndropdown.on('click', 'li', function (e) {
            e.preventDefault();
            var n_id = parseInt($(e.target).attr("data-notificationId"), 10);
            var n_model = self.notifications.get(n_id);
            var n_evt = n_model.get('notificationEvent');

            //async, don't care about result
            app.notificationManager.checkNotification(n_id);

            if (n_evt === Constants.notificationEvent.watched) {
                app.navigate("personal/" + n_model.get('initUserId'), true);
            }
            //transaction related
            else if (n_evt < Constants.notificationEvent.watched) {
                app.navigate("message/" + n_model.get('messageId'), true);
            }
        });
        this.$ldropdown.on('click', 'li', function (e) {
            var u_id = $(e.target).attr("data-userId");
            app.letterView.switchContact(u_id);
        });
        this.$fdropdown.on('click', 'li', function (e) {
            var u_id = $(e.target).attr("data-userId");
            app.navigate("personal/" + u_id, true);
        });
        $('#notifications').find(".more").on("click", function (e) {
            e.preventDefault();
            app.navigate("personal/" + self.sessionUser.id + "/history", true);
        });
        $('#letters').find(".more").on("click", function (e) {
            e.preventDefault();
            $("#chat_right").attr("style","margin-top: 0px;");
        });
        $('#favorites').find(".more").on("click", function (e) {
            e.preventDefault();
            app.navigate("personal/" + self.sessionUser.id + "/social", true);
        });

    },
    bindEvents: function () {
        var self = this;
        var username, password;

        /*  navigation events  */
        //main nav
        
        this.$passwordInput = $("#login_password");
        this.$usernameInput = $("#login_username");
        this.$nmain = $('#navigate_main').on('click', function () {
            app.navigate("main/" + self.sessionUser.get('searchRepresentation'), true);
        });
        this.$logo = $('#logo').on('click', function () {
            app.navigate("front", true);
        });
        if (!app.sessionManager.hasSession()) {
            this.$lb = $("#loginBox");
            this.$lbt = $("#loginBoxToggler").on("click", function (e) {
                self.$lb.toggle();
                self.$usernameInput.trigger("focus");
            });
            $('#signup_button').on('click', function () {
                app.navigate("/register", {trigger: true, replace: true});
            });
            this.$wrong = $("#credentialWrong");
            this.$usernameInput.on("click", function (e){
                self.$wrong.hide();
            });
            this.$passwordInput.on("focus", function (e){
                self.$wrong.hide();
            });
            this.$passwordInput.add(this.$usernameInput).on("keydown", function (e) {
                if (e.which == 13) {
                    self.login();
                }
            });
            $("#forget_password").on("click", function (e) {
                e.preventDefault();
                app.navigate("lost", true);
                self.$lb.toggle();
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
            this.$npersonal = $('#navigate_personal').on('click', function () {
                app.navigate("personal/" + app.sessionManager.getUserId(), true);
            });
            this.$nfeedback = $('#navigate_feedBack').on('click', function () {
                app.navigate("post", true);
            });
            this.$nusersearch = $("#navigate_usersearch").on('click', function () {
                app.navigate("finduser", true);
            });
            //personal nav
            // this.$ndropdown.find('.dropdownTitleCheckAll').on('click', function () {
            //     app.navigate("personal/" + app.sessionManager.getUserId() + "/history", true);
            // });
            // this.$ldropdown.find('.dropdownTitleCheckAll').on('click', function () {
            //     app.navigate("letter", true);
            // });
            // this.$fdropdown.find('.dropdownTitleCheckAll').on('click', function () {
            //     app.navigate("personal/" + app.sessionManager.getUserId() + "/social", true);
            // });
            $('#logout').on('click', function (e) {
                e.preventDefault();
                self.logout();
            });
            $("#topBar-avatar").add("#topBar-myPage").on('click', function (e) {
                e.preventDefault();
                app.navigate("personal/" + self.sessionUser.id + "/message", true);
            });
            $("#topBar-utility").on('click', function (e) {
                e.preventDefault();
                app.navigate("personal/" + self.sessionUser.id + "/utility", true);
            });
        }
        
    },
    login: function () {
        var username = this.$usernameInput.val(), password = this.$passwordInput.val(), self = this;
        if (username !== "" && password !== "") {
            $('#login_button').val("登录中...").prop("disabled", true);
            app.sessionManager.login(username, password, {
                success: function (response) {
                    Constants.dLog("server login response: ");
                    Constants.dLog(response);
                    //fetching session, with async flag to true
                    app.sessionManager.fetchSession(true, {
                        success: function () {
                            app.userManager.sessionUser = app.sessionManager.getSessionUser();
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
                Constants.dLog("server logout response: ");
                Constants.dLog(response);

                app.sessionManager.fetchSession(true, {
                    success: function () {
                        app.userManager.sessionUser = app.sessionManager.getSessionUser();
                        app.letterView.close();
                        location.reload();
                    },
                    error: function () {
                        Info.warn("Session fetch failed");
                        app.userManager.sessionUser = app.sessionManager.getSessionUser();
                    }
                });
            },

            error: function (status) {
                Info.displayNotice("登出失败，请稍后再试");
            }
        });
    },

    _clearAll: function () {
        if (app.sessionManager.hasSession()) {
            this.$passwordInput.off();
            this.$usernameInput.off();
            $('#signup_button').off();
            $('#login_button').off();
            this.$lbt.off();
            $("#remember_password").off();
        }
        else{
            this.$npersonal.off();
            this.$ndropdown.off();
            this.$ldropdown.off();
            this.$fdropdown.off();
        }
        this.$logo.off();
        this.$nmain.off();
        this.stopListening();
        this.unbind();
        $(this.el).empty();
    },

    close: function () {
        if (!this.isClosed) {
            this._clearAll();

            this.isClosed = true;
        }
    }
});