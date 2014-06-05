var MyPageView = Backbone.View.extend({
    el: "#content",
    initialize: function (params) {
        _.bindAll(this, 'render', 'renderError', 'createChildView','bindEvents', 'close');
        app.viewRegistration.register("mypage", this, true);
        this.isClosed = false;
        this.query = params.query || "dashboard";
        this.template = _.template(tpl.get('mypage_base'));
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
        debugger;
        switch (this.query) {
            case "dashboard":
            default:
                this.activeChildView = new MyPageDashboardView();        
                break;
        }
        this.activeChildView = new PersonalUtilityView ({
            'query': this.query
        });
    },  

    bindEvents: function () {
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
