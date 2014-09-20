var InfoModal = Backbone.View.extend({
    el: "#popup",
    template: _.template(tpl.get('infoModal')),
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

var ColorInfoModal = Backbone.View.extend({
    el: "#colorInfoModal",
    template: _.template(tpl.get('colorInfoModal')),
    initialize: function () {
        _.bindAll(this, "render", "show", "bindEvents", "hide", "close");
        this.render();
        this.bindEvents();
    },
    render: function () {
        this.$el.html(this.template);
    },
    show: function (opt) {
        var self = this;
        $("#infoMessage").html(opt.message);
        this.$el.fadeIn(600);
        $("#overlay").removeClass("hidden");
        setTimeout(function () {
            self.hide();
        },1800)
    },
    bindEvents: function () {
        var that = this;
        $("#closeBtn").on("click", this.hide);
    },
    hide: function () {
        this.$el.fadeOut(1000);
        $("#overlay").addClass("hidden");
    },
    close: function () {
        this.hide();
        this.$el.empty();
    }
});