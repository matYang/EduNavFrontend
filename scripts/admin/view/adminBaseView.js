var AdminBaseView = Backbone.View.extend({
    el:"body",
    initialize: function() {
        _.bindAll(this, "render", "bindEvents", "close");
        this.isClosed = false;
        this.baseTemplate = _.template(tpl.get('adminBase'))
        this.render();
        this.bindEvents();
        this.sidebarShown = true;
    },
    render: function () {
        this.$el.attr("class", "").append(this.baseTemplate);
    },
    bindEvents: function () {

    },
    close: function () {
        if (!this.isClosed) {
            this.isClosed = true;
            $("#sideBarClose").off();
            this.$el.empty();
        }
    }


});