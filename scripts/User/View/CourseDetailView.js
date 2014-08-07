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
        app.generalManager.fetchCategories({success:function(data){
            self.categoryObj = data;
        }});
        // this.newBooking = new Booking();
        // $("#viewStyle").attr("href", "style/css/courseDetail.css");
        app.generalManager.fetchCourse(courseIdWrapper.courseId, {
            success: function (course) {
                app.generalManager.fetchCategories({
                    success:function(catObj){
                        self.course = course.clone();
                        self.courseId = course.get("id");
                        var catArray = Utilities.getCategoryArray(self.course.get("categoryValue"),catObj.data);
                        self.course.set("category",catArray[0]);
                        self.course.set("subCategory",catArray[1]);
                        self.course.set("subSubCategory",catArray[2]);
                        self.render();
                        self.bindEvents();
                    }
                });

            },
            error: function (response) {
                Info.displayErrorPage("content", response.responseJSON);
            }
        });
    },

    render: function () {
        $(document).scrollTop(0);
        $("body").addClass("courseDetail");
        this.$el.append(this.template(this.course._toJSON()));
        document.title="爱上课 | " + this.course.get("category") +
                        " | " + this.course.get("subCategory") + 
                        " | " + this.course.get("subSubCategory") + 
                        "培训 | " + this.course.get("courseName");
        var $teachers = $(".teacherInfo"), i, maxHeight = -1, $teacher;
        for (i = 0; i < $teachers.length; i++) {
            $teacher = $($teachers[i]);
            maxHeight = maxHeight > $teacher.height() ? maxHeight : $teacher.height();
        }
        this.offSetHeight = 430;
        $teachers.css("height", maxHeight);
        this.basicPos = $("#content_basic").position().top;
        this.teachingPos = $("#content_teaching").position().top;
        this.etcPos = $("#content_etc").position().top;
        this.guaranteePos = $("#content_guarantee").position().top;
        this.servicePos = $("#content_service").position().top;
        this.compareWidget = new CourseDetailCompareWidgetView();
        if ($("#content_basic>dd").length === 0) {
            $("#content_basic").remove();
            $("#tab_basic").remove();
        }
        if ($("#content_teaching>dd").length === 0) {
            $("#content_teaching").remove();
            $("#tab_teaching").remove();
        }
        if ($("#content_etc>dd").length === 0) {
            $("#content_etc").remove();
            $("#tab_etc").remove();
        }
        if ($("#content_guarantee>dd").length === 0) {
            $("#content_guarantee").remove();
            $("#tab_guarantee").remove();
        }
        if ($("#content_service>dd").length === 0) {
            $("#content_service").remove();
            $("#tab_service").remove();
        }
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
                speed:650
            });
        });
        $(document).on("scroll", function () {
            var $btn = $("#trialButton"), position = $(this).scrollTop();
            if (position >= 210) {
                if (!$btn.hasClass("shown")){
                    $btn.animate({marginRight: "0px"}, 500);
                    $btn.addClass("shown");
                }
            } else {
                if ($btn.hasClass("shown")){
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
            $("#courseNavigateTab").find(".active").removeClass("active");
            if (position < that.teachingPos + that.offSetHeight) {
                $("#tab_basic").addClass("active")
            } else if (position >= that.teachingPos + that.offSetHeight && position < that.etcPos + that.offSetHeight) {
                $("#tab_teaching").addClass("active")
            } else if (position >= that.etcPos + that.offSetHeight && position < that.guaranteePos + that.offSetHeight) {
                $("#tab_etc").addClass("active")
            } else if (position >= that.guaranteePos + that.offSetHeight && position < that.servicePos + that.offSetHeight) {
                $("#tab_guarantee").addClass("active")
            } else {
                $("#tab_service").addClass("active")
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
                return;            }
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
