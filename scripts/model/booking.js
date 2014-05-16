var Booking = Backbone.Model.extend({

    defaults: function () {
        return {
            "bookingId": -1,

            "userId": -1,
            "partnerId": -1,
            "courseId": -1,

            "price": 0.0,
            "startTime": new Date (),
            "finishTime": new Date (),
            
            "reference": "",
            "timeStamp":"",

            "name":"",
            "phone":"",

            "status": 0,
            "creationTime": new Date ()
        };
    },

    idAttribute: "transactionId",

    urlRoot: Constants.origin + "/api/v1.0/transaction/transaction",

    initialize: function (urlRootOverride) {
        _.bindAll(this, 'overrideUrl');

        if (typeof urlRootOverride !== 'undefined') {
            this.urlRoot = urlRootOverride;
        }
    },

    overrideUrl: function (urlRootOverride) {
        if (typeof urlRootOverride !== 'undefined') {
            this.urlRoot = urlRootOverride;
        }
    },

    isNew: function () {
        return this.id === -1;
    },

    parse: function (data) {

        if ( typeof data !== 'undefined') {

        }
        return data;
    },

    toJSON: function () {
        var json = _.clone(this.attributes);
        if (this.get('departure_location') instanceof UserLocation) {
            json.departure_location = this.get('departure_location').toJSON();
        }
        if (this.get('arrival_location') instanceof UserLocation) {
            json.arrival_location = this.get('arrival_location').toJSON();
        }
        json.departure_time = Utilities.castToAPIFormat(this.get('departure_time'));
        json.customerNote = encodeURI(json.customerNote);
        json.providerNote = encodeURI(json.providerNote);

        return json;
    },
});

var Bookings = Backbone.Collection.extend({

    model: Booking,

    url: Constants.origin + "/api/v1.0/booking",

    initialize: function (urlOverride) {
        _.bindAll(this, 'overrideUrl');
        if ( typeof urlOverride !== 'undefined') {
            this.url = urlOverride;
        }
    },

    overrideUrl: function (urlOverride) {
        if ( typeof urlOverride !== 'undefined') {
            this.url = urlOverride;
        }
    }
});
