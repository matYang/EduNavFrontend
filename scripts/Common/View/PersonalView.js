var PersonalView = Backbone.View.extend({
    el: "#content",
    initialize: function (params) {
        _.bindAll(this, 'render', 'renderError', 'switchChildView', 'createChildView','bindEvents', 'close');
        app.viewRegistration.register("personal", this, true);
        this.isClosed = false;
        this.query = params.query || "basic";
        this.template = _.template(tpl.get('personal'));
        
        this.sessionUser = app.sessionManager.getSessionUser();
        app.userManager.fetchUser(this.sessionUser.id, {
            "success": this.render,
            "error": this.renderError
        });

    },

    render: function (user) {
        var that = this;
        this.user = user;
        var userJson = this.user._toJSON();
        this.$el.append(this.template(userJson));

        $("#popup").attr("class", "pop message_reservation");
        this.render();
        this.createUtilityView();
        this.bindEvents();
    },

    renderError: function () {
        Info.displayErrorPage("content", "个人页面加载失败，请稍后再试");
    },
    createUtilityView: function () {
        var create = true;
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
