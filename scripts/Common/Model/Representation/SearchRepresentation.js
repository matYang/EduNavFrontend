var SearchRepresentation = Backbone.Model.extend({

    defaults: function () {
        return {
            'isRoundTrip': false,
            'departureMatch_Id': -1,
            'arrivalMatch_Id': -1,
            'departureDate': new Date (),
            'arrivalDate': new Date (),
            'targetType': 2,
            'departureTimeSlot': 0,
            'arrivalTimeSlot': 0,
            'timeStamp': new Date()
        };
    },

    initialize: function () {
        _.bindAll(this, 'toString', 'castFromString', 'parse', 'toJSON');
    },

    toString: function () {
        return this.get('isRoundTrip') + Config.urlSeperator + this.get('departureMatch_Id') + Config.urlSeperator + this.get('arrivalMatch_Id') + Config.urlSeperator + Utilities.castToAPIFormat(this.get('departureDate')) + Config.urlSeperator + Utilities.castToAPIFormat(this.get('arrivalDate')) + Config.urlSeperator + this.get('targetType') + Config.urlSeperator + this.get('departureTimeSlot') + Config.urlSeperator + this.get('arrivalTimeSlot') + Config.urlSeperator + Utilities.castToAPIFormat(new Date());
    },

    castFromString: function (str) {
        var strArray = str.split(Config.urlSeperator);
        this.set('isRoundTrip', strArray[0] === 'true');

        this.set('departureMatch_Id', parseInt(strArray[1], 10));
        this.set('arrivalMatch_Id', parseInt(strArray[2], 10));

        this.set('departureDate', Utilities.castFromAPIFormat(strArray[3]));
        this.set('arrivalDate', Utilities.castFromAPIFormat(strArray[4]));

        this.set('targetType', parseInt(strArray[5], 10));
        this.set('departureTimeSlot', parseInt(strArray[6], 10));
        this.set('arrivalTimeSlot', parseInt(strArray[7], 10));
    },

    parse: function (data) {
        data.departureMatch_Id = parseInt(data.departureMatch_Id, 10);
        data.arrivalMatch_Id = parseInt(data.arrivalMatch_Id, 10);
        data.departureDate = Utilities.castFromAPIFormat(data.departureDate);
        data.arrivalDate = Utilities.castFromAPIFormat(data.arrivalDate);
        return data;
    },

    toJSON: function () {
        var json = _.clone(this.attributes);
        if (this.get('departureDate')) {
            json.departureDate = Utilities.castToAPIFormat(this.get('departureDate'));
        }
        if (this.get('arrivalDate')) {
            json.arrivalDate = Utilities.castToAPIFormat(this.get('arrivalDate'));
        }
        return json;
    }

});

var SearchRepresentations = Backbone.Collection.extend({

    model: SearchRepresentation,

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