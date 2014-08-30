var MultiPageView = Backbone.View.extend({
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
     * @param extPn: external page navigator
     * @param _filters: private member holding registered filters, should never be referenced from external

     //TODO:
     */
    maxSize: 8, //分页组的最大容量
    entryTemplate: "", //单条记录的模板
    entryContainer: "", //结果列表
    entryClass: "", //每条记录的样式
    pageNavigator: "", //分页数据的container
    pageNavigatorClass: "",//container的样式
    pageEntryNumber: 10,//每页显示的记录数
    startIndex: 0,//开始记录数
    currentPage: 1,//当前页数
    pageNumberClass: "",//分页数字的样式
    pageNumberId: "",
    entryEvent: "",//绑定在每条记录上的事件
    allMessages: [],//获取的所有数据
    messages: null,//页面上面显示的经过过滤的信息(在假分页状态下)
    entryHeight: -1,
    entryRowNum: 1,
    minHeight: 0,
    noMessage: _.template("暂无消息"),
    eventBound: false,
    $domContainer: null,
    initialize: function () {
        _.bindAll(this, "render", "toPage", "bindEntryEvent", "setPageNavigator", "clickPageHandler",
            "clickPreHandler", "clickNextHandler", "close");
    },
    fetchAction: function (page) {
    },
    render: function () {
        var buf = [], i, length, height, message;
        if (!this.messages instanceof Backbone.Collection) {
            this.messages = this.allMessages;
        }
        this.$domContainer = $("#" + this.entryContainer);
        this.$domContainer.empty();
        if (this.messages.length > 0) {
            if (this.table) {
                $(this.table).show();
                $(this.table).find(".noMessage").remove();
            }
            length = this.messages.length - this.startIndex;
            length = (length < this.pageEntryNumber) ? length : this.pageEntryNumber;
            for (i = 0; i < length; i++) {
                if (this.messages instanceof Backbone.Collection) {
                    message = this.messages.at(i + this.startIndex);
                } else {
                    message = this.messages[i + this.startIndex];
                }
                // if (message._toSimpleJSON) {
                //     buf[i] = this.entryTemplate(message._toSimpleJSON());
                // } else {
                buf[i] = this.entryTemplate(message._toJSON());
                //}
            }
            this.$domContainer.append(buf.join(""));
            buf = null;
            var $divs = this.$domContainer.children("div");
            if ($divs.length) {
                $divs.addClass(this.entryClass);
            }
            if (this.entryEvent && !this.eventBound) {
                this.bindEntryEvent();
                this.eventBound = true;
            }
        } else {
            if (!this.table) {
                this.$domContainer.append("<div class = 'noMessage'>" + this.noMessage() + "</div>");
            } else {
                $(this.table).hide();
                $(this.table).after("<div class = 'noMessage'>" + this.noMessage() + "</div>");
            }
        }
        if (this.autoHeight) {
            this.$domContainer.css("height", "auto");
        } else if (this.entryHeight) {
            height = Math.ceil(length / this.entryRowNum) * this.entryHeight;
            height = (height > this.minHeight) ? height : this.minHeight;
            this.$domContainer.css("height", height + "px");
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

    toPage: function (page) {
        if(page===this.currentPage)return;
        this.currentPage = page;
        this.startIndex = this.pageEntryNumber * (page - 1);
        this.fetchAction(page);
    },
    bindEntryEvent: function () {

        var self = this, eventClass = this.actionClass || this.entryClass;
        this.$domContainer.on("click", "." + eventClass, function (e) {
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
            if (this.extPn) {
                this.$pn.empty();
            } else {
                this.$pn.remove();
                this.$pn = null;
            }
            this.$pre = null;
            this.$next = null;
        }
        //TODO can auto detect table or div
        if (!this.extPn) {
            this.$domContainer.after($("<div>").attr("id", this.pageNavigator).attr("class", "blank1 page clearfix"));
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
        _.each(pageViewList,function(page){
            divBuf[3] = page.number;
            divBuf[7] = page.text;
            buf.push(divBuf.join(""));
        });
        /*page core end*/

        buf.push("<a class='next'></a>");
        html = buf.join("");
        this.$pn.off()
            .empty()
            .append(html)
            .addClass(this.pageNavigatorClass);
        this.$pre = this.$pn.children(".pre");
        this.$next = this.$pn.children(".next");
        this.$pn.children("#" + this.pageNumberId + "_" + currentPageIndex).addClass("active");
        this.$pn.on("click", "." + this.pageNumberClass, this.clickPageHandler);


        if (this.currentPage === 1) {
            //首页
            this.$pre.addClass("pre-disabled");
        } else {
            //首页除外
            this.$pre.on("click", this.clickPreHandler);
        }
        if (this.currentPage === pageTotal) {
            //末页
            this.$next.addClass("next-disabled");
        } else {
            //末页除外
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

    close: function () {
        if (!this.isClosed) {
            if (this.$pn) {
                this.$pn.children("." + this.pageNumberClass).off();
            }
            this.$domContainer.off();
            this.$domContainer.empty();
            this.$domContainer = null;
            this.eventBound = false;
            this.isClosed = true;
        }
    }
});
