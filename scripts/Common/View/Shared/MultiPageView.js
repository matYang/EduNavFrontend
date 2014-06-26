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
    * @param actionClass: If this attribute is set, instead of entryClass, doms with this class will be bind to the entryEvent action when they are clicked
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
    * @param extPn: external page navigator
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
    noMessage: _.template("暂无消息"),
    _filters: [],
    _sorter: [],
    eventBound: false,
    $domContainer: null,
    singlePage: null,
    initialize: function () {
        _.bindAll(this, "render", "toPage", "bindEntryEvent", "setPageNavigator", "clickPageHandler", "clickPreHandler", "clickNextHandler", "close");
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
                buf[i] = this.entryTemplate(message._toJSON());
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
        if (this.entryHeight) {
            height = Math.ceil(length / this.entryRowNum) * this.entryHeight;
            height = (height > this.minHeight) ? height : this.minHeight;
            this.$domContainer.css("height", height + "px");
        }
        if (this.messages.length > this.pageEntryNumber) {
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
        this.currentPage = page;
        this.startIndex = this.pageEntryNumber * (page - 1);
        this.render();
    },
    bindEntryEvent: function () {

        var self = this, eventClass = this.actionClass || this.entryClass;
        this.$domContainer.on("click", "." + eventClass, function (e) {
            e.preventDefault();
            var id = Utilities.getId($(this).attr("id"));
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
            this.$domContainer.after($("<div>").attr("id", this.pageNavigator).attr("class", "blank1 page clearfix"));
        }
        this.$pn = $("#" + this.pageNavigator);
        length = this.messages ? this.messages.length : 0;
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
    registerFilterEvent: function ($selector, filter, inst, callback) {
        var that = this;
        if ($selector.prop("tagName") === "SELECT") {
            $selector.on("change", function () {
                that.currentPage = 1;
                if (that.allMessages) {
                    if (filter) {
                        that.messages.reset(that.allMessages.filter(filter, inst));
                    } else {
                        that.messages.reset(that.allMessages.toArray());
                    }
                }
                inst.render();
                if (callback) {
                    callback.call(inst);
                }
            });
        } else if ($selector.attr("type") === "checkbox") {
            $selector.on("change", function () {
                that.currentPage = 1;
                if (that.allMessages) {
                    if (filter) {
                        that.messages.reset(that.allMessages.filter(filter, inst, true));
                    } else {
                        that.messages.reset(that.allMessages.toArray());
                    }
                }
                inst.render();
                if (callback) {
                    callback.call(inst);
                }
            });
        } else {
            $selector.on("click", function () {
                that.currentPage = 1;
                $selector.siblings().removeClass("active");
                $selector.addClass("active");
                if (that.allMessages) {
                    if (filter) {
                        that.messages.reset(that.allMessages.filter(filter, inst));
                    } else {
                        that.messages.reset(that.allMessages.toArray());
                    }
                }
                inst.render();
                if (callback) {
                    callback.call(inst);
                }
            });
        }
        this._filters.push($selector);
    },
    unregisterFilterEvent: function () {
        var i;
        for (i = 0; i < this._filters.length; i++) {
            this._filters[i].off();
        }
        this._filters = [];
    },
    registerSortEvent: function ($selector, sorter, desc, inst, callback) {
        var that = this;
        $selector.on("click", function () {
            $selector.siblings().removeClass("active");
            $selector.addClass("active");
            var descFlag, list;
            if (typeof desc === "string" && inst) {
                descFlag = inst[desc];
            } else {
                descFlag = desc;
            }
            if (that.messages) {
                if (typeof sorter === "string") {
                    list = that.messages.sortBy(sorter);
                } else if (typeof sorter === "function") {
                    that.allMessages.Comparator = sorter;
                    list = that.messages.sortBy(sorter);
                } else {
                    list = that.messages.toArray();
                }
            }
            if (descFlag) {
                list = list.reverse();
            }
            that.messages.reset(list);
            inst.render();
            if (callback) {
                callback.call(inst);
            }
        });
        this._sorter.push($selector);
    },
    unregisterSortEvent: function () {
        var i;
        for (i = 0; i < this._sorter.length; i++) {
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
            this.unregisterSortEvent();
            this.$domContainer.off();
            this.$domContainer.empty();
            this.$domContainer = null;
            this.eventBound = false;
            this.isClosed = true;
        }
    }
});
