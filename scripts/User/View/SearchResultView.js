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
    pageEntryNumber: 10,
    actionClass: "viewDetail",
    autoHeight: true,
    
    initialize: function (allMessages, messageList, compareWidget) {
        if (!this.initialized) {
            _.bindAll(this, "bindEvents", "entryEvent", "close");
            MultiPageView.prototype.initialize.call(this);
            this.messages = messageList || this.messages;
            this.allMessages = allMessages || this.allMessages;
            this.compareWidget = compareWidget || this.compareWidget;
            this.user = app.sessionManager.sessionModel;
            this.initialized = true;
        }
        this.render();
        this.bindEvents();
    },
    render: function () {
        this.isClosed = false;
        MultiPageView.prototype.render.call(this);
        var courseIds = app.storage.getCoursesToCompare();
        for (var i = 0; i < courseIds.length; i++ ) {
            $("#compare_" + courseIds[i]).find("input").attr("class", "remove btn_gray").val("已加入对比").removeClass("add").addClass("remove");
        }
    },
    bindEvents: function (){
        var that = this, id;
        this.$domContainer.on("click", ".compare", function (e){
            if ($(e.target).hasClass("add") ) {
                id = Utilities.getId($(this).attr("id"));
                if (that.compareWidget.addCourse(that.messages.get(Utilities.toInt(id)))) {
                    $(e.target).attr("class", "remove btn_gray").val("已加入对比");
                } else {
                    Info.displayNotice("您最多只能同时比较四个不同的科目。");
                }
            } else {
                $(e.target).attr("class", "add btn_g").val("+对比");
                id = Utilities.getId($(this).attr("id"));
                that.compareWidget.removeCourse(Utilities.toInt(id));
            }

        }).on("click", ".courseTitle,.blank", function (e) {
            e.preventDefault();
            id = Utilities.getId($(this).attr("id"));
            app.navigate("course/" + id, true);
        });
        this.registerSortEvent($("#courseSortTime"), this.compareTime, this.timeDesc, this, function(){
            that.timeDesc = !that.timeDesc;
        });
        this.registerSortEvent($("#courseSortPrice"), this.comparePrice, this.priceDesc, this, function(){
            that.priceDesc = !that.priceDesc;
        });
    },
    compareTime: function(course) {
        return course.get("time");
    },
    comparePrice: function(course) {
        return course.get("price");
    },

    entryEvent: function (courseId) {
        app.navigate("course/" + courseId, true);
    },
    fetchAction: function () {
        app.generalManager.findCourse(this.sr, {
            success: this.renderSearchResults,
            error: this.renderError
        });
    },
    renderError: function (data) {
        if (!this.isClosed) {
            $("#searchResultDisplayPanel").empty().append('<div class="no_data"><div>很抱歉，您的网络似乎不大好~~</div><p>请稍后再试</p></div>');
        }
    },
    renderSearchResults: function (data) {
        if (!this.isClosed) {
            //prevent memory leaks
            if (typeof BMap !== "undefined" && !this.compareWidgetView.map) {
                app.searchView.compareWidgetView.renderMap();
            }
            if (app.searchView.compareWidgetView.map) {
                app.searchView.compareWidgetView.map.removeAllMarkers();
            }
            searchResults = searchResults || new Courses();
            this.allMessages.reset(this.allMessages.toArray());
            this.messages.reset(searchResults.toArray());
            $("#resultNum").html(searchResults.length);
            for (i = 0; i < searchResults.length; i++) {
                if (app.searchView.compareWidgetView.map) {
                    app.searchView.compareWidgetView.map.getLatLng(searchResults.at(i).get("location"), searchResults.at(i).get("instName"));
                }
            }
            this.startIndex = 0;
            this.currentPage = 1;
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