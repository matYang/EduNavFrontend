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
        this.$el.append(this.template);
        this.bookingListView = new BookingListView(this.user.get("bookings"), this.user.get("bookings"), "dashboard");
    },
    bindEvents: function () {},
    close: function () {
        if (!this.isClosed) {
            this.$el.empty();
            this.isClosed = true;
        }
    }
});