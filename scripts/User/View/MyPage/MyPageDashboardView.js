var MyPageDashboardView = Backbone.View.extend({
    el:"#mypage_content",
    initialize: function () {
        _.bindAll(this, "render", "bindEvents", "renderError", "close");
        app.viewRegistration.register(this);
        this.template = _.template(tpl.get("mypage_dashboard"));
        this.user = app.sessionManager.sessionModel;
        this.isClosed = false;
        this.bookingSr = new BookingSearchRepresentation ();
        this.bookingSr.set("userId", this.user.get("phone"));
        debugger;
        this.$el.empty().append(this.template(this.user._toJSON()));
        $("#bookingSummary").append("<div class='loading'></div>");
        app.userManager.fetchBookings(this.bookingSr, {
            success: this.render,
            error: this.render
        })

    },
    renderError: function (data) {
        Info.displayNotice(data ? data.responseText : "订单页面加载失败，请稍后重试。");
    },
    render: function (bookingList) {
        bookingList = bookingList || new Bookings();
        var bookings = (new Bookings()).add(bookingList.filter(this.filterUnconfirmed));
        app.sessionManager.sessionModel.set("bookingList", bookingList);
        $("#bookingSummary").empty();
        this.bookingListView = new BookingListView(bookings, bookings, "dashboard");
        $("#mypage_content").css("border", "none");
    },
    filterUnconfirmed: function(booking){
        var state = EnumConfig.BookingStatusUserText[booking.get("status")];
        return (state === '预订成功' || state === '等待确认');
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