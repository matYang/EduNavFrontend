var MyPageCouponView = Backbone.View.extend({
    el: "#mypage_content",
    initialize: function () {
        _.bindAll(this, "render", "bindEvents", "close");
        this.template = _.template(tpl.get("mypage_coupons"));
        app.viewRegistration.register(this);
        this.user = app.sessionManager.sessionModel;
        this.isClosed = false;
        this.listName = "usable";

        this.usableSr = new CouponSearchRepresentation();
        this.gotSr = new CouponSearchRepresentation();
        var self = this;
        //todo first fetch then render
        app.userManager.fetchCoupons(this.sr, {
            success: self.render
            //todo need error callback
        });
    },
    render: function (coupons) {
        this.$el.append(this.template);
        this.bindEvents();
        this.usableCouponView = new UsableCouponView();
        this.gotCouponView = new GotCouponView();
        this.gotCouponView.hide();
    },
    bindEvents: function () {
        var that = this;
        //tab按钮点击事件
        $("#couponNavBtn").on("click", "li", function (e) {
            $(e.delegateTarget).find(".active").removeClass("active");
            $(e.target).addClass("active");
            that.switchView($(e.target).data("id"));
        });
    },
    switchView: function (name) {
        if (this.listName === name) return;
        this.listName = name;
        if (this.listName === "usable") {
            this.usableCouponView.show();
            this.gotCouponView.hide();
        } else if (this.listName === "got") {
            this.usableCouponView.hide();
            this.gotCouponView.hide();
        }

    },
    close: function () {
        if (!this.isClosed) {
            if (this.gotCouponView) {
                this.gotCouponView.close();
            }
            if (this.usableCouponView) {
                this.usableCouponView.close();
            }
            this.usableCouponView = null;
            this.$el.empty();
            this.isClosed = true;
        }
    }
});


var UsableCouponView = MultiPageView3.extend({
    entryContainer:'usableList',
    el: "#coupons_container",
    table: "#usableTable",
    minHeight: 144,
    pageEntryNumber: 4,
    entryHeight: 36,
    entryTemplate: _.template(tpl.get("mypage_usableCouponRow")),
    template: _.template(tpl.get("mypage_couponUsable")),
    noMessage: _.template(tpl.get("usable_coupon_noMessage")),
    initialize: function (allCoupons, coupons) {
        this.$el.append(this.template);
        MultiPageView3.prototype.initialize.call(this);

        this.messages = coupons;
        this.allMessages = allCoupons;
        this.pageNumberClass = "searchResultPageNumber";
        this.pageNumberId = "couponPageNum";
        this.pageNavigator = "usableCouponListNavigator";
        this.pageNavigatorClass = "page blank1 clearfix";
        this.user = app.sessionManager.sessionModel;
        this.$domContainer = $("#usableList");
        this.isClosed = false;
        var that = this;
        this.render();
        this.bindEvents();
    },
    render: function () {
        MultiPageView3.prototype.render.call(this);
    },
    bindEvents: function () {

    },
    show: function () {
        $("#usableTable").removeClass("hidden");
        $("#usableNoData").removeClass("hidden");
        $("#usableCouponListNavigator").removeClass("hidden");
    },
    hide: function () {
        $("#usableTable").addClass("hidden");
        $("#usableNoData").addClass("hidden");
        $("#usableCouponListNavigator").addClass("hidden");

    },
    close: function () {
        if (!this.isClosed) {
            this.isClosed = true;
            this.$el.empty();
        }
    }
});

var GotCouponView = MultiPageView3.extend({
    entryContainer:'gotList',
    el: "#coupons_container",
    table: "#gotTable",
    minHeight: 144,
    pageEntryNumber: 4,
    entryHeight: 36,
    entryTemplate: _.template(tpl.get("mypage_gotCouponRow")),
    template: _.template(tpl.get("mypage_couponGot")),
    noMessage: _.template(tpl.get("got_coupon_noMessage")),
    initialize: function (allCoupons, coupons) {
        this.$el.append(this.template);
        MultiPageView3.prototype.initialize.call(this);
        this.messages = coupons;
        this.allMessages = allCoupons;
        this.pageNumberClass = "searchResultPageNumber";
        this.pageNumberId = "couponPageNum";
        this.pageNavigator = "gotCouponListNavigator";
        this.pageNavigatorClass = "page blank1 clearfix";
        this.user = app.sessionManager.sessionModel;
        this.$domContainer = $("#gotList");
        this.isClosed = false;
        var that = this;
        this.render();
        this.bindEvents();
    },
    render: function () {
        MultiPageView3.prototype.render.call(this);
    },
    bindEvents: function () {

    },
    show: function () {
        $("#gotTable").removeClass("hidden");
        $("#gotNoData").removeClass("hidden");
        $("#gotCouponListNavigator").removeClass("hidden");
    },
    hide: function () {
        $("#gotTable").addClass("hden");
        $("#gotNoData").addClass("hidden");
        $("#gotCouponListNavigator").addClass("hidden");
    },
    close: function () {
        if (!this.isClosed) {
            this.isClosed = true;
            this.$el.empty();
        }
    }
});