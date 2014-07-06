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
        _.bindAll(this, 'render', 'renderSearchResults', 'courseSearch', 'bindEvents', 'bindSearchEvents', 'renderCategories', 'renderLocations', 'filterResult', 'close');
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
                    app.storage.setSearchRepresentationCache(this.searchRepresentation);
                } catch (e) {
                    app.navigate("search", {replace: true, trigger: false});
                    this.searchRepresentation = new CourseSearchRepresentation();
                }
            }
            if (this.searchRepresentation.get("category")) {
                this.srs[this.searchRepresentation.get("category")] = this.searchRepresentation;
            }
            this.$el.append(this.template);
            this.compareWidgetView = new CompareWidgetView();
            this.searchResultView = new SearchResultView(new Courses(), new Courses(), this.compareWidgetView);
            app.generalManager.getCategories(this);
            app.generalManager.getLocations(this);
            this.bindEvents();
            this.currentPage = 0;
        }
    },

    renderSearchResults: function (searchResults, byFilter) {
        if (!this.isClosed) {
            //prevent memory leaks
            $("#searchResultDisplayPanel").empty();
            if (this.compareWidgetView.map) {
                this.compareWidgetView.map.removeAllMarkers();
            }
            searchResults = searchResults || new Courses();
            if (!byFilter) {
                this.allMessages = searchResults;
            }
            this.searchResultView.allMessages.reset(this.allMessages.toArray());
            if (byFilter) {
                this.searchResultView.messages.reset(searchResults.toArray());
            } else {
                searchResults = this.filter();
                this.searchResultView.messages.reset(searchResults.toArray());
            }
            $("#resultNum").html(searchResults.length);
            for (i = 0; i < searchResults.length; i++) {
                if (this.compareWidgetView.map) {
                    this.compareWidgetView.map.getLatLng(searchResults.at(i).get("location"), searchResults.at(i).get("instName"));
                }
            }
            this.searchResultView.startIndex = 0;
            this.searchResultView.currentPage = 1;
            this.searchResultView.render();
        }
    },
    renderCategories: function (categories) {
        if (!this.isClosed) {
            this.categories = categories;
            var  cbuf = [], scbuf = [], tcbuf = [], tc = "", key, attr, index, index2, bot, type, index3, obj, $subCat, $subsubCat, $dist;

            this.categoryList = [];
            for (key in categories ) { //level 1
                if (typeof key === "string") {
                    if (key !== "index") {
                        obj = categories[key];
                        index = categories[key].index;
                        cbuf[index] = this.categoryTemplate({dataId:key, text:key});
                        if (index === 0 && !this.searchRepresentation.get("category")) {
                            this.searchRepresentation.set("category", key);
                        }
                        for (attr in obj ) { //level 2 and level 1 index
                            if (attr !== "index") {
                                index2 = obj[attr].index;
                                scbuf[index2] = this.subCategoryTemplate({dataId:attr, text:attr});
                                bot = obj[attr];
                                if (bot) {
                                    for (type in bot ) { //level 3 and level 2 index
                                        if (type !== "index") {
                                            index3 = bot[type].index;
                                            tcbuf[index3] = this.subSubCategoryTemplate({dataId:type, text:type});
                                        }
                                    }
                                    tc += this.subSubCategoryContainerTemplate({dataId:attr, entries:tcbuf.join("")});
                                    tcbuf = [];
                                }
                            }
                        }
                            
                        scbuf.push(tc);
                        $("#search_subCategory").append(
                            this.subCategoryContainerTemplate({dataId:key, entries:scbuf.join("")})
                        );
                        scbuf = [];
                    }
                }
            }
            $("#search_category").append(cbuf.join(""));
            $("#search_category").find("li[data-id=" + this.searchRepresentation.get("category") + "]").addClass("active");
            $("#search_subCategory").find("div[data-id=" + this.searchRepresentation.get("category") + "]").removeClass("hidden");
            $subCat = $("div[data-id=" + this.searchRepresentation.get("category") + "]");
            if (this.searchRepresentation.get("subCategory")) {
                $subCat.find("span[data-id=noreq]").removeClass("active");
                $subCat.find("span[data-id=" + this.searchRepresentation.get("subCategory") + "]").addClass("active");
                $subsubCat = $subCat.find("p[data-id=" + this.searchRepresentation.get("subCategory") + "]").removeClass("hidden");
                if (this.searchRepresentation.get("subSubCategory")) {
                    $subsubCat.find("span[data-id=" + this.searchRepresentation.get("subSubCategory") + "]").addClass("active");
                } else {
                    $subsubCat.find("span[data-id=req]").addClass("active");
                }
            } else {
                $subCat.find("span[data-id=noreq]").addClass("active");
            }
            $dist = $("#search_district");
            if (this.searchRepresentation.get("district")) {
                $dist.find("span[data-id=noreq]").removeClass("active");
                $dist.find("span[data-id=" + this.searchRepresentation.get("district") + "]").addClass("active");
            } else {
                $dist.find("span[data-id=noreq]").addClass("active");
            }
            $subCat = null;
            $subsubCat = null;
            this.bindSearchEvents();
            this.courseSearch();
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
            var buf = [], key;
            // for (var prov in locations) {
            //     var city = locations[prov];
            //     for (var attr in city) {
            for (key in locations["江苏"]["南京"]) {
                if (key !== "index") {
                    buf[locations["江苏"]["南京"][key].index] = this.subCategoryTemplate({dataId:key, text:key});
                }
            }
            //     }
            // }
            $("#search_district").append(buf.join(""));
            if (this.searchRepresentation.get("district")) {
                $("#filter_district").find("span[data-id=" + this.searchRepresentation.get("district") + "]").trigger("click");
            }
        }
    },
    courseSearch: function () {
        app.navigate("search/" + this.searchRepresentation.toQueryString(), {trigger: false, replace: true});
        $("#searchResultDisplayPanel").empty().append('<div class="loading"></div>');
        $("#courseSearchResultNavigator").empty();
        app.generalManager.findCourse(this.searchRepresentation, {
            "success": this.renderSearchResults,
            "error": this.renderError
        });
        app.storage.setSearchRepresentationCache(this.searchRepresentation, "course");
    },

    bindEvents: function () {
        var that = this, $searchPanel = $("#searchPanel"), $searchReqs = $("#searchReqs");
        this.bindSortEvents();
        $("#filterPanel").children(".filterCriteria").on("click", "span", function (e) {
            that.filterResult($(e.delegateTarget), $(e.target).data("id"));
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
            var dataId = $(e.target).data("id");
            if (that.srs[dataId]) {
                that.searchRepresentation = that.srs[dataId];
            } else {
                that.searchRepresentation = new CourseSearchRepresentation();
                that.searchRepresentation.set("category", dataId);
            }
            $(e.delegateTarget).children(".active").removeClass("active");
            $(this).addClass("active");
            $("#search_subCategory").children("div").addClass("hidden");
            var $scCont = $("#search_subCategory").children("div[data-id=" + dataId + "]");
            $scCont.removeClass("hidden");
            if (that.searchRepresentation.get("subCategory")) {
                $scCont.find("span[data-id=" + that.searchRepresentation.get("subCategory") + "]").addClass("active");
                var $sscCont = $scCont.find("p[data-id=" + that.searchRepresentation.get("subCategory") + "]").removeClass("hidden");
                if (that.searchRepresentation.get("subSubCategory")) {
                    $sscCont.find("span[data-id=" + that.searchRepresentation.get("subSubCategory") + "]").addClass("active");
                }
            } else {
                $scCont.find("span[data-id=noreq]").addClass("active");
                $scCont.find("p").addClass("hidden");
            }
            $("#search_district").find(".active").removeClass("active");
            if (that.searchRepresentation.get("district")) {
                $("#search_district").find("span[data-id=" + that.searchRepresentation.get("district") + "]").addClass("active");
            } else {
                $("#search_district").find("span[data-id=noreq]").addClass("active");
            }
            that.srs[dataId] = that.searchRepresentation;
            that.courseSearch();
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
        });

        $("#search_district").on("click", "span", function (e) {
            if ($(e.currentTarget).hasClass("active")) {
                return;
            }
            $(e.currentTarget).siblings(".active").removeClass("active");
            $(e.currentTarget).addClass("active");
            var dataId = $(e.target).data("id");
            if (dataId === "noreq") {
                that.searchRepresentation.set("district", undefined);
            } else {
                that.searchRepresentation.set("district", dataId);
                that.compareWidgetView.map.setCenter(dataId);
            }
            that.courseSearch();
        });
    },
    filterResult: function ($filter, dataId) {
        if ($filter.find("span[data-id=" + dataId + "]").hasClass("active") || $filter.attr("id").indexOf("search") >= 0) {
            return;
        }
        $filter.find(".active").removeClass("active");
        $filter.find("span[data-id=" + dataId + "]").addClass("active");
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
            this.courseSearch();
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
            }
        } else if (criteria === "classTime") {
            if (dataId === "noreq") {
                this.filters.classTime = null;
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
        var messages = this.filter();
        this.renderSearchResults(messages, true);
        //this.searchRepresentation.set(criteria, dataId);
        //todo
    },
    filterClassSize: function (course) {
        return (course.get("classSize") >= this.filters.classSize.minSize && (this.filters.classSize.maxSize ? course.get("classSize") <= this.filters.classSize.maxSize : true));
    },
    filterClassTime: function (course) {
        var valid = true, start1 = course.get("startTime1"), start2 = course.get("startTime2");
        if (this.filters.classTime.time === "morning") {
            valid = valid && ((start1 < 1200) || (start2 < 1200));
        } else if (this.filters.classTime.time === "afternoon") {
            valid = valid && ((start1 >= 1200 && start1 < 1700) || (start2 >= 1200 && start2 < 1700));
        } else {
            valid = valid && ((start1 >= 1700) || (start2 >= 1700));
        }
        if (valid && this.filters.classTime.day) {
            var week = course.get("studyDays") || [];
            if (this.filters.classTime.day === "weekend") {
                valid = valid && (week.contains([0, 6]));
            } else if (this.filters.classTime.day === "weekday") {
                valid = valid && (week.contains([1, 2, 3, 4, 5]));
            }
        }
        return valid;
    },
    filterPrice: function (course) {
        return (course.get("price") >= this.filters.price.minPrice && (this.filters.price.maxPrice ? course.get("price") <= this.filters.price.maxPrice : true));
    },
    filter: function () {
        var messages = this.allMessages ? this.allMessages.clone() : new Courses();
        if (this.filters.price) {
            messages.reset(messages.filter(this.filterPrice, this));
        }
        if (this.filters.classSize) {
            messages.reset(messages.filter(this.filterClassSize, this));
        }
        if (this.filters.classTime) {
            messages.reset(messages.filter(this.filterClassTime, this));
        }
        return messages;
    },
    comparePrice: function (course) {
        return course.get("price");
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