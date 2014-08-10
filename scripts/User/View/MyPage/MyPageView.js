var MyPageView = Backbone.View.extend({
    el: "#content",
    initialize: function (params) {
        _.bindAll(this, 'render', 'renderError', 'createChildView','bindEvents', 'close');
        app.viewRegistration.register(this);
        // $("#viewStyle").attr("href", "style/css/mypage.css");
        this.isClosed = false;
        this.query = params.query || "dashboard";
        this.template = _.template(tpl.get('mypage_base'));
        if (params.reference) {
            this.reference = params.reference;
        }
        app.userManager.fetchUser({
            "success": this.render,
            "error": this.renderError
        });

    },

    render: function (user) {
        if (!this.isClosed) {
            var that = this;
            this.user = user;
            this.$el.append(this.template(this.user._toJSON()));
            $("#mypage_content").css("border", "1px solid #ccc");
            this.createChildView();
            this.bindEvents();
        }
    },

    renderError: function (data) {
        Info.displayErrorPage("content", data.responseJSON);
    },
    createChildView: function () {
        switch (this.query) {
        case "bookingDetail":
            if (!this.reference) {
                throw "invalid access";
            }
            document.title="我的爱上课 > 订单详情 | 爱上课";
            this.activeChildView = new BookingDetailView({bookingId: this.reference});
            break;
        case "setting":
            $("#editInfo").addClass("active");
            document.title="个人设置 | 爱上课";
            this.activeChildView = new MyPageSettingView();
            break;
        case "password":
            $("#editPass").addClass("active");
            document.title="更改密码 | 爱上课";
            this.activeChildView = new MyPagePasswordView();
            break;
        case "coupon":
            $("#couponAccount").addClass("active");
            document.title="我的爱上课 > 我的优惠券 | 爱上课";
            this.activeChildView = new MyPageCouponView();
            break;
        case "credit":
            $("#creditAccount").addClass("active");
            document.title="我的爱上课 > 我的积分 | 爱上课";
            this.activeChildView = new MyPageCreditView();
            break;
        case "dashboard":
            $("#mypage_content").css("border", "none");
            document.title="我的爱上课 | 爱上课";
            this.activeChildView = new MyPageDashboardView({user:this.user});
            break;
        case "booking":
            $("#bookingManage").addClass("active");
            document.title="我的爱上课 > 我的订单 | 爱上课";
            this.activeChildView = new MyPageBookingView();
            break;
        case "share":
            $("#share").addClass("active");
            document.title="我的爱上课 > 分享优惠 | 爱上课";
            this.activeChildView = new MyPageShareView();
            break;
        default:
            break;
        }
    },

    bindEvents: function () {
        var that = this;
        //侧边栏顶部 我的爱上课
        $("#mypage_sidebar").children(".mypage_sidebar_title").on("click", function () {
            if (that.query !== "dashboard") {
                $("#mypage_sidebar").find(".active").removeClass("active");
                that.query = "dashboard";
                app.navigate("mypage/dashboard");
                that.createChildView();
            }
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
