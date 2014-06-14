var Course = Backbone.Model.extend({
    defaults: function () {
        return {
            'courseId': -1,
            'partnerId': -1,
            'creationTime': new Date(),
            'courseName': '',
            'courseIntro': '',
            'startTime1': 900,
            'startTime2': 1200,
            'finishTime1': 1500,
            'finishTime2': 1800,
            'studyDays': [],
            'studyDaysNote': '',
            'startDate': new Date(),
            'finisDate': new Date(),
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
            'wholeName': '',
            'popularity': 0
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
            data.startTime1 = parseInt(data.startTime1, 10);
            data.startTime2 = parseInt(data.startTime2, 10);
            data.finishTime1 = parseInt(data.finishTime1, 10);
            data.finishTime2 = parseInt(data.finishTime2, 10);
            data.studyDays = data.studyDays;
            data.studyDaysNote = data.studyDaysNote;
            data.startDate = Utilities.castFromAPIFormat(data.startDate);
            data.finishDate = Utilities.castFromAPIFormat(data.finishDate);
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
            data.popularity = parseInt(data.popularity, 10);
        }
        return data;
    },
    _toJSON: function () {
        var json = _.clone(this.attributes);
        json.startDate = Utilities.getDateString(this.get('startDate'));
        json.finishDate = Utilities.getDateString(this.get('finishDate'));
        json.creationTime = Utilities.getDateString(this.get('creationTime'));
        json.startTime1 = Math.floor(json.startTime1/100) + ":" + json.startTime1%100;
        json.startTime2 = Math.floor(json.startTime2/100) + ":" + json.startTime2%100;
        json.finishTime1 = Math.floor(json.finishTime1/100) + ":" + json.finishTime1%100;
        json.finishTime2 = Math.floor(json.finishTime2/100) + ":" + json.finishTime2%100;
        var studyDays = "每周";
        for (var i = 0; i < json.studyDays.length; i++ ){
            studyDays = studyDays + Constants.weekDayArray[json.studyDays [i]];
            if (i < json.studyDays.length - 1) {
                studyDays += ", ";
            }
        }
        json.studyDays = studyDays;
        json.studyDaysNote =json.studyDaysNote ? "(" + json.studyDaysNote + ")" : "" ;
        var date = new Date(this.get("startDate"));
        date.setDate(date.getDate()-5);
        json.scheduledTime = Utilities.getDateString(date);
        return json;
    },
    //simplified toJSON, as courses are not updated by Ajax but by html form
    toJSON: function () {
        var json = _.clone(this.attributes);
        json.startDate = Utilities.castToAPIFormat(this.get('startDate'));
        json.finishDate = Utilities.castToAPIFormat(this.get('finishDate'));
        json.creationTime = Utilities.castToAPIFormat(this.get('creationTime'));
        return json;
    },
    /* generate object with html wrapping as values, these values will append to the compare table one by one */
    // parseToCompare: function(){
    //     var obj = {};
    //     obj.courseName = this.td() +  '<h2 class="F_green">' + this.get("courseName") + '</h2>'+
    //                 '<div class="btn blank1"><input class="btn_O" type="button" value="立即预订"/></div>' +
    //                 '<div class="set"><a class="pre" href="#">向前</a><a class="delete" href="#">删除</a><a class="next" href="#">向后</a></div></td>';
    //     obj.suitableStudent = this.td() + this.get("suitableStudent") + "</td>";
    //     obj.s
    // },
    td: function(){
        return "<td width='195' class='row_" + this.courseId + "'>";
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