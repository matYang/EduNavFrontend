var BookingPayView = Backbone.View.extend({
    el: "#content",
    initialize: function (params) {
        this.notifier = new Backbone.Notifier();
        this.isClosed = false;
        this.template = _.template(tpl.get("mypage_bookingPay"));
        _.bindAll(this, 'render', 'bindEvents', 'close');
        app.viewRegistration.register(this);
        if (params.bookingId) {
            this.bookingId = params.bookingId;
            this.user = app.sessionManager.sessionModel;
            app.userManager.fetchBooking(this.bookingId, {
                success: this.render,
                error: function (data) {
                    Info.displayNotice(data.message||'订单信息获取失败');
                }
            });
        }
    },
    render: function (booking) {
        document.title = "爱上课 | 订单支付";
        if (booking instanceof Bookings) {
            booking = booking.at(0);
        }
        //如果订单不可支付或者不为待支付状态 则进入个人中心页面
        if (booking.get('type') !== EnumConfig.PayType.online || booking.get('status') !== 11) {
            app.navigate("mypage", true);
            return
        }
        this.booking = booking;
        this.$el.append(this.template(this.booking._toJSON()));
        this.bindEvents();
    },
    bindEvents: function () {
        var that = this;
        //选择用银行支付或者用支付平台进行支付
        $('#payTypeNav').on('click','li',function(e){
            $(e.delegateTarget).find(".active").removeClass("active");
            var $this = $(this);
            $this.addClass("active");
            var paneId = $this.data('href');
            $(paneId).show();
            $(paneId).siblings().hide();
            //set active input checked
            var $active = $(paneId).children('li.active');
            if($active.length>0){
                $active.find('input[name=payType]').prop('checked',true);
            }else{
                $(paneId).children('li:first-child').addClass('active');
            }
        });
        //具体选择某一个银行或者某一个平台的支付方式
        $('#pane_payType').on('click','li',function(e){
            var $this = $(this);
            $this.addClass('active');
            $this.siblings().removeClass('active');
            $this.find('input[name=payType]').prop('checked',true);
        });

        //确认，去支付按钮
        $("#goToAlipay").on("click", function () {
            /*//打开对话框 btn支付成功 btn支付遇到问题
            that.payResultModel = that.notifier.notify({
                fadeInMs: 0,
                fadeOutMs: 0,
                message: "<h1 class='title text-primary'>请您在新开的页面完成付款</h1>" +
                    "<p>完成付款前请不要关闭此窗口</p>" +
                    "<p>完成付款后请根据您的付款情况点击以下按钮</p>",
                buttons: [
                    {'data-role': 'failed', text: '支付遇到问题', class: 'btn btn-default'},
                    {'data-role': 'success', text: '支付成功', 'class': 'btn btn-primary'}
                ],
                modal: true,
                position: 'center',
                ms: null,
                width:'500'
            })
                .on('click:success', function () {
                    app.navigate("mypage/booking/" + that.bookingId, true);
                })
                .on('click:failed', function () {
                    app.navigate("mypage/booking/" + that.bookingId, true);
                });
            //打开新标签页进行支付 location
            var payType = $('input[name=payType]:checked').val();
            var url = '/api/v2/order/' + that.booking.id+'?type='+payType;
            var s = window.open(url);
            s.focus();*/
            if (!this.overlayBooking) {
                this.overlayBooking = new OverlayBooking();
            } else if (this.overlayBooking.isClosed) {
                this.overlayBooking.render();
            }
            $("#overlay_booking .btnfalse").on("click",function(){
                app.navigate("mypage/booking/" + that.bookingId, true);
                $("#overlay_booking").remove();
            });
            $("#overlay_booking .btnsuccess").on("click",function(){
                app.navigate("mypage/booking/" + that.bookingId, true);
                $("#overlay_booking").remove();
            });
            //打开新标签页进行支付 location
            var payType = $('input[name=payType]:checked').val();
            var url = '/api/v2/order/' + that.booking.id+'?type='+payType;
            var s = window.open(url);
            s.focus();
        });
    },
    close: function () {
        if (!this.isClosed) {
            this.notifier = null;
            this.$el.empty();
            this.isClosed = true;
            //this.overlayBooking.close();
            if (this.payResultModel) {
                this.payResultModel.destroy();
            }

        }

    }
});

/*支付未跳转页面View*/
var OverlayBooking = Backbone.View.extend({
    el: "#overlayCourse",//借用课程那个弹出框的div
    template: _.template(tpl.get("overlayBooking")),
    initialize: function () {
        this.isClosed = false;
        this.isShow=false;
        _.bindAll(this, "render", "bindEvents", "close");
        app.viewRegistration.register(this);
        this.render();

    },
    render: function () {
        this.$el.html(this.template());
        this.bindEvents();
    },

    bindEvents: function () {
        var that = this;

    },

    close: function () {
        if (!this.isClosed) {
            this.$el.off();
            this.$el.empty();
            this.isClosed = true;
        }
    }
});
