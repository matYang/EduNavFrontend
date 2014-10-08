var GroupBuyBooking = Backbone.Model.extend({
    defaults: function () {
        return {
            'id': -1,//订单Id
            'groupBuyActivityId': -1,//团购的Id
            'groupBuyPrice': undefined,//团购价格

            'userId': undefined,
            'status': undefined,
            'createTime': undefined,
            'reference':undefined,//订单号
            'number':undefined,//支付宝流水号

            'user':new User(),//new User()
            'groupBuyActivity':new Tuan()

        };
    },
    parse: function (data) {
        if (typeof data !== 'undefined') {
            data.id = parseInt(data.id, 10);
            data.groupBuyActivityId = parseInt(data.groupBuyActivityId, 10);
            data.groupBuyPrice = Utilities.parseNum(data.groupBuyPrice);
            data.userId = parseInt(data.userId, 10);
            data.status = parseInt(data.status, 10);
            data.createTime = Utilities.castFromAPIFormat(data.createTime);
            data.user = new User(data.user, {parse: true});
            data.groupBuyActivity = new Tuan(data.groupBuyActivity, {parse: true});

        }
        return data;
    },
    toJSON: function () {//使用backbone进行resource的交互时采用的toJSON方法
        var json = _.clone(this.attributes);
        json.user = undefined;
        json.groupBuyActivity = undefined;
        return json;
    },

    _toJSON: function () {
        var json = _.clone(this.attributes);
        json.createTime = Utilities.getDateString(json.createTime);
        json.user = json.user._toJSON();
        json.groupBuyActivity = json.groupBuyActivity._toJSON();
        return json;
    },
    isNew: function () {
        return this.get("id") === -1;
    }

});

var GroupBuyBookings = Backbone.Collection.extend({
    model: GroupBuyBooking,
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