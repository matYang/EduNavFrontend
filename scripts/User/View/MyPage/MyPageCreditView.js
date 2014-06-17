var MyPageCreditView = Backbone.View.extend({
        el:"#mypage_content",
    initialize: function () {
        _.bindAll(this, "render", "bindEvents", "close");
        this.template = _.template(tpl.get("mypage_credit"));
        app.viewRegistration.register(this);
        this.user = app.sessionManager.sessionModel;
        this.isClosed = false;
        this.render();
        this.bindEvents();
    },
    render: function () {
        this.$el.append(this.template);
        var credits = this.user.get("credits");
        this.creditTable = new CreditTableView(credits, credits);
        this.creditStore = new CreditStoreView();
        this.creditStore.hide();
        $("#myCredit").html(this.user.get("credit"));
    },
    bindEvents: function () {
        var that = this;
        $("#creditNavBtn").on("click", "li", function (e) {
            $(e.delegateTarget).find(".active").removeClass("active");
            $(e.target).addClass("active");
            that.switchView($(e.target).data("id"));
        });
    },
    switchView: function (name) {
        if (this.viewName === name) return;
        this.viewName = name;
        if (this.viewName === "table") {
            this.creditTable.show();
            this.creditStore.hide();
        } else {
            this.creditTable.hide();
            this.creditStore.show();
        }

    },
    close: function () {
        if (!this.isClosed) {
            this.$el.empty();
            this.isClosed = true;
        }
    }

});


var CreditTableView = MultiPageView.extend({
    el: "#credit_pageContent",
    table: "#creditTable",
    minHeight: 144,
    pageEntryNumber: 20,
    entryHeight: 36,
    extPn:true,
    initialize: function (allCoupons, coupons) {
        _.bindAll(this, 'render', 'bindEvents', 'entryEvent', 'close');
        this.template = _.template(tpl.get("mypage_creditTable"));
        this.$el.append(this.template);
        this.messages = coupons;
        this.allMessages = allCoupons;
        this.entryTemplate = _.template(tpl.get("mypage_creditRow"));
        this.pageNumberClass = "searchResultPageNumber";
        this.pageNumberId = "creditPageNum";
        this.pageNavigator = "creditPageNav";
        this.pageNavigatorClass = "page blank1 clearfix";
        this.user = app.sessionManager.sessionModel;
        this.entryContainer = "creditEntryContainer";
        this.$domContainer = $("#creditEntryContainer");
        this.noMessage = '<div class="no_data" id="unclaimedNoData">' +
                        '<div>你暂时还没有积分哦~~</div>' +
                        '<p>积分可以通过预定课程获得</p>' +
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

    },
    bindEvents: function () {

    },
    show: function () {
        $(this.table).removeClass("hidden");
        $("#unclaimedNoData").removeClass("hidden");
        $("#creditPageNav").removeClass("hidden");

    },
    hide: function () {
        $(this.table).addClass("hidden");
        $("#unclaimedNoData").addClass("hidden");
        $("#creditPageNav").addClass("hidden");
    },
    close: function () {
        if (!this.isClosed) {
            this.isClosed = true;
            this.$el.empty();
        }
    }
});

var CreditStoreView = Backbone.View.extend({
    el: "#credit_pageContent",
    initialize: function() {
        this.template = _.template(tpl.get("mypage_creditStore"));
        this.isClosed = false;
        this.render();
    },
    render: function () {
        this.$el.append(this.template);

    },
    hide: function () {
        $("#creditStore").addClass("hidden");
    },
    show: function () {
        $("#creditStore").removeClass("hidden");
    },
    close: function () {
        if (!this.isClosed) {
            this.isClosed = true;
            this.$el.empty();
        }
    }
})