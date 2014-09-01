var MyPageSettingView = BaseFormView.extend({
    el:"#mypage_content",
    form: false,
    submitButtonId: "updateInfo",

    initialize: function () {
        _.bindAll(this, 'render', 'close','submitAction', 'bindEvents', 'saveSuccess', 'saveError');
        this.isClosed = false;
        if (!this.fields || !this.fields.length) {
            this.fields = [
                new BaseField({
                    name:"名字",
                    fieldId: "inputName",
                    fieldType: "text",
                    mandatory: true,
                    modelAttr: "name",
                    buildValidatorDiv: this.buildValidatorDiv
                }),
                new BaseField({
                    name:"E-mail",
                    fieldId: "inputEmail",
                    fieldType: "text",
                    mandatory: false,
                    regex: Utilities.emailRegex,
                    modelAttr: "email",
                    buildValidatorDiv: this.buildValidatorDiv,
                    errorText: "邮箱格式不正确"
                })
            ];
        }
        this.template = _.template(tpl.get('mypage_setting'));
        this.model =  app.sessionManager.sessionModel;
        app.viewRegistration.register(this);
        this.render();
        this.bindEvents();
    },

    render: function () {
        this.$el.html(this.template(this.model._toJSON()));
    },
    bindEvents: function () {
        var self = this;
        BaseFormView.prototype.bindEvents.call(this);
        $('.js_setUsernameModal').on('click',function(){
           //打开设置用户名的modal
            self.usernameModal = new UsernameModal({view:self});
        });
    },

    submitAction: function () {
        var that = this, date = new Date ();
        this.model.set('gender',$('input[name="sex"]:checked').val());
        this.model.set('invitationCode',undefined);
//        this.model.set('identify',$('input[name="identify"]:checked').val());//todo 已工作或者还是学生
        app.userManager.changeInfo(this.model, {
            "success": that.saveSuccess,
            "error": that.saveError
        });
        $("#updateInfo").attr("value", "保存中...");
    },

    saveSuccess: function (user) {
        this.model.set("name", user.get("name"));
        this.model.set("email", user.get("email"));
        app.sessionManager.sessionModel.set("name", user.get("name"));
        app.sessionManager.sessionModel.set("email", user.get("email"));
        $("#updateInfo").attr("value", "更新完毕");
        $("#mypage_name").html(this.model.get("name"));
        $("#username").html(this.model.get("name"));
        $("#mypage_info").find("p[class=email]").html("<span></span>" + this.model.get("email"));

        app.navigate("mypage/setting", {
            trigger: true
        });
    },
    saveError: function (data) {
        Info.displayNotice(data.message|| "服务器连接失败，请稍后再试。");
        $("#updateInfo").attr("value", "更新失败(重试)");
    },

    close: function () {
        if (!this.isClosed) {
            $('#save_personalInfo').off();
            $('input[name=phone]').off();
            $('input[name=name]').off();
            $('#upload_picture').off();
            this.$el.empty();
            this.isClosed = true;
        }
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
    }
});