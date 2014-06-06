var FrontPageView = Backbone.View.extend({

    el: '#content',
    displayIndex: 0,
    initialize: function () {
        _.bindAll(this, 'render', 'bindEvents', 'close');
        app.viewRegistration.register(this);
        this.isClosed = false;
        this.temp = {};
        this.bottomRecentId = 0;
        this.template = _.template(tpl.get('front'));

        this.user = app.sessionManager.sessionModel;

        this.searchRepresentation = app.storage.getSearchRepresentationCache();
        this.render();
        //app.sessionManager.fetchSession();
        this.bindEvents();

    },

    render: function () {
        this.$el.append(this.template)
    },

    bindEvents: function () {
        var self = this;
        $("#front_howItWorks").on("click", function (e) {
            e.preventDefault();
            app.navigate("howitworks", true);
        });
        //this.bindRecentsEvents();
    },

    close: function () {
        if (!this.isClosed) {
            this.$el.empty();
            this.isClosed = true;
        }
    }
});
