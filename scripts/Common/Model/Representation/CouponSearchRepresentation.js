var UserSearchRepresentation = Backbone.Model.extend({

    defaults: function () {
        return {
            'couponId': undefined,
            'bookingId': undefined,

            'userId': undefined,
            'startAmount': undefined,
            'finishAmount': undefined,
            'startOriginalAmount': undefined,
            'finishOriginalAmount': undefined,
            'expireTime': undefined,
            'status': undefined,
            'origin': undefined,

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

        queryObj.couponId = this.get('couponId');
        queryObj.bookingId = this.get('bookingId');

        queryObj.userId = this.get('userId');
        queryObj.startAmount = this.get('startAmount');
        queryObj.finishAmount = this.get('finishAmount');
        queryObj.startOriginalAmount = this.get('startOriginalAmount');
        queryObj.finishOriginalAmount = this.get('finishOriginalAmount');
        queryObj.startcreateTime = typeof this.get('startcreateTime') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('startcreateTime'));
        queryObj.finishcreateTime = typeof this.get('finishcreateTime') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('finishcreateTime'));
        queryObj.expireTime = typeof this.get('expireTime') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('expireTime'));
        queryObj.status = this.get('status');
        queryObj.origin = this.get('origin');
        

        return queryObj;
    }

});