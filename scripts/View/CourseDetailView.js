var CourseDetailView = Backbone.View.extend({
    el: "#content",
    template: _.template(tpl.get('courseDetail')),
    initialize: function (courseIdWrapper) {
        _.bindAll(this, 'render', 'bindEvents', 'showLoginModal', 'close');
        app.viewRegistration.register(this);
        this.isClosed = false;
        this.sr = new CourseSearchRepresentation();
        this.teacherModal = new TeacherModal();
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

        this.commentsView = new TuanDetailCommentsView({
            templateId: that.courseTemplateId,
            parentView: that
        });
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
                $("#tuan_fright").css({"position": "fixed", "top": 4, "margin-left": 750});
                $(".courseDetail .w_730").css("margin-top", "63px");
                $(".tuan_btn").show();
                $(".courseDetail .fright .site_map").css({"margin": "55px 0 0 0"});
                $(".tuan_sorterArea").css({"position": "fixed", "padding-top": "4px", "top": 0, "z-index": 100});
            }
            else if (scroH < navH) {
                $("#tuan_fright").css({"position": "relative", "top": "", "margin-left": ""});
                $(".courseDetail .w_730").css("margin-top", "");
                $(".tuan_btn").hide();
                $(".courseDetail .fright .site_map").css({"margin": ""});
                $(".tuan_sorterArea").css({"position": "", "top": "", "padding-top": "4px"});
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
//                app.navigate("booking/c" + that.courseId, true);
                if (!that.freeTrial) {
                    that.course.set('id', id);
                    that.freeTrial = new FreeTrial({course: that.course});
                } else {
                    that.freeTrial.model.set('courseId', id);
                    that.freeTrial.closePop();
                    that.freeTrial.show();
                }
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
    },

    showLoginModal: function () {
        var that = this;
        //如果没有登录 弹出框进行登录 或者 免注册登录（）
        if (!that.loginFastView) {
            that.loginFastView = new LoginFastView();
        } else if (that.loginFastView.isClosed) {
            that.loginFastView.render();
            that.loginFastView.show();
        } else {
            that.loginFastView.show();
        }
    },

    close: function () {
        if (!this.isClosed) {
            this.$el.empty();
            if (this.compareWidget) {
                this.compareWidget.close();
            }
            if (this.freeTrial) {
                this.freeTrial.close();
            }
            if (this.commentsView) {
                this.commentsView.close();
            }
            $(document).off("scroll");
            $("#courseNavigateTab").off();
            $("#trialButton").off();
            this.isClosed = true;
            app.courseDetailView = null;
        }
    }
});

//免费试听
var FreeTrial = Backbone.View.extend({

    el: '#overlayFreeTrial',
    initialize: function (params) {
        _.bindAll(this, 'render', 'autoName', 'closePop', 'close');
        this.validEle = '#detail_submit_error';
        this.template = _.template(tpl.get('freeTrial'));
        this.model = new Booking();
        this.model.initBookingFromCourse(params.course);
        var courseName = params.course instanceof Backbone.Model ? params.course.get('courseName') : params.course.courseName;
        this.render(courseName);
        this.bindEvents();
    },

    render: function (courseName) {
        app.viewRegistration.register(this);
        this.$el.html(this.template({courseName: courseName}));
        this.autoName();
    },
    clearModel: function () {
        //这里清空保单数据以及模型数据
        this.model = new Booking();
        $('#detail_name_input').val('');
        $('#detail_phone_input').val('');
        $('#detail_note_text').val('');
        $(this.validEle).empty();
    },
    //自动填充用户名等
    autoName: function () {
        if (app.sessionManager.hasSession()) {
            //自动填充手机号和用户名 如果存在的话
            var name = app.sessionManager.sessionModel.get('username');
            var phone = app.sessionManager.sessionModel.get('phone');
            $('#detail_name_input').val(name);
            $('#detail_phone_input').val(phone);
        }
    },
    bindEvents: function () {
        var that = this;
        $(".js_popClose").on("click", function () {
            that.hide();
        });

        //提交免费申请 使用Bookings
        $("#btnApplefreeTrial").on('click', function () {
            var $valid = $(that.validEle);
            var name = $('#detail_name_input').val();
            var phone = $('#detail_phone_input').val();
            var note = $('#detail_note_text').val();
            $valid.empty();
            if (!name) {
                $valid.html('<i class="icon icon-error"></i>亲，请输入您的姓名');
                return
            }
            if (!phone) {
                $valid.html('<i class="icon icon-error"></i>亲，请输入您的联系电话');
                return
            }
            if (phone.length !== 11 || isNaN(parseInt(phone, 10))) {
                $valid.html('<i class="icon icon-error"></i>亲，您的联系电话输入有误');
                return
            }
            that.model.set('name', name);
            that.model.set('phone', phone);
            that.model.set('note', note);
            app.userManager.initBooking(that.model, {
                success: function () {
                    that.clearModel();
                    that.hide();
                    //提交成功 关闭弹出框 弹出成功信息 清空表单数据
                    if (!that.popTip) {
                        that.popTip = new SuccessPopTip();
                    } else {
                        that.popTip.show();
                    }
                },
                error: function (data) {
                    $(that.validEle).html(data.message || '提交失败 ，请稍后再试');
                }
            });
        });
    },
    show: function () {
        this.autoName();
        $("#popfreeTrial").fadeIn(400);
    },
    hide: function () {
        $("#popfreeTrial").fadeOut(400);
        $(this.validEle).empty();
    },
    closePop: function () {
        if (this.popTip) {
            this.popTip.close();
        }
    },

    close: function () {
        this.closePop();
        this.$el.empty();
        this.isClosed = true;
    }
});
