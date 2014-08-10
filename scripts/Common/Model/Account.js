var Account = Backbone.Model.extend({
    //TODO fill in Constants with enum int mapping
    defaults: function () {
        return {
            'id': -1,
            'balance': undefined,
            'realName': undefined,
            'lastModifiedTime': undefined,
            'createTime': undefined,
            'enabled': undefined,
            'deleted': undefined,
            'accountNumber': undefined
            
//            'accountHistoryList': [],
//            'withdrawList': []
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
            data.enabled = parseInt(data.enabled, 10);
            data.deleted = parseInt(data.deleted, 10);

            data.balance = parseFloat(data.balance);
            data.balance = isNaN(data.balance)?0:data.balance;

            data.createTime = Utilities.castFromAPIFormat(data.createTime);
        }
        return data;
    },

    _toJSON: function () {
        var json = _.clone(this.attributes);
        json.balance = json.balance.toFixed(2);
        json.createTime = Utilities.getDateString(this.get('createTime'));
        return json;
    },

    toJSON: function () {
        var json = _.clone(this.attributes);
        delete json.createTime;
        delete json.lastModifiedTime;
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