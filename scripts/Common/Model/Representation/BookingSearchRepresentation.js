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

            'startPrice': undefined,
            'finishPrice': undefined,

            'startScheduledTime': undefined,
            'finishScheduledTime': undefined,
            'startAdjustTime': undefined,
            'finishAdjustTime': undefined,
            'startCreationTime': undefined,
            'finishCreationTime': undefined,

            'startBookingStatusAdjustTime': undefined,
            'finishBookingStatusAdjustTime': undefined,
                
            'startServiceFeeStatusAdjustTime': undefined,
            'finishServiceFeeStatusAdjustTime': undefined,
            'startCommissionStatusAdjustTime': undefined,
            'finishCommissionStatusAdjustTime': undefined,

            'startNoRefundDate': undefined,
            'finishNoRefundDate': undefined,
            'startCashbackDate': undefined,
            'finishCashbackDate': undefined,
            'bookingType': undefined,
            'serviceFeeStatus': undefined,
            'commissionStatus': undefined,
                
            'preServiceFeeStatus': undefined,
            'preCommissionStatus': undefined
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
        queryObj.startPrice = this.get('startPrice');
        queryObj.finishPrice = this.get('finishPrice');
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
        queryObj.startCreationTime = typeof this.get('startCreationTime') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('startCreationTime'));
        queryObj.finishCreationTime = typeof this.get('finishCreationTime') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('finishCreationTime'));


        queryObj.startBookingStatusAdjustTime = typeof this.get('startBookingStatusAdjustTime') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('startBookingStatusAdjustTime'));
        queryObj.inishBookingStatusAdjustTime = typeof this.get('inishBookingStatusAdjustTime') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('inishBookingStatusAdjustTime'));
            
        queryObj.startServiceFeeStatusAdjustTime = typeof this.get('startServiceFeeStatusAdjustTime') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('startServiceFeeStatusAdjustTime'));
        queryObj.finishServiceFeeStatusAdjustTime = typeof this.get('finishServiceFeeStatusAdjustTime') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('finishServiceFeeStatusAdjustTime'));
        queryObj.startCommissionStatusAdjustTime = typeof this.get('startCommissionStatusAdjustTime') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('startCommissionStatusAdjustTime'));
        queryObj.finishCommissionStatusAdjustTime = typeof this.get('finishCommissionStatusAdjustTime') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('finishCommissionStatusAdjustTime'));

        queryObj.startNoRefundDate = typeof this.get('startNoRefundDate') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('startNoRefundDate'));
        queryObj.finishNoRefundDate = typeof this.get('finishNoRefundDate') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('finishNoRefundDate'));
        queryObj.startCashbackDate = typeof this.get('startCashbackDate') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('startCashbackDate'));
        queryObj.finishCashbackDate = typeof this.get('finishCashbackDate') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('finishCashbackDate'));
        queryObj.bookingType = this.get('bookingType');
        queryObj.serviceFeeStatus = this.get('serviceFeeStatus');
        queryObj.commissionStatus = this.get('commissionStatus');
            
        queryObj.preServiceFeeStatus = this.get('preServiceFeeStatus');
        queryObj.preCommissionStatus = this.get('preCommissionStatus');
        return queryObj;
    }

});