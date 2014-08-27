var CourseDetailView = Backbone.View.extend({
    el: "#content",
    template: _.template(tpl.get('courseDetail')),
    initialize: function (courseIdWrapper) {
        _.bindAll(this, 'render', 'bindEvents', 'close');
        app.viewRegistration.register(this);
        this.isClosed = false;
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
            error: function (response) {
                //todo should handle the error message display
//                Info.displayErrorPage("content", response.responseJSON);
            }
        });
    },

    render: function () {

        $(document).scrollTop(0);
        $("body").addClass("courseDetail");
        this.$el.append(this.template(this.course._toJSON()));
        //新建相关课程视图
        this.relatedCourseListView = new RelatedCourseListView({course:this.course});
        document.title = "爱上课 | " + this.course.get("category").name +
            " | " + this.course.get("subCategory").name +
            " | " + this.course.get("subSubCategory").name +
            "培训 | " + this.course.get("courseName");

        /*移除所有table的宽度*/
        $('.course_content .rich table').css('width','100%');
        var $teachers = $(".teacherInfo"), i, maxHeight = -1, $teacher;
        for (i = 0; i < $teachers.length; i++) {
            $teacher = $($teachers[i]);
            maxHeight = maxHeight > $teacher.height() ? maxHeight : $teacher.height();
        }
        this.offSetHeight = 460;
        $teachers.css("height", maxHeight);

        this.content1_top = $("#content_1").position().top;
        this.content2_top = $("#content_2").position().top;
        this.content3_top = $("#content_3").position().top;
        this.content4_top = $("#content_4").position().top;
        this.content5_top = $("#content_5").position().top;

        this.compareWidget = new CourseDetailCompareWidgetView();

        //slider
        $('#banner-slide').bjqs({
            height: 215,
            width: 625,
            animtype: 'slide', // accepts 'fade' or 'slide'
            animduration: 650, // how fast the animation are
            animspeed: 4000, // the delay between each slide
            hoverpause: true, // pause the slider on hover
            responsive: true
        });

        //todo 这里是为了声明页面加载完毕
        $('body').attr('pageRenderReady','')
    },
    bindEvents: function () {
        var that = this;
        $("#detail_compare_" + this.course.id).on("click", function () {
            if ($(this).hasClass("add")) {
                if (that.compareWidget.addCourse(that.course)) {
                    $(this).attr("class", "remove btn_gray").val("已加入对比");
                } else {
                    Info.displayNotice("您最多只能同时比较四个不同的科目。");
                }
                $("#compareWidgetContent").removeClass("hidden");
                $("#widgets").find(".compare").css("width", 250);
                $("#compareToggle").css("width", 50);
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
            if (position >= 492) {
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
            if (position < that.content2_top + that.offSetHeight) {
                $("#tab_1").addClass("active")
            } else if (position >= that.content2_top + that.offSetHeight
                && position < that.content3_top + that.offSetHeight) {
                $("#tab_2").addClass("active")
            } else if (position >= that.content3_top + that.offSetHeight
                && position < that.content4_top + that.offSetHeight) {
                $("#tab_3").addClass("active")
            } else if (position >= that.content4_top + that.offSetHeight
                && position < that.content5_top + that.offSetHeight) {
                $("#tab_4").addClass("active")
            } else {
                $("#tab_5").addClass("active")
            }
        });
        if (this.course.get("status") === EnumConfig.CourseStatus.onlined) {
            $("#bookNow").on("click", function () {
                app.navigate("booking/c" + that.courseId, true);
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
            $(document).off("scroll");
            $("#courseNavigateTab").off();
            $("body").removeClass("courseDetail");
            $("#trialButton").off();
            this.isClosed = true;
            app.courseDetailView = null;
        }
    }
});
