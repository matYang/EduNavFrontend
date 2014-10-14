/*支付信息确认弹出框(点击支付成功或支付失败)*/
var PayInfoModal = Modal.extend({
    modalEl: '#payInfoModal',//todo 后续需要根据modalId向template中添加id
    template: _.template(tpl.get("payInfoModal")),
    static: true,
    keyboard: false,
    //todo 可传入参数
    initialize: function (opt) {
        this.opt = opt;
        Modal.prototype.initialize.call(this);
    },
    show: function () {
        Modal.prototype.show.call(this);
        //below can bind more events..
        var self = this;
        this.$modalEl.on('click', '.btnfalse', function () {
            var ref = window.location.hash;
            ref = ref.substring(1);
            app.navigate('error/pay/ref=' + ref, true);
        });
        this.$modalEl.on('click', '.btnsuccess', function () {
            app.navigate("mypage/tbooking/" + self.opt.bookingId, true);
        });
    },
    hide: function () {
        Modal.prototype.hide.call(this);
        //below should unbind events bound in 'show' function..
    },
    close: function () {
        Modal.prototype.close.call(this);
    }
});
