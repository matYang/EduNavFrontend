var MyPageSettingView = BaseFormView.extend({
    el:"#mypage_content",
    form: false,
    submitButtonId: "updateInfo",
    initialize: function () {
        _.bindAll(this, 'render', 'close','submitAction', 'bindEvents', 'saveSuccess', 'saveError');
        this.isClosed = false;
        this.template = _.template(tpl.get('mypage_setting'));
        this.model = app.sessionManager.sessionModel.clone();
        app.viewRegistration.register(this);
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
                buildValidatorDiv: this.buildValidatorDiv
            })
        ];
        if (testMockObj.testMode === true) {
            this.model = testMockObj.sampleUser;
        }
        this.render();
        this.bindEvents();
    },

    render: function () {
        this.$el.append(this.template(this.model._toJSON()));
    },
    bindEvents: function () {
        BaseFormView.prototype.bindEvents.call(this);
    },

    submitAction: function () {
        var that = this, date = new Date ();
        app.userManager.changeInfo(this.model, {
            "success": that.saveSuccess,
            "error": that.saveError
        });
        $("#updateInfo").attr("value", "保存中...");
    },

    saveSuccess: function () {
        $("#updateInfo").attr("value", "更新完毕");
        $("#myPage_myInfo").find("p[data-id=name]").html("姓名："+this.model.get("name"));
        app.navigate("mypage/setting", {
            trigger: true
        });
    },
    saveError: function () {
        Info.warn("Personal info update failed");
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
    }, 
});

