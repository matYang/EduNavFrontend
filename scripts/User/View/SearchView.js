var searchView = Backbone.View.extend({
    el: '#content',
    initialize: function (params) {
        _.bindAll(this, 'render', 'renderSearchResults', 'courseSearch', 'submitSearch', 'bindEvents', 'close');
        app.viewRegistration.register("search", this, true);
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
        } else {
            this.searchRepresentation = app.storage.getSearchRepresentationCache("course");
        }
        //injecting the template
        this.$el.append(this.template);
        //TODO force target type to be all
        this.render();
        this.compareWidgetView = new CompareWidgetView();
    },
    render: function () {
        var me = this, mapParams = {
            div: "mainMap",
            class: "mainPage-map",
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
    bindSearchEvents: function () {
        $("#searchInput_id").on("change", function() {
            that.sr.set("courseId", Utilities.toInt($(this).val()) );
        });
        $("#searchInput_schoolName").on("change", function() {
            that.sr.set("institutionName", $(this).val());
        });
        $("#searchInput_category").on("change", function() {
            var category = $(this).val();
            that.sr.set("category", category);
            that.sr.set("subCategory", undefined);
            that.renderSubCategory(category);
        });
        $("#searchInput_subCategory").on("change", function() {
            that.sr.set("subCategory", $(this).val());
        });
        $("#searchInput_city").on("change", function() {
            var city = $(this).val();
            that.sr.set("city", city);
            that.sr.set("district", undefined);
            that.renderDistrict(city);
        });
        $("#searchInput_district").on("change", function() {
            that.sr.set("district", $(this).val());
        });
    },
    renderSearchResults: function (searchResults) {
        //prevent memory leaks
        $("#searchResultDisplayPanel").empty();
        this.allMessages = searchResults;
        if (!this.searchResultView) {
            this.searchResultView = new SearchResultView (this.allMessages, this.allMessages, this.compareWidgetView);
        } else {
            this.searchResultView.allMessages.reset(this.allMessages);
            this.searchResultView.messages.reset(this.allMessages);
            this.searchResultView.render();
        }
    },

    renderError: function () {
        this.$resultp = this.$resultp || $("#searchResultDisplayPanel");
        this.$resultp.empty().append("<div class = 'noMessage'>暂无消息</div>");
    },

    courseSearch: function () {
        
        app.navigate("search/" + this.searchRepresentation.toString(), {'trigger': false});
        $("#searchResultDisplayPanel").empty().append('<div class="messageDetail-middle-autoMatch-loading">正在为您寻找信息</div>');
        app.courseManager.searchMessage(this.searchRepresentation, {
            "success": this.renderSearchResults,
            "error": this.renderError
        });
        app.storage.setSearchRepresentationCache(this.searchRepresentation, "course");
    },

    bindEvents: function () {
        var that = this;
        this.$search = $("#search").on("click", function (e) {
            that.submitSearch();
        });
    },

    close: function () {
        if (!this.isClosed) {
            //removing all event handlers
            if (this.compareWidgetView) {
                this.compareWidgetView.close();
            }
            if (this.rendered) {
                if (this.map) {
                    this.map.close();
                }
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