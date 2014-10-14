var Modal = Backbone.View.extend({
    el: "#modals",//所有modal的容器（optional） 也可直接加到body上
    static: false,//点击背景后是否保持（不关闭）触发_hideOnBackdropClick
    keyboard:false,//键盘的esc关闭modal
    fadeTime:200,
    modalEl: null,//modal元素
    template: '',//modal中的内容
    //todo 没有处理元素缺失情况下的判断 及其它异常处理
    //todo 处理传入的参数
    initialize: function (opt) {
        _.bindAll(this, 'show', 'hide', 'close', '_render', '_hideOnBackdropClick', '_escape');
        this.$backdropEl = $('<div class="modal-bg"></div>');
        this.isShown = false;
        app.viewRegistration.register(this);
    },
    show: function (msgObj) {
        var self = this;
        this._render(msgObj);
        //elements shown
        this.$modalEl = $(this.modalEl);
        this.$backdropEl.insertAfter(this.$modalEl).show();
        this.$modalEl.fadeIn(this.fadeTime);
        this.isShown = true;
        //events on
        this._escape();
        this.$modalEl.on("click", '.close', self.hide);
        if(!this.static){
            this.$backdropEl.on('click', self._hideOnBackdropClick);
            this.$modalEl.on('click', self._hideOnBackdropClick);
        }
    },
    hide: function () {
        var self = this;
        //element hidden
        this.$modalEl.fadeOut(this.fadeTime);
        this.$backdropEl.fadeOut(this.fadeTime, function(){
            self.$backdropEl.remove();
        });
        this.isShown = false;
        //events off
        this._escape();
        this.$modalEl.off("click", '.close', self.hide);
        if(!this.static) {
            this.$modalEl.off('click', self._hideOnBackdropClick);
            this.$backdropEl.off('click', self._hideOnBackdropClick);
        }
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
    },
    _render: function (msgObj) {
        this.$el.html(this.template(msgObj));
    },
    _hideOnBackdropClick: function (evt) {
        if (evt.target !== evt.currentTarget)
            return;
        this.hide();
    },
    _escape:function(){
        var that = this;
        if (this.isShown && this.keyboard) {
            $(document).on('keyup', function ( e ) {
                e.which == 27 && that.hide()
            })
        } else if (!this.isShown) {
            $(document).off('keyup')
        }
    }
});