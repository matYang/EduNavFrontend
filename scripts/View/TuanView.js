var TuanView = Backbone.View.extend({
    el: "#content",
    //todo need to write template named 'tpl_tuan'
    template: _.template(tpl.get("tuan")),
    initialize: function () {
        this.isClosed = false;
        _.bindAll(this, "render", "bindEvents", "close");
        app.viewRegistration.register(this);

    },
    render: function () {
        this.bindEvents();
    },

    bindEvents: function () {
        var that = this;
    },

    close: function () {
        if (!this.isClosed) {
            this.$el.off();
            this.$el.empty();
            this.isClosed = true;
        }
    }
});
