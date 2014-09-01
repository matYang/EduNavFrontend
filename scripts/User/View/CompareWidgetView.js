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
        this.$el.empty().append(this.template);
        this.$domContainer = $("#compareItems");
        this.courses = courses || new Courses();
        app.storage.setCoursesToCompare(this.courses.pluck("courseId"));
        if (this.courses instanceof Backbone.Collection) {
            this.courses = this.courses.toArray();
        }

        for (i = 0; i < this.courses.length && i < 4; i++) {
            buf[i] = this.courseTemplate(this.courses[i]._toJSON());
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
        /*切换窗口时从localstorage中提取对比课程进行同步*/
        $(window).on("focus", function () {
            if (that.isClosed) {
                return;
            }
            var idList = app.storage.getCoursesToCompare(), i;
            //如果数据不同则重新渲染
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
            return true;
        }
        return false;
    },
    removeCourse: function (id) {
        var i;
        $("#compareEntry_courseId_" + id).remove();
        $("#compare_" + id).children("input").attr("class", "add btn_g").val("+对比");
        app.storage.removeCourseFromCompare(id);
        this.courseIds = app.storage.getCoursesToCompare();
    },
    renderMap: function () {
        var self = this;
        if (typeof BMap == "undefined" || this.map || !app.searchView) {
            return
        }
        var i = 0, courses = [];
        if (app.searchView && app.searchView.searchResultView&&app.searchView.searchResultView.messages) {
            courses = app.searchView.searchResultView.messages;
        }
        //新建百度地图view
        this.map = new MainMapView();
        if (app.searchView && app.searchView.searchRepresentation) {
            if (app.searchView.searchRepresentation.get("district")) {
                this.map.map.centerAndZoom((app.searchView.searchRepresentation.get("city")  || "南京") + "市" + 
                    app.searchView.searchRepresentation.get("district") + "区", 12);
            } else {
                this.map.map.centerAndZoom(app.searchView.searchRepresentation.get("city") || "南京", 10);
            }
        } else {
            this.map.map.centerAndZoom("南京", 9);
        }
        //过滤相同的地址后再发送请求 减少请求次数
        var courseLocationMap = {};
        for (i = 0; i < courses.length; i++) {
            courseLocationMap[courses.at(i).get("instName")] = courses.at(i).get("address");
        }

        _.each(courseLocationMap,function(address,instName){
            self.map.getLatLng(address, instName);
        });
        this.rendered = true;
    },
    close: function () {
        if (!this.isClosed) {
            $(window).off("focus");
            $("#compare").off();
            if (this.$domContainer) {
                this.$domContainer.off();
                this.$domContainer = null;
            }
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
   el: ".right_bar .comparison",
   template: _.template(tpl.get("courseDetailCompareWidget")),
    initialize: function () {
        CompareWidgetView.prototype.initialize.call(this);
    },
    render: function (courses) {
        //load local storage

        //todo app.courseDetailView will correctly exists when route changes dont know why currently
//        if (app.courseDetailView && !app.courseDetailView.isClosed) {
        if (this.$el.length > 0) {
            var buf = [], i;
            this.$el.empty().append(this.template);
            this.$domContainer = $("#compareItems");
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
        }
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
            } else {
                $content.addClass("hidden");
            }
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
                    app.navigate("booking/c" + app.courseDetailView.courseId, true);
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
    removeCourse: function (id) {
        var i;
        $("#detail_compare_" + id).attr("class", "add btn_g").val("+对比");
        $("#compareEntry_courseId_" + id).remove();
        app.storage.removeCourseFromCompare(id);
        this.courseIds = app.storage.getCoursesToCompare();
    },
    close: function (id) {
        if (!this.isClosed) {
            CompareWidgetView.prototype.close.call(this);
            $("#compareToggle").off();
            $("#trialButton").off();
            this.$el.off();
            this.isClosed = true;
        }

    }
});