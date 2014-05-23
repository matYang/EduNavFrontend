var PartnerSearchRepresentation = Backbone.Model.extend({

    defaults: function () {
        return {
            'partnerId': undefined,
            'name': undefined,
            'licence': undefined,
            'organizationNum': undefined,
            'reference': undefined,
            'phone': undefined,
            'status': undefined,
            'instName': undefined,
            'creationTime': undefined
        };
    },

    initialize: function () {
        _.bindAll(this, 'toQueryString', 'castFromQuery');
    },

    toQueryString: function () {
        var queryArr = [];
        var queryObj = {};

        queryObj.partnerId = this.get('partnerId');
        queryObj.name = this.get('name');
        queryObj.licence = this.get('licence');
        queryObj.organizationNum = this.get('organizationNum');
        queryObj.reference = this.get('reference');
        queryObj.phone = this.get('phone');
        queryObj.status = this.get('status');
        queryObj.instName = this.get('instName');
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