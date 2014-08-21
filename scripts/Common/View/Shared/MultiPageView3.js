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
     * @param extPn: external page navigator
     * @param _filters: private member holding registered filters, should never be referenced from external

     //TODO:
     */
    entryTemplate: "", //单条记录的模板
    entryContainer: "", //结果列表
    truePagination: true, //为true时必须指定fetchAction函数用于与后台交互获取分页数据
    entryClass: "", //每条记录的样式
    pageNavigator: "", //分页数据的container
    pageNavigatorClass: "",//container的样式
    pageEntryNumber: 10,//每页显示的记录数
    startIndex: 0,//开始记录数
    currentPage: 1,//当前页数
    pageNumberClass: "",//分页数字的样式
    pageNumberId: "",
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
    initialize: function () {
        _.bindAll(this, "render", "toPage", "bindEntryEvent", "setPageNavigator", "clickPageHandler",
            "clickPreHandler", "clickNextHandler", "close");
        if($("#" + this.entryContainer)[0].tagName ==='TBODY'){
            this.isTable = true;
        }
    },
    fetchAction: function (page) {
    },
    render: function () {
        //获取完数据后需要进行数据的展示
        var buf = [], i, length, height, message;
        this.$messageContainer = $("#" + this.entryContainer);
        this.$messageContainer.empty();
        if (this.messages.length > 0) {
            //这里设置显示的数据
            length = this.messages.length - this.startIndex;
            length = (length < this.pageEntryNumber) ? length : this.pageEntryNumber;

            this.messages.each(function(message){
                buf.push(this.entryTemplate(message._toJSON()));
            });
            for(i in items){

            }
            this.$messageContainer.append(buf.join(""));
            buf = null;
            if (this.entryEvent && !this.eventBound) {
                //绑定进入详情页的事件
                this.bindEntryEvent();
                this.eventBound = true;
            }
        } else {
            if (!this.table) {
                this.$messageContainer.append("<div class = 'noMessage'>" + this.noMessage() + "</div>");
            } else {
                this.$messageContainer.append("<tr><td colspan='4'><div class = 'noMessage'>" + this.noMessage() + "</div></td></tr>");
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
            pages,
            length,
            i,
            html;
        if (this.singlePage) {
            return;
        }

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
        if (!this.extPn) {
            this.$messageContainer.after($("<div>").attr("id", this.pageNavigator).attr("class", "blank1 page clearfix"));
        }
        this.$pn = $("#" + this.pageNavigator);
        if (this.truePagination) {
            length = this.messages ? this.messages.total : 0;
        } else {
            length = this.messages ? this.messages.length : 0;
        }
        pages = Math.ceil(length / this.pageEntryNumber);
        this.pages = pages;
        pages = pages > 10 ? 10 : pages;
        for (i = 1; i <= pages; i++) {
            divBuf[3] = i;
            divBuf[7] = i;
            buf.push(divBuf.join(""));
        }
        if (this.pages > 10) {
            buf.push("<span>...</span>");
        }
        buf.push("<a class='next'></a>");
        html = buf.join("");
        this.$pn.off()
            .empty()
            .append(html)
            .addClass(this.pageNavigatorClass);
        this.$pre = this.$pn.children(".pre");
        this.$next = this.$pn.children(".next");
        this.$pn.children("#" + this.pageNumberId + "_" + this.currentPage).addClass("active");
        this.$pn.on("click", "." + this.pageNumberClass, this.clickPageHandler);
        if (this.currentPage === 1) {
            this.$pre.addClass("pre-disabled");
        } else {
            this.$pre.on("click", this.clickPreHandler);
        }
        if (this.currentPage === pages) {
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
