var TuanDetailView = Backbone.View.extend({
    el: "#content",
    //todo need to write template named 'tpl_tuanDetail'
    template: _.template(tpl.get("tuanDetail")),
    initialize: function (opt) {
        this.isClosed = false;
        _.bindAll(this, "render", "bindEvents", "close");
        app.viewRegistration.register(this);
        this.tuanId = opt.tuanId;//团购的Id
        this.countDown = undefined;//团购的倒计时
        var self = this;
        //这里获取课程数据信息
        app.generalManager.fetchTuan(opt.tuanId, {
            success: function (tuan) {
                self.tuan = tuan.clone();
                self.tuanPhotos = tuan.get('photoList').slice(2);//从第三张图片开始为团购详情页面的图片index = 2
                self.courseId = tuan.get("courseId");
                self.teacherList = tuan.get("teacherList");

                self.render();
                self.bindEvents();
            },
            error: function (data) {
                Info.displayErrorPage("content", data.message);
            }
        });


    },
    render: function () {
        var that = this;
        document.title = '全城最低价';
        this.$el.html(this.template(this.tuan._toJSON()));
        this.commentsView = new TuanDetailCommentsView({courseId: that.courseId});
        $("body").css("background-color", "#f1f1f1");
        this.countDown = Utilities.countDown('#tuanDetail_endTime');//倒计时
        /*评价星级*/
        $("#starDemo").raty({
            readOnly: true,
            start: 4
        });
        $("#star_environment").raty({
            onClick: function (score) {
                $("#star_environment").attr("starscore", score);
            }
        });
        $("#star_teacher").raty({
            onClick: function (score) {
                $("#star_teacher").attr("starscore", score);
            }
        });
        $("#star_service").raty({
            onClick: function (score) {
                $("#star_service").attr("starscore", score);
            }
        });
        $("#star_eleft").raty({
            readOnly: true,
            start: 4
        });
        $("#evaluate_environment").raty({
            readOnly: true,
            start: 5
        });
        $("#evaluate_teacher").raty({
            readOnly: true,
            start: 4
        })
        ;
        $("#evaluate_service").raty({
            readOnly: true,
            start: 4
        });

        //详情中的图片展示
        var htmlphoto = '';
        htmlphoto += '<div class="pic_big">';
        _.each(that.tuanPhotos, function (v, index) {
            htmlphoto += '<a class=""><img src="' + v.url + '" alt=""/></a>';
        });
        htmlphoto += '</div>';
        htmlphoto += '<div class="pic_list">';
        _.each(that.tuanPhotos, function (v, index) {
            htmlphoto += '<a index="' + index + '"><i class="active"></i><img src="' + v.url + '" alt=""/></a>';
        });
        htmlphoto += '</div>';
        $("#tuanDetail .pic").html(htmlphoto);
        $("#tuanDetail .pic .pic_big").find("a:first").addClass("active");
        $("#tuanDetail .pic .pic_list").find("i:first").removeClass("active");
        this.bindEvents();
    },

    bindEvents: function () {
        var that = this;

        /*教师详情*/
        $("#tuan_content_2 .teacher_pic").on("click", function () {
            var teacherIndex = $(this).attr("data-id");
            var teacher = {};
            //todo 后面把testMockObj给除了 统一使用json
            if (that.tuan.get('teacherList') instanceof  Backbone.Collection) {
                teacher = that.tuan.get('teacherList').at(teacherIndex);
            } else {
                teacher = that.tuan.get('teacherList')[teacherIndex];
            }

            if (!that.teacherInfoView) {
                that.teacherInfoView = new TeacherInfoView();
            } else if (that.teacherInfoView.isClosed) {
                that.teacherInfoView.render();
            } else if (!that.teacherInfoView.isShow) {
                that.teacherInfoView.show();
            }
            $("#teacherInfo img").attr("src", teacher.get('imgUrl'));
            $("#teacherInfo span").html(teacher.get('name'));
            $("#teacherInfo p").append(teacher.get('intro'));
        });
        $("#tuan_content_2 .teacher_pic").hover(function () {
            $(this).find("span").css("display", "block");
        }, function () {
            $(this).find("span").css("display", "none");
        });

        /*banner图片的hover事件*/
        $("#tuanDetail .pic .pic_list a").hover(function () {
            var index = $(this).attr("index");
            $("#tuanDetail .pic .pic_list i").addClass("active");
            $(this).find(".active").removeClass("active");
            $("#tuanDetail .pic .pic_big a").removeClass("active");
            $("#tuanDetail .pic .pic_big").find("a:eq(" + index + ")").addClass("active");
        });

        /*每列的高度*/
        this.tuan_content_1 = $("#tuan_content_1").offset().top;//课程详情
        this.tuan_content_2 = $("#tuan_content_2").offset().top;//学校师质
        this.tuan_content_3 = $("#tuan_content_3").offset().top;//特色服务
        this.tuan_content_4 = $("#tuan_content_4").offset().top;//评价

        /*立即抢购快速登录*/
        $("#tuanDetail .btnbuy").on("click", function () {
            if (!app.sessionManager.hasSession()) {
                //如果没有登录 弹出框进行登录 或者 免注册登录（）
                if (!that.loginFastView) {
                    that.loginFastView = new LoginFastView();
                } else if (that.loginFastView.isClosed) {
                    that.loginFastView.render();
                    that.loginFastView.show();
                } else {
                    that.loginFastView.show();
                }
            } else {
                app.navigate("mypage/booking/" + app.sessionManager.getId() + "/pay", true);
            }
        });


        /*详情页click*/
        $("#tuanDetail .tuan_sorter li").on("click", function () {
            var tindex = $(this).attr("index");
            var id = "#tuan_content_" + tindex;
            $.smoothScroll({
                scrollTarget: id,
                offset: -63,
                speed: 650
            });
        });

        /*地图那块位置不变*/
        var navH = $("#tuan_fright").offset().top;
        //滚动条事件
        $(window).scroll(function () {
            //获取滚动条的滑动距离
            var scroH = $(this).scrollTop();
            //alert(scroH);
            //滚动条的滑动距离大于等于定位元素距离浏览器顶部的距离，就固定，反之就不固定
            if (scroH >= navH) {
                $("#tuan_fright").css({"position": "fixed", "top": 4, "margin-left": 750});
                $("#tuanDetail .w_730").css("margin-top", "63px");
                $("#tuan_btn").show();
                $("#tuanDetail .fright .site_map").css({"margin": "55px 0 0 0"});
                $(".tuan_sorterArea").css({"position": "fixed", "padding-top": "4px", "top": 0});
            }
            else if (scroH < navH) {
                $("#tuan_fright").css({"position": "relative", "top": "", "margin-left": ""});
                $("#tuanDetail .w_730").css("margin-top", "");
                $("#tuan_btn").hide();
                $("#tuanDetail .fright .site_map").css({"margin": ""});
                $(".tuan_sorterArea").css({"position": "", "top": "", "padding-top": "4px"});
            }

            $(".tuan_sorter li a").removeClass("active");
            /*滚动到下方，导航栏变active*/
            var stickHeight = 64;
            if (scroH + 63 < that.tuan_content_2 - stickHeight) {
                $(".tuan_sorter li a:eq(0)").addClass("active");
            } else if (scroH + 63 >= that.tuan_content_2 - stickHeight && scroH + 63 < that.tuan_content_3 - stickHeight) {
                $(".tuan_sorter li a:eq(1)").addClass("active");
            } else if (scroH + 63 >= that.tuan_content_3 - stickHeight && scroH + 63 < that.tuan_content_4 - stickHeight) {
                $(".tuan_sorter li a:eq(2)").addClass("active");
            } else if (scroH + 63 >= that.tuan_content_4 - stickHeight) {
                $(".tuan_sorter li a:eq(3)").addClass("active");
            }
        });
    },

    close: function () {
        if (!this.isClosed) {
            this.$el.off();
            this.$el.empty();
            if (this.countDown) {
                window.clearInterval(this.countDown);
            }
            if (this.teacherInfoView) {
                this.teacherInfoView.close();
            }
            if (this.loginFastView) {
                this.loginFastView.close();
            }
            if (this.commentsView) {
                this.commentsView.close();
            }
            this.isClosed = true;
            $("body").css("background-color", "#fff");
        }
    }
});


/*快速登录、注册View*/
var LoginFastView = Backbone.View.extend({
    el: "#overlayASelection",
    template: _.template(tpl.get("loginFast")),
    initialize: function () {
        this.isClosed = false;
        _.bindAll(this, "render", "bindEvents", "login", "fastLogin", "close");
        app.viewRegistration.register(this);
        this.render();

    },
    render: function () {
        this.$el.html(this.template());
        $("#sign_content").addClass("hidden");
        this.bindEvents();
    },

    bindEvents: function () {
        var that = this;
        $("#login_fast .title li").on("click", function () {
            var upid = $(this).attr("upid");
            $("#login_fast .title li").addClass("active");
            $(this).removeClass("active");
            $("#login_fast .content").addClass("hidden");
            $("#" + upid).removeClass("hidden");
        });

        //点击背景隐藏登陆框 需要防止事件冒泡（弹出框位于$el中,$el为遮罩层）
        this.$el.on('click', function () {
            that.hide();
        });
        //防止事件冒泡
        this.$el.on('click', '.login_Area', function (e) {
            e.stopPropagation();
        });

        //忘记密码
        $('#tuan_forgetPassword').click(function () {
            app.navigate('lost', true)
        });

        this.$el.on('click','.js_sendSms',function(e){
            var phone = $("#sign_content .txt_phone").val();
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
           app.userManager.fastLoginSms(phone,Utilities.defaultSmsRequestHandler($(e.target)))
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
        var phone = $("#sign_content .txt_phone").val(),
            smsVerify = $("#sign_content .txt_passed").val();
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

    show: function () {
        this.$el.show();
    },
    hide: function () {
        this.$el.hide();
    },

    close: function () {
        if (!this.isClosed) {
            this.$el.off();
            this.$el.empty();
            this.isClosed = true;
        }
    }
});


/*教师详情弹出框View*/
var TeacherInfoView = Backbone.View.extend({
    el: "#overlayCourse",//借用课程那个弹出框的div
    //todo need to write template named 'tpl_loginFast'
    template: _.template(tpl.get("teacherInfo")),
    initialize: function () {
        this.isClosed = false;
        this.isShow = false;
        _.bindAll(this, "render", "bindEvents", "close");
        app.viewRegistration.register(this);
        //this.teacherobj=teacherObj;
        this.render();


    },
    render: function () {
        var self = this;
        this.$el.html(this.template());
        this.bindEvents();
    },

    bindEvents: function () {
        var that = this;
        $("#teacherInfo .close").on("click", function () {
            that.hide();
        });
    },
    show: function () {
        $("#overlay_teacherInfo").show();
        this.isShow = true;
    },
    hide: function () {
        $("#overlay_teacherInfo").hide();
        this.isShow = false;
    },

    close: function () {
        if (!this.isClosed) {
            this.$el.off();
            this.$el.empty();
            this.isClosed = true;
        }
    }
});

