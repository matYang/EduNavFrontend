var UserSearchRepresentation = Backbone.Model.extend({

    defaults: function () {
        return {
            'userId': undefined,
            'name': undefined,
            'phone': undefined,
            'status': undefined,
            'creationTime': undefined
        };
    },

    initialize: function () {
        _.bindAll(this, 'toQueryString', 'castFromQuery');
    },

    toQueryString: function () {
        var queryArr = [];
        var queryObj = {};

        
        queryObj.userId = this.get('userId');
        queryObj.name = this.get('name');
        queryObj.phone = this.get('phone');
        queryObj.status = this.get('status');
        queryObj.creationTime = typeof this.get('creationTime') === 'undefined' ? undefined : Utilities.castToRepresentationFormat(this.get('creationTime'));


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
                this.set(property, queryObj[property]);
            }
        }
    }

});