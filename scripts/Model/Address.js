var Address = Backbone.Model.extend({
    defaults: function () {
        return {
            'id': -1,
            'lng':0,
            'lat':0,
            'realAddress': undefined,
            'detail': undefined
        };
    },
    idAttribute: 'id',

    parse: function (data) {
        if (typeof data !== 'undefined') {

            data.id = parseInt(data.id, 10);
        }
        return data;
    },
    _toJSON: function () {
        var json = _.clone(this.attributes);
        return json;
    },
    toLocationObj: function (label) {
        return {
            label: this.get('realAddress')||label,
            name: this.get('detail'),
            lat: this.get('lat'),
            lng: this.get('lng')
        }
    }
});


var Addresses = Backbone.Collection.extend({
    model: Address,

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
        if (typeof urlOverride !== 'undefined') {
            this.url = urlOverride;
        }
    },

    overrideUrl: function (urlOverride) {
        if (typeof urlOverride !== 'undefined') {
            this.url = urlOverride;
        }
    }
});