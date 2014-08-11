var CourseSearchRepresentation = Backbone.Model.extend({
    defaults: function () {
        return {
            'categoryValue': undefined,
            'locationValue': undefined,

            'institutionName': undefined,
            'status': EnumConfig.CourseStatus.onlined,

            //开课和结课日期
            'startDate': undefined,
            'finishDate': undefined,
            //上课的时间段
            'schoolTimeWeek': undefined,//平时 周末
            'schoolTimeDay': undefined,//上午 下午 晚上
            //开课日期(start end)
            'startDateStart': undefined,
            'startDateEnd': undefined,
            //课程费用(start end)
            'priceStart': undefined,
            'priceEnd': undefined,
            'classType': undefined,//班级类型 0，1，2，3

            'startCashback': undefined,
            'finishCashback': undefined,

            'courseReference': undefined,
            'partnerReference': undefined,

            'courseId': undefined,
            'partnerId': undefined,
            'userId': undefined,

            'useCache': 1,

            'startcreateTime': undefined,
            'finishcreateTime': undefined,
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

    toJSON: function () {
        var queryObj = _.clone(this.attributes);
        queryObj.startDate = typeof this.get('startDate') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('startDate'));
        queryObj.finishDate = typeof this.get('finishDate') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('finishDate'));

        queryObj.institutionName = typeof this.get('institutionName') === 'undefined' ? undefined : encodeURI(this.get('institutionName'));
        queryObj.courseReference = typeof this.get('courseReference') === 'undefined' ? undefined : encodeURI(this.get('courseReference'));
        queryObj.partnerReference = typeof this.get('partnerReference') === 'undefined' ? undefined : encodeURI(this.get('partnerReference'));
        queryObj.startcreateTime = typeof this.get('startcreateTime') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('startcreateTime'));
        queryObj.finishcreateTime = typeof this.get('finishcreateTime') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('finishcreateTime'));
        return queryObj;
    },
    toTitleString: function () {
        var buf = "";

        return buf;
    }

});