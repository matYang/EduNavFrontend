var Partner = BaseUser.extend({

    defaults: function () {
        return {
            "partnerId": -1,
            "name":"",
            "license": "",
            "organizationNum": "",
            "reference": "",
            "password":"",

            "phone":"",
            "status": 0,
            "instName": "",
            "logoUrl":"",

            "creationTime": new Date(),
            "lastLogin": new Date()
        };
    },
    idAttribute: "partnerId",

    urlRoot: Constants.origin + "/p-api/v1.0/partner/partner",

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
    }
});


var Partners = Backbone.Collection.extend({

    model: Partner,

    url: Constants.origin + "/p-api/v1.0/partner",

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