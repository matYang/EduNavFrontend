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
        if (!this.isClosed) {
            var obj = {}, categoryList = [], buttonList = [], counter = 1, level2, index1, level3, index2, index3, lvl3CatList = [], lvl3counter = 0, padding = 0;
            var cat1, cat2, cat3;

            for (cat1 in categories) {
                if (cat1 === "index") continue;

                obj.lvl1Cat = cat1;
                level2 = categories[cat1];
                index1 = level2.index;
                buttonList[index1] = this.buttonTemplate({dataId: cat1, index: index1+1});
                obj.catClass = Constants.categoryClassMapper[cat1];
                for (cat2 in level2) {
                    if (cat2 === "index") continue;
                    obj.categoryName = cat2;
                    level3 = level2[cat2];
                    index2 = level3.index;
                    for (cat3 in level3){
                        if (cat3 !== "index") {
                            lvl3counter++;
                            index3 = level3[cat3].index;
                            lvl3CatList[index3] = this.catButtonTemplate({lv1:cat1, lv2:cat2, lv3:cat3});
                        }
                    }
                    padding = (Constants.categoryRowMapper[cat1] - lvl3counter % Constants.categoryRowMapper[cat1])% Constants.categoryRowMapper[cat1];
                    while (padding) {
                        lvl3CatList.push("<li><a> --- </a></li>");
                        padding--;
                    }
                    obj.catgoryList = lvl3CatList.join("");
                    categoryList[index2] = this.lvl2Template(obj);
                    lvl3CatList = [];
                    lvl3counter = 0;
                }

                $("#lv2Categories").append(categoryList.join(""));
                lvl3CatList = [];
                categoryList = [];
            }
            $("#lv1Button").append(buttonList.join(""));
            this.afterRender();
            this.bindEvents();
        }
    },
    afterRender: function () {
        //add last class to last rows of each lvl 2 category
        $("#lv2Categories").children("div").each(function (category) {
            var rowLength = Constants.categoryRowMapper[$(this).data("parent")], list = $(this).find("li");
            $(this).find("li:gt(-"+(rowLength + 1)+")").addClass("last");
            var rowNum = list.length/rowLength, stickerClass;
            $(this).addClass("c_h"+rowNum);
        });
        var activeButton = $("#lv1Button").find("a:first").addClass("active");
        $("#lv2Categories").children("div[data-parent=" + activeButton.parent().data("id") + "]").removeClass("hidden");
        $("#content").css("padding-bottom", 0);
    },
    bindEvents: function () {
        var that = this;
        $("#lv1Button").on("mouseover", "li", function (e) {
            var category = $(this).data("id");
            $(e.delegateTarget).find(".active").removeClass("active");
            $(this).find("a").addClass("active");
            $("#lv2Categories").children(".hidden").removeClass("hidden");
            $("#lv2Categories").children("div[data-parent!=" + category + "]").addClass("hidden");
        }).on("click", "li", function (e) {
            e.preventDefault();
            that.searchRepresentation.set("category", $(this).data("id"));
            app.navigate("search/" + that.searchRepresentation.toQueryString(), true);
        });
        $("#lv2Categories").on("click", ".fleft", function (e) {
            if (e.target.tagName === "A") {
                e.preventDefault();
                that.searchRepresentation.set("category", $(this).parent().data("parent"));
                that.searchRepresentation.set("subCategory", $(e.target).html());
                app.navigate("search/" + that.searchRepresentation.toQueryString(), true);
            }
        });
        $(".lv2category").on("click", "li", function (e) {
            if (e.target.tagName === "A") {
                e.preventDefault();
                that.searchRepresentation.set("category", $(e.currentTarget).data("lvl1"));
                that.searchRepresentation.set("subCategory", $(e.currentTarget).data("lvl2"));
                that.searchRepresentation.set("subSubCategory", $(e.currentTarget).data("lvl3"));
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
