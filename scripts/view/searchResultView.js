var SearchResultView = MultiPageView.extend({
    
    initialize: function (allMessages, messageList, isSearchResult) {
        _.bindAll(this, 'render', 'transferURL', 'close');
        this.messages = messageList;
        this.allMessages = allMessages;
        this.isSearchResult = isSearchResult;
        this.entryTemplate = _.template(tpl.get('SimpleMessage'));
        this.pageNumberClass = "searchResultPageNumber";
        this.pageNumberId = "searchResultPageNumber";
        this.entryEvent = this.transferURL;
        this.pageNavigator = "pageNavigator";
        this.pageNavigatorClass = "mainPage-searchResult-multiPage-pageNum";
        this.user = app.sessionManager.getSessionUser();
        if (isSearchResult) {
            this.entryHeight = 95;
            this.pageEntryNumber = 10;
            this.entryClass = "searchResultBoxContainer";
            this.entryContainer = "searchResultDisplayPanel";
            this.$domContainer = $("#searchResultDisplayPanel");
        } else {
            this.entryHeight = 100;
            this.pageEntryNumber = 3;
            this.entryClass = "frontBoxContainer";
            this.entryContainer = "quickStart_resultPanel";
            this.$domContainer = $("#quickStart_resultPanel");
            this.minHeight = 300;
        }
        this.isClosed = false;
        var that = this;
        this.render();
    },
    render: function () {
        MultiPageView.prototype.render.call(this);
    },
    transferURL: function (messageId) {
        app.navigate("message/" + messageId, true);
    },
    calculateInfo: function() {
        this.averagePrice = 0;
        this.minPrice = 9999999999;
        for (var i = 0; i < this.messages.length; i++) {
            var price = this.messages.at(i).get("departure_priceList")[0];
            this.averagePrice+=price;
            this.minPrice = this.minPrice > price ?  price : this.minPrice;
        }
        this.averagePrice /= this.messages.length;
    },
    close: function () {
        this.$domContainer.empty();
    }
});
