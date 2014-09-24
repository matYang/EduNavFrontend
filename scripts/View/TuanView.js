var TuanView = Backbone.View.extend({
    el: "#content",
    //todo need to write template named 'tpl_tuan'
    template: _.template(tpl.get("tuan")),
    initialize: function () {
        this.isClosed = false;
        _.bindAll(this, "render", "bindEvents", "close");
        app.viewRegistration.register(this);
        this.render();

    },
    render: function () {
        this.$el.html(this.template());
        if (!this.tuanBannerView) {
            this.tuanBannerView = new TuanBannerView();
        } else if (this.tuanBannerView.isClosed) {
            this.tuanBannerView.render();
        }
        if (!this.tuanResultView) {
            this.tuanResultView = new TuanResultView();
        } else if (this.tuanResultView.isClosed) {
            this.tuanResultView.render();
        }
        if (!this.tuanFooterView) {
            this.tuanFooterView = new TuanFooterView();
        } else if (this.tuanFooterView.isClosed) {
            this.tuanFooterView.render();
        }
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

/*团BannerView*/
var TuanBannerView = Backbone.View.extend({
    el: "#tuanBanner",
    //todo need to write template named 'tpl_tuanBanner'
    template: _.template(tpl.get("tuanBanner")),
    initialize: function () {
        this.isClosed = false;
        _.bindAll(this, "render", "bindEvents", "close");
        app.viewRegistration.register(this);
        this.render();

    },
    render: function () {
        this.$el.html(this.template());
        this.bindEvents();
    },

    bindEvents: function () {
        var that = this;
        $(".tips .tips_li").hover(function(){
            var bindex=$(this).attr("index");
            $(".tips .tips_li").removeClass("active");
            $(this).addClass("active");
            $(".pic .pics").removeClass("active");
            $(".pic .pics:eq("+bindex+")").addClass("active");
        });
    },

    close: function () {
        if (!this.isClosed) {
            this.$el.off();
            this.$el.empty();
            this.isClosed = true;
        }
    }
});

/*团列表View*/
var TuanResultView = Backbone.View.extend({
    el: "#tuanResult",
    //todo need to write template named 'tpl_tuanResult'
    template: _.template(tpl.get("tuanResult")),
    initialize: function () {
        this.isClosed = false;
        _.bindAll(this, "render", "bindEvents", "close");
        app.viewRegistration.register(this);
        this.render();

    },
    render: function () {
        this.$el.html(this.template());
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

/*团底部view*/
var TuanFooterView = Backbone.View.extend({
    el: "#tuanFooter",
    //todo need to write template named 'tpl_tuanResult'
    template: _.template(tpl.get("tuanFooter")),
    initialize: function () {
        this.isClosed = false;
        _.bindAll(this, "render", "bindEvents", "close");
        app.viewRegistration.register(this);
        this.render();

    },
    render: function () {
        this.$el.html(this.template());
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
