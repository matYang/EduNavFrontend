/**
 * Created by jz on 2014/9/1.
 */
/*侧边栏工具 对比 二维码 客服等等*/
var SiderBarView = Backbone.View.extend({
    el:'body',
    template: _.template(tpl.get("sideBarView")),
    initialize:function(){
        //todo backbone中是否需要如此?view中存在事件绑定时切换view会导致内存占用 但在close方法中已关闭
        // todo 用off来清除事件 所以下述的服务是否仍需要 后续再说
        //注册当前的view 在viewService中注册前会判断是否已存在该view并且判断其isClosed 不为关闭状态则首先进行关闭
        app.viewRegistration.register(this);
        this.isClosed = false;

        this.render();
    },
    render:function(){
        this.$el.append(this.template());
        this.bindEvents();
    },
    bindEvents:function(){
        $('.right_bar .back_to_top').on('click',function(){
            $.smoothScroll();
        })
    },

    close: function () {
        if (!this.isClosed) {
            this.$el.off();
            this.isClosed = true;
        }
    }
});
