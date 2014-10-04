var GroupBuyBookingDetailView = Backbone.View.extend({
    el: "#mypage_content",
    template: _.template(tpl.get("mypage_groupBuyBookingDetail")),
    initialize: function (params) {
        this.isClosed = false;
        _.bindAll(this, 'render', 'bindEvents', 'close');
        app.viewRegistration.register(this);
        //根据参数中的bookingId拉取课程进行初始化
        this.bookingId = params.bookingId;
        this.user = app.sessionManager.sessionModel;

        app.userManager.fetchGroupBuyBooking(this.bookingId, {
            success: this.render,
            error: function (data) {
                Info.displayNotice(data.message || '服务器好像睡着了');
            }
        });

    },
    render: function (booking) {
        this.booking = booking;
        //render bookings
        this.$el.html(this.template(this.booking._toJSON()));
        this.bindEvents();
        var self = this;

    },
    bindEvents: function () {
        var that = this;

        /*去支付*/
        $("#bookingDetail").on('click', '.js_btnGoToPay', function () {
            app.navigate("mypage/booking/" + that.booking.id + "/pay", true);
        });
        $("#printBooking").on("click", function (e) {
            e.preventDefault();
            window.print();
        });
    },
    close: function () {
        if (!this.isClosed) {
            this.$el.empty();
            this.isClosed = true;
        }

    }
});