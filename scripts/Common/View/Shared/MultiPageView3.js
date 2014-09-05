var MultiPageView3 = Backbone.View.extend({
    /*
     * @brief
     This class is designed to display a set of messages in a view separated by page numbers.
     Other views can extend this view and configure the setting according to the needs.
     This base view provide the following features: page navigation, filtering

     * @param actionClass: If this attribute is set, instead of entryClass, doms with this class will be bind to the entryEvent action when they are clicked
     * @param pageNumberId: the base id for the page numbers in the form of pageId_, number will be appended to the end for event use
     * @param messages: the filtered messages to be displayed in the view
     *                   (including the ones in the pages not displaying, NOTE: it must be a different instance from allMessage in order for the collection event to work properly)
     * @param entryHeight: the height of each entry, including margins and paddings, used for calculating container height
     * @param entryRowNum: the number of entries displaying in the same row
     * @param _filters: private member holding registered filters, should never be referenced from external

     //TODO:
     */
    entryTemplate: "", //单条记录的模板
    entryContainer: "", //结果列表 tbody
    truePagination: true, //为true时必须指定fetchAction函数用于与后台交互获取分页数据
    entryClass: "", //每条记录的样式
    pageNavigator: "pagination", //分页数据的container
    pageEntryNumber: 10,//每页显示的记录数
    startIndex: 0,//开始记录数
    currentPage: 1,//当前页数
    pageNumberClass: "",//分页数字的样式
    pageNumberId: "page",//每个分页按钮的id前缀 结果为id='page_1'...
    entryEvent: "",//绑定在每条记录上的事件
    messages: null,//页面上面显示的经过过滤的信息(在假分页状态下)
    entryHeight: -1,
    entryRowNum: 1,
    minHeight: 0,
    noMessage: _.template("暂无消息"),
    eventBound: false,
    $messageContainer: null,
    singlePage: null,
    isTable: false,
    $tableContainer: null,
    scroll: true,//设置换页后是否自动滚动到容器上方
    scrollTarget: null,//滚动到的元素位置
    initialize: function () {
        _.bindAll(this, "render", "toPage", "bindEntryEvent", "setPageNavigator", "clickPageHandler",
            "clickPreHandler", "clickNextHandler", "close");
        var $entryContainer = $("#" + this.entryContainer);
        if ($entryContainer[0].tagName === 'TBODY') {
            this.isTable = true;
            this.$tableContainer = $entryContainer.parent();
        }

        if (this.isTable) {
            this.$tableContainer.after($("<div>").attr("id", this.pageNavigator).attr("class", "blank1 page clearfix"));
        } else {
            this.$messageContainer.after($("<div>").attr("id", this.pageNavigator).attr("class", "blank1 page clearfix"));
        }
    },
    fetchAction: function (page) {
    },
    render: function () {
        //获取完数据后需要进行数据的展示
        var buf = [], i, length, height, message;
        var that = this;
        this.$messageContainer = $("#" + this.entryContainer);
        this.$messageContainer.empty();
        if (this.messages && this.messages.length > 0) {
            //这里设置显示的数据
            length = this.messages.length - this.startIndex;
            length = (length < this.pageEntryNumber) ? length : this.pageEntryNumber;

            this.messages.each(function (message) {
                buf.push(that.entryTemplate(message._toJSON()));
            });
            this.$messageContainer.append(buf.join(""));
            buf = null;
            if (this.entryEvent && !this.eventBound) {
                //绑定进入详情页的事件
                this.bindEntryEvent();
                this.eventBound = true;
            }
        } else {
            if (!this.isTable) {
                this.$messageContainer.append("<div class = 'noMessage'>" + this.noMessage() + "</div>");
            } else {
                var td_length = this.$tableContainer.find('.thead tr td').length;
                if (!td_length) {
                    td_length = 4;
                }
                this.$messageContainer.append("<tr><td colspan='" + td_length +
                    "'><div class = 'noMessage'>" + this.noMessage() + "</div></td></tr>");
            }
        }
        if (this.autoHeight) {
            this.$messageContainer.css("height", "auto");
        } else if (this.entryHeight) {
            height = Math.ceil(length / this.entryRowNum) * this.entryHeight;
            height = (height > this.minHeight) ? height : this.minHeight;
            this.$messageContainer.css("height", height + "px");
        }
        var total = this.messages.total;
        if (total > this.pageEntryNumber) {
            this.setPageNavigator();
        } else {
            $("#" + this.pageNavigator).empty();
        }
        if (this.afterRender) {
            this.afterRender();
        }
        // this.messages.on("change", this.render);
    },

    toPage: function (pageIndex) {
        if(pageIndex===this.currentPage)return;
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
        this.$messageContainer.on("click", "." + eventClass, function (e) {
            e.preventDefault();
            var id = Utilities.toInt(Utilities.getId($(this).attr("id")));
            if (isNaN(id)) {
                id = Utilities.getId($(this).attr("id"));
            }
            self.entryEvent(id, e);
        });
        this.entryBound = true;
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
        //default start and end in current page group
        var startPage = 1, endPage = pageTotal;

        //step 1根据currentPage判断是处于哪一个分页组 即获取startPage和endPage
        var pageGroupSize = Math.ceil(pageTotal / this.maxSize);//分页组组数
        var currentPageGroupIndex = Math.ceil(currentPageIndex / this.maxSize);//当前页处于的分页组

        //step 2(optional)如果存在多个分页组 则重新计算startPage和endPage
        if (pageGroupSize > 1) {
            //*** Visible pages are paginated with maxSize
            startPage = (currentPageGroupIndex - 1 ) * this.maxSize + 1;

            // Adjust last page if limit is exceeded
            endPage = Math.min(startPage + this.maxSize - 1, pageTotal);
        }

        //step 3 根据startPage和endPage生成分页数组
        for (var number = startPage; number <= endPage; number++) {
            var page = makePage(number, number);//first is pageIndex ,second is text
            pageViewList.push(page);
        }

        //step 4(optional)如果存在多个分页组 则设置切换分页组的链接
        if (pageGroupSize > 1) {
            //添加切换分页组的链接
            if (startPage > 1) {//非第一个分页组
                pageViewList.unshift(makePage(startPage - 1, '...'));
            }
            if (endPage < pageTotal) {//非最后一个分页组
                pageViewList.push(makePage(endPage + 1, '...'));
            }
        }

        //step 3渲染这个分页组分页组 根据divBuf生成buf
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
        this.$pn.children("#" + this.pageNumberId + "_" + this.currentPage).addClass("active");
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
            this.unregisterFilterEvent();
            this.unregisterSortEvent();
            this.$messageContainer.off();
            this.$messageContainer.empty();
            this.$messageContainer = null;
            this.eventBound = false;
            this.isClosed = true;
        }
    }
});