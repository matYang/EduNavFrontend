var BookingSearchRepresentation = Backbone.Model.extend({

    defaults: function () {
        return {
            'bookingId': undefined,
            'creationTime': undefined,

            'expectedTime': undefined,

            'startPrice': undefined,
            'finishPrice': undefined,
            'userId': undefined,
            'partnerId': undefined,
            'courseId': undefined,
            'name': undefined,
            'phone': undefined,
            'email': undefined,
            'status': undefined,
            'reference': undefined
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

        queryObj.bookingId = this.get('bookingId');
        queryObj.creationTime = typeof this.get('creationTime') === 'undefined' ? undefined : Utilities.castToRepresentationFormat(this.get('creationTime'));
        queryObj.expectedTime = typeof this.get('expectedTime') === 'undefined' ? undefined : Utilities.castToRepresentationFormat(this.get('expectedTime'));
        queryObj.startPrice = this.get('startPrice');
        queryObj.finishPrice = this.get('finishPrice');
        queryObj.userId = this.get('userId');
        queryObj.partnerId= this.get('partnerId');
        queryObj.courseId = this.get('courseId');
        queryObj.name = typeof this.get('name') === 'undefined' ? undefined : encodeURI(this.get('name'));
        queryObj.phone = typeof this.get('phone') === 'undefined' ? undefined : encodeURI(this.get('phone'));
        queryObj.email = typeof this.get('email') === 'undefined' ? undefined : encodeURI(this.get('email'));
        queryObj.status = this.get('status');
        queryObj.reference = typeof this.get('reference') === 'undefined' ? undefined : encodeURI(this.get('reference'));

        return queryObj;
    }

});