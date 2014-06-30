var CourseDetailView = Backbone.View.extend({
    el: "#content",
    template: _.template(tpl.get('courseDetail')),
    initialize: function (courseIdWrapper) {
        _.bindAll(this, 'render', 'bindEvents', 'close');
        app.viewRegistration.register(this);
        this.isClosed = false;

        this.user = app.sessionManager.sessionModel;
        var self = this;
        // this.newBooking = new Booking();
        // $("#viewStyle").attr("href", "style/css/courseDetail.css");
        app.generalManager.fetchCourse(courseIdWrapper.courseId, {
            success: function (course) {
                self.course = course;
                self.courseId = course.get("courseId");
                self.render();
                self.bindEvents();
            },
            error: function (response) {
                Info.displayErrorPage("content", response.responseText);
            }
        });
    },

    render: function () {
        $(document).scrollTop(0);
        $("body").addClass("courseDetail");
        this.$el.append(this.template(this.course._toJSON()));
        var $teachers = $(".teacherInfo"), i, maxHeight = -1, $teacher;
        for (i = 0; i < $teachers.length; i++) {
            $teacher = $($teachers[i]);
            maxHeight = maxHeight > $teacher.height() ? maxHeight : $teacher.height();
        }
        $teachers.css("height", maxHeight);
        this.compareWidget = new CourseDetailCompareWidgetView();
    },
    bindEvents: function () {
        var that = this;
        $("#detail_compare_" + this.course.id).on("click", function () {
            debugger;
            if ($(this).hasClass("add")) {
                that.compareWidget.addCourse(that.course);
                $(this).attr("class", "remove btn_gray").val("已加入对比");
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
                offset: -36
            });
            $(e.delegateTarget).find(".active").removeClass("active");
            $(e.target).addClass("active");
        });
        $(document).on("scroll", function () {
            if ($(this).scrollTop() >= 492) {
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
        });
        $("#bookNow").on("click", function () {
            app.navigate("booking/c" + that.courseId, true);
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
            $(document).off();
            $("#courseNavigateTab").off();
            $("body").removeClass("courseDetail");
            this.isClosed = true;
            app.courseDetailView = null;
        }
    }
});
