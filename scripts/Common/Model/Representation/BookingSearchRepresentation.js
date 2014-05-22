var BookingSearchRepresentation = Backbone.Model.extend({

    defaults: function () {
        return {
            'bookingId': undefined,
            'creationTime': undefined,
            'startTime': undefined,
            'finishTime': undefined,
            'startPrice': undefined,
            'finishPrice': undefined,
            'userId': undefined,
            'partnerId': undefined,
            'courseId': undefined,
            'name': undefined,
            'phone': undefined,
            'status': undefined,
            'reference': undefined
        };
    },

    initialize: function () {
        _.bindAll(this, 'toQueryString', 'castFromQuery');
    },

    toQueryString: function () {
        var queryArr = [];
        var queryObj = {};

        queryObj.bookingId = this.get('bookingId');
        queryObj.creationTime = typeof this.get('creationTime') === 'undefined' ? undefined : Utilities.castToRepresentationFormat(this.get('creationTime'));
        queryObj.startTime = typeof this.get('startTime') === 'undefined' ? undefined : Utilities.castToRepresentationFormat(this.get('startTime'));
        queryObj.finishTime = typeof this.get('finishTime') === 'undefined' ? undefined : Utilities.castToRepresentationFormat(this.get('finishTime'));
        queryObj.startPrice = this.get('startPrice');
        queryObj.finishPrice = this.get('finishPrice');
        queryObj.userId = this.get('userId');
        queryObj.partnerId= this.get('partnerId');
        queryObj.courseId = this.get('courseId');
        queryObj.name = this.get('name');
        queryObj.phone = this.get('phone');
        queryObj.status = this.get('status');
        queryObj.reference = this.get('reference');


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