var SearchResultView = MultiPageView.extend({
    
    initialize: function (allMessages, messageList) {
        _.bindAll(this, 'render', 'transferURL', 'close');
        this.messages = messageList;
        this.allMessages = allMessages;
        
        this.entryTemplate = _.template(tpl.get('SimpleMessage'));
        this.pageNumberClass = "searchResultPageNumber";
        this.pageNumberId = "searchResultPageNumber";
        this.entryEvent = this.transferURL;
        this.pageNavigator = "pageNavigator";
        this.pageNavigatorClass = "mainPage-searchResult-multiPage-pageNum";
        this.user = app.sessionManager.getSessionUser();
        this.entryHeight = 95;
        this.pageEntryNumber = 10;
        this.entryClass = "searchResultBoxContainer";
        this.entryContainer = "searchResultDisplayPanel";
        this.$domContainer = $("#searchResultDisplayPanel");
        this.isClosed = false;
        var that = this;
        this.render();
    },
    render: function () {
        MultiPageView.prototype.render.call(this);
    },
    transferURL: function (courseId) {
        app.navigate("course/" + messageId, true);
    },
    close: function () {
        this.$domContainer.empty();
    }
});
