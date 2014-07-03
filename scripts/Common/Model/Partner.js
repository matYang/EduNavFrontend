var Partner = Backbone.Model.extend({

    defaults: function () {
        return {
            'partnerId': -1,
            'wholeName':'',
            'license': '',
            'organizationNum': '',
            'reference': '',
            'password':'',

            'phone':'',
            'status': 0,
            'instName': '',
            'logoUrl':'',

            'classImgList': [],
            'classImgIdList': [],
            'teacherList': [],
            'teacherIdList': [],
            
            'creationTime': new Date(),
            'lastLogin': new Date()
        };
    },
    idAttribute: 'partnerId',

    urlRoot: Constants.origin + '/p-api/v1.0/partner/partner',

    parse: function (data) {
        var json = {}, photos = [], photoIds = [], teachers = [], teacherIds = [];
        if ( typeof data !== 'undefined') {
            
            json.partnerId = parseInt(data.partnerId, 10);
            json.wholeName = decodeURI(data.wholeName);

            json.license = decodeURI(data.license);
            json.organizationNum = decodeURI(data.organizationNum);
            json.reference = decodeURI(data.reference);

            json.phone = decodeURI(data.phone);
            json.status = parseInt(data.status, 10);
            json.instName = decodeURI(data.instName);
            json.logoUrl = decodeURI(data.logoUrl);

            if (json.classImgList) {
                for (var i = 0; i < data.classImgList.length; i++ ) {
                    photos[i] = decodeURI(data.classImgList[i]);
                }
                json.classImgList = photos;
            }
            if (json.classImgIdList) {
                for (var i = 0; i < data.classImgIdList.length; i++ ) {
                    photoIds[i] = Utilities.toInt(data.classImgIdList[i]);
                }
                json.classImgList = photoIds;
            }

            if (json.teacherList) {
                for (var i = 0; i < data.teacherList.length; i++ ) {
                    teachers[i] = new Teacher(data.teacherList[i], {parse: true});
                }
                json.teacherList = teachers;
            }

            if (json.teacherIdList) {
                for (var i = 0; i < data.teacherIdList.length; i++ ) {
                    teacherIds[i] = Utilities.toInt(data.teacherIds[i]);
                }
                json.teacherIdList = teacherIds;
            }

            json.creationTime = Utilities.castFromAPIFormat(data.creationTime);
            json.lastLogin = Utilities.castFromAPIFormat(data.lastLogin);
            
        }
        return data;
    },
    _toJSON: function () {
        var json = _.clone(this.attributes), i;
        json.creationTime = Utilities.getDateString(this.get('creationTime'));
        if (json.teacherList) {
            for (i = 0; i < json.teacherList.length; i++ ) {
                json.teacherList[i] = json.teacherList.at(i)._toJSON();
            }
        }
        if (json.classImgList) {
            for (i = 0; i < json.classImgList.length; i++ ) {
                json.classImgList[i] = json.classImgList.at(i)._toJSON();
            }
        }
        return json;
    },
    toJSON: function () {
        var json = _.clone(this.attributes);

        json.wholeName = encodeURI(json.wholeName);
        json.license = encodeURI(json.license);
        json.organizationNum = encodeURI(json.organizationNum);
        json.reference = encodeURI(json.reference);
        json.password = encodeURI(json.password);
        json.phone = encodeURI(json.phone);
        json.instName = encodeURI(json.instName);
        json.logoUrl = encodeURI(json.logoUrl);
        if (json.classImgList) {
            for (var i = 0; i < json.classImgList.length; i++ ) {
                json.classImgList[i] = encodeURI(json.classImgList[i]);
            }
        }
        if (json.teacherList) {
            for (var i = 0; i < json.teacherList.length; i++ ) {
                json.teacherList[i] = json.teacherList.at(i).toJSON();
            }
        }
        json.creationTime = Utilities.castToAPIFormat(this.get('creationTime'));
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