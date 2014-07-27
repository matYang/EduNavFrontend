var Booking = Backbone.Model.extend({

    defaults: function () {
        return {
            'id': -1,
            'bookingId': -1,
            'transactionId': -1,
            'userId': -1,
            'partnerId': -1,
            'courseId': -1,
            'price': 0,
            'reference': '',
            
            'status': 0,
            'preStatus': 0,
            'name': '',
            'phone':'',
            'email': '',
            'scheduledTime': new Date(),
            'note': '',     //各种record

            //---------
            'cashbackAmount': 0,
            'creationTime': new Date (),
            'adjustTime': new Date(),
            'couponRecord': '',
            'actionRecord': '',

            'noRefundDate': new Date(),
            'cashbackDate': new Date(),
            'bookingType': 0,
            'serviceFeeStatus': 0,
            'commissionStatus': 0,
                
            'preServiceFeeStatus': 0,
            'preCommissionStatus': 0,
            'bookingStatusAdjustTime': new Date(),
                
            'serviceFeeStatusAdjustTime': new Date(),
            'commissionStatusAdjustTime': new Date(),
            'serviceFeeActionRecord': '',
            'commissionActionRecord': '',

            'course': {}
        };
    },

    idAttribute: 'id',

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
            data.id = parseInt(data.id, 10);
            data.bookingId = data.id;
            data.transactionId = parseInt(data.transactionId, 10);

            data.userId = parseInt(data.userId, 10);
            data.partnerId = parseInt(data.partnerId, 10);
            data.courseId = parseInt(data.courseId, 10);

            data.price = parseInt(data.price, 10);
            data.status = parseInt(data.status, 10);
            data.preStatus = parseInt(data.preStatus, 10);
            data.reference = decodeURI(data.reference);
            data.name = decodeURI(data.name);
            data.phone = decodeURI(data.phone);
            data.email = decodeURIComponent(data.email);

            data.scheduledTime = Utilities.castFromAPIFormat(data.scheduledTime);
            data.creationTime = Utilities.castFromAPIFormat(data.creationTime);
            data.adjustTime = Utilities.castFromAPIFormat(data.adjustTime);

            data.note = decodeURI(data.note);
            data.cashbackAmount = parseInt(data.cashbackAmount, 10);
            data.couponRecord = decodeURI(data.couponRecord);
            data.actionRecord = decodeURI(data.actionRecord);

            data.noRefundDate = Utilities.castFromAPIFormat(data.noRefundDate);
            data.cashbackDate = Utilities.castFromAPIFormat(data.cashbackDate);
            data.bookingType = parseInt(data.bookingType, 10);
            data.serviceFeeStatus = parseInt(data.serviceFeeStatus, 10);
            data.commissionStatus = parseInt(data.commissionStatus, 10);
                
            data.preServiceFeeStatus = parseInt(data.preServiceFeeStatus, 10);
            data.preCommissionStatus = parseInt(data.preCommissionStatus, 10);
            data.bookingStatusAdjustTime = Utilities.castFromAPIFormat(data.bookingStatusAdjustTime);
                
            data.serviceFeeStatusAdjustTime = Utilities.castFromAPIFormat(data.serviceFeeStatusAdjustTime);
            data.commissionStatusAdjustTime = Utilities.castFromAPIFormat(data.commissionStatusAdjustTime);
            data.serviceFeeActionRecord = decodeURI(data.serviceFeeActionRecord);
            data.commissionActionRecord = decodeURI(data.commissionActionRecord);

            data.course = new Course(data.course, {parse: true});
        }
        return data;
    },
    _toJSON: function () {
        var json = _.clone(this.attributes);
        json.scheduledTime = Utilities.getDateString(this.get('scheduledTime'));
        json.creationTime = Utilities.getDateString(this.get('creationTime'));
        json.adjustTime = Utilities.getDateString(this.get('adjustTime'));
        json.email = decodeURIComponent(json.email);
        json.name = decodeURI(json.name);
        json.phone = decodeURI(json.phone);
        json.note = decodeURI(json.note);
        json.course = json.course._toJSON();
        return json;
    },
    toJSON: function () {
        var json = _.clone(this.attributes);
        
        json.reference = decodeURI(json.reference);
        json.name = encodeURI(json.name);
        json.phone = encodeURI(json.phone);
        json.email = encodeURIComponent(json.email);
        json.note = encodeURI(json.note);

        json.scheduledTime = Utilities.castToAPIFormat(this.get('scheduledTime'));
        
        //maybe not really needed
        json.noRefundDate = Utilities.castToAPIFormat(this.get('noRefundDate'));
        json.cashbackDate = Utilities.castToAPIFormat(this.get('cashbackDate'));


        if (json.course instanceof Course) {
            json.course = json.course.toJSON();
        }
        
        return json;
    },
    initBookingFromCourse: function (course) {
        
        this.set("userId", app.sessionManager.sessionModel.id);
        this.set("partnerId", course.get("partnerId"));
        this.set("courseId", course.get("id"));
        this.set("course", course);
        this.set("price", course.get("price"));
        this.set("cashbackAmount", course.get("cashback"));
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
    },
    findBookingByBookingId: function (reference) {
        return this.where({bookingId: reference})[0];
    }
});
