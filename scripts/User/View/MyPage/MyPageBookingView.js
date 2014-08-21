var MyPageBookingView = Backbone.View.extend({
    el: "#mypage_content",
    initialize: function () {
        _.bindAll(this, "render", "close");
        this.template = _.template(tpl.get("mypage_bookingList"));
        app.viewRegistration.register(this);
        this.user = app.sessionManager.sessionModel;
        this.isClosed = false;

        this.bookingSr = new BookingSearchRepresentation ();
        //todo 这里以后加入筛选条件的缓存,每次进入该页面时首先获取之前缓存的筛选条件
        this.bookingSr.set("userId", this.user.get("userId"));
        this.bookingSr.set('statuses', [11,12,13]);//todo 这里添加状态的筛选条件
        this.render();
    },

    render: function () {
        this.$el.empty().append(this.template);

        this.bookingListView = new BookingListView(this.bookingSr);
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