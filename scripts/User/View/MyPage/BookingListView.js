var BookingListView = MultiPageView.extend({
    entryContainer: "bookingSummary",
    entryClass: "bookingEntry",
    actionClass: "bookingTitle",
    pageNavigator: "bookingNavigator",
    pageNavigatorClass: "page blank1 clearfix",
    pageEntryNumber: 8,
    pageNumberClass: "bookingPage",
    pageNumberId: "bookingPage",
    entryRowNum: 1,
    entryHeight: 106,
    noMessage: _.template(tpl.get("booking_noMessage")),
    $domContainer: null,
    el: "#bookingSummary",
    initialize: function (allMessages, messages) {
        MultiPageView.prototype.initialize.call(this);
        this.allMessages = allMessages;
        this.messages = messages;
        this.entryTemplate = _.template(tpl.get("booking_entry"));
        app.viewRegistration.register(this);
        this.isClosed = false;
        this.render();
    },
    render: function () {
        $("#bookingSummary").on("click", ".js_btn_operate", function (e) {
            var $target = $(e.target);
            var bookingId = $target.data('id');
            var operate = $target.data('action');
            $("#cancelBooking").val("更改中...");
            app.userManager.changeBookingState(bookingId, operate, {
                success: function (booking) {
                    var status;
                    if(operate === 'offlineCancel'||operate === 'onlineCancel'){
                        $target.html("<p>已取消</p>");
                    }else if(operate === 'offlineDelayed'){
                        $target.html("<p>已推迟</p>");
                    }else{
                        $target.html("<p>操作成功</p>");
                    }

                    $("#bookingStatus").html(EnumConfig.BookingStatusText[booking.status]);
                    //TODO 这里进行了推迟操作以后是否可以继续取消订单 操作部分的刷新后续需要单独提取出来模板进行render
                    $target.unbind('click');
                },
                error: function (data) {
                    $target.val("操作失败，请重试");
                    if (data) {
                        Info.displayNotice(data.responseJSON.message);
                    }
                }
            });
        });
        MultiPageView.prototype.render.call(this);
    },
    entryEvent: function (id) {
        app.navigate("mypage/booking/" + id, true);
    },
    close: function () {
        if (!this.isClosed) {
            this.$el.empty();
            this.isClosed = true;
        }
    }
});