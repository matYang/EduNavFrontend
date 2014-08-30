var AccountHistory = Backbone.Model.extend({
    defaults: function () {
        return {
            'id': -1, //int
            'userId':undefined, //int

            'charge': 0, //变更金额 double,
            'type':undefined, //类型
            'operation':undefined,//操作 0支出 1收入
            'remark': undefined,//备注 string

            'createTime': undefined//int
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
            data.id = Utilities.parseNum(data.id);
            data.userId = Utilities.parseNum(data.userId);

            data.charge = Utilities.parseNum(data.charge);
            data.type = Utilities.parseNum(data.type);
            data.operation = Utilities.parseNum(data.operation);

            data.createTime = Utilities.castFromAPIFormat(data.createTime);
        }
        return data;
    },

    _toJSON: function () {
        var json = _.clone(this.attributes);
//        json.balance = json.balance.toFixed(2);
        json.createTime = Utilities.getDateString(this.get('createTime'));
        return json;
    },

    toJSON: function () {
        var json = _.clone(this.attributes);
        delete json.createTime;
        return json;
    }

});


var AccountHistories = Backbone.Collection.extend({

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