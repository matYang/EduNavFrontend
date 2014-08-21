var MyPageBookingView = Backbone.View.extend({
    el: "#mypage_content",
    initialize: function () {
        _.bindAll(this, "render", "close");
        this.template = _.template(tpl.get("mypage_bookingList"));
        app.viewRegistration.register(this);
        this.user = app.sessionManager.sessionModel;
        this.isClosed = false;

        this.render();
    },

    render: function () {
        this.$el.empty().append(this.template);


        this.bookingListView = new BookingListView(new Bookings(), new Bookings(), "booking");
        this.bookingListView.bookingSr = new BookingSearchRepresentation ();
        this.bookingListView.bookingSr.set("userId", this.user.get("userId"));
    },
    close: function () {
        if (!this.isClosed) {
            this.$el.empty();
            if(this.bookingListView){
                this.bookingListView.close();
                this.bookingListView = null;
            }
            this.isClosed = true;
        }
    }
});