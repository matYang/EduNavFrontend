var BookingDetailView = Backbone.View.extend({
    el: "#mypage_content",
    initialize: function (params) {
        this.isClosed = false;
        this.template = _.template(tpl.get("bookingDetail"));
        $("#viewStyle").attr("href", "style/css/booking.css");
        if (params.booking) {
            this.booking = params.booking;
            this.render(this.booking);
        } else if (params.bookingId){
            this.bookingId = params.bookingId;
            this.booking = user.get("bookings").get(params.bookingId);
            if (this.booking) {
                this.render(this.booking);
            } else {
                app.userManager.fetchUser({
                    success: this.render,
                });
            }
        }
    },
    render: function (booking) {
        if (booking instanceof User) {
            booking = booking.get("bookings").get(this.bookingId);
        }
        this.booking = booking;
        this.$el.append(this.template(this.booking));
    },
    bindEvents: function () {
        var that = this;
        $("#printBooking").on("click", function(){
            window.print();
        });
        $("#editBooking").on("click", function () {
            app.navigate("booking/b" + this.booking.get("reference"), true);
        });
        $("#cancelBooking").on("click", function () {
            var booking = that.booking.clone();
            booking.set("status", EnumConfig.BookingStatus.cancelled);
            app.userManager.changeBookingState(that.booking, {
                success: that.render,
                error: function(){}
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