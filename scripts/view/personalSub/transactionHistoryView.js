var TransactionHistoryView = MultiPageView.extend({

    initialize: function (messageList) {
        _.bindAll(this, 'render', 'openTransactionDetail', 'fetchMessageSuccess', 'fetchMessageError', 'close');
        this.messages = messageList;
        this.allMessages = messageList.clone();
        this.entryTemplate = _.template(tpl.get('personalTransactionHistory'));
        this.pageNumberClass = "searchResultPageNumber";
        this.pageNumberId = "transactionPageNumber";
        this.entryEvent = this.openTransactionDetail;
        this.pageNavigator = "transactionHistoryNavigator";
        this.user = app.sessionManager.getSessionUser();
        this.entryHeight = 61;
        this.pageEntryNumber = 7;
        this.entryClass = "message_simple";
        this.entryContainer = "transactionHistoryContent";
        this.domContainer = $("#transactionHistoryContent");
        this.minHeight = 427;
        MultiPageView.prototype.render.call(this);
    },

    render: function (start) {

    },
    openTransactionDetail: function (messageId) {
        var currentTransaction = this.messages.get(messageId);
        app.courseManager.fetchMessage(currentTransaction.get("messageId"), {
            "success": this.fetchMessageSuccess,
            "error": this.fetchMessageError,
            "transaction": currentTransaction
        });

    },
    fetchMessageSuccess: function (message, transaction) {
        if (app.sessionManager.hasSession()) {
            this.transactionDetail = new TransactionDetailView (transaction.set("direction", 1), {
                "departure_seatsNumber": message.get("departure_seatsNumber") - message.get("departure_seatsBooked"),
                "arrival_seatsNumber": message.get("arrival_seatsBookedtsNumber") - message.get("arrival_seatsBooked"),
                "status": "r"
            });
        }
    },
    fetchMessageError: function () {

    },

    close: function () {
        this.domContainer.empty();
    }
}); 