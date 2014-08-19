var BookingPayView = Backbone.View.extend({
    el: "#content",
    initialize: function (params) {
        this.notifier = new Backbone.Notifier();
        this.isClosed = false;
        this.template = _.template(tpl.get("mypage_bookingPay"));
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
        document.title = "爱上课 | 订单支付";
        if (booking instanceof Bookings) {
            booking = booking.at(0);
        }
//        //如果订单不可支付或者不为待支付状态 则进入个人中心页面
//        if (booking.type !== EnumConfig.PayType.online || booking.get('status') !== 11) {
//            app.navigate("mypage", true);
//        }
        this.booking = booking;
        this.$el.append(this.template(this.booking._toJSON()));
        this.bindEvents();
    },
    bindEvents: function () {
        var that = this;
        //确认，去支付按钮
        $("#goToAlipay").on("click", function () {
            //打开对话框 btn支付成功 btn支付遇到问题
            that.payResultModel = that.notifier.notify({
                fadeInMs: 0,
                fadeOutMs: 0,
                message: "<h1 class='title text-primary'>请您在新开的页面完成付款</h1>" +
                    "<p>完成付款前请不要关闭此窗口</p>" +
                    "<p>完成付款后请根据您的付款情况点击以下按钮</p>",
                buttons: [
                    {'data-role': 'failed', text: '支付遇到问题', class: 'btn btn-default'},
                    {'data-role': 'success', text: '支付成功', 'class': 'btn btn-primary'}
                ],
                modal: true,
                position: 'center',
                ms: null,
                destroy: false
            })
                .on('click:success', function () {
                    app.navigate("mypage/booking/" + that.bookingId, true);
                })
                .on('click:failed', function () {
                    app.navigate("mypage/booking/" + that.bookingId, true);
                });
            //打开新标签页进行支付 location
            var url = '/api/v2/order/' + that.booking.id;
            var s = window.open(url);
            s.focus();
        });
    },
    close: function () {
        if (!this.isClosed) {
            this.$el.empty();
            this.isClosed = true;
            if (this.payResultModel) {
                this.payResultModel.destroy();
            }

        }

    }
});