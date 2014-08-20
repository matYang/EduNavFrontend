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

        $("#bookingSummary tbody").append("<tr class='loading'></tr>");
        app.userManager.fetchBookings(this.bookingSr, {
            success: this.renderBookings,
            error: this.renderError
        });

    },
    renderBookings:function(bookingList){
        app.sessionManager.sessionModel.set("bookingList", bookingList);
        this.bookingListView = new BookingListView(bookingList, bookingList, "booking");
    },
    renderError: function (data) {
        Info.displayNotice(data.responseJSON.message ? data.responseJSON.message : "订单页面加载失败，请稍后重试。");
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