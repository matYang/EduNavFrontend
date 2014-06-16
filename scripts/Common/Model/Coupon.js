var Coupon = Backbone.Model.extend({
    //TODO fill in Constants with enum int mapping
    defaults: function () {
        return {
            'couponId': -1,

            'bookingId': -1,
            'transactionId': -1,
            'userId': -1,
            
            'amount': 0,
            'originalAmount': 0,

            'creationTime': new Date(),
            'expireTime': new Date(),
            'status': EnumConfig.CouponStatus.usable,
            'origin': 0
        };
    },

    idAttribute: 'creditId',

    initialize: function (urlRootOverride) {
        _.bindAll(this, 'overrideUrl', 'isNew', 'parse', '_toJSON', 'toJSON');

        if (typeof urlRootOverride !== 'undefined') {
            this.urlRoot = urlRootOverride;
        }
    },

    isNew: function () {
        return this.id === -1;
    },

    parse: function (data) {
        if ( typeof data !== 'undefined') {
            data.couponId = parseInt(data.couponId, 10);

            data.bookingId = parseInt(data.bookingId, 10);
            data.transactionId = parseInt(data.transactionId, 10);
            data.userId = parseInt(data.userId, 10);
            data.amount = parseInt(data.amount, 10);
            data.originalAmount = parseInt(data.originalAmount, 10);
            data.origin = parseInt(data.origin, 10);

            data.creationTime = Utilities.castFromAPIFormat(data.creationTime);
            data.expireTime = Utilities.castFromAPIFormat(data.expireTime);

            data.status = parseInt(data.status, 10);
        }
        return data;
    },

    _toJSON: function () {
        var json = _.clone(this.attributes);
        json.creationTime = Utilities.getDateString(this.get('creationTime'));
        json.expireTime = Utilities.getDateString(this.get('expireTime'));
        return json;
    },

    toJSON: function () {
        var json = _.clone(this.attributes);

        json.creationTime = Utilities.castToAPIFormat(this.get('creationTime'));
        json.expireTime = Utilities.castToAPIFormat(this.get('expireTime'));
        return json;
    }

});

var Coupons = Backbone.Collection.extend({

    model: Coupon,

    url: Constants.origin + '/api/v1.0/users/user',

    initialize: function (urlOverride) {
        _.bindAll(this, 'overrideUrl');
        if ( typeof urlOverride !== 'undefined') {
            this.url = urlOverride;
        }
    }
});