var Photo = Backbone.Model.extend({
    defaults: function () {
        return {
            'photoId': -1,

        	'partnerId': -1,	//All images should associate with a partner
            'imgUrl': '',
            'title':'',
            'description': '',
            'creationTime': new Date()
        };
    },
    idAttribute: 'photoId',

    urlRoot: Constants.origin + '/p-api/v1.0/photo/photo',

    parse: function (data) {
        var json = {};
        if ( typeof data !== 'undefined') {
            
            json.photoId = parseInt(data.photoId, 10);
            json.title = decodeURI(data.title);
            json.partnerId = parseInt(data.partnerId, 10);

            json.description = decodeURI(data.description);
            json.imgUrl = decodeURI(data.imgUrl);
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

        json.title = encodeURI(json.title);
        json.description = encodeURI(json.description);
        json.imgUrl = encodeURI(json.imgUrl);

        json.creationTime = Utilities.castToAPIFormat(this.get('creationTime'));
        return json;
    }
});


var Photos = Backbone.Collection.extend({

    model: Photo,

    url: Constants.origin + '/api/v1.0/photo',

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