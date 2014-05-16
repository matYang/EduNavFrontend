var FrontPageView = Backbone.View.extend({

    el: '#content',
    displayIndex: 0,
    initialize: function () {
        _.bindAll(this, 'getRecents', 'render', 'bindEvents',  'acceptDefaultLocation', 'closeLocationDropDown', 'close');
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
        //app.sessionManager.fetchSession();
        this.bindEvents();

    },

    render: function () {
    },

    bindEvents: function () {
        var self = this;
        $("#front_howItWorks").on("click", function (e) {
            e.preventDefault();
            app.navigate("howitworks", true);
        });
        //this.bindRecentsEvents();
    },

    acceptDefaultLocation: function(defaultLocation){
        // if (this.locationDirection === Constants.LocationDirection.from){
        //     this.departLocation = defaultLocation;
        //     this.$from.val(this.departLocation.toUiString());
        // }
        // else if (this.locationDirection === Constants.LocationDirection.to){
        //     this.arrivalLocation = defaultLocation;
        //     this.$to.val(this.arrivalLocation.toUiString());
        // }
    },

    closeLocationDropDown: function(){
        if (typeof this.locationDropDownView !== 'undefined' && this.locationDropDownView !== null){
            this.locationDropDownView.close();
        }
    },

    close: function () {
        if (!this.isClosed) {
            this.$el.empty();
            this.isClosed = true;
            clearInterval(this.rollInterval);
        }
    }
});
