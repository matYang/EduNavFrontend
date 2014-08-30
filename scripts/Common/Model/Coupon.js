var Coupon = Backbone.Model.extend({
    //TODO fill in Constants with enum int mapping
    defaults: function () {
        return {
            'id': -1,
            'userID': -1,

            'balance': undefined,//当前总额
            'total': undefined,//todo 当前总额 which one??

            'origin': undefined, //enum type 获得来源

            'remark': undefined, //备注信息
            'status': undefined, //优惠券的状态

            'enabled':undefined,

            'createTime': undefined,//创建时间
            'expiryTime': undefined,//失效时间
            'lastModifyTime': undefined//最后修改时间

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
            data.userId = parseInt(data.userId, 10);

            data.total = parseFloat(data.total);
            data.balance = parseFloat(data.balance);
            data.origin = Utilities.parseNum(data.origin);

            data.total = isNaN(data.total) ? 0 : data.total;
            data.balance = isNaN(data.balance) ? 0 : data.balance;

            data.createTime = Utilities.castFromAPIFormat(data.createTime);
            data.lastModifyTime = Utilities.castFromAPIFormat(data.lastModifyTime);
            data.expiryTime = Utilities.castFromAPIFormat(data.expiryTime);

            data.status = parseInt(data.status, 10);
            data.enabled = parseInt(data.enabled, 10);
        }
        return data;
    },

    _toJSON: function () {
        var json = _.clone(this.attributes), date = new Date();
        json.createTime = Utilities.getDateString(this.get('createTime'));
        json.lastModifyTime = Utilities.getDateString(this.get('lastModifyTime'));
        json.expiryTime = Utilities.getDateString(this.get('expiryTime'));

        json.expireSoon = (((this.get('expiryTime')||new Date()).getTime() - date.getTime()) < 604800000 ) ? "<span>即将到期</span>" : "";// 7 days
        return json;
    },

    toJSON: function () {
        var json = _.clone(this.attributes);
        delete json.createTime;
        delete json.expiryTime;
        delete json.lastModifyTime;
        return json;
    }

});

var Coupons = Backbone.Collection.extend({

    model: Coupon,
    start: 0,
    count: 0,
    total: 0,
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