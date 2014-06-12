var CourseDetailView = Backbone.View.extend({
    el: "#content",
    initialize: function (courseIdWrapper) {
        _.bindAll(this, 'render', 'bindEvents', 'close');
        app.viewRegistration.register(this);
        this.isClosed = false;

        this.user = app.sessionManager.sessionModel;
        var self = this;
        this.newBooking = new Booking ();
        this.template = _.template(tpl.get('courseDetail'));
        $("#viewStyle").attr("href", "style/css/courseDetail.css");
        app.generalManager.fetchCourse(courseIdWrapper.courseId, {
            success: function (course) {
                self.course = course;
                self.courseId = course.get("courseId");
                self.render();
                self.bindEvents();
            },
            error: function () {
                Info.displayErrorPage("content", "信息读取失败, 请刷新页面");
            }
        });
    },

    render: function () {
        var mapParams = {
            div: "view_map",
            class: "messageDetail-map-content",
            location: this.course.get("city") + this.course.get("district"),
            clickable: false
        };
        this.$el.append(this.template(this.course._toJSON()));
        //this.map = app.storage.getViewCache("MapView", mapParams);
    },
    bindEvents: function () {
        var that = this;
        $("#courseNavigateTab").on("click", "li", function(e) {
            var id = e.target.id;
            id = "#content_" + id.split("_")[1];
            $.smoothScroll({
                scrollTarget: id,
                offset: -36
            });
            $(e.delegateTarget).find(".active").removeClass("active");
            $(e.target).addClass("active");
        });
        $(document).on("scroll", function (e) {
            if ($(this).scrollTop() >= 522) {
                $("#courseNavigateTab").addClass("stickyHeader");
            } else {
                $("#courseNavigateTab").removeClass("stickyHeader");
            }
        });
        $("#bookNow").on("click", function() {
            app.navigate("booking/c"+that.courseId, true);
        });
    },
    checkMyBooking: function () {

    },

    close: function () {
        if (!this.isClosed) {
            if (this.map) {
                this.map.close();
            }

            if ( typeof this.$el !== 'undefined') {
                this.$el.empty();
            }

            $("#popup").empty();
            this.isClosed = true;
        }
    }
});
