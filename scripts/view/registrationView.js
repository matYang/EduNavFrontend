
/*dedicated view for user registration, deep linking will not be used for registrtion states, this view holds the session data*/
var RegistrationView = Backbone.View.extend({

    el: "",

    initialize: function(params){
        _.bindAll(this, 'render', 'bindEvents', 'finish', 'acceptDefaultLocation', 'closeLocationDropDown', 'verifyEmail', 'close');
        app.viewRegistration.register("registration", this, true);
        this.isClosed = false;
        this.state = params.state || "default";

        this.baseTemplate = _.template(tpl.get('registration'));
        this.finishTemplate = _.template(tpl.get('registration_finish'));
        this.registerInfo = {"location":new UserLocation(),"gender":Constants.gender.female};
        this.out = false;
        this.geocoder = new google.maps.Geocoder();
        this.render(1);
    },
    getLatLng: function (loc) {
        var request = {}, that = this;
        loc.set("defaultId", -1);
        request.address = loc.get("pointAddress") + "," + loc.get("city") + "," + loc.get("province");
        var result = this.geocoder.geocode(request, function (geocodeResults, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                loc.set("lat", geocodeResults[0].geometry.location.lat());
                loc.set("lng", geocodeResults[0].geometry.location.lng());
                that.valid.location = false;
                if (!that.registerInfo.pivot) {
                    $("#pivotLocation").parent().children('.sign_up_err').remove();
                    $("#pivotLocation").parent().addClass("wrong").append("<p class='sign_up_err' id='vlocation' title='请选择一个地区'><span>请选择一个地区</span></p>");
                    return;
                }
                if (!that.registerInfo.pivot.isInRange(loc)) {
                    $("#pivotLocation").parent().children('.sign_up_err').remove();
                    $("#pivotLocation").parent().addClass("wrong").append("<p class='sign_up_err' id='vlocation' title='对不起，该地区暂时不在服务区'><span>对不起，该地区暂时不在服务区</span></p>");
                    return;
                }
                that.valid.location = true;
            } else {
                Info.warn('Geocode was not successful for the following reason: ' + status);
            }
        });
    },
    render: function(){
        this.domContainer = $('#content');
        this.domContainer.empty();
        if (this.state !== "finish") {
            this.domContainer.append(this.baseTemplate);
            this.registerContainer = $('#registerContainer');
            this.contentContainer = $('#registerContent');
            $("#loginBox").hide();
            this.$password = $("#registerPasswordInput");
            this.$confirm = $("#registerPasswordConfirmInput");
            this.$email = $('#registerEmailInput');
            this.$year = $("#birthyear");
            this.$month = $("#birthmonth");
            this.$day = $("#birthday");
            this.$name = $("#registerNameInput");
            this.bindEvents();
            this.bindValidator();
        } else {
            this.domContainer.append(this.finishTemplate);
            $("#emailValue").html(this.emailCache);
            
            if (!this.emailCache) {
                this.emailCache = Utilities.getCookie("registrationEmail");
            }
            if (!this.emailCache) {
                app.navigate("front", {trigger:true, replace:true});
            }
            var domain = this.emailCache.split("@")[1];
            var emailDomain = Constants.emailLink[domain] || domain;
            $("#gotoEmail").on("click", function (e) {
                window.open("http://"+emailDomain);
            });
            $("#resendEmail").on("click", function (e) {
                app.userManager.resendActivationEmail();
            });
        }

        // --- events binding ---
    },
    bindValidator: function(){
        this.valid = {};
        this.valid.location = true;
        //email regex
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            that = this;
        this.$name.on("blur", function (e) {
            $("#vname").remove();
            that.$name.parent().removeClass("wrong");
            if (that.$name.val() && that.$name.val().length > 1) {
                that.valid.name = true;
                that.registerInfo.name = that.$name.val();
                that.$name.after('<span id="vname" class="right"></span>');
            } else {
                that.valid.name = false;
                that.registerInfo.name = "";
                that.$name.parent().addClass("wrong").append('<p class="sign_up_err" id="vname" title="请填写姓名"><span>请填写姓名</span></p>');
            }
        });
        this.$email.on("blur", function (e) {
            $("#vemail").remove();
            that.$email.parent().removeClass("wrong");
            if (re.test(that.$email.val())) {
                that.valid.email = true;
                that.registerInfo.email = that.$email.val();
                app.userManager.verifyEmail(that.registerInfo.email, {
                    "success": that.verifyEmail,
                    "error": function(response) {

                    }
                })
                if ($("#vemail").length === 0){
                    that.$email.after('<span id="vemail" class="right"></span>');
                }
            } else {
                that.valid.email = false;
                that.$email.parent().addClass("wrong").append('<p class="sign_up_err" id="vemail" title="邮箱地址有误"><span>邮箱地址有误</span></p>');
            }

        });
        this.$password.add(this.$confirm).on("blur", function (e) {
            var p = that.$password.val();
            $("#vpass").remove();
            $("#vpass2").remove();
            that.$password.parent().removeClass("wrong");
            that.$confirm.parent().removeClass("wrong");
            if (p && p.length >= 6 && that.$password.val() === that.$confirm.val()) {
                that.$password.after('<span id="vpass" class="right"></span>');
                that.$confirm.after('<span id="vpass2" class="right"></span>');
                that.valid.password = true;
                that.registerInfo.password = that.$password.val();
            } else {
                if (!p || p.length < 6) {
                    that.$password.parent().addClass("wrong").append('<p class="sign_up_err" id="vpass" title="密码长度至少为6位"><span>密码长度至少为6位</span></p>');
                } else {
                    if (that.$confirm.val().length !== 0){
                        that.$confirm.parent().addClass("wrong").append('<p class="sign_up_err" id="vpass2" title="两次输入密码不匹配"><span>两次输入密码不匹配</span></p>');
                    }
                }
                that.valid.password = false;
            }
        });
        this.clicked = {};
        this.$year.on("click", function (e) {
            that.clicked.year = true;
        });
        this.$month.on("click", function (e) {
            that.clicked.month = true;
        });
        this.$day.on("click", function (e) {
            that.clicked.day = true;
        });
        this.$year.add(this.$month).add(this.$day).on("blur", function (e) {
            var yi = that.$year.val(), mi = that.$month.val(), di = that.$day.val(), bdvalid = true;
            var y = Utilities.toInt(yi);
            var m = Utilities.toInt(mi);
            var d = Utilities.toInt(di);
            $("#vbirth").remove();
            if ( yi && mi && di && !( isNaN(y) || isNaN(m) || isNaN(d)) ) {
                $(this).parent().removeClass("wrong");
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
                    if (this.clicked.year && this.clicked.month && this.clicked.day) {
                        $(this).parent().addClass("wrong").append("<p class='sign_up_err' id='vbirth' title='请填写正确的日期'><span>请填写正确的日期</span></p>");
                        that.registerInfo.birthday = null;
                        that.valid.birthday = false;
                    }
                } else {
                    $(this).parent().append("<span id='vbirth' class='right'></span>");
                    that.registerInfo.birthday = new Date();
                    that.registerInfo.birthday.setFullYear(y);
                    that.registerInfo.birthday.setMonth(m - 1);
                    that.registerInfo.birthday.setDate(d);
                    that.valid.birthday = true;
                }
            } else if ( isNaN(y) || isNaN(m) || isNaN(d)) {
                $(this).parent().addClass("wrong").append("<p class='sign_up_err' id='vbirth' title='请填写正确的日期'><span>请填写正确的日期</span></p>");
                that.registerInfo.birthday = null;
                that.valid.birthday = false;
            } else {
                that.registerInfo.birthday = null;
            }
        });
    },
    bindEvents: function(){
        var that = this;
        $("#registerGenderSelect").on("click", function (e) {
            $(this).find(".radio_box_checked").removeClass("radio_box_checked");
            var g = $(e.target).addClass("radio_box_checked").attr("data-id");
            if (g === "female") {
                that.registerInfo.gender = Constants.gender.female;
            } else if (g === "male") {
                that.registerInfo.gender = Constants.gender.male;
            }
        });

        $('#pivotLocation').on('click', function (e) {
            that.closeLocationDropDown();
            that.locationDropDownView = new LocationDropDownView($('#sign_up_location_container'), that);
            e.stopPropagation();
        }).on('focus', function (e) {
            that.closeLocationDropDown();
            that.locationDropDownView = new LocationDropDownView($('#sign_up_location_container'), that);
            e.stopPropagation();
        });

        $("#myAddress").on('blur', function (e) {
            if ($(this).val() && $(this).val() !== "请输入具体地址") {
                that.registerInfo.location.set("pointAddress", $(this).val())
            }
            that.getLatLng(that.registerInfo.location);
        }).on('focus', function() {
            if ($(this).val() === "请输入具体地址") {
                $(this).val("");
            }
        });
        $("#complete").on("click", function(){
            if (that.valid.email) {
            } else {
                if ($("#vemail").length === 0) {
                    that.$email.parent().addClass("wrong").append('<p class="sign_up_err" id="vemail" title="请输入你的邮箱"><span>请输入你的邮箱</span></p>');
                }
                return;
            }
            if (that.valid.password) {
            } else {
                if ($("#vpass").length === 0) {
                    that.$password.parent().addClass("wrong").append('<p class="sign_up_err" id="vpass" title="请输入一个密码"><span>请输入一个密码</span></p>');
                    that.$confirm.parent().addClass("wrong").append('<p class="sign_up_err" id="vpass2" title="请输入一个密码"><span>请输入一个密码</span></p>');
                }
                return;   
            }
            if (that.valid.location) {
            } else {
                if ($("#vlocation").length === 0) {
                    $('#pivotLocation').parent().addClass("wrong").append('<p class="sign_up_err" id="vlocation" title="请选择你的地址"><span>请选择你的地址</span></p>');
                }
                return;
            }
            // if (that.valid.birthday ) {

            // } else {
            //     return;
            // }
            that.registerInfo.email = $('#registerEmailInput').val();
            that.registerInfo.password = $('#registerPasswordInput').val();

            var user = new User();
            user.set('location', that.registerInfo.location);
            user.set('gender', that.registerInfo.gender);
            user.set('email', that.registerInfo.email);
            user.set('password', that.registerInfo.password);
            user.set('name', that.registerInfo.name);
            if (that.registerInfo.birthday) {
                user.set("birthday", that.registerInfo.birthday);
            }
            app.userManager.registerUser(user, {
                success: function(){
                    that.emailCache = user.get('email');
                    document.cookie="registrationEmail=" + that.registerInfo.email;
                    app.navigate("register/finish", {trigger: true});
                },

                error: function(response){
                    if (response.responseText){
                        Info.alert(response.responseText);
                    }
                    else{
                      Info.alert("注册失败，请稍后再试");
                    }
                }

            });
            
        });
    },

    finish: function(){
        Info.displayNotice("注册成功");
    },

    acceptDefaultLocation: function(defaultLocation){
        this.registerInfo.pivot = defaultLocation;
        this.registerInfo.pivot.copy(this.registerInfo.location);
        this.registerInfo.location.set("pointAddress", $("#myAddress").val());
        $("#vlocation").remove();
        $('#pivotLocation').val(defaultLocation.toUiString());
    },

    closeLocationDropDown: function(){
        if (typeof this.locationDropDownView !== 'undefined' && this.locationDropDownView !== null){
            this.locationDropDownView.close();
        }
    },

    verifyEmail: function (available) {
        if (available) {
            if ($("#vemail").length === 0) {
                this.$email.after('<span id="vemail" class="right"></span>');
            }
        } else {
            this.valid.email = false;
            $("#vemail").remove();
            this.$email.parent().addClass("wrong").append('<p class="sign_up_err" title="该邮箱已经被注册"><span>该邮箱已经被注册</span></p>');
        }
    },

    close: function(){
        if (!this.isClosed){
            if (this.state !== "finish") {
                this.$name.off();
                this.$email.off();
                this.$password.off();
                this.$year.off();
            }
            document.cookie="registrationEmail=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
            $("#registerGenderSelect").off();

            $('#pivotLocation').off();

            $("#myAddress").off();
            $("#complete").off();
            this.domContainer.empty();
            this.isClosed = true;
        }
    }


});