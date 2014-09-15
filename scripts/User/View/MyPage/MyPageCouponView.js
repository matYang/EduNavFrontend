/*我的优惠券*/
var MyPageCouponView = Backbone.View.extend({
    el: "#mypage_content",
    initialize: function () {
        _.bindAll(this, "render", "bindEvents", "close");
        this.template = _.template(tpl.get("mypage_coupons"));
        app.viewRegistration.register(this);
        this.user = app.sessionManager.sessionModel;
        this.isClosed = false;
        this.render();
    },
    render: function () {
        this.$el.append(this.template);
        this.listName = "usable";
        this.childView = new UsableCouponView();
        this.bindEvents();

    },
    bindEvents: function () {
        var that = this;
        $("#couponNavBtn").on("click", "li", function (e) {
            $(e.delegateTarget).find(".active").removeClass("active");
            $(e.target).addClass("active");
            that.switchView($(e.target).data("id"));
        });
        //todo #js_go_couponUsable
    },
    switchView: function (name) {
        if (this.listName === name) return;
        this.listName = name;
        if (this.listName === "usable") {
            this.childView.close();
            this.childView = new UsableCouponView();
        } else if (this.listName === "got") {
            this.childView.close();
            this.childView = new GotCouponView();
        }
    },
    close: function () {
        if (!this.isClosed) {
            if (this.childView) {
                this.childView.close();
            }
            this.childView = null;
            this.$el.empty();
            this.isClosed = true;
        }
    }
});


var UsableCouponView = MultiPageView.extend({
    entryContainer:'usableList',
    el: "#coupons_container",
    table: "#usableTable",
    pageEntryNumber: 8,
    entryTemplate: _.template(tpl.get("mypage_usableCouponRow")),
    template: _.template(tpl.get("mypage_couponUsable")),
    noMessage: _.template(tpl.get("usable_coupon_noMessage")),
    scrollTarget:'#couponNavBtn',
    initialize: function () {
        this.$el.append(this.template);
        MultiPageView.prototype.initialize.call(this);
        this.pageNavigator = "usableCouponListNavigator";
        this.user = app.sessionManager.sessionModel;
        this.isClosed = false;

        this.sr = new CouponSearchRepresentation();
        this.sr.set('status',EnumConfig.CouponStatus.usable);
        this.sr.set('balanceStart',0.01);
        this.fetchAction();
    },
    //以下在toPage(点击分页按钮)中调用 doRefresh()
    fetchAction: function (pageIndex) {
        var self = this;
        //根据过滤条件(包括分页信息)重新获取数据
        if (pageIndex === undefined) {
            self.sr.set("start", 0);
        } else {
            self.sr.set("start", (pageIndex - 1) * this.pageEntryNumber);
        }
        this.sr.set("count", this.pageEntryNumber);
        this.currentPage = this.sr.get('start')/this.pageEntryNumber +1;
        $('#'+this.entryContainer).empty().append("<tr><td colspan='4'><div class='loading'></div></td></tr>");

        app.userManager.fetchCoupons(this.sr, {
            success: self.render,
            error: this.renderError
        });
    },
    render: function (data) {
        this.messages = data || new Bookings();
        MultiPageView.prototype.render.call(this);
    },
    renderError:function(){
      //todo error handler
    },
    close: function () {
        if (!this.isClosed) {
            this.isClosed = true;
            this.$el.empty();
        }
    }
});

var GotCouponView = MultiPageView.extend({
    entryContainer:'gotList',
    el: "#coupons_container",
    table: "#gotTable",
    pageEntryNumber: 2,
    entryTemplate: _.template(tpl.get("mypage_gotCouponRow")),
    template: _.template(tpl.get("mypage_couponGot")),
    noMessage: _.template(tpl.get("got_coupon_noMessage")),
    scrollTarget:'#couponNavBtn',
    initialize: function () {
        this.$el.append(this.template);
        MultiPageView.prototype.initialize.call(this);
        this.pageNavigator = "gotCouponListNavigator";
        this.user = app.sessionManager.sessionModel;
        this.isClosed = false;
        this.sr = new CouponSearchRepresentation();
        this.fetchAction();
    },
    //以下在toPage(点击分页按钮)中调用 doRefresh()
    fetchAction: function (pageIndex) {
        var self = this;
        //根据过滤条件(包括分页信息)重新获取数据
        if (pageIndex === undefined) {
            self.sr.set("start", 0);
        } else {
            self.sr.set("start", (pageIndex - 1) * this.pageEntryNumber);
        }
        this.sr.set("count", this.pageEntryNumber);
        this.currentPage = this.sr.get('start')/this.pageEntryNumber +1;
        $('#'+this.entryContainer).empty().append("<tr><td colspan='4'><div class='loading'></div></td></tr>");

        app.userManager.fetchCoupons(this.sr, {
            success: self.render,
            error: this.renderError
        });
    },
    render: function (data) {
        this.messages = data || new Bookings();
        MultiPageView.prototype.render.call(this);
    },
    renderError:function(){
        //todo error handler
    },
    close: function () {
        if (!this.isClosed) {
            this.isClosed = true;
            this.$el.empty();
        }
    }
});