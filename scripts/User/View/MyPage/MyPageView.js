var MyPageView = Backbone.View.extend({
    el: "#content",
    initialize: function (params) {
        _.bindAll(this, 'render', 'renderError', 'createChildView','bindEvents', 'close');
        app.viewRegistration.register(this);
        $("#viewStyle").attr("href", "style/css/mypage.css");
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
        var that = this;
        this.user = user;
        var userJson = this.user._toJSON();
        this.$el.append(this.template(userJson));
        this.createChildView();
        this.bindEvents();
    },

    renderError: function () {
        Info.displayErrorPage("content", "个人页面加载失败，请稍后再试");
    },
    createChildView: function () {
        var create = true;
        switch (this.query) {
            case "bookingDetail":
                if (!this.reference) {
                    throw "invalid access";
                }
                this.activeChildView = new BookingDetailView({reference:this.reference});
                break;
            case "booking": 
                this.activeChildView = new MyPageBookingView();
                break;
            case "setting" :
                this.activeChildView = new MyPageSettingView();
                break
            case "password" :
                this.activeChildView = new MyPagePasswordView();
                break;
            case "dashboard":
            default:
                this.activeChildView = new MyPageDashboardView();        
                break;
        }
    },  

    bindEvents: function () {
        var that = this;
        $("#bookingManage").on("click", function () {
            if (that.query !== "booking") {
                that.query = "booking";
                app.navigate("mypage/booking", true);
                that.createChildView();
            }
        });
    },
    close: function () {
        if (!this.isClosed) {
            if (this.activeChildView) {
                this.activeChildView.close();
            }   
            this.$el.empty();
            this.isClosed = true;
        }
    }
});
