var PartnerSearchView = Backbone.View.extend({
    el: '#content',
    categoryTemplate: _.template(tpl.get("category")),
    subCategoryTemplate: _.template(tpl.get("subCategory")),
    subSubCategoryTemplate: _.template(tpl.get("subSubCategory")),
    subSubCategoryContainerTemplate: _.template(tpl.get("subSubCategoryContainer")),

    subCategoryContainerTemplate: _.template(tpl.get("subCategoryContainer")),
    reqTemplate: _.template(tpl.get("req")),
    template: _.template(tpl.get('partnerSearch')),
    initialize: function (params) {
        _.bindAll(this, 'render', 'bindEvents', 'bindCatSearchEvents', 'renderCategories', 'renderLocations', 'renderCircle', 'close');
        //define the template

        this.timeDesc = true;
        this.priceDesc = true;
        this.isClosed = true;
        this.titleObj = {};

        this.searchRepresentation = app.storage.getSearchRepresentationCache("partner");
        //url路径中带有查询参数时 重置this.searchRepresentation(初始值为new CourseSearchRepresentation())
        if (params) {
            try {
                this.searchRepresentation = new CourseSearchRepresentation();
                this.searchRepresentation.castFromQuery(params.searchKey);
                //重新保存查询结果
                app.storage.setSearchRepresentationCache(this.searchRepresentation, true);
            } catch (e) {
                app.navigate("inst/search", {replace: true, trigger: false});
                this.searchRepresentation = new CourseSearchRepresentation();
            }
        }
        this.render();
        //injecting the template
    },
    render: function () {
        if (this.isClosed) {
            this.isClosed = false;
            app.viewRegistration.register(this);
            app.topBarView.activeNavigator('inst');
            // $("title").html("找课程 | " + this.searchRepresentation.toTitleString());//that will be too long
            this.$el.append(this.template);
            //异步加载目录和地址
            app.generalManager.getCategories(this);//传递this,会在获取目录之后调用this.renderCategories()
            app.generalManager.getLocations(this);//同上 调用this.renderLocations
            app.generalManager.getCircle(this);//同上
            //新建view时会调用一次fetchAction 则会进行一次数据渲染(传入课程搜索 传入对比组件)
            this.searchResultView = new PartnerSearchResultView(this.searchRepresentation, this.compareWidgetView);
            //初始化时同步url中的参数进行过滤
            this.syncFilters();
            this.syncSorter();
            var $searchReqs = $("#searchReqs");
            if ($searchReqs.find("a").length) {
                $searchReqs.removeClass("hidden");
            } else {
                $searchReqs.addClass("hidden");
            }
            this.bindEvents();
            document.title = "找机构?就上爱上课";
        }
    },
    /*加载课程类别*/
    renderCategories: function (categories) {
        if (!this.isClosed) {
            var data = categories.data,
                len = data.length,
                i, j, k,
                cbuf = [], scbuf = [], tcbuf = [],
                children1, children2,
                tc = "";
            if (!this.searchRepresentation.get("courseName") && !this.searchRepresentation.get("categoryValue")) {
                this.searchRepresentation.set("categoryValue", data[0].value);

            }
            //一级目录
            for (i = 0; i < len; i++) {
                cbuf[i] = this.categoryTemplate({value: data[i].value, name: data[i].name});
                children1 = data[i].children || [];
                //二级目录
                for (j = 0; j < children1.length; j++) { //level 2 and level 1 index
                    scbuf[j] = this.subCategoryTemplate({value: children1[j].value, name: children1[j].name});
                    children2 = children1[j].children;
                    if (children2) {
                        //三级目录
                        for (k = 0; k < children2.length; k++) { //level 3 and level 2 index
                            tcbuf[k] = this.subSubCategoryTemplate({value: children2[k].value, name: children2[k].name});
                        }
                        tc += this.subSubCategoryContainerTemplate({value: children1[j].value, entries: tcbuf.join("")});
                        tcbuf = [];
                    }
                }
                scbuf.push(tc);
                $("#filter_subCategory").append(
                    this.subCategoryContainerTemplate({value: data[i].value, entries: scbuf.join("")})
                );
                scbuf = [];
            }
            $("#search_category").append(cbuf.join(""));
            this.showCategory();
            this.bindCatSearchEvents();
        }
    },
    /*加载上课地点*/
    renderLocations: function (locations) {
        var self = this;
        //加载行政区/商圈//
        if (!this.isClosed) {
            var buf = [], chbuf = [], i, text, locationValue = this.searchRepresentation.get("locationValue");
            this.locations = locations;

            //加载行政区
            var districts = locations[0].children[0].children, district;
            for (i = 0; i < districts.length; i++) {
                chbuf[i] = this.subSubCategoryTemplate({value: districts[i].value, name: districts[i].name});
                var tt = this.subSubCategoryContainerTemplate({value: "location", entries: chbuf.join("")});
            }
            buf.push(tt);
            $("#filter_district").append(buf.join(""));
        }
    },
    /*加载商圈*/
    renderCircle: function (Circle) {
        var self = this;
        var bubuf = [], circle = Circle;
        for (i = 0; i < circle.length; i++) {
            bubuf[i] = this.subSubCategoryTemplate({value: circle[i].value, name: circle[i].name});
            var tb = this.subSubCategoryContainerTemplate({value: "circle", entries: bubuf.join("")});
        }
        $("#filter_district").append(tb);
        this.showLocation();
    },

    /*渲染地址*/
    showLocation: function () {
        var self = this;
        var locationValue = this.searchRepresentation.get("locationValue");
        var circleValue = this.searchRepresentation.get("circleValue");
        var $dist = $("#filter_district");
        this.titleObj.city = "南京";
        if (!locationValue && !circleValue) {
            $dist.find("span[data-value=noreq]").addClass("active");
        } /*else if (locationValue == "location" || circleValue == "circle") {
         $dist.find("span[data-value=noreq]").removeClass("active");
         //如果原本选择的是行政区
         if (locationValue == "location") {
         $dist.find("span[data-value=" + locationValue + "]").addClass("active");
         var text = $dist.find("span[data-value=" + locationValue + "]").html();
         $("#searchReqs").append(this.reqTemplate({criteria: "district", dataValue: locationValue, text: text}));
         $dist.find("p[data-parentvalue=" + locationValue + "]").removeClass("hidden");
         } else {//如果原本选择的是商圈
         $dist.find("span[data-value=" + circleValue + "]").addClass("active");
         var text = $dist.find("span[data-value=" + circleValue + "]").html();
         $("#searchReqs").append(this.reqTemplate({criteria: "district", dataValue: circleValue, text: text}));
         $dist.find("p[data-parentvalue=" + circleValue + "]").removeClass("hidden");
         }
         } */ else if (locationValue) {//如果原本选择的是行政区下的小标题
            $dist.find("span[data-value=noreq]").removeClass("active");
            $dist.find("span[data-value=" + locationValue + "]").addClass("active");
            $dist.find("p[data-parentvalue='location']").removeClass("hidden");
            var text = $dist.find("span[data-value=" + locationValue + "]").html();
            $("#searchReqs").append(this.reqTemplate({criteria: "district", dataValue: locationValue, text: text}));
        } else {//如果原本选择的是商圈下的小标题
            $dist.find("span[data-value=noreq]").removeClass("active");
            $dist.find("span[data-value=" + circleValue + "]").addClass("active");
            $dist.find("p[data-parentvalue='circle']").removeClass("hidden");
            var text = $dist.find("span[data-value=" + circleValue + "]").html();
            $("#searchReqs").append(this.reqTemplate({criteria: "district", dataValue: circleValue, text: text}));
        }

    },

    /*渲染选中的课程类别*/
    showCategory: function () {
        var text, count, value, categoryValue = this.searchRepresentation.get("categoryValue");
        if (!categoryValue) {
            return
        }
        $("#search_category").find("li[data-value=" + categoryValue.substr(0, 2) + "]").addClass("active").siblings("li").removeClass("active");
        $("#search_category").find("li:last").addClass("last");
        var $filter_sub = $("#filter_subCategory");
        var $searchReqs = $("#searchReqs");
        if (categoryValue.length === 2) {
            $filter_sub.find("[data-value=noreq]").addClass("active").siblings().removeClass("active");
            $filter_sub.find("p").addClass("hidden");
        }
        for (count = 0; count < categoryValue.length; count += 2) {
            value = categoryValue.substr(0, count + 2);
            $filter_sub.find("[data-parentvalue=" + value + "]").removeClass("hidden").siblings("p,div").addClass("hidden");
            if (categoryValue.length === 6 && count === 2) {
                $filter_sub.find("[data-value=" + value + "]").siblings().removeClass("active");
                continue;
            }
            $filter_sub.find("[data-value=" + value + "]").addClass("active").siblings().removeClass("active");
            $filter_sub.find("[data-value=" + value + "]").children("[data-value=noreq]").addClass("active");
        }
        $searchReqs.find("[data-cri=subCategory]").remove();
        if (categoryValue.length > 2) {
            text = $filter_sub.find("span[data-value=" + categoryValue + "]").html();
            $searchReqs.append(this.reqTemplate({criteria: "subCategory", dataValue: categoryValue, text: text}));
        }
    },

    /**
     * 过滤条件的同步
     * 课程名（用户从输入框输入） 是否返现
     * 同步条件的active状态以及在下方显示的搜索条件
     */
    syncFilters: function () {
        var courseName = this.searchRepresentation.get("courseName"),
            cashback = this.searchRepresentation.get("cashbackStart");
        var $searchReqs = $("#searchReqs");
        //用户输入的机构名
        if (courseName !== undefined) {
            $('#search_category').addClass('tab5').append('<li class="actived" data-value="search"><i class="clearSearch"></i><p>' + courseName + '</p></li>');
            $searchReqs.append(this.reqTemplate({criteria: "courseName", dataValue: '', text: courseName}));
            $("#filter_subCategory").addClass("hidden");
        }

        //todo 机构是否有课程参与团购
        if (cashback && cashback > 0) {
            $("input[name=cashback]").prop("checked", true);
        }
    },
    //同步排序条件
    syncSorter: function () {
        var order = this.searchRepresentation.get("order"), columnKey = this.searchRepresentation.get("columnKey");
        if (columnKey === "courseCount") {
            $("#courseCount").html("课程数").removeClass("active");
            $("#editorPick").removeClass("active");
            if (order === "asc") {
                this.teacherCountDesc = true;
                $("#teacherCount").html("教师数↑").addClass("active");
            } else {
                $("#teacherCount").html("教师数↓").addClass("active");
                this.teacherCountDesc = false;
            }
        } else if (columnKey === "teacherCount") {
            $("#teacherCount").html("教师数").removeClass("active");
            $("#editorPick").removeClass("active");
            if (order === "asc") {
                $("#courseCount").html("课程数↑").addClass("active");
                this.courseCountDesc = true;
            } else {
                $("#courseCount").html("课程数↓").addClass("active");
                this.courseCountDesc = false;
            }
        }
    },
    renderError: function (data) {
        if (!this.isClosed) {
            this.$resultp = this.$resultp || $("#searchResultDisplayPanel");
            this.$resultp.empty().append('<div class="no_data"><div>很抱歉，您的网络似乎不大好~~</div><p>请稍后再试</p></div>');
        }
    },

    //进行课程搜索 重新设置搜索条件 并且获取数据
    partnerSearch: function () {
        this.searchResultView.sr = this.searchRepresentation;
        //加载结果数据 param is pageIndex(using page 1)
        this.searchResultView.fetchAction(1);//每次搜索查询的时候重设为第一页
    },

    bindEvents: function () {
        var that = this, $searchPanel = $("#searchPanel"), $searchReqs = $("#searchReqs");
        this.bindSortEvents();
        //回车触发
        this.$el.on("keypress", function (e) {
            if (e.which === 13) {
                $(".search_btn").click();
            }
        });
        //顶部的按照课程名进行搜索
        this.$el.on('click', '.search_btn', function () {
            var courseName = $('.search_input').val();
            if (courseName) {
                var searchRepresentation = new CourseSearchRepresentation();
                searchRepresentation.set("courseName", courseName);
                app.navigate("inst/search/" + searchRepresentation.toQueryString(), true);
            }

        });
        //大家都在搜
        $(".search_tip").on("click", ".search_span", function () {
            var courseName = $(this).html();
            if (courseName) {
                var searchRepresentation = new CourseSearchRepresentation();
                searchRepresentation.set("courseName", courseName);
                app.navigate("inst/search/" + searchRepresentation.toQueryString(), true);
            }
        });

        /*具体筛选条件的点击事件*/
        $("#filterPanel").children(".filterCriteria").on("click", "span", function (e) {
            //parent node and child node as params
            that.filterResult($(e.delegateTarget), $(e.target));
        });
        $(document).on("scroll", function () {
            var scroll = $(this).scrollTop(), srh = $searchReqs.hasClass("hidden") ? 0 : 46;
            $searchWidgets = $("#searchWidgets");
            $searchAll = $(".searchAll");
            if ($("#searchResultContent").height() > $searchWidgets.height()) {
                if (scroll > $searchPanel.height() + srh + 130 + $searchAll.height()) {
                    $searchWidgets.addClass("stickyHeader");
                } else {
                    $searchWidgets.removeClass("stickyHeader");
                }
            } else {
                $searchWidgets.removeClass("stickyHeader");
            }
//            if(scroll > $searchWidgets.offset().top){
//                $searchWidgets.addClass("stickyHeader");
//            }else{
//                $searchWidgets.removeClass("stickyHeader");
//            }
        });
        /*已选择的查询条件中的删除事件 相当于点击不限的情况 这需要将courseName单独处理*/
        $searchReqs.on("click", "a", function (e) {
            e.preventDefault();
            var cri = $(e.target).data("cri");
            if (cri == 'courseName') {
                //todo 去除课程名的搜索
                //移除第5个标签 清空搜索input框 移除满足的条件
                that.clearCourseNameSearch();
                return;
            }
            var $filterCri = $("#filter_" + cri);
            that.filterResult($filterCri, $filterCri.find("[data-value=noreq]").removeClass("active"));
            $filterCri.find("p").addClass("hidden");
            $("#search_category").find("li:last").addClass("last");
        });

        var $filter_district = $("#filter_district");
        //行政区和商圈
        $filter_district.on("click", '.subCategory', function () {
            var v = $(this).attr("data-value");
            var index;
            if (v == "location") {
                $filter_district.find("span").removeClass("active");
                $filter_district.find(".span").removeClass("active");
                $(this).addClass("active");
                index = 0;
            } else if (v == "circle") {
                $filter_district.find("span").removeClass("active");
                $filter_district.find(".span").removeClass("active");
                $(this).addClass("active");
                index = 1;
            }
            $filter_district.find("p").addClass("hidden");
            $filter_district.find("p:eq(" + index + ")").removeClass("hidden");
        });
        $filter_district.find("span[data-value=noreq]").on("click", function () {
            $("#filter_district").find("p").addClass("hidden");
        });
    },
    /**
     * 绑定进行过滤的事件
     */
    bindSortEvents: function () {
        var that = this;
        this.$el.on("click", '#teacherCount', function () {
            that.teacherCountDesc = !that.teacherCountDesc;
            $("#courseCount").html("课程数").removeClass("active");
            $("#editorPick").removeClass("active");
            if (that.teacherCountDesc) {
                $(this).html("教师数↓").addClass("active");
            } else {
                $(this).html("教师数↑").addClass("active");
            }
            that.searchRepresentation.set("columnKey", "teacherCount");
            that.searchRepresentation.set("order", that.teacherCountDesc ? "desc" : "asc");
            that.partnerSearch();
        });
        this.$el.on("click", '#courseCount', function () {
            that.courseCountDesc = !that.courseCountDesc;
            $("#teacherCount").html("教师数").removeClass("active");
            $("#editorPick").removeClass("active");
            if (that.courseCountDesc) {
                $(this).html("课程数↓").addClass("active");
            } else {
                $(this).html("课程数↑").addClass("active");
            }
            that.searchRepresentation.set("columnKey", "courseCount");
            that.searchRepresentation.set("order", that.courseCountDesc ? "desc" : "asc");
            that.partnerSearch();

        });
        //点击爱上课推荐进行数据的重新获取
        $("#editorPick").on("click", function () {
            $("#courseCount").html("课程数").removeClass("active");
            $("#teacherCount").html("教师数").removeClass("active");
            $(this).html("爱上课推荐").addClass("active");
            that.searchRepresentation.set("columnKey", undefined);
            that.searchRepresentation.set("order", undefined);
            that.partnerSearch();
        });
        //todo 机构是否有参与团购的课程
        $("input[name=originalPriceStart]").on("change", function () {
            if ($(this).prop("checked")) {
                that.searchRepresentation.set("originalPriceStart", 1);
            } else {
                that.searchRepresentation.set("originalPriceStart", undefined);
            }
            that.partnerSearch();
        });
    },
    /**
     * 绑定一级目录的点击事件和右边的搜索条件（用户从输入框输入的）清除的点击事件
     */
    bindCatSearchEvents: function () {
        var that = this;
        /*一级目录的点击事件 data-value为两位数字*/
        $("#search_category").on("click", "li", function (e) {
            $("#filter_subCategory").removeClass("hidden");
            if ($(this).hasClass("active")) {
                return;
            }
            var dataId = $(e.target).data("value"), cv;
            //如果是最右侧的用户搜索文字 阻止事件冒泡（改变active状态）
            if (dataId == 'search') {
                e.stopPropagation();
                return
            }
            that.searchRepresentation.set("categoryValue", dataId);
            that.showCategory(that.searchRepresentation.get("categoryValue"));
            that.partnerSearch();
        });
        $("#search_category").on("click", ".clearSearch", function (e) {
            that.clearCourseNameSearch();
        });
    },
    clearCourseNameSearch: function () {
        var $searchReqs = $("#searchReqs");
        var that = this;
        $("a[data-cri=courseName]").remove();
        if ($searchReqs.find("a").length) {
            $searchReqs.removeClass("hidden");
        } else {
            $searchReqs.addClass("hidden");
        }
        that.searchRepresentation.set("courseName", undefined);

        $('#search_category').removeClass('tab5').find('.actived').remove();
        that.$el.find('input.search_input').val('');
        $("#search_category").find("li:last").addClass("last");
        that.partnerSearch();
        //todo 有问题
        that.showCategory();
        app.navigate("inst/search/" + "categoryValue=00", true);
    },
    /*处理筛选事件(上课时间 课程费用等)*/
    filterResult: function ($filter, $target) {
        if ($target.hasClass("active")) {
            return;
        }
        var $searchReqs = $("#searchReqs");
        $("#resultNum").html('...');
        $filter.find(".active").removeClass("active");
        $target.addClass("active");
        var criteria = $filter.attr("id").split("_")[1], dataValue; //提取过滤类型 如'filter_classMode' to 'classMode'
        $("a[data-cri=" + criteria + "]").remove();
        dataValue = $target.data("value");
        if (dataValue !== "noreq") {
            //显示当前结果的过滤条件
            $searchReqs.append(this.reqTemplate(
                {criteria: criteria, dataValue: dataValue, text: $filter.find("[data-value=" + dataValue + "]").html()}
            ));
        }

        if ($searchReqs.find("a").length) {
            $searchReqs.removeClass("hidden");
        } else {
            $searchReqs.addClass("hidden");
        }
        if (criteria === "subCategory") {
            if (dataValue === "noreq") {
                this.searchRepresentation.set("categoryValue", $target.parent().data("parentvalue"));
            } else {
                this.searchRepresentation.set("categoryValue", dataValue);
            }
            $target.siblings("p").addClass("hidden");
            $target.siblings("[data-parentvalue=" + dataValue + "]").removeClass("hidden");
            $target = null;
        } else if (criteria === "district") {
            dataValue = $target.data("value");
            if (dataValue === "noreq") {
                this.searchRepresentation.set("locationValue", undefined);
                this.searchRepresentation.set("circleValue", undefined);
            } else if (dataValue === "location") {//判断是不是行政区
                this.searchRepresentation.set("locationValue", $target.data("value"));
                this.searchRepresentation.set("circleValue", undefined);
                this.titleObj.district = $target.html();
            } else if (dataValue === "circle") {//判断是不是商圈
                this.searchRepresentation.set("circleValue", $target.data("value"));
                this.searchRepresentation.set("locationValue", undefined);
                this.titleObj.district = $target.html();
            } else {
                //判断是商圈下的还是行政区
                if ($target.parent().data("parentvalue") === "location") {
                    this.searchRepresentation.set("locationValue", dataValue);
                    this.searchRepresentation.set("circleValue", undefined);
                } else {
                    this.searchRepresentation.set("circleValue", dataValue);
                    this.searchRepresentation.set("locationValue", undefined);
                }
            }
        }
        this.partnerSearch();
    },
    close: function () {
        if (!this.isClosed) {
            //removing all event handlers
            if (this.compareWidgetView) {
                this.compareWidgetView.close();
            }
            this.compareWidgetView = null;
            if (this.searchResultView) {
                this.searchResultView.close();
            }
            $("#filterPanel").children(".filterCriteria").off();
            $("#search_category").off();
            $("#search_subCategory").off();
            $("#filter_subCategory").off();
            this.searchResultView = null;
            $(document).off("scroll");
            $("#searchReqs").off();
            this.$el.empty();
            this.isClosed = true;
            app.partnerSearchView = null;
            app.topBarView.clearNavigator();
        }
    }
});