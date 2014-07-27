var Coupon = Backbone.Model.extend({
    //TODO fill in Constants with enum int mapping
    defaults: function () {
        return {
            'id': -1,
            'couponId': -1,

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

    idAttribute: 'id',

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
            data.id = parseInt(data.id, 10);
            data.couponId = data.id;

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
        var json = _.clone(this.attributes), date = new Date();
        json.creationTime = Utilities.getDateString(this.get('creationTime'));
        json.expireTime = Utilities.getDateString(this.get('expireTime'));
        json.origin = json.origin === 0 ? "注册赠送" : json.origin === 1 ? "邀请获得" : "管理员赠送";
        json.expireSoon = ((this.get('expireTime').getTime() - date.getTime()) < 604800000 ) ? "<span>即将到期</span>" : "";
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

    url: Constants.origin + '/api/v1.0/coupon/coupon',

    initialize: function (urlOverride) {
        _.bindAll(this, 'overrideUrl');
        if ( typeof urlOverride !== 'undefined') {
            this.url = urlOverride;
        }
    }
});