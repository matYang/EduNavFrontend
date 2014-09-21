var Booking = Backbone.Model.extend({

    defaults: function () {
        return {
            'id': -1,
            'bookingId': -1,
            'userId': -1,
            'partnerId': -1,
            'courseId': -1,
            'courseTemplateId': -1,
            'reference':undefined,

            /*需要填写的信息*/
            'name': undefined,
            'phone': undefined,
            'email': undefined,
            'scheduledTime': undefined,


            'status': undefined,//订单状态
            'type': undefined,//订单类型 线上还是线下
            'note': undefined,     //各种record

            'price': undefined,//价格
            'cashbackAmount': undefined,//返利总额
            'realCashbackAmount': undefined,//实际返利总额

            'enabled':undefined,

            'createTime': new Date(),
            'lastModifyTime': new Date(),
            'noRefundDate': new Date(),
            'cashbackDate': new Date(),

            'course': new Course(),
            'actionList':[]
        };
    },

    idAttribute: 'id',

    urlRoot: Constants.origin + '/api/v2/booking/',

    initialize: function (urlRootOverride) {
        _.bindAll(this, 'overrideUrl');

        if (typeof urlRootOverride !== 'undefined') {
            this.urlRoot = urlRootOverride;
        }
    },

    overrideUrl: function (urlRootOverride) {
        if (typeof urlRootOverride !== 'undefined') {
            this.urlRoot = urlRootOverride;
        }
    },

    isNew: function () {
        return this.id === -1;
    },

    parse: function (data) {
        if (typeof data !== 'undefined') {
            data.id = parseInt(data.id, 10);
            data.bookingId = data.id;
            data.userId = parseInt(data.userId, 10);
            data.partnerId = parseInt(data.partnerId, 10);
            data.courseId = parseInt(data.courseId, 10);
            data.courseTemplateId = parseInt(data.courseTemplateId, 10);

            data.enabled = Utilities.parseNum(data.enabled);
            
            data.price = Utilities.parseNum(data.price);
            data.status = parseInt(data.status, 10);
            data.cashbackAmount = Utilities.parseNum(data.cashbackAmount);
            data.realCashbackAmount = Utilities.parseNum(data.realCashbackAmount);
            data.scheduledTime = Utilities.castFromAPIFormat(data.scheduledTime);
            data.createTime = Utilities.castFromAPIFormat(data.createTime);
            data.lastModifyTime = Utilities.castFromAPIFormat(data.lastModifyTime);

            data.noRefundDate = Utilities.castFromAPIFormat(data.noRefundDate);
            data.cashbackDate = Utilities.castFromAPIFormat(data.cashbackDate);
            data.type = parseInt(data.type, 10);
            data.course = new Course(data.course, {parse: true});
        }
        return data;
    },
    _toJSON: function () {
        var json = _.clone(this.attributes);
        json.scheduledTime = Utilities.getDateString(this.get('scheduledTime'));
        json.createTime = Utilities.getDateString(this.get('createTime'));
        json.lastModifyTime = Utilities.getDateString(this.get('lastModifyTime'));

//        json.price = json.price.toFixed(2);
        if (json.course) {
            json.course = json.course._toJSON();
        }
        return json;
    },
    toJSON: function () {//使用backbone进行resource的交互时采用的toJSON方法
        var json = _.clone(this.attributes);
        json.type = parseInt(this.get('type'), 10);

        json.scheduledTime = Utilities.castToAPIFormat(this.get('scheduledTime'));
        json.noRefundDate = undefined;
        json.actionList = undefined;
        json.bookingId = undefined;
        json.cashbackDate = undefined;
        json.course = undefined;
        json.createTime = undefined;
        json.lastModifyTime = undefined;
        json.reference = undefined;
        json.enabled = undefined;
        json.note = json.note||''+'【PC】';
        return json;
    },
    initBookingFromCourse: function (course) {

        this.set("userId", app.sessionManager.sessionModel.id);
        this.set("partnerId", course.get("partnerId"));
        this.set("courseId", course.get("id"));
        this.set("courseTemplateId", course.get("courseTemplateId"));
        this.set("course", course);
        this.set("price", course.get("price"));
        this.set("cashbackAmount", course.get("cashback"));
        //TODO add cashbackAmount when course is finalized
    }
});

var Bookings = Backbone.Collection.extend({

    model: Booking,
    start: 0,
    count: 0,
    total: 0,
    url: Constants.origin + '/api/v1.0/booking',
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
