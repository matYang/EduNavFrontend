var Partner = Backbone.Model.extend({

    defaults: function () {
        return {
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
            
            'creationTime': new Date(),
            'lastLogin': new Date()
        };
    },
    idAttribute: 'partnerId',

    urlRoot: Constants.origin + '/p-api/v1.0/partner/partner',

    parse: function (data) {
        var i, json = {}, photos = [], photoIds = [], teachers = [], teacherIds = [];
        if ( typeof data !== 'undefined') {
            
            json.partnerId = parseInt(data.partnerId, 10);
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
                    photos[i] = decodeURI(data.classPhotoList[i]);
                }
                json.classPhotoList = photos;
            }
            if (data.teacherList) {
                for (var i = 0; i < data.teacherList.length; i++ ) {
                    teachers[i] = new Teacher(data.teacherList[i], {parse: true});
                }
                json.teacherList = teachers;
            }

            json.creationTime = Utilities.castFromAPIFormat(data.creationTime);
            json.lastLogin = Utilities.castFromAPIFormat(data.lastLogin);
            
        }
        return json;
    },
    _toJSON: function () {
        var json = _.clone(this.attributes), i;
        json.creationTime = Utilities.getDateString(this.get('creationTime'));
        if (json.teacherList) {
            for (i = 0; i < json.teacherList.length; i++ ) {
                json.teacherList[i] = json.teacherList[i]._toJSON();
            }
        }
        if (json.classPhotoList) {
            for (i = 0; i < json.classPhotoList.length; i++ ) {
                json.classPhotoList[i] = json.classPhotoList[i]._toJSON();
            }
        }
        return json;
    },
    toJSON: function () {
        var json = _.clone(this.attributes);

        json.wholeName = encodeURI(json.wholeName);
        json.licence = encodeURI(json.licence);
        json.organizationNum = encodeURI(json.organizationNum);
        json.reference = encodeURI(json.reference);
        json.password = encodeURI(json.password);
        json.instName = encodeURI(json.instName);
        json.logoUrl = encodeURI(json.logoUrl);
        if (json.classPhotoList) {
            for (var i = 0; i < json.classPhotoList.length; i++ ) {
                json.classPhotoList[i] = encodeURI(json.classPhotoList[i]);
            }
        }
        if (json.teacherList) {
            for (var i = 0; i < json.teacherList.length; i++ ) {
                json.teacherList[i] = json.teacherList[i].toJSON();
            }
        }
        json.creationTime = Utilities.castToAPIFormat(this.get('creationTime'));
        json.lastLogin = Utilities.castToAPIFormat(this.get('lastLogin'));
        json.liscenceImgUrl = encodeURI(json.liscenceImgUrl);
        json.taxRegistrationImgUrl = encodeURI(json.taxRegistrationImgUrl);
        json.eduQualificationImgUrl = encodeURI(json.eduQualificationImgUrl);
        json.hqLocation = encodeURI(json.hqLocation);
        if (json.subLocations) {
            for (i = 0; i < json.subLocations.length; i++) {
                json.subLocations[i] = encodeURI(json.subLocations[i]);
            }
        }
        json.uniformRegistraLocation = (json.uniformRegistraLocation == true);
        json.hqContact = encodeURI(json.hqContact);
        json.hqContactPhone = encodeURI(json.hqContactPhone);
        json.hqContactSecOpt = encodeURI(json.hqContactSecOpt);
        json.courseContact = encodeURI(json.courseContact);
        json.courseContactPhone = encodeURI(json.courseContactPhone);
        json.studentInqueryPhone = encodeURI(json.studentInqueryPhone);
        json.registraContact = encodeURI(json.registraContact);
        json.registraContactPhone = encodeURI(json.registraContactPhone);
        json.registraContactFax = encodeURI(json.registraContactFax);
        return json;
    }
});


var Partners = Backbone.Collection.extend({

    model: Partner,

    url: Constants.origin + '/p-api/v1.0/partner',

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