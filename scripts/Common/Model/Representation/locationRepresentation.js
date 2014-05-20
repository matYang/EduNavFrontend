var UserLocation = Backbone.Model.extend({
    urlRoot: Constants.origin + "/api/v1.0/location/default",
    defaults: function () {
        return {
            //first 3 reserved for default locations only
            'id': -1,

            'province': 'Ontario',
            'city': 'Waterloo',
            'district': 'Waterloo'
        };
    },

    initialize: function () {
        _.bindAll(this, 'isNew', 'isDefault','toUiString', 'toJSON',  'equals', 'isEquivalentTo', 'parse', 'parseGoogleJson', 'isInRange', '_getDistanceFromLatLon', '_deg2rad');
    },

    clone: function () {
        var newLocation = new UserLocation();
        var json = _.clone(this.attributes);
        $.each(json, function(key, value) {
            newLocation.set(key, value);
        });
        return newLocation;
    },
    copy: function (val) {
        var json = _.clone(this.attributes);
        $.each(json, function(key, value) {
            val.set(key, value);
        });
    },
    toUiString: function () {
        return this.get('pointName');
    },

    equals: function (val) {
        if ( val instanceof Backbone.Model) {
            if (this.isDefault() && val.isDefault()){
                return this.get('defaultId') === val.get('defaultId');
            }
            else if (!this.isDefault() && !val.isDefault()){
                return this.get('province') === val.get('province') &&
                    this.get('city') === val.get('city') &&
                    this.get('district') === this.get('district');
            }
            return false;
        }
        return false;
    },


    isEquivalentTo: function (val) {
        if ( val instanceof UserLocation) {
            return this.get('city') === val.get('city');
        }
        return false;
    },


    parse: function (json) {
        if (typeof json.defaultId !== 'undefined' && json.defaultId >= 0){
            json.defaultId = parseInt(json.defaultId, 10);
            json.radius = parseInt(json.radius, 10);
            json.synonyms = decodeURI(json.synonyms);
        }
        json.id = parseInt(json.id, 10);
        json.province = decodeURI(json.province);
        json.city = decodeURI(json.city);
        json.district= decodeURI(json.region);

        return json;
    },

    toJSON: function () {
        var json = _.clone(this.attributes);
        json.province = encodeURI(json.province);
        json.city = encodeURI(json.city);
        json.district= encodeURI(json.region);
        return json;
    },


    //TODO
    //also need to get lat and lng
    parseGoogleJson: function (json) {
        return json;
    },

    
    _getDistanceFromLatLon: function(lat1,lon1,lat2,lon2){
        var R = 6371; // Radius of the earth in km
        var dLat = this._deg2rad(lat2-lat1);  // deg2rad below
        var dLon = this._deg2rad(lon2-lon1);
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(this._deg2rad(lat1)) * Math.cos(this._deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c; // Distance in km
        return d;
    },

    _deg2rad: function(deg) {
        return deg * (Math.PI/180);
    }

});

var DefaultUserLocations = Backbone.Collection.extend({
    model: UserLocation,

    url: Constants.origin + "/api/v1.0/general/location",

    initialize: function (urlOverride) {
        _.bindAll(this, 'overrideUrl', 'findMatch');
        if ( typeof urlOverride !== 'undefined') {
            this.url = urlOverride;
        }

    },

    overrideUrl: function (urlOverride) {
        if ( typeof urlOverride !== 'undefined') {
            this.url = urlOverride;
        }
    },

    //TODO
    findMatch: function(locKeyStr){
        return this;
    }

});
