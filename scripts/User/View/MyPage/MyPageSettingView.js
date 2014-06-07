var MyPageSettingView = BaseFormView.extend({
    el:"#mypage_content",
    form: false,
    submitButtonId: "submit_password",
    initialize: function () {
        _.bindAll(this, 'render', 'close', 'prepareImgUpload', 'savePersonalInfo', 'saveFile', 'savePassword', 'passwordSuccess', 'passwordError', 'testInput', 'bindEvents', 'saveSuccess', 'saveError');
        this.isClosed = false;
        this.template = _.template(tpl.get('personalUtility'));
        this.model = app.sessionManager.sessionModel.clone();

        if (testMockObj.testMode === true) {
            this.sessionUser = testMockObj.sampleUser;
        }
        this.render();
        this.bindEvents();
        this.bindValidator();
    },

    bindEvents: function () {
        var that = this;
        $('#save_personalInfo').on('click', function () {
            that.savePersonalInfo();
        });

        
        $("#reset_password").on('click', function () {
            that.$oldPassword.val("");
            that.$newPassword.val("");
            that.$confirmPassword.val("");
        });
        this.$phone.on('keypress', function (e) {
            that.testInput(e, "^[0-9]+$");
        });


        this.prepareImgUpload(document.getElementById('uploadform'), Constants.origin + '/api/v1.0/users/img/' + app.sessionManager.getUserId(), "uploadTarget");
        $("#uploadform").attr("target", "uploadTarget");
        $("#selectImg").on("change", function (e) {
            $("#img-filePath").html(e.target.value);
        });
        $("#submitImg").on("click", function (e) {
            $("#fileValid").hide();
            var file = $("input[type=file]").val();
            if (file == '') {
                $("#fileValid").show().find("p").html("请先选择一个图片");
                e.preventDefault();
            } else {
                //Check file extension
                var ext = file.split('.').pop().toLowerCase();   //Check file extension if valid or expected

                if ($.inArray(ext, ['png', 'jpg', 'jpeg', 'bmp']) == -1) {
                    $("#fileValid>p").show().find("p").html("文件类型错误");
                    e.preventDefault(); //Prevent submission of form
                }
                else {
                    $(this).val("上传中...");

                }
            }
        });
    },

    prepareImgUpload: function (formElem, action, callback) {
        // we name a callback that will be called from inside the iframe
        // var callbackName = 'iframe' + Math.ceil(Math.random() * 10000);
        var iframe = document.createElement('iframe');
        action = action + (action.indexOf('?') == -1 ? '?' : '&');

        // we create an iframe and use the callback as its name (why not).
        iframe.setAttribute('name', callback);
        iframe.style.display = 'none';

        // we add the target and edit the action of the form
        formElem.setAttribute('target', callback);
        formElem.setAttribute('action', action);

        // we add the hidden iframe after the form
        formElem.parentNode.appendChild(iframe);

        $(iframe).one("load", function () {
            app.sessionManager.fetchSession(true, {
                "success": function () {
                    var path = app.sessionManager.sessionModel.get("imgPath");
                    $("#profile_image").attr("src", path);
                    $("#utility_dp>form").find("img").attr("src", path);
                    $("#topBar-avatar").find("img").attr("src", path);
                },
                "error":function(response) {
                    location.reload();
                }
            });
        });

    },

    bindValidator: function () {
        var cmv, cdv, cyv, that = this;
        this.passwordValid = {};
        this.$name.on('blur', function (e) {
            $("#nameWrong,#nameCorrect").remove();
            var nameValue = this.value ? this.value.trim() : "";
            if (Utilities.isEmpty(nameValue)) {
                $(this).parent().parent().after("<dd id='nameWrong' class='wrong'><p>名字不能为空</p></dd>");
            } else if (nameValue.split(" ").length > 2) {
                $(this).parent().parent().after("<dd id='nameWrong' class='wrong'><p>名字不能有超过一个空格</p></dd>");
            } else {
                $(this).after("<span id='nameCorrect' class='right'></span>");
            }
        });
        this.$phone.on('blur', function (e) {
            $("#phoneWrong,#phoneRight").remove();
            if (!$(this).val()) {
                return;
            }
            if (!($.isNumeric(this.value)) || this.value.length > 11 || this.value.length < 8) {
                $(this).parent().parent().after("<dd id='phoneWrong' class='wrong'><p>很抱歉，电话的格式不对，请重新输入</p></dd>");
            } else {
                $(this).after("<span id='phoneRight' class='right'></span>");
            }
        });

    },
    render: function () {
        var that = this;
        this.$el.append(this.template);
        this.$name = $("input[name=name]").val(this.sessionUser.get("name"));
        this.$phone = $('input[name=phone]').val(this.sessionUser.get("phone"));
        this.$personalContent = $("#utility_personalInfo");
        this.$dpContent = $('#utility_dp').hide();
        this.$dpContent.find('img').attr("src", this.sessionUser.get("imgPath"));

    },
    savePersonalInfo: function () {
        var that = this, date = new Date ();
        this.$name.trigger("focus").trigger("blur");
        if ($(".wrong").length) {
            return;
        }
        app.userManager.changeInfo(this.sessionUser, {
            "success": that.saveSuccess,
            "error": that.saveError
        });
        $("#save_personalInfo").attr("value", "保存中...");
    },

    saveSuccess: function () {
        $("#save_personalInfo").attr("value", "更新完毕");
        $("#myPage_myInfo").find("p[data-id=name]").html("姓名："+this.sessionUser.get("name"));
        app.navigate("mypage/setting", {
            trigger: true
        });
    },
    saveError: function () {
        Info.warn("Personal info update failed");
        $("#save_personalInfo").attr("value", "更新失败(重试)");
    },
    saveFile: function (fileName) {
        var fileTypes = ["png", "jpg", "jpeg", "bmp"], dots, fileType;
        if (!fileName) {
            return;
        }
        dots = fileName.split(".");
        fileType = "." + dots[dots.length - 1];
        return (fileTypes.join(".").indexOf(fileType.toLowerCase()) !== -1);
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

