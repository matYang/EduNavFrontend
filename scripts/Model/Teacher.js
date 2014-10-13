var Teacher = Backbone.Model.extend({

    defaults: function () {
        return {
            'id': -1,
            'partnerId': -1,
            'name':'',
            'intro': '',
            'imgUrl': ''
        };
    },
    idAttribute: 'id',

    parse: function (data) {
        if ( typeof data !== 'undefined') {
            data.id = parseInt(data.id, 10);
            data.partnerId = parseInt(data.partnerId, 10);
        }
        return data;
    },
    _toJSON: function () {
        return _.clone(this.attributes);
    }
});

var Teachers = Backbone.Collection.extend({

    model: Teacher,
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