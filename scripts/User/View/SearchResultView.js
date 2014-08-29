var SearchResultView = MultiPageView.extend({
    pageNumberClass: "searchResultPageNumber",
    pageNumberId: "searchResultPageNumber",
    pageNavigator: "courseSearchResultNavigator",
    pageNavigatorClass: "page blank1 clearfix",
    entryContainer: "searchResultDisplayPanel",
    noMessage: _.template(tpl.get("search_noMessage")),
    entryTemplate: _.template(tpl.get("searchResultEntry")),
    extPn: true,
    entryHeight: 157,
    pageEntryNumber: 10, //
    // actionClass: "viewDetail",
    autoHeight: true,
    truePagination: true,
    initialize: function (searchRepresentation, compareWidget) {
        if (!this.initialized) {
            _.bindAll(this, "bindEvents", "renderSearchResults", "renderError", "close");
            MultiPageView.prototype.initialize.call(this);
            this.sr = searchRepresentation;
            this.$domContainer = $("#" + this.entryContainer);
            this.$domContainer.empty();
            this.compareWidgetView = compareWidget || this.compareWidgetView;
            this.user = app.sessionManager.sessionModel;
            this.initialized = true;
        }
        this.fetchAction();
        this.bindEvents();
    },
    render: function () {
        this.isClosed = false;
        MultiPageView.prototype.render.call(this);
        var courseIds = app.storage.getCoursesToCompare();
        for (var i = 0; i < courseIds.length; i++) {
            $("#compare_" + courseIds[i]).find("input").attr("class", "remove btn_gray").val("已加入对比").removeClass("add").addClass("remove");
        }
        //todo 这里是为了声明页面加载完毕
        $('body').attr('pageRenderReady','')
    },
    bindEvents: function () {
        var that = this, id;
        this.$domContainer.on("click", ".compare", function (e) {
            if ($(e.target).hasClass("add")) {
                id = Utilities.getId($(this).attr("id"));
                if (that.compareWidgetView.addCourse(that.messages.get(Utilities.toInt(id)))) {
                    $(e.target).attr("class", "remove btn_gray").val("已加入对比");
                } else {
                    Info.displayNotice("您最多只能同时比较四个不同的科目。");
                }
            } else {
                $(e.target).attr("class", "add btn_g").val("+对比");
                id = Utilities.getId($(this).attr("id"));
                that.compareWidgetView.removeCourse(Utilities.toInt(id));
            }

        }).on("click", ".blank", function (e) {
            e.preventDefault();
            id = Utilities.getId($(this).attr("id"));
            app.navigate("course/" + id, true);
        });
        this.registerSortEvent($("#courseSortTime"), this.compareTime, this.timeDesc, this, function () {
            that.timeDesc = !that.timeDesc;
        });
        this.registerSortEvent($("#courseSortPrice"), this.comparePrice, this.priceDesc, this, function () {
            that.priceDesc = !that.priceDesc;
        });
    },
    compareTime: function (course) {
        return course.get("time");
    },
    comparePrice: function (course) {
        return course.get("price");
    },

    // entryEvent: function (courseId) {
    //     app.navigate("course/" + courseId, true);
    // },
    fetchAction: function (page) {

        if (page === undefined) {// 未传入参数

            if(this.sr.get("start") === undefined)// localStorage中不存在缓存
                this.sr.set("start", 0);// 则设置默认的start为0
        } else {
            this.sr.set("start", (page - 1) * this.pageEntryNumber);
        }
        this.sr.set("count", this.pageEntryNumber);
        this.currentPage = page;
        app.navigate("search/" + this.sr.toQueryString(), {trigger: false, replace: true});
        $("#"+this.entryContainer).empty().append('<div class="loading"></div>');
        $("#courseSearchResultNavigator").empty();
        app.generalManager.findCourse(this.sr, {
            success: this.renderSearchResults,
            error: this.renderError
        });
        app.storage.setSearchRepresentationCache(this.searchRepresentation, "course");
    },
    renderError: function (data) {
        if (!this.isClosed) {
            $("#"+this.entryContainer).empty().append('<div class="no_data"><div>很抱歉，您的网络似乎不大好~~</div><p>请稍后再试</p></div>');
        }
    },
    renderSearchResults: function (data) {
        if (!this.isClosed) {
            //prevent memory leaks
            if (typeof BMap !== "undefined" && !this.compareWidgetView.map) {
                this.compareWidgetView.renderMap();
            }
            if (this.compareWidgetView.map) {
                this.compareWidgetView.map.removeAllMarkers();
            }
            var searchResults = data || new Courses();
            this.allMessages = searchResults;
            this.messages = searchResults;
            var total = this.truePagination ? searchResults.total : searchResults.length;
            $("#resultNum").html(total);
            for (i = 0; i < searchResults.length; i++) {
                if (this.compareWidgetView.map) {
                    this.compareWidgetView.map.getLatLng(searchResults.at(i).get("address"), searchResults.at(i).get("instName"));
                }
            }
            this.startIndex = 0;
            this.render();
        }
    },
    close: function () {
        if (!this.isClosed) {
            this.$domContainer.off();
            MultiPageView.prototype.close.call(this);
            this.compareWidget = null;
        }
    }
});