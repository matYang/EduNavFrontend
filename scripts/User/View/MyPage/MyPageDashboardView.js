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
        this.$el.append(this.template(this.user._toJSON()));
        this.bookingListView = new BookingListView(this.user.get("bookingList"), this.user.get("bookingList"), "dashboard");
        $("#mypage_content").css("border", "none");
    },
    bindEvents: function () {},
    close: function () {
        if (!this.isClosed) {
            $("#mypage_content").css("border", "1px solid #ccc");
            this.$el.empty();
            this.isClosed = true;
        }
    }
});