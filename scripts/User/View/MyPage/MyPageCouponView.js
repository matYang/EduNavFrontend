var MyPageCouponView = Backbone.View.extend({
    el: "#mypage_content",
    initialize: function () {
        _.bindAll(this, "render", "bindEvents", "close");
        this.template = _.template(tpl.get("mypage_coupons"));
        app.viewRegistration.register(this);
        this.user = app.sessionManager.sessionModel;
        this.isClosed = false;
        this.listName = "claimed";

        this.sr = new CouponSearchRepresentation();
        var self = this;
        app.userManager.fetchCoupons(this.sr, {
            success: self.render
            //todo need error callback
        });
    },
    render: function (coupons) {
        console.log(coupons);
        this.$el.append(this.template);
        var claimedCoupons = new Coupons(), expiredCoupons = new Coupons(), usedCoupons = new Coupons();
//        claimedCoupcoupons.nList").where({status: EnumConfig.CouponStatus.usae}));
//        expiredCoupcoupons..nList").where({status: EnumConfig.CouponStatus.inacte}));
//        usedCoupcoupons.onList").where({status: EnumConfig.CouponStatus.used}));
        this.bindEvents();
        this.expiredCouponView = new ExpiredCouponView(expiredCoupons, expiredCoupons);
        this.claimedCouponView = new ClaimedCouponView(claimedCoupons, claimedCoupons);
        this.usedCouponView = new UsedCouponView(usedCoupons, usedCoupons);
        this.expiredCouponView.hide();
        this.usedCouponView.hide();
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
        if (this.listName === "claimed") {
            this.claimedCouponView.show();
            this.expiredCouponView.hide();
            this.usedCouponView.hide();
        } else if (this.listName === "expired") {
            this.claimedCouponView.hide();
            this.expiredCouponView.show();
            this.usedCouponView.hide();
        } else {
            this.claimedCouponView.hide();
            this.expiredCouponView.hide();
            this.usedCouponView.show();
        }

    },
    close: function () {
        if (!this.isClosed) {
            if (this.expiredCouponView) {
                this.expiredCouponView.close();
            }
            if (this.claimedCouponView) {
                this.claimedCouponView.close();
            }
            this.expiredCouponView = null;
            this.claimedCouponView = null;
            this.$el.empty();
            this.isClosed = true;
        }
    }
});

var ExpiredCouponView = MultiPageView.extend({
    el: "#coupons_container",
    table: "#expiredTable",
    minHeight: 144,
    pageEntryNumber: 4,
    entryHeight: 36,
    extPn: true,
    initialize: function (allCoupons, coupons) {
        MultiPageView.prototype.initialize.call(this);
        this.template = _.template(tpl.get("mypage_couponExpired"));
        this.$el.append(this.template);
        this.messages = coupons;
        this.allMessages = allCoupons;
        this.entryTemplate = _.template(tpl.get("mypage_expiredCouponRow"));
        this.pageNumberClass = "searchResultPageNumber";
        this.pageNumberId = "couponPageNum";
        this.pageNavigator = "expiredCouponListNavigator";
        this.pageNavigatorClass = "page blank1 clearfix";
        this.user = app.sessionManager.sessionModel;
        this.actionClass = "claim";
        this.entryContainer = "expiredList";
        this.$domContainer = $("#expiredList");
        this.noMessage = _.template(tpl.get("expired_coupon_noMessage"));
        this.isClosed = false;
        var that = this;
        this.render();
        this.bindEvents();
    },
    render: function () {
        MultiPageView.prototype.render.call(this);
    },
    entryEvent: function (id) {
        $("#coup o n_act_" + id).val("激活中");
        app.userManager.claimCoupon(id, {
            "success": function () {
                $("#coup o n_act_" + id).parent().html("<span>已激活</span>");
            },
            "error": function () {
                $("#coup o n_act_" + id).val("重试");
            }
        });
    },
    bindEvents: function () {

    },
    show: function () {
        $("#expiredTable").removeClass("hidden");
        $("#expiredNoData").removeClass("hidden");
        $("#expiredCouponListNavigator").removeClass("hidden");

    },
    hide: function () {
        $("#expiredTable").addClass("hidden");
        $("#expiredNoData").addClass("hidden");
        $("#expiredCouponListNavigator").addClass("hidden");
    },
    close: function () {
        if (!this.isClosed) {
            this.isClosed = true;
            this.$el.empty();
        }
    }
});

var ClaimedCouponView = MultiPageView.extend({
    el: "#coupons_container",
    table: "#claimedTable",
    minHeight: 144,
    pageEntryNumber: 4,
    entryHeight: 36,
    extPn: true,
    initialize: function (allCoupons, coupons) {
        MultiPageView.prototype.initialize.call(this);
        this.template = _.template(tpl.get("mypage_couponClaimed"));
        this.$el.append(this.template);
        this.messages = coupons;
        this.allMessages = allCoupons;
        this.entryTemplate = _.template(tpl.get("mypage_claimedCouponRow"));
        this.pageNumberClass = "searchResultPageNumber";
        this.pageNumberId = "couponPageNum";
        this.pageNavigator = "claimedCouponListNavigator";
        this.pageNavigatorClass = "page blank1 clearfix";
        this.user = app.sessionManager.sessionModel;
        this.entryContainer = "claimedList";
        this.$domContainer = $("#claimedList");
        this.noMessage = _.template(tpl.get("claimed_coupon_noMessage"));
        this.isClosed = false;
        var that = this;
        this.render();
        this.bindEvents();
    },
    render: function () {
        MultiPageView.prototype.render.call(this);
    },
    bindEvents: function () {

    },
    show: function () {
        $("#claimedTable").removeClass("hidden");
        $("#claimedNoData").removeClass("hidden");
        $("#claimedCouponListNavigator").removeClass("hidden");
    },
    hide: function () {
        $("#claimedTable").addClass("hden");
        $("#claimedNoData").addClass("hidden");
        $("#claimedCouponListNavigator").addClass("hidden");

    },
    close: function () {
        if (!this.isClosed) {
            this.isClosed = true;
            this.$el.empty();
        }
    }
});

var UsedCouponView = MultiPageView.extend({
    el: "#coupons_container",
    table: "#usedTable",
    minHeight: 144,
    pageEntryNumber: 4,
    entryHeight: 36,
    extPn: true,
    entryTemplate: _.template(tpl.get("mypage_usedCouponRow")),
    template: _.template(tpl.get("mypage_couponUsed")),
    noMessage: _.template(tpl.get("used_coupon_noMessage")),
    initialize: function (allCoupons, coupons) {
        MultiPageView.prototype.initialize.call(this);
        this.$el.append(this.template);
        this.messages = coupons;
        this.allMessages = allCoupons;
        this.pageNumberClass = "searchResultPageNumber";
        this.pageNumberId = "couponPageNum";
        this.pageNavigator = "usedCouponListNavigator";
        this.pageNavigatorClass = "page blank1 clearfix";
        this.user = app.sessionManager.sessionModel;
        this.entryContainer = "usedList";
        this.$domContainer = $("#usedList");
        this.isClosed = false;
        var that = this;
        this.render();
        this.bindEvents();
    },
    render: function () {
        MultiPageView.prototype.render.call(this);
    },
    bindEvents: function () {

    },
    show: function () {
        $("#usedTable").removeClass("hidden");
        $("#usedNoData").removeClass("hidden");
        $("#usedCouponListNavigator").removeClass("hidden");
    },
    hide: function () {
        $("#usedTable").addClass("hden");
        $("#usedNoData").addClass("hidden");
        $("#usedCouponListNavigator").addClass("hidden");
    },
    close: function () {
        if (!this.isClosed) {
            this.isClosed = true;
            this.$el.empty();
        }
    }
});