var CommentSearchRepresentation = Backbone.Model.extend({
    defaults: function () {
        //todo 确定需要过滤的字段条件
        return {
            'courseId':undefined,

            'createTimeStart': undefined,//创建日期的start和end范围
            'createTimeEnd': undefined,

            'start': undefined,
            'count': undefined,

            'order': undefined,
            'columnKey': undefined

        };
    },

    initialize: function () {
        _.bindAll(this, 'toQueryString', 'toJSON');
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


    toJSON: function () {
        var queryObj = _.clone(this.attributes);
        queryObj.createTimeStart = typeof this.get('createTimeStart') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('createTimeStart'));
        queryObj.createTimeEnd = typeof this.get('createTimeEnd') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('createTimeEnd'));
        return queryObj;
    }
});