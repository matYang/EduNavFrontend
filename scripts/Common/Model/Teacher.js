var Teacher = Backbone.Model.extend({

    defaults: function () {
        return {
            'id': -1,
            'teacherId': -1,
            'partnerId': -1,
            'name':'',
            'intro': '',
            'imgUrl': '',
            'createTime': new Date()
        };
    },
    idAttribute: 'id',

    urlRoot: Constants.origin + '/p-api/v1.0/teacher/teacher',

    parse: function (data) {
        var json = {};
        if ( typeof data !== 'undefined') {
            
            json.id = parseInt(data.id, 10);
            json.teacherId = json.id;
            json.partnerId = parseInt(data.partnerId, 10);

            json.createTime = Utilities.castFromAPIFormat(data.createTime);
        }
        return json;
    },
    _toJSON: function () {
        var json = _.clone(this.attributes);
        json.createTime = Utilities.getDateString(this.get('createTime'));
        return json;
    },
    toJSON: function () {
        var json = _.clone(this.attributes);

        json.name = (json.name);
        json.intro = (json.intro);
        json.imgUrl = (json.imgUrl);

        json.createTime = Utilities.castToAPIFormat(this.get('createTime'));
        return json;
    }
});


var Teachers = Backbone.Collection.extend({

    model: Teacher,

    url: Constants.origin + '/api/v1.0/teacher',
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