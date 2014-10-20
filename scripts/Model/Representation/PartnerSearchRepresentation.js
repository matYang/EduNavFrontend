var PartnerSearchRepresentation = Backbone.Model.extend({
    defaults: function () {
        return {
            'partnerId': undefined,
            'instName': undefined,

            'categoryValue': undefined,//筛选课程类目
            'locationValue': undefined,//筛选地址
            'circleValue': undefined,//筛选商圈

            'useCache': 1,
            'startcreateTime': undefined,
            'finishcreateTime': undefined,

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
        queryObj.createTimeStart = typeof this.get('createTimeStart') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('createTimeStart'));
        queryObj.createTimeEnd = typeof this.get('createTimeEnd') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('createTimeEnd'));
        return queryObj;
    },
    toTitleString: function () {
        var buf = "";

        return buf;
    }

});