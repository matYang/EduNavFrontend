var SearchResultView = MultiPageView.extend({
    pageNumberClass: "searchResultPageNumber",
    pageNumberId: "searchResultPageNumber",
    pageNavigator: "courseSearchResultNavigator",
    pageNavigatorClass: "page blank1 clearfix",
    entryContainer: "searchResultDisplayPanel",
    noMessage: '<div class="no_data"><div>很抱歉，没有找到符合您条件的课程~~</div><p>您可以尝试更换关键词搜索，或调整关键字，如""改为""。</p></div>',
    extPn: true,
    entryHeight: 157,
    pageEntryNumber: 10,
    actionClass: "viewDetail",
    
    initialize: function (allMessages, messageList, compareWidget) {
        if (!this.initialized) {
            _.bindAll(this, "bindEvents", "entryEvent", "close");
            this.messages = messageList || this.messages;
            this.allMessages = allMessages || this.allMessages;
            this.compareWidget = compareWidget || this.compareWidget;
            this.entryTemplate = _.template(tpl.get("searchResultEntry"));
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
            MultiPageView.prototype.close.call(this);
            this.$domContainer.off();
            this.$domContainer.empty();
        }
    }
});