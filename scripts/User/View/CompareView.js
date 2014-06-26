var CompareView = Backbone.View.extend({
    el: "#content",
    highlighted: false,
    hided: false,
    initialize: function () {
        // $("#viewStyle").attr("href", "style/css/compare.css");
        _.bindAll(this, "load", "render", "bindEvents", "renderError", "close");
        this.template = _.template(tpl.get("compareView"));
        this.load();
    },
    load: function () {
        $(document).scrollTop(0);
        this.courseIdList = app.storage.getCoursesToCompare(); // array of items to compare
        if (!this.courseIdList.length) {
            Info.displayNotice("你还没有选中比较的课程，先去逛逛吧");
            this.isClosed = true;
            app.navigate("search", {trigger: true, replace: true});
            return;
        }
        this.isClosed = false;
        app.viewRegistration.register(this);
        this.courses = [];
        if (this.courseIdList.length === 0) {
            this.render(new Courses());
        } else {
            app.generalManager.batchFetchCourses(this.courseIdList, {
                success: this.render,
                error: this.renderError
            });
        }
    },
    render: function (courses) {
        if (!this.isClosed) {
            this.courses = courses.toArray();
            var len = 0;
            while (len < 4) {
                if (this.courses.length > len) {
                    this.courses[len] = this.courses[len]._toJSON();
                } else {
                    this.courses[len] = new Course()._toJSON();
                }
                len++;
            }
            this.$el.empty().append(this.template({courses: this.courses}));
            this.courses = [];
            this.$view = $("#compareView");
            this.afterRender();
            this.bindEvents();
        }
    },
    renderError: function () {
        if (!this.isClosed) {
            Info.displayNotice("课程信息好像载入失败了....诶嘿");
            app.navigate("search", true);
        }
    },
    afterRender: function () {
        $(".courseId_").html("");
        this.configMoveButton();
    },
    configMoveButton: function () {
        this.$view.find(".pre-disabled").removeClass("pre-disabled");
        this.$view.find(".next-disabled").removeClass("next-disabled");
        this.$view.find("#courseName").find(".pre:first").addClass("pre-disabled");
        this.$view.find("#courseName").find(".next:last").addClass("next-disabled");
    },
    bindEvents: function () {
        var that = this;
        this.$tables = $("table");
        $("#compareView").children(".title").on("click", "span", function (e) {
            var id = e.delegateTarget.id.split("_")[0];
            if (!$("#" + id + "_content").hasClass("hidden")) {
                $(e.target).attr("class", "down");
                $(e.delegateTarget).children("a").html("[展开]");
                $("#" + id + "_content").addClass("hidden");
                $(e.delegateTarget).css("border-bottom", "1px solid #ccc");
            } else {
                $(e.target).attr("class", "up");
                $(e.delegateTarget).children("a").html("[收起]");
                $("#" + id + "_content").removeClass("hidden");
                $(e.delegateTarget).css("border-bottom", "");
            }
        }).on("click", "a", function (e) {
            e.preventDefault();
            var id = e.delegateTarget.id.split("_")[0];
            if (!$("#" + id + "_content").hasClass("hidden")) {
                $(e.delegateTarget).children("span").attr("class", "down");
                $(e.target).html("[展开]");
                $("#" + id + "_content").addClass("hidden");
                $(e.delegateTarget).css("border-bottom", "1px solid #ccc");
            } else {
                $(e.delegateTarget).children("span").attr("class", "up");
                $(e.target).html("[收起]");
                $("#" + id + "_content").removeClass("hidden");
                $(e.delegateTarget).css("border-bottom", "");
            }
        });
        $("#courseName").on("click", "td", function (e) {
            var $e, index, index2, courseId;
            if (e.target.tagName === "INPUT") {
                app.navigate("booking/c" + Utilities.getId($(e.currentTarget).attr("class")), true);
                return;
            } else if (e.target.tagName !== "A") {
                return;
            }
            e.preventDefault();
            $e = $(e.target);
            if ($e.hasClass("delete")) {
                courseId = Utilities.getId($(e.currentTarget).attr("class"));
                that.$view.find(".courseId_" + courseId).remove();
                that.$view.find("tr").append("<td></td>");
                that.configMoveButton();

                app.storage.removeCourseFromCompare(Utilities.toInt(courseId));
                that.courseIdList = app.storage.getCoursesToCompare();
                return;
            }
            index = $("#courseName>td").index($(e.currentTarget));
            if ($e.hasClass("pre")) {
                if ($e.hasClass("pre-disabled")) {
                    return;
                }
                index2 = index - 1;
            } else if ($e.hasClass("next")) {
                if ($e.hasClass("next-disabled")) {
                    return;
                }
                index2 = index + 1;
            }
            that.swapRow(index, index2);
        });
        $(document).on("scroll", function () {
            if ($(this).scrollTop() >= 145) {
                $("#courseName").addClass("stickyHeader");
                if ($("#stickyPlaceholder").length === 0) {
                    $("#courseName").after("<tr id='stickyPlaceholder' style='height:160px'></tr>");
                }
            } else {
                $("#courseName").removeClass("stickyHeader");
                $("#stickyPlaceholder").remove();
            }
        });
        $(window).on("focus", function () {
            if (that.isClosed) {
                return;
            }
            var idList = app.storage.getCoursesToCompare();
            if (!that.courseIdList.compare(idList)) {
                that.courseIdList = idList;
                $(document).off("scroll");
                $(window).off("focus");
                $("#compareView").off();
                $("#courseName").off();
                that.load();
            }
        });
    },
    swapRow: function (index1, index2) {
        var temp, i, $td, $rows;
        if (index1 > index2) {
            temp = index1;
            index1 = index2;
            index2 = temp;
        }
        temp = this.courseIdList[index1];
        this.courseIdList[index1] = this.courseIdList[index2];
        this.courseIdList[index2] = temp;
        $rows = this.$view.find("tr");
        for (i = 0; i < $rows.length; i++) {
            $td = $($rows[i]).find("td");
            $($td[index2]).after($($td[index1]).detach());
        }
        app.storage.setCoursesToCompare(this.courseIdList);
        this.configMoveButton();
    },
    // highlight: function () {
    //     if (this.highlighted) {
    //         $(".highlighted").removeClass("highlight");
    //         this.highlighted = false;
    //         return;
    //     }
    //     var i, count;
    //     var keys = this.items[0].keys(), len = this.obj.len;
    //     for ( count = 0; count < keys.lenght; count++) {
    //         for ( i = 0; i < len; i++ ) {
    //             if (this.items[i].get(keys[count]) !== this.items[(i+1)%len].get(keys[count])) {
    //                 $("."+keys[count]).addClass("highlight");
    //             }
    //         }
    //     }
    //     this.highlighted = true;
    // },
    close: function () {
        if (!this.isClosed) {
            $(document).off("scroll");
            $(window).off("focus");
            $("#compareView").off();
            $("#compareView").children(".title").off();
            $("#courseName").off();
            this.$view = null;
            this.isClosed = true;
            this.$el.empty();
            app.compareView = null;
        }
    }
});