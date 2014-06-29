var BookingListView = MultiPageView.extend({
    entryContainer: "bookingSummary",
    entryClass: "bookingEntry",
    actionClass: "bookingTitle",
    pageNavigator: "bookingNavigator",
    pageNavigatorClass: "page blank1 clearfix",
    pageEntryNumber: 8,
    pageNumberClass: "bookingPage",
    pageNumberId: "bookingPage",
    entryRowNum: 1,
    entryHeight: 106,
    noMessage: _.template(tpl.get("booking_noMessage")),
    $domContainer: null,
    el: "#bookingSummary",
    initialize: function (allMessages, messages) {
        MultiPageView.prototype.initialize.call(this);
        this.allMessages = allMessages;
        this.messages = messages;
        this.entryTemplate = _.template(tpl.get("booking_entry"));
        app.viewRegistration.register(this);
        this.isClosed = false;
        this.render();
    },
    render: function () {
        MultiPageView.prototype.render.call(this);
    },
    entryEvent: function (id) {
        app.navigate("mypage/booking/" + id, true);
    },
    close: function () {
        if (!this.isClosed) {
            this.$el.empty();
            this.isClosed = true;
        }
    }
});