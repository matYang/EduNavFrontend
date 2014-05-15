var PRICE_MIN = 0, PRICE_MAX = 200;

var MainPageView = Backbone.View.extend({
    el: '#content',

    filter: {
        "isRoundTrip": false,
        "time1": "all",
        "time2": "all",
        "type": Constants.messageType.both,
        "priceMin": PRICE_MIN,
        "priceMax": PRICE_MAX
    },

    initialize: function (params) {
        _.bindAll(this, 'render', 'renderSearchResults', 'messageSearch', 'onClickTime', 'onClickType', 'submitSearch', 'refresh', 'bindEvents', 'close');
        app.viewRegistration.register("mainPage", this, true);
        this.isClosed = false;
        this.rendered = false;
        this.user = app.sessionManager.getSessionUser();
        //define the template
        this.template = _.template(tpl.get('main'));
        this.searchRepresentation = new SearchRepresentation ();
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
        this.searchRepresentation.set('targetType', Constants.messageType.both);
        app.locationService.getDefaultLocations(this.render, this);

        //after data intialiazation, start render curreny view
    },

    messageSearch: function () {
        app.courseManager.searchMessage(this.searchRepresentation, {
            "success": this.renderSearchResults,
            "error": this.renderError
        });
    },
    closeLocationDropDown: function(){
        if (typeof this.locationDropDownView !== 'undefined' && this.locationDropDownView !== null){
            this.locationDropDownView.close();
        }
    },
    acceptDefaultLocation: function(defaultLocation){
        if (this.locationDirection === Constants.LocationDirection.from){
            this.origin = defaultLocation;
            this.$locationFrom.val(this.origin.toUiString());
        }
        else if (this.locationDirection === Constants.LocationDirection.to){
            this.dest = defaultLocation;
            this.$locationTo.val(this.dest.toUiString());
        }
        if (this.map) {
            this.map.getDirection(this.origin, this.dest);
        }
        if (this.$locationFrom.val() && this.$locationTo.val()) {
            this.submitSearch();
        }
    },

    render: function () {
        this.$locationFrom = $("#searchLocationInput_from");
        this.$locationTo = $("#searchLocationInput_to");
        this.$type = $("#typeSelections");
        this.origin = (this.searchRepresentation.get("departureMatch_Id")>-1 ) ? this.defaultLocations.where({"defaultId":this.searchRepresentation.get("departureMatch_Id")})[0] : this.defaultLocations.at(0);
        this.dest = (this.searchRepresentation.get("arrivalMatch_Id")>-1 ) ? this.defaultLocations.where({"defaultId":this.searchRepresentation.get("arrivalMatch_Id")})[0] : this.defaultLocations.at(1);

        this.$locationFrom.val(this.origin.toUiString());
        this.$locationTo.val(this.dest.toUiString());
        var me = this, mapParams = {
            div: "mainMap",
            class: "mainPage-map",
            originLocation: this.origin,
            destLocation: this.dest,
            clickable: false
        };



        this.map = app.storage.getViewCache("MapView", mapParams);
        this.$dateDepart = $("#searchDateInput_depart").datepicker({
            buttonImageOnly: true,
            buttonImage: "calendar.gif",
            buttonText: "Calendar",
            minDate: new Date (),
            onSelect: function (text, inst) {
                var d = new Date ();
                d.setDate(inst.selectedDay);
                d.setMonth(inst.selectedMonth);
                d.setYear(inst.selectedYear);
                me.searchRepresentation.set("departureDate", d);
                $(this).val(Utilities.getDateString(me.searchRepresentation.get("departureDate")));
                me.submitSearch();
            }
        });
        this.$dateReturn = $("#searchDateInput_return").datepicker({
            buttonImageOnly: true,
            buttonImage: "calendar.gif",
            buttonText: "Calendar",
            minDate: new Date (),
            onSelect: function (text, inst) {
                var d = new Date ();
                d.setDate(inst.selectedDay);
                d.setMonth(inst.selectedMonth);
                d.setYear(inst.selectedYear);
                me.searchRepresentation.set("arrivalDate", d);
                $(this).val(Utilities.getDateString(me.searchRepresentation.get("arrivalDate")));
                me.submitSearch();
            }
        });
        this.$swap = $("#swap").on("click", function() {
            me.map.getDirection(me.dest, me.origin);
            var temp;
            temp = me.origin;
            me.origin = me.dest;
            me.dest = temp;
            me.$locationFrom.val(me.origin.toUiString());
            me.$locationTo.val(me.dest.toUiString());
            me.submitSearch();
        });
        var dd = this.searchRepresentation.get("departureDate"), now = new Date();
        if (dd.getTime() < now.getTime()) {
            this.searchRepresentation.set("departureDate", now);
        }
        this.$dateDepart.val(Utilities.getDateString(this.searchRepresentation.get("departureDate")));
        me.filter.isRoundTrip = me.searchRepresentation.get("isRoundTrip");
        var $stc = $("#searchTypeContainer");
        $stc.children(".active").removeClass("active");
        this.$spans = $stc.children("span");
        if (!me.filter.isRoundTrip) {
            this.$dateReturn.prop("disabled", true).parent().addClass("date-return-disabled");
            this.$spans.first().addClass("active");
        } else {
            dd = this.searchRepresentation.get("arrivalDate");
            if (dd.getTime() < now.getTime()) {
                this.searchRepresentation.set("arrivalDate", now);
            }
            this.$dateReturn.val(Utilities.getDateString(this.searchRepresentation.get("arrivalDate")));
            this.$spans.last().addClass("active");
        }
        this.$spans.on("click", function(e){
            $stc.children(".active").removeClass("active");
            $(e.target).addClass("active");
            if ($(e.target).attr("data-id") == "roundtrip") {
                me.filter.isRoundTrip = true;
                me.$dateReturn.removeAttr("disabled");
                me.$dateReturn.parent().removeClass("date-return-disabled");
            } else {
                me.filter.isRoundTrip = false;
                me.$dateReturn.prop("disabled", true);
                me.$dateReturn.parent().addClass("date-return-disabled");
            }
            me.searchRepresentation.set('isRoundTrip', me.filter.isRoundTrip);
            me.submitSearch();
        });
        this.$search = $("#search").on("click", function (e) {
            me.submitSearch();
        });
        this.messageSearch();
        this.bindEvents();
        this.rendered = true;
    },

    renderSearchResults: function (searchResults) {
        //prevent memory leaks
        $("#searchResultDisplayPanel").empty();
        if (this.searchResultView) {
            this.searchResultView.close();
        }
        $("#originText").html(this.$locationFrom.val());
        $("#destText").html(this.$locationTo.val());
        $("#numberText").html(searchResults.length);
        this.allMessages = searchResults;
        this.filteredMessages = this.filterMessage(this.allMessages);
        this.searchResultView = new SearchResultView (this.allMessages, this.filteredMessages, true);
    },

    renderError: function () {
        this.$resultp = this.$resultp || $("#searchResultDisplayPanel");
        this.$resultp.empty().append("<div class = 'noMessage'>暂无消息</div>");
    },

    onClickTime: function (e, parentId) {
        var me = $('#' + e.id);
        $("#" + parentId + ">.selected").removeClass('selected').addClass('notSelected');
        me.removeClass('notSelected').addClass('selected');
        var time = e.target.getAttribute("data-id");
        this.filter.time1 = time;
    },

    onClickType: function (e) {
        this.$type.children(".active").removeClass('active');
        $(e.target).addClass('active');
        if (e.target.getAttribute("data-id") === "passenger"){
            this.filter.type = Constants.messageType.ask;
        } else if (e.target.getAttribute("data-id") === "driver") {
            this.filter.type = Constants.messageType.help;
        } else {
            this.filter.type = Constants.messageType.both;
        }
        this.refresh();
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

    refresh: function () {
        this.filteredMessages.reset(this.filterMessage(this.allMessages));
        this.searchResultView.messages.reset(this.filteredMessages);

    },

    filterMessage: function (messages) {
        var filtered = new Messages ();
        var l = messages ? messages.length : 0;
        for (var i = 0; i < l; i++) {
            var m = messages.at(i);
            // var dt = m.get("departure_timeSlot");
            // var rt = m.get("arrival_timeSlot");
            // if (this.searchRepresentation.get("departureLocation").isEquivalentTo(m.get("departure_location"))) {
            //     if (this.filterTime(this.filter.time1, dt)) {
            //         filtered.add(m);
            //     }
            //     if (this.filter.isRoundTrip && this.filterTime(this.filter.time2, rt)) {
            //         filtered.add(m);
            //     }
            // } else if (m.get("isRoundTrip") && this.searchRepresentation.get("departureLocation").isEquivalentTo(m.get("arrival_location"))) {
            //     if (this.filterTime(this.filter.time2, dt)) {
            //         filtered.add(m);
            //     }
            //     if (this.filter.isRoundTrip && this.filterTime(this.filter.time1, rt)) {
            //         filtered.add(m);
            //     }

            // }
            if (this.filter.type === Constants.messageType.both || this.filter.type === m.get("type")) {
                filtered.add(m);
            }
        }
        return filtered;
    },

    filterTime: function (time, timeslot) {
        if (time === 'all') {
            return true;
        } else if (time === "morning" && timeslot < Utilities.getDayTimeSlot_afternoonStart()) {
            return true;
        } else if (time === "afternoon" && (timeslot >= Utilities.getDayTimeSlot_afternoonStart() && timeslot < Utilities.getDayTimeSlot_nightStart())) {
            return true;
        } else if (time === "night" && (timeslot >= Utilities.getDayTimeSlot_nightStart())) {
            return true;
        } else {
            return false;
        }
    },

    filterPrice: function (price, maxPrice) {
        return price <= maxPrice;
    },

    updateLocation: function (id) {
        // var custTemp;
        // if (id === "searchLocationInput_from") {
        //     this.$locationFrom.val(this.searchRepresentation.get("departureLocation").get("city"));
        //     cust = this.searchRepresentation.get("departureLocation").get("point");
        //     if (cust !== "undetermined") {
        //         $("#customizeLocationInput_from").val(cust);
        //     }
        // } else {
        //     this.$locationTo.val(this.searchRepresentation.get("arrivalLocation").get("city"));
        //     cust = this.searchRepresentation.get("arrivalLocation").get("point");
        //     if (cust !== "undetermined") {
        //         $("#customizeLocationInput_to").val(cust);
        //     }
        // }
    },

    bindEvents: function () {
        var self = this;
        this.$locationFrom.on('focus', function (e) {
            self.closeLocationDropDown();
            self.locationDirection = Constants.LocationDirection.from;
            self.closeLocationDropDown();
            self.locationDirection = Constants.LocationDirection.from;
            self.locationDropDownView = new LocationDropDownView($("#from"), self);
        });

        this.$locationTo.on('focus', function (e) {
            self.closeLocationDropDown();
            self.locationDirection = Constants.LocationDirection.to;
            self.closeLocationDropDown();
            self.locationDirection = Constants.LocationDirection.to;
            self.locationDropDownView = new LocationDropDownView($("#to"), self);
        });

        //do not remove this, must have to avoid e propagating to body
        this.$locationFrom.on('click', function (e) {
            e.stopPropagation();
        });
        this.$locationTo.on('click', function (e) {
            e.stopPropagation();
        });

        // this.$locationFrom.on('blur', function (e) {
        //     if ($(this).val() && self.$locationTo.val() ) {
        //         self.submitSearch();
        //     }
        // });

        // this.$locationTo.on('blur', function (e) {
        //     if ($(this).val() && self.$locationTo.val() ) {
        //         self.submitSearch();
        //     }
        // });

        // $("#timeSelections1>.button").on('click', function (e) {
        //     self.onClickTime(e, "timeSelections1");
        // });

        // $("#timeSelections2>.button").on('click', function (e) {
        //     self.onClickTime(e, "timeSelections2");
        // });

        this.$type.children("span").on('click', function (e) {
            self.onClickType(e);
        });
        // $("#priceFilter>input").on("input", function (e) {
        //     self.searchResultView.messages.reset(self.filterMessage(self.allMessages));
        // });
        $("#refreshButton").on('click', function (e) {
            self.refresh(e);
        });

        // this.$custFrom.on("blur", function (e) {
        //     self.originLocation.set("pointAddress", this.value);
        //     self.submitSearch();
        // });
        // this.$custTo.on("blur", function (e) {
        //     self.destLocation.set("pointAddress", this.value);
        //     self.submitSearch();
        // });

    },

    close: function () {
        if (!this.isClosed) {
            //removing all event handlers
            if (this.rendered) {
                if (this.map) {
                    this.map.close();
                }
                this.$type.children("span").off();
                this.$locationFrom.off();
                this.$locationTo.off();
                this.$swap.off();
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
