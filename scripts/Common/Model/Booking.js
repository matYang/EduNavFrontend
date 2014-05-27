var Booking = Backbone.Model.extend({

    defaults: function () {
        return {
            'bookingId': -1,

            'userId': -1,
            'partnerId': -1,
            'courseId': -1,
            'price': 0,

            'status': 0,
            'reference': '',
            'name': '',
            'phone':'',
            'email': '',
            'expectedTime': new Date(),

            'creationTime': new Date (),
            'timestamp': new Date(),

            'course': {}
        };
    },

    idAttribute: 'bookingId',

    urlRoot: Constants.origin + '/api/v1.0/booking/booking',

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
            data.bookingId = parseInt(data.bookingId, 10);
            
            data.userId = parseInt(data.userId, 10);
            data.partnerId = parseInt(data.partnerId, 10);
            data.courseId = parseInt(data.courseId, 10);

            data.price = parseInt(data.price, 10);
            data.status = parseInt(data.status, 10);
            data.reference = decodeURI(data.reference);
            data.name = decodeURI(data.name);
            data.phone = decodeURI(data.phone);
            data.email = decodeURI(data.email);

            data.expectedTime = Utilities.castFromAPIFormat(expectedTime);
            data.creationTime = Utilities.castFromAPIFormat(data.creationTime);
            data.timestamp = Utilities.castFromAPIFormat(data.dataStamp);

            data.course = new Course(data.course, {parse: true});
        }
        return data;
    },
    _toJSON: function () {
        var json = _.clone(this.attributes);
        json.expectedTime = Utilities.getDateString(this.get('expectedTime'));
        json.creationTime = Utilities.getDateString(this.get('creationTime'));
        json.timestamp = Utilities.getDateString(this.get('timestamp'));
        return json;
    },
    toJSON: function () {
        var json = _.clone(this.attributes);
        
        json.reference = encodeURI(json.reference);
        json.name = encodeURI(json.name);
        json.phone = encodeURI(json.phone);
        json.email = encodeURI(json.email);

        json.expectedTime = Utilities.castToAPIFormat(this.get('expectedTime'));
        json.creationTime = Utilities.castToAPIFormat(this.get('creationTime'));
        json.timestamp = Utilities.castToAPIFormat(this.get('timestamp'));
        return json;
    }
});

var Bookings = Backbone.Collection.extend({

    model: Booking,

    url: Constants.origin + '/api/v1.0/booking',

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
