/*我的积分账户*/
var MyPageCreditView = Backbone.View.extend({
        el:"#mypage_content",
    initialize: function () {
        _.bindAll(this, "render", "bindEvents", "close");
        this.template = _.template(tpl.get("mypage_credit"));
        app.viewRegistration.register(this);
        this.user = app.sessionManager.sessionModel;
        this.isClosed = false;
        this.render();
    },
    render: function () {
        this.$el.append(this.template);
        this.listName = "table";
        this.childView = new CreditTableView();
        this.bindEvents();
        $("#myCredit").html(this.user.get("credit").get("credit"));
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
        if (this.listName === name) return;
        this.listName = name;
        if (this.listName === "table") {
            this.childView.close();
            this.childView = new CreditTableView();
        } else if (this.listName === "store") {
            this.childView.close();
            this.childView = new CreditStoreView();
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


var CreditTableView = MultiPageView.extend({
    el: "#credit_pageContent",
    table: "#creditTable",
    minHeight: 144,
    pageEntryNumber: 16,
    entryHeight: 36,
    extPn:true,
    initialize: function (allCoupons, coupons) {
        MultiPageView.prototype.initialize.call(this);
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
        this.noMessage =  _.template(tpl.get("credit_noMessage"));
        this.isClosed = false;

        this.sr = new CreditHistorySearchRepresentation();
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

        app.userManager.fetchCreditHistories(this.sr, {
            success: self.render,
            error: this.renderError
        });
    },
    render: function (data) {
        this.messages = data || new Bookings();
        MultiPageView3.prototype.render.call(this);
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
});