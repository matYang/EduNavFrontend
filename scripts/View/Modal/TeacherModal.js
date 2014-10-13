/*教师详情弹出框View*/
var TeacherModal = Backbone.View.extend({
    el: "#modals",
    modalEl: '#teacherModal',//后续需要根据modalId向template中添加id
    template: _.template(tpl.get("teacherModal")),
    initialize: function () {
        this.isClosed = false;
        this.isShow = false;
        this.$modal = $(this.modalEl);
        _.bindAll(this, "render", 'show', 'hide', "bindEvents", "close");
        app.viewRegistration.register(this);
    },
    render: function (teacher) {
        if (!teacher) {
            teacher = new Teacher()
        }
        this.$el.html(this.template(teacher._toJSON()));
        this.bindEvents();
    },

    bindEvents: function () {
        var that = this;
        this.$modal.on("click", '.close', that.hide);
        app.bg.eventOn(that.hide);
    },
    show: function (teacher) {
        app.bg.show();
        this.render(teacher);
    },
    hide: function () {
        this.$modal.hide();
        app.bg.hide();
    },

    close: function () {
        app.bg.eventOff();
        this.$modal.off();
        this.$modal.remove();
    }
});

