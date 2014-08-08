var BookingDetailView = Backbone.View.extend({
    el: "#mypage_content",
    initialize: function (params) {
        this.isClosed = false;
        this.template = _.template(tpl.get("mypage_bookingDetail"));
        _.bindAll(this, 'render', 'bindEvents', 'close');
        app.viewRegistration.register(this);
        if (params.booking) {
            this.booking = params.booking;
            this.render(this.booking);
        } else if (params.reference) {
            //todo better to change 'reference' to 'bookingId' if use 'bookingId' instead to get booking detail info
            this.boookingId = params.reference;
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
                success: function () {
                    $("#process").html("<p>订单已取消</p>");
                    $("#bookingStatus").html(EnumConfig.BookingStatusText[2]);
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