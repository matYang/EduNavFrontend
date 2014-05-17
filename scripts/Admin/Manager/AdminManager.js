(function () {
    'use strict';


    this.AdminManager = function(sessionManager, userManager){

        this.apis = new ApiResource();

        this.sessionManager = sessionManager;
        this.userManager = userManager;

        this.timeStamp = new Date();

        this.sessionManager.resgisterManager(this);

    };


    AdminManager.prototype.release = function() {
        this.timeStamp = new Date();
    };


    AdminManager.prototype.fetchBookings = function(bookingId, callback) {
        if (typeof bookingId !== 'number' ){
            Constants.dWarn("BookingManager::fetchBooking:: invalid parameter");
            return;
        }
        if (!this.sessionManager.hasSession()){
            Constants.dWarn("BookingManager::fetchBooking:: session does not exist, exit");
            return;
        }

        var self = this;

        var booking = new Booking();
        booking.overrideUrl(this.apis.booking_booking);
        booking.set('bookingId', bookingId);

        booking.fetch({
            data: $.param({ 'userId': this.sessionManager.getUserId()}),
            dataType:'json',

            success:function(model, response){
                self.timeStamp = new Date();
                if(callback){
                    callback.success(booking);
                }
            },

            error: function(model, response){
                Constants.dWarn("BookingManager::fetchBooking:: fetch failed with response:");
                Constants.dLog(response);
                if(callback){
                    callback.error(response);
                }
            }
        });
    };

}).call(this);