var BookingDetailView = Backbone.View.extend({
    el: "#mypage_content",
    template: _.template(tpl.get("mypage_bookingDetail")),
    processContainer: '#process',
    processTemplate: _.template(tpl.get("mypage_bookingDetailFlow")),
    historyContainer: '#bookingHistories',
    historyTemplate: _.template(tpl.get("mypage_bookingDetailHistory")),
    initialize: function (params) {
        this.isClosed = false;
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
        this.booking = booking;
        //处于以下状态时页面不显示状态图和流程说明
        var noShowList = [1, 2, 5, 9, 23, 12, 14, 15, 20, 21], show = 1;
        if (booking.get('status') in noShowList) {
            show = 0;
        }
        this.$el.append(this.template(_.extend(this.booking._toJSON(), {show: show})));
        this.bindEvents();
        var self = this;
        if (show === 1) {
            this.renderFlow(booking.get('status'), booking.get('type'));//生成处理流程图
            app.userManager.fetchBookingHistories(this.bookingId, {
                success: function (bookingHistories) {
                    var $historyContainer = $(self.historyContainer);
                    $historyContainer.html(self.historyTemplate({histories: bookingHistories.toJSON()}));
                    $historyContainer.children('p').last().addClass('active');
                },
                error: function (data) {
                    if (data.responseJSON && data.responseJSON.message !== undefined) {
                        Info.displayNotice(data.responseJSON.message);
                    }
                }
            });
        }

    },
    renderFlow: function (bookingStatus, bookingType) {
        var statusMap = {
                0: 'wait',
                1: 'doing',//only node 2,4,6,8 has 'doing' status
                2: 'ready'
            },
            statusList = [0, 0, 0, 0, 0, 0, 0, 0, 0],
            statusCompare = [
                [0],
                [11],
                [3],
                [4, 6, 13],
                [7, 16],
                [],
                [8],
                [10, 17],
                [24, 18]
            ];

        var currentNodeIndex = 0;
        //Step 1 find the current node set it to 'doing' or 'ready'
        for (var index = 0; index < statusCompare.length; index++) {
            if (statusCompare[index].indexOf(bookingStatus)!==-1) {
                currentNodeIndex = index;
                break;
            }
        }
        statusList[currentNodeIndex] = (currentNodeIndex + 1) % 2 === 0 ? 1 : 2;//index is from 0
        //Step 2 set the pre nodes to 'ready'
        // also can set in step 1 but then if no status matches(for exception issue) it will be all 'ready'
        // here it will just be all 'wait'
        for (var i = 0; i < currentNodeIndex; i++) {
            statusList[i] = 2;
        }
        //Step 3 map the array
        statusList = statusList.map(function (val) {
            return statusMap[val];
        });
        //Step 4 render the template
        $(this.processContainer).html(this.processTemplate({statuses: statusList, bookingType: bookingType}))

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
                    if (operate === 'offlineCancel' || operate === 'onlineCancel') {
                        $("#process").html("<p>订单已取消</p>");
                    } else if (operate === 'offlineDelayed') {
                        $("#process").html("<p>已推迟</p>");
                    } else {
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