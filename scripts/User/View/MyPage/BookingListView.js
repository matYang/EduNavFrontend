var BookingListView = MultiPageView.extend({
    entryContainer: "bookingSummary",
    entryClass: "bookingEntry",
    pageNavigator: "bookingNavigator",
    pageNavigatorClass: "bookingNavigator",
    pageEntryNumber: 6,
    pageNumberClass: "bookingPage",
    pageNumberId: "bookingPage",
    entryHeight: 117,
    entryRowNum: 1,
    minHeight: 0,
    noMessage: "暂无订单",
    $domContainer: null,
    el: "#bookingSummary",
    initialize: function (allMessages, messages, type) {
        _.bindAll(this, 'render', 'entryEvent', 'close');
        this.allMessages = allMessages;
        this.messages = messages;
        this.entryTemplate = _.template(tpl.get("booking_entry"));
        app.viewRegistration.register(this);
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
        app.navigate("mypage/booking/" + id, true);
    },
    close: function (){
        if (!this.isClosed) {
            this.$el.empty();
            this.isClosed = true;
        }
    }
});