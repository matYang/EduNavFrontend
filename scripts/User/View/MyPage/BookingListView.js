var BookingListView = MultiPageView.extend({
    entryContainer: "bookingSummary",
    entryClass: "bookingEntry",
    pageNavigator: "bookingNavigator",
    pageNavigatorClass: "page blank1 clearfix",
    pageEntryNumber: 8,
    pageNumberClass: "bookingPage",
    pageNumberId: "bookingPage",
    entryRowNum: 1,
    entryHeight: 106,
    noMessage: '<div class="no_data"><div>您目前没有未入学的订单哦~~</div></div>',
    $domContainer: null,
    el: "#bookingSummary",
    initialize: function (allMessages, messages, type) {
        _.bindAll(this, 'render', 'entryEvent', 'close');
        this.allMessages = allMessages;
        this.messages = messages;
        this.entryTemplate = _.template(tpl.get("booking_entry"));
        app.viewRegistration.register(this);
        this.isClosed = false;
        this.render();
    }, 
    render: function () {
        MultiPageView.prototype.render.call(this);
        //$("#bookingSummary").prepend("<h2 class='title'>未入学订单</h2>")
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