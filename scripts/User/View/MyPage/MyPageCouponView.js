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
        var claimedCoupons = new Coupons(), unclaimedCoupons = new Coupons();
        claimedCoupons.add(this.user.get("coupons").where({status: EnumConfig.CouponStatus.usable}));
        unclaimedCoupons.add(this.user.get("coupons").where({status: EnumConfig.CouponStatus.inactive}));
        this.unclaimedCouponView = new UnclaimedCouponView(unclaimedCoupons, unclaimedCoupons);
        this.claimedCouponView = new ClaimedCouponView(claimedCoupons, claimedCoupons);
        this.unclaimedCouponView.hide();
    },
    bindEvents: function () {
        var that = this;
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
            this.unclaimedCouponView.hide();
        } else {
            this.claimedCouponView.hide();
            this.unclaimedCouponView.show();
        }

    },
    close: function () {
        if (!this.isClosed) {
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
    initialize: function (allCoupons, coupons) {
        _.bindAll(this, 'render', 'bindEvents', 'entryEvent', 'close');
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
        this.noMessage = '<div class="no_data" id="unclaimedNoData">' +
                        '<div>暂时没有可用的待激活消费券哦~~</div>' +
                        '<p>快去<input type="button" value="免费获取">消费券吧</p>' +
                        '</div>';
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
    },
    hide: function () {
      $("#unclaimedTable").addClass("hidden");
      $("#unclaimedNoData").addClass("hidden");
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
    initialize: function (allCoupons, coupons) {
        _.bindAll(this, 'render', 'bindEvents', 'close');
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
        this.noMessage = '<div id="claimedNoData" class="no_data">' +
                        '<div>你还没有消费券哦~~</div>' +
                        '<p>快去<input type="button" value="免费获取">消费券吧</p>' +
                        '</div>';
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
    },
    hide: function () {
          $("#claimedTable").addClass("hidden");  
          $("#claimedNoData").addClass("hidden");
    },
    close: function () {
        if (!this.isClosed) {
            this.isClosed = true;
            this.$el.empty();
        }
    }


});