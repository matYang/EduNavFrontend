var UserSearchRepresentation = Backbone.Model.extend({

    defaults: function () {
        return {
            'transactionId': undefined,
            'userId': undefined,
            'bookingId': undefined,
            'transactionType': undefined,
            'startAmount': undefined,
            'finishAmount': undefined,

            'startCreationTime': undefined,
            'finishCreationTime': undefined
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

        queryObj.transactionId = this.get('transactionId ');
        queryObj.userId = this.get('userId');
        queryObj.bookingId = this.get('bookingId');
        queryObj.transactionType = this.get('transactionType');
        queryObj.startCreationTime = typeof this.get('startCreationTime') === 'undefined' ? undefined : Utilities.castToRepresentationFormat(this.get('startCreationTime'));
        queryObj.finishCreationTime = typeof this.get('finishCreationTime') === 'undefined' ? undefined : Utilities.castToRepresentationFormat(this.get('finishCreationTime'));
        queryObj.startAmount = this.get('startAmount');
        queryObj.finishAmount = this.get('finishAmount');
        
        return queryObj;
    }

});