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
        Modal.prototype.show.call(this,course);
        //below can bind more events..
        var that = this;

        if (app.sessionManager.hasSession()) {
            //自动填充手机号和用户名 如果存在的话
            var name = app.sessionManager.sessionModel.get('username');
            var phone = app.sessionManager.sessionModel.get('phone');
            $('#detail_name_input').val(name);
            $('#detail_phone_input').val(phone);
        }
        this.model = new Booking();
        this.model.initBookingFromCourse(course);



        this.validEle = '#detail_submit_error';
        //提交免费申请 使用Bookings
        this.$modalEl.on('click','#btnApplefreeTrial',function () {
            var $valid = $(that.validEle);
            var name = $('#detail_name_input').val();
            var phone = $('#detail_phone_input').val();
            var note = $('#detail_note_text').val();
            $valid.empty();
            if (!name) {
                $valid.html('<i class="icon icon-error"></i>亲，请输入您的姓名');
                return
            }
            if (!phone) {
                $valid.html('<i class="icon icon-error"></i>亲，请输入您的联系电话');
                return
            }
            if (phone.length !== 11 || isNaN(parseInt(phone, 10))) {
                $valid.html('<i class="icon icon-error"></i>亲，您的联系电话输入有误');
                return
            }
            that.model.set('name', name);
            that.model.set('phone', phone);
            that.model.set('note', note);
            app.userManager.initBooking(that.model, {
                success: function () {
                    that.clearModel();
                    that.hide();
                    //提交成功 关闭弹出框 弹出成功信息 清空表单数据
                    if (!that.popTip) {
                        that.popTip = new SuccessPopTip();
                    } else {
                        that.popTip.show();
                    }
                },
                error: function (data) {
                    $(that.validEle).html(data.message || '提交失败 ，请稍后再试');
                }
            });
        });
    },

    clearModel: function () {
        //这里清空保单数据以及模型数据
        this.model = new Booking();
        $('#detail_name_input').val('');
        $('#detail_phone_input').val('');
        $('#detail_note_text').val('');
        $(this.validEle).empty();
    },
    hide: function () {
        Modal.prototype.hide.call(this);
        //below should unbind events bound in 'show' function..
    },
    close: function () {
        Modal.prototype.close.call(this);
    }
});
