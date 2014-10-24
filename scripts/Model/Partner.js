var Partner = Backbone.Model.extend({

    defaults: function () {
        return {
            'id': -1,
            'wholeName': '',
            'hqLocation': '',
            'partnerQualification': '',
            'reference': '',
            'instName': '',
            'partnerIntro': '',
            'partnerDistinction': '',
            'logoUrl': '',

            'rating': 4.0, // 评分初始值为4
            'popularity': 0,
            'teacherCount': 0,
            'courseCount': 0,

            'classPhotoList': [],
            'teacherList': [],
            'addressList': [],
            'categoryList': [],
            'createTime': new Date()
        };
    },
    idAttribute: 'id',

    parse: function (data) {
        var i, photos = [], addresses = [], teachers = [];
        if (typeof data !== 'undefined') {
            if (data instanceof Array) {
                data = data[0];
            }
            data.id = parseInt(data.id, 10);
            data.partnerId = data.id;
            data.rating = Utilities.parseNum(data.rating, 1);

            data.partnerQualification = Utilities.toInt(data.partnerQualification);
            data.status = parseInt(data.status, 10);

            if (data.classPhotoList) {
                for (i = 0; i < data.classPhotoList.length; i++) {
                    photos[i] = new Photo(data.classPhotoList[i], {parse: true});
                }
                data.classPhotoList = photos;
            }
            if (data.teacherList) {
                for (i = 0; i < data.teacherList.length; i++) {
                    teachers[i] = new Teacher(data.teacherList[i], {parse: true});
                }
                data.teacherList = teachers;
            }
            if (data.addressList) {
                for (i = 0; i < data.addressList.length; i++) {
                    addresses[i] = new Address(data.addressList[i], {parse: true});
                }
                data.addressList = addresses;
            }

            data.createTime = Utilities.castFromAPIFormat(data.createTime);

        }
        return data;
    },
    _toJSON: function () {
        var json = _.clone(this.attributes), i;
        json.createTime = Utilities.getDateString(this.get('createTime'));
        if (json.teacherList) {
            var teacherList = [];
            json.teacherList.forEach(function (teacher) {
                teacherList.push((teacher._toJSON()));
            });
            json.teacherList = teacherList;
        }
        if (json.classPhotoList) {
            var classPhotoList = [];
            json.classPhotoList.forEach(function (photo) {
                classPhotoList.push((photo._toJSON()));
            });
            json.classPhotoList = classPhotoList;
        }
        if (json.addressList) {
            var addressList = [];
            json.addressList.forEach(function (address) {
                addressList.push((address._toJSON()));
            });
            json.addressList = addressList;
        }
        return json;
    }
});


var Partners = Backbone.Collection.extend({

    model: Partner,

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