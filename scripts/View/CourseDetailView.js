var CourseDetailView = Backbone.View.extend({
    el: "#content",
    template: _.template(tpl.get('courseDetail')),
    initialize: function (courseIdWrapper) {
        _.bindAll(this, 'render', 'bindEvents', 'showLoginModal', 'renderMap', 'close');
        app.viewRegistration.register(this);
        this.isClosed = false;
        this.sr = new CourseSearchRepresentation();

        this.freeTrialModal = new FreeTrialModal();
        this.teacherModal = new TeacherModal();
        this.loginFastModal = new LoginFastModal();//快速登录

        this.user = app.sessionManager.sessionModel;
        var self = this;
        app.generalManager.fetchCategories({success: function (data) {
            self.categoryObj = data;
        }});
        // this.newBooking = new Booking();
        // $("#viewStyle").attr("href", "style/css/courseDetail.css");
        app.generalManager.fetchCourse(courseIdWrapper.courseId, {
            success: function (course) {
                app.generalManager.fetchCategories({
                    success: function (catObj) {
                        self.course = course.clone();
                        self.courseId = course.get("id");
                        self.courseTemplateId = course.get("courseTemplateId");
                        //将categoryValue转换成一二三级的键值对
                        var catArray = Utilities.getCategoryArray(self.course.get("categoryValue"), catObj.data);
                        self.course.set("category", catArray[0]);
                        self.course.set("subCategory", catArray[1]);
                        self.course.set("subSubCategory", catArray[2]);
                        self.render();
                        self.bindEvents();
                    }
                });

            },
            error: function (data) {
                Info.displayErrorPage("content", data.message);
            }
        });
    },
    //在地图脚本回调结束后会执行renderMap见mapLoadScript
    renderMap: function () {
        if (typeof BMap !== 'undefined' && !this.mapView && this.course) {
            var self = this;
            var locationObj = {
                name: this.course.get('address'),
                label: this.course.get('instName'),
                addressLat: this.course.get('addressLat'),
                addressLng: this.course.get('addressLng'),
                lat: 0,
                lng: 0
            };
            if (locationObj.addressLat == 0 && locationObj.addressLng == 0) {
                return;
            }
            //新建地图view
            this.mapView = new MapView({mapElId: 'smallMap'});
            this.mapView.addMarker(locationObj);
            $('#smallMap').after('<a class="margin-top block J_viewLarge text-center">查看完整地图</a>');
            this.$el.on('click', '.J_viewLarge', function () {
                self.mapModal = new MapModal({addressList: [locationObj ]});
                var $body = $('body');
                var width = $body.width() - 40;
                var height = $body.height() - 60;
                self.mapModal.show({width: width, height: height});
            });
        }
    },
    render: function () {
        var that = this;

        $(document).scrollTop(0);
        this.$el.html(this.template(this.course._toJSON()));
        //新建相关课程视图
        this.relatedCourseListView = new RelatedCourseListView({course: this.course});
        document.title = "爱上课 | " + this.course.get("category").name +
            " | " + this.course.get("subCategory").name +
            " | " + this.course.get("subSubCategory").name +
            "培训 | " + this.course.get("courseName");

        /*移除所有table的宽度*/
        $('.course_content .rich table').css('width', '100%');
        var $teachers = $(".teacherInfo"), i, maxHeight = -1, $teacher;
        for (i = 0; i < $teachers.length; i++) {
            $teacher = $($teachers[i]);
            maxHeight = maxHeight > $teacher.height() ? maxHeight : $teacher.height();
        }
        $teachers.css("height", maxHeight);


        this.compareWidget = new CourseDetailCompareWidgetView();

        this.content1_top = $(".tuan_content_1").offset().top;//课程详情
        this.content2_top = $(".tuan_content_2").offset().top;//特色服务
        this.content3_top = $(".tuan_content_3").offset().top;//名师团队
        this.content4_top = $(".tuan_content_4").offset().top;//评价
        //this.content5_top = $("#content_5").offset().top;//同类型课程

        //如果栏目下的数据为空 则移除该栏目的显示
        //名师团队
//        if ($content3.children('dd').length === 0) {
//            var height3 = $content3.outerHeight();
//            $content3.remove();
//            $("#tab_3").remove();
//            //this.content5_top -= height3;
//            this.content4_top -= height3;
//            this.content3_top = this.content4_top;
//        }
//        //特色服务
//        if ($content2.children('dd').find('.item').length === 0) {
//            var height2 = $content2.outerHeight();
//            $content2.remove();
//            $("#tab_2").remove();
//            //this.content5_top -= height2;
//            this.content4_top -= height2;
//            this.content3_top -= height2;
//            this.content2_top = this.content3_top
//        }
        //这里是为了声明页面加载完毕
        $('body').attr('pageRenderReady', '');
        //star
        var rate1 = this.course.get('conditionRating');
        var rate2 = this.course.get('attitudeRating');
        var rate3 = this.course.get('satisfactionRating');
        var evenRating = this.course.get('evenRating');
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
        $(".courseDetail .pic .pic_big").find("a:first").addClass("active");
        $(".courseDetail .pic .pic_list").find("i:first").removeClass("active");

        var sr = new CommentSearchRepresentation();
        sr.set('courseTemplateId', that.courseTemplateId);
        this.commentsView = new CommentsView({
            sr: sr,
            parentView: that,
            templateId: that.courseTemplateId
        });
        this.renderMap();
    },
    bindEvents: function () {
        var that = this;

        /*教师详情*/
        $(".tuan_content_2 .teacher_pic").on("click", function () {
            var teacherIndex = $(this).attr("data-id");
            var teacher = {};
            if (that.course.get('teacherList') instanceof  Backbone.Collection) {
                teacher = that.course.get('teacherList').at(teacherIndex);
            } else {
                teacher = that.course.get('teacherList')[teacherIndex];
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

        $("#detail_compare_" + this.course.id).on("click", function () {
            if ($(this).hasClass("add")) {
                if (that.compareWidget.addCourse(that.course)) {
                    $(this).attr("class", "remove btn_gray").val("已加入对比");
                } else {
                    Info.displayNotice("您最多只能同时比较四个不同的科目。");
                }
                $("#compareWidgetContent").removeClass("hidden");
            } else {
                that.compareWidget.removeCourse(that.course.id);
                $(this).attr("class", "add btn_g").val("+对比");
            }
        });

        /*banner图片的hover事件*/
        $(".courseDetail .pic .pic_list a").hover(function () {
            var index = $(this).attr("index");
            $(".courseDetail .pic .pic_list i").addClass("active");
            $(this).find(".active").removeClass("active");
            $(".courseDetail .pic .pic_big a").removeClass("active");
            $(".courseDetail .pic .pic_big").find("a:eq(" + index + ")").addClass("active");
        });

        /*详情页click*/
        $(".courseDetail .tuan_sorter li").on("click", function () {
            var tindex = $(this).attr("index");
            var id = ".tuan_content_" + tindex;
            $.smoothScroll({
                scrollTarget: id,
                offset: -63,
                speed: 650
            });
        });
        var navH = $("#tuan_fright").offset().top;
        //滚动条事件
        $(window).scroll(function () {
            /*地图那块位置不变*/

            //获取滚动条的滑动距离
            var scroH = $(this).scrollTop();
            //alert(scroH);
            //滚动条的滑动距离大于等于定位元素距离浏览器顶部的距离，就固定，反之就不固定
            if (scroH >= navH) {
                $("#tuan_fright").addClass("stickyHeader");
                $(".courseDetail .w_730").css("margin-top", "63px");
                $(".tuan_btn").show();
                $(".tuan_sorterArea").addClass("stickyHeader");
                $(".promise").addClass("hidden");
            }
            else if (scroH < navH) {
                $("#tuan_fright").removeClass("stickyHeader");
                $(".courseDetail .w_730").css("margin-top", "");
                $(".tuan_btn").hide();
                $(".tuan_sorterArea").removeClass("stickyHeader");
                $(".promise").removeClass("hidden");
            }

            $(".tuan_sorter li a").removeClass("active");
            /*滚动到下方，导航栏变active*/
            var stickHeight = 64;
            if (scroH + 63 < that.content2_top - stickHeight) {
                $(".tuan_sorter li a:eq(0)").addClass("active");
            } else if (scroH + 63 >= that.content2_top - stickHeight && scroH + 63 < that.content3_top - stickHeight) {
                $(".tuan_sorter li a:eq(1)").addClass("active");
            } else if (scroH + 63 >= that.content3_top - stickHeight && scroH + 63 < that.content4_top - stickHeight) {
                $(".tuan_sorter li a:eq(2)").addClass("active");
            } else if (scroH + 63 >= that.content4_top - stickHeight) {
                $(".tuan_sorter li a:eq(3)").addClass("active");
            }
        });


        //这里根据课程的状态来判断是否可以进行申请 在这里加上'申请人工选课'(不需要判断课程状态)和'申请免费试听'(需要判断课程状态)
        if (this.course.get("status") === EnumConfig.CourseStatus.onlined) {
            this.$el.on("click", '.bookNow', function () {
                var id = $(this).data('value');//< data-value=''>
                if (!id)return;
                //这里屏蔽了下订单的入口
                //app.navigate("booking/c" + that.courseId, true);
//                if (!that.freeTrial) {
//                    that.course.set('id', id);
//                    that.freeTrial = new FreeTrial({course: that.course});
//                } else {
//                    that.freeTrial.model.set('courseId', id);
//                    that.freeTrial.closePop();
//                    that.freeTrial.show();
//                }
                that.course.set('id', id);
                that.freeTrialModal.show(that.course);
            });
        } else {
            $(".bookNow").attr("class", "btn_W").val("当前不可预订").prop("disabled", true);
        }
        //课程详情中广告图的事件绑定
        $('.courseDetail .bannerImg').on('click', function () {
            //打开客服系统
            doyoo.util.openChat('g=82548');
        });
        $("#siteMap").on("click", "span", function (e) {
            var id = e.target.id;
            if (id === "siteMap") {
                return;
            }
            that.sr.set("categoryValue", $(this).data('value'));
            app.navigate("search/" + that.sr.toQueryString(), true);
        });
        //分享
        jiathis_config.summary = "学霸是怎样练成的？坚持不懈爱上课！强力推荐个好课程http://www.ishangke.cn/#course/" + this.course.get('id') + "，注册即送800元现金券，还有更多课程团购低至一折，快跟我一起去上课吧";

        $('.invitation_share a').on('click', function (e) {
            e.preventDefault();
            if (!app.sessionManager.sessionModel.get("invitationCode")) {
                self.openModal();
                //阻止事件追加:分享到其它社区里
                e.stopImmediatePropagation();
            }
        });
        /*bind events end*/
        //load jiathis js for social share
        if ($('#jiathis_script').length === 0) {
            this.$el.append('<script id="jiathis_script" type="text/javascript" src="http://v3.jiathis.com/code/jia.js?uid=1407735888243953" charset="utf-8"></script>');
        }
        var userAgent = window.navigator.userAgent.toLowerCase();
        var is_ie = (userAgent.indexOf('msie') != -1 && !is_opera) && userAgent.substr(userAgent.indexOf('msie') + 5, 3);
        if (!window.clipboardData) {
            $("#clickCopy").remove();
        } else {
            $("#clickCopy").on("click", function () {
                window.clipboardData.setData("Text", $("#copy_content").val());
            });
        }
    },

    showLoginModal: function () {
        //如果没有登录 弹出框进行登录 或者 免注册登录（）
        this.loginFastModal.show();
    },

    close: function () {
        if (!this.isClosed) {
            this.$el.empty();
            if (this.commentsView) {
                this.commentsView.close();
            }
            if(this.teacherModal){
                this.teacherModal.close();
            }
            if(this.freeTrialModal){
                this.freeTrialModal.close();
            }
            if(this.loginFastModal){
                this.loginFastModal.close();
            }
            $(document).off("scroll");
            this.isClosed = true;
            app.courseDetailView = null;
        }
    }
});

var jiathis_config = {
    boldNum: 0,
    siteNum: 7,
    showClose: false,
    sm: "t163,kaixin001,renren,douban,tsina,tqq,tsohu",
    // imageUrl:"http://v2.jiathis.com/code/images/r5.gif",
    // imageWidth:26,
    // marginTop:150,
    url: "http://www.ishangke.cn",
    title: "学霸是怎样练成的？坚持不懈爱上课！",
    summary: "我请大家免费上培训班啦！接受邀请请点击www.iShangke.cn，注册成为爱会员，我们都能获得20元红包奖励！赶快行动吧！",
    // pic:"自定义分享的图片连接地址",
    data_track_clickback: true,
    shortUrl: true
};
