/*教师详情弹出框View*/
//var UsernameModal = Modal.extend({
//    modalEl: '#usernameModal',//todo 后续需要根据modalId向template中添加id
//    template: _.template(tpl.get("mypage_usernameModal")),
//    static: false,
//    keyboard:true,
//    //todo 可传入参数
//    initialize: function (opt) {
//        _.bindAll(this, 'submitAction','saveSuccess','saveError','buildValidatorDiv','nameSet');
//        Modal.prototype.initialize.call(this);
//        this.parentView = opt.view;
//    },
//    show: function () {
//        var that = this;
//        Modal.prototype.show.call(this);
//        //below can bind more events..
//        //this.buildValidatorDiv();
//
//        //焦点不在用户名输入框内触发
//        this.$modalEl.find("#inputInviteCode").blur(function(){
//            that.txt = $("#inputInviteCode").val();
//            $("#inputInviteCode_right").remove();
//            $("#inputInviteCode_wrong").remove();
//            that.buildValidatorDiv(that.nameSet(that.txt));
//
//        });
//        //确认修改用户名按钮
//        this.$modalEl.on("click","#updateInviteCode",function(){
//            if (that.nameSet(that.txt) != 3){
//                return;
//            }
//            that.submitAction();
//        });
//
//
//    },
//    nameSet:function(name){
//        //正则匹配中英文，字母下划线
//        var reg = new RegExp('^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$');
//        if(name === "" || name === null){
//            return 1;
//        }else if(!reg.test(name)){
//            return 2;
//        }else{
//            return 3;
//        }
//    },
//    submitAction: function () {
//        var that = this;
//        app.userManager.changeInfo(this.model, {
//            success: function(user){
//                that.saveSuccess(user);
//            },
//            error: that.saveError
//        });
//        $("#updateInviteCode").attr("value", "保存中...").attr('disabled',true);
//    },
//
//    saveSuccess: function (user) {
//        app.sessionManager.sessionModel.set("invitationCode", this.txt);
//        //成功后需要更新被modal遮罩的view的页面 在我的资料页面或者邀请有礼页面
//        this.close();
//        this.parentView.render();
////        app.navigate("mypage/"+this.childViewName, {
////            trigger: true
////        });
//    },
//    saveError: function (data) {
//        Info.displayNotice(data.message ||"服务器连接失败，请稍后再试。");
//        $("#updateInviteCode").attr("value", "更新失败(重试)").attr('disabled',false);
//    },
//    buildValidatorDiv: function (valid) {
//        //This function overloads baseField's default buildValidatorDiv. It should only be invoked by BaseField's testValue function, thus this refers the BaseForm model in this case,
//        //This function is not bound to the view.
//
//
//        $("#inputInviteCode_info").remove();
//
//        if (valid == 1) {
//            $("#inputInviteCode").after('<span class="wrong" id="inputInviteCode_wrong" ><span class="form_tip"><span class="form_tip_top">' + "不能为空" + '</span><span class="form_tip_bottom"></span></span></span>');
//            //return '<span class="wrong" id="inputInviteCode_wrong" ><span class="form_tip"><span class="form_tip_top">' + this.get("name")+"不能为空" + '</span><span class="form_tip_bottom"></span></span></span>';
//        }else if (valid == 2) {
//            $("#inputInviteCode").after('<span class="wrong" id="inputInviteCode_wrong" ><span class="form_tip"><span class="form_tip_top">' + '中英文，数字或者下划线(不能开头和结尾)' + '</span><span class="form_tip_bottom"></span></span></span>');
//        }else{
//            $("#inputInviteCode").after('<span class="success" id="inputInviteCode_right"></span>');
//        }
//    },
//    hide: function () {
//        Modal.prototype.hide.call(this);
//        //below should unbind events bound in 'show' function..
//    },
//    close: function () {
//        Modal.prototype.close.call(this);
//    }
//});