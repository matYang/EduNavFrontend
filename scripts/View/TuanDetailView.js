var TuanDetailView = Backbone.View.extend({
    el: "#content",
    template: _.template(tpl.get("tuanDetail")),
    initialize: function (opt) {
        this.isClosed = false;
        _.bindAll(this, "render", "bindEvents", 'renderMap', 'showLoginModal', "close");
        app.viewRegistration.register(this);
        this.teacherModal = new TeacherModal();
        this.tuanId = opt.tuanId;//团购的Id
        this.countDown = undefined;//团购的倒计时
        this.loginFastModal = new LoginFastModal();
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
        var rate1 = this.tuan.get('course').get('conditionRating');
        var rate2 = this.tuan.get('course').get('attitudeRating');
        var rate3 = this.tuan.get('course').get('satisfactionRating');
        var evenRating = this.tuan.get('course').get('evenRating');
        this.$el.html(this.template(this.tuan._toJSON()));

        var sr = new CommentSearchRepresentation();
        sr.set('courseTemplateId', that.courseId);//这里的courseId后台返回的是模板id
        this.commentsView = new CommentsView({
            sr: sr,
            parentView: that
        });
        this.countDown = Utilities.countDown('#tuanDetail_endTime');//倒计时
        /*评价星级*/
        $("#starDemo").raty({
            readOnly: true,
            start: evenRating
        });

        $("#star_eleft").raty({
            readOnly: true,
            start: evenRating
        });
        $("#evaluate_environment").raty({
            readOnly: true,
            start: rate1
        });
        $("#evaluate_teacher").raty({
            readOnly: true,
            start: rate2
        })
        ;
        $("#evaluate_service").raty({
            readOnly: true,
            start: rate3
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

        this.renderMap();
    },
    //在地图脚本回调结束后会执行renderMap见mapLoadScript
    renderMap: function () {
        if (typeof BMap !== 'undefined' && !this.mapView) {
            var self = this;
            self.addressList = [];
            this.tuan.get('addressList').forEach(function (address) {
                self.addressList.push((address.toLocationObj(self.tuan.get('course').get('instName'))));
            });
            //新建地图view
            this.mapView = new MapView({mapElId: 'smallMap'});
            this.mapView.addMarker(self.addressList[0]);
            $('#smallMap').after('<a class="margin-top J_viewLarge block text-center">查看完整地图</a>');
            $('.addressItem').hover(function () {
                var a = BMap;
                var index = $(this).data('index');
                var address = self.addressList[index];
                self.mapView.removeAllMarkers();
                self.mapView.addMarker(address);
            }, function () {
            });
            this.$el.on('click', '.J_viewLarge', function () {
                self.mapModal = new MapModal({addressList: self.addressList});
                var $body = $('body');
                var width = $body.width() - 40;
                var height = $body.height() - 60;
                self.mapModal.show({width: width, height: height});
            });
        }
    },

    bindEvents: function () {
        var that = this;

        /*教师详情*/
        $(".tuan_content_2 .teacher_pic").on("click", function () {
            var teacherIndex = $(this).attr("data-id");
            var teacher = {};
            //you forgot 'course'!! teacherList is not in 'tuan'
            if (that.tuan.get('course').get('teacherList') instanceof  Backbone.Collection) {
                teacher = that.tuan.get('course').get('teacherList').at(teacherIndex);
            } else {
                teacher = that.tuan.get('course').get('teacherList')[teacherIndex];
            }
            that.teacherModal.show(teacher);
        });
        $(".tuan_content_2 .teacher_pic").hover(function () {
            $(this).find(".overlay_teacher").show();
            $(this).find("span").css("display", "block");
        }, function () {
            $(this).find(".overlay_teacher").hide();
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
        this.tuan_content_1 = $(".tuan_content_1").offset().top;//课程详情
        this.tuan_content_2 = $(".tuan_content_2").offset().top;//学校师质
        this.tuan_content_3 = $(".tuan_content_3").offset().top;//特色服务
        this.tuan_content_4 = $(".tuan_content_4").offset().top;//评价

        /*立即抢购(快速登录)*/
        $("#tuanDetail .btnbuy").on("click", function () {
            if (!app.sessionManager.hasSession()) {
                that.showLoginModal();
            } else {
                var groupBuyBooking = new GroupBuyBooking();
                groupBuyBooking.set('groupBuyPrice', that.tuan.get('groupBuyPrice'));
                groupBuyBooking.set('groupBuyActivityId', that.tuan.get('id'));
                //todo 提交订单获取订单id 进入支付页面
                //todo 按钮处于生成订单状态 失败需要提示重试
                app.userManager.initGroupBuyBooking(groupBuyBooking, {
                    success: function (model) {
                        var url = "mypage/booking/" + model.get('id') + "/pay";

                        //#1 模拟点击事件 防止浏览器拦截
//                        var a = $('<a href="' + url + '" target="_blank"></a>').get(0);
//                        var e = document.createEvent('MouseEvents');
//                        e.initEvent('click', true, true);
//                        a.dispatchEvent(e);
                        //#2 window.open
//                        window.open(url);
                        //#3 当前页打开
                        app.navigate(url, true);//navigate里面不需要#号
                    },
                    error: function (data) {
                        Info.alert(data.message || '抢购失败，请稍后再试~');
                    }
                });
            }
        });


        /*详情页click*/
        $("#tuanDetail .tuan_sorter li").on("click", function () {
            var tindex = $(this).attr("index");
            var id = ".tuan_content_" + tindex;
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
                $("#tuan_fright").addClass("stickyHeader");
                $("#tuanDetail .w_730").css("margin-top", "63px");
                $(".tuan_btn").show();
                $(".tuan_sorterArea").addClass("stickyHeader");
            }
            else if (scroH < navH) {
                $("#tuan_fright").removeClass("stickyHeader");
                $("#tuanDetail .w_730").css("margin-top", "");
                $(".tuan_btn").hide();
                $(".tuan_sorterArea").removeClass("stickyHeader");
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

    showLoginModal: function () {
        //如果没有登录 弹出框进行登录 或者 免注册登录（）
        this.loginFastModal.show();
    },

    close: function () {
        if (!this.isClosed) {
            this.$el.off();
            this.$el.empty();
            if (this.countDown) {
                window.clearInterval(this.countDown);
            }
            if (this.teacherModal) {
                this.teacherModal.close();
            }
            /*if (this.loginFastView) {
             this.loginFastView.close();
             }*/
            if (this.commentsView) {
                this.commentsView.close();
            }
            this.isClosed = true;
        }
    }
});
