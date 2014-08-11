var Partner = Backbone.Model.extend({

    defaults: function () {
        return {
            'id': -1,
            'partnerId': -1,
            'wholeName':'',
            'licence': '',
            'organizationNum': '',

            'liscenceImgUrl': '',
            'taxRegistrationImgUrl': '',
            'eduQualificationImgUrl': '',
            'hqLocation': '',
            'subLocations': [],
            'uniformRegistraLocation': undefined,
            'hqContact': '',
            'hqContactPhone': '',
            'hqContactSecOpt': '',
            'courseContact': '',
            'courseContactPhone': '',
            'studentInqueryPhone': '',
            'registraContact': '',
            'registraContactPhone': '',
            'registraContactFax': '',
            'defaultCutoffDay': '',
            'defaultCutoffTime': '',
            'partnerQualification': '',

            'reference': '',
            'password':'',

            'status': 0,
            'instName': '',
            'partnerIntro': '',
            'partnerDistinction': '',

            'logoUrl':'',
            'classPhotoList': [],
            'teacherList': [],
            
            'createTime': new Date(),
            'lastLogin': new Date()
        };
    },
    idAttribute: 'id',

    urlRoot: Constants.origin + '/p-api/v1.0/partner/partner',

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
            json.liscenceImgUrl = decodeURI(data.liscenceImgUrl);
            json.taxRegistrationImgUrl = decodeURI(data.taxRegistrationImgUrl);
            json.eduQualificationImgUrl = decodeURI(data.eduQualificationImgUrl);
            json.hqLocation = decodeURI(data.hqLocation);
            json.subLocations = [];
            if (data.subLocations) {
                for (i = 0; i < data.subLocations.length; i++) {
                    json.subLocations[i] = decodeURI(data.subLocations[i]);
                }
            }
            json.uniformRegistraLocation = (data.uniformRegistraLocation == true);
            json.hqContact = decodeURI(data.hqContact);
            json.hqContactPhone = decodeURI(data.hqContactPhone);
            json.hqContactSecOpt = decodeURI(data.hqContactSecOpt);
            json.courseContact = decodeURI(data.courseContact);
            json.courseContactPhone = decodeURI(data.courseContactPhone);
            json.studentInqueryPhone = decodeURI(data.studentInqueryPhone);
            json.registraContact = decodeURI(data.registraContact);
            json.registraContactPhone = decodeURI(data.registraContactPhone);
            json.registraContactFax = decodeURI(data.registraContactFax);
            json.defaultCutoffDay = Utilities.toInt(data.defaultCutoffDay);
            json.defaultCutoffTime = Utilities.toInt(data.defaultCutoffTime);
            json.partnerQualification = Utilities.toInt(data.partnerQualification);

            json.licence = decodeURI(data.licence);
            json.organizationNum = decodeURI(data.organizationNum);
            json.reference = decodeURI(data.reference);

            json.status = parseInt(data.status, 10);
            json.instName = decodeURI(data.instName);
            json.logoUrl = decodeURIComponent(data.logoUrl);

            if (data.classPhotoList) {
                for (var i = 0; i < data.classPhotoList.length; i++ ) {
                    photos[i] = new Photo(data.classPhotoList[i], {parse: true});
                }
                json.classPhotoList = photos;
            }
            if (data.teacherList) {
                for (var i = 0; i < data.teacherList.length; i++ ) {
                    teachers[i] = new Teacher(data.teacherList[i], {parse: true});
                }
                json.teacherList = teachers;
            }

            json.createTime = Utilities.castFromAPIFormat(data.createTime);
            json.lastLogin = Utilities.castFromAPIFormat(data.lastLogin);
            
        }
        return json;
    },
    _toJSON: function () {
        var json = _.clone(this.attributes), i;
        json.createTime = Utilities.getDateString(this.get('createTime'));
        if (json.classPhotoList) {
            for (var i = 0; i < json.classPhotoList.length; i++ ) {
                if (json.classPhotoList[i] instanceof Photo) {
                    json.classPhotoList[i] = json.classPhotoList[i]._toJSON();
                }
            }
        }
        if (json.teacherList) {
            for (var i = 0; i < json.teacherList.length; i++ ) {
                if (json.teacherList[i] instanceof Teacher) {
                    json.teacherList[i] = json.teacherList[i]._toJSON();
                }
            }
        }
        return json;
    },
    toJSON: function () {
        var json = _.clone(this.attributes);

        json.wholeName = (json.wholeName);
        json.licence = (json.licence);
        json.organizationNum = (json.organizationNum);
        json.reference = (json.reference);
        json.password = (json.password);
        json.instName = (json.instName);
        json.logoUrl = (json.logoUrl);
        if (json.classPhotoList) {
            for (var i = 0; i < json.classPhotoList.length; i++ ) {
                if (json.classPhotoList[i] instanceof Photo) {
                    json.classPhotoList[i] = json.classPhotoList[i].toJSON();
                }
            }
        }
        if (json.teacherList) {
            for (var i = 0; i < json.teacherList.length; i++ ) {
                if (json.teacherList[i] instanceof Teacher) {
                    json.teacherList[i] = json.teacherList[i].toJSON();
                }
            }
        }
        json.createTime = Utilities.castToAPIFormat(this.get('createTime'));
        json.lastLogin = Utilities.castToAPIFormat(this.get('lastLogin'));
        json.liscenceImgUrl = (json.liscenceImgUrl);
        json.taxRegistrationImgUrl = (json.taxRegistrationImgUrl);
        json.eduQualificationImgUrl = (json.eduQualificationImgUrl);
        json.hqLocation = (json.hqLocation);
        if (json.subLocations) {
            for (i = 0; i < json.subLocations.length; i++) {
                json.subLocations[i] = (json.subLocations[i]);
            }
        }
        json.uniformRegistraLocation = (json.uniformRegistraLocation == true);
        json.hqContact = (json.hqContact);
        json.hqContactPhone = (json.hqContactPhone);
        json.hqContactSecOpt = (json.hqContactSecOpt);
        json.courseContact = (json.courseContact);
        json.courseContactPhone = (json.courseContactPhone);
        json.studentInqueryPhone = (json.studentInqueryPhone);
        json.registraContact = (json.registraContact);
        json.registraContactPhone = (json.registraContactPhone);
        json.registraContactFax = (json.registraContactFax);
        return json;
    }
});


var Partners = Backbone.Collection.extend({

    model: Partner,

    url: Constants.origin + '/p-api/v1.0/partner',
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