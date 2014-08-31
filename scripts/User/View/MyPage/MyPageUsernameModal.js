/**
 * Created by jz on 2014/8/31.
 */
var UsernameModal = BaseFormView.extend({
    form: false,
    modalClass:'usernameModal',
    template: _.template(tpl.get('mypage_usernameModal')),
    submitButtonId:'updateInviteCode',

    initialize:function(opt){
        app.viewRegistration.register(this);
        this.isClosed = false;
        this.childViewName = opt.name;

        if (!this.fields || !this.fields.length) {
            this.fields = [
                new BaseField({
                    name:"用户名",
                    fieldId: "inputInviteCode",
                    fieldType: "text",
                    mandatory: true,
                    modelAttr: "invitationCode",
                    buildValidatorDiv: this.buildValidatorDiv
                })
            ];
        }
        this.model =  new User();
        //fromPageName will be 'setting' or 'share'
        this.notifier = new Backbone.Notifier();
        this.render();
    },
    render:function(){
        var self = this;
        this.modal = this.notifier.notify({
            fadeInMs: 0,
            fadeOutMs: 0,
            ms: null,
            message: self.template(),
            modal: true,
            closeBtn: true,
            position: 'center',
            cls: self.modalClass,//
            width:'600'
        });
        self.bindEvents();
    },
    bindEvents:function(){
        BaseFormView.prototype.bindEvents.call(this);
    },

    submitAction: function () {
        var that = this;
        app.userManager.changeInfo(this.model, {
            "success": function(user){
                that.saveSuccess.call(this,user);
            },
            "error": that.saveError
        });
        $("#updateInviteCode").attr("value", "保存中...").attr('disabled',true);
    },

    saveSuccess: function (user) {
        app.sessionManager.sessionModel.set("invitationCode", user.get("invitationCode"));
        //成功后需要更新被modal遮罩的view的页面 在我的资料页面或者邀请有礼页面
        this.close();
        app.navigate("mypage/"+this.childViewName, {
            trigger: true
        });
    },
    saveError: function (data) {
        Info.displayNotice(data.message ||"服务器连接失败，请稍后再试。");
        $("#updateInviteCode").attr("value", "更新失败(重试)");
    },
    buildValidatorDiv: function (valid, type, text) {
        //This function overloads baseField's default buildValidatorDiv. It should only be invoked by BaseField's testValue function, thus this refers the BaseForm model in this case,
        //This function is not bound to the view.
        $("#"+this.get("fieldId")+"_info").remove();
        if (valid) {
            return '<span class="success" id="'+this.get("fieldId")+'_right"></span>';
        } else if (type === "empty") {
            return '<span class="wrong" id="'+this.get("fieldId")+'_wrong" ><span class="form_tip"><span class="form_tip_top">' + this.get("name")+"不能为空" + '</span><span class="form_tip_bottom"></span></span></span>';
        } else if (text) {
            return '<span class="wrong" id="'+this.get("fieldId")+'_wrong"><span class="form_tip"><span class="form_tip_top">' + text + '</span><span class="form_tip_bottom"></span></span></span>';
        } else {
            return '<span class="wrong" id="'+this.get("fieldId")+'_wrong"><span class="form_tip"><span class="form_tip_top">' +  this.get("errorText") + '</span><span class="form_tip_bottom"></span></span></span>';
        }
    },

    close: function () {
        if (!this.isClosed) {
            this.modal.destroy();
            this.notifier = null;
        }
    }
});