var SearchView = Backbone.View.extend({
    el: '#content',
    categoryTemplate: ["<li data-id='", undefined, "'>", undefined,"</li>"],
    subCategoryTemplate: ["<span data-id='", undefined ,"'>", undefined,"</span>"],
    subCategoryContainerTemplate: ["<div data-id='", ,"'class='hidden subCategoryList'><label>类<s></s>别：</label><span data-id='noreq'>不限</span>", undefined,"</div>"],
    initialize: function (params) {
        _.bindAll(this, 'render', 'renderSearchResults', 'courseSearch', 'bindEvents', 'bindSearchEvents', 'renderCategories', 'filterResult', 'close');
        app.viewRegistration.register(this);
        this.isClosed = false;
        this.rendered = false;
        this.user = app.sessionManager.sessionModel;
        //define the template
        if (params) {
            try {
                this.searchRepresentation.castFromString(params.searchKey);
                app.storage.setSearchRepresentationCache(this.searchRepresentation);
            } catch (e) {
                app.navigate("search");
                this.searchRepresentation = new CourseSearchRepresentation();
            }
        } else {
            this.searchRepresentation = new CourseSearchRepresentation();
        }
        this.template = _.template(tpl.get('search'));
        this.$el.append(this.template);
        debugger;
        app.generalManager.fetchCategories({
            success: this.renderCategories,
            error: function () {}
        });
        this.currentPage = 0;
        this.searchRepresentation = app.storage.getSearchRepresentationCache("course");
        //injecting the template
        //TODO force target type to be all
        this.render();
        this.compareWidgetView = new CompareWidgetView();
    },
    render: function () {
        var me = this, mapParams = {
            div: "mainMap",
            class: "mainPage-map",
            clickable: false
        };
        this.map = app.storage.getViewCache("BaiduMapView", mapParams);
        this.bindEvents();
        this.rendered = true;
    },

    renderSearchResults: function (searchResults) {
        //prevent memory leaks
        $("#searchResultDisplayPanel").empty();
        this.allMessages = searchResults;
        if (!this.searchResultView) {
            this.searchResultView = new SearchResultView (this.allMessages, this.allMessages, this.compareWidgetView);
        } else {
            var array = this.allMessages.toArray();
            this.searchResultView.allMessages.reset(array);
            this.searchResultView.messages.reset(array);
            this.searchResultView.render();
            this.renderPriceRange(array);
        }
    },
    renderCategories: function (categories){
        this.categories = categories;
        var len = categories.length, cbuf = [], scbuf = [];
        if (!this.searchRepresentation.get("category")) {
            this.searchRepresentation.set("category", Object.keys[categories[0]]);
        }
        if (!this.searchRepresentation.get("subCategory")) {
            for ( var c = 0; c < len; c++) {
                var key = Object.keys(categories[c])[0];
                if ( key === this.searchRepresentation.get("category")) {
                    this.searchRepresentation.set("subCategory", categories[c][key][0]);
                }
            }
            this.searchRepresentation.set("category", Object.keys[categories[0]]);
        }
        for ( var i = 0; i < len; i ++) {
            obj = this.categories[i];
            for ( var attr in obj ) {
                this.categoryTemplate[1] = attr;
                this.categoryTemplate[3] = attr;
                cbuf.push(this.categoryTemplate.join(""));
                var scs = obj[attr], len2 = scs.length;
                for (var j = 0; j < len2; j++ ) {
                    this.categoryTemplate[1] = scs[j];
                    this.categoryTemplate[3] = scs[j];
                    scbuf.push(this.categoryTemplate.join(""));
                }
                this.subCategoryContainerTemplate[1] = attr;
                this.subCategoryContainerTemplate[3] = scbuf.join("");
                $("search_subCategory").append(this.subCategoryContainerTemplate.join(""));
                scbuf = [];
            }
        }
        $("#search_category").append(cbuf.join(""));
        $("#search_category").find("li[data-id="+this.searchRepresentation.get("category")+"]").addClass("active");
        $("#search_subCategory").find("div[data-id="+this.searchRepresentation.get("subCategory")+"]").removeClass("hidden");
        $("div[data-id="+this.searchRepresentation.get("category")+"]").find("span[data-id="+this.searchRepresentation.get("subCategory")+"]").addClass("active");
        this.courseSearch();
    },
    renderError: function () {
        this.$resultp = this.$resultp || $("#searchResultDisplayPanel");
        this.$resultp.empty().append("<div class = 'noMessage'>暂无消息</div>");
    },

    courseSearch: function () {
        app.navigate("search/" + this.searchRepresentation.toQueryString(), {'trigger': false});
        $("#searchResultDisplayPanel").empty().append('<div class="messageDetail-middle-autoMatch-loading">正在为您寻找信息</div>');
        app.generalManager.findCourse(this.searchRepresentation, {
            "success": this.renderSearchResults,
            "error": this.renderError
        });
        app.storage.setSearchRepresentationCache(this.searchRepresentation, "course");
    },

    bindEvents: function () {
        this.bindSearchEvents();
    },
    bindSearchEvents: function () {
        var that = this;
        $("#search_category").on("click", "li", function (e) {
            var dataId = $(e.target).data("id");
            $(e.delegateTarget).children(".active").removeClass("active");
            $(this).addClass("active");
            $("#search_subCategory").children("div.hidden").addClass("hidden");
            $("#search_subCategory").children(dataId).removeClass("hidden");
            that.sr.set("category", dataId);
        });
        $("#search_subCategory").on("click", "span", function (e) {
            that.sr.set("category", $("#search_category").find(".active").data("id"));
            that.sr.set("subCategory", $(this).data("id"));
            that.courseSearch();
        });
        $("#filterPanel").children(".filterCriteria").on("click", "span", function (e) {
            that.filterResult($(e.delegateTarget), $(e.target).data("id"));
        });
    },
    filterResult: function ($filter, dataId) {
        $filter.find(".active").removeClass("active");
        $filter.find("span[data-id=" + dataId + "]").addClass("active");
        var criteria = $filter.attr("id").split("_")[1];
        //this.searchRepresentation.set(criteria, dataId);
        //todo
    },
    renderPriceRange: function(){
        var max = this.allMessages.max(this.comparePrice);
        var min = this.allMessages.min(this.comparePrice);
    },
    comparePrice: function(course){
        return course.get("price");
    },
    close: function () {
        if (!this.isClosed) {
            //removing all event handlers
            if (this.compareWidgetView) {
                this.compareWidgetView.close();
            }
            if (this.searchResultView) {
                this.searchResultView.close();
            }
            if (this.map) {
                this.map.close();
            }
            this.$el.empty();
            this.isClosed = true;
        }
    } 
});