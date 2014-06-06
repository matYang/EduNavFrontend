var SearchResultView = MultiPageView.extend({
    
    initialize: function (allMessages, messageList, compareWidget) {
        _.bindAll(this, 'render', 'bindEvents', 'transferURL', 'close');
        this.messages = messageList;
        this.allMessages = allMessages;
        this.compareWidget = compareWidget;
        this.entryTemplate = _.template(tpl.get("searchResultEntry"));
        this.pageNumberClass = "searchResultPageNumber";
        this.pageNumberId = "searchResultPageNumber";
        this.entryEvent = this.transferURL;
        this.pageNavigator = "pageNavigator";
        this.pageNavigatorClass = "mainPage-searchResult-multiPage-pageNum";
        this.user = app.sessionManager.sessionModel;
        this.entryHeight = 95;
        this.pageEntryNumber = 10;
        this.entryClass = "searchResultBoxContainer";
        this.entryContainer = "searchResultDisplayPanel";
        this.$domContainer = $("#searchResultDisplayPanel");
        this.isClosed = false;
        var that = this;
        this.priceDesc = true;
        this.timeDesc = true;
        this.render();
        this.bindEvents();
    },
    render: function () {
        MultiPageView.prototype.render.call(this);
    },
    bindEvents: function (){
        var that = this;
        this.$domContainer.on("click", ".addToCompare", function (e){
            var id = Utilities.getId($(this).attr("id"));
            this.compareWidget.addCourse(that.messages.get(Utilities.toInt(id)));
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
        app.navigate("course/" + messageId, true);
    },
    close: function () {
        this.$domContainer.empty();
    }
});