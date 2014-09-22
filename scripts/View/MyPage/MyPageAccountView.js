/*我的现金账户*/
var MyPageCashView = Backbone.View.extend({
    el:"#mypage_content",
    initialize: function (params) {
        _.bindAll(this, "render", "bindEvents", "close");
        this.template = _.template(tpl.get("mypage_cash"));
        app.viewRegistration.register(this);
        this.user = params.user;
        this.isClosed = false;
        this.render();
    },
    render: function () {
        this.$el.append(this.template(this.user._toJSON()));
        this.listName = "in";
        this.childView = new InCashView();
        this.bindEvents();
    },
    bindEvents: function () {
        var that = this;
        $("#accountNavBtn").on("click", "li", function (e) {
            $(e.delegateTarget).find(".active").removeClass("active");
            $(this).addClass("active");
            that.switchView($(this).data("id"));
        });
    },
    switchView: function (name) {
        if (this.listName === name) return;
        this.listName = name;
        if (this.listName === "in") {
            this.childView.close();
            this.childView = new InCashView();
        } else if (this.listName === "out") {
            this.childView.close();
            this.childView = new OutCashView();
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
var InCashView = MultiPageView.extend({
    entryContainer:'accountInList',
    el: "#accountContainer",
    pageEntryNumber: 2,
    entryTemplate: _.template(tpl.get("mypage_accountInRow")),
    template: _.template(tpl.get("mypage_accountIn")),
    noMessage: _.template(tpl.get("accountInNoMessage")),
    pageNavigator:'accountInListPagination',
    initialize: function () {
        this.$el.append(this.template);
        MultiPageView.prototype.initialize.call(this);
        this.user = app.sessionManager.sessionModel;
        this.isClosed = false;

        this.sr = new AccountHistorySearchRepresentation();
        this.sr.set('operation',1);
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
        $('#'+this.entryContainer).empty().append("<tr><td colspan='3'><div class='loading'></div></td></tr>");

        app.userManager.fetchAccountHistories(this.sr, {
            success: self.render,
            error: this.renderError
        });
    },
    render: function (data) {
        this.messages = data || new AccountHistories();
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
var OutCashView = MultiPageView.extend({
    entryContainer:'accountOutList',
    el: "#accountContainer",
    pageEntryNumber: 2,
    entryTemplate: _.template(tpl.get("mypage_accountOutRow")),
    template: _.template(tpl.get("mypage_accountOut")),
    noMessage: _.template(tpl.get("accountOutNoMessage")),
    pageNavigator:'accountOutListPagination',
    initialize: function () {
        this.$el.append(this.template);
        MultiPageView.prototype.initialize.call(this);
        this.user = app.sessionManager.sessionModel;
        this.isClosed = false;

        this.sr = new AccountHistorySearchRepresentation();
        this.sr.set('operation',0);
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
        $('#'+this.entryContainer).empty().append("<tr><td colspan='3'><div class='loading'></div></td></tr>");

        app.userManager.fetchAccountHistories(this.sr, {
            success: self.render,
            error: this.renderError
        });
    },
    render: function (data) {
        this.messages = data || new AccountHistories();
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