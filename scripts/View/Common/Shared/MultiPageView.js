var MultiPageView = Backbone.View.extend({
    //分页按钮配置所需要提供的信息有保存按钮是第几页的数据 (之前放于id中) 以及可供触发事件的selector(之前使用class触发事件)
    //如果一个页面上面存在多个分页的情况 需要在每个页面重新设置pageNumberClass为不同的值(用户绑定事件) 而pageNumberId就不需要了
    maxSize: 7, //分页组的最大容量 奇数个
    rotate: true,//分页是否随当前页滚动（当前页显示在分页组的中间）
    firstCount: 1,//分页的前几个始终显示分页的数量 如2则显示第一页和第二页一直显示
    lastCount: 2,//同上 最后几个
    entryTemplate: "", //单条记录的模板
    entryContainer: "", //结果列表 tbody
    truePagination: true, //为true时必须指定fetchAction函数用于与后台交互获取分页数据
    entryClass: "", //每条记录的样式
    pageNavigator: "pagination", //分页数据的container
    pageEntryNumber: 10,//每页显示的记录数
    startIndex: 0,//开始记录数
    currentPage: 1,//当前页数
    pageNumberId: "page",//每个分页按钮的id前缀 结果为id='page_1'...
    pageNumberClass: "page",//用户绑定事件
    entryEvent: "",//绑定在每条记录上的事件
    messages: null,//页面上面显示的经过过滤的信息(在假分页状态下)
    noMessage: _.template("暂无消息"),
    eventBound: false,
    $entryContainer: null, // 列表容器
    isTable: false,
    $tableContainer: null, //如果是table
    scroll: true,//设置换页后是否自动滚动到容器上方
    scrollTarget: null,//滚动到的元素位置
    initialize: function () {
        _.bindAll(this, "render", "toPage", "bindEntryEvent", "setPageNavigator", "clickPageHandler",
            "clickPreHandler", "clickNextHandler", "close");
        this.$entryContainer = $("#" + this.entryContainer);
        if (this.$entryContainer[0].tagName === 'TBODY') {
            this.isTable = true;
            this.$tableContainer = this.$entryContainer.parent();
        }

        if (this.isTable) {
            this.$tableContainer.after($("<div>").attr("id", this.pageNavigator).attr("class", "blank1 page clearfix"));
        } else {
            this.$entryContainer.after($("<div>").attr("id", this.pageNavigator).attr("class", "blank1 page clearfix"));
        }
    },
    fetchAction: function (page) {
    },
    render: function () {
        //获取完数据后需要进行数据的展示
        var buf = [], i, length, height, message;
        var that = this;
        this.$entryContainer = $("#" + this.entryContainer);
        this.$entryContainer.empty();
        if (this.messages && this.messages.length > 0) {
            //这里设置显示的数据
            length = this.messages.length - this.startIndex;
            length = (length < this.pageEntryNumber) ? length : this.pageEntryNumber;
            this.messages.each(function (message) {
                message = message._toSimpleJSON ? message._toSimpleJSON() : message._toJSON();
                buf.push(that.entryTemplate(message));
            });
            this.$entryContainer.append(buf.join(""));
            buf = null;
            if (this.entryEvent && !this.eventBound) {
                //绑定进入详情页的事件
                this.bindEntryEvent();
                this.eventBound = true;
            }
        } else {
            if (!this.isTable) {
                this.$entryContainer.append("<div class = 'noMessage'>" + this.noMessage() + "</div>");
            } else {
                //根据在table中td个数设置no message
                var td_length = this.$tableContainer.find('thead tr td').length;
                if (!td_length) {
                    td_length = 4;
                }
                this.$entryContainer.append(
                        "<tr><td colspan='"
                        + td_length
                        + "'><div class = 'noMessage'>"
                        + this.noMessage()
                        + "</div></td></tr>");
            }
        }
        var total = this.messages.total;
        //存在两页时才显示分页组件
        if (total > this.pageEntryNumber) {
            this.setPageNavigator();
        } else {
            $("#" + this.pageNavigator).empty();
        }
        // this.messages.on("change", this.render);
    },

    toPage: function (pageIndex) {
        if (pageIndex === this.currentPage)return;
        if (this.scroll) {
            //如果设置了target 没有则到顶部
            var $target = $(this.scrollTarget);
            if ($target.length !== 0) {
                $.smoothScroll({scrollTarget: $target})
            } else {
                $.smoothScroll()
            }
        }
        this.currentPage = pageIndex;
        this.startIndex = this.pageEntryNumber * (pageIndex - 1);
        this.fetchAction(pageIndex);//抓取完会进行render
    },
    bindEntryEvent: function () {

        var self = this, eventClass = this.actionClass || this.entryClass;
        this.$entryContainer.on("click", "." + eventClass, function (e) {
            e.preventDefault();
            var id = Utilities.toInt(Utilities.getId($(this).attr("id")));
            if (isNaN(id)) {
                id = Utilities.getId($(this).attr("id"));
            }
            self.entryEvent(id, e);
        });
    },
    setPageNavigator: function () {
        var buf = ['<a class="pre"></a>'],
            divBuf = ["<a id='", this.pageNumberId, "_", 0, "' class='", this.pageNumberClass, "'> ", 0, "</a>"],
            i,
            html;
        var countTotal = this.messages.total;//记录总数
        var pageTotal = Math.ceil(countTotal / this.pageEntryNumber);//分页总数
        var currentPageIndex = this.currentPage;

        if (this.$pn && this.$pn.length) {
            this.$pn.children("." + this.pageNumberClass).off();
            this.$pn.children(".pre").off();
            this.$pn.children(".next").off();
            this.$pre = null;
            this.$next = null;
        }
        this.$pn = $("#" + this.pageNavigator);


        /*page core start*/
        var pageViewList = [];
        var makePage = function (number, text) {
            return {
                number: number,
                text: text
            }
        };//用于生成pageViewList
        //当前分页组的默认起始和结束页
        var startPage = 1, endPage = pageTotal;

        //step 1根据currentPage判断是处于哪一个分页组 即获取startPage和endPage
        var pageGroupSize = Math.ceil(pageTotal / this.maxSize);//分页组组数
        var currentPageGroupIndex = Math.ceil(currentPageIndex / this.maxSize);//当前页处于的分页组

        //step 2(optional)如果存在多个分页组 则重新计算startPage和endPage
        //二次分页 将所有的分页数字分成多个分页组 每个分页组最多显示maxSize个分页数字
        if (pageGroupSize > 1) {
            if (this.rotate) {//当前页显示在分页组中间
                //起始页应为当前页向前取maxSize/2(向下取整)个 如果第一页超出（小于0）则取1
                startPage = Math.max(currentPageIndex - Math.floor(this.maxSize / 2), 1);
                endPage = startPage + this.maxSize - 1;

                //如果最后一页超出（大于分页总数）
                if (endPage > pageTotal) {
                    endPage = pageTotal;
                    startPage = endPage - this.maxSize + 1;
                }
            } else {
                //设置当前分页组的起始页
                startPage = (currentPageGroupIndex - 1 ) * this.maxSize + 1;

                //设置当前分页组的结束页
                endPage = Math.min(startPage + this.maxSize - 1, pageTotal);
            }
        }

        //step 3 根据startPage和endPage生成分页数组
        for (var number = startPage; number <= endPage; number++) {
            var page = makePage(number, number);//first is pageIndex ,second is text
            pageViewList.push(page);
        }

        //step 4如果存在多个分页组 则设置切换分页组的链接
        //当然也可以不设置链接（需要在makePage中增加属性来判断是否加链接）
        if (pageGroupSize > 1) {
            if (this.rotate) {
                //rotate模式下需要根据firstCount和lastCount来生成切换分页组的链接
                if (startPage > this.firstCount + 1) {
                    pageViewList.unshift(makePage(startPage - 1, '...'));
                }
                if (endPage < pageTotal - this.lastCount) {
                    pageViewList.push(makePage(endPage + 1, '...'));
                }
            } else {
                //添加切换分页组的链接
                if (startPage > 1) {//非第一个分页组
                    pageViewList.unshift(makePage(startPage - 1, '...'));
                }
                if (endPage < pageTotal) {//非最后一个分页组
                    pageViewList.push(makePage(endPage + 1, '...'));
                }
            }
        }
        //step 5 设置显示的最开始firstCount页和最后lastCount页
        if (startPage > this.firstCount) {
            pageViewList.unshift(makePage(1, '1'));
        }
        //判断需要push一个还是多个
        //如共40页 lastCount=2情况下 endPage<=38或则需要push39和40;endPage=39则push40
        //这里实现为<=38 push 39(38+1);<=39 push 40(39+1)
        for (i = this.lastCount; i > 0; i--) {
            if (endPage <= pageTotal - i) {
                pageViewList.push(makePage(pageTotal - i + 1, pageTotal - i + 1));
            }
        }

        //step 6渲染这个分页组分页组 根据divBuf生成buf
        _.each(pageViewList, function (page) {
            divBuf[3] = page.number;
            divBuf[7] = page.text;
            buf.push(divBuf.join(""));
        });
        /*page core end*/

        buf.push("<a class='next'></a>");
        html = buf.join("");
        this.$pn.off()
            .empty()
            .append(html);
        this.$pre = this.$pn.children(".pre");
        this.$next = this.$pn.children(".next");
        this.$pn.children("#" + this.pageNumberId + "_" + currentPageIndex).addClass("active");
        this.$pn.on("click", "." + this.pageNumberClass, this.clickPageHandler);

        if (this.currentPage === 1) {
            this.$pre.addClass("pre-disabled");
        } else {
            this.$pre.on("click", this.clickPreHandler);
        }
        if (this.currentPage === pageTotal) {
            this.$next.addClass("next-disabled");
        } else {
            this.$next.on("click", this.clickNextHandler);
        }
    },
    clickPageHandler: function (e) {
        var id = Utilities.toInt(Utilities.getId(e.target.id));
        this.toPage(id);
    },
    clickNextHandler: function () {
        this.toPage(this.currentPage + 1);
    },
    clickPreHandler: function () {
        this.toPage(this.currentPage - 1);
    },
    /*
     active class should be the class indicating the selected tab/filter across the entire site.
     Therefore it is hardcoded here.
     */
    close: function () {
        if (!this.isClosed) {
            if (this.$pn) {
                this.$pn.children("." + this.pageNumberClass).off();
            }
            this.$entryContainer.off();
            this.$entryContainer.empty();
            this.$entryContainer = null;
            this.eventBound = false;
            this.isClosed = true;
        }
    }
});