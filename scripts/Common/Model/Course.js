var Course = Backbone.Model.extend({
    defaults: function () {
        return {
            'courseId': -1,
            'partnerId': -1,
            'creationTime': new Date(),
            'courseName': '',
            'courseIntro': '',
            'dailyStartTime': '0:00',
            'dailyFinishTime': '23:59',
            'studyDays': [],
            'studyDaysNote': '',
            'startTime': new Date(),
            'finishTime': new Date(),
            'courseHourNum': 0,
            'courseHourLength': 0,
            'city': '',
            'district': '',
            'location': '',
            'category': '',
            'subCategory': '',
            'price': 0,
            'seatsTotal': 0,
            'seatsLeft': 0,
            'reference': '',
            'partnerCourseReference': '',
            'classModel': 0,
            'openCourseRequirement': '',
            'classroomImgUrl': '',
            'classroomIntro': '',
            'partnerQualification': 0,
            'partnerIntro': '',
            'teachingMethods': [],
            'teachingMethodsIntro': '',
            'teachingMaterialType': 0,
            'teachingMaterialName': '',
            'teachingMaterialIntro': '',
            'teachingMaterialCost': 0,
            'teachingMaterialFree': false,
            'suitableStudent': '',
            'prerequest': '',
            'teacherImgUrl': '',
            'teacherIntro': '',
            'hasDownloadMaterials':false,
            'questionBank': [],
            'questionBankIntro':  '',
            'highScoreReward':  '',
            'passAgreement':  '',
            'quiz': '',
            'provideAssignments': false,
            'provideMarking': false,
            'certification':  '',
            'extracurricular': [],
            'extracurricularIntro': '',
            'status': 0,
            'phone': '',
            'logoUrl': '',
            'instName': '',
            'wholeName': ''

        };
    },
    idAttribute: 'courseId',
    parse: function (data) {
        if ( typeof data !== 'undefined') {
            data.courseId = parseInt(data.courseId, 10);
            data.partnerId = parseInt(data.partnerId, 10);
            data.creationTime = Utilities.castFromAPIFormat(data.creationTime);
            data.courseName = decodeURI(data.courseName);
            data.courseIntro = decodeURI(data.courseIntro);
            data.dailyStartTime = decodeURI(data.dailyStartTime);
            data.dailyFinishTime = decodeURI(data.dailyFinishTime);
            data.studyDays = data.studyDays;
            data.studyDaysNote = data.studyDaysNote;
            data.startTIme = Utilities.castFromAPIFormat(data.startTIme);
            data.finishTime = Utilities.castFromAPIFormat(data.finishTime);
            data.courseHourNum = parseInt(data.courseHourNum, 10);
            data.courseHourLength = parseInt(data.courseHourLength, 10);
            data.city = decodeURI(data.city);
            data.district = decodeURI(data.district);
            data.location = decodeURI(data.location);
            data.category = decodeURI(data.category);
            data.subCategory = decodeURI(data.subCategory);
            data.price = parseInt(data.price, 10);
            data.seatsTotal = parseInt(data.seatsTotal, 10);
            data.seatsLeft = parseInt(data.seatsLeft, 10);
            data.reference = decodeURI(data.reference);
            data.partnerCourseReference = decodeURI(data.partnerCourseReference);
            data.classModel = parseInt(data.classModel, 10);
            data.openCourseRequirement = decodeURI(data.openCourseRequirement);
            data.classroomImgUrl = decodeURI(data.classroomImgUrl);
            data.classroomIntro = decodeURI(data.classroomIntro);
            data.partnerQualification = parseInt(data.partnerQualification, 10);
            data.partnerIntro = decodeURI(data.partnerIntro);
            data.teachingMethods = data.teachingMethods;
            data.teachingMethodsIntro = decodeURI(data.teachingMethodsIntro);
            data.teachingMaterialType = parseInt(data.teachingMaterialType, 10);
            data.teachingMaterialName = decodeURI(data.teachingMaterialName);
            data.teachingMaterialIntro = decodeURI(data.teachingMaterialIntro);
            data.teachingMaterialCost = parseInt(data.teachingMaterialCost, 10);
            data.teachingMaterialFree = data.teachingMaterialFree === 'true' || data.teachingMaterialFree === true || Number(data.teachingMaterialFree) === 1;
            data.suitableStudent = decodeURI(data.suitableStudent);
            data.prerequest = decodeURI(data.prerequest);
            data.teacherImgUrl = decodeURI(data.teacherImgUrl);
            data.teacherIntro = decodeURI(data.teacherIntro);
            data.hasDownloadMaterials = data.hasDownloadMaterials === 'true' || data.hasDownloadMaterials === true || Number(data.hasDownloadMaterials) === 1;
            data.questionBank = data.questionBank;
            data.questionBankIntro = decodeURI(data.questionBankIntro);
            data.highScoreReward = decodeURI(data.highScoreReward);
            data.passAgreement = decodeURI(data.passAgreement);
            data.quiz = decodeURI(data.quiz);
            data.provideAssignments = data.provideAssignments === 'true' || data.provideAssignments === true || Number(data.provideAssignments) === 1;
            data.provideMarking = data.provideMarking === 'true' || data.provideMarking === true || Number(data.provideMarking) === 1;
            data.certification = decodeURI(data.certification);
            data.extracurricular = data.extracurricular;
            data.extracurricularIntro = decodeURI(data.extracurricularIntro);
            data.status = parseInt(data.status, 10);
            data.phone = decodeURI(data.phone);
            data.logoUrl = decodeURI(data.logoUrl);
            data.instName = decodeURI(data.instName);
            data.wholeName = decodeURI(data.wholeName);
        }
        return data;
    },
    _toJSON: function () {
        var json = _.clone(this.attributes);
        json.startTime = Utilities.getDateString(this.get('startTime'));
        json.finishTime = Utilities.getDateString(this.get('finishTime'));
        json.creationTime = Utilities.getDateString(this.get('creationTime'));
        return json;
    },
    //simplified toJSON, as courses are not updated by Ajax but by html form
    toJSON: function () {
        var json = _.clone(this.attributes);
        json.startTime = Utilities.castToAPIFormat(this.get('startTime'));
        json.finishTime = Utilities.castToAPIFormat(this.get('finishTime'));
        json.creationTime = Utilities.castToAPIFormat(this.get('creationTime'));
        return json;
    }
});

var Courses = Backbone.Collection.extend({

    model: Course,

    url: Constants.origin + '/api/v1.0/course',

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