/**
 * Created by jz on 2014/8/31.
 */
var ChooseWorkView = Backbone.View.extend({
    form: false,
    modalClass: 'workModal',
    template: _.template(tpl.get('mypage_chooseWorkModal')),


    initialize: function (opt) {

        var self = this;
        app.viewRegistration.register(this);
        this.isClosed = false;
        this.parentView = opt.view;


        this.notify = new Backbone.Notifier({
            fadeInMs: 0,
            fadeOutMs: 0,
            ms: null,
            message: self.template(),
            modal: true,
            closeBtn: true,
            position: 'center',
            cls: self.modalClass,
            width: '712'
        });

        this.render();
    },
    render: function () {
        var self = this;
    },
    bindEvents: function () {
        var self = this;
        $(".zhiye li").on("click",function(){
            var zhiyeHtml=$(this).attr("title");
            //alert(zhiyeHtml);
            $("#inputWordKind").val(zhiyeHtml);
            self.hide();
        });
    },

    show: function () {
        this.modalView = this.notify.notify();
        this.bindEvents();
    },
    hide: function () {
        this.modalView.destroy();
    },

    saveSuccess: function (user) {

    },
    saveError: function (data) {

    },
    buildValidatorDiv: function (valid, type, text) {

    },

    close: function () {
        if (!this.isClosed) {
            this.modal.destroy();
            this.notifier = null;
        }
    }
});