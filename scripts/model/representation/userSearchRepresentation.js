var UserSearchRepresentation = Backbone.Model.extend({

    defaults: function () {
        return {
            'location': Constants.getDefaultUserLocation(),
            'gender': Constants.gender.both,
            'name': ""
        };
    },

    initialize: function () {
        _.bindAll(this, 'toString', 'castFromString', 'parse', 'toJSON');
    },

    toString: function () {
        return encodeURI(this.get("name")) + Config.urlSeperator + this.get('gender') + Config.urlSeperator + this.get('location').get("defaultId");
    },

    castFromString: function (str) {
        var strArray = str.split(Config.urlSeperator);

        this.set('name', decodeURI(strArray[0]));
        this.set('gender', parseInt(strArray[1], 10));
        
        loc.castFromString(strArray[2]);
        this.set('location', loc);

    },

    parse: function (data) {
        data.location = new UserLocation (data.location, {
            parse: true
        });
        data.gender = parseInt(data.gender, 10);
        return data;
    },

    toJSON: function () {
        var json = _.clone(this.attributes);
        if (this.get('location') instanceof Backbone.Model) {
            json.location = this.get('location').toJSON();
        }
    }
}); 