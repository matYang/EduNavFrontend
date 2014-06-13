var Booking = Backbone.Model.extend({

    defaults: function () {
        return {
            'bookingId': -1,
            'transactionId': -1,
            'userId': -1,
            'partnerId': -1,
            'courseId': -1,
            'price': 0,
            'reference': '',
           
            'status': 0,
            'name': '',
            'phone':'',
            'email': '',
            'scheduledTime': new Date(),
            'note': '',     //各种record

            //---------
            'cashbackAmount': 0,
            'wasConfirmed': false,
            'creationTime': new Date (),
            'adjustTime': new Date(),
            'couponRecord': '',
            'actionRecord': '',
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
            
            data.transactionId = parseInt(data.transactionId, 10);

            data.userId = parseInt(data.userId, 10);
            data.partnerId = parseInt(data.partnerId, 10);
            data.courseId = parseInt(data.courseId, 10);

            data.price = parseInt(data.price, 10);
            data.status = parseInt(data.status, 10);
            data.reference = decodeURI(data.reference);
            data.name = decodeURI(data.name);
            data.phone = decodeURI(data.phone);
            data.email = decodeURI(data.email);

            data.scheduledTime = Utilities.castFromAPIFormat(scheduledTime);
            data.creationTime = Utilities.castFromAPIFormat(data.creationTime);
            data.adjustTime = Utilities.castFromAPIFormat(data.adjustTime);

            data.wasConfirmed = data.wasConfirmed === 'true' || data.wasConfirmed === true || Number(data.wasConfirmed) === 1;
            data.note = decodeURI(data.note);
            data.cashbackAmount = parseInt(data.cashbackAmount, 10);
            data.couponRecord = decodeURI(data.couponRecord);

            data.actionRecord = decodeURI(data.actionRecord);
            data.course = new Course(data.course, {parse: true});
        }
        return data;
    },
    _toJSON: function () {
        var json = _.clone(this.attributes);
        json.scheduledTime = Utilities.getDateString(this.get('scheduledTime'));
        json.creationTime = Utilities.getDateString(this.get('creationTime'));
        json.adjustTime = Utilities.getDateString(this.get('adjustTime'));
        json.course = json.course._toJSON();
        return json;
    },
    toJSON: function () {
        var json = _.clone(this.attributes);
        
        json.reference = decodeURI(json.reference);
        json.name = decodeURI(json.name);
        json.phone = decodeURI(json.phone);
        json.email = decodeURI(json.email);
        json.note = decodeURI(json.note);

        json.scheduledTime = Utilities.castToAPIFormat(this.get('scheduledTime'));
        json.creationTime = Utilities.castToAPIFormat(this.get('creationTime'));
        json.adjustTime = Utilities.castToAPIFormat(this.get('adjustTime'));

        json.course = json.course.toJSON();
        
        return json;
    },
    initBookingFromCourse: function (course) {
        
        this.set("userId", app.sessionManager.sessionModel.id);
        this.set("partnerId", course.get("partnerId"));
        this.set("courseId", course.get("courseId"));
        this.set("course", course);
        this.set("price", course.get("price"));
        this.set("reference", course.get("reference"));
        //TODO add cashbackAmount when course is finalized
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
    },

    findBookingByReference: function (reference) {
        return this.where({reference: reference})[0];
    }
});
