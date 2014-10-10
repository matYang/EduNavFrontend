var Tuan = Backbone.Model.extend({
    defaults: function () {
        return {
            'id': -1,
            'courseId': -1,
            'title': -1,//团购标题
            'groupBuyPrice': undefined,//团购价格
            'bookingTotal': 0,//预订总数
            'hot': undefined,//是否指定推荐 banner的四个团购课程
            'endTime': undefined,//到期时间
            'status': undefined,//上线状态

            'photoList': [],//团购的图片 banner中只取第一张
            'addressList': [],//团购活动覆盖的地址
            'course': undefined //Course model 实际上是template
        };
    },
    parse: function (data) {
        if (typeof data !== 'undefined') {
            data.id = parseInt(data.id, 10);
            data.courseId = parseInt(data.courseId, 10);

            data.groupBuyPrice = Utilities.parseNum(data.groupBuyPrice);
            data.bookingTotal = parseInt(data.bookingTotal, 10);
            data.hot = parseInt(data.hot, 10);
            data.endTime = data.endTime || 0;
            data.status = parseInt(data.status, 10);

            data.course = new Course(data.course, {parse: true});
            //不存在原价则使用爱上课价代替
            if (!data.course.get('originalPrice')) {
                data.course.set('originalPrice', data.course.get('price'))
            }
            if (data.addressList) {
                for (i = 0; i < data.addressList.length; i++) {
                    data.addressList[i] = new Address(data.addressList[i], {parse: true});
                }
            }
        }
        return data;
    },
    _toJSON: function () {
        var json = _.clone(this.attributes);

        json.endTimeText = Utilities.getDateString(this.get('endTime'));

        if (json.addressList) {
            var addressList = [];
            json.addressList.forEach(function (address) {
                addressList.push((address._toJSON()));
            });
            json.addressList = addressList;
        }
        json.course = json.course._toJSON();
        json.discount = parseFloat(10 * json.groupBuyPrice / json.course.originalPrice).toFixed(1);
        //生成markers
        json.addressMarkers = [];
        _.each(json.addressList, function (address) {
            json.addressMarkers.push(address.split('（')[0].split('(')[0]);
        });
        json.addressMarkers = json.addressMarkers.join('|');
        return json;
    },
    isNew: function () {
        return this.get("id") === -1;
    }
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