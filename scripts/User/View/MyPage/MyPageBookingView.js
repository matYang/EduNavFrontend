var MyPageBookingView = Backbone.View.extend({
    el: "#mypage_content",
    initialize: function () {
        _.bindAll(this, "render", "renderError", "close");
        this.template = _.template(tpl.get("mypage_bookingList"));
        app.viewRegistration.register(this);
        this.user = app.sessionManager.sessionModel;
        this.isClosed = false;
        this.bookingSr = new BookingSearchRepresentation ();
        this.bookingSr.set("userId", this.user.get("userId"));
        this.render();
    },

    render: function () {
        this.$el.empty().append(this.template);


        this.bookingListView = new BookingListView(new Bookings(), new Bookings(), "booking");
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