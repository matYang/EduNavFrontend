/*教师详情弹出框View*/
var TeacherModal = Modal.extend({
    modalEl: '#teacherModal',//todo 后续需要根据modalId向template中添加id
    template: _.template(tpl.get("teacherModal")),
    static: false,
    keyboard:true,
    //todo 可传入参数
    initialize: function (opt) {
        Modal.prototype.initialize.call(this);
    },
    show: function (teacher) {
        teacher = teacher._toJSON();
        Modal.prototype.show.call(this, teacher);
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