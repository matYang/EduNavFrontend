var BookingHistory = Backbone.Model.extend({

    defaults: function () {
        return {
            'id': -1,
            'bookingId': -1,
            'userId': -1,

            'remark': undefined,//支付宝交易成功后会存储支付宝流水号

            'optName': undefined,//EnumConfig.BookingHistoryText
            'preStatus': undefined,
            'postStatus': undefined,

            'createTime': undefined//booking状态变更时间

        };
    },

    idAttribute: 'id',

    urlRoot: Constants.origin + '/api/v2/booking/',

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
        if (typeof data !== 'undefined') {
            data.id = parseInt(data.id, 10);
            data.bookingId = data.id;
            data.userId = parseInt(data.userId, 10);

            data.optName = Utilities.parseNum(data.optName);
            data.preStatus = Utilities.parseNum(data.preStatus);
            data.postStatus = Utilities.parseNum(data.postStatus);

            data.createTime = Utilities.castFromAPIFormat(data.createTime);

        }
        return data;
    },
    _toJSON: function () {
        var json = _.clone(this.attributes);
        json.createTime = Utilities.getDateString(this.get('createTime'));
        return json;
    }
});

var BookingHistories = Backbone.Collection.extend({

    model: BookingHistory,
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
    },

    overrideUrl: function (urlOverride) {
        if (typeof urlOverride !== 'undefined') {
            this.url = urlOverride;
        }
    }
});
