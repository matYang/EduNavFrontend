var MyPageDashboardView = Backbone.View.extend({
    el:"#mypage_content",
    initialize: function (params) {
        _.bindAll(this, "render", "bindEvents", "renderError", "close");
        app.viewRegistration.register(this);
        this.template = _.template(tpl.get("mypage_dashboard"));
//        this.user = app.sessionManager.sessionModel;//session中存的信息不全
        this.user = params.user;//从MyPageView中将获取的user信息渲染到页面中
        this.isClosed = false;
        this.bookingSr = new BookingSearchRepresentation ();
        this.bookingSr.set("userId", this.user.get("userId"));
        this.$el.empty().append(this.template(this.user._toJSON()));
        this.$bookings = $("#bookingSummary tbody");
        this.$bookings.append("<tr class='loading'></tr>");
        app.userManager.fetchBookings(this.bookingSr, {
            success: this.render,
            error: this.renderError
        })

    },
    renderError: function (data) {
        Info.displayNotice(data.responseJSON.message ? data.responseJSON.message : "订单页面加载失败，请稍后重试。");
    },
    render: function (bookingList) {
        bookingList = bookingList || new Bookings();
        var bookings = (new Bookings()).add(bookingList.filter(this.filterUnconfirmed));
        app.sessionManager.sessionModel.set("bookingList", bookingList);
        this.$bookings.empty();
        this.bookingListView = new BookingListView(bookings, bookings, "dashboard");
        $("#mypage_content").css("border", "none");
    },
    filterUnconfirmed: function(booking){
        var state = EnumConfig.BookingStatusText[booking.get("status")];
        return (state === '预订成功' || state === '等待确认');
    },
    bindEvents: function () {},
    close: function () {
        if (!this.isClosed) {
            this.$el.empty();
            $("#mypage_content").css("border", "1px solid #ccc");
            if (this.bookingListView) {
                this.bookingListView.close();
            }
            this.bookingListView = null;
            this.isClosed = true;
        }
    }
});