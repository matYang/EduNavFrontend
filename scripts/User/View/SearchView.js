var SearchView = Backbone.View.extend({
    el: '#content',
    categoryTemplate: ["<li data-id='", undefined, "'>", undefined,"</li>"],
    subCategoryTemplate: ["<span data-id='", undefined ,"'>", undefined,"</span>"],
    subCategoryContainerTemplate: ["<div data-id='", ,"'class='hidden subCategoryList'><label>类<s></s>别：</label><span data-id='noreq' class='active'>不限</span>", undefined,"</div>"],
    reqTemplate: ['<a href="#" data-cri="', undefined ,'" data-req="', undefined, '" title="取消">', undefined, "</a>"],
    filters: {},
    initialize: function (params) {
        _.bindAll(this, 'renderSearchResults', 'courseSearch', 'bindEvents', 'bindSearchEvents', 'renderCategories', 'renderLocations', 'filterResult', 'close');
        app.viewRegistration.register(this);
        $("#viewStyle").attr("href", "style/css/search.css");
        this.isClosed = false;
        this.rendered = false;
        this.timeDesc = true;
        this.priceDesc = true;
        this.windowHeight = $(window).height();
        this.allMessages = new Courses();
        this.user = app.sessionManager.sessionModel;
        //define the template
        this.searchRepresentation = app.storage.getSearchRepresentationCache("course");
        if (params) {
            try {
                this.searchRepresentation.castFromQuery(params.searchKey);
                app.storage.setSearchRepresentationCache(this.searchRepresentation);
            } catch (e) {
                app.navigate("search", {replace:true});
                this.searchRepresentation = new CourseSearchRepresentation();
            }
        }
        this.template = _.template(tpl.get('search'));
        this.$el.append(this.template);
        this.compareWidgetView = new CompareWidgetView();
        if (!this.searchResultView) {
            this.searchResultView = new SearchResultView (new Courses(), new Courses(), this.compareWidgetView);
        }
        app.generalManager.getCategories(this);
        app.generalManager.getLocations(this);
        this.bindEvents();
        this.currentPage = 0;
        //injecting the template
    },


    renderSearchResults: function (searchResults, byFilter) {
        //prevent memory leaks
        $("#searchResultDisplayPanel").empty();
        searchResults = searchResults || new Courses()
        if (!byFilter) {
            this.allMessages = searchResults;
        } 
        var array = searchResults.toArray();
        this.searchResultView.allMessages.reset(this.allMessages.toArray());
        if (byFilter) {
            this.searchResultView.messages.reset(searchResults.toArray());
        } else {
            searchResult = this.filter();
            this.searchResultView.messages.reset(searchResult.toArray());
        }
        $("#resultNum").html(searchResults.length);
        this.searchResultView.render.call(this);
    },
    renderCategories: function (categories){
        this.categories = categories;
        var  cbuf = [], scbuf = [], tcbuf = [], tc = "";
        if (!this.searchRepresentation.get("category")) {
            this.searchRepresentation.set("category", Object.keys(categories)[0]);
        }
        this.categoryList = [];
        for ( var key in categories ) { //level 1
            obj = categories[key];
            index = categories[key]["index"];
            if (this.categoryList)
            this.categoryTemplate[1] = key;
            this.categoryTemplate[3] = key;
            cbuf[index] = this.categoryTemplate.join("");
            for ( var attr in obj ) { //level 2 and level 1 index
                if (attr === "index") continue;
                var scs = obj[attr];
                var index2 = obj[attr].index;
                this.subCategoryTemplate[1] = attr;
                this.subCategoryTemplate[3] = attr;
                scbuf[index2] = this.subCategoryTemplate.join("");
                if (obj[attr]) {
                    var bot = obj[attr]
                    for ( var type in bot ) { //level 3 and level 2 index
                        if (type === "index") continue;
                        var tcs = bot[type];
                        var index3 = bot[type].index;
                        this.subCategoryTemplate[1] = type;
                        this.subCategoryTemplate[3] = type;
                        tcbuf[index3] = this.subCategoryTemplate.join("");
                    }
                    tc += "<p data-id ='" + attr + "' class='hidden'>" + tcbuf.join("") + "</p>";
                    tcbuf=[];
                }
            }
            scbuf.push(tc);
            this.subCategoryContainerTemplate[1] = key;
            this.subCategoryContainerTemplate[3] = scbuf.join("");
            $("#search_subCategory").append(this.subCategoryContainerTemplate.join(""));
            scbuf = [];
        }
        $("#search_category").append(cbuf.join(""));
        $("#search_category").find("li[data-id="+this.searchRepresentation.get("category")+"]").addClass("active");
        $("#search_subCategory").find("div[data-id="+this.searchRepresentation.get("category")+"]").removeClass("hidden");
        if (this.searchRepresentation.get("subCategory")) {
            $("div[data-id="+this.searchRepresentation.get("category")+"]").find("span[data-id=noreq]").removeClass("active");
            $("div[data-id="+this.searchRepresentation.get("category")+"]").find("span[data-id="+this.searchRepresentation.get("subCategory")+"]").addClass("active");
        } else {
        }
        this.bindSearchEvents();
        this.courseSearch();
    },
    renderError: function () {
        this.$resultp = this.$resultp || $("#searchResultDisplayPanel");
        this.$resultp.empty().append('<div class="no_data"><div>很抱歉，您的网络似乎不大好~~</div><p>请稍后再试</p></div>');
    },
    renderLocations: function (locations) {
        var buf = [];
        // for (var prov in locations) {
        //     var city = locations[prov];
        //     for (var attr in city) {
                for (var key in locations["江苏"]["南京"]) {
                    if (key !== "index") {
                        this.subCategoryTemplate[1] = this.subCategoryTemplate[3] = key;
                        buf[locations["江苏"]["南京"][key].index]= this.subCategoryTemplate.join("");
                    }
                }
        //     }
        // }
        $("#search_district").append(buf.join(""));
        if (this.searchRepresentation.get("district")) {
            $("#filter_district").find("span[data-id="+this.searchRepresentation.get("district")+"]").trigger("click");
        }
    },
    courseSearch: function () {
        app.navigate("search/" + this.searchRepresentation.toQueryString(), {trigger:false, replace: true});
        $("#searchResultDisplayPanel").empty().append('<div class="messageDetail-middle-autoMatch-loading">正在为您寻找信息</div>');
        app.generalManager.findCourse(this.searchRepresentation, {
            "success": this.renderSearchResults,
            "error": this.renderError
        });
        app.storage.setSearchRepresentationCache(this.searchRepresentation, "course");
    },

    bindEvents: function () {
        var that = this;
        this.bindSortEvents();
        $("#filterPanel").children(".filterCriteria").on("click", "span", function (e) {
            that.filterResult($(e.delegateTarget), $(e.target).data("id"));
        });
        // if (this.windowHeight >= 520 ) {
            this.scrollSensorOn = true;
            $(document).on("scroll", function (e) {
                var scroll = $(this).scrollTop();
                if (scroll>402) {
                    $("#searchWidgets").addClass("stickyHeader");
                } else {
                    $("#searchWidgets").removeClass("stickyHeader");
                }
            });
        // }
        // $(window).on("resize", function (e) {
        //     that.windowHeight = $(this).height();
        //     if (that.windowHeight < 520 && that.scrollSensorOn) {
        //         that.scrollSensorOn = false;
        //         $(document).off("scroll");
        //         $("#searchWidgets").removeClass("stickyHeader");
        //     } else if (that.windowHeight >= 520 && that.scrollSensorOn === false) {
        //         that.scrollSensorOn = true;
        //         $(document).on("scroll", function (e) {
        //             if ($(this).scrollTop()>402) {
        //                 $("#searchWidgets").addClass("stickyHeader");
        //             } else {
        //                 $("#searchWidgets").removeClass("stickyHeader");
        //             }
        //         });
        //     }
        // })
        $("#searchReqs").on("click", "a", function (e) {
            e.preventDefault();
            var cri = $(e.target).data("cri");
            that.filterResult($("#filter_"+cri), "noreq");
        })
    },
    bindSortEvents: function () {
        this.searchResultView.registerSortEvent($("#time"), "startDate", "timeDesc", this, 
            function(){
                $("#price").html("价格");
                if (this.timeDesc) {
                    $("#time").html("时间↓");
                } else {
                    $("#time").html("时间↑");
                }
                this.timeDesc = !this.timeDesc;
                $("#searchResultSorter>.active").removeClass("active");
                this.searchResultView.render();
            });
        this.searchResultView.registerSortEvent($("#price"), "price", "priceDesc", this, 
            function(){
                $("#time").html("时间");
                if (this.priceDesc) {
                    $("#price").html("价格↓");
                } else {
                    $("#price").html("价格↑");
                }
                this.priceDesc = !this.priceDesc;
                $("#searchResultSorter>.active").removeClass("active");
                this.searchResultView.render();
            });
        this.searchResultView.registerSortEvent($("#editorPick"), "popularity", true, this, 
            function(){
                $("#time").html("时间");
                $("#price").html("价格");
                $("#editorPick").html("爱上课推荐");
                this.priceDesc = !this.priceDesc;
                $("#searchResultSorter>.active").removeClass("active");
                this.searchResultView.render();
            });
        this.searchResultView.registerFilterEvent($("input[name=cashback]"),this.cashbackFilter,this, 
              function(){
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
            var dataId = $(e.target).data("id");
            $(e.delegateTarget).children(".active").removeClass("active");
            $(this).addClass("active");
            $("#search_subCategory").children("div").addClass("hidden");
            var $scCont = $("#search_subCategory").children("div[data-id=" + dataId + "]");
            $scCont.removeClass("hidden");
            $scCont.find(".active").removeClass("active");
            $scCont.find("span[data-id=noreq]").addClass("active");
            that.searchRepresentation.set("category", dataId);
            that.searchRepresentation.set("subCategory", undefined);
            that.courseSearch();
        });
        $("#search_subCategory").on("click", "span", function (e) {
            that.searchRepresentation.set("category", $("#search_category").find(".active").data("id"));
            var val = $(this).data("id");
            if (val === "noreq") {
                that.searchRepresentation.set("subCategory", undefined);
            } else {
                that.searchRepresentation.set("subCategory", val);
            }
            $(this).siblings("p").addClass("hidden");
            $(this).siblings("[data-id="+val+"]").removeClass("hidden");
            that.courseSearch();
        });
        $("#search_subCategory").on("click", "span", function (e) {
            that.searchRepresentation.set("category", $("#search_category").find(".active").data("id"));
            var val = $(this).data("id");
            if (val === "noreq") {
                that.searchRepresentation.set("subCategory", undefined);
            } else {
                that.searchRepresentation.set("subCategory", $(this).data("id"));
            }
            that.courseSearch();
        });
    },
    filterResult: function ($filter, dataId) {
        $filter.find(".active").removeClass("active");
        $filter.find("span[data-id=" + dataId + "]").addClass("active");
        var criteria = $filter.attr("id").split("_")[1];
        this.reqTemplate[1] = criteria;
        this.reqTemplate[3] = dataId;
        this.reqTemplate[5] = $("[data-id="+dataId+"]").html();
        $("a[data-cri="+criteria+"]").remove();
        if (dataId !== "noreq" && $filter.attr("id").indexOf("filter")>-1) {
            $("#searchReqs").append(this.reqTemplate.join(""));
        }
        if($("#searchReqs").find("a").length) {
            $("#searchReqs").removeClass("hidden");
        } else {
            $("#searchReqs").addClass("hidden");
        }
        if (criteria === "startTime"){
            var date = new Date();
            date.setDate(1);
            var month = date.getMonth();
            if (dataId === "thisMonth") {
                this.searchRepresentation.set("startTime", date);
            } else if (dataId= "nextMonth") {
                if (month === 11) {
                    date.setMonth(0);
                    date.setFullYear(date.getFullYear()+1);
                } else {
                    date.setMonth(date.getMonth()+1);
                }
                this.searchRepresentation.set("startTime", date);
            } else if (dataId= "twoMonthsAfter") {
                if (month >= 10) {
                    date.setMonth((date.getMonth()+2)%12);
                    date.setFullYear(date.getFullYear()+1);
                } else {
                    date.setMonth(date.getMonth()+2);
                }
                this.searchRepresentation.set("startTime", date);
            } else {
                this.searchRepresentation.set("startTime", undefined);
            }
            this.courseSearch();
        }
        else if (criteria === "district") {
            if (dataId === "noreq") {
                this.searchRepresentation.set("startTime", undefined);
            } else {
                this.searchRepresentation.set(criteria, dataId);
            }
            this.courseSearch();
        }
        else if (criteria === "price") {
            if (dataId === "noreq") {
                this.filters["price"] = null;
            } else {
                var priceRange = dataId.split("-");
                var minPrice = Utilities.toInt(priceRange[0]), maxPrice;
                if (priceRange.length === 1) {
                    maxPrice = undefined;
                } else {
                    maxPrice = Utilities.toInt(priceRange[1]);
                }
                this.filters["price"] = {
                    "minPrice": minPrice,
                    "maxPrice": maxPrice
                }
            }
        }
        else if (criteria === "classMode") {
            if (dataId === "noreq") {
                this.filters["classSize"] = null;
            } else {
                var sizeRange = dataId.split("-");
                var minSize = Utilities.toInt(sizeRange[0]), maxSize;
                if (sizeRange.length === 1) {
                    maxSize = undefined;
                } else {
                    maxSize = Utilities.toInt(sizeRange[1]);
                }
                this.filters["classSize"] = {
                    "minSize": minSize,
                    "maxSize": maxSize
                }
            }
        }
        else if (criteria === "classTime") {
            if (dataId === "noreq") {
                this.filters["classTime"] = null;
            } else {
                var time = dataId.split("_"), day;
                if (time.length === 2) {
                    day = time[1];
                }
                time = time[0];
                this.filters["classTime"] = {
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
        return (course.get("seatsTotal") >= this.filters.classSize.minSize && (this.filters.classSize.maxPrice ? course.get("seatsTotal")<= this.filters.classSize.maxSize : true));
    },
    filterClassTime: function(course){
        var valid = true, start1 = course.get("startTime1"), start2 = course.get("startTime2");
        if (this.filters["classTime"].time === "morning") {
            valid = valid && ((start1 < 1200) || (start2 < 1200));
        } else if (this.filters["classTime"].time === "afternoon") {
            valid = valid && ((start1 >= 1200 && start1 < 1700) || (start2 >= 1200 && start2 < 1700));
        } else {
            valid = valid && ((start1 >= 1700) || (start2 >= 1700));
        }
        if (valid && this.filters["classTime"].day) {
            var week = course.get("studyDays") || [];
            if (this.filters["classTime"].day === "weekend") {
                valid = valid && (week.contains([0, 6])) ;
            } else if (this.filters["classTime"].day === "weekday") {
                valid = valid && (week.contains([1, 2, 3, 4, 5])) ;
            }
        }
        return valid;
    },
    filterPrice: function(course){
        return (course.get("price") >= this.filters.price.minPrice && (this.filters.price.maxPrice ? course.get("price")<= this.filters.price.maxPrice : true) );
    },
    filter: function(){
        var messages = this.allMessages ? this.allMessages.clone() : new Courses();
        if (this.filters["price"]) {
            messages.reset(messages.filter(this.filterPrice, this));
        }
        if (this.filters["classSize"]) {
            messages.reset(messages.filter(this.filterClassSize, this));
        }
        if (this.filters["classTime"]) {
            messages.reset(messages.filter(this.filterClassTime, this));
        }
        return messages;
    },
    comparePrice: function(course){
        return course.get("price");
    },
    close: function () {
        if (!this.isClosed) {
            //removing all event handlers
            if (this.compareWidgetView) {
                this.compareWidgetView.close();
            }
            if (this.searchResultView) {
                this.searchResultView.close();
            }
                  $(document).off("scroll");
            $(window).off("resize");
            this.$el.empty();
            this.isClosed = true;
        }
    } 
});