var Coupon = Backbone.Model.extend({
    //TODO fill in Constants with enum int mapping
    defaults: function () {
        return {
            'id': -1,
            'couponId': -1,
            'userID': -1,

            'code': '',//优惠券编号

            'total': 0,//暂时没什么用
            'balance': 0,//当前总额

            'origin': 0, //enum type

            'createTime': new Date(),
            'lastModifyTime': new Date(),
            'expireTime': new Date(),
            'remark': '',
            'status': 0
//            'status': EnumConfig.CouponStatus.usable,
//            'origin': 0
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
        if (typeof data !== 'undefined') {
            data.id = parseInt(data.id, 10);
            data.couponId = data.id;

            data.userId = parseInt(data.userId, 10);

            data.total = parseFloat(data.total);
            data.balance = parseFloat(data.balance);
            data.origin = parseInt(data.origin, 10);

            data.total = isNaN(data.tota) ? 0 : data.total;
            data.balance = isNaN(data.tota) ? 0 : data.balance;
            data.origin = isNaN(data.tota) ? 0 : data.origin;

            data.createTime = Utilities.castFromAPIFormat(data.createTime);
            data.lastModifyTime = Utilities.castFromAPIFormat(data.lastModifyTime);
            data.expireTime = Utilities.castFromAPIFormat(data.expireTime);

            data.status = parseInt(data.status, 10);
        }
        return data;
    },

    _toJSON: function () {
        var json = _.clone(this.attributes), date = new Date();
        json.createTime = Utilities.getDateString(this.get('createTime'));
        json.lastModifyTime = Utilities.getDateString(this.get('lastModifyTime'));
        json.expireTime = Utilities.getDateString(this.get('expireTime'));
        json.expireSoon = ((this.get('expireTime').getTime() - date.getTime()) < 604800000 ) ? "<span>即将到期</span>" : "";
        return json;
    },

    toJSON: function () {
        var json = _.clone(this.attributes);
        delete json.createTime;
        delete json.expireTime;
        delete json.lastModifyTime;
        return json;
    }

});

var Coupons = Backbone.Collection.extend({

    model: Coupon,
    start: 0,
    count: 0,
    total: 0,
    url: Constants.origin + '/api/v1.0/coupon/coupon',
    parse: function (data) {
        if (!data.data) return data;
        this.start = data.start;
        this.count = data.count;
        this.total = data.total;
        return data.data;
    },
    initialize: function (urlOverride) {
        _.bindAll(this, 'overrideUrl');
        if (typeof urlOverride !== 'undefined') {
            this.url = urlOverride;
        }
    }
});