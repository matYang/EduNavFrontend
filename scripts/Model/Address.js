var Address = Backbone.Model.extend({
    defaults: function () {
        return {
            'id': -1,
            'detail':undefined
        };
    },
    idAttribute: 'id',

    parse: function (data) {
        var json = {};
        if ( typeof data !== 'undefined') {
            
            json.id = parseInt(data.id, 10);
        }
        return json;
    },
    _toJSON: function () {
        var json = _.clone(this.attributes);
        return json;
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