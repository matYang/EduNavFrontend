var Transaction = Backbone.Model.extend({
    //TODO fill in Constants with enum int mapping
    defaults: function () {
        return {
            'transactionId': -1,
            'userId': -1,
            
            'bookingId': -1,
            'couponId': -1,
            'transactionAmount': 0,
            'transactionType': EnumConfig.TransactionType.withdraw,
            'creationTime': new Date()
        };
    },

    idAttribute: 'transactionId',

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
            data.transactionId = parseInt(data.transactionId, 10);
            data.userId = parseInt(data.userId, 10);

            data.bookingId = parseInt(data.bookingId, 10);
            data.couponId = parseInt(data.couponId, 10);
            data.transactionType = parseInt(data.transactionType, 10);

            data.transactionAmount = parseInt(data.transactionAmount, 10);
            data.creationTime = Utilities.castFromAPIFormat(data.creationTime);
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

        json.creationTime = Utilities.castToAPIFormat(this.get('creationTime'));
        return json;
    }

});


var Transactions = Backbone.Collection.extend({

    model: Transaction,

    initialize: function (urlOverride) {
        _.bindAll(this, 'overrideUrl');
        if ( typeof urlOverride !== 'undefined') {
            this.url = urlOverride;
        }
    }
});