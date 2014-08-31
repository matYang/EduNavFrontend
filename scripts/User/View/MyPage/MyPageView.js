var MyPageView = Backbone.View.extend({
    el: "#content",
    initialize: function (params) {
        _.bindAll(this, 'render', 'renderError', 'createChildView', 'bindEvents', 'close');
        app.viewRegistration.register(this);
        // $("#viewStyle").attr("href", "style/css/mypage.css");
        this.isClosed = false;

        this.query = params.query || "dashboard";
        this.template = _.template(tpl.get('mypage_base'));
        if (params.reference) {
            this.reference = params.reference;
        }

        //这里重新拉取一次用户信息 也可直接使用sessionManager中的model
//        app.userManager.fetchUser({
//            "success": this.render,
//            "error": this.renderError
//        });
        this.user = app.sessionManager.getSessionModel();
        this.render();

    },

    render: function (user) {
        if (!this.isClosed) {
            this.user = user;
            this.$el.append(this.template(this.user._toJSON()));

            var time, date = new Date();
            var hour = date.getHours();
            if (hour > 4 && hour < 12) {
                time = "早上";
            } else if (hour >= 12 && hour < 18) {
                time = "下午";
            } else {
                time = "晚上";
            }
            $('#mypage_greeting').html(time);
            this.createChildView();
            this.bindEvents();
        }
    },

    renderError: function (data) {
        Info.displayErrorPage("content", data.message);
    },
    createChildView: function () {
//        $(document).scrollTop(0);
//        $.smoothScroll();//smooth scroll to top
        switch (this.query) {
            case "bookingDetail":
                if (!this.reference) {
                    throw "invalid access";
                }
                document.title = "我的爱上课 > 订单详情 | 爱上课";
                this.activeChildView = new BookingDetailView({bookingId: this.reference});
                break;
            case "setting":
                $("#editInfo").addClass("active");
                document.title = "个人设置 | 爱上课";
                this.activeChildView = new MyPageSettingView({user: this.user});
                break;
            case "password":
                $("#editPass").addClass("active");
                document.title = "更改密码 | 爱上课";
                this.activeChildView = new MyPagePasswordView({user: this.user});
                break;
            case "cash":
                $("#cashAccount").addClass("active");
                document.title = "我的爱上课 > 我的现金账户 | 爱上课";
                this.activeChildView = new MyPageCashView({user: this.user});
                break;
            case "coupon":
                $("#couponAccount").addClass("active");
                document.title = "我的爱上课 > 我的优惠券 | 爱上课";
                this.activeChildView = new MyPageCouponView({user: this.user});
                break;
            case "credit":
                $("#creditAccount").addClass("active");
                document.title = "我的爱上课 > 我的积分 | 爱上课";
                this.activeChildView = new MyPageCreditView({user: this.user});
                break;
            case "dashboard":
                document.title = "我的爱上课 | 爱上课";
                this.activeChildView = new MyPageDashboardView({user: this.user});
                break;
            case "booking":
                $("#bookingManage").addClass("active");
                document.title = "我的爱上课 > 我的订单 | 爱上课";
                this.activeChildView = new MyPageBookingView({user: this.user});
                break;
            case "share":
                $("#share").addClass("active");
                document.title = "我的爱上课 > 分享优惠 | 爱上课";
                this.activeChildView = new MyPageShareView({user: this.user});
                break;
            default:
                break;
        }
    },

    bindEvents: function () {
        var that = this;
        //侧边栏顶部 我的爱上课 以及 导航链接 我的爱上课
        var event_mypage = function () {
            if (that.query !== "dashboard") {
                $("#mypage_sidebar").find(".active").removeClass("active");
                that.query = "dashboard";
                app.navigate("mypage/dashboard");
                that.createChildView();
            }
        };
        $("#mypage_sidebar").children(".mypage_sidebar_title").on("click", event_mypage);
        $("#mypage_content").on("click", ".js_toDashboard", event_mypage);
        $("#mypage_content").on("click", ".js_toPay", function (e) {
                var id = $(e.target).data('id');
                app.navigate("mypage/booking/" + id + "/pay", true);
            });


        //订单管理>课程订单
        $("#bookingManage").on("click", function () {
            if (that.query !== "booking") {
                $("#mypage_sidebar").find(".active").removeClass("active");
                that.query = "booking";
                app.navigate("mypage/booking");
                that.createChildView();
            }
        });
        //账户管理>现金账户
        $("#cashAccount").on("click", function () {
            if (that.query !== "cash") {
                $("#mypage_sidebar").find(".active").removeClass("active");
                that.query = "cash";
                app.navigate("mypage/cash");
                that.createChildView();
            }
        });

        //账户管理>返现券
        $("#couponAccount").on("click", function () {
            if (that.query !== "coupon") {
                $("#mypage_sidebar").find(".active").removeClass("active");
                that.query = "coupon";
                app.navigate("mypage/coupon");
                that.createChildView();
            }
        });
        //账户管理>积分
        $("#creditAccount").on("click", function () {
            if (that.query !== "credit") {
                $("#mypage_sidebar").find(".active").removeClass("active");
                that.query = "credit";
                app.navigate("mypage/credit");
                that.createChildView();
            }
        });

        //个人设置>密码修改
        $("#editPass").on("click", function () {
            if (that.query !== "password") {
                $("#mypage_sidebar").find(".active").removeClass("active");
                that.query = "password";
                app.navigate("mypage/password");
                that.createChildView();
            }
        });
        //个人设置>个人资料
        $("#editInfo").on("click", function () {
            if (that.query !== "setting") {
                $("#mypage_sidebar").find(".active").removeClass("active");
                that.query = "setting";
                app.navigate("mypage/setting");
                that.createChildView();
            }
        });
        //个人设置>邀请有礼
        $("#share").on("click", function () {
            if (that.query !== "share") {
                $("#mypage_sidebar").find(".active").removeClass("active");
                that.query = "share";
                app.navigate("mypage/share");
                that.createChildView();
            }
        });

    },
    close: function () {
        if (!this.isClosed) {
            if (this.activeChildView) {
                this.activeChildView.close();
            }
            $("#bookingManage").off();
            $("#couponAccount").off();
            $("#editPass").off();
            $("#editInfo").off();
            this.$el.empty();
            this.isClosed = true;
        }
    }
});
