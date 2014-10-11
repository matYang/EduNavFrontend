var CompareView = Backbone.View.extend({
    el: "#content",
    template: _.template(tpl.get("compareView")),
    initialize: function () {
        // $("#viewStyle").attr("href", "style/css/compare.css");
        $(document).scrollTop(0);
        _.bindAll(this, "load", "render", "afterRender", "bindEvents", "renderError", "close");
        this.load();
    },
    //加载对比课程的数据
    load: function () {
        //从localStorage中获取课程对比列表
        this.courseIdList = app.storage.getCoursesToCompare(); // array of items to compare
        if (!this.courseIdList.length) {
            Info.displayNotice("您还没有添加待比较的课程，先去查看感兴趣的课程吧");
            this.isClosed = true;
            app.navigate("search", {trigger: true, replace: true});
            return;
        }
        $(document).scrollTop(0);
        this.isClosed = false;
        app.viewRegistration.register(this);
        //存储对比的课程列表
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
        if (!courses.length) {
            //如果渲染的数据为空 则进行提示
            Info.displayNotice("您还没有添加待比较的课程，先去查看感兴趣的课程吧");
            this.isClosed = true;
            app.navigate("search", {trigger: true, replace: true});
            return;
        }
        if (!this.isClosed) {
            document.title = "爱上课 | 课程比较";
            this.courses = courses.toArray();
            var len = 0;
            //将课程填充为4个(对比页最多容纳4个课程)
            while (len < 4) {
                if (this.courses.length > len) {
                    this.courses[len] = this.courses[len]._toJSON();
                } else {
                    this.courses[len] = new Course()._toJSON();
                }
                len++;
            }
            this.$el.html(this.template({courses: this.courses}));
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
        $(".courseId_-1").html("");
        this.configMoveButton();
        this.handleEmptyText();
    },
    handleEmptyText: function () {
        this.$view.find("td:empty[class^='courseId_']").filter("[class!='courseId_-1']").text('-- --');
    },
    //配置左右交换位置的按钮style class
    configMoveButton: function () {
        this.$view.find(".pre-disabled").removeClass("pre-disabled");
        this.$view.find(".next-disabled").removeClass("next-disabled");
        this.$view.find("#courseName").find(".pre:first").addClass("pre-disabled");
        this.$view.find("#courseName").find(".next:last").addClass("next-disabled");
    },
    //绑定事件(交换课程位置 删除对比课程 查看对比课程 长文本内容的展开和收起)
    bindEvents: function () {
        var that = this;
        this.$tables = $("table");
        $("#compareView").children(".title")
            //Event 基本信息title的展开收起事件
            .on("click", "span", function (e) {
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
            })
            //Event 除基本信息title之外的展开收起事件
            .on("click", "a", function (e) {
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
        /*课程名称中的事件 查看课程详情*/
        $("#courseName").on("click", ".td", function (e) {
            var $e, index, index2, courseId;
            var styleClass = $(e.currentTarget).attr("class");
            courseId = Utilities.getId(styleClass.split(' ')[0]);
            //查看课程详情
            if (e.target.tagName === "H2") {
                app.navigate("course/" + courseId, true);
                return;
            }
            //立即预订
            if (e.target.tagName === "INPUT") {
                app.navigate("course/" + courseId, true);
//                app.navigate("booking/c" + courseId, true);//no more exits
                return;
            }
            if (e.target.tagName !== "A") {
                return;
            }
            e.preventDefault();
            $e = $(e.target);
            //删除对比课程
            if ($e.hasClass("delete")) {
                var removed = false;
                that.$view.find(".courseId_" + courseId).fadeOut(200, function () {
                    if (!removed) {
                        //移除选中的课程 并且在后侧补齐
                        that.$view.find(".courseId_" + courseId).remove();
                        //这里头部的课程名称是通过div实现 而不是td
                        that.$view.find('#courseName').append('<div class="courseId_-1 td" style="width: 195px"></div>');
                        that.$view.find('tr:not(#stickyPlaceholder)').append("<td class='courseId_-1' style='width: 195px'></td>");
                        removed = true;
                        //移至animate回调中防止异步造成页面提早跳转产生的错误
                        that.configMoveButton();
                        app.storage.removeCourseFromCompare(Utilities.toInt(courseId));
                        that.courseIdList = app.storage.getCoursesToCompare();
                        //对比课程数量为0时提示
                        if (!that.courseIdList.length) {
                            Info.displayNotice("已经没有待比较的课程了，先去查看感兴趣的课程吧");
                            app.infoModal.show();
                        }
                        $("#gotIt").on("click", function () {
                            app.navigate("search", {trigger: true, replace: true});
                        });
                    }
                });

            }
            index = $("#courseName .td").index($(e.currentTarget));
            //对比课程前移
            if ($e.hasClass("pre")) {
                if ($e.hasClass("pre-disabled")) {
                    return;
                }
                index2 = index - 1;
            }
            //对视课程后移
            else if ($e.hasClass("next")) {
                if ($e.hasClass("next-disabled")) {
                    return;
                }
                index2 = index + 1;
            }
            that.swapRow(index, index2);
        });
        //课程名称在滚动时会固定在页面头部
        $(window).on("scroll", function () {
            if ($(this).scrollTop() >= 140) {
                $("#courseName").addClass("stickyHeader");
                if ($("#stickyPlaceholder").length === 0) {
                    $("#courseName").after("<div id='stickyPlaceholder' style='height:171px'></div>");
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
        /*机构信息中的内容展开和收起*/
        $("#partnerIntro").on("click", "a", function (e) {
            e.preventDefault();
            var cc, $pi = $(e.delegateTarget), text, course;
            if ($(this).hasClass("expand")) {
                for (cc = 0; cc < 4; cc++) {
                    course = that.courses[cc];
                    if (course.courseId) {
                        $pi.find(".courseId_" + course.courseId).html(
                                course.partnerIntro + (course.partnerIntro.length <= 30 ? "" :
                                '<a class="F_green collapse" href="#">[收起]</a></td>')
                        );
                    }
                }
            } else {
                for (cc = 0; cc < 4; cc++) {
                    course = that.courses[cc];
                    if (course.courseId) {
                        if (course.partnerIntro.length <= 30) {
                            text = course.partnerIntro;
                        } else {
                            text = course.partnerIntro.substring(0, 28)
                                + '...<a class="F_green expand" href="#">[展开]</a></td>';
                        }
                        $pi.find(".courseId_" + course.courseId).html(text);
                    }
                }
            }
        });
    },
    //交换两个课程的显示位置
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

        $td = $('#courseName').find(".td");
        $($td[index2]).after($($td[index1]).detach());

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
            this.courses = [];
            app.compareView = null;
        }
    }
});