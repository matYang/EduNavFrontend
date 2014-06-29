var MyPageBookingView = Backbone.View.extend({
    el: "#mypage_content",
    initialize: function () {
        _.bindAll(this, "render",   "close");
        this.template = _.template(tpl.get("mypage_bookingList"));
        app.viewRegistration.register(this);
        this.user = app.sessionManager.sessionModel;
        this.isClosed = false;
        this.bookingSr = new BookingSearchRepresentation ();
        this.bookingSr.set("userId", this.user.get("phone"));
        this.$el.append("<div class='loading'></div>");
        app.userManager.fetchBookings(this.bookingSr, {
            success: this.render,
            error: this.render
        });
    },
    render: function (bookingList) {
        this.$el.empty().append(this.template);
        app.sessionManager.sessionModel.set("bookingList", bookingList);
        this.bookingListView = new BookingListView(bookingList, bookingList, "booking");
    },
    close: function () {
        if (!this.isClosed) {
            this.$el.empty();
            this.bookingListView.close();
            this.bookingListView = null;
            this.isClosed = true;
        }
    }
});