var TuanSearchRepresentation = Backbone.Model.extend({
    defaults: function () {
        //todo 确定需要过滤的字段条件
        return {

            'courseId':undefined,
            'title':undefined,

            'circleId': undefined,
            'categoryId': undefined,

            'createTimeStart':undefined,//创建日期的start和end范围
            'createTimeEnd':undefined,
            'endTimeStart':undefined,//结束日期的start和end范围
            'endTimeEnd':undefined,
            'groupBuyPriceStart':undefined,//团购价格的start和end范围
            'groupBuyPriceEnd':undefined,

            'hot':undefined,
            'status': EnumConfig.CourseStatus.onlined,


            'useCache': 0,//不使用缓存

            'start': undefined,
            'count': undefined,

            'order': undefined,
            'columnKey': undefined

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
        queryObj.endTimeStart = typeof this.get('endTimeStart') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('endTimeStart'));
        queryObj.endTimeEnd = typeof this.get('endTimeEnd') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('endTimeEnd'));
        queryObj.createTimeStart = typeof this.get('createTimeStart') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('createTimeStart'));
        queryObj.createTimeEnd = typeof this.get('createTimeEnd') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('createTimeEnd'));
        return queryObj;
    },
    toTitleString: function () {
        var buf = "";

        return buf;
    }

});