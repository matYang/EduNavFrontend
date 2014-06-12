var CompareWidgetView = Backbone.View.extend({
    el: "#CompareWidgetContainer",
    initialize: function () {
        this.isClosed = false;
        debugger;
        _.bindAll(this, "render", "close");
        this.template = _.template(tpl.get("compareWidget"));;
        this.$el.append(this.template);
        this.courseTemplate = _.template(tpl.get("compareWidgetEntry"));
        this.$domContainer = $("#compareItems");
        this.courseIds = app.storage.getCoursesToCompare();
        if (this.courseIds) {
            app.generalManager.batchFetchCourses(this.courseIds, {
                "success": this.render,
                "error": function (){}
            });
        } else {
            this.courseIds = [];
            this.render();
        }
    },
    render: function (courses) {
        //load local storage
        var buf = [];
        this.courses = courses || new Courses();
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
            var id = Utilities.getId($(this).parent().attr("id"));
            that.removeCourse(id);
        });
        

    },
    // course can only be added to compare widget from searchView
    addCourse: function (course) {
        if (app.storage.addCourseToCompare(course.id)) {
            this.courseIds = app.storage.getCoursesToCompare();
            this.$domContainer.append(this.courseTemplate(course._toJSON()));
            this.courses.add(course);
        } else {

        }
    },
    removeCourse: function(id) {
        $("#compareEntry_courseId_"+id).remove();
        app.storage.removeCourseFromCompare(id);
        this.courseIds = app.storage.getCoursesToCompare();
    },
    close: function () {
        if (!this.isClosed) {
            this.isClosed = true;
            this.$el.empty();
        }
    }
});