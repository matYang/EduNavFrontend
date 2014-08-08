var User = Backbone.Model.extend({
    //TODO fill in Constants with enum int mapping
    defaults: function () {
        return {
            'id': -1,
            'userId': -1,
            
            'balance': 0,
            'coupon': 0,
            'credit': 0,

            'name': '',
            'phone': '',
            'password': '',
            'email': '',
            'status': 0,
            'invitationCode': '',
            'appliedInvitationCode': '',
            'accountNumber':'',

            'creationTime': new Date (),
            'lastLogin': new Date ()

//            'bookingList': new Bookings(),
//            'couponList': new Coupons(),
//            'creditList': new Credits()
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
        if ( typeof data !== 'undefined') {
            if (data instanceof Array) {
                data = data[0];
            }
            data = Utilities.parseCleanNull(data);
            data.id = parseInt(data.id, 10);
            data.userId = data.id;

            data.balance = parseInt(data.balance, 10);
            data.coupon = parseInt(data.coupon, 10);
            data.credit = parseInt(data.credit, 10);

            data.balance = isNaN(data.balance) ? 0 : data.balance;
            data.coupon = isNaN(data.coupon) ? 0 : data.coupon;
            data.credit = isNaN(data.credit) ? 0 : data.credit;

            data.name = decodeURI(data.name);
            data.phone = decodeURI(data.phone);
            data.email = decodeURIComponent(data.email);

            data.status = parseInt(data.status, 10);
            data.invitationCode = decodeURI(data.invitationCode);
            data.appliedInvitationCode = decodeURI(data.appliedInvitationCode);
            data.accountNumber = decodeURI(data.accountNumber);

            data.creationTime = Utilities.castFromAPIFormat(decodeURIComponent(data.creationTime));
            data.lastLogin = Utilities.castFromAPIFormat(decodeURIComponent(data.lastLogin));

//            data.bookingList = new Bookings(data.bookingList, {parse: true});
//            data.couponList = new Coupons(data.couponList, {parse: true});
//            data.creditList = new Credits(data.creditList, {parse: true});
//            var i;
//            for ( i = 0; i < data.couponList.length; i++){
//                var coupon = data.couponList.at(i);
//                var now = new Date();
//                if (coupon.get("expireTime").getTime() <= now.getTime()) {
//                    coupon.set("status", EnumConfig.CouponStatus.expired);
//                }
//            }
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
        json.name = (json.name);
        json.phone = (json.phone);
        json.password = (json.password);
        json.email = (json.email);

        json.appliedInvitationCode = (json.appliedInvitationCode);
        
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
        if ( typeof urlOverride !== 'undefined') {
            this.url = urlOverride;
        }
    }
});