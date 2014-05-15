var FrontPageView = Backbone.View.extend({

    el: '#content',
    displayIndex: 0,
    initialize: function () {
        _.bindAll(this, 'getRecents', 'render', 'bindEvents', 'bindRecentsEvents', 'renderRecents', 'updateLocation', 'scroll', 'acceptDefaultLocation', 'closeLocationDropDown', 'close');
        app.viewRegistration.register("frontPage", this, true);
        this.isClosed = false;
        this.temp = {};
        this.bottomRecentId = 0;
        this.template = _.template(tpl.get('front'));
        this.messageTemplate = _.template(tpl.get('SimpleMessage'));

        this.user = app.sessionManager.getSessionUser();

        this.searchRepresentation = app.storage.getSearchRepresentationCache();
        this.departLocation = new UserLocation();
        this.arrivalLocation = new UserLocation();
        this.locationDirection = Constants.LocationDirection.from;
        this.render();
        this.messages = app.storage.getRecentMessages();
        if (this.messages) {
            this.renderRecents(this.messages);
        } else {
        //fire async API call befire entering the time consuming events binding stage
            this.getRecents();
        }
        //app.sessionManager.fetchSession();
        this.bindEvents();

    },

    getRecents: function () {
        //passing renderRecents as the callback to be executed upon successful fetch
        this.$resultPanel.empty();
        app.courseManager.fetchRecents({
            "success": this.renderRecents,
            "error": this.renderError
        });
    },

    renderRecents: function (recents) {
        if (recents.length === 0) {
            this.renderError();
            return;
        }
        var jsons = recents;
        if (jsons instanceof Courses) {
            app.storage.setRecentMessages(recents);
            jsons = recents.toArray();
            for (var i = 0; i < jsons.length; i++) {
                jsons[i] = jsons[i]._toJSON();
            }
        }
        this.displayMessages = recents;
        var buf = [];
        while (this.displayIndex < 3 && this.displayIndex < recents.length) {
            buf.push(this.messageTemplate(jsons[this.displayIndex++]));
        }
        this.displayIndex = this.displayIndex % recents.length;
        this.$resultPanel.append(buf.reverse().join(""));
        this.bindRecentsEvents();
        this.rollInterval = setInterval(this.scroll, 5000);

    },

    render: function () {
        // this.$el.append(this.template);
        // this.$resultPanel = $("#frontPage-resultPanel");
        // $("#frontPage-exp>dt").hide();
        // $("#exp1").show();
        // $( '.cycle-slideshow' ).cycle({"slideCount":7, "log":false});
    },

    renderError: function () {
        // this.$resultPanel = this.$resultPanel || $("#frontPage-resultPanel");
        // this.$resultPanel.empty().append("<div class = 'noMessage'>暂无消息</div>");
    },

    bindEvents: function () {
        var self = this;
        // this.$from = $("#from").children("input").on("focus", function (e) {
        //     self.closeLocationDropDown();
        //     self.locationDirection = Constants.LocationDirection.from;
        //     self.locationDropDownView = new LocationDropDownView($("#from"), self);
        //     e.stopPropagation();
        // });
        // this.$to = $("#to").children("input").on("focus", function (e) {
        //     self.closeLocationDropDown();
        //     self.locationDirection = Constants.LocationDirection.to;
        //     self.locationDropDownView = new LocationDropDownView($("#to"), self);
        //     e.stopPropagation();
        // });
        // //stop events from propograting to the body listen in eventClearService
        // this.$from = $("#from").children("input").on("click", function (e) {
        //     e.stopPropagation();
        // });
        // this.$to = $("#to").children("input").on("click", function (e) {
        //     e.stopPropagation();
        // });
        
        // this.$from.on("blur", function(){
        //     if ($(this).val() === '')
        //         $(this).val(self.temp.from);
        // });
        // this.$to.on("blur", function(){
        //     if ($(this).val() === '')
        //         $(this).val(self.temp.to);
        // });
        // this.$date = $(".date>input").on("focus", function (e) {
        //     $(this).val("");
        // });
        // this.$date.datepicker({
        //     buttonImageOnly: true,
        //     buttonImage: "calendar.gif",
        //     buttonText: "Calendar",
        //     minDate: new Date (),
        //     onSelect: function (text, inst) {
        //         var d = new Date ();
        //         d.setDate(inst.selectedDay);
        //         d.setMonth(inst.selectedMonth);
        //         d.setYear(inst.selectedYear);
        //         self.searchRepresentation.set("departureDate", d);
        //         self.$date.val(Utilities.getDateString(d));
        //     }
        // });
        // $("#btn_search").on("click", function () {
        //     if (self.$from.val() && self.$to.val() && self.$date.val() ) {
        //         self.departLocation.set("city", self.$from.val());
        //         self.arrivalLocation.set("city", self.$to.val());
        //         self.searchRepresentation.set("departureMatch_Id", self.departLocation.get("defaultId"));
        //         self.searchRepresentation.set("arrivalMatch_Id", self.arrivalLocation.get("defaultId"));
        //         app.storage.setSearchRepresentationCache(self.searchRepresentation);
        //         app.navigate("main/" + self.searchRepresentation.toString(), {'trigger': true});
        //     }
        // });
        // this.$users = $("#frontPage-userButtons>.user").on("click", function (e) {
        //     if (!$(this).hasClass("active")) {
        //         $("#frontPage-exp>dt").hide();
        //         $(".active").removeClass("active").addClass("f-gray");
        //         $(this).removeClass("f-gray").addClass("active");
        //         $("#exp"+Utilities.getId(e.delegateTarget.id)).show();
        //     }
        // });
        $("#front_howItWorks").on("click", function (e) {
            e.preventDefault();
            app.navigate("howitworks", true);
        });
        //this.bindRecentsEvents();
    },

    bindRecentsEvents: function () {
        var self = this;
        this.$messages = $("#frontPage-resultPanel").on("click", ".message_simple", function (e) {
            app.navigate("course/" + Utilities.getId(this.id), true);
        });
    },

    updateLocation: function (id) {
        this.getRecents();
    },
    scroll: function () {

        var buf, self = this;
        if (this.displayMessages instanceof Courses) {
            buf = this.messageTemplate(this.displayMessages.at(this.displayIndex++)._toJSON());
        } else {
            buf = this.messageTemplate(this.displayMessages[this.displayIndex++]);
        }
        var $resp = this.$resultPanel.prepend(buf);
        var $respdiv = $resp.children("div").first().css("margin-top",-100);
        $respdiv.first().animate({"margin-top":0}, 600);
        if ($resp.children("div").length > 4) {
           $resp.children("div").last().remove();
        }
        if (this.displayIndex === this.displayMessages.length) {
            this.displayIndex = 0;
            app.courseManager.fetchRecents({
                "success": function(recents){
                    self.displayMessages = recents;
                },
                "error": this.renderError
            });
        }
    },

    acceptDefaultLocation: function(defaultLocation){
        if (this.locationDirection === Constants.LocationDirection.from){
            this.departLocation = defaultLocation;
            this.$from.val(this.departLocation.toUiString());
        }
        else if (this.locationDirection === Constants.LocationDirection.to){
            this.arrivalLocation = defaultLocation;
            this.$to.val(this.arrivalLocation.toUiString());
        }
    },

    closeLocationDropDown: function(){
        if (typeof this.locationDropDownView !== 'undefined' && this.locationDropDownView !== null){
            this.locationDropDownView.close();
        }
    },

    close: function () {
        if (!this.isClosed) {
            if (this.$messages) {
                this.$messages.off();
            }
            $("#btn_search").off();
            this.$from.off();
            this.$to.off();
            this.$users.off();
            this.$date.off();
            this.unbind();

            this.closeLocationDropDown();
            $( '.cycle-slideshow' ).cycle('destroy');
            this.$el.empty();
            this.isClosed = true;
            clearInterval(this.rollInterval);
        }
    }
});
