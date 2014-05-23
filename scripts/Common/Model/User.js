var BaseUser = Backbone.Model.extend({
    //TODO fill in Constants with enum int mapping
    defaults: function () {
        return {
            "userId": -1,
            
            "name": "",
            "phone": "",
            "password": "",
            
            "status": 0,
            "creationTime": new Date (),
            "lastLogin": new Date ()
        };
    },

    idAttribute: "userId",

    urlRoot: Constants.origin + "/api/v1.0/user/user",

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

            data.name = decodeURI(data.name);
            data.phone = decodeURI(data.phone);

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

        json.name = encodeURI(json.name);
        json.phone = encodeURI(json.phone);
        json.password = encodeURI(json.password);
        
        json.creationTime = Utilities.castToAPIFormat(this.get('creationTime'));
        json.lastLogin = Utilities.castToAPIFormat(this.get('lastLogin'));
        json.name = encodeURI(json.name);
        return json;
    }

});

var User = BaseUser.extend({});


var Users = Backbone.Collection.extend({

    model: User,

    url: Constants.origin + "/api/v1.0/users/user",

    initialize: function (urlOverride) {
        _.bindAll(this, 'overrideUrl');
        if ( typeof urlOverride !== 'undefined') {
            this.url = urlOverride;
        }
    }
});