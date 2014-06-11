var CompareView = Backbone.View.extend({
    el: "#content",
    highlighted: false,
    hided: false,
    initialize: function (params) {
        
        app.viewRegistration.register(this);
        this.isClosed = false;
        _.bindAll(this, "render", "bindEvents", /* "highlight", "hideSame", */ "close");
        $("#viewStyle").attr("href", "style/css/compare.css");
        this.template = _.template(tpl.get("compareView"));
        if (params.courseIdList) {
            this.courseIdList = params.courseIdList; // array of items to compare
        }
        this.courses = [];
        for (var i = 0; i < this.courseIdList.length; i++) {
            app.generalManager.fetchCourse(this.courseIdList[i], {
                success: this.render,
                error: this.renderError
            });
        }
        
    },
    render: function (course) {
        this.courses.push(course._toJSON());
        var len = this.courses.length;
        if (len === this.courseIdList.length) {
            while (len < 4) {
                len++;
                this.courses.push((new Course())._toJSON());
            }
            this.$el.append(this.template({courses: this.courses}));
            this.$view = $("#compareView");
            this.afterRender();
            this.bindEvents();
        }
    },
    renderError: function () {
        $("#compareEntriesContainer").append("<div>课程信息好像载入失败了....诶嘿(<ゝω·) <a id='retry'>重试</a></div>");
    },
    afterRender: function() {
        $(".courseId_-1").html("");
        this.configMoveButton();
    },
    configMoveButton: function () {
        this.$view.find("#courseName>.pre_disabled").removeClass("pre_disabled");
        this.$view.find("#courseName>.next-disabled").removeClass("next-disabled");
        this.$view.find("#courseName").children("td:first").find(".pre").addClass("pre-disabled");
        this.$view.find("#courseName").children("td:last").find(".next").addClass("next-disabled");
    },
    bindEvents: function () {
        var that = this;
        this.$tables = $("table");
        $("#compareView").children(".title").on("click", "span", function (e) {
            var id = e.delegateTarget.id.split("_")[0];
            if (!$("#"+id+"_content").hasClass("hidden")) {
                $(e.target).attr("class", "down");
                $(e.delegateTarget).children("a").html("[展开]");
                $("#"+id+"_content").addClass("hidden");
                $(e.delegateTarget).css("border-bottom", "1px solid #ccc");
            } else {
                $(e.target).attr("class", "up");
                $(e.delegateTarget).children("a").html("[收起]");
                $("#"+id+"_content").removeClass("hidden");
                $(e.delegateTarget).css("border-bottom", "");
            }
        });
        $("#compareView").children(".title").on("click", "a", function (e) {
            e.preventDefault();
            var id = e.delegateTarget.id.split("_")[0];
            if (!$("#"+id+"_content").hasClass("hidden")) {
                $(e.delegateTarget).children("span").attr("class", "down");
                $(e.target).html("[展开]");
                $("#"+id+"_content").addClass("hidden");
                $(e.delegateTarget).css("border-bottom", "1px solid #ccc");
            } else {
                $(e.delegateTarget).children("span").attr("class", "up");
                $(e.target).html("[收起]");
                $("#"+id+"_content").removeClass("hidden");
                $(e.delegateTarget).css("border-bottom", "");
            }
        });
        $("#courseName").children("td").on("click", "a", function (e) {
            e.preventDefault();
            var $e = $(e.target);
            if ($e.hasClass("delete")) {
                return;
            }
            var index = $("#courseName>td").index($(e.delegateTarget)), index2;


            if ($e.hasClass("pre")) {
                if ($e.hasClass("pre-disabled")) {
                    return;
                }
                index2 = index-1;
            } else if ($e.hasClass("next")) {
                if ($e.hasClass("next-disabled")) {
                    return;   
                }
                index2 = index+1;
            }
            that.swapRow(index, index2);

        });
        //highlight different
        $("#highlightBtn").on("click", function (e) {
            that.highlight();
        });
        //hide similar
        $("#hideBtn").on("click", function (e) {
            that.hideSame();
        });
    },
    swapRow: function (index1, index2) {
        this.$view.detach();
        if (index1 > index2) {
            var temp = index1;
            index1 = index2;
            index2 = temp;
        }
        var $rows = this.$view.find("tr");
        for (var i = 0; i < $rows.length; i++){
            var $td = $($rows[i]).find("td");
            $($td[index2]).after($($td[index1]).detach());
        }
        this.configMoveButton();
        this.$el.append(this.$view);
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
    // hideSame: function () {
    //     this.hided = !this.hided;
    //     if (this.hided) {
    //         $(".hidden").removeClass("hidden");
    //         return;
    //     }
    //     var i, count;
    //     var keys = this.items[0].keys(), len = this.obj.len;
    //     for ( count = 0; count < keys.lenght; count++) {
    //         for ( i = 0; i < len; i++ ) {
    //             if (this.items[i].get(keys[count]) !== this.items[(i+1)%len].get(keys[count])) {
    //                 $("."+keys[count]).addClass("hidden");
    //             }
    //         }
    //     }
    // },
    close: function () {
        if (!this.isClosed) {
            this.isClosed = true;
            this.$el.empty();
        }
    }
});