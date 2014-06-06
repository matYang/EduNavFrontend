var CompareWidgetView = Backbone.View.extend({
    el: "#CompareWidgetContainer",
    initialize: function () {
        a
        this.isClosed = false;
        _.bindAll(this, "render", "close");
        this.template = _.template(tpl.get("compareWidget"));;
        this.$el.append(this.template);
        this.courseTemplate = _.template(tpl.get("compareWidgetEntry"));
        this.$domContainer = $("#courses");
        this.courseIds = app.storageService.getCoursesToCompare();
        app.generalManager.fetchCourse(this.courseIds, {
            "success": this.render,
            "error": function (){}
        });
    },
    render: function (courses) {
        //load local storage
        var buf = [];
        this.courses = courses;
        for (var i = 0; i < this.courses.length; i++ ) {
            buf.push(this.courseTemplate(this.courses[i]._toJSON()));
        }
        this.$domContainer.append(buf.join());

    },
    bindEvents: function () {
        var that = this;
        $("#compare").on("click", function () {
            app.navigate("compare"+this.courses.join("_"), true);
        });
        this.$domContainer.on("click", ".remove", function (e) {
            var id = Utilities.getId($(this).attr("id"));
            that.removeCourse(id);
        });

    },
    // course can only be added to compare widget from searchView
    addCourse: function (course) {
        if (app.storageService.addCourseToCompare(course.id)) {
            ths.courseIds = app.storageService.getCoursesToCompare();
            this.$domContainer.append(this.courseTemplate(course._toJSON()));
            this.courses.push(course);
        } else {

        }
    },
    removeCourse: function(id) {
        $("#compare_course_"+id).remove();
        app.storageService.removeCourseFromCompare(id);
        this.courseIds = app.storageService.getCoursesToCompare();
    },
    close: function () {
        if (!this.isClosed) {
            this.isClosed = true;
            this.$el.empty();
        }
    }
});