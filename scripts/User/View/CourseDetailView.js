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
        this.$el.append(this.template(this.course._toJSON()));
        var $teachers = $(".teacherInfo"), i, maxHeight = -1, $teacher;
        for (i = 0; i < $teachers.length; i++) {
            debugger;
            $teacher = $($teachers[i]);
            maxHeight = maxHeight > $teacher.height() ? maxHeight : $teacher.height();
        }
        $teachers.css("height", maxHeight);
        // var mapParams = {
        //     div: "courseMap",
        //     clickable: false,
        //     class: "map",
        //     location: this.course.get("location")
        // };

        // this.map = new BaiduMapView(mapParams);
        //this.map = app.storage.getViewCache("MapView", mapParams);
    },
    bindEvents: function () {
        var that = this;
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
            if ($(this).scrollTop() >= 561) {
                $("#courseNavigateTab").addClass("stickyHeader");
            } else {
                $("#courseNavigateTab").removeClass("stickyHeader");
            }
        });
        $("#bookNow").on("click", function () {
            app.navigate("booking/c" + that.courseId, true);
        });
    },

    close: function () {
        if (!this.isClosed) {
            // if (this.map) {
            //     this.map.close();
            // }
            if (this.$el !== 'undefined') {
                this.$el.empty();
            }
            $(document).off();
            $("#courseNavigateTab").off();
            this.isClosed = true;
            app.courseDetailView = null;
        }
    }
});
