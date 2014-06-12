var SearchView = Backbone.View.extend({
    el: '#content',
    categoryTemplate: ["<li data-id='", undefined, "'>", undefined,"</li>"],
    subCategoryTemplate: ["<span data-id='", undefined ,"'>", undefined,"</span>"],
    subCategoryContainerTemplate: ["<div data-id='", ,"'class='hidden subCategoryList'><label>类<s></s>别：</label><span data-id='noreq'>不限</span>", undefined,"</div>"],
    filters: {},
    initialize: function (params) {
        _.bindAll(this, 'renderMap', 'renderSearchResults', 'courseSearch', 'bindEvents', 'bindSearchEvents', 'renderCategories', 'filterResult', 'close');
        app.viewRegistration.register(this);
        $("#viewStyle").attr("href", "style/css/search.css");
        this.isClosed = false;
        this.rendered = false;
        this.user = app.sessionManager.sessionModel;
        //define the template
        this.searchRepresentation = app.storage.getSearchRepresentationCache("course");
        if (params) {
            try {
                this.searchRepresentation.castFromString(params.searchKey);
                app.storage.setSearchRepresentationCache(this.searchRepresentation);
            } catch (e) {
                app.navigate("search");
                this.searchRepresentation = new CourseSearchRepresentation();
            }
        }
        this.template = _.template(tpl.get('search'));
        this.$el.append(this.template);
        this.compareWidgetView = new CompareWidgetView();
        app.generalManager.getCategories(this);
        this.currentPage = 0;
        //injecting the template
    },
    renderMap: function () {
        var me = this, mapParams = {
            div: "mainMap",
            class: "mainPage-map",
            clickable: false
        };
        this.map = app.storage.getViewCache("BaiduMapView", mapParams);
        this.rendered = true;
    },

    renderSearchResults: function (searchResults, byFilter) {
        //prevent memory leaks
        $("#searchResultDisplayPanel").empty();
        if (!byFilter) {
            this.allMessages = searchResults;
        }
        if (!this.searchResultView) {
            this.searchResultView = new SearchResultView (this.allMessages, this.allMessages.clone(), this.compareWidgetView);
        } else {
            var array = searchResults.toArray();
            this.searchResultView.allMessages.reset(this.allMessages.toArray());
            if (byFilter) {
                this.searchResultView.messages.reset(searchResults.toArray());
            } else {
                searchResult = this.filter();
                this.searchResultView.messages.reset(searchResult.toArray());
            }
            this.searchResultView.render.call(this);
        }
    },
    renderCategories: function (categories){
        this.categories = categories;
        var  cbuf = [], scbuf = [];
        if (!this.searchRepresentation.get("category")) {
            this.searchRepresentation.set("category", Object.keys(categories)[0]);
        }
        for ( var key in categories ) {
            obj = categories[key];
            this.categoryTemplate[1] = key;
            this.categoryTemplate[3] = key;
            cbuf.push(this.categoryTemplate.join(""));
            for ( var attr in obj ) {
                var scs = obj[attr];
                this.subCategoryTemplate[1] = attr;
                this.subCategoryTemplate[3] = attr;
                scbuf.push(this.subCategoryTemplate.join(""));
                if (obj[attr]) {

                }
            }
            this.subCategoryContainerTemplate[1] = key;
            this.subCategoryContainerTemplate[3] = scbuf.join("");
            $("#search_subCategory").append(this.subCategoryContainerTemplate.join(""));
            scbuf = [];
        }
        $("#search_category").append(cbuf.join(""));
        $("#search_category").find("li[data-id="+this.searchRepresentation.get("category")+"]").addClass("active");
        $("#search_subCategory").find("div[data-id="+this.searchRepresentation.get("category")+"]").removeClass("hidden");
        if (this.searchRepresentation.get("subCategory")) {
            $("div[data-id="+this.searchRepresentation.get("category")+"]").find("span[data-id="+this.searchRepresentation.get("subCategory")+"]").addClass("active");
        } else {
            $("div[data-id="+this.searchRepresentation.get("category")+"]").find("span[data-id=noreq]");
        }
        this.courseSearch();
        this.renderMap();
        this.bindEvents();
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
            $("#search_subCategory").children("div").addClass("hidden");
            var $scCont = $("#search_subCategory").children("div[data-id=" + dataId + "]");
            $scCont.removeClass("hidden");
            $scCont.find(".active").removeClass("active");
            $scCont.find("span[data-id=noreq]").addClass("avtive");
            that.searchRepresentation.set("category", dataId);
            that.searchRepresentation.set("subCategory", undefined);
            that.courseSearch();
        });
        $("#search_subCategory").on("click", "span", function (e) {
            that.searchRepresentation.set("category", $("#search_category").find(".active").data("id"));
            var val = $(this).data("id");
            if (val === "noreq") {
                that.searchRepresentation.set("subCategory", undefined);
            } else {
                that.searchRepresentation.set("subCategory", $(this).data("id"));
            }
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
        if (criteria === "startTime"){
            var date = new Date();
            date.setDate(1);
            var month = date.getMonth();
            if (dataId === "thisMonth") {
                this.searchRepresentation.set("startTime", date);
            } else if (dataId= "nextMonth") {
                if (month === 11) {
                    date.setMonth(0);
                    date.setFullYear(date.getFullYear()+1);
                } else {
                    date.setMonth(date.getMonth()+1);
                }
                this.searchRepresentation.set("startTime", date);
            } else if (dataId= "twoMonthsAfter") {
                if (month >= 10) {
                    date.setMonth((date.getMonth()+2)%12);
                    date.setFullYear(date.getFullYear()+1);
                } else {
                    date.setMonth(date.getMonth()+2);
                }
                this.searchRepresentation.set("startTime", date);
            } else {
                this.searchRepresentation.set("startTime", undefined);
            }
            this.courseSearch();
        }
        else if (criteria === "district") {
            if (dataId === "noreq") {
                this.searchRepresentation.set("startTime", undefined);
            } else {
                this.searchRepresentation.set(criteria, dataId);
            }
            this.courseSearch();
        }
        else if (criteria === "price") {
            if (dataId === "noreq") {
                this.filters["price"] = null;
            } else {
                var priceRange = dataId.split("-");
                var minPrice = Utilities.toInt(priceRange[0]), maxPrice;
                if (priceRange.length === 1) {
                    maxPrice = undefined;
                } else {
                    maxPrice = Utilities.toInt(priceRange[1]);
                }
                this.filters["price"] = {
                    "minPrice": minPrice,
                    "maxPrice": maxPrice
                }
            }
        }
        else if (criteria === "classMode") {
            if (dataId === "noreq") {
                this.filters["classMode"] = null;
            } else {
                var sizeRange = dataId.split("-");
                var minSize = Utilities.toInt(sizeRange[0]), maxSize;
                if (sizeRange.length === 1) {
                    maxSize = undefined;
                } else {
                    maxSize = Utilities.toInt(sizeRange[1]);
                }
                this.filters["classSize"] = {
                    "minSize": minPrice,
                    "maxSize": maxPrice
                }
            }
        }
        else if (criteria === "classTime") {
            if (dataId === "noreq") {
                this.filters["classTime"] = null;
            } else {
            }
        }
        var messages = this.filter();
        this.renderSearchResults(messages, true);
        //this.searchRepresentation.set(criteria, dataId);
        //todo
    },
    filterClassSize: function (course) {
        return (course.get("seatsTotal") >= this.filters.classSize.minSize && (this.filters.classSize.maxPrice ? course.get("seatsTotal")<= this.filters.classSize.maxSize : true));
    },
    filterClassTime: function(course){
        return true;
    },
    filterPrice: function(course){
        return (course.get("price") >= this.filters.price.minPrice && (this.filters.price.maxPrice ? course.get("price")<= this.filters.price.maxPrice : true) );
    },
    filter: function(){
        var messages = this.allMessages.clone();
        if (this.filters["price"]) {
            messages.reset(messages.filter(this.filterPrice, this));
        }
        if (this.filters["classSize"]) {
            messages.reset(messages.filter(this.filterClassSize, this));
        }
        if (this.filters["classTime"]) {
            messages.reset(messages.filter(this.filterClassTime, this));
        }
        return messages;
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