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
            if ($(e.target).hasClass("add")) {
                $(e.target).attr("class", "remove btn_gray").val("已加入对比");
                id = Utilities.getId($(this).attr("id"));
                that.compareWidget.addCourse(that.messages.get(Utilities.toInt(id)));
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


    close: function () {
        if (!this.isClosed) {
            this.$domContainer.off();
            MultiPageView.prototype.close.call(this);
            this.compareWidget = null;
        }
    }
});