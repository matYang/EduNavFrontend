var PersonalUtilityView = Backbone.View.extend({
    el:"#profilePage_content",
    initialize: function (params) {
        _.bindAll(this, 'render', 'close', 'prepareImgUpload', 'savePersonalInfo', 'saveFile', 'savePassword', 'passwordSuccess', 'passwordError', 'toggleNotificationMethods', 'testInput', 'bindEvents', 'saveSuccess', 'saveError', 'noticeError', 'noticeSuccess');
        this.isClosed = false;
        this.template = _.template(tpl.get('personalUtility'));
        this.sessionUser = app.sessionManager.getSessionUser();
        this.curUserId = params.intendedUserId;
        if (this.curUserId !== this.sessionUser.get("userId")) {
            throw "unexpected userId";
        }
        if (testMockObj.testMode === true) {
            this.sessionUser = testMockObj.sampleUser;
        }
        try {
            this.geocoder = new google.maps.Geocoder();
        } catch (e) {
            this.geocoderNotAvailable = true;
        }
        this.render();
        this.bindEvents();
        this.bindValidator();
        if (params.query) {
            switch (params.query) {
                case "password":
                    $('#passwordInfo').trigger("click");
                    break;
                case "trade":
                    $('#tradeInfo').trigger("click");
                    break;
                case "avatar":
                    $('#changeDp').trigger("click");
                    break;
                case "passengerVerification":
                    $('#passengerVerification').trigger("click");
                    break;
                case "driverVerification":
                    $('#driverVerification').trigger("click");
                    break;
                case "basic":
                default:
                    $('#basicInfo').trigger("click");
                    break;

            }
        }
    },

    bindEvents: function () {
        var that = this;
        $('#save_personalInfo').on('click', function () {
            that.savePersonalInfo();
        });
        this.$location.on('click', function () {
            // that.editLocation();
        });
        $('#basicInfo').on('click', function () {
            that.$personalContent.show();
            that.$settingContent.hide();
            that.$passwordContent.hide();
            that.$dpContent.hide();
            that.$passengerIdentityContent.hide();
            that.$driverIdentityContent.hide();
            $('.wrong').remove();
            $('#myPage_edit_control>.active').removeClass("active");
            $(this).addClass("active");
            app.navigate("personal/" + that.sessionUser.id + "/utility/basic");
        });
        $('#passwordInfo').on('click', function () {
            that.$personalContent.hide();
            that.$settingContent.hide();
            that.$passwordContent.show();
            that.$dpContent.hide();
            that.$passengerIdentityContent.hide();
            that.$driverIdentityContent.hide();
            $('.wrong').remove();
            $('#myPage_edit_control>.active').removeClass("active");
            $(this).addClass("active");
            app.navigate("personal/" + that.sessionUser.id + "/utility/password");
        });
        $('#tradeInfo').on('click', function () {
            that.$personalContent.hide();
            that.$settingContent.show();
            that.$passwordContent.hide();
            that.$dpContent.hide();
            that.$passengerIdentityContent.hide();
            that.$driverIdentityContent.hide();
            $('#myPage_edit_control>.active').removeClass("active");
            $(this).addClass("active");
            app.navigate("personal/" + that.sessionUser.id + "/utility/trade");
        });
        $('#changeDp').on('click', function () {
            that.$personalContent.hide();
            that.$settingContent.hide();
            that.$passwordContent.hide();
            that.$dpContent.show();
            that.$passengerIdentityContent.hide();
            that.$driverIdentityContent.hide();
            $('.wrong').remove();
            $('#myPage_edit_control>.active').removeClass("active");
            $(this).addClass("active");
            app.navigate("personal/" + that.sessionUser.id + "/utility/avatar");
        });
        $('#passengerVerification').on("click", function (e) {
            that.$personalContent.hide();
            that.$settingContent.hide();
            that.$passwordContent.hide();
            that.$dpContent.hide();
            that.$passengerIdentityContent.show();
            that.$driverIdentityContent.hide();
            $('.wrong').remove();
            $('#myPage_edit_control>.active').removeClass("active");
            $(this).addClass("active");
            app.navigate("personal/" + that.sessionUser.id + "/utility/passengerVerification");
            that.switchToIdentityView("passenger");

        });
        $('#driverVerification').on("click", function (e) {
            that.$personalContent.hide();
            that.$settingContent.hide();
            that.$passwordContent.hide();
            that.$dpContent.hide();
            that.$driverIdentityContent.show();
            that.$passengerIdentityContent.hide();
            $('.wrong').remove();
            $('#myPage_edit_control>.active').removeClass("active");
            $(this).addClass("active");
            app.navigate("personal/" + that.sessionUser.id + "/utility/driverVerification");
            that.switchToIdentityView("driver");
        });

        $('#upload_picture').on('click', function () {
            //TODO:
        });
        $("#submit_password").children("input").on('click', function () {
            if (that.passwordValid.o && that.passwordValid.n && that.passwordValid.c) {
                that.savePassword($("input[name=oldPassword]").val(), $("input[name=newPassword]").val(), $("input[name=confirmNewPassword]").val());
            }
        });
        $("#reset_password").on('click', function () {
            that.$oldPassword.val("");
            that.$newPassword.val("");
            that.$confirmPassword.val("");
        });

        $("dd[name=gender]").on('click', "div", function (e) {
            $(e.delegateTarget).find(".radio_box_checked").removeClass("radio_box_checked");
            $(this).addClass("radio_box_checked");
        })
        this.$qq.on('keypress', function (e) {
            that.testInput(e, "^[0-9]+$");
        });
        this.$phone.on('keypress', function (e) {
            that.testInput(e, "^[0-9]+$");
        });
        this.$location.on('keypress', function (e) {
            e.preventDefault();
        });

        $('#notice_toggle').on('click', '.checkbox', function (e) {
            var to;
            if ($(e.target).hasClass("checked")) {
                $(e.target).removeClass("checked");
                to = false;
            } else {
                $(e.target).addClass("checked");
                to = true;
            }
            that.toggleNotificationMethods($(e.target).attr("data-id"), to);
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
                    var path = app.sessionManager.getSessionUser().get("imgPath");
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
        this.$location.on('blur', function (e) {

        });
        this.$qq.on('blur', function (e) {
            $("#qqWrong").remove();
            if (!this.value) {
                return;
            }
            if (!($.isNumeric(this.value)) || this.value.length > 10 || this.value.length < 5) {
                $(this).parent().parent().after("<dd id='qqWrong' class='wrong'><p>很抱歉，QQ的格式不对，请重新输入</p></dd>");
            } else {
                $(this).after("<span id='qqRight' class='right'></span>");
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
        this.$birthyear.add(this.$birthmonth).add(this.$birthday).on("blur", function (e) {
            var yi = that.$birthyear.val(), mi = that.$birthmonth.val(), di = that.$birthday.val(), bdvalid = true;
            var y = Utilities.toInt(yi);
            var m = Utilities.toInt(mi);
            var d = Utilities.toInt(di);
            $("#birthwrong").remove();
            $("#birthdaycheck").remove();
            if ( yi && mi && di && !( isNaN(y) || isNaN(m) || isNaN(d))) {
                if ( y < 1910 || y > 2012 ) {
                    bdvalid = false;
                }
                if ( m < 1 || m > 12 ) {
                    bdvalid = false;
                }
                if (d < 1 || d > 31) {
                    bdvalid = false;
                } else if (m === 4 || m === 6 ||m === 9 || m === 11){
                    bdvalid = bdvalid && (d <= 30);
                } else if (m === 2) {
                    if ( y % 4 === 0 ) {
                        bdvalid = bdvalid && (d <= 29);
                    } else {
                        bdvalid = bdvalid && (d <= 28)
                    }
                }
                if (!bdvalid) {
                    $(this).parent().parent().after("<dd class='wrong' id='birthwrong' title='请填写正确的日期'><p>请填写正确的日期</p></dd>");
                } else {
                    if ($("#birthdaycheck").length === 0) {
                        $(this).parent().append('<span id="birthdaycheck" class="right"></span>');
                    }
                }
            } else if ( isNaN(y) || isNaN(m) || isNaN(d)) {
                $(this).parent().parent().after("<dd class='wrong' id='birthwrong' title='请填写正确的日期'><p>请填写正确的日期</p></dd>");
                bdvalid = false;
            } else {
                $(this).parent().parent().after("<dd class='wrong' id='birthwrong' title='请填写正确的日期'><p>请填写正确的日期</p></dd>");
            }
        });

        this.$oldPassword.on('blur', function (e) {
            if (Utilities.isEmpty(this.value)) {
                if (!$("#pvalid1").length) {
                    $("#oldPassword").after('<dd id="pvalid1" class="wrong"><p>密码输入错误，请重新输入</p></dd>');
                }
                that.passwordValid.o = false;
            } else {
                $("#pvalid1").remove();
                that.passwordValid.o = true;
            }
        });
        this.$newPassword.on('blur', function (e) {
            $("#pcheck2").remove();
            $("#pcheck3").remove();
            if (Utilities.isEmpty(this.value) || this.value.length < 6) {
                if (!$("#pvalid2").length) {
                    $("#newPassword").after('<dd id="pvalid2" class="wrong"><p>密码长度至少6位</p></dd>');
                }
                that.passwordValid.n = false;
            } else {
                if (!$("#pcheck2").length) {
                    $(this).after('<span id="pcheck2" class="right"></span>');
                }
                $("#pvalid2").remove();
                that.passwordValid.n = true;
            }
            if (this.value !== that.$confirmPassword.val() && that.$confirmPassword.val()) {
                if (!$("#pvalid3").length) {
                    $("#confirmNewPassword").after('<dd id="pvalid3" class="wrong"><p>两次密码不一致</p></dd>');
                }
                that.passwordValid.c = false;
            } else {
                if (!$("#pcheck3").length) {
                    $("#confirmNewPassword").after('<span id="pcheck3" class="right"></span>');
                }
                $("#pvalid3").remove();
                that.passwordValid.c = true;
            }
        });
        this.$confirmPassword.on('blur', function (e) {
            $("#pcheck3").remove();
            if (Utilities.isEmpty(this.value) || this.value !== that.$newPassword.val()) {
                if (!$("#pvalid3").length) {
                    $("#confirmNewPassword").after('<dd id="pvalid3" class="wrong"><p>两次密码不一致</p></dd>');
                }
                that.passwordValid.c = false;
            } else {
                if (!$("#pcheck3").length) {
                    $(this).after('<span id="pcheck3" class="right"></span>');
                }
                $("#pvalid3").remove();
                that.passwordValid.c = true;
            }
        });

    },
    render: function () {
        var that = this;
        this.$el.append(this.template);
        this.$name = $("input[name=name]").val(this.sessionUser.get("name"));
        this.$phone = $('input[name=phone]').val(this.sessionUser.get("phone"));
        this.$qq = $('input[name=qq]').val(this.sessionUser.get("qq"));
        this.$location = $('input[name=location]');
        this.$gender = $("dd[name=gender]>div").removeClass("radio_box_checked");
        $("dd[name=gender] [data-id=" + this.sessionUser.get("gender") + "]").addClass("radio_box_checked");
        this.$birthyear = $('input[name=birthyear]');
        this.$birthmonth = $('input[name=birthmonth]');
        this.$birthday = $('input[name=birthday]');
        if (this.sessionUser.get("birthday").getFullYear() !== new Date ().getFullYear()) {
            this.$birthyear.val(this.sessionUser.get("birthday").getFullYear());
            this.$birthmonth.val(this.sessionUser.get("birthday").getMonth() + 1);
            this.$birthday.val(this.sessionUser.get("birthday").getDate());
        }
        this.$personalContent = $("#utility_personalInfo");
        this.$passwordContent = $('#utility_password').hide();
        this.$settingContent = $('#utility_accountSetting').hide();
        this.$dpContent = $('#utility_dp').hide();
        this.$passengerIdentityContent = $('#utility_passengerIdentity').hide();
        this.$driverIdentityContent = $('#utility_driverIdentity').hide();
        this.$dpContent.find('img').attr("src", this.sessionUser.get("imgPath"));

        var notificationMethod;
        if (this.sessionUser.get("emailNotice") && this.sessionUser.get("phoneNotice")) {
            notificationMethod = "both";
        } else if (this.sessionUser.get("emailNotice")) {
            notificationMethod = "email";
        } else if (this.sessionUser.get("phoneNotice")) {
            notificationMethod = "phone";
        }
        this.editedLocation = this.sessionUser.get("location");
        this.$oldPassword = $('input[name=oldPassword]');
        this.$newPassword = $('input[name=newPassword]');
        this.$confirmPassword = $('input[name=confirmNewPassword]');
        this.$address = $('#personal_editAddress');
        this.$location.on('click', function (e) {
            that.locationDropDownView = new LocationDropDownView($("#myPage_location"), that);
            e.stopPropagation();
        });
        if (this.geocoderNotAvailable) {
            this.$address.prop("disabled", "true");
            this.$address.attr("title", "暂时无法连接geocoder，无法更改地址");
        } else {
            this.$address.on('blur', function (e) {
                if ($(this).val()) {
                    that.editedLocation.set("defaultId", -1);
                    that.editedLocation.set("pointAddress", $(this).val());
                    that.getLatLng(that.editedLocation);
                }
            });
        }
        $("#accountEmailValue").html(this.sessionUser.get("email"));
        if (this.sessionUser.get("emailNotice")) {
            $("#notice_toggle").children("div[data-id=email]").addClass("checked");
        }

        this.$address.val(that.sessionUser.get("location").get("pointAddress"));
        this.$location.val(that.sessionUser.get("location").get("pointName"));
        var matchId = that.sessionUser.get("location").get("match_Id");
        if (!this.defaultLocations) {
            app.locationService.getDefaultLocations(function () {
                if (matchId >= 0) {
                    that.$location.val(that.defaultLocations.get(that.sessionUser.get("location").get("match_Id")).toUiString());
                }
            }, this);
        } else {
            this.$location.val(that.defaultLocations.get(that.sessionUser.get("location").get("match_Id")).toUiString());
        }
    },


    getLatLng: function (loc) {
        var request = {}, that = this;
        request.address = loc.get("pointAddress") + "," + loc.get("city") + "," + loc.get("province");
        if (this.geocoderNotAvailable) {
            var result = this.geocoder.geocode(request, function (geocodeResults, status) {
                $("#addrWrong, #addrCorrect").remove();
                if (status == google.maps.GeocoderStatus.OK) {
                    loc.set("lat", geocodeResults[0].geometry.location.lat());
                    loc.set("lng", geocodeResults[0].geometry.location.lng());
                    loc.set("pointAddress", geocodeResults[0].formatted_address);
                    loc.set("pointName", geocodeResults[0].formatted_address.split(",")[0]);
                    if (!that.pivotLocation) {
                        that.pivotLocation = app.locationService.getDefaultLocations().where({"defaultId":app.sessionManager.getSessionUser().get("location").get("match_Id")})[0];
                    }
                    if (!that.pivotLocation.isInRange(loc) && $("#addrWrong").length === 0) {
                        that.$address.parent().parent().after("<dd class='wrong'><p>很抱歉，该地址不在服务区内</p></dd>");
                        return;
                    } else {
                        if ($("#addrCorrect").length === 0) {
                            that.$address.after("<span id='addrCorrect' class='right'></span>");
                        }
                    }
                } else {
                    Info.warn('Geocode was not successful for the following reason: ' + status);
                }
            });
        } else {

        }
    },
    acceptDefaultLocation: function(defaultLocation){
        if (this.editedLocation.get("match_Id") !== defaultLocation.get("defaultId")) {
            this.pivotLocation = defaultLocation;
            this.editedLocation = defaultLocation.clone();
            this.$location.val(this.pivotLocation.toUiString());
            this.$address.val("");
        }
    },
    savePersonalInfo: function () {
        var that = this, date = new Date ();
        var gender = Utilities.toInt($("dd[name=gender]>.radio_box_checked").attr("data-id"));
        this.$name.trigger("focus").trigger("blur");
        this.$birthyear.trigger("focus").trigger("blur");
        this.$address.trigger("focus").trigger("blur");
        date.setYear(Utilities.toInt(this.$birthyear.val()));
        date.setMonth(Utilities.toInt(this.$birthmonth.val()) - 1);
        date.setDate(Utilities.toInt(this.$birthday.val()));
        if ($(".wrong").length) {
            return;
        }
        app.userManager.changeContactInfo(this.$name.val(), gender, this.$phone.val(), this.$qq.val(), date, this.editedLocation, {
            "success": that.saveSuccess,
            "error": that.saveError
        });
        $("#save_personalInfo").attr("value", "保存中...");
    },

    saveSuccess: function () {
        $("#save_personalInfo").attr("value", "更新完毕");
        $("#myPage_myInfo").find("p[data-id=name]").html("姓名："+this.sessionUser.get("name"));
        $("#myPage_myInfo").find("p[data-id=gender]").html("性别："+ ( (this.sessionUser.get("gender") === Constants.gender.male) ? "男" : "女"));
        $("#myPage_myInfo").find("p[data-id=age]").html("年龄："+this.sessionUser.getAge());
        $("#myPage_myInfo").find("p[data-id=location]").html("地区："+this.sessionUser.get("location").get("pointName"));
        app.navigate("personal/" + app.sessionManager.getUserId() + "/utility", {
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

    savePassword: function (oldPassword, newPassword, confirmNewPassword) {
        app.userManager.changePassword(oldPassword, newPassword, confirmNewPassword, {
            "success": this.passwordSuccess,
            "error": this.passwordError
        });
    },
    passwordSuccess: function () {
        Info.displayNotice("密码修改成功");
        app.navigate('/temp', {
            replace: true
        });
        app.navigate("personal/" + app.sessionManager.getUserId() + "/utility", {
            trigger: true
        });
    },
    passwordError: function () {
        Info.displayNotice("密码修改失败，请重试");
    },
    toggleNotificationMethods: function (value, to) {

        app.userManager.toggleNotices(to, this.sessionUser.get(""), {
            "success": this.noticeSuccess,
            "error": this.noticeError
        });
    },
    noticeSuccess: function () {

    },
    noticeError: function () {

    },

    switchToIdentityView: function (type) {
        if (type === "passenger" && !this.passengerIdentityView) {
            this.passengerIdentityView = new passengerIdentityVerificationView({"curUserId": this.curUserId});
        } else if (type === "driver" && !this.driverIdentityView) {
            this.driverIdentityView = new driverIdentityVerificationView({"curUserId": this.curUserId});
        }
    },
    close: function () {
        if (!this.isClosed) {
            $('#save_personalInfo').off();
            $('input[name=location]').off();
            $('input[name=phone]').off();
            $('input[name=qq]').off();
            $('input[name=name]').off();
            $('#upload_picture').off();
            $("#submit_password").off();
            $("#reset_password").off();
            $('#basicInfo').off();
            $('#passwordInfo').off();
            $('#tradeInfo').off();
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

