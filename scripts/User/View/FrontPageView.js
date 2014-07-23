var FrontPageView = Backbone.View.extend({
    el: '#content',
    template: _.template(tpl.get('front')),
    lvl2Template: _.template(tpl.get("frontCategoryContainer")),
    buttonTemplate: _.template(tpl.get("frontButton")),
    catButtonTemplate: _.template(tpl.get("frontCatButton")),
    initialize: function () {
        _.bindAll(this, 'render', 'renderCategories', 'bindEvents', 'close');
        // $("#viewStyle").attr("href", "style/css/index.css");
        this.user = app.sessionManager.sessionModel;

        this.render();
        //app.sessionManager.fetchSession();
    },

    render: function () {
        $("title").html("爱上课 | 为您选择最合适，最优惠的课程");
        this.isClosed = false;
        app.viewRegistration.register(this);
        this.searchRepresentation = app.storage.getSearchRepresentationCache("course");
        $("body").addClass("index");
        if (!this.banner) {
            this.banner = new BannerView();
        } else if (this.banner.isClosed) {
            this.banner.render();
        }
        this.$el.append(this.template);
        app.generalManager.getCategories(this);
    },
    renderCategories: function(categories) {
        //build the buttons on front page;

        if (!this.isClosed) {
            this.categories = categories;
            var data = categories.data, len = data.length, i, j, k, cbuf = [], scbuf = [], tcbuf = [], children1, children2, tc="", padding, lvl3counter = 0, obj = {};
            for ( i = 0; i < len; i++ ) {
                cbuf[i] = this.buttonTemplate({value:data[i].value, name:data[i].name, index:i+1});
                children1 = data[i].children || [];
                for ( j = 0; j < children1.length; j ++) { //level 2 and level 1 index
                    children2 = children1[j].children;
                    for (k = 0; k < children2.length; k++) { //level 2 and level 1 index
                        lvl3counter++;
                        tcbuf[k] = this.catButtonTemplate({value: children2[k].value, name:children2[k].name});
                    }
                    padding = (Constants.categoryRowMapper[data[i].name] - lvl3counter % Constants.categoryRowMapper[data[i].name])% Constants.categoryRowMapper[data[i].name];
                    while (padding) {
                        tcbuf.push("<li><a> --- </a></li>");
                        padding--;
                    }
                    obj.catgoryList = tcbuf.join("");
                    obj.catClass = Constants.categoryClassMapper[data[i].name];
                    obj.categoryName = children1[j].name;
                    obj.parentName = data[i].name;
                    obj.value = children1[j].value;
                    obj.parentValue = data[i].value;
                    scbuf[j] = this.lvl2Template(obj);
                    tcbuf = [];
                    lvl3counter = 0;
                }
                $("#lv2Categories").append(scbuf.join(""));
                scbuf = [];
            }
            $("#lv1Button").append(cbuf.join(""));
            this.afterRender();
            this.bindEvents();
        }
    },
    afterRender: function () {
        //add last class to last rows of each lvl 2 category
        $("#lv2Categories").children("div").each(function (category) {
            var rowLength = Constants.categoryRowMapper[$(this).data("parentname")], list = $(this).find("li"), rowNum = list.length/rowLength;
            $(this).find("li:gt(-"+(rowLength + 1)+")").addClass("last");
            $(this).addClass("c_h"+rowNum);
        });
        var activeButton = $("#lv1Button").find("a:first").addClass("active");
        $("#lv2Categories").children("div[data-parent=" + activeButton.parent().data("value") + "]").removeClass("hidden");
        $("#content").css("padding-bottom", 0);
    },
    bindEvents: function () {
        var that = this;
        $("#lv1Button").on("mouseover", "li", function (e) {
            var category = $(this).data("value");
            $(e.delegateTarget).find(".active").removeClass("active");
            $(this).find("a").addClass("active");
            $("#lv2Categories").children(".hidden").removeClass("hidden");
            $("#lv2Categories").children("div[data-parent!=" + category + "]").addClass("hidden");
        }).on("click", "li", function (e) {
            e.preventDefault();
            that.searchRepresentation.set("categoryValue", $(this).data("value"));
            app.navigate("search/" + that.searchRepresentation.toQueryString(), true);
        });
        $("#lv2Categories").on("click", ".fleft", function (e) {
            if (e.target.tagName === "A") {
                e.preventDefault();
                that.searchRepresentation.set("categoryValue", $(this).data("value"));
                app.navigate("search/" + that.searchRepresentation.toQueryString(), true);
            }
        });
        $(".lv2category").on("click", "li", function (e) {
            if (e.target.tagName === "A") {
                e.preventDefault();
                that.searchRepresentation.set("categoryValue", $(this).data("value"));
                app.navigate("search/" + that.searchRepresentation.toQueryString(), true);
            }
        });
    },
    close: function () {
        if (!this.isClosed) {
            $("#lv1Button").off();
            $(".lv2category").off();
             $("#lv2Categories").off();
            $("body").removeClass("index");
            this.$el.empty();
            this.isClosed = true;
            this.banner.close();
            $("#content").css("padding-bottom", "");
            app.frontPageView = null;
        }
    }
});

var BannerView = Backbone.View.extend({

    el: '#visualScope',
    initialize: function () {
        _.bindAll(this, 'render', 'bindEvents', 'close');
        this.template = _.template(tpl.get('banner'));
        this.isClosed = false;
        this.render();
        //app.sessionManager.fetchSession();

    },

    render: function () {
        if (!this.isClosed) {
            app.viewRegistration.register(this);
            this.$el.append(this.template);
            this.bindEvents();
        }
    },

    bindEvents: function () {
    },

    close: function () {
        if (!this.isClosed) {
            this.$el.empty();
            this.isClosed = true;
        }
    }
});
