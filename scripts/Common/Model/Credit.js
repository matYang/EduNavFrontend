var Credit = Backbone.Model.extend({
    //TODO fill in Constants with enum int mapping
    defaults: function () {
        return {
            'creditId': -1,
            
            'bookingId': -1,
            'userId': -1,
            'amount': 0,
            'creationTime': new Date(),
            'expireTime': new Date(),
            'status': EnumConfig.CreditStatus.usable,
            'usableTime': new Date()
        };
    },

    idAttribute: 'creditId',

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
            data.creditId = parseInt(data.creditId, 10);

            data.bookingId = parseInt(data.bookingId, 10);
            data.userId = parseInt(data.userId, 10);
            data.amount = parseInt(data.amount, 10);

            data.creationTime = Utilities.castFromAPIFormat(data.creationTime);
            data.expireTime = Utilities.castFromAPIFormat(data.expireTime);

            data.status = parseInt(data.status, 10);
            data.usableTime = Utilities.castFromAPIFormat(data.usableTime);
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
        json.usableTime = Utilities.castToAPIFormat(this.get('usableTime'));
        return json;
    }

});


var Credits = Backbone.Collection.extend({

    model: Credit,

    initialize: function (urlOverride) {
        _.bindAll(this, 'overrideUrl');
        if ( typeof urlOverride !== 'undefined') {
            this.url = urlOverride;
        }
    }
});