var Partner = BaseUser.extend({

    defaults: function () {
        return {
            'partnerId': -1,
            'name':'',
            'license': '',
            'organizationNum': '',
            'reference': '',
            'password':'',

            'phone':'',
            'status': 0,
            'instName': '',
            'logoUrl':'',

            'creationTime': new Date(),
            'lastLogin': new Date()
        };
    },
    idAttribute: 'partnerId',

    urlRoot: Constants.origin + '/p-api/v1.0/partner/partner',

    parse: function (data) {
        if ( typeof data !== 'undefined') {
            
            data.partnerId = parseInt(data.partnerId, 10);
            data.name = decodeURI(data.name);

            data.license = decodeURI(data.license);
            data.organizationNum = decodeURI(data.organizationNum);
            data.reference = decodeURI(data.reference);

            data.phone = decodeURI(data.phone);
            data.status = parseInt(data.status, 10);
            data.instName = decodeURI(data.instName);
            data.logoUrl = decodeURI(data.logoUrl);

            data.creationTime = Utilities.castFromAPIFormat(data.creationTime);
            data.lastLogin = Utilities.castFromAPIFormat(data.lastLogin);
            
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
        json.license = encodeURI(json.license);
        json.organizationNum = encodeURI(json.organizationNum);
        json.reference = encodeURI(json.reference);
        json.password = encodeURI(json.password);
        json.phone = encodeURI(json.phone);
        json.instName = encodeURI(json.instName);
        json.logoUrl = encodeURI(json.logoUrl);

        json.creationTime = Utilities.castToAPIFormat(this.get('creationTime'));
        json.lastLogin = Utilities.castToAPIFormat(this.get('lastLogin'));
        return json;
    }
});


var Partners = Backbone.Collection.extend({

    model: Partner,

    url: Constants.origin + '/p-api/v1.0/partner',

    initialize: function (urlOverride) {
        _.bindAll(this, 'overrideUrl');
        if ( typeof urlOverride !== 'undefined') {
            this.url = urlOverride;
        }
    },

    overrideUrl: function (urlOverride) {
        if ( typeof urlOverride !== 'undefined') {
            this.url = urlOverride;
        }
    }
});