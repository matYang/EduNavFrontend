var Admin = Backbone.Model.extend({
    defaults: function () {
        return {
            'adminId': -1,
            'password':'',

            'name': '',
            'phone': '',

            'reference': '',
            'privilege': 0,

            'status': 0,
            'creationTime': new Date(),
            'lastLogin': new Date()
        };
    },
    idAttribute: 'adminId',
    parse: function (data) {
        if ( typeof data !== 'undefined') {
            data.adminId = parseInt(data.adminId, 10);
            data.name = decodeURI(data.name);
            data.phone = decodeURI(data.phone);
            data.reference = decodeURI(data.reference);

            data.privilege = parseInt(data.privilege, 10);
            data.status = parseInt(data.status, 10);

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
        json.password = encodeURI(json.password);
        json.name = encodeURI(json.name);
        json.phone = encodeURI(json.phone);
        json.reference = encodeURI(json.reference);
        json.creationTime = Utilities.castToAPIFormat(this.get('creationTime'));
        json.lastLogin = Utilities.castToAPIFormat(this.get('lastLogin'));
        return json;
    }

});

var Admins = Backbone.Collection.extend({

    model: Admin,

    url: Constants.origin + '/a-api/v1.0/admin',

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