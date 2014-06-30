var CompareWidgetView = Backbone.View.extend({
    el: "#CompareWidgetContainer",
    template: _.template(tpl.get("compareWidget")),
    courseTemplate: _.template(tpl.get("compareWidgetEntry")),
    initialize: function () {
        this.isClosed = false;
        _.bindAll(this, "load", "bindEvents", "addCourse", "removeCourse", "renderMap", "render", "close");
        this.courseIds = app.storage.getCoursesToCompare();
        this.courses = [];
        this.reload = false;
        this.load();
    },
    load: function () {
        this.$el.empty().append(this.template);
        this.$domContainer = $("#compareItems");
        if (this.courseIds && this.courseIds.length) {
            app.generalManager.batchFetchCourses(this.courseIds, {
                "success": this.render,
                "error": function () {
                    return;
                }
            });
        } else {
            this.courseIds = [];
            this.render();
        }
    },
    render: function (courses) {
        //load local storage
        var buf = [], i;
        this.courses = courses || new Courses();
        if (this.courses instanceof Backbone.Collection) {
            this.courses = this.courses.toArray();
        }
        if (typeof BMap !== "undefined" && !this.map) {
            this.renderMap();
        }
        for (i = 0; i < this.courses.length && i < 4; i++) {
            buf[i] = this.courseTemplate(this.courses[i]._toJSON());
            if (this.map) {
                this.map.getLatLng(this.courses[i].get("location"), this.courses[i].get("instName"));
            }
        }
        this.$domContainer.off().empty().append(buf.join(""));
        this.bindEvents();
    },
    bindEvents: function () {
        var that = this;
        $("#compare").on("click", function () {
            app.navigate("compare", true);
        });
        this.$domContainer.on("click", ".remove", function () {
            var id = Utilities.getId($(this).parent().attr("id"));
            that.removeCourse(id);
        }).on("click", "a", function (e) {
            e.preventDefault();
            app.navigate("course/" + Utilities.getId($(e.target).parent().parent().attr("id")), true);
        });
        $(window).on("focus", function () {
            if (that.isClosed) {
                return;
            }
            var idList = app.storage.getCoursesToCompare(), i;
            if (!that.courseIds.compare(idList)) {
                that.courseIds = idList;
                that.reload = true;
                $("#searchResultDisplayPanel").find(".compare").children("input").attr("class", "add btn_g").val("+对比");
                for (i = 0; i < that.courseIds.length; i++) {
                    $("#compare_" + that.courseIds[i]).children("input").attr("class", "remove btn_gray").val("已加入对比");
                }
                that.load();
            }
        });
    },
    // course can only be added to compare widget from searchView
    addCourse: function (course) {
        if (app.storage.addCourseToCompare(course.id)) {
            this.courseIds = app.storage.getCoursesToCompare();
            this.$domContainer.append(this.courseTemplate(course._toJSON()));
            this.courses[this.courses.length] = course;
            if (this.map) {
                this.map.getLatLng(course.get("location"), course.get("instName"));
            }
            return true;
        }
        return false;
    },
    removeCourse: function (id) {
        var i;
        $("#compareEntry_courseId_" + id).remove();
        if (this.map) {
            for (i = 0; i < this.courses.length; i++) {
                if (this.courses[i].id === Utilities.toInt(id)) {
                    this.map.removeMarker(this.courses[i].get("location"));
                }
            }
        }
        $("#compare_" + id).children("input").attr("class", "add btn_g").val("+对比");
        app.storage.removeCourseFromCompare(id);
        this.courseIds = app.storage.getCoursesToCompare();
    },
    renderMap: function () {
        this.map = new MainMapView();
        for (i = 0; i < this.courses.length && i < 4; i++) {
            this.map.getLatLng(this.courses[i].get("location"), this.courses[i].get("instName"));
        }
        if (this.courses.length === 0 && this.map) {
            this.map.setCenter("南京");
        }
        this.rendered = true;
    },
    close: function () {
        if (!this.isClosed) {
            $(window).off("focus");
            $("#compare").off();
            this.$domContainer.off();
            this.$domContainer = null;
            this.isClosed = true;
            this.$el.empty();
            if (this.map) {
                this.map.close();
            }
            this.el = "";

        }
    }
});

var CourseDetailCompareWidgetView = CompareWidgetView.extend({
   el: "#widgets",
   template: _.template(tpl.get("courseDetailCompareWidget")),
    initialize: function () {
        CompareWidgetView.prototype.initialize.call(this);
    },
    render: function (courses) {
        //load local storage
        var buf = [], i;
        this.courses = courses || new Courses();
        if (this.courses instanceof Backbone.Collection) {
            this.courses = this.courses.toArray();
        }
        for (i = 0; i < this.courses.length && i < 4; i++) {
            buf[i] = this.courseTemplate(this.courses[i]._toJSON());
        }
        this.$domContainer.off().empty().append(buf.join(""));
        for (i = 0; i < this.courseIds.length; i++) {
            $("#detail_compare_" + this.courseIds[i]).attr("class", "remove btn_gray").val("已加入对比");
        }
        this.bindEvents();
    },
    bindEvents: function () {
        var that = this;
        $("#compare").on("click", function () {
            app.navigate("compare", true);
        });
        this.$domContainer.on("click", ".remove", function () {
            var id = Utilities.getId($(this).parent().attr("id"));
            that.removeCourse(id);
        }).on("click", "a", function (e) {
            e.preventDefault();
            app.navigate("course/" + Utilities.getId($(e.target).parent().parent().attr("id")), true);
        });
        $(window).on("focus", function () {
            if (that.isClosed) {
                return;
            }
            var idList = app.storage.getCoursesToCompare(), i;
            if (!that.courseIds.compare(idList)) {
                that.courseIds = idList;
                that.load();
            }
        });
        $("#compareToggle").on("click", function () {
            var $content = $("#compareWidgetContent");
            if ($content.hasClass("hidden")) {
                $content.removeClass("hidden");
                that.$el.find(".compare").css("width", 250);
            } else {
                $content.addClass("hidden");
                that.$el.find(".compare").css("width", 0);
            }
        });
    },
    removeCourse: function (id) {
        var i;
        $("#detail_compare_"+id).attr("class", "add btn_g").val("+对比");
        $("#compareEntry_courseId_" + id).remove();
        app.storage.removeCourseFromCompare(id);
        this.courseIds = app.storage.getCoursesToCompare();
    },
    close: function (id) {
        if (!this.isClosed) {
            CompareWidgetView.prototype.close.call(this);
            $("#compareToggle").off();
            this.isClosed = true;
        }

    }
});