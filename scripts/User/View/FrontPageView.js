var FrontPageView = Backbone.View.extend({

    el: '#content',
    initialize: function () {
        _.bindAll(this, 'render', 'bindEvents', 'close');
        app.viewRegistration.register(this);
        this.isClosed = false;
        this.template = _.template(tpl.get('front'));
        this.lvl2Template = _.template("");
        this.user = app.sessionManager.sessionModel;

        this.searchRepresentation = app.storage.getSearchRepresentationCache();
        this.render();
        //app.sessionManager.fetchSession();
        this.bindEvents();

    },

    render: function () {
        this.$el.append(this.template);
    },
    renderCategories: function(categories) {

        $("#front_content");
        for ( var cat1 in categories) {
            var level2 = categories[cat1], index1 = level2.index;
            for (var cat2 in level2) {
                var level3 = level2[cat2], index2 = level3.index;
                for ( var cat3 in level3){

                }
            }
        }
    },

    bindEvents: function () {
        var self = this;
        //this.bindRecentsEvents();
    },

    close: function () {
        if (!this.isClosed) {
            this.$el.empty();
            this.isClosed = true;
        }
    }
});
