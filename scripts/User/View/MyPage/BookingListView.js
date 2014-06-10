var BookingListView = MultiPageView.extend({
    entryContainer: "bookingSummary",
    entryClass: "bookingEntry",
    pageNavigator: "bookingNavigator",
    pageNavigatorClass: "bookingNavigator",
    pageEntryNumber: 6,
    pageNumberClass: "bookingPage",
    pageNumberId: "bookingPage",
    entryHeight: -1,
    entryRowNum: 1,
    minHeight: 0,
    noMessage: "暂无订单",
    $domContainer: null,
    el: "#bookingSummary",
    initialize: function (allMessages, messages, type) {
        this.allMessages = allMessages;
        this.messages = messages;
        this.entryTemplate = _.template(tpl.get("booking_entry"));
        this.isClosed = false;
        if (type === "dashboard") {
            this.singlePage = true;
            this.pageEntryNumber = 4;
        }
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