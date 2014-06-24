var MyPageBookingView = Backbone.View.extend({
    el: "#mypage_content",
    initialize: function () {
        _.bindAll(this, "render",   "close");
        this.template = _.template(tpl.get("mypage_bookingList"));
        app.viewRegistration.register(this);
        this.user = app.sessionManager.sessionModel;
        this.isClosed = false;
        this.render();
    },
    render: function () {
        this.$el.append(this.template);
        this.bookingListView = new BookingListView(this.user.get("bookingList"), this.user.get("bookingList"), "booking");
    },
    close: function () {
        if (!this.isClosed) {
            this.$el.empty();
            this.isClosed = true;
        }
    }
});