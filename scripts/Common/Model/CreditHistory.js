var CreditHistory = Backbone.Model.extend({
    //TODO fill in Constants with enum int mapping
    defaults: function () {
        return {
            'id': -1,

            'charge': undefined,
            'createTime': new Date(),
            'operation':undefined

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
            data.id = Utilities.parseNum(data.id);
            data.charge = Utilities.parseNum(data.credit);
            data.operation = Utilities.parseNum(data.operation);
            data.createTime = Utilities.castFromAPIFormat(data.createTime);
        }
        return data;
    },

    _toJSON: function () {
        var json = _.clone(this.attributes);
//        json.credit = json.credit.toFixed(0);
        json.createTime = Utilities.getDateString(this.get('createTime'));
        return json;
    },

    toJSON: function () {
        var json = _.clone(this.attributes);

        json.createTime = Utilities.castToAPIFormat(this.get('createTime'));
        return json;
    }

});


var CreditHistories = Backbone.Collection.extend({

    model: CreditHistory,
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