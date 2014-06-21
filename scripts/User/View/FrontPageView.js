var FrontPageView = Backbone.View.extend({

    el: '#content',
    initialize: function () {
        _.bindAll(this, 'render', 'bindEvents', 'close');
        $("#viewStyle").attr("href", "style/css/index.css");
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
        $("body").addClass("index");
        this.banner = new BannerView();
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
        $("#lv1Button").on("mouseover", "li", function (e) {
            var category = $(e.target).data("id");
            $(e.delegateTarget).find(".active").removeClass("active");
            $(e.target).addClass("active");
            $("lvl2Category").find(".hidden").removeClass("hidden");
            $("lvl2Category").find("[data-parent!=category]").addClass("hidden");
        });
    },
    buildCategoryTable: function (category, toplevel, secondlevel) {
        var buf = "<table class='blank1' width='100%' cellpadding='0' cellspacing='0' data-parent='" + toplevel + "'><tbody>";
        var trBuf = "<tr>";
        var cellBuffer = [];
        var row = 0;
        for (var attr in category[toplevel][secondlevel]) {
            var cellCounter = 0;
            if (row === 0) {
                trBuf+='<th rowspan="10"><a>'+ secondlevel +'</a><div class="top_arrow"></div></th>'
            }
            cellBuffer[category[toplevel][secondlevel][attr].index] = "<td data-id='"+attr+"'>" + attr + "</td>"
        }

    },
    close: function () {
        if (!this.isClosed) {
            $("body").removeClass("index");
            this.$el.empty();
            this.isClosed = true;
            this.banner.close()
        }
    }
});

var BannerView = Backbone.View.extend({

    el: '#visualScope',
    initialize: function () {
        _.bindAll(this, 'render', 'bindEvents', 'close');
        app.viewRegistration.register(this);
        this.isClosed = false;
        this.template = _.template(tpl.get('banner'));
        this.render();
        //app.sessionManager.fetchSession();
        this.bindEvents();

    },

    render: function () {
        this.$el.append(this.template);
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
