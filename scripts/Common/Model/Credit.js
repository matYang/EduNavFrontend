var Credit = Backbone.Model.extend({
    //TODO fill in Constants with enum int mapping
    defaults: function () {
        return {
            'id': -1,
            'creditId': -1,
            
            'bookingId': -1,
            'userId': -1,
            'amount': 0,
            'creationTime': new Date(),
            'expireTime': new Date(),

            'status': EnumConfig.CreditStatus.usable
            
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
            data.creditId = data.id;

            data.bookingId = parseInt(data.bookingId, 10);
            data.userId = parseInt(data.userId, 10);
            data.amount = parseInt(data.amount, 10);

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
        json.usableTime = Utilities.getDateString(this.get('usableTime'));
        return json;
    },

    toJSON: function () {
        var json = _.clone(this.attributes);

        json.creationTime = Utilities.castToAPIFormat(this.get('creationTime'));
        json.expireTime = Utilities.castToAPIFormat(this.get('expireTime'));
        return json;
    }

});


var Credits = Backbone.Collection.extend({

    model: Credit,
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