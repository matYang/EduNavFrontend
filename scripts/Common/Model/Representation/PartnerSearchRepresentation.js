var PartnerSearchRepresentation = Backbone.Model.extend({

    defaults: function () {
        return {
            'partnerId': undefined,
            'wholeName': undefined,
            'licence': undefined,
            'organizationNum': undefined,
            'reference': undefined,
            'phone': undefined,
            'status': undefined,
            'instName': undefined,

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

        queryObj.partnerId = this.get('partnerId');
        queryObj.wholeName = typeof this.get('wholeName') === 'undefined' ? undefined : encodeURI(this.get('wholeName'));
        queryObj.licence = typeof this.get('licence') === 'undefined' ? undefined : encodeURI(this.get('licence'));
        queryObj.organizationNum = typeof this.get('organizationNum') === 'undefined' ? undefined : encodeURI(this.get('organizationNum'));
        queryObj.reference = typeof this.get('reference') === 'undefined' ? undefined : encodeURI(this.get('reference'));
        queryObj.phone = typeof this.get('phone') === 'undefined' ? undefined : encodeURI(this.get('phone'));
        queryObj.status = this.get('status');
        queryObj.instName = typeof this.get('instName') === 'undefined' ? undefined : encodeURI(this.get('instName'));
        queryObj.startCreationTime = typeof this.get('startCreationTime') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('startCreationTime'));
        queryObj.finishCreationTime = typeof this.get('finishCreationTime') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('finishCreationTime'));

        return queryObj;
    }

});