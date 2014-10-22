/*支付信息确认弹出框(点击支付成功或支付失败)*/
var ApplyCourseModal = Modal.extend({
    modalEl: '#applyCourseModal',//todo 后续需要根据modalId向template中添加id
    template: _.template(tpl.get("applyCourseModal")),
    static: false,
    keyboard:true,
    //todo 可传入参数
    initialize: function (opt) {
        Modal.prototype.initialize.call(this);

    },
    show: function () {
        Modal.prototype.show.call(this);
        //below can bind more events..
        var that = this;

        if (app.sessionManager.hasSession()) {
            //自动填充手机号和用户名 如果存在的话
            var name = app.sessionManager.sessionModel.get('name');
            var phone = app.sessionManager.sessionModel.get('phone');
            $('#modalA_userName_input').val(name);
            $('#modalA_phone_input').val(phone);
        }


        this.model = new Apply();


        this.validEle = '#modalA_submit_error';
        //弹出层里的‘立即申请’按钮 提交人工选课的申请
        $("#modalABtnSubmitApply").on("click", function () {
            //弹出层形式 提交Apply的时候进行输入信息的验证 未输入或者输入错误的进行提示
            var $valid = $(that.validEle);
            var phone = $('#modalA_phone_input').val();
            var userName = $('#modalA_userName_input').val();
            var remark = $('#modalA_remark_text').val();
            $valid.empty();
            //提交的时候进行输入信息的验证 未输入或者输入错误的进行提示
            if (!phone) {
                $valid.html('<i class="icon icon-error"></i>亲，请输入您的联系电话');
                return
            }
            if (phone.length !== 11 || isNaN(parseInt(phone, 10))) {
                $valid.html('<i class="icon icon-error"></i>亲，您的联系电话输入有误');
                return
            }
            if (!userName) {
                $valid.html('<i class="icon icon-error"></i>亲，请输入您的姓名');
                return
            }
            that.model.set('phone', phone);
            that.model.set('userName', userName);
            that.model.set('remark', remark);
            app.userManager.initApply(that.model, {
                success: function () {
                    that.hide();
                    that.clearModel();
                    if (!that.popTip) {
                        that.popTip = new SuccessPopTip();
                    } else {
                        that.popTip.show();
                    }
                },
                error: function (data) {
                }
            });
        });





    },
    //以下为选择目录后的回调函数 设置model 并更新view
    selectCatApply: function (cat) {
        if (cat) {
            this.catApply = cat;
            $('#modalAChooseCat').val(cat.name);
        }
    },
    //这里清空保单数据以及模型数据
    clearModel: function () {
        this.model = new Apply();
        $('#modalA_phone_input').val('');
        $('#modalA_userName_input').val('');
        $('#modalA_remark_text').val('');
        $(this.validEle).empty();
    },
    hide: function () {
        Modal.prototype.hide.call(this);
        //below should unbind events bound in 'show' function..
    },
    close: function () {
        Modal.prototype.close.call(this);
        if(this.popTip){
            this.popTip.close();
        }
    }
});
