var MyPageShareView = Backbone.View.extend({
	el:"#mypage_content",
	template: _.template(""),
	initialize: function () {
        app.viewRegistration.register(this);
        this.isClosed = false;
        this.render();
	},
	render: function () {
		this.$el.append(this.template);
	},
	close: function () {
		if (this.isClosed) {
			this.$el.empty();
		}
	}
});

 var jiathis_config = {
    boldNum:0,
    siteNum:7,
    showClose:false,
    sm:"t163,kaixin001,renren,douban,tsina,tqq,tsohu",
    // imageUrl:"http://v2.jiathis.com/code/images/r5.gif",
    // imageWidth:26,
    // marginTop:150,
    url:"http://www.ishangke.com",
    title:"邀请培训拿红包 #爱上课#",
    summary:"我请大家免费上培训班啦！接受邀请请点击www.iShanke.cn，注册成为爱会员，我们都能获得20元红包奖励！赶快行动吧！",
    // pic:"自定义分享的图片连接地址",
    data_track_clickback:true,
    shortUrl:true,
}