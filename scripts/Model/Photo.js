var Photo = Backbone.Model.extend({
    defaults: function () {
        return {
            'id': -1,
            'classPhotoId': -1,

        	'partnerId': -1,	//All images should associate with a partner
            'imgUrl': '',
            'title':'',
            'description': '',
            'createTime': new Date()
        };
    },
    idAttribute: 'id',

    urlRoot: Constants.origin + '/p-api/v1.0/photo/photo',

    parse: function (data) {
        var json = {};
        if ( typeof data !== 'undefined') {
            
            json.id = parseInt(data.id, 10);
            json.classPhotoId = json.id;
            json.title = decodeURI(data.title);
            json.partnerId = parseInt(data.partnerId, 10);

            json.description = decodeURI(data.description);
            json.imgUrl = decodeURIComponent(data.imgUrl);
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

        json.title = (json.title);
        json.description = (json.description);
        json.imgUrl = (json.imgUrl);

        json.createTime = Utilities.castToAPIFormat(this.get('createTime'));
        return json;
    }
});


var Photos = Backbone.Collection.extend({

    model: Photo,

    url: Constants.origin + '/api/v1.0/photo',
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