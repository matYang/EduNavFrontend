var CourseDetailView = Backbone.View.extend({
    el: "#content",
    template: _.template(tpl.get('courseDetail')),
    initialize: function (courseIdWrapper) {
        _.bindAll(this, 'render', 'bindEvents', 'close');
        app.viewRegistration.register(this);
        this.isClosed = false;
        this.notifier = new Backbone.Notifier();
        this.sr = new CourseSearchRepresentation();
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
                //todo should handle the error message display
                Info.displayErrorPage("content", data.message);
            }
        });
    },

    render: function () {

        $(document).scrollTop(0);
        $("body").addClass("courseDetail");
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

        //img slider
        $('#courseSlide').bjqs({

            height: 215,
            width: 625,
            animtype: 'slide', // accepts 'fade' or 'slide'
            animduration: 650, // how fast the animation are
            animspeed: 4000, // the delay between each slide
            hoverpause: true, // pause the slider on hover
            responsive: true,
            randomstart: true
        });

        this.compareWidget = new CourseDetailCompareWidgetView();

        var $content2 = $("#content_2");
        var $content3 = $("#content_3");
        this.content1_top = $("#content_1").offset().top;//课程详情
        this.content2_top = $content2.offset().top;//特色服务
        this.content3_top = $content3.offset().top;//名师团队
        this.content4_top = $("#content_4").offset().top;//学校概况
        this.content5_top = $("#content_5").offset().top;//同类型课程

        //如果栏目下的数据为空 则移除该栏目的显示
        //名师团队
        if ($content3.children('dd').length === 0) {
            var height3 = $content3.outerHeight();
            $content3.remove();
            $("#tab_3").remove();
            this.content5_top -= height3;
            this.content4_top -= height3;
            this.content3_top = this.content4_top;
        }
        //特色服务
        if ($content2.children('dd').find('.item').length === 0) {
            var height2 = $content2.outerHeight();
            $content2.remove();
            $("#tab_2").remove();
            this.content5_top -= height2;
            this.content4_top -= height2;
            this.content3_top -= height2;
            this.content2_top = this.content3_top
        }
        //这里是为了声明页面加载完毕
        $('body').attr('pageRenderReady', '')
    },
    bindEvents: function () {
        var that = this;
        //详细查看教师
        $('.teacher').on('click', '.more', function (e) {
            var teacherIndex = $(this).data('id');
            var teacher = {};
            //todo 后面把testMockObj给除了 统一使用json
            if (that.course.get('teacherList') instanceof  Backbone.Collection) {
                teacher = that.course.get('teacherList').at(teacherIndex);
            } else {
                teacher = that.course.get('teacherList')[teacherIndex];
            }

            var message = '<h3>' + teacher.get('name') +
                '</h3><img src="' + teacher.get('imgUrl') +
                '" alt="' + teacher.get('name') +
                '"/><div>' + teacher.get('intro') +
                '</div>';
            that.viewTeacherModal = that.notifier.notify({
                fadeInMs: 0,
                fadeOutMs: 0,
                ms: null,
                message: message,
                destroy: true,
                modal: true,
                'hideOnClick': false,
                closeBtn: true,
                position: 'center',
                cls: 'viewTeacherModal',
                width: '600'
            })
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

        $("#courseNavigateTab").on("click", "li", function (e) {
            var id = e.target.id;
            id = "#content_" + id.split("_")[1];
            $.smoothScroll({
                scrollTarget: id,
                offset: -40,
                speed: 650
            });
        });
        $(document).on("scroll", function () {
            var $btn = $("#trialButton"), position = $(this).scrollTop();
            if (position >= 210) {
                if (!$btn.hasClass("shown")) {
                    $btn.animate({marginRight: "0px"}, 500);
                    $btn.addClass("shown");
                }
            } else {
                if ($btn.hasClass("shown")) {
                    $btn.animate({marginRight: "-280px"}, 500);
                    $btn.removeClass("shown");
                }
            }
            if (position >= 500) {
                if ($("#navTabPlaceholder").length === 0) {
                    $("#courseNavigateTab").after("<ul id='navTabPlaceholder' class='tabButton tab'></ul>");
                }
                $("#courseNavigateTab").addClass("stickyHeader");
            } else {
                if ($("#navTabPlaceholder").length === 1) {
                    $("#navTabPlaceholder").remove();
                }
                $("#courseNavigateTab").removeClass("stickyHeader");
            }
            /*当前激活的标签页*/
            $("#courseNavigateTab").find(".active").removeClass("active");
            var stickHeight = 43;
            if (position < that.content2_top - stickHeight) {
                $("#tab_1").addClass("active")
            } else if (position >= that.content2_top - stickHeight && position < that.content3_top - stickHeight) {
                $("#tab_2").addClass("active")
            } else if (position >= that.content3_top - stickHeight && position < that.content4_top - stickHeight) {
                $("#tab_3").addClass("active")
            } else if (position >= that.content4_top - stickHeight && position < that.content5_top - stickHeight) {
                $("#tab_4").addClass("active")
            } else {
                $("#tab_5").addClass("active")
            }
        });
        //这里根据课程的状态来判断是否可以进行申请 在这里加上'申请人工选课'(不需要判断课程状态)和'申请免费试听'(需要判断课程状态)
        if (this.course.get("status") === EnumConfig.CourseStatus.onlined) {
            $("#bookNow").on("click", function () {
                //这里屏蔽了下订单的入口
//                app.navigate("booking/c" + that.courseId, true);
                if (!that.freeTrial) {
                    that.freeTrial = new FreeTrial({course:that.course});
                } else {
                    that.freeTrial.closePop();
                    that.freeTrial.show();
                }
            });
        } else {
            $("#bookNow").attr("class", "btn_W").val("当前不可预订").prop("disabled", true);
        }

        $("#siteMap").on("click", "span", function (e) {
            var id = e.target.id;
            if (id === "siteMap") {
                return;
            }
            that.sr.set("categoryValue", $(this).data('value'));
            app.navigate("search/" + that.sr.toQueryString(), true);
        });
    },

    close: function () {
        if (!this.isClosed) {
            if (this.$el !== 'undefined') {
                this.$el.empty();
            }
            if (this.compareWidget) {
                this.compareWidget.close();
            }
            if (this.freeTrial) {
                this.freeTrial.close();
            }
            if (this.viewTeacherModal) {
                this.viewTeacherModal.destroy();
            }
            this.notifier = null;
            $(document).off("scroll");
            $("#courseNavigateTab").off();
            $("body").removeClass("courseDetail");
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
        this.render();
        this.bindEvents();
    },

    render: function () {
        app.viewRegistration.register(this);
        this.$el.html(this.template);
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
                $valid.html('请输入您的姓名');
                return
            }
            if (!phone) {
                $valid.html('请输入您的联系电话');
                return
            }
            if (phone.length !== 11 || isNaN(parseInt(phone, 10))) {
                $valid.html('您的联系电话格式错误');
                return
            }
            that.model.set('name', name);
            that.model.set('phone', phone);
            that.model.set('note', note);
            console.log(that.model.toJSON())
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
                    //todo 提交失败
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
