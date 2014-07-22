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
        _.bindAll(this, 'render', 'bindEvents', 'bindSearchEvents', 'renderCategories', 'renderLocations', 'close');
        // // $("#viewStyle").attr("href", "style/css/search.css");
        this.allMessages = new Courses();
        //define the template
        this.searchRepresentation = app.storage.getSearchRepresentationCache("course");
        this.srs = {};
        this.timeDesc = true;
        this.priceDesc = true;
        this.isClosed = true;
        this.filters = {};
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
            if (this.searchRepresentation.get("category")) {
                this.srs[this.searchRepresentation.get("category")] = this.searchRepresentation;
            }
            $("title").html("找课程 | " + this.searchRepresentation.toTitleString());
            this.$el.append(this.template);
            this.compareWidgetView = new CompareWidgetView();
            this.searchResultView = new SearchResultView(new Courses(), new Courses(), this.compareWidgetView);
            this.searchResultView.sr = this.searchRepresentation;
            app.generalManager.getCategories(this);
            app.generalManager.getLocations(this);
            this.bindEvents();
            this.currentPage = 0;
        }
    },
    renderCategories: function (categories) {
        if (!this.isClosed) {
            this.categories = categories;
            var data = categories.data, len = data.length, i, j, k, cbuf = [], scbuf = [], tcbuf = [], children1, children2, tc="";
            if (!this.searchRepresentation.get("categoryValue")) {
                this.searchRepresentation.set("categoryValue", data[0].value);
            }
            for ( i = 0; i < len; i++ ) {
                cbuf[i] = this.categoryTemplate({value:data[i].value, name:data[i].name});
                children1 = data[i].children || [];
                for ( j = 0; j < children1.length; j ++) { //level 2 and level 1 index
                    scbuf[j] = this.subCategoryTemplate({value:children1[j].value, name:children1[j].name});
                    children2 = children1[j].children;
                    if (children2) {
                        for (k = 0; k < children2.length; k++ ) { //level 3 and level 2 index
                            tcbuf[k] = this.subSubCategoryTemplate({value:children2[k].value, name:children2[k].name});
                        }
                        tc += this.subSubCategoryContainerTemplate({value:children1[j].value, entries:tcbuf.join("")});
                        tcbuf = [];
                    }
                }
                scbuf.push(tc);
                $("#search_subCategory").append(
                    this.subCategoryContainerTemplate({value:data[i].value, entries:scbuf.join("")})
                );
                scbuf = [];
            }
            $("#search_category").append(cbuf.join(""));
            this.showCategory(this.searchRepresentation.get("categoryValue"));
            this.bindSearchEvents();
            this.courseSearch();
        }
    },
    showCategory: function (categoryValue) {
        var count, value;
        for (count = 0; count < categoryValue.length; count+=2) {
            value = categoryValue.substr(count, 2);
            $("[data-value=" + value + "]").addClass("active").siblings().removeClass("active");
            $("[data-value=" + value + "]").children("[data-value=noreq]").addClass("active");
            $("[data-parentValue=" + value + "]").removeClass("hidden").siblings().addClass("hidden");
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
            var buf = [], i;
            // for (var prov in locations) {
            //     var city = locations[prov];
            //     for (var attr in city) {
            var districts = locations.data[0].children[0], district;
            for (i = 0; i < districts.length; i++) {
                buf[i] = this.subCategoryTemplate({value:districts[i].value, name:districts[i].name});
            }
            $("#search_district").append(buf.join(""));
            this.searchRepresentation.set("city", "南京");
            $dist = $("#search_district");
            if (this.searchRepresentation.get("district")) {
                $dist.find("span[data-id=noreq]").removeClass("active");
                $dist.find("span[data-id=" + this.searchRepresentation.get("district") + "]").addClass("active");
            } else {
                $dist.find("span[data-id=noreq]").addClass("active");
            }
        }
    },
    courseSearch: function () {
        this.searchResultView.sr = this.searchRepresentation;
        this.searchResultView.fetchAction(1);
    },

    bindEvents: function () {
        var that = this, $searchPanel = $("#searchPanel"), $searchReqs = $("#searchReqs");
        this.bindSortEvents();
        $("#filterPanel").children(".filterCriteria").on("click", "span", function (e) {
            that.filterResult($(e.delegateTarget), $(e.target));
        });
        this.scrollSensorOn = true;
        $(document).on("scroll", function () {
            var scroll = $(this).scrollTop(), srh = $searchReqs.hasClass("hidden") ? 0 : 46;

            if ($("#searchResultContent").height() > $("#searchWidgets").height()) {
                if (scroll > $searchPanel.height() +  srh + 100) {
                    $("#searchWidgets").addClass("stickyHeader");
                } else {
                    $("#searchWidgets").removeClass("stickyHeader");
                }
            } else {
                $("#searchWidgets").removeClass("stickyHeader");
            }
        });

        $searchReqs.on("click", "a", function (e) {
            e.preventDefault();
            var cri = $(e.target).data("cri");
            that.filterResult($("#filter_" + cri), "noreq");
        });

        $("#toTop").on("click", function (e) {
            e.preventDefault();
            $.smoothScroll({
                scrollTarget: "topBar"
            });
        });
    },
    bindSortEvents: function () {
        this.searchResultView.registerSortEvent($("#time"), "startDate", "timeDesc", this,
            function () {
                $("#price").html("价格");
                if (this.timeDesc) {
                    $("#time").html("时间↓");
                } else {
                    $("#time").html("时间↑");
                }
                this.timeDesc = !this.timeDesc;

                this.searchResultView.render();
            });
        this.searchResultView.registerSortEvent($("#price"), "price", "priceDesc", this,
            function () {
                $("#time").html("时间");
                if (this.priceDesc) {
                    $("#price").html("价格↓");
                } else {
                    $("#price").html("价格↑");
                }
                this.priceDesc = !this.priceDesc;
                this.searchResultView.render();
            });
        this.searchResultView.registerSortEvent($("#editorPick"), "popularity", true, this,
            function () {
                $("#time").html("时间");
                $("#price").html("价格");
                $("#editorPick").html("爱上课推荐");
                this.searchResultView.render();
            });
        this.searchResultView.registerFilterEvent($("input[name=cashback]"), this.cashbackFilter, this,
              function () {
                this.searchResultView.render();
            });

    },
    cashbackFilter: function (course) {
        var cashback = $("input[name=cashback]").prop("checked");
        return (course.get("cashback") > 0) || !cashback;
    },
    bindSearchEvents: function () {
        var that = this;
        $("#search_category").on("click", "li", function (e) {
            if ($(this).hasClass("active")) {
                return;
            }
            var dataId = $(e.target).data("value");
            if (that.srs[dataId]) {
                that.searchRepresentation = that.srs[dataId];
            } else {
                that.searchRepresentation = new CourseSearchRepresentation();
                that.searchRepresentation.set("category", dataId);
            }
            $(this).addClass("active").siblings().removeClass("active");
            $("#search_subCategory").children("div").addClass("hidden");
            var $scCont = $("#search_subCategory").children("div[data-parentValue=" + dataId + "]");
            $scCont.removeClass("hidden");
            if (that.searchRepresentation.get("subCategory")) {
                $scCont.find("span[data-value=" + that.searchRepresentation.get("subCategory") + "]").addClass("active");
                var $sscCont = $scCont.find("p[data-value=" + that.searchRepresentation.get("subCategory") + "]").removeClass("hidden");
                if (that.searchRepresentation.get("subSubCategory")) {
                    $sscCont.find("span[data-value=" + that.searchRepresentation.get("subSubCategory") + "]").addClass("active");
                }
            } else {
                $scCont.find("span[data-value=noreq]").addClass("active");
                $scCont.find("p").addClass("hidden");
            }
            $("#search_district").find(".active").removeClass("active");
            if (that.searchRepresentation.get("district")) {
                $("#search_district").find("span[data-value=" + that.searchRepresentation.get("district") + "]").addClass("active");
            } else {
                $("#search_district").find("span[data-value=noreq]").addClass("active");
            }
            that.srs[dataId] = that.searchRepresentation;
            that.courseSearch();
            $("title").html("找课程 | " + that.searchRepresentation.toTitleString());
        });
        $("#search_subCategory").on("click", ".subCategory", function (e) {
            var $this = $(this);
            if ($this.hasClass("active")) {
                return;
            }
            $this.siblings(".subCategory").removeClass("active");
            $(e.currentTarget).addClass("active");
            that.searchRepresentation.set("category", $("#search_category").find(".active").data("id"));
            var val = $this.data("id");
            if (val === "noreq") {
                that.searchRepresentation.set("subCategory", undefined);
                that.searchRepresentation.set("subSubCategory", undefined);
                $this.siblings("p").find(".active").removeClass("active");
            } else {
                that.searchRepresentation.set("subCategory", val);
                that.searchRepresentation.set("subSubCategory", undefined);
                $this.siblings("p").find(".active").removeClass("active");
            }
            $this.siblings("p").addClass("hidden");
            $this.siblings("[data-id=" + val + "]").removeClass("hidden");
            $this = null;
            that.courseSearch();
            $("title").html("找课程 | " + that.searchRepresentation.toTitleString());
        });
        $("#search_subCategory").on("click", ".subSubCategory", function (e) {
            if ($(e.currentTarget).hasClass("active")) {
                return;
            }
            $(this).siblings(".subSubCategory").removeClass("active");
            $(e.currentTarget).addClass("active");
            var val = $(this).data("id");
            if (val === "noreq") {
                that.searchRepresentation.set("subSubCategory", undefined);
            } else {
                that.searchRepresentation.set("subSubCategory", $(this).data("id"));
            }
            that.courseSearch();
            $("title").html("找课程 | " + that.searchRepresentation.toTitleString());
        });

        $("#search_district").on("click", "span", function (e) {
            if ($(e.currentTarget).hasClass("active")) {
                return;
            }
            $(e.currentTarget).siblings(".active").removeClass("active");
            $(e.currentTarget).addClass("active");
            var dataId = $(e.target).data("value");
            if (dataId === "noreq") {
                that.searchRepresentation.set("district", undefined);
                if (that.compareWidgetView.map) {
                    that.compareWidgetView.map.setCenter(that.searchRepresentation.get("city") + "市");
                    that.compareWidgetView.map.map.setZoom(9);
                }
            } else {
                that.searchRepresentation.set("district", dataId);
                if (that.compareWidgetView.map) {
                    that.compareWidgetView.map.setCenter(that.searchRepresentation.get("city") + "市" + dataId + "区");
                    that.compareWidgetView.map.map.setZoom(11);
                }
            }
            that.courseSearch();
            $("title").html("找课程 | " + that.searchRepresentation.toTitleString());
        });
    },
    filterResult: function ($filter, $target) {
        if ($target.hasClass("active")) {
            return;
        }
        $filter.find(".active").removeClass("active");
        $target.addClass("active");
        var criteria = $filter.attr("id").split("_")[1];
        $("a[data-cri=" + criteria + "]").remove();
        if (dataId !== "noreq" && $filter.attr("id").indexOf("filter") > -1) {
            $("#searchReqs").append(this.reqTemplate(
                {criteria: criteria, dataId: dataId, text: $("[data-id=" + dataId + "]").html()}
            ));
        }
        if ($("#searchReqs").find("a").length) {
            $("#searchReqs").removeClass("hidden");
        } else {
            $("#searchReqs").addClass("hidden");
        }
        if (criteria === "startTime") {
            var date = new Date();
            date.setDate(1);
            var month = date.getMonth();
            if (dataId === "thisMonth") {
                this.searchRepresentation.set("startDate", date);
            } else if (dataId === "nextMonth") {
                if (month === 11) {
                    date.setMonth(0);
                    date.setFullYear(date.getFullYear() + 1);
                } else {
                    date.setMonth(date.getMonth() + 1);
                }
                this.searchRepresentation.set("startDate", date);
            } else if (dataId === "twoMonthsAfter") {
                if (month >= 10) {
                    date.setMonth((date.getMonth() + 2) % 12);
                    date.setFullYear(date.getFullYear() + 1);
                } else {
                    date.setMonth(date.getMonth() + 2);
                }
                this.searchRepresentation.set("startDate", date);
            } else {
                this.searchRepresentation.set("startDate", undefined);
            }
        } else if (criteria === "price") {
            if (dataId === "noreq") {
                this.filters.price = null;
            } else {
                var priceRange = dataId.split("-");
                var minPrice = Utilities.toInt(priceRange[0]), maxPrice;
                if (priceRange.length === 1) {
                    maxPrice = undefined;
                } else {
                    maxPrice = Utilities.toInt(priceRange[1]);
                }
                this.filters.price = {
                    "minPrice": minPrice,
                    "maxPrice": maxPrice
                };
            }
        } else if (criteria === "classMode") {
            if (dataId === "noreq") {
                this.filters.classSize = null;
                this.searchRepresentation.set("startClassSize", undefined);
                this.searchRepresentation.set("finishClassSize", undefined);
            } else {
                var sizeRange = dataId.split("-");
                var minSize = Utilities.toInt(sizeRange[0]), maxSize;
                if (sizeRange.length === 1) {
                    maxSize = undefined;
                } else {
                    maxSize = Utilities.toInt(sizeRange[1]);
                }
                this.filters.classSize = {
                    "minSize": minSize,
                    "maxSize": maxSize
                };
                this.searchRepresentation.set("startClassSize", minSize);
                this.searchRepresentation.set("finishClassSize", maxSize);
            }
        } else if (criteria === "classTime") {
            if (dataId === "noreq") {
                this.filters.classTime = null;
                this.searchRepresentation.set("startClassTime", undefined);
                this.searchRepresentation.set("finishClassTime", undefined);
            } else {
                var time = dataId.split("_"), day;
                if (time.length === 2) {
                    day = time[1];
                }
                time = time[0];
                this.filters.classTime = {
                    "day" : day,
                    "time": time
                };
            }
        }
        this.courseSearch();
        this.renderSearchResults(messages, true);
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
            $("#search_subCategory").off();
            this.searchResultView = null;
            $(document).off("scroll");
            $("#searchReqs").off();
            this.$el.empty();
            this.isClosed = true;
            app.searchView = null;
        }
    }
});