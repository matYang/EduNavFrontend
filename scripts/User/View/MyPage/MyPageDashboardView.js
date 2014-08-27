var MyPageDashboardView = Backbone.View.extend({
    el:"#mypage_content",
    initialize: function (params) {
        _.bindAll(this, "render", "bindEvents", "close");
        app.viewRegistration.register(this);
        this.template = _.template(tpl.get("mypage_dashboard"));
//        this.user = app.sessionManager.sessionModel;//session中存的信息不全
        this.user = params.user;//从MyPageView中将获取的user信息渲染到页面中
        this.isClosed = false;

        this.bookingSr = new BookingSearchRepresentation ();
        //todo 这里以后加入筛选条件的缓存,每次进入该页面时首先获取之前缓存的筛选条件
        this.bookingSr.set("userId", this.user.get("userId"));
        this.bookingSr.set('statusSet', [11,12]);//todo 这里添加未入学订单的筛选条件
        this.render();
    },
    render: function () {
        this.$el.empty().append(this.template(this.user._toJSON()));

        this.bookingListView = new BookingListView(this.bookingSr);
    },
    bindEvents: function () {},
    close: function () {
        if (!this.isClosed) {
            this.$el.empty();
            if (this.bookingListView) {
                this.bookingListView.close();
            }
            this.bookingListView = null;
            this.isClosed = true;
        }
    }
});