var Transaction = Backbone.Model.extend({
    //TODO fill in Constants with enum int mapping
    defaults: function () {
        return {
            'id': -1,
            'transactionId': -1,
            'userId': -1,
            
            'bookingId': -1,
            'transactionAmount': 0,
            'transactionType': EnumConfig.TransactionType.withdraw,
            'creationTime': new Date()
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
            data.transactionId = data.id;
            data.userId = parseInt(data.userId, 10);

            data.bookingId = parseInt(data.bookingId, 10);
            data.transactionType = parseInt(data.transactionType, 10);

            data.transactionAmount = parseInt(data.transactionAmount, 10);
            data.creationTime = Utilities.castFromAPIFormat(decodeURI(data.creationTime));
        }
        return data;
    },

    _toJSON: function () {
        var json = _.clone(this.attributes);
        json.creationTime = Utilities.getDateString(this.get('creationTime'));
        return json;
    },

    toJSON: function () {
        var json = _.clone(this.attributes);

        json.creationTime = encodeURI(Utilities.castToAPIFormat(this.get('creationTime')));
        return json;
    }

});


var Transactions = Backbone.Collection.extend({

    model: Transaction,
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
        if ( typeof urlOverride !== 'undefined') {
            this.url = urlOverride;
        }
    }
});