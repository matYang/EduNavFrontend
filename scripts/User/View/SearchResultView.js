var SearchResultView = MultiPageView.extend({
    
    initialize: function (allMessages, messageList, compareWidget) {
        _.bindAll(this, "render", "bindEvents", "transferURL", "close");
        this.messages = messageList;
        this.allMessages = allMessages;
        this.compareWidget = compareWidget;
        this.entryTemplate = _.template(tpl.get("searchResultEntry"));
        this.pageNumberClass = "searchResultPageNumber";
        this.pageNumberId = "searchResultPageNumber";
        this.entryEvent = this.transferURL;
        this.pageNavigator = "courseSearchResultNavigator";
        this.pageNavigatorClass = "page blank1 clearfix";
        this.user = app.sessionManager.sessionModel;
        this.entryHeight = 157;
        this.pageEntryNumber = 10;
        this.actionClass = "viewDetail";
        this.entryContainer = "searchResultDisplayPanel";
        this.$domContainer = $("#searchResultDisplayPanel");
        this.noMessage = '<div class="no_data"><div>很抱歉，没有找到符合您条件的课程~~</div><p>您可以尝试更换关键词搜索，或调整关键字，如""改为""。</p></div>';
        this.isClosed = false;
        this.extPn = true;
        this.render();
        this.bindEvents();
    },
    render: function () {
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
                $(e.target).removeClass("add").attr("class", "remove btn_gray").val("已加入对比");
                id = Utilities.getId($(this).attr("id"));
                that.compareWidget.addCourse(that.messages.get(Utilities.toInt(id)));
            } else {
                $(e.target).removeClass("remove").attr("class", "add btn_g").val("+对比");
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

    transferURL: function (courseId) {
        app.navigate("course/" + courseId, true);
    },


    close: function () {
        this.$domContainer.empty();
    }
});