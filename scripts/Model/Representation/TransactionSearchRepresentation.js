var UserSearchRepresentation = Backbone.Model.extend({

    defaults: function () {
        return {
            'transactionId': undefined,
            'userId': undefined,
            'bookingId': undefined,
            'transactionType': undefined,
            'startAmount': undefined,
            'finishAmount': undefined,

            'startcreateTime': undefined,
            'finishcreateTime': undefined
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
        queryObj.startcreateTime = typeof this.get('startcreateTime') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('startcreateTime'));
        queryObj.finishcreateTime = typeof this.get('finishcreateTime') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('finishcreateTime'));
        queryObj.startAmount = this.get('startAmount');
        queryObj.finishAmount = this.get('finishAmount');
        
        return queryObj;
    }

});