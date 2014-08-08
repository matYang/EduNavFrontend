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

            'creationTime': new Date(),
            'lastLogin': new Date(),
            'lastModifyTime': new Date(),

            'account': new Account(),//积分账户
            'credit': new Credit(),//现金账户
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


            data.couponTotal = parseInt(data.couponTotal, 10);
            data.couponTotal = isNaN(data.couponTotal) ? 0 : data.couponTotal;
            data.account = new Account(data.account,{parse:true});
            data.credit = new Credit(data.credit,{parse:true});


        }
        return data;
    },

    _toJSON: function () {
        var json = _.clone(this.attributes);
        json.creationTime = Utilities.getDateString(this.get('creationTime'));
        json.lastLogin = Utilities.getDateString(this.get('lastLogin'));
        return json;
    },

    toJSON: function () {
        var json = _.clone(this.attributes);
        json.creationTime = Utilities.castToAPIFormat(this.get('creationTime'));
        json.lastLogin = Utilities.castToAPIFormat(this.get('lastLogin'));
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