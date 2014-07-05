var Teacher = Backbone.Model.extend({

    defaults: function () {
        return {
            'teacherId': -1,
            'partnerId': -1,
            'name':'',
            'intro': '',
            'imgUrl': '',
            'creationTime': new Date()
        };
    },
    idAttribute: 'teacherId',

    urlRoot: Constants.origin + '/p-api/v1.0/teacher/teacher',

    parse: function (data) {
        var json = {};
        if ( typeof data !== 'undefined') {
            
            json.teacherId = parseInt(data.teacherId, 10);
            json.partnerId = parseInt(data.partnerId, 10);
            json.name = decodeURI(data.name);

            json.intro = decodeURI(data.intro);
            json.imgUrl = decodeURIComponenet(data.imgUrl);

            json.creationTime = Utilities.castFromAPIFormat(data.creationTime);
        }
        return json;
    },
    _toJSON: function () {
        var json = _.clone(this.attributes);
        json.creationTime = Utilities.getDateString(this.get('creationTime'));
        return json;
    },
    toJSON: function () {
        var json = _.clone(this.attributes);

        json.name = encodeURI(json.name);
        json.intro = encodeURI(json.intro);
        json.imgUrl = encodeURIComponent(json.imgUrl);

        json.creationTime = Utilities.castToAPIFormat(this.get('creationTime'));
        return json;
    }
});


var Teachers = Backbone.Collection.extend({

    model: Teacher,

    url: Constants.origin + '/api/v1.0/teacher',

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