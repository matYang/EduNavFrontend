var FrontPageView = Backbone.View.extend({

    el: '#content',
    initialize: function () {
        _.bindAll(this, 'render', 'renderCategories', 'bindEvents', 'close');
        $("#viewStyle").attr("href", "style/css/index.css");
        app.viewRegistration.register(this);
        this.isClosed = false;
        this.template = _.template(tpl.get('front'));
        this.lvl2Template = _.template(tpl.get("frontCategoryContainer"));
        this.user = app.sessionManager.sessionModel;

        this.searchRepresentation = app.storage.getSearchRepresentationCache("course");
        this.render();
        //app.sessionManager.fetchSession();
        this.bindEvents();

    },

    render: function () {
        $("body").addClass("index");
        this.banner = new BannerView();
        this.$el.append(this.template);
        app.generalManager.getCategories(this);
    },
    renderCategories: function(categories) {
        var obj = {}, categoryList = [], buttonList = [], counter = 1, level2, index1, level3, index2, index3, lvl3CatList = [], lvl3counter = 0, padding = 0;
        for ( var cat1 in categories) {
            if (cat1 === "index") continue;

            obj.lvl1Cat = cat1;
            level2 = categories[cat1];
            index1 = level2.index;
            buttonList[index1] = '<li data-id="' + cat1 + '"class="item' + counter + '"><a href="#">' + cat1 + '</a></li>';
            obj.catClass = Constants.categoryClassMapper[cat1];
            for (var cat2 in level2) {
                if (cat2 === "index") continue;
                obj.categoryName = cat2;
                level3 = level2[cat2];
                index2 = level3.index;
                for ( var cat3 in level3){
                    if (cat3 !== "index") {
                        lvl3counter++;
                        index3 = level3[cat3].index;
                        lvl3CatList[index3] = "<li data-lvl1='" + cat1 + "' data-lvl2='" + cat2 + "' data-lvl3='" + cat3 + "'><a>"+ cat3 +"</a></li>";
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
            counter++;
        }
        $("#lv1Button").append(buttonList.join(""));
        this.afterRender();
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
    },
    bindEvents: function () {
        var that = this;
        $("#lv1Button").on("mouseover", "li", function (e) {
            var category = $(this).data("id");
            $(e.delegateTarget).find(".active").removeClass("active");
            $(this).find("a").addClass("active");
            $("#lv2Categories").children(".hidden").removeClass("hidden");
            $("#lv2Categories").children("div[data-parent!=" + category + "]").addClass("hidden");
        });
        $(".lv2category").on("click", "li", function (e) {
            if (e.target.tagName === "A") {
                e.preventDefault();
                that.searchRepresentation.set("category", $(e.currentTarget).data("lvl1"));
                that.searchRepresentation.set("subCategory", $(e.currentTarget).data("lvl2"));
                that.searchRepresentation.set("subSubCategory", $(e.currentTarget).data("lvl3"));
                app.navigate("search/"+that.searchRepresentation.toQueryString(), true);
            }
        });
    },
    buildCategoryTable: function (category, toplevel, secondlevel) {
        var buf = "<ul class='blank1' width='100%' cellpadding='0' cellspacing='0' data-parent='" + toplevel + "'><tbody>";
        var trBuf = "<tr>";
        var cellBuffer = [];
        var row = 0;
        for (var attr in category[toplevel][secondlevel]) {
            var cellCounter = 0;
            if (row === 0) {
                trBuf+='<th rowspan="10"><a>'+ secondlevel +'</a><div class="top_arrow"></div></th>';
            }
            cellBuffer[category[toplevel][secondlevel][attr].index] = "<td data-id='"+attr+"'>" + attr + "</td>";
        }

    },
    close: function () {
        if (!this.isClosed) {
            $("body").removeClass("index");
            this.$el.empty();
            this.isClosed = true;
            this.banner.close();
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
        
    },

    close: function () {
        if (!this.isClosed) {
            this.$el.empty();
            this.isClosed = true;
        }
    }
});
