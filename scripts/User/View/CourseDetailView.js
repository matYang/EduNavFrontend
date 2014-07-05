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
        // this.newBooking = new Booking();
        // $("#viewStyle").attr("href", "style/css/courseDetail.css");
        app.generalManager.fetchCourse(courseIdWrapper.courseId, {
            success: function (course) {
                self.course = course.clone();
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
            if ($(this).hasClass("add")) {
                if (that.compareWidget.addCourse(that.course)) {
                    $(this).attr("class", "remove btn_gray").val("已加入对比");
                } else {
                    Info.displayNotice("您最多只能同时比较四个不同的科目。");
                }

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
            var $btn = $("#trialButton");
            if ($(this).scrollTop() >= 210) {
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
        if (this.course.get("status") === EnumConfig.CourseStatus.openEnroll) {
            $("#bookNow").on("click", function () {
                app.navigate("booking/c" + that.courseId, true);
            });
        } else {
            $("#bookNow").attr("class", "btn_W").val("报名已截止").prop("disabled", true);
        }

        $("#siteMap").on("click", "span", function (e) {
            var id = e.target.id;
            if (id === "siteMap") {
                return;            }
            switch (id) {
            case "lv3cat":
                that.sr.set("category", $("#lv1cat").html());
                that.sr.set("subCategory", $("#lv2cat").html());
                that.sr.set("subSubCategory", $("#lv3cat").html());
                break;
            case "lv2cat":
                that.sr.set("category", $("#lv1cat").html());
                that.sr.set("subCategory", $("#lv2cat").html());
                that.sr.set("subSubCategory", undefined);
                break;
            case "lv1cat":
                that.sr.set("category", $("#lv1cat").html());
                that.sr.set("subCategory", undefined);
                that.sr.set("subSubCategory", undefined);
                break;
            default:
                break;
            }
            app.navigate("search/" + that.sr.toQueryString(), true);
        });
        $("#trialButton").on("click", function (e) {
            e.preventDefault();
            var $this = $(this);
            if ($(e.target).hasClass("close")) {
                $this.find("img").attr("src", "style/images/up_mianfei.png").css("margin-left", 200);
                $this.addClass("shrinked");
                $(e.target).addClass("hidden");
            } else if (e.target.tagName === "IMG") {
                if ($this.hasClass("shrinked")) {
                    $this.find("img").attr("src", "style/images/shiting.png").css("margin-left", 0);
                    $this.removeClass("shrinked");
                    $this.find(".close").removeClass("hidden");
                } else {
                    app.navigate("booking/c" + that.courseId, true);
                }
            }
        }).on("mouseover", "img", function (e) {
            if ($(e.delegateTarget).hasClass("shrinked")) {
                $(e.target).attr("src", "style/images/up_shiting.png");
            }
        }).on("mouseout", "img", function (e) {
            if ($(e.delegateTarget).hasClass("shrinked")) {
                $(e.target).attr("src", "style/images/up_mianfei.png");
            }
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
            $("#trialButton").off();
            this.isClosed = true;
            app.courseDetailView = null;
        }
    }
});
