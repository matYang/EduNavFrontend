var BookingPayView = Backbone.View.extend({
    el: "#content",
    initialize: function (params) {
        this.isClosed = false;
        this.template = _.template(tpl.get("mypage_bookingPay"));
//        this.pay_info = _.template(tpl.get("mypage_bookingPay"));
        _.bindAll(this, 'render', 'bindEvents', 'close');
        app.viewRegistration.register(this);
        if (params.bookingId) {
            this.bookingId = params.bookingId;
            this.user = app.sessionManager.sessionModel;
            app.userManager.fetchBooking(this.bookingId, {
                success: this.render,
                error: function (data) {
                    Info.displayNotice(data.responseJSON.message);
                }
            });
        }
    },
    render: function (booking) {
        if (booking instanceof Bookings) {
            booking = booking.at(0);
        }
        this.booking = booking;
        this.$el.append(this.template(this.booking._toJSON()));
        this.bindEvents();
    },
    bindEvents: function () {
        var that = this;
        //确认，去支付按钮
        $("#goToAlipay").on("click", function () {
            //todo 打开对话框 btn支付成功 btn支付遇到问题

            //todo 打开新标签页 location
            var url = '/api/v2/order/bookingId=' + that.booking.id;
            var s = window.open(url);
            console.dir(s.focus);
            s.focus();
        });
    },
    close: function () {
        if (!this.isClosed) {
            this.$el.empty();
            this.isClosed = true;
        }

    }
});