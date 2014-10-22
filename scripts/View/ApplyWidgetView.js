var ApplyWidgetView = Backbone.View.extend({
    el: "#applyWidget",
    messageEl: '.wd-message',
    template: _.template(tpl.get("applyWidget")),
    initialize: function () {
        this.isClosed = false;
        _.bindAll(this, "bindEvents", "render", 'clearModel', 'setPhone', 'submitForm', "close");
        this.render();
        this.bindEvents();
        this.model = new Apply();
    },
    render: function () {
        this.$el.html(this.template);
        this.$messageEl = $(this.messageEl);
    },
    bindEvents: function () {
        var that = this;
        /*绑定右侧表单的提交操作*/
        this.$el.on('click', '.wd-form-btn', function () {
            that.submitForm();
        });
    },
    setPhone: function (phone) {
        this.model.set('phone', phone);
    },
    submitForm: function () {
        var that = this;
        var what = $('#twhat').val();
        var where = $('#twhere').val();
        //验证输入的信息为空或者过长
        if (!what || !where) {
            that.$messageEl.html('写点什么吧~').slideDown();
            return
        }
        if (what.length > 30 || where.length > 30) {
            that.$messageEl.html('您输入得太多了，最多30字~').slideDown();
            return
        }
        //登陆用户自动填充手机号
        if (app.sessionManager.hasSession()) {
            that.setPhone(app.sessionManager.sessionModel.get('phone'));
        }
        //todo 手机号为空（未登陆）的需要在新窗口输入手机号才可进行提交
        if (!that.model.get('phone')) {
            if (!that.setPhoneModalView) {
                that.setPhoneModalView = new SetPhoneModalView({pareneView: that});
            }
            that.setPhoneModalView.show();
            return;
        }
        that.model.set('remark', '【PC-学校页】想学#' + what + '+地点#' + where);
        app.userManager.initApply(that.model, {
            success: function () {
                that.clearModel();
                that.$messageEl.html('<span class="ft-primary">提交成功</span>').slideDown(250).delay(2000).slideUp(250);
            },
            error: function (data) {
                that.$messageEl.html('<span class="ft-error">提交失败，请稍后再试~</span>').slideDown(250).delay(3000).slideUp(250);
            }
        });
    },
    clearModel: function () {
        this.model = new Apply();
        $('.wd-input').val('');
        $('#home_remark_text').val('');
    },
    close: function () {
        if (!this.isClosed) {
            if (this.setPhoneModalView) {
                this.setPhoneModalView.close();
            }
            this.isClosed = true;
            this.$el.off();
            this.$el.empty();
            this.$el = null;
        }
    }
});
var SetPhoneModalView = Modal.extend({
    modalEl: '#setPhoneModal',
    template: _.template(tpl.get("setPhoneModal")),
    static: false,
    keyboard: true,
    initialize: function (opt) {
        this.pareneView = opt.pareneView;
        Modal.prototype.initialize.call(this);
    },
    show: function () {
        Modal.prototype.show.call(this);
        //below can bind more events..
        var that = this;
        this.validEle = '.modalPhoneMessage';
        //提交免费申请 使用Bookings
        this.$modalEl.on('click', '#setPhoneBtn', function () {
            var $valid = $(that.validEle);
            var phone = $('#setPhoneInput').val();
            $valid.empty();
            if (!phone) {
                $valid.html('<i class="icon icon-error"></i>亲，请输入您的联系电话');
                return
            }
            if (phone.length !== 11 || isNaN(parseInt(phone, 10))) {
                $valid.html('<i class="icon icon-error"></i>亲，您的联系电话输入有误');
                return
            }
            that.hide();
            that.pareneView.setPhone(phone);
            that.pareneView.submitForm();

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