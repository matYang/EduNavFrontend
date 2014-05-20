var searchView = Backbone.View.extend({
    el: '#content',
    initialize: function (params) {
        _.bindAll(this, 'render', 'renderSearchResults', 'courseSearch', 'submitSearch', 'bindEvents', 'close');
        app.viewRegistration.register("mainPage", this, true);
        this.isClosed = false;
        this.rendered = false;
        this.user = app.sessionManager.getSessionUser();
        //define the template
        this.template = _.template(tpl.get('main'));
        this.currentPage = 0;
        if (params) {
            try {
                this.searchRepresentation.castFromString(params.searchKey);
            } catch (e) {

                app.navigate("/main", true);
            }
            app.storage.setSearchRepresentationCache(this.searchRepresentation);
        } else if (app.sessionManager.hasSession()) {
            this.searchRepresentation = this.user.get('searchRepresentation');
        } else {
            this.searchRepresentation = app.storage.getSearchRepresentationCache();
        }
        //injecting the template
        this.$el.append(this.template);
        //TODO force target type to be all
        
        this.render();
    },

    courseSearch: function () {
        app.courseManager.searchMessage(this.searchRepresentation, {
            "success": this.renderSearchResults,
            "error": this.renderError
        });
    },
    render: function () {
        var me = this, mapParams = {
            div: "mainMap",
            class: "mainPage-map",
            originLocation: this.origin,
            destLocation: this.dest,
            clickable: false
        };
        this.map = app.storage.getViewCache("MapView", mapParams);
        $("#dateStart").datepicker({
            buttonImageOnly: true,
            buttonImage: "calendar.gif",
            buttonText: "Calendar",
            minDate: new Date (),
            onSelect: function (text, inst) {
                var d = new Date ();
                d.setDate(inst.selectedDay);
                d.setMonth(inst.selectedMonth);
                d.setYear(inst.selectedYear);
                me.searchRepresentation.set("date", d);
                $(this).val(Utilities.getDateString(me.searchRepresentation.get("date")));
            }
        });

        this.courseSearch();
        this.bindEvents();
        this.rendered = true;
    },

    renderSearchResults: function (searchResults) {
        //prevent memory leaks
        $("#searchResultDisplayPanel").empty();
        if (this.searchResultView) {
            this.searchResultView.close();
        }
        this.allMessages = searchResults;
        this.filteredMessages = this.filterMessage(this.allMessages);
        this.searchResultView = new SearchResultView (this.allMessages, this.filteredMessages, true);
    },

    renderError: function () {
        this.$resultp = this.$resultp || $("#searchResultDisplayPanel");
        this.$resultp.empty().append("<div class = 'noMessage'>暂无消息</div>");
    },

    submitSearch: function () {
        if (!(this.$dateDepart.val() && this.$locationFrom.val() && this.$locationTo.val())) {
            return;
        } else if (!this.$dateReturn.val() && this.filter.isRoundTrip) {
            return;
        }
        app.navigate("main/" + this.searchRepresentation.toString(), {'trigger': false});
        this.searchRepresentation.set("departureMatch_Id", this.origin.get("defaultId"));
        this.searchRepresentation.set("arrivalMatch_Id", this.dest.get("defaultId"));
        $("#searchResultDisplayPanel").empty().append('<div class="messageDetail-middle-autoMatch-loading">正在为您寻找信息</div>');
        app.courseManager.searchMessage(this.searchRepresentation, {
            "success": this.renderSearchResults,
            "error": this.renderError
        });
        app.storage.setSearchRepresentationCache(this.searchRepresentation);
    },

    bindEvents: function () {
        var self = this;

        this.$search = $("#search").on("click", function (e) {
            me.submitSearch();
        });
    },

    close: function () {
        if (!this.isClosed) {
            //removing all event handlers
            if (this.rendered) {
                if (this.map) {
                    this.map.close();
                }
                this.closeLocationDropDown();
                if (this.searchResultView) {
                    this.searchResultView.close();
                }
            }

            //get ride of the view
            this.unbind();
            this.$el.empty();

            this.isClosed = true;
        }
    } 
});