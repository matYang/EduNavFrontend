var User = Backbone.Model.extend({
    //TODO fill in Constants with enum int mapping
    defaults: function () {
        return {
            'userId': -1,
            
            'balance': 0,
            'coupon': 0,
            'credit': 0,

            'name': '',
            'phone': '',
            'password': '',
            'email': '',
            
            'status': 0,
            'creationTime': new Date (),
            'lastLogin': new Date (),

            'bookings': new Bookings(),
            'coupons': new Coupons(),
            'credits': new Credits()
        };
    },

    idAttribute: 'userId',

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
        if ( typeof data !== 'undefined') {
            data.userId = parseInt(data.userId, 10);

            data.balance = parseInt(data.balance, 10);
            data.coupon = parseInt(data.coupon, 10);
            data.credit = parseInt(data.credit, 10);

            data.name = decodeURI(data.name);
            data.phone = decodeURI(data.phone);
            data.email = decodeURI(data.email);

            data.status = parseInt(data.status, 10);
            data.creationTime = Utilities.castFromAPIFormat(data.creationTime);
            data.lastLogin = Utilities.castFromAPIFormat(data.lastLogin);

            data.transactions = new Transactions(data.transactions, {parse: true});
            data.coupons = new Coupons(data.coupons, {parse: true});
            data.credits = new Credits(data.credits, {parse: true});
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

        json.name = encodeURI(json.name);
        json.phone = encodeURI(json.phone);
        json.password = encodeURI(json.password);
        json.email = encodeURI(json.email);
        
        json.creationTime = Utilities.castToAPIFormat(this.get('creationTime'));
        json.lastLogin = Utilities.castToAPIFormat(this.get('lastLogin'));
        json.name = encodeURI(json.name);
        return json;
    }

});

var Users = Backbone.Collection.extend({

    model: User,

    url: Constants.origin + '/api/v1.0/users/user',

    initialize: function (urlOverride) {
        _.bindAll(this, 'overrideUrl');
        if ( typeof urlOverride !== 'undefined') {
            this.url = urlOverride;
        }
    }
});