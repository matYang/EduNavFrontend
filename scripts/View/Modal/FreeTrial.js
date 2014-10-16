/*支付信息确认弹出框(点击支付成功或支付失败)*/
var FreeTrialModal = Modal.extend({
    modalEl: '#freeTrialModal',//todo 后续需要根据modalId向template中添加id
    template: _.template(tpl.get("freeTrialModal")),
    static: false,
    keyboard:true,
    //todo 可传入参数
    initialize: function (opt) {
        Modal.prototype.initialize.call(this);
    },
    show: function (course) {
        course = course._toJSON();
        Modal.prototype.show.call(this, course);
        //below can bind more events..
    },
    hide: function () {
        Modal.prototype.hide.call(this);
        //below should unbind events bound in 'show' function..
    },
    close: function () {
        Modal.prototype.close.call(this);
    }
});
