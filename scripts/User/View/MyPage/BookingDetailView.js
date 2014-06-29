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
        } else if (params.reference){
            this.reference = params.reference;
            this.user = app.sessionManager.sessionModel;
            this.booking = this.user.get("bookingList").findBookingByReference(params.reference);
            if (this.booking) {
                this.render(this.booking);
            } else {
                this.sr = new BookingSearchRepresentation();
                this.sr.set("reference", this.reference);
                app.userManager.fetchBookings(this.sr, {
                    success: this.render,
                    error: function () {}
                });
            }
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
            app.userManager.changeBookingState(that.booking, {
                success: function(){
                    $("#process").html("<p>订单已取消</p>");
                    $("#cancelBooking").remove();
                    $("#editBooking").remove();
                },
                error: function(){
                    $("#cancelBooking").val("取消失败，请重试");
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