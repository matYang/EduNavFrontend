var MyPageCouponView = Backbone.View.extend({
    el:"#mypage_content",
    initialize: function () {
        _.bindAll(this, "render", "bindEvents", "close");
        this.template = _.template(tpl.get("mypage_coupons"));
        app.viewRegistration.register(this);
        this.user = app.sessionManager.sessionModel;
        this.isClosed = false;
        this.listName = "claimed";
        this.render();
        this.bindEvents();
    },
    render: function () {
        this.$el.append(this.template);
        var claimedCoupons = new Coupons(), unclaimedCoupons = new Coupons(), usedCoupons = new Coupons();
        claimedCoupons.add(this.user.get("couponList").where({status: EnumConfig.CouponStatus.usable}));
        unclaimedCoupons.add(this.user.get("couponList").where({status: EnumConfig.CouponStatus.inactive}));
        usedCoupons.add(this.user.get("couponList").where({status: EnumConfig.CouponStatus.used}));
        this.unclaimedCouponView = new UnclaimedCouponView(unclaimedCoupons, unclaimedCoupons);
        this.claimedCouponView = new ClaimedCouponView(claimedCoupons, claimedCoupons);
        this.usedCouponView = new UsedCouponView(usedCoupons, usedCoupons);
        this.unclaimedCouponView.hide();
        this.usedCouponView.hide();
    },
    bindEvents: function () {
        var that = this;
        $("#couponNavBtn").on("click", "li", function (e) {
            $(e.delegateTarget).find(".active").removeClass("active");
            $(e.target).addClass("active");
            that.switchView($(e.target).data("id"));
        });
        $("#go_activate").on("click", function (e) {
            e.preventDefault();
            that.switchView("unclaimed");
        });
    },
    switchView: function (name) {
        if (this.listName === name) return;
        this.listName = name;
        if (this.listName === "claimed") {
            this.claimedCouponView.show();
            this.unclaimedCouponView.hide();
            this.usedCouponView.hide();
        } else if (this.listName === "unclaimed") {
            this.claimedCouponView.hide();
            this.unclaimedCouponView.show();
            this.usedCouponView.hide();
        } else {
            this.claimedCouponView.hide();
            this.unclaimedCouponView.hide();
            this.usedCouponView.show();
        }

    },
    close: function () {
        if (!this.isClosed) {
            if (this.unclaimedCouponView) {
                this.unclaimedCouponView.close();
            }
            if (this.claimedCouponView) {
                this.claimedCouponView.close();
            }
            this.unclaimedCouponView = null;
            this.claimedCouponView = null;
            this.$el.empty();
            this.isClosed = true;
        }
    }
});

var UnclaimedCouponView = MultiPageView.extend({
    el: "#coupons_container",
    table: "#unclaimedTable",
    minHeight: 144,
    pageEntryNumber: 4,
    entryHeight: 36,
    extPn:true,
    initialize: function (allCoupons, coupons) {
        MultiPageView.prototype.initialize.call(this);
        this.template = _.template(tpl.get("mypage_couponUnclaimed"));
        this.$el.append(this.template);
        this.messages = coupons;
        this.allMessages = allCoupons;
        this.entryTemplate = _.template(tpl.get("mypage_unclaimedCouponRow"));
        this.pageNumberClass = "searchResultPageNumber";
        this.pageNumberId = "couponPageNum";
        this.pageNavigator = "unclaimedCouponListNavigator";
        this.pageNavigatorClass = "page blank1 clearfix";
        this.user = app.sessionManager.sessionModel;
        this.actionClass = "claim";
        this.entryContainer = "unclaimedList";
        this.$domContainer = $("#unclaimedList");
        this.noMessage = _.template(tpl.get("unclaimed_coupon_noMessage"));
        this.isClosed = false;
        var that = this;
        this.render();
        this.bindEvents();
    },
    render: function () {
        MultiPageView.prototype.render.call(this);
    },
    entryEvent: function (id) {
    $("#coupon_act_"+id).val("激活中");
        app.userManager.claimCoupon(id, {
            "success": function () {
                $("#coupon_act_"+id).parent().html("<span>已激活</span>");
            },
            "error": function () {
                $("#coupon_act_"+id).val("重试");
            }
        });
    },
    bindEvents: function () {

    },
    show: function () {
        $("#unclaimedTable").removeClass("hidden");
        $("#unclaimedNoData").removeClass("hidden");
        $("#unclaimedCouponListNavigator").removeClass("hidden");

    },
    hide: function () {
        $("#unclaimedTable").addClass("hidden");
        $("#unclaimedNoData").addClass("hidden");
        $("#unclaimedCouponListNavigator").addClass("hidden");
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
    extPn:true,
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
        this.noMessage = _.template(tpl.get("claimed_coupon_noMessage"));;
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
        $("#claimedTable").addClass("hidden");  
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
    extPn:true,
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
        $("#usedTable").addClass("hidden");  
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