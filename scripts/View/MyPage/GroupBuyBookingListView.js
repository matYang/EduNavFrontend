var GroupBuyBookingListView = MultiPageView.extend({
    entryContainer: "bookingSummary tbody",
    actionClass: "viewDetail",
    pageNavigator: "bookingNavigator",
    pageEntryNumber: 8,
    noMessage: _.template(tpl.get("booking_noMessage")),
    $domContainer: null,
    el: "#bookingSummary",
    scrollTarget: '.scrollTarget',
    bookingSr: new GroupBuyBookingSearchRepresentation(),
    initialize: function (bookingSr) {
        //初始化过滤条件
        this.bookingSr = bookingSr;
        MultiPageView.prototype.initialize.call(this);
        this.entryTemplate = _.template(tpl.get("groupBuyBooking_entry"));
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

            if (self.bookingSr.get("start") === undefined)// localStorage中不存在缓存
                self.bookingSr.set("start", 0);// 则设置默认的start为0
        } else {
            self.bookingSr.set("start", (pageIndex - 1) * self.pageEntryNumber);
        }
        self.bookingSr.set("count", self.pageEntryNumber);
        self.currentPage = self.bookingSr.get('start') / self.pageEntryNumber + 1;
        $("#bookingSummary tbody").empty().append("<tr><td colspan='6'><div class='loading'></div></td></tr>");
        app.userManager.fetchGroupBuyBookings(self.bookingSr, {
            success: self.render,
            error: self.renderError
        });
    },
    render: function (data) {
        this.messages = data || new Bookings();
        //这里进行数据的显示
        MultiPageView.prototype.render.call(this);
    },
    renderError: function (data) {
        if (!this.isClosed) {
            Info.displayNotice(data.message || "订单页面加载失败，请稍后重试。");
        }
    },

    entryEvent: function (id) {
        app.navigate("mypage/booking/" + id, true);
    },
    bindEvents: function () {
        var self = this;
        $("#bookingSummary").on("click", ".js_btn_operate", function (e) {

            var $target = $(e.target);
            var bookingId = $target.data('id');
            if (!bookingId) {
                return
            }
            var operate = $target.data('action');
            $target.val("更改中...");
            app.userManager.changeBookingState(bookingId, operate, {
                success: function (booking) {
                    //这里统一修改为 刷新整个页面 订单的状态转移会导致订单在该页的移除
                    app.userManager.fetchBookings(self.bookingSr, {
                        success: self.render,
                        error: self.renderError
                    });
                },
                error: function (data) {
//                    $target.html("操作失败，请重试");
                    Info.displayNotice(data.message || '服务器好像睡着了');
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