var Account = Backbone.Model.extend({
    //TODO fill in Constants with enum int mapping
    defaults: function () {
        return {
            'id': -1, //int
            'balance': 0, //现金账户余额 double
            'realName': undefined,//真实名字 暂未用 string
            'lastModifiedTime': undefined, //int
            'createTime': undefined, //int
            'enabled': undefined,  //int
            'deleted': undefined, //int
            'accountNumber': undefined //现金账号 string
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
            data.balance = Utilities.parseNum(data.balance);

            data.enabled = Utilities.parseNum(data.enabled);
            data.deleted = Utilities.parseNum(data.deleted, 10);

            data.balance = parseFloat(data.balance);
            data.balance = isNaN(data.balance)?0:data.balance;

            data.createTime = Utilities.castFromAPIFormat(data.createTime);
            data.lastModifiedTime = Utilities.castFromAPIFormat(data.lastModifiedTime);
        }
        return data;
    },

    _toJSON: function () {
        var json = _.clone(this.attributes);
        json.createTime = Utilities.getDateString(this.get('createTime'));
        json.lastModifiedTime = Utilities.getDateString(this.get('lastModifiedTime'));
        return json;
    },

    toJSON: function () {
        var json = _.clone(this.attributes);
        delete json.createTime;
        delete json.lastModifiedTime;
        return json;
    }

});