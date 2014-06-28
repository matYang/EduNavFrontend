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
            var userJson = this.user._toJSON();
            this.$el.append(this.template(userJson));
            $("#mypage_content").css("border", "1px solid #ccc");
            this.createChildView();
            this.bindEvents();
        }
    },

    renderError: function () {
        Info.displayErrorPage("content", "个人页面加载失败，请稍后再试");
    },
    createChildView: function () {
        switch (this.query) {
        case "bookingDetail":
            if (!this.reference) {
                throw "invalid access";
            }
            this.activeChildView = new BookingDetailView({reference: this.reference});
            break;
        case "setting":
            this.activeChildView = new MyPageSettingView();
            $("#editInfo").addClass("active");
            break;
        case "password":
            this.activeChildView = new MyPagePasswordView();
            $("#editPass").addClass("active");
            break;
        case "coupon":
            this.activeChildView = new MyPageCouponView();
            $("#couponAccount").addClass("active");
            break;
        case "credit":
            this.activeChildView = new MyPageCreditView();
            $("#creditAccount").addClass("active");
            break;
        case "dashboard":
            this.activeChildView = new MyPageDashboardView();
            $("#mypage_content").css("border", "none");
            break;
        case "booking":
            $("#bookingManage").addClass("active");
            this.activeChildView = new MyPageBookingView();
            break;
        default:
            break;
        }
    },

    bindEvents: function () {
        var that = this;
        $("#bookingManage").on("click", function () {
            if (that.query !== "booking") {
                $("#mypage_sidebar").find(".active").removeClass("active");
                that.query = "booking";
                app.navigate("mypage/booking");
                that.createChildView();
            }
        });
        $("#couponAccount").on("click", function () {
            if (that.query !== "coupon") {
                $("#mypage_sidebar").find(".active").removeClass("active");
                that.query = "coupon";
                app.navigate("mypage/coupon");
                that.createChildView();
            }
        });
        $("#editPass").on("click", function () {
            if (that.query !== "password") {
                $("#mypage_sidebar").find(".active").removeClass("active");
                that.query = "password";
                app.navigate("mypage/password");
                that.createChildView();
            }
        });
        $("#editInfo").on("click", function () {
            if (that.query !== "setting") {
                $("#mypage_sidebar").find(".active").removeClass("active");
                that.query = "setting";
                app.navigate("mypage/setting");
                that.createChildView();
            }
        });
        $("#creditAccount").on("click", function () {
            if (that.query !== "credit") {
                $("#mypage_sidebar").find(".active").removeClass("active");
                that.query = "credit";
                app.navigate("mypage/credit");
                that.createChildView();
            }
        });
        $("#mypage_sidebar").children(".mypage_sidebar_title").on("click", function () {
            if (that.query !== "dashboard") {
                $("#mypage_sidebar").find(".active").removeClass("active");
                that.query = "dashboard";
                app.navigate("mypage/dashboard");
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
