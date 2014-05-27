var UserSearchRepresentation = Backbone.Model.extend({

    defaults: function () {
        return {
            'userId': undefined,
            'name': undefined,
            'phone': undefined,
            'status': undefined,
            'creationTime': undefined,
            'email': undefined
        };
    },

    initialize: function () {
        _.bindAll(this, 'toQueryString', 'castFromQuery', 'toJSON');
    },

    toQueryString: function () {
        var queryArr = [];
        var queryObj = this.toJSON();

        for (var property in queryObj) {
            if (queryObj.hasOwnProperty(property) && typeof queryObj[property] !== 'undefined') {
                queryArr.push(property + '=' + queryObj[property]);
            }
        }

        return queryArr.join('&');
    },

    castFromQuery: function (queryObj) {
        for (var property in queryObj) {
            if (queryObj.hasOwnProperty(property) && typeof queryObj[property] !== 'undefined') {
                this.set(property, decodeURI(queryObj[property]));
            }
        }
    },

    toJSON: function(){
        var queryObj = {};

        queryObj.userId = this.get('userId');
        queryObj.name = typeof this.get('name') === 'undefined' ? undefined : encodeURI(this.get('name'));
        queryObj.phone = typeof this.get('phone') === 'undefined' ? undefined : encodeURI(this.get('phone'));
        queryObj.email = typeof this.get('email') === 'undefined' ? undefined : encodeURI(this.get('email'));
        queryObj.status = this.get('status');
        queryObj.creationTime = typeof this.get('creationTime') === 'undefined' ? undefined : Utilities.castToRepresentationFormat(this.get('creationTime'));

        return queryObj;
    }

});