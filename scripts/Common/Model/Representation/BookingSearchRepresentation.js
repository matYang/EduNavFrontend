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
            'statusSet': [],
            'preStatus':undefined,
            'reference': undefined,

            'priceStart': undefined,
            'priceEnd': undefined,

            'order': 'desc',
            'columnKey': 'createTime',

            'scheduledTimeStart': undefined,
            'scheduledTimeEnd': undefined,

            'type': undefined
        };
    },

    initialize: function () {
        _.bindAll(this, 'toQueryString', 'castFromQuery', 'toJSON');
    },

    toQueryString: function () {
        var queryArr = [];
        var queryObj = this.toJSON();

        for (var key in queryObj) {
            if (queryObj.hasOwnProperty(key) && typeof queryObj[key] !== 'undefined') {
                if($.isArray(queryObj[key])){
                    _.each(queryObj[key],function(val){
                        queryArr.push(key + '=' + val);
                    });
                }else{
                    queryArr.push(key + '=' + queryObj[key]);
                }
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
        return _.clone(this.attributes);
    }

});