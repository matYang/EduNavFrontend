/*支付信息确认弹出框(点击支付成功或支付失败)*/
var LoginFastModal = Modal.extend({
    modalEl: '#loginFastModal',
    template: _.template(tpl.get("loginFastModal")),
    static: false,
    keyboard: true,
    //todo 可传入参数
    initialize: function (opt) {
        Modal.prototype.initialize.call(this);

    },
    show: function () {
        Modal.prototype.show.call(this);

        $("#sign_content").addClass("hidden");
        //below can bind more events..
        var that = this;

        $("#login_fast .title li").on("click", function () {
            var upid = $(this).attr("upid");
            $("#login_fast .title li").addClass("active");
            $(this).removeClass("active");
            $("#login_fast .content").addClass("hidden");
            $("#" + upid).removeClass("hidden");
        });

        /*//点击背景隐藏登陆框 需要防止事件冒泡（弹出框位于$el中,$el为遮罩层）
         this.$el.on('click', function () {
         that.hide();
         });*/
        //todo 需修改为target何currentTarget的判断 防止事件冒泡
        this.$el.on('click', '.login_Area', function (e) {
            e.stopPropagation();
        });

        this.$el.on('click', '.vcode', function (e) {
            var src = $(this).attr('src').split('?')[0] + '?_=' + (new Date()).getTime();
            $(this).attr('src', src)
        });

        //忘记密码
        $('#tuan_forgetPassword').click(function () {
            app.navigate('lost', true)
        });

        this.$el.on('click', '.js_sendSms', function (e) {
            var phone = $("#sign_content .txt_phone").val();
            var vcode = $('#vcodeInput').val();
            var $valid = $('#sign_content .errorMsg');
            $valid.html('');
            if (!phone) {
                $valid.html('<i class="icon icon-error"></i>请输入手机号');
                return;
            }
            if (phone.length !== 11 || isNaN(parseInt(phone, 10))) {
                $valid.html('<i class="icon icon-error"></i>手机号格式有误');
                return
            }
            if (!vcode) {
                $valid.html('<i class="icon icon-error"></i>请输入图片验证码');
                return;
            }
            app.userManager.fastLoginSms({phone: phone, vcode: vcode}, Utilities.defaultSmsRequestHandler($(e.target), $valid))
        });
        this.$el.on("click", '.btnLogin', function () {
            that.login();
        });
        this.$el.on("click", '.btnFastLogin', function () {
            that.fastLogin();
        });
    },
    fastLogin: function () {
        var that = this;
        var phone = $("#phoneInput").val(),
            smsVerify = $("#smsVInput").val();
        var $valid = $('#sign_content .errorMsg');
        $valid.html('');
        if (!phone) {
            $valid.html('<i class="icon icon-error"></i>请输入手机号');
            return;
        }
        if (phone.length !== 11 || isNaN(parseInt(phone, 10))) {
            $valid.html('<i class="icon icon-error"></i>手机号格式有误');
            return
        }
        if (!smsVerify) {
            $valid.html('<i class="icon icon-error"></i>请输入验证码');
            return;
        }
        app.sessionManager.fastLogin(phone, smsVerify, {
            success: function () {
                //重置sessionUser并且render topBar
                app.userManager.sessionUser = app.sessionManager.sessionModel;
                app.topBarView.render();
                that.close();
            },
            error: function (data) {
                $('#sign_content .errorMsg').html(data.message || "服务器好像睡着了，请稍后再试");
                $('#sign_content .btnLogin').html("快速登录").prop("disabled", false);
            }
        });
    },
    login: function () {
        var that = this;
        var username = $("#login_content .txt_phone").val(),
            password = $("#login_content .txt_passed").val(),
            remember = $("#login_content .check") ? 1 : 0;
        var $valid = $('#login_content .errorMsg');
        $valid.html('');
        if (!username) {
            $valid.html('<i class="icon icon-error"></i>请输入手机号或用户名');
            return;
        }
        if (!password) {
            $valid.html('<i class="icon icon-error"></i>请输入密码');
            return;
        }
        $('#login_content .btnLogin').html("登录中..").prop("disabled", true);
        //这里继续登录操作 登录成功后直接进行session的获取(为同步请求)
        app.sessionManager.login(username, password, remember, {
            success: function () {
                //重置sessionUser并且render topBar
                app.userManager.sessionUser = app.sessionManager.sessionModel;
                app.topBarView.render();
                that.close();

            },
            error: function (data) {
                $('#login_content .errorMsg').html(data.message || "服务器好像睡着了，请稍后再试");
                $('#login_content .btnLogin').html("登 录").prop("disabled", false);
            }
        });
    },
    hide: function () {
        Modal.prototype.hide.call(this);
        //below should unbind events bound in 'show' function..
    },
    close: function () {
        Modal.prototype.close.call(this);
    }
});
