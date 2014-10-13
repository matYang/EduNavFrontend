/*教师详情弹出框View*/
var TeacherModal = Backbone.View.extend({
    el: "#modals",
    modalEl: '#teacherModal',//todo 后续需要根据modalId向template中添加id
    template: _.template(tpl.get("teacherModal")),
    //todo 可传入参数
    initialize: function (opt) {
        this.isClosed = false;
        this.isShow = false;
        this.$backdropEl = $('<div class="modal-bg"></div>');
        $('body').after(this.$backdropEl);
        _.bindAll(this, "render", 'show', 'hide', "_hideOnBackdropClick", "close");
        app.viewRegistration.register(this);
    },
    show: function (teacher) {
        var self = this;
        this.render(teacher);
        this.$backdropEl.show();
        this.$modalEl.fadeIn(200);
        //events
        this.$modalEl.on("click", '.close', self.hide);
        this.$modalEl.on('click', self._hideOnBackdropClick);
        this.$backdropEl.on('click', self._hideOnBackdropClick);

    },
    render: function (teacher) {
        if (!teacher) {
            teacher = new Teacher();
        }
        this.$el.html(this.template(teacher._toJSON()));
        this.$modalEl = $(this.modalEl);
    },
    hide: function () {
        this.$modalEl.fadeOut(200);
        this.$backdropEl.fadeOut(200);
        //events
        this.$modalEl.off("click", '.close', self.hide);
        this.$modalEl.off('click', self._hideOnBackdropClick);
        this.$backdropEl.off('click', self._hideOnBackdropClick);
    },
    _hideOnBackdropClick: function (evt) {
        if (evt.target !== evt.currentTarget)
            return;
        this.hide();
    },

    close: function () {
        if (this.$modalEl) {
            this.$modalEl.remove();
            this.$modalEl = null;
        }
        if (this.$backdropEl) {
            this.$backdropEl.remove();
            this.$backdropEl = null;
        }
    }
});

