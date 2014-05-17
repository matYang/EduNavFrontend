var MultiPageView = Backbone.View.extend({
    /*
    * @brief
        This class is designed to display a set of messages in a view separated by page numbers. 
        Other views can extend this view and configure the setting according to the needs.
        This base view provide the following features: page navigation, filtering

    *
    * @param entryTemplate: the template of each single entry
    * @param entryContainer: id of the tag for displaying message
    * @param entryClass: the class name for all entry in this view (style, event)
    * @param pageNavigator: the div holding all page numbers
    * @param pageNavigatorClass: the class name for the page navigator (style)
    * @param pageEntryNumber: the number of entry displayed in each page
    * @param startIndex: the starting index at first render
    * @param currentPage: the index number of currentPage
    * @param pageNumberClass: the class for each page number (style)
    * @param pageNumberId: the base id for the page numbers in the form of pageId_, number will be appended to the end for event use
    * @param entryEvent: the click event bind to each message entry.
    * @param allMessage: all messages fetched from backend.
    * @param messages: the filtered messages to be displayed in the view
    *                   (including the ones in the pages not displaying, NOTE: it must be a different instance from allMessage in order for the collection event to work properly)
    * @param entryHeight: the height of each entry, including margins and paddings, used for calculating container height
    * @param entryRowNum: the number of entries displaying in the same row
    * @param minHeight: the minimum height of the message container
    * @param noMessage: the message displayed in the container when there's no message available

    * @param _filters: private member holding registered filters, should never be referenced from external

    //TODO: 
    */
    entryTemplate: "",
    entryContainer: "",
    entryClass: "",
    pageNavigator: "",
    pageNavigatorClass: "",
    pageEntryNumber: 10,
    startIndex: 0,
    currentPage: 1,
    pageNumberClass: "",
    pageNumberId: "",
    entryEvent: "",
    allMessages: [],
    messages: null,
    entryHeight: -1,
    entryRowNum: 1,
    minHeight: 0,
    noMessage: "暂无消息",
    _filters:[],
    _sorter:[],
    eventBound: false,
    $domContainer: null,
    initialize: function () {
        _.bindAll(this, "render", "toPage", "bindEntryEvent", "setPageNavigator", "close");
    },

    render: function () {
        if (!this.messages instanceof Backbone.Collection) {
            this.messages = this.allMessages;
        }
        this.$domContainer = this.$domContainer || $("#"+this.entryContainer);
        this.$domContainer.empty();
        if (this.messages.length > 0) {
            var buf = [], i, length = this.messages.length - this.startIndex;
            length = (length < this.pageEntryNumber) ? length : this.pageEntryNumber;
            for ( i = 0; i < length; i++) {
                var message;
                if (this.messages instanceof Backbone.Collection) {
                    message = this.messages.at(i + this.startIndex);
                } else {
                    message = this.messages[i + this.startIndex];
                }
                buf[i] = this.entryTemplate(message._toJSON());
            }
            this.$domContainer.append(buf.join(""));
            this.$domContainer.children("div").addClass(this.entryClass);
            if (this.entryEvent && !this.eventBound) {
                this.bindEntryEvent();
                this.eventBound = true;
            }
        } else {
            this.$domContainer.append("<div class = 'noMessage'>"+this.noMessage+"</div>");
        }
        if (this.entryHeight) {
            var height = Math.ceil(length / this.entryRowNum) * this.entryHeight;
            height = (height > this.minHeight) ? height : this.minHeight;
            this.$domContainer.css("height", height + "px");
        }
        if (this.messages.length > this.pageEntryNumber) {
            this.setPageNavigator();
        }
        if (this.afterRender) {
            this.afterRender();
        }
        this.messages.on("change", this.render);
    },
    toPage: function (page) {
        this.currentPage = page;
        this.startIndex = this.pageEntryNumber * (page - 1);
        this.render();
    },
    bindEntryEvent: function () {
        var self = this;
        this.$domContainer.on("click", "." + this.entryClass, function (e) {
            e.preventDefault();
            var id = Utilities.getId($(this).attr("id"));
            self.entryEvent(id, e);
        });
        this.entryBound = true;
    },
    setPageNavigator: function () {
        if (this.$pn && this.$pn.length) {
            this.$pn.children("." + this.pageNumberClass).off();
            this.$pn.children(".pre").off();
            this.$pn.children(".next").off();
            this.$pn.remove();
        }
        this.$domContainer.after($("<div>").attr("id", this.pageNavigator).attr("class", "mainPage-searchResult-multiPage-pageNum clearfix"));
        this.$pn = $("#" + this.pageNavigator);
        var length = this.messages ? this.messages.length : 0;
        var pages = Math.floor(length / this.pageEntryNumber) + 1;
        this.pages = pages;
        pages = pages > 10 ? 10 : pages;
        var buf = ['<a class="pre"></a>'];
        var divBuf = ["<a id='", this.pageNumberId, "_", 0, "' class='", this.pageNumberClass, "'> ", 0, "</a>"];
        for (var i = 1; i <= pages; i++) {
            divBuf[3] = i;
            divBuf[7] = i;
            buf.push(divBuf.join(""));
        }
        if (this.pages > 10) {
            buf.push("<span>...</span>");
        }
        buf.push("<a class='next'></a>");
        var html = buf.join("");
        this.$pn.empty()
                .append(html)
                .addClass(this.pageNavigatorClass);
        this.$pre = this.$pn.children(".pre");
        this.$next = this.$pn.children(".next");
        var self = this;
        this.$pn.on("click", "." + this.pageNumberClass, function (e) {
            var id = Utilities.toInt(Utilities.getId(e.target.id));
            self.toPage(id);
        });
        if (this.currentPage === 1) {
            this.$pre.addClass("pre-disabled");
        } else {
            this.$pre.on("click", function (e) {
                self.toPage(self.currentPage-1);
            });
        }
        if (this.currentPage === pages) {
            this.$next.addClass("next-disabled");
        } else {
            this.$next.on("click", function (e) {
                self.toPage(self.currentPage + 1);
            });
        }
    },
    bindCollectionEvent: function(){
        //
        this.messages.on("change", function(){

        });
    },
    /*
    active class should be the class indicating the selected tab/filter across the entire site.
    Therefore it is hardcoded here.
    */
    registerFilterEvent: function ($selector, filter, inst, callback) {
        var that = this;
        if ($selector.prop("tagName") === "SELECT") {
            $selector.on("change", function (e) {
                if (that.allMessages) {
                    if (filter) {
                        that.messages.reset(that.allMessages.filter(filter));
                    } else {
                        that.messages.reset(that.allMessages.toArray());
                    }
                }
                inst.render();
                if (callback){
                    callback.call(inst);
                }
            });
        } else {
            $selector.on("click", function (e) {
                $selector.siblings().removeClass("active");
                $selector.addClass("active");
                if (that.allMessages) {
                    if (filter) {
                        that.messages.reset(that.allMessages.filter(filter));
                    } else {
                        that.messages.reset(that.allMessages.toArray());
                    }
                }
                inst.render();
                if (callback){
                    callback.call(inst);
                }
            });
        }
        this._filters.push($selector);
    },
    unregisterFilterEvent: function() {
        for (var i = 0; i < this._filters.length; i++) {
            this._filters[i].off();
        }
        this._filters = [];
    },
    registerSortEvent: function ($selector, sorter, desc, inst, callback) {
        $selector.on("click", function (e) {
            $selector.siblings().removeClass("active");
            $selector.addClass("active");
            if (that.allMessages) {
                if (typeof sorter === "string") {
                    that.messages.reset(that.allMessages.sortBy(sorter));
                } else if (typeof sorter === "function"){
                    that.allMessages.Comparator = sorter;
                    that.messages.reset(that.allMessages.sortBy(sorter));
                } else {
                    that.messages.reset(that.allMessages.toArray());
                }
            }
            if (desc) {
                that.messages.reverse();
            }
            inst.render();
            if (callback){
                callback.call(inst);
            }
        });
        this._sorter.push($selector);
    },
    unregisterSortEvent: function () {
        for (var i = 0; i < this._sorter.length; i++) {
            this._sorter[i].off();
        }
        this._sorter = [];
    },
    close: function () {
        if (!this.isClosed) {
            if (this.$pn) {
                this.$pn.children("." + this.pageNumberClass).off();
            }
            this.unregisterFilterEvent();
            this.$domContainer.off();
            this.$domContainer.empty();
            this.isClosed = true;
        }
    }
});
