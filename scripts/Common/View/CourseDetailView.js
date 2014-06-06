var CourseDetailView = Backbone.View.extend({
    el: "#content",
    initialize: function (courseIdWrapper) {
        _.bindAll(this, 'render', 'bindEvents', 'createNewBooking', 'close');
        app.viewRegistration.register(this);
        this.isClosed = false;

        this.user = app.sessionManager.sessionModel;
        var self = this;
        this.newBooking = new Booking ();
        this.template = _.template(tpl.get('courseDetail'));
        app.courseManager.fetchMessage(courseIdWrapper.courseId, {
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
        $("#courseNavigateTab").on("click", "div", function(e) {
            var id = e.target.id;
            id = "content_" + id.split("_")[1];
            that.scrollTo($("#"+id));
        });
        $("#bookNow").on("click", function() {

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
