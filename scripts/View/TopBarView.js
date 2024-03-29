var TopBarView = Backbone.View.extend({

    el: '#topBar',
    initialize: function () {
        _.bindAll(this, 'render', 'bindEvents', 'close', 'login', 'logout', 'activeNavigator', 'clearNavigator');
        app.viewRegistration.register(this);
        this.isClosed = false;

        this.loggedInTemplate = _.template(tpl.get('topBar-loggedIn'));
        this.notLoggedInTemplate = _.template(tpl.get('topBar-notLoggedIn'));

        this.render();
        // this.listenTo(this.sessionUser, 'change:userId', this.render);
    },

    render: function () {

        var time, date = new Date();
        var hour = date.getHours();
        this.$pdropdown = $('#profileDropdown>dd');
        if (app.sessionManager.hasSession()) {
            this.$el.html(this.loggedInTemplate(app.sessionManager.getSessionModel()._toJSON()));
            if (hour > 4 && hour < 12) {
                time = "早上";
            } else if (hour >= 12 && hour < 18) {
                time = "下午";
            } else {
                time = "晚上";
            }
            $("#greeting").html(time);
        } else {
            this.$el.html(this.notLoggedInTemplate);
            $("#user_info_pic").hide();
            $("#topbar_loginbox").hide();
            $("#credentialWrong").hide();
        }
        this.bindEvents();
    },

    bindEvents: function () {
        var self = this;
        this.$passwordInput = $("#login_password");
        this.$usernameInput = $("#login_username");
        this.$rememberInput = $("#login_remember");

        $('#navigate_search').on('click', function () {
            if (location.hash.indexOf("search") !== 1) {
                app.navigate("search", true);
                app.infoModal.hide();
            }
        });
        $('#navigate_tuan').on('click', function () {
            if (location.hash !== '#tuan') {
                app.navigate("tuan", true);
                app.infoModal.hide();
            }
        });
        $('#navigate_inst').on('click', function () {
            if (location.hash.indexOf("inst/search") !== 1) {
                app.navigate("inst/search", true);
                app.infoModal.hide();
            }
        });
        $('#navigate_compare').on('click', function () {
            //如果不在compare页面，则进行判断内的代码
            if (location.hash.indexOf("compare") !== 1) {
                if (!self.hasCourse()) {
                    Info.displayNotice("您还没有添加待比较的课程，先去查看感兴趣的课程吧");
                    /*                    app.navigate("search", {trigger: true, replace: true});*/
                } else {
                    app.infoModal.hide();
                    app.navigate("compare", true);
                }
            }
        });
        $('#logo,#navigate_home').on('click', function () {
            if (location.hash !== '') {
                app.navigate("", true);
                app.infoModal.hide();
            }
        });
        if (!app.sessionManager.hasSession()) {
            $('#signup_button').on('click', function (e) {
                e.preventDefault();
                app.navigate("register/ref=" + location.hash.substr(1, location.hash.length - 1), {trigger: true, replace: true});
                app.infoModal.hide();
            });
            $(document.body).on('click', '.js_loginDropToggle', function (e) {
                e.preventDefault();
                $("#topbar_loginbox").toggle();
                self.$usernameInput.trigger("focus");
                e.stopPropagation();//stop to document body event handler
            });
            this.$usernameInput.on("click", function (e) {
                $("#credentialWrong").hide();
            });
            this.$passwordInput.on("focus", function (e) {
                $("#credentialWrong").hide();
            });
            this.$passwordInput.add(this.$usernameInput).on("keydown", function (e) {
                if (e.which == 13) {
                    self.login();
                }
            });
            //是否记住我
            this.$rememberInput.on('click', function () {
                $(this).toggleClass('checked');
                console.log($(this).hasClass('checked'))
            });
            $("#forget_password").on("click", function (e) {
                e.preventDefault();
                app.navigate("lost", true);
                $("#topbar_loginbox").toggle();
            });

            $('#login_button').on('click', function () {
                self.login();
            });
            $(document.body).on("click", function (e) {
                var container = $("#topbar_loginbox");
                if (!container.is(e.target) // if the target of the click isn't the container...
                    && container.has(e.target).length === 0 && e.target.id !== "login_toggle") // ... nor a descendant of the container
                {
                    container.hide();
                }
//                e.stopPropagation();//it is really a bug
            });
        } else {
//            $('#user_info_pic').hover(function (e) {
//                e.preventDefault();
//                $("#user_info").toggle();
//                self.$('#user_info_pic').trigger("focus");
//                e.stopPropagation();//stop to document body event handler
//            });
            $('#logout').on('click', function (e) {
                e.preventDefault();
                self.logout();
            });
            $("#userPic").on('click', function (e) {
                e.preventDefault();
                app.navigate("mypage", true);
            });
            $("#personal").on('click', function (e) {
                e.preventDefault();
                app.navigate("mypage", true);
            });
            $("#management").on('click', function (e) {
                e.preventDefault();
                app.navigate("mypage/booking", true);
            });
            $("#userInfo").on('click', function (e) {
                e.preventDefault();
                app.navigate("mypage/setting", true);
            });
            $("#cash").on('click', function (e) {
                e.preventDefault();
                app.navigate("mypage/cash", true);
            });
        }
    },
    login: function () {
        //取值
        var username = this.$usernameInput.val(),
            password = this.$passwordInput.val(),
            remember = this.$rememberInput.hasClass('checked') ? 1 : 0,
            self = this;
        if (username !== "" && password !== "") {
            $('#login_button').val("登录中...").prop("disabled", true);
            //这里继续登录操作 登录成功后直接进行session的获取(为同步请求)
            //TODO JET:这一步操作和免注册预订的自动登录的代码可合并 应放至sessionManager中统一处理 包括logout 这里进行callback
            app.sessionManager.login(username, password, remember, {
                success: function () {
                    //重置sessionUser并且render topBar
                    app.userManager.sessionUser = app.sessionManager.sessionModel;
                    if (location.hash.indexOf("register") > -1) {
                        app.navigate("", true);
                    } else {
                        self.render();
                    }
                },
                error: function (data) {
                    $("#credentialWrong").show().html(data.message || "服务器好像睡着了，请稍后再试");
                    $('#login_button').val("登 录").prop("disabled", false);
                    self.$passwordInput.val("");
                }
            });
        } else {
            //请输入密码
            $("#credentialWrong").show().html("输入有误，请重新输入");
        }
    },
    logout: function () {
        var that = this;
        app.sessionManager.logout({
            success: function () {
                //重置sessionUser并且render topBar
                $(document.body).off('click', '.js_loginDropToggle');
                app.userManager.sessionUser = app.sessionManager.sessionModel;
                if (location.hash.indexOf("mypage") > -1) {
                    app.navigate("", true);
                }
                that.render();
                //todo 如果是处于创建订单页面(里面有登录通道) 也需要进行重新render 要注意dom上事件的重复绑定

            },

            error: function (status) {
                Info.displayNotice("登出失败，请稍后再试");
            }
        });
    },

    //激活当前页面的导航菜单
    activeNavigator: function (name) {
        $('.topBar-navigation li').removeClass('active');
        $('#navigate_' + name).addClass('active')
    },
    clearNavigator: function () {
        $('.topBar-navigation li').removeClass('active');
    },
    //判断有没有对比课程
    hasCourse: function () {
        //从localStorage中获取课程对比列表
        this.courseIdList = app.storage.getCoursesToCompare(); // array of items to compare
        return !!this.courseIdList.length;
    },

    close: function () {
        if (!this.isClosed) {
            this.$el.off();
            this.isClosed = true;
        }
    }
});