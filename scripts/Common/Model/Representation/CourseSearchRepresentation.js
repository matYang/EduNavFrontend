var CourseSearchRepresentation = Backbone.Model.extend({
    defaults: function () {
        return {
            'categoryValue': undefined,
            'locationValue': undefined,

            'startDate': undefined,
            'finishDate': undefined,
            
            'institutionName': undefined,
            'status': EnumConfig.CourseStatus.onlined,
            
            'startPrice': undefined,
            'finishPrice': undefined,
//            'startClassSize': undefined,
//            'finishClassSize': undefined,
            'classType':undefined,//班级类型 0，1，2，3

            'startCashback': undefined,
            'finishCashback': undefined,
            
            'courseReference': undefined,
            'partnerReference': undefined,
            
            'courseId': undefined,
            'partnerId': undefined,
            'userId': undefined,

            'useCache': 1,

            'startCreationTime': undefined,
            'finishCreationTime': undefined,
            'startCutoffDate': undefined,
            'finishCutoffDate': undefined,
            'startUponArrival': undefined,
            'start': undefined,
            'count': undefined,
            'order': undefined,
            'sortBy': undefined
        };
    },

    initialize: function () {
        _.bindAll(this, 'toQueryString', 'castFromQuery', 'toJSON');
    },

    toQueryString: function () {
        var queryArr = [];
        var queryObj = this.toJSON();
        queryObj.useCache = undefined;
        for (var property in queryObj) {
            if (queryObj.hasOwnProperty(property) && typeof queryObj[property] !== 'undefined') {
                queryArr.push(property + '=' + queryObj[property]);
            }
        }

        return queryArr.join('&');
    },

    castFromQuery: function (queryObj) {
        var obj, i, temp;
        if (typeof queryObj === "string") {
            obj = queryObj.split("&");
            queryObj = {};
            for (i = 0; i < obj.length; i++) {
                temp = obj[i].split("=");
                queryObj[temp[0]] = temp[1];
            }
        }
        for (var property in queryObj) {
            if (queryObj.hasOwnProperty(property) && typeof queryObj[property] !== 'undefined') {
                this.set(property, decodeURI(queryObj[property]));
                if (property.indexOf("Date") > 0) {
                    this.set(property, Utilities.castFromAPIFormat(queryObj[property]));
                }
            }
        }
    },

    toJSON: function(){
        var queryObj = _.clone(this.attributes);
        queryObj.startDate = typeof this.get('startDate') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('startDate'));
        queryObj.finishDate = typeof this.get('finishDate') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('finishDate'));

        queryObj.institutionName = typeof this.get('institutionName') === 'undefined' ? undefined : encodeURI(this.get('institutionName'));
        queryObj.courseReference = typeof this.get('courseReference') === 'undefined' ? undefined : encodeURI(this.get('courseReference'));
        queryObj.partnerReference = typeof this.get('partnerReference') === 'undefined' ? undefined : encodeURI(this.get('partnerReference'));
        queryObj.startCreationTime = typeof this.get('startCreationTime') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('startCreationTime'));
        queryObj.finishCreationTime = typeof this.get('finishCreationTime') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('finishCreationTime'));
        return queryObj;
    },
    toTitleString: function() {
        var buf = "";

        return buf;
    }

});