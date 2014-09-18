var MyPageSettingView = BaseFormView.extend({
    el: "#mypage_content",
    form: false,
    submitButtonId: "updateInfo",

    initialize: function () {
        _.bindAll(this, 'render', 'close', 'submitAction', 'bindEvents', 'setChoosedSchool', 'saveSuccess', 'saveError');
        this.isClosed = false;
        if (!this.fields || !this.fields.length) {
            this.fields = [
                new BaseField({
                    name: "名字",
                    fieldId: "inputName",
                    fieldType: "text",
                    mandatory: true,
                    modelAttr: "name",
                    buildValidatorDiv: this.buildValidatorDiv
                }),
                new BaseField({
                    name: "E-mail",
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

        app.viewRegistration.register(this);
        this.chooseSchoolView = new ChooseSchoolView({view: this});
//        this.chooseWorkView = new ChooseWorkView({view:this});
        this.render();
        this.bindEvents();
    },

    render: function () {
        this.sessionModel = app.sessionManager.sessionModel;
        //model在这里只是一个临时的模型 用于保存用户临时的输入 只有提交后才会更新到sessionModel中 sessionModel保存了用户的所有资料
        this.model = new User(this.sessionModel.attributes);
        //初始化学校信息
        this.choosedSchool = {
            id: this.model.schoolId,
            name: this.model.schoolName
        };
        this.$el.html(this.template(this.model._toJSON()));
    },
    bindEvents: function () {
        var self = this;
        BaseFormView.prototype.bindEvents.call(this);
        $('.js_setUsernameModal').on('click', function () {
            //打开设置用户名的modal
            self.usernameModal = new UsernameModal({view: self});
        });
        //选择学校
        $('#inputSchool').focus(function () {
            //alert(self.chooseSchoolView.isShow);
            if (!self.chooseSchoolView.isShow)
                self.chooseSchoolView.show();

        });
//        $('#inputWork').focus(function () {
//            console.log(111);
//            self.chooseWorkView.show();
//        });
    },

    setChoosedSchool: function (schoolObj) {
        this.choosedSchool = schoolObj;
        $('#inputSchool').val(schoolObj.name);
    },

    submitAction: function () {
        var that = this, date = new Date();
        this.model.set('gender', $('input[name="sex"]:checked').val());
        this.model.set('schoolId', that.choosedSchool.id);

//        this.model.set('identify',$('input[name="identify"]:checked').val());//todo 已工作或者还是学生

        //这里和usernameModal中调用的方法为同一个 在更新资料时不能更新用户名 invitationCode 因此需要去除用户名才能提交更新
        this.model.set('invitationCode', undefined);
        app.userManager.changeInfo(this.model, {
            "success": that.saveSuccess,
            "error": that.saveError
        });
        $("#updateInfo").attr("value", "保存中...");
    },

    saveSuccess: function (user) {
        //将更新成功后的user信息同步到sessionModel中
        app.sessionManager.sessionModel = user;
        this.model = new User(user.attributes);
        $("#updateInfo").attr("value", "更新完毕");
        $("#mypage_name").html(this.model.get("name"));
        $("#username").html(this.model.get("name"));
        $("#mypage_info").find("p[class=email]").html("<span></span>" + this.model.get("email"));

        //refresh view
        app.navigate("mypage/setting", {
            trigger: true
        });
    },
    saveError: function (data) {
        Info.displayNotice(data.message || "服务器连接失败，请稍后再试。");
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
        $("#" + this.get("fieldId") + "_info").remove();
        if (valid) {
            return '<span class="success" id="' + this.get("fieldId") + '_right"></span>';
        } else if (type === "empty") {
            return '<span class="wrong" id="' + this.get("fieldId") + '_wrong" ><span class="form_tip"><span class="form_tip_top">' + this.get("name") + "不能为空" + '</span><span class="form_tip_bottom"></span></span></span>';
        } else if (text) {
            return '<span class="wrong" id="' + this.get("fieldId") + '_wrong"><span class="form_tip"><span class="form_tip_top">' + text + '</span><span class="form_tip_bottom"></span></span></span>';
        } else {
            return '<span class="wrong" id="' + this.get("fieldId") + '_wrong"><span class="form_tip"><span class="form_tip_top">' + this.get("errorText") + '</span><span class="form_tip_bottom"></span></span></span>';
        }
    }
});