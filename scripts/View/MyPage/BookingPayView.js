var BookingPayView = Backbone.View.extend({
    el: "#content",
    initialize: function (params) {
        this.isClosed = false;
        this.template = _.template(tpl.get("mypage_bookingPay"));
        _.bindAll(this, 'render', 'bindEvents', 'close');
        app.viewRegistration.register(this);
        if (params.bookingId) {
            this.bookingId = params.bookingId;
            this.user = app.sessionManager.sessionModel;
            app.userManager.fetchGroupBuyBooking(this.bookingId, {
                success: this.render,
                error: function (data) {
                    Info.displayNotice(data.message || '订单信息获取失败');
                }
            });
        }
    },
    render: function (groupBuyBooking) {
        document.title = "爱上课 | 订单支付";
        //todo 如果订单不可支付或者不为待支付状态 则进入个人中心页面
//        if (groupBuyBooking.get('type') !== EnumConfig.PayType.online || groupBuyBooking.get('status') !== 11) {
//            app.navigate("mypage", true);
//            return
//        }
        this.groupBuyBooking = groupBuyBooking;
        this.$el.append(this.template(this.groupBuyBooking._toJSON()));
        this.bindEvents();
    },
    bindEvents: function () {
        var that = this;
        //选择用银行支付或者用支付平台进行支付
        $('#bookingDetail .bank_list').on('click', 'li', function (e) {
            $('#bookingDetail .bank_list').find(".active").removeClass("active");
            var $this = $(this);
            $this.addClass("active");
            var paneId = $this.data('href');
            $(paneId).show();
            $(paneId).siblings().hide();
            //set active input checked
            //todo need to remove because input[type=radio] is grouped by 'name'
            $('#bookingDetail .bank_list li').find("input").prop("checked", false);
            $(this).find("input").prop("checked", true);
        });
        /*//具体选择某一个银行或者某一个平台的支付方式
         $('#pane_platform ul').on('click','li',function(e){
         var $this = $(this);
         $this.addClass('active');
         $this.siblings().removeClass('active');
         $this.find('input[name=payType]').prop('checked',true);
         });
         */
        //确认，去支付按钮
        that.$el.on("click", '#goToAlipay', function () {
            that.overlayBooking = new PayInfoModal({bookingId:that.bookingId});
            that.overlayBooking.show();
            //打开新标签页进行支付 location
            var payType = $('input[name=payType]:checked').val();
//            var url = '/api/v2/order/' + that.booking.id + '?type=' + payType;//原order
            var url = '/api/v2/groupBuy/' + that.bookingId + '/pay?type=' + payType;
            var s = window.open(url);
            //s.focus();
        });
        //显示更多
        $(".more-pay").on("click",function(){
            $("#more_bank").slideDown();
            $(this).hide();
        });
    },
    close: function () {
        if (!this.isClosed) {
            this.$el.off();
            this.$el.empty();
            this.isClosed = true;
            if (this.overlayBooking) {
                this.overlayBooking.close();
            }
        }
    }
});
