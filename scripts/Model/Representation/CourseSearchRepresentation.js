var CourseSearchRepresentation = Backbone.Model.extend({
    defaults: function () {
        return {

            'templateId': undefined,//相关课程搜索（同一个模板）

            'categoryValue': undefined,//筛选课程类目
            'categoryId': undefined,
            'locationValue': undefined,//筛选地址
            'circleValue': undefined,//筛选商圈
            'circleId': undefined,

            'courseName': undefined,
            'status': EnumConfig.CourseStatus.onlined,

            //开课和结课日期
            'startDate': undefined,
            'finishDate': undefined,
            //上课的时间段
            'schooltimeWeek': undefined,//平时 周末
            'schooltimeDay': undefined,//上午 下午 晚上
            //开课日期(start end)
            'startDateStart': undefined,
            'startDateEnd': undefined,
            //课程费用(start end)
            'priceStart': undefined,
            'priceEnd': undefined,
            'classType': undefined,//班级类型 0，1，2，3

            'commission': undefined,
            'originalPriceStart': undefined,
            'cashbackStart': undefined,
            'cashbackEnd': undefined,

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
            'columnKey': undefined,

            'enabled': 1//等于1 会将templateId相同的课程只显示一个 在相关课程中调用需要设为undefined
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
                queryArr.push(property + '=' + encodeURIComponent(queryObj[property]));
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
                this.set(property, decodeURIComponent(queryObj[property]));
                if (property.indexOf("Date") > 0) {
                    this.set(property, Utilities.castFromAPIFormat(queryObj[property]));
                }
            }
        }
    },

    toJSON: function () {
        var queryObj = _.clone(this.attributes);
        queryObj.startDateStart = typeof this.get('startDateStart') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('startDateStart'));
        queryObj.startDateEnd = typeof this.get('startDateEnd') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('startDateEnd'));
        queryObj.createTimeStart = typeof this.get('createTimeStart') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('createTimeStart'));
        queryObj.createTimeEnd = typeof this.get('createTimeEnd') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('createTimeEnd'));
//        queryObj.courseName = encodeURIComponent(queryObj.courseName);
        return queryObj;
    },
    toTitleString: function () {
        var buf = "";

        return buf;
    }

});