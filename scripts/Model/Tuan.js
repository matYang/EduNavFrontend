var Tuan = Backbone.Model.extend({
        defaults: function () {
            return {
                'id': -1,
                'courseId': -1,
                'title': -1,//团购标题
                'groupBuyPrice':undefined,//团购价格
                'hot':undefined,
                'photoList':undefined,
                'endTime':undefined
            };
        },
        parse: function (data) {
            if (typeof data !== 'undefined') {
                data.id = parseInt(data.id, 10);
                data.courseId = parseInt(data.courseId, 10);
                data.hot = parseInt(data.hot, 10);
                data.groupBuyPrice = Utilities.parseNum(data.groupBuyPrice);
                data.endTime = Utilities.castFromAPIFormat(data.endTime);
                data.status = parseInt(data.status, 10);
            }
            return data;
        },
        _toJSON: function () {
            var json = _.clone(this.attributes), studyDays, i;
            json.endTime = Utilities.getDateString(this.get('endTime'));

            if (json.classPhotoList) {
                var classPhotoList = [];
                json.classPhotoList.forEach(function (photo) {
                    classPhotoList.push((photo._toJSON()));
                });
                json.classPhotoList = classPhotoList;
            }
            return json;
        },
        isNew: function () {
            return this.get("id") === -1;
        },
        //todo 简化的tuan对象 这里主要用于生成tuan列表 multiPageView中会优先使用该方法 其次为_toJSON方法
//        _toSimpleJSON: function () {
//            var json = {};
//
//            json.id = this.get("id");
//            json.courseName = this.get("courseName");
//            json.logoUrl = this.get("logoUrl");
//            json.instName = this.get("instName");
//
//            return json;
//        }
    });

var Tuans = Backbone.Collection.extend({
    model: Tuan,
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