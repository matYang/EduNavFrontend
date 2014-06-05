var AdminBookingView = BaseFormView.extend({
	el: "#bookingCRUDContainer",
    fields: [],
    form: true,
    formElem: "adminBookingForm",
    submitButtonId: "bookingPostSubmit",
    callback: "uploadTarget",
    initialize: function(params){
        _.bindAll(this, "render", "bindEvents", "close");
        BaseFormView.prototype.initialize.call(this);
        app.viewRegistration.register("adminBooking", this, true);
        params = params || {};
        var apis = new AdminApiResource();
        this.template = _.template(tpl.get("adminBooking"));
        this.action = apis.admin_booking;
        if (params.booking) {
            this.render(params.booking);
        } else if (params.bookingId) {
            app.generalManager.getBooking(params.bookingId, {
                success: this.render,
                error: function() {
                    app.navigate("manage/booking", true);
                }
            });
        }
    },

    render: function (booking) {
        this.booking = booking;
        this.$el.append(this.template(booking.toJSON()));
        $("#adminBookingForm").find(".edit").hide();
        $("#adminBookingForm").find(".detail").show();
        $("#searchResult").addClass("hidden");
        this.bindEvents();
    },

    bindEvents: function () {
        var that = this;
        BaseFormView.prototype.bindEvents.call(this);
        $("#cancel").on("click", function () {
            $("#adminBookingForm").find("input").val("");
            $("#adminBookingForm").find(".edit").hide();
            $("#adminBookingForm").find(".detail").show();   
        });
        $("#editBooking").on("click", function () {
            $("#adminBookingForm").find(".edit").show();
            $("#adminBookingForm").find(".detail").hide(); 
        });
    },  
    successCallback: function () {
        app.navigate("manage/booking", true);
    },
    close: function () {
        if (!this.isClosed) {
            this.isClosed = false;
            this.$el.empty();
        }
    }
});