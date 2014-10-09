/**
 * 支付失败 帮助页面
 * --需要返回之前的支付页面继续尝试支付
 */
var ErrorPayView = Backbone.View.extend({
    el: '#content',
    template: _.template(tpl.get('errorPay')),
    initialize: function () {
        _.bindAll(this, 'render', 'bindEvents', 'close');
        this.isClosed = false;
        this.render();
        this.bindEvents();
    },
    render: function () {
        this.$el.append(this.template);
    },
    bindEvents: function () {
        var that = this;
    },
    close: function () {
        if (!this.isClosed) {
            this.isClosed = true;
            this.$el.empty();
        }
    }
});