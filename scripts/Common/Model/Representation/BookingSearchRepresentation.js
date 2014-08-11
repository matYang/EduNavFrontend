var BookingSearchRepresentation = Backbone.Model.extend({

    defaults: function () {
        return {
            'bookingId': undefined,
            'userId': undefined,
            'partnerId': undefined,
            'courseId': undefined,
            'name': undefined,
            'phone': undefined,
            'email': undefined,
            'status': undefined,
            'preStatus':undefined,
            'reference': undefined,

            'priceStart': undefined,
            'priceEnd': undefined,

            'startScheduledTime': undefined,
            'finishScheduledTime': undefined,
            'startAdjustTime': undefined,
            'finishAdjustTime': undefined,
            'startcreateTime': undefined,
            'finishcreateTime': undefined,

            'startNoRefundDate': undefined,
            'finishNoRefundDate': undefined,
            'startCashbackDate': undefined,
            'finishCashbackDate': undefined,
            'type': undefined
        };
    },

    initialize: function () {
        _.bindAll(this, 'toQueryString', 'castFromQuery', 'toJSON');
    },

    toQueryString: function () {
        var queryArr = [];
        var queryObj = this.toJSON();

        for (var property in queryObj) {
            if (queryObj.hasOwnProperty(property) && typeof queryObj[property] !== 'undefined') {
                queryArr.push(property + '=' + queryObj[property]);
            }
        }

        return queryArr.join('&');
    },

    castFromQuery: function (queryObj) {
        for (var property in queryObj) {
            if (queryObj.hasOwnProperty(property) && typeof queryObj[property] !== 'undefined') {
                this.set(property, decodeURI(queryObj[property]));
            }
        }
    },

    toJSON: function(){
        var queryObj = {};

        queryObj.bookingId = this.get('bookingId');
        queryObj.priceStart = this.get('priceStart');
        queryObj.priceEnd = this.get('priceEnd');
        queryObj.userId = this.get('userId');
        queryObj.partnerId = this.get('partnerId');
        queryObj.courseId = this.get('courseId');
        queryObj.name = typeof this.get('name') === 'undefined' ? undefined : encodeURI(this.get('name'));
        queryObj.phone = typeof this.get('phone') === 'undefined' ? undefined : encodeURI(this.get('phone'));
        queryObj.email = typeof this.get('email') === 'undefined' ? undefined : encodeURI(this.get('email'));
        queryObj.status = this.get('status');
        queryObj.preStatus = this.get('preStatus');
        queryObj.reference = typeof this.get('reference') === 'undefined' ? undefined : encodeURI(this.get('reference'));


        queryObj.startScheduledTime = typeof this.get('startScheduledTime') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('startScheduledTime'));
        queryObj.finishScheduledTime = typeof this.get('finishScheduledTime') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('finishScheduledTime'));
        queryObj.startAdjustTime = typeof this.get('startAdjustTime') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('startAdjustTime'));
        queryObj.finishAdjustTime = typeof this.get('finishAdjustTime') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('finishAdjustTime'));
        queryObj.startcreateTime = typeof this.get('startcreateTime') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('startcreateTime'));
        queryObj.finishcreateTime = typeof this.get('finishcreateTime') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('finishcreateTime'));


        queryObj.startBookingStatusAdjustTime = typeof this.get('startBookingStatusAdjustTime') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('startBookingStatusAdjustTime'));
        queryObj.finishBookingStatusAdjustTime = typeof this.get('finishBookingStatusAdjustTime') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('inishBookingStatusAdjustTime'));
            
        queryObj.startServiceFeeStatusAdjustTime = typeof this.get('startServiceFeeStatusAdjustTime') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('startServiceFeeStatusAdjustTime'));
        queryObj.finishServiceFeeStatusAdjustTime = typeof this.get('finishServiceFeeStatusAdjustTime') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('finishServiceFeeStatusAdjustTime'));
        queryObj.startCommissionStatusAdjustTime = typeof this.get('startCommissionStatusAdjustTime') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('startCommissionStatusAdjustTime'));
        queryObj.finishCommissionStatusAdjustTime = typeof this.get('finishCommissionStatusAdjustTime') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('finishCommissionStatusAdjustTime'));

        queryObj.startNoRefundDate = typeof this.get('startNoRefundDate') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('startNoRefundDate'));
        queryObj.finishNoRefundDate = typeof this.get('finishNoRefundDate') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('finishNoRefundDate'));
        queryObj.startCashbackDate = typeof this.get('startCashbackDate') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('startCashbackDate'));
        queryObj.finishCashbackDate = typeof this.get('finishCashbackDate') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('finishCashbackDate'));
        queryObj.type = this.get('type');
        queryObj.serviceFeeStatus = this.get('serviceFeeStatus');
        queryObj.commissionStatus = this.get('commissionStatus');
            
        queryObj.preServiceFeeStatus = this.get('preServiceFeeStatus');
        queryObj.preCommissionStatus = this.get('preCommissionStatus');
        return queryObj;
    }

});