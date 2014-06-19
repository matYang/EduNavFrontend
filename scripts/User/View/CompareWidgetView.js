var CompareWidgetView = Backbone.View.extend({
    el: "#CompareWidgetContainer",
    initialize: function () {
        this.isClosed = false;
        _.bindAll(this, "load", "bindEvents", "addCourse", "removeCourse", "render", "close");
        this.template = _.template(tpl.get("compareWidget"));;
        this.$el.append(this.template);
        this.courseTemplate = _.template(tpl.get("compareWidgetEntry"));
        this.$domContainer = $("#compareItems");
        this.courseIds = app.storage.getCoursesToCompare();
        this.reload = false;
        this.load();
    },
    load: function () {
        if (this.courseIds && this.courseIds.length) {
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
        if (this.courses instanceof Backbone.Collection) {
            this.courses = this.courses.toArray();
        }
        if (!this.map) {
            this.renderMap();
        }
        for (var i = 0; i < this.courses.length && i < 4; i++ ) {
            buf.push(this.courseTemplate(this.courses[i]._toJSON()));
            this.map.getLatLng(this.courses[i].get("location"));
        }
        this.$domContainer.empty().append(buf.join(""));
        if (!this.reload) {
            this.bindEvents();
        }


    },
    bindEvents: function () {
        var that = this;
        $("#compare").on("click", function () {
            app.navigate("compare", true);
        });
        this.$domContainer.on("click", ".remove", function (e) {
            var id = Utilities.getId($(this).parent().attr("id"));
            that.removeCourse(id);
        }).on("click", "a", function (e) {
            e.preventDefault();
            app.navigate("course/"+Utilities.getId($(e.target).parent().parent().attr("id")), true);
        });
        $(window).on("focus", function(){
            if (that.isClosed) return;
            var idList = app.storage.getCoursesToCompare();
            if (!that.courseIds.compare(idList)) {
                that.courseIds = idList;
                that.reload = true;
                that.load();
            }
        });
    },
    // course can only be added to compare widget from searchView
    addCourse: function (course) {
        if (app.storage.addCourseToCompare(course.id)) {
            this.courseIds = app.storage.getCoursesToCompare();
            this.$domContainer.append(this.courseTemplate(course._toJSON()));
            this.courses.push(course);
            this.map.getLatLng(course.get("location"));
        } else {

        }
    },
    removeCourse: function(id) {
        $("#compareEntry_courseId_"+id).remove();
        for (var i = 0; i < this.courses.length; i++ ) {
            if (this.courses[i].id === Utilities.toInt(id)) {
                this.map.removeMarker(this.courses[i].get("location"));
            }
        }
        app.storage.removeCourseFromCompare(id);
        this.courseIds = app.storage.getCoursesToCompare();
    },
    renderMap: function () {
        var me = this, mapParams = {
            div: "mainMap",
            class: "mainPage-map",
            clickable: false
        };
        this.map = app.storage.getViewCache("BaiduMapView", mapParams);
        this.rendered = true;
    },
    close: function () {
        if (!this.isClosed) {
            $(window).off("focus");
            this.isClosed = true;
            this.$el.empty();
            if (this.map) {
                this.map.close();
            }

        }
    }
});