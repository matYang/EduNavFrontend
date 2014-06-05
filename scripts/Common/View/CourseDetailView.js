var CourseDetailView = Backbone.View.extend({
    el: "#content",
    initialize: function (courseIdWrapper) {
        _.bindAll(this, 'render', 'bindEvents', 'createNewBooking', 'renderPriceList', 'cancelSuccess', 'cancelError', 'close');
        app.viewRegistration.register("courseDetail", this, true);
        this.isClosed = false;

        this.user = app.sessionManager.sessionModel;
        this.userId = app.sessionManager.getUserId();
        var self = this;
        this.newBooking = new Booking ();
        this.quickmatchTemplate = _.template(tpl.get('SimpleMessage'));
        app.courseManager.fetchMessage(courseIdWrapper.courseId, {
            success: function (course) {
                self.course = course;
                self.courseId = course.get("courseId");
                self.ownerId = self.course.get("ownerId") || -1;

                self.template = _.template(tpl.get('courseDetail'));
                self.bookingTemplate = _.template(tpl.get('Booking'));
                self.render();
                self.bindEvents();
                self.createNewBooking();
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
        this.$el.append(this.template(this.parsedMessage));
        this.map = app.storage.getViewCache("MapView", mapParams);
    },
    bindEvents: function () {

    },
    createNewBooking: function () {
        this.newBooking.initBookingFromCourse(this.course);
    },
    checkMyBooking: function () {

    },
    cancelSuccess: function(){
        this.$viewendConfirm.removeAttr("disabled").val("取消成功, 关闭").off().on("click", function (e) {
            $("#popup").empty().hide();
            $("#overlay").hide();
        });
        this.$viewend.off();
        this.$viewend.val("已经结束").removeClass("btn_R_long").attr("id", "view_expired");
    },

    cancelError: function(){
        this.$viewendConfirm.val("取消失败,请重试").removeAttr("disabled");
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
