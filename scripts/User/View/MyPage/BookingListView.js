var BookingListView = MultiPageView.extend({
    entryContainer: "#bookingSummary",
    entryClass: "bookingEntry",
    pageNavigator: "bookingNavigator",
    pageNavigatorClass: "bookingNavigator",
    pageEntryNumber: 3,
    pageNumberClass: "bookingPage",
    pageNumberId: "bookingPage",
    entryHeight: -1,
    entryRowNum: 1,
    minHeight: 0,
    noMessage: "暂无订单",
    $domContainer: null,
    $el: "bookingSummary",
    initialize: function (allMessages, messages) {
        this.allMessages = allMessages;
        this.messages = messages;
        this.isClosed = false;
        this.render();
    }, 
    render: function () {
        MultiPageView.prototype.render.call(this);
    },
    entryEvent: function (id) {
        app.navigate("mypage/booking/" + id);

    },
    close: function (){
        if (!this.isClosed) {
            this.$el.empty();
            this.isClosed = true;
        }
    }
});