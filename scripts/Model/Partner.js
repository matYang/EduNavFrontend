var Partner = Backbone.Model.extend({

    defaults: function () {
        return {
            'id': -1,
            'wholeName':'',
            'hqLocation': '',
            'partnerQualification': '',
            'reference': '',
            'instName': '',
            'partnerIntro': '',
            'partnerDistinction': '',
            'logoUrl':'',
            'classPhotoList': [],
            'teacherList': [],
            'addressList':[],
            'createTime': new Date()
        };
    },
    idAttribute: 'id',

    parse: function (data) {
        var i, json = {}, photos = [], photoIds = [], teachers = [], teacherIds = [];
        if ( typeof data !== 'undefined') {
            if (data instanceof Array) {
                data = data[0];
            }
            json.id = parseInt(data.id, 10);
            json.partnerId = json.id;
            json.wholeName = decodeURI(data.wholeName);

            json.partnerIntro = decodeURI(data.partnerIntro);
            json.partnerDistinction = decodeURI(data.partnerDistinction);
            json.hqLocation = decodeURI(data.hqLocation);

            json.partnerQualification = Utilities.toInt(data.partnerQualification);
            json.reference = decodeURI(data.reference);

            json.status = parseInt(data.status, 10);
            json.instName = decodeURI(data.instName);
            json.logoUrl = decodeURIComponent(data.logoUrl);

            if (data.classPhotoList) {
                for (i = 0; i < data.classPhotoList.length; i++ ) {
                    photos[i] = new Photo(data.classPhotoList[i], {parse: true});
                }
                json.classPhotoList = photos;
            }
            if (data.teacherList) {
                for (i = 0; i < data.teacherList.length; i++ ) {
                    teachers[i] = new Teacher(data.teacherList[i], {parse: true});
                }
                json.teacherList = teachers;
            }

            json.createTime = Utilities.castFromAPIFormat(data.createTime);
            
        }
        return json;
    },
    _toJSON: function () {
        var json = _.clone(this.attributes), i;
        json.createTime = Utilities.getDateString(this.get('createTime'));
//        if (json.classPhotoList) {
//            for (i = 0; i < json.classPhotoList.length; i++ ) {
//                if (json.classPhotoList[i] instanceof Photo) {
//                    json.classPhotoList[i] = json.classPhotoList[i]._toJSON();
//                }
//            }
//        }
//        if (json.teacherList) {
//            for (i = 0; i < json.teacherList.length; i++ ) {
//                if (json.teacherList[i] instanceof Teacher) {
//                    json.teacherList[i] = json.teacherList[i]._toJSON();
//                }
//            }
//        }
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
        if ( typeof urlOverride !== 'undefined') {
            this.url = urlOverride;
        }
    },

    overrideUrl: function (urlOverride) {
        if ( typeof urlOverride !== 'undefined') {
            this.url = urlOverride;
        }
    }
});