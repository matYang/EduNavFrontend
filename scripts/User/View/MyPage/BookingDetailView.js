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
        $("#bookingDetail").on('click','.js_btnGoToPay',function(){
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
        $("#cancelBooking").on("click", function () {
            var booking = that.booking.clone();
            booking.set("status", EnumConfig.BookingStatus.cancelled);
            $("#cancelBooking").val("取消中...");
            app.userManager.changeBookingState(booking, {
                success: function (booking) {
                    var status;
                    $("#process").html("<p>订单已取消</p>");
                    if (booking.status !== undefined) {
                        status = parseInt(booking.status, 10);
                    } else {
                        status = 12
                    }
                    $("#bookingStatus").html(EnumConfig.BookingStatusText[status]);
                    $("#cancelBooking").remove();
                    $("#editBooking").remove();
                },
                error: function (data) {
                    $("#cancelBooking").val("取消失败，请重试");
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