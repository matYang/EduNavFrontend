var CourseSearchRepresentation = Backbone.Model.extend({
    defaults: function () {
        return {
            'categoryValue': undefined,
            'locationValue': undefined,

            //'province': undefined,
            'city': undefined,
            'district': undefined,
            
            'startDate': undefined,
            'finishDate': undefined,
            
            'institutionName': undefined,
            'status': EnumConfig.CourseStatus.openEnroll,
            
            'startPrice': undefined,
            'finishPrice': undefined,
            'startClassSize': undefined,
            'finishClassSize': undefined,
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
            'page': 0
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
            }
        }
    },

    toJSON: function(){
        var queryObj = {};

        queryObj.category = typeof this.get('category') === 'undefined' ? undefined : encodeURI(this.get('category'));
        queryObj.subCategory = typeof this.get('subCategory') === 'undefined' ? undefined : encodeURI(this.get('subCategory'));
        queryObj.subSubCategory = typeof this.get('subSubCategory') === 'undefined' ? undefined : encodeURI(this.get('subSubCategory'));
        queryObj.city = typeof this.get('city') === 'undefined' ? undefined : encodeURI(this.get('city'));
        queryObj.district = typeof this.get('district') === 'undefined' ? undefined : encodeURI(this.get('district'));
        queryObj.startDate = typeof this.get('startDate') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('startDate'));
        queryObj.finishDate = typeof this.get('finishDate') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('finishDate'));

        queryObj.institutionName = typeof this.get('institutionName') === 'undefined' ? undefined : encodeURI(this.get('institutionName'));
        queryObj.status = this.get('status');

        queryObj.startPrice = this.get('startPrice');
        queryObj.finishPrice = this.get('finishPrice');
        queryObj.startClassSize = this.get('startClassSize');
        queryObj.finishClassSize = this.get('finishClassSize');
        queryObj.startCashback = this.get('startCashback');
        queryObj.finishCashback = this.get('finishCashback');

        queryObj.courseReference = typeof this.get('courseReference') === 'undefined' ? undefined : encodeURI(this.get('courseReference'));
        queryObj.partnerReference = typeof this.get('partnerReference') === 'undefined' ? undefined : encodeURI(this.get('partnerReference'));
        queryObj.courseId = this.get('courseId');
        queryObj.partnerId = this.get('partnerId');
        queryObj.userId = this.get('userId');
        queryObj.startCreationTime = typeof this.get('startCreationTime') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('startCreationTime'));
        queryObj.finishCreationTime = typeof this.get('finishCreationTime') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('finishCreationTime'));
        return queryObj;
    },
    toTitleString: function() {
        var buf = "";
        buf += (typeof this.get('district') === 'undefined') ? "" :  this.get('district') + " " ;
        buf += (typeof this.get('category') === 'undefined') ? "" : this.get('category');
        buf += (typeof this.get('subCategory') === 'undefined') ? "" : (">" + this.get('subCategory'));
        buf += (typeof this.get('subSubCategory') === 'undefined') ? "" : (">" + this.get('subSubCategory'));
        return buf;
    }

});

