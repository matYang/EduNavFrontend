var MyPageShareView = Backbone.View.extend({
    el: "#mypage_content",
    template: _.template(tpl.get("mypage_share")),
    initialize: function () {
        app.viewRegistration.register(this);
        this.isClosed = false;

        if (!app.sessionManager.sessionModel.get("invitationCode")) {
            this.openModal();
        }
        this.render();
    },
    render: function () {
        var self = this;
        jiathis_config.summary = "我请大家免费上培训班啦！接受邀请请点击 www.iShangke.cn/register/invite=" +
            app.sessionManager.sessionModel.get("invitationCode") +
            " ， 注册成为爱会员，我们都能获得20元红包奖励！赶快行动吧！";
        this.$el.html(this.template({inviteCode: app.sessionManager.sessionModel.get("invitationCode")}));
        /*bind events start*/
        $('.invitation_share a').on('click',function(e){
            e.preventDefault();
            if (!app.sessionManager.sessionModel.get("invitationCode")) {
                self.openModal();
                //阻止事件追加:分享到其它社区里
                e.stopImmediatePropagation();
            }
        });
        $("#copy_content").focus(function(){
            if (!app.sessionManager.sessionModel.get("invitationCode")) {
                self.openModal();
            }
        });
        /*bind events end*/
        //load jiathis js for social share
        if($('#jiathis_script').length === 0){
            this.$el.append('<script id="jiathis_script" type="text/javascript" src="http://v3.jiathis.com/code/jia.js?uid=1407735888243953" charset="utf-8"></script>');
        }
        var userAgent = window.navigator.userAgent.toLowerCase();
        var is_ie = (userAgent.indexOf('msie') != -1 && !is_opera) && userAgent.substr(userAgent.indexOf('msie') + 5, 3);
        if (!window.clipboardData) {
            $("#clickCopy").remove();
        } else {
            $("#clickCopy").on("click", function () {
                window.clipboardData.setData("Text", $("#copy_content").val());
            });
        }
    },
    openModal: function () {
        this.usernameModal = new UsernameModal({view:this});
    },
    close: function () {
        if (!this.isClosed) {
            this.$el.empty();
        }
    }
});
var jiathis_config = {
    boldNum: 0,
    siteNum: 7,
    showClose: false,
    sm: "t163,kaixin001,renren,douban,tsina,tqq,tsohu",
    // imageUrl:"http://v2.jiathis.com/code/images/r5.gif",
    // imageWidth:26,
    // marginTop:150,
    url: "http://www.ishangke.cn",
    title: "邀请培训拿红包 #爱上课#",
    summary: "我请大家免费上培训班啦！接受邀请请点击www.iShangke.cn，注册成为爱会员，我们都能获得20元红包奖励！赶快行动吧！",
    // pic:"自定义分享的图片连接地址",
    data_track_clickback: true,
    shortUrl: true
};