var BookingDetailView = Backbone.View.extend({
    el: "#mypage_content",
    initialize: function (params) {
        this.isClosed = false;
        this.template = _.template(tpl.get("mypage_bookingDetail"));
        _.bindAll(this, 'render', 'bindEvents', 'close');
        app.viewRegistration.register(this);
        if (params.booking) {//如果参数为booking对象则直接render
            this.booking = params.booking;
            this.render(this.booking);
        } else if (params.bookingId) {
            //根据参数中的bookingId拉取课程进行初始化
            this.bookingId = params.bookingId;
            this.user = app.sessionManager.sessionModel;

            app.userManager.fetchBooking(this.bookingId, {
                success: this.render,
                error: function (data) {
                    if (data.responseJSON.message !== undefined) {
                        Info.displayNotice(data.responseJSON.message);
                    }
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

        /*去支付*/
        $("#bookingDetail").on('click', '.js_btnGoToPay', function () {
            app.navigate("mypage/booking/" + that.booking.id + "/pay", true);
        });
        $("#printBooking").on("click", function (e) {
            e.preventDefault();
            window.print();
        });
        /*
         $("#editBooking").on("click", function () {
         app.navigate("booking/b"+that.booking.get("reference"), true);
         });*/
        $(".btns").on("click", ".js_btn_operate", function (e) {
            var $target = $(e.target);
            var bookingId = that.booking.id;
            var operate = $target.data('action');
            $target.val("更改中...");
            app.userManager.changeBookingState(bookingId, operate, {
                success: function (booking) {
                    var status;
                    if(operate === 'offlineCancel'||operate === 'onlineCancel'){
                        $("#process").html("<p>订单已取消</p>");
                    }else if(operate === 'offlineDelayed'){
                        $("#process").html("<p>已推迟</p>");
                    }else{
                        $("#process").html("<p>操作成功</p>");
                    }

                    $target.html(EnumConfig.BookingStatusText[booking.status]);
                    //TODO 这里进行了推迟操作以后是否可以继续取消订单 操作部分的刷新后续需要单独提取出来模板进行render
                    //这里暂时先将所有的操作按钮移除
                    $(".js_btn_operate").remove();
                },
                error: function (data) {
                    $target.val("操作失败，请重试");
                    if (data) {
                        Info.displayNotice(data.responseJSON.message);
                    }
                }
            });
        });
    },
    close: function () {
        if (!this.isClosed) {
            this.$el.empty();
            this.isClosed = true;
        }

    }
});