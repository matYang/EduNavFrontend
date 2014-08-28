var BookingListView = MultiPageView3.extend({
    entryContainer: "bookingSummary tbody",
    actionClass: "bookingTitle",
    pageNavigator: "bookingNavigator",
    pageEntryNumber: 8,
    pageNumberClass: "bookingPage",
    pageNumberId: "bookingPage",
    entryRowNum: 1,
    entryHeight: 106,
    noMessage: _.template(tpl.get("booking_noMessage")),
    $domContainer: null,
    el: "#bookingSummary",
    scrollTarget:'#scrollTarget',
    bookingSr:new BookingSearchRepresentation(),
    initialize: function (bookingSr) {
        //初始化过滤条件
        this.bookingSr = bookingSr;
        MultiPageView3.prototype.initialize.call(this);
        this.entryTemplate = _.template(tpl.get("booking_entry"));
        app.viewRegistration.register(this);
        this.isClosed = false;

        this.bindEvents();
        this.fetchAction();
    },
    //以下在toPage(点击分页按钮)中调用 doRefresh()
    fetchAction: function (pageIndex) {
        var self = this;
        //根据过滤条件(包括分页信息)重新获取数据
        if (pageIndex === undefined) {// 未传入参数

            if(self.bookingSr.get("start") === undefined)// localStorage中不存在缓存
                self.bookingSr.set("start", 0);// 则设置默认的start为0
        } else {
            self.bookingSr.set("start", (pageIndex - 1) * self.pageEntryNumber);
        }
        self.bookingSr.set("count", self.pageEntryNumber);
        //这儿start和pageIndex转来转去的是要体现数学很好..
        self.currentPage = self.bookingSr.get('start')/self.pageEntryNumber +1;
        $("#bookingSummary tbody").empty().append("<tr><td colspan='4'><div class='loading'></div></td></tr>");
        app.userManager.fetchBookings(self.bookingSr, {
            success: self.render,
            error: self.renderError
        });
    },
    render: function (data) {
        this.messages= data || new Bookings();
        //这里进行数据的显示
        MultiPageView3.prototype.render.call(this);
    },
    renderError: function (data) {
        if (!this.isClosed) {
            Info.displayNotice(data.responseJSON.message ? data.responseJSON.message : "订单页面加载失败，请稍后重试。");
        }
    },

    entryEvent: function (id) {
        app.navigate("mypage/booking/" + id, true);
    },
    bindEvents:function(){
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
    },
    close: function () {
        if (!this.isClosed) {
            this.$el.empty();
            this.isClosed = true;
        }
    }
});