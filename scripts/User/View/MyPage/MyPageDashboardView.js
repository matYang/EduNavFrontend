var MyPageDashboardView = Backbone.View.extend({
    el:"#mypage_content",
    initialize: function () {
        _.bindAll(this, "render", "bindEvents", "close");
        app.viewRegistration.register(this);
        this.template = _.template(tpl.get("mypage_dashboard"));
        this.user = app.sessionManager.sessionModel;
        this.isClosed = false;
        this.render();
    },
    render: function () {
        var list = this.user.get("bookingList").filter(this.filterUnconfirmed);
        var bookings = (new Bookings()).add(list);
        this.$el.append(this.template(this.user._toJSON()));
        this.bookingListView = new BookingListView(bookings, bookings, "dashboard");
        $("#mypage_content").css("border", "none");
    },
    filterUnconfirmed: function(booking){
        return booking.get("status") < 2; 
    },
    bindEvents: function () {},
    close: function () {
        if (!this.isClosed) {
            this.$el.empty();
            $("#mypage_content").css("border", "1px solid #ccc");
            this.bookingListView.close();
            this.bookingListView = null;
            this.isClosed = true;
        }
    }
});