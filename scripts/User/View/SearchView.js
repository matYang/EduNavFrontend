var SearchView = Backbone.View.extend({
    el: '#content',
    categoryTemplate: _.template(tpl.get("category")),
    subCategoryTemplate: _.template(tpl.get("subCategory")),
    subSubCategoryTemplate: _.template(tpl.get("subSubCategory")),
    subSubCategoryContainerTemplate: _.template(tpl.get("subSubCategoryContainer")),

    subCategoryContainerTemplate: _.template(tpl.get("subCategoryContainer")),
    reqTemplate: _.template(tpl.get("req")),
    template: _.template(tpl.get('search')),
    initialize: function (params) {
        _.bindAll(this, 'render', 'bindEvents', 'bindCatSearchEvents', 'renderCategories', 'renderLocations', 'close');
        // // $("#viewStyle").attr("href", "style/css/search.css");
        this.allMessages = new Courses();
        //define the template
        this.searchRepresentation = app.storage.getSearchRepresentationCache("course");
        this.categoryValue = {};
        this.timeDesc = true;
        this.priceDesc = true;
        this.isClosed = true;
        this.titleObjs = [];
        this.titleObj = {};
        this.render(params);
        //injecting the template
    },
    render: function (params) {
        if (this.isClosed) {
            this.isClosed = false;
            app.viewRegistration.register(this);
            if (params) {
                try {
                    this.searchRepresentation = new CourseSearchRepresentation();
                    this.searchRepresentation.castFromQuery(params.searchKey);
                    app.storage.setSearchRepresentationCache(this.searchRepresentation, true);
                } catch (e) {
                    app.navigate("search", {replace: true, trigger: false});
                    this.searchRepresentation = new CourseSearchRepresentation();
                }
            }
            if (this.searchRepresentation.get("categoryValue")) {
                this.categoryValue[this.searchRepresentation.get("categoryValue").substr(0, 2)] = this.searchRepresentation;
            }
            // $("title").html("找课程 | " + this.searchRepresentation.toTitleString());//that will be too long
            this.$el.append(this.template);
            this.compareWidgetView = new CompareWidgetView();
            this.searchResultView = new SearchResultView(new Courses(), new Courses(), this.compareWidgetView);
            this.searchResultView.sr = this.searchRepresentation;
            app.generalManager.getCategories(this);
            app.generalManager.getLocations(this);
            //初始化时同步url中的参数进行过滤
            this.syncFilters();
            this.syncSorter();
            this.bindEvents();
            this.currentPage = 0;
            document.title = "找课程";
        }
    },
    renderCategories: function (categories) {
        if (!this.isClosed) {
            this.categories = categories;
            var data = categories.data,
                len = data.length,
                i, j, k,
                cbuf = [], scbuf = [], tcbuf = [],
                children1, children2,
                tc = "";
            if (!this.searchRepresentation.get("categoryValue")) {
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
            this.courseSearch();
        }
    },
    showCategory: function () {
        var text, count, value, categoryValue = this.searchRepresentation.get("categoryValue");
        $("#search_category").find("li[data-value=" + categoryValue.substr(0, 2) + "]").addClass("active").siblings("li").removeClass("active");
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
    //过滤 上课地点
    syncLocation: function () {
        var locationValue = this.searchRepresentation.get("locationValue");
        if (locationValue) {
            $("#filter_district").find("span[data-value=" + locationValue + "]").addClass("active").siblings().removeClass("active");
        } else {
            $("#filter_district").find("span[data-value=noreq]").addClass("active").siblings().removeClass("active");
        }
    },
    //过滤 开课日期 上课时间（开始和结束） 班级类型 课程费用（开始和结束） 是否返现
    syncFilters: function () {
        var startPrice = this.searchRepresentation.get("priceStart"),
            priceEnd = this.searchRepresentation.get("priceEnd"),
            classType = this.searchRepresentation.get("classType"),
            startDateStart = this.searchRepresentation.get("startDateStart"),
            startDateEnd = this.searchRepresentation.get("startDateEnd"),
            cashback = this.searchRepresentation.get("startCashback"),
            value, text;
        var $searchReqs = $("#searchReqs");
        if (startPrice !== undefined) {
            value = startPrice + "-";
            if (priceEnd !== undefined) {
                value += priceEnd;
            }
            var $filter_price = $("#filter_price");
            text = $filter_price.find("span[data-value=" + value + "]").html();
            $filter_price.find("span[data-value=" + value + "]").addClass("active").siblings("span").removeClass("active");
            $searchReqs.append(this.reqTemplate({criteria: "price", dataValue: value, text: text}));
        }
        if (classType !== undefined) {
            value = classType;
            var $filter_classMode = $("#filter_classMode");
            text = $filter_classMode.find("span[data-value=" + value + "]").html();
            $filter_classMode.find("span[data-value=" + value + "]").addClass("active").siblings("span").removeClass("active");
            $searchReqs.append(this.reqTemplate({criteria: "classMode", dataValue: value, text: text}));
        }
        if (startDateEnd !== undefined) {
            var date = new Date(), month = startDateEnd.getMonth() - date.getMonth();
            switch (month) {
                case 0:
                    value = "thisMonth";
                    break;
                case 1:
                    value = "nextMonth";
                    break;
                case 2:
                    value = "twoMonthsAfter";
                    break;
            }
            var $filter_startTime = $("#filter_startTime");
            text = $filter_startTime.find("span[data-value=" + value + "]").html();
            $filter_startTime.find("span[data-value=" + value + "]").addClass("active").siblings("span").removeClass("active");
            $searchReqs.append(this.reqTemplate({criteria: "startTime", dataValue: value, text: text}));
        }
        if (cashback && cashback > 0) {
            $("input[name=cashback]").prop("checked", true);
        }
    },
    syncSorter: function () {
        var order = this.searchRepresentation.get("order"), sortBy = this.searchRepresentation.get("sortBy");
        if (sortBy === "startDate") {
            $("#price").html("价格").removeClass("active");
            $("#editorPick").removeClass("active");
            if (order === "ASCE") {
                this.timeDesc = true;
                $("#time").html("时间↑").addClass("active");
            } else {
                $("#time").html("时间↓").addClass("active");
                this.timeDesc = false;
            }
        } else if (sortBy === "price") {
            $("#time").html("时间").removeClass("active");
            $("#editorPick").removeClass("active");
            if (order === "ASCE") {
                $("#price").html("价格↑").addClass("active");
                this.priceDesc = true;
            } else {
                $("#price").html("价格↓").addClass("active");
                this.priceDesc = false;
            }
        }
    },
    renderError: function (data) {
        if (!this.isClosed) {
            this.$resultp = this.$resultp || $("#searchResultDisplayPanel");
            this.$resultp.empty().append('<div class="no_data"><div>很抱歉，您的网络似乎不大好~~</div><p>请稍后再试</p></div>');
        }
    },
    renderLocations: function (locations) {
        if (!this.isClosed) {
            var buf = [], i, text, locationValue = this.searchRepresentation.get("locationValue");
            this.locations = locations;
            // for (var prov in locations) {
            //     var city = locations[prov];
            //     for (var attr in city) {
            var districts = locations.data[0].children[0].children, district;
            for (i = 0; i < districts.length; i++) {
                buf[i] = this.subCategoryTemplate({value: districts[i].value, name: districts[i].name});
            }
            $dist = $("#filter_district");
            $dist.append(buf.join(""));
            this.titleObj.city = "南京";
            if (locationValue) {
                $dist.find("span[data-value=noreq]").removeClass("active");
                $dist.find("span[data-value=" + this.searchRepresentation.get("locationValue") + "]").addClass("active");
                text = $("#filter_district").find("span[data-value=" + locationValue + "]").html();
                $("#searchReqs").append(this.reqTemplate({criteria: "district", dataValue: locationValue, text: text}));
            } else {
                $dist.find("span[data-value=noreq]").addClass("active");
            }
        }
    },
    courseSearch: function () {
        this.searchResultView.sr = this.searchRepresentation;
        //todo 加载结果数据 param is pageIndex(using page 1)
        this.searchResultView.fetchAction(1);//每次搜索查询的时候重设为第一页
    },

    bindEvents: function () {
        var that = this, $searchPanel = $("#searchPanel"), $searchReqs = $("#searchReqs");
        this.bindSortEvents();

        /*具体筛选条件的点击事件*/
        $("#filterPanel").children(".filterCriteria").on("click", "span", function (e) {
            //parent node and child node as params
            that.filterResult($(e.delegateTarget), $(e.target));
        });
        this.scrollSensorOn = true;
        $(document).on("scroll", function () {
            var scroll = $(this).scrollTop(), srh = $searchReqs.hasClass("hidden") ? 0 : 46;
            $searchWidgets = $("#searchWidgets");
            if ($("#searchResultContent").height() > $searchWidgets.height()) {
                if (scroll > $searchPanel.height() + srh + 100) {
                    $searchWidgets.addClass("stickyHeader");
                } else {
                    $searchWidgets.removeClass("stickyHeader");
                }
            } else {
                $searchWidgets.removeClass("stickyHeader");
            }
        });

        $searchReqs.on("click", "a", function (e) {
            e.preventDefault();
            var cri = $(e.target).data("cri");
            that.filterResult($("#filter_" + cri), $("#filter_" + cri).find("[data-value=noreq]").removeClass("active"));
        });

        $("#toTop").on("click", function (e) {
            e.preventDefault();
            $.smoothScroll({
                scrollTarget: "topBar"
            });
        });
    },
    bindSortEvents: function () {
        var that = this;
        $("#time").on("click", function () {
            $("#price").html("价格").removeClass("active");
            $("#editorPick").removeClass("active");
            if (that.timeDesc) {
                $(this).html("时间↓").addClass("active");
            } else {
                $(this).html("时间↑").addClass("active");
            }
            that.searchRepresentation.set("sortBy", "startDate");
            that.searchRepresentation.set("order", that.timeDesc ? "DESC" : "ASCE");
            that.timeDesc = !that.timeDesc;
            that.courseSearch();
        });
        $("#price").on("click", function () {
            $("#time").html("时间").removeClass("active");
            $("#editorPick").removeClass("active");
            if (that.priceDesc) {
                $(this).html("价格↓").addClass("active");
            } else {
                $(this).html("价格↑").addClass("active");
            }
            that.searchRepresentation.set("sortBy", "price");
            that.searchRepresentation.set("order", that.priceDesc ? "DESC" : "ASCE");
            that.priceDesc = !that.priceDesc;
            that.courseSearch();

        });
        $("#editorPick").on("click", function () {
            $("#time").html("时间").removeClass("active");
            $("#price").html("价格").removeClass("active");
            $(this).html("爱上课推荐").addClass("active");
            that.searchRepresentation.set("sortBy", undefined);
            that.searchRepresentation.set("order", undefined);
            this.courseSearch();
        });

        $("input[name=cashback]").on("change", function () {
            if ($(this).prop("checked")) {
                that.searchRepresentation.set("startCashback", 1);
            } else {
                that.searchRepresentation.set("startCashback", undefined);
            }
            that.courseSearch();
        });
    },
    cashbackFilter: function (course) {
        var cashback = $("input[name=cashback]").prop("checked");
        return (course.get("cashback") > 0) || !cashback;
    },
    bindCatSearchEvents: function () {
        var that = this;
        /*一级目录的点击事件 data-value为两位数字*/
        $("#search_category").on("click", "li", function (e) {
            if ($(this).hasClass("active")) {
                return;
            }
            var dataId = $(e.target).data("value"), cv;
            that.categoryValue[that.searchRepresentation.get("categoryValue").substr(0, 2)] = that.searchRepresentation.get("categoryValue");
            if (that.categoryValue[dataId]) {
                that.searchRepresentation.set("categoryValue", that.categoryValue[dataId]);
            } else {
                that.searchRepresentation.set("categoryValue", dataId);
            }
            that.showCategory(that.searchRepresentation.get("categoryValue"));
            that.courseSearch();

        });
    },
    /*处理筛选事件(上课时间 课程费用等)*/
    filterResult: function ($filter, $target) {
        if ($target.hasClass("active")) {
            return;
        }
        $filter.find(".active").removeClass("active");
        $target.addClass("active");
        var criteria = $filter.attr("id").split("_")[1], dataValue; //提取过滤类型 如'filter_classMode' to 'classMode'
        $("a[data-cri=" + criteria + "]").remove();
        dataValue = $target.data("value");
        if (dataValue !== "noreq") {
            //显示当前结果的过滤条件
            $("#searchReqs").append(this.reqTemplate(
                {criteria: criteria, dataValue: dataValue, text: $filter.find("[data-value=" + dataValue + "]").html()}
            ));
        }

        var $searchReqs = $("#searchReqs");
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
                if (this.compareWidgetView.map) {
                    this.compareWidgetView.map.setCenter(this.locations.data[0].name);
                    this.compareWidgetView.map.map.setZoom(9);
                }
            } else {
                this.searchRepresentation.set("locationValue", $target.data("value"));
                this.titleObj.district = $target.html();
                if (this.compareWidgetView.map) {
                    this.compareWidgetView.map.setCenter($target.html());
                    this.compareWidgetView.map.map.setZoom(11);
                }
            }
        }
        //上课时间 start end
        else if (criteria === "startTime") {
            var now = new Date();
            var date1 = new Date(Date.parse([now.getFullYear(),now.getMonth(),now.getDate()].join('-')));
            var date2;
            var month = date1.getMonth();
            //设置当月的时间
            if (dataValue === "thisMonth") {
                date2 = new Date(date1);
                if (month === 11) {
                    date2.setMonth(0);
                    date2.setFullYear(date1.getFullYear() + 1);
                } else {
                    date2.setMonth(date1.getMonth() + 1);
                }
            }
            //设置下个月的时间
            else if (dataValue === "nextMonth") {
                if (month === 11) {
                    date1.setMonth(0);
                    date1.setFullYear(date1.getFullYear() + 1);
                    date2 = new Date(date1);
                    date2.setMonth(date2.getMonth() + 1);
                } else {
                    date1.setMonth(date1.getMonth() + 1);
                    date2 = new Date(date1);
                    if (month === 10) {
                        date2.setMonth(0);
                        date2.setFullYear(date2.getFullYear() + 1);
                    } else {
                        date2.setMonth(date2.getMonth() + 1);
                    }

                }
            } else if (dataValue === "twoMonthsAfter") {
                if (month >= 10) {
                    date1.setMonth((date1.getMonth() + 2) % 12);
                    date1.setFullYear(date1.getFullYear() + 1);
                    date2 = new Date(date1);
                    date2.setMonth(date2.getMonth() + 1);
                } else {
                    date1.setMonth(date1.getMonth() + 2);
                    date2 = new Date(date1);
                    if (month === 10) {
                        date2.setMonth(0);
                        date2.setFullYear(date2.getFullYear() + 1);
                    } else {
                        date2.setMonth(date2.getMonth() + 1);
                    }
                }
            } else {
                date1 = undefined;
                date2 = undefined;
            }
            this.searchRepresentation.set("startDateStart", date1);
            this.searchRepresentation.set("startDateEnd", date2);
        }
        else if (criteria === "price") {
            if (dataValue === "noreq") {
                this.searchRepresentation.set("priceStart", undefined);
                this.searchRepresentation.set("priceEnd", undefined);
            } else {
                var priceRange = dataValue.split("-");
                var minPrice = Utilities.toInt(priceRange[0]), maxPrice;
                if (priceRange.length === 1) {
                    maxPrice = undefined;
                } else {
                    maxPrice = Utilities.toInt(priceRange[1]);
                }
                this.searchRepresentation.set("priceStart", minPrice);
                this.searchRepresentation.set("priceEnd", isNaN(maxPrice) ? undefined : maxPrice);
            }
        } else if (criteria === "classMode") {
            if (dataValue === "noreq") {
                this.searchRepresentation.set("classType", undefined);
            } else {
                this.searchRepresentation.set("classType", dataValue);
            }
        }
        //上课时间 平时或者周末的上午 下午 晚上
        else if (criteria === "schoolTime") {
            var week, day;
            if (dataValue === "noreq") {
                week = day = undefined;
            } else {
                var rs = dataValue.split("-");
                week = rs[0] === '' ? undefined : rs[0];
                day = rs[1] === '' ? undefined : rs[1];
            }
            this.searchRepresentation.set("schoolTimeWeek", undefined);
            this.searchRepresentation.set("schoolTimeDay", undefined);
        }
        this.courseSearch();
        //this.searchRepresentation.set(criteria, dataId);
        //todo
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
            app.searchView = null;
        }
    }
});