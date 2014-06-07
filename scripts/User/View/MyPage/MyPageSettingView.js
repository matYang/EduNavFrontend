var MyPageSettingView = BaseFormView.extend({
    el:"#mypage_content",
    form: false,
    submitButtonId: "save_personalInfo",
    initialize: function () {
        _.bindAll(this, 'render', 'close', 'prepareImgUpload', 'savePersonalInfo', 'saveFile', 'savePassword', 'passwordSuccess', 'passwordError', 'testInput', 'bindEvents', 'saveSuccess', 'saveError');
        this.isClosed = false;
        this.template = _.template(tpl.get('personalUtility'));
        this.model = app.sessionManager.sessionModel.clone();
        this.field = [
            new BaseField({
                name:"名字",
                fieldId: "inputName",
                fieldType: "text",
                mandatory: true,
                modelAttr: "name"
            }),
            new BaseField({
                name:"E-mail",
                fieldId: "inputEmail",
                fieldType: "text",
                mandatory: true,
                regex: Utilities.emailRegex,
                modelAttr: "email"
            })
        ];
        if (testMockObj.testMode === true) {
            this.model = testMockObj.sampleUser;
        }
        this.render();
        this.bindEvents();
        this.bindValidator();
    },

    render: function () {
        this.$el.append(this.template);
    },
    bindEvents: function () {
        BaseFormView.prototype.bindEvents.call(this);
    },

    savePersonalInfo: function () {
        var that = this, date = new Date ();
        this.$name.trigger("focus").trigger("blur");
        if ($(".wrong").length) {
            return;
        }
        app.userManager.changeInfo(this.model, {
            "success": that.saveSuccess,
            "error": that.saveError
        });
        $("#save_personalInfo").attr("value", "保存中...");
    },

    saveSuccess: function () {
        $("#save_personalInfo").attr("value", "更新完毕");
        $("#myPage_myInfo").find("p[data-id=name]").html("姓名："+this.model.get("name"));
        app.navigate("mypage/setting", {
            trigger: true
        });
    },
    saveError: function () {
        Info.warn("Personal info update failed");
        $("#save_personalInfo").attr("value", "更新失败(重试)");
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

    testInput: function (event, regularEx) {
        var regex = new RegExp (regularEx), key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
            event.preventDefault();
            return false;
        }
        if (!regex.test(event.target.value)) {
            event.target.value = "";
            return false;
        }
    }
});

