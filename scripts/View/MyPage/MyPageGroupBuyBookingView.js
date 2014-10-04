var MyPageGroupBuyBookingView = Backbone.View.extend({
    //TODO 显示团购订单
    el: "#mypage_content",
    initialize: function () {
        _.bindAll(this, "render", "close");
        this.template = _.template(tpl.get("mypage_groupBuyBookingList"));
        app.viewRegistration.register(this);
        this.user = app.sessionManager.sessionModel;
        this.isClosed = false;

        this.sr = new GroupBuyBookingSearchRepresentation();
        //todo 这里以后加入筛选条件的缓存,每次进入该页面时首先获取之前缓存的筛选条件
        this.sr.set("userId", this.user.get("userId"));
        this.render();
    },

    render: function () {
        this.$el.empty().append(this.template);
        //加载view时只需要传入过滤的条件即可
        this.bookingListView = new GroupBuyBookingListView(this.sr);
    },
    close: function () {
        if (!this.isClosed) {
            this.$el.empty();
            if(this.bookingListView){
                this.bookingListView.close();
            }
            this.isClosed = true;
        }
    }
});