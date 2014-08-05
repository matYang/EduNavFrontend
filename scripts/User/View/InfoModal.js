var InfoModal = Backbone.View.extend({
    el: "#popup",
    template: function (settings) {
        var stringBuild = ['<div class="pop_content">',
            '<div id="popMessage">',
            '</div>',
            '<div class="btn" style="text-align:center; padding-top:15px;">',
            '<input id="gotIt" class="btn_O" type="button" value="确认">',
            '</div>',
            '</div>'];
        return stringBuild.join('');
    },
    initialize: function () {
        _.bindAll(this, "render", "setMessage", "show", "bindEvents", "hide", "close");
        this.isClosed = false;
        this.render();
        this.bindEvents();
    },
    render: function () {
        this.$el.append(this.template);
    },
    setMessage: function (message) {
        $("#popMessage").html(message);
        return this;
    },
    show: function () {
        this.$el.removeClass("hidden");
        $("#overlay").removeClass("hidden");
    },
    bindEvents: function () {
        var that = this;
        $("#gotIt").on("click", this.hide);
    },
    hide: function () {
        this.$el.addClass("hidden");
        $("#overlay").addClass("hidden");
    },
    close: function () {
        if (!this.isClosed) {
            this.isClosed = true;
            this.$el.empty();
        }
    }
});