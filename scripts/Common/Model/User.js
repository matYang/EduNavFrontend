var BaseUser = Backbone.Model.extend({
    //TODO fill in Constants with enum int mapping
    defaults: function () {
        return {
            "userId": -1,
            
            "name": "default",
            "phone": "default",
            "password": "default",
            
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

    overrideUrl: function (urlRootOverride) {
        if (typeof urlRootOverride !== 'undefined') {
            this.urlRoot = urlRootOverride;
        }
    },

    isNew: function () {
        return this.id === -1;
    },

    parse: function (data) {
        if ( typeof data !== 'undefined' && typeof data.userId !== 'undefined') {
            data.userId = parseInt(data.userId, 10);

            data.lastLogin = Utilities.castFromAPIFormat(data.lastLogin);
            data.creationTime = Utilities.castFromAPIFormat(data.creationTime);

            data.status = parseInt(data.status, 10);
            data.name = decodeURI(data.name);
        }
        return data;
    },

    _toJSON: function () {
        var json = this.toJSON();
        return json;
    },

    toJSON: function () {
        var json = _.clone(this.attributes);
        json.lastLogin = Utilities.castToAPIFormat(this.get('lastLogin'));
        json.creationTime = Utilities.castToAPIFormat(this.get('creationTime'));
        json.name = encodeURI(json.name);
        return json;
    },

});

var User = BaseUser.extend({


});

var Users = Backbone.Collection.extend({

    model: BaseUser,

    url: Constants.origin + "/api/v1.0/users/user",

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