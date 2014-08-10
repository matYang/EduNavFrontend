var User = Backbone.Model.extend({
    //TODO fill in Constants with enum int mapping
    defaults: function () {
        return {
            'id': -1,
            'userId': -1,

            'avatarUrl': '',
            'name': '',
            'phone': '',
            'password': '',
            'email': '',
            'status': 0,
            'invitationCode': '',
            'appliedInvitationCode': '',

            'creationTime': undefined,
            'lastLogin': undefined,
            'lastModifyTime': undefined,

            'account': new Account(),//现金账户
            'credit': new Credit(),//积分
            'couponTotal': 0 //优惠券
        };
    },

    idAttribute: 'id',

    urlRoot: Constants.origin + '/api/v1.0/user/user',

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
            if (data instanceof Array) {
                data = data[0];
            }
            data = Utilities.parseCleanNull(data);
            data.id = parseInt(data.id, 10);
            data.userId = data.id;

            data.status = parseInt(data.status, 10);

            data.creationTime = Utilities.castFromAPIFormat(data.creationTime);
            data.lastLogin = Utilities.castFromAPIFormat(data.lastLogin);
            data.lastModifyTime = Utilities.castFromAPIFormat(data.lastModifyTime);


            data.couponTotal = parseFloat(data.couponTotal);
            data.couponTotal = isNaN(data.couponTotal) ? 0 : data.couponTotal;
            data.account = new Account(data.account,{parse:true});
            data.credit = new Credit(data.credit,{parse:true});


        }
        return data;
    },

    _toJSON: function () {
        var json = _.clone(this.attributes);
        json.couponTotal = json.couponTotal.toFixed(0);
        json.creationTime = Utilities.getDateString(this.get('creationTime'));
        json.lastLogin = Utilities.getDateString(this.get('lastLogin'));
        json.lastModifyTime = Utilities.getDateString(this.get('lastModifyTime'));
        json.account = json.account._toJSON();
        json.credit = json.credit._toJSON();
        return json;
    },

    toJSON: function () {
        var json = _.clone(this.attributes);
        json.creationTime = Utilities.castToAPIFormat(this.get('creationTime'));
        json.lastLogin = Utilities.castToAPIFormat(this.get('lastLogin'));
        json.lastModifyTime = Utilities.castFromAPIFormat(json.lastModifyTime);
        return json;
    }

});

var Users = Backbone.Collection.extend({

    model: User,

    url: Constants.origin + '/api/v1.0/users/user',
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