var SearchResultView = MultiPageView.extend({
    pageNavigator: "courseSearchResultNavigator",
    entryContainer: "searchResultDisplayPanel",
    noMessage: _.template(tpl.get("search_noMessage")),
    entryTemplate: _.template(tpl.get("searchResultEntry")),
    pageEntryNumber: 10,
    scroll:false,
    initialize: function (searchRepresentation, compareWidget) {
        _.bindAll(this, "bindEvents", "renderSearchResults", "renderError", "close");
        MultiPageView.prototype.initialize.call(this);
        this.sr = searchRepresentation;
        //$entryContainer根据entryContainer生成 直接使用即可 与el相同
        this.$entryContainer.empty();
        //对比组件
        this.compareWidgetView = compareWidget || this.compareWidgetView;
        this.user = app.sessionManager.sessionModel;

        this.fetchAction();
        this.bindEvents();
        this.bindEntryEvents();
    },
    render: function () {
        this.isClosed = false;
        MultiPageView.prototype.render.call(this);
        this.afterRender();
    },
    //页面成功渲染后的结果
    afterRender: function(){
        //设置已加入对比的课程状态
        var courseIds = app.storage.getCoursesToCompare();
        for (var i = 0; i < courseIds.length; i++) {
            $("#compare_" + courseIds[i]).find("input").attr("class", "remove btn_gray").val("已加入对比").removeClass("add").addClass("remove");
        }
        //加入banner图
        var $container = $('#'+this.entryContainer);
        var total = $container.children('.searchResultEntry').length;
        var imgTpl = _.template('<div class="searchResultEntry adv"><img width="730" height="150" class="bannerImg" src="<%=url%>" alt="<%=alt%>"></div>');
        var imgList = [
            {url:'./style/images/search_a1.jpg',alt:'学什么？专家帮你挑'},
            {url:'./style/images/search_a2.jpg',alt:'警惕！十大培训陷阱'}
        ];
        if(total>=6){
            $container.children('.searchResultEntry:nth-child(3)').after(imgTpl(imgList[0]));
            $container.children('.searchResultEntry:nth-child(7)').after(imgTpl(imgList[1]));
        }else if(total>=3){
            $container.children('.searchResultEntry:nth-child(3)').after(imgTpl(imgList[0]));
        }
        $('#'+this.entryContainer+' .bannerImg').on('click',function(){
            //打开客服系统
            doyoo.util.openChat('g=82548');
        });
        //这里是为了声明页面加载完毕 seo
        $('body').attr('pageRenderReady', '')
    },
    bindEvents: function () {
        var that = this, id;
        this.$entryContainer.on("click", ".compare", function (e) {
            if ($(e.target).hasClass("add")) {
                id = Utilities.getId($(this).attr("id"));
                if (that.compareWidgetView.addCourse(that.messages.get(Utilities.toInt(id)))) {
                    $(e.target).attr("class", "remove btn_gray").val("已加入对比");
                } else {
                    Info.displayNotice("您最多只能同时比较四个不同的科目。");
                }
            } else {
                $(e.target).attr("class", "add btn_o").val("+对比");
                id = Utilities.getId($(this).attr("id"));
                that.compareWidgetView.removeCourse(Utilities.toInt(id));
            }

        }).on("click", ".blank", function (e) {
            e.preventDefault();
            id = Utilities.getId($(this).attr("id"));
            app.navigate("course/" + id, true);
        });
    },

    bindEntryEvents: function () {
        $('#searchResultDisplayPanel').on('click', '.viewDetail', function () {
            var courseId = $(this).data('id');
            if (courseId == '')return;
            //百度统计
            _hmt.push(['_trackEvent', 'course', 'click', courseId]);
            app.navigate("course/" + courseId, true);
        });
    },
    fetchAction: function (pageIndex) {
        var self = this;
        //根据过滤条件(包括分页信息)重新获取数据
        if (pageIndex === undefined) {// 未传入参数

            if (self.sr.get("start") === undefined)// localStorage中不存在缓存
                self.sr.set("start", 0);// 则设置默认的start为0
        } else {
            self.sr.set("start", (pageIndex - 1) * self.pageEntryNumber);
        }
        this.sr.set("count", self.pageEntryNumber);
        self.currentPage = self.sr.get('start') / self.pageEntryNumber + 1;

        app.navigate("search/" + this.sr.toQueryString(), {trigger: false, replace: true});
        $("#" + this.entryContainer).empty().append('<div class="loading"></div>');
        app.generalManager.findCourse(this.sr, {
            success: self.renderSearchResults,
            error: self.renderError
        });
        app.storage.setSearchRepresentationCache(self.sr, "course");
    },
    renderError: function (data) {
        if (!this.isClosed) {
            $("#" + this.entryContainer).empty().append('<div class="no_data"><div>很抱歉，您的网络似乎不大好~~</div><p>请稍后再试</p></div>');
        }
    },
    renderSearchResults: function (data) {
        if (!this.isClosed) {
            //prevent memory leaks
//            if (typeof BMap !== "undefined" && !this.compareWidgetView.map) {
//                this.compareWidgetView.renderMap();
//            }
//            if (this.compareWidgetView.map) {
//                this.compareWidgetView.map.removeAllMarkers();
//            }
            var searchResults = data || new Courses();
            this.allMessages = searchResults;
            this.messages = searchResults;
            var total = searchResults.total;
            $("#resultNum").html(total);
            for (i = 0; i < searchResults.length; i++) {
                if (this.compareWidgetView.map) {
                    this.compareWidgetView.map.getLatLng(searchResults.at(i).get("address"), searchResults.at(i).get("instName"));
                }
            }
            this.startIndex = 0;
            this.render();
        }
    },
    close: function () {
        if (!this.isClosed) {
            this.$entryContainer.off();
            MultiPageView.prototype.close.call(this);
            this.compareWidget = null;
        }
    }
});