var BookingSearchRepresentation = Backbone.Model.extend({

    defaults: function () {
        return {
            'bookingId': undefined,
            'userId': undefined,
            'partnerId': undefined,
            'courseId': undefined,
            'name': undefined,
            'phone': undefined,
            'email': undefined,
            'status': undefined,
            'preStatus':undefined,
            'reference': undefined,

            'startPrice': undefined,
            'finishPrice': undefined,

            'startScheduledTime': undefined,
            'finishScheduledTime': undefined,
            'startAdjustTime': undefined,
            'finishAdjustTime': undefined,
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

        queryObj.bookingId = this.get('bookingId');
        queryObj.startPrice = this.get('startPrice');
        queryObj.finishPrice = this.get('finishPrice');
        queryObj.userId = this.get('userId');
        queryObj.partnerId= this.get('partnerId');
        queryObj.courseId = this.get('courseId');
        queryObj.name = typeof this.get('name') === 'undefined' ? undefined : encodeURI(this.get('name'));
        queryObj.phone = typeof this.get('phone') === 'undefined' ? undefined : encodeURI(this.get('phone'));
        queryObj.email = typeof this.get('email') === 'undefined' ? undefined : encodeURI(this.get('email'));
        queryObj.status = this.get('status');
        queryObj.preStatus = this.get('preStatus');
        queryObj.reference = typeof this.get('reference') === 'undefined' ? undefined : encodeURI(this.get('reference'));


        queryObj.startScheduledTime = typeof this.get('startScheduledTime') === 'undefined' ? undefined : Utilities.castToRepresentationFormat(this.get('startScheduledTime'));
        queryObj.finishScheduledTime = typeof this.get('finishScheduledTime') === 'undefined' ? undefined : Utilities.castToRepresentationFormat(this.get('finishScheduledTime'));
        queryObj.startAdjustTime = typeof this.get('startAdjustTime') === 'undefined' ? undefined : Utilities.castToRepresentationFormat(this.get('startAdjustTime'));
        queryObj.finishAdjustTime = typeof this.get('finishAdjustTime') === 'undefined' ? undefined : Utilities.castToRepresentationFormat(this.get('finishAdjustTime'));
        queryObj.startCreationTime = typeof this.get('startCreationTime') === 'undefined' ? undefined : Utilities.castToRepresentationFormat(this.get('startCreationTime'));
        queryObj.finishCreationTime = typeof this.get('finishCreationTime') === 'undefined' ? undefined : Utilities.castToRepresentationFormat(this.get('finishCreationTime'));

        return queryObj;
    }

});