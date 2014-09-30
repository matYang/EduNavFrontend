var Comment = Backbone.Model.extend({
    defaults: function () {
        return {
            'id': -1,
            'userId':undefined,
            'title':undefined,
            'content':undefined,
            'user':undefined,

            //评分内容
            'conditionRating':undefined,
            'attitudeRating':undefined,
            'satisfactionRating':undefined,

            'createTime':undefined

        };
    },
    parse: function (data) {
        if (typeof data !== 'undefined') {
            data.id = parseInt(data.id, 10);
            data.userId = parseInt(data.userId, 10);

            data.conditionRating = Utilities.parseNum(data.conditionRating);
            data.attitudeRating = Utilities.parseNum(data.attitudeRating);
            data.satisfactionRating = Utilities.parseNum(data.satisfactionRating);

            data.createTime = Utilities.castFromAPIFormat(data.createTime);
        }
        return data;
    },
    _toJSON: function () {
        var json = _.clone(this.attributes);

        json.createTime = Utilities.getDateString(this.get('createTime'));
        json.evenRating = ((json.attitudeRating+json.conditionRating+json.satisfactionRating)/3).toFixed(1);


        return json;
    },
    isNew: function () {
        return this.get("id") === -1;
    }

});

var Comments = Backbone.Collection.extend({
    model: Comment,
    start: 0,
    count: 0,
    total: 0,
    parse: function (data) {
        if (!data.data) return data;
        this.start = data.start;
        this.count = data.count;
        this.total = data.total;
        return data.data;
    },
    initialize: function (urlOverride) {
        _.bindAll(this, 'overrideUrl');
        if (typeof urlOverride !== 'undefined') {
            this.url = urlOverride;
        }
    },

    overrideUrl: function (urlOverride) {
        if (typeof urlOverride !== 'undefined') {
            this.url = urlOverride;
        }
    }
});