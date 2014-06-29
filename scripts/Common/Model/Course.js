var Course = Backbone.Model.extend({
    defaults: function () {
        return {
            'courseId': -1,
            'partnerId': undefined,
            'courseName': undefined,
            'courseIntro': undefined,
            'suitableStudent': undefined,
            'price': undefined,
            'originalPrice': undefined,
            'courseHourNum': undefined,

            'courseHourLength': undefined,

            'classSize': undefined,
            'cashback': undefined,
            'popularity': undefined,
            
            'startUponArrival': undefined,
            'cutoffDate': new Date(),
            'creationTime': new Date(),
            'startDate': new Date(),
            'finishDate': new Date(),
            'studyDays': undefined,
            'studyDaysNote': undefined,

            'startTime1': undefined,
            'finishTime1': undefined,
            'startTime2': undefined,
            'finishTime2': undefined,

            'category': undefined,
            'subCategory': undefined,
            'subSubCategory': undefined,
            'location': undefined,
            'province': undefined,
            'city': undefined,
            'district': undefined,

            'reference': undefined,
            'partnerCourseReference': undefined,
            'openCourseRequirement': undefined,
            'partnerQualification': undefined,
            'partnerIntro': undefined,
            'teachingMaterialIntro': undefined,
            'teachingMaterialFee': undefined,
            'prerequest': undefined,
            
            'outline': undefined,
            'downloadMaterials': undefined,
            'questionBank': undefined,
            'highScoreReward': undefined,
            'passAgreement': undefined,
            'quiz': undefined,
            'assignments': undefined,
            'marking': undefined,
            'certification': undefined,
            'extracurricular': undefined,

            'status': undefined,
            
            'phone': undefined,
            'logoUrl': undefined,
            'instName': undefined,
            'wholeName': undefined,

            'partnerDistinction': undefined,
            'goal': undefined,
            'classTeacher': undefined,
            'teachingAndExercise': undefined,
            'questionSession': undefined,
            'trail': undefined,
            'bonusService': undefined,

            'noRefundDate': new Date(),
            'cashbackDate': new Date(),
            'bookingType': undefined,

            'classImgUrls': [],
            'teacherIntros': undefined,
            'teacherImgUrls': [],
            'teacherNames': undefined


        };
    },
    idAttribute: 'courseId',
    parse: function (data) {
        var i = 0,
            introArr = [],
            nameArr = [],
            imgArr = [],
            classImgArr = [],
            json = {};
        if ( typeof data !== 'undefined') {
            json.courseId = parseInt(data.courseId, 10);
            json.courseName = decodeURI(data.courseName);
            

            json.courseId = parseInt(data.courseId, 10);
            json.partnerId = parseInt(data.partnerId , 10);
            json.price = parseInt(data.price , 10);
            json.originalPrice = parseInt(data.price , 10);
            json.courseHourNum = parseInt(data.courseHourNum , 10);
            json.courseHourLength = parseInt(data.courseHourLength , 10);

            json.classSize = parseInt(data.classSize , 10);
            json.cashback = parseInt(data.cashback , 10);
            json.popularity = parseInt(data.popularity , 10);
            json.bookingType = parseInt(data.bookingType , 10);

            json.startUponArrival = parseInt(data.startUponArrival, 10);
            json.cutoffDate =  Utilities.castFromAPIFormat(data.cutoffDate);
            json.creationTime = Utilities.castFromAPIFormat(data.creationTime);
            json.startDate = Utilities.castFromAPIFormat(data.startDate);
            json.finishDate = Utilities.castFromAPIFormat(data.finishDate);
            json.noRefundDate = Utilities.castFromAPIFormat(data.noRefundDate);
            json.cashbackDate = Utilities.castFromAPIFormat(data.cashbackDate);

            json.startTime1 = parseInt(data.startTime1 , 10);
            json.finishTime1 = parseInt(data.finishTime1 , 10);
            json.startTime2 = parseInt(data.startTime2 , 10);
            json.finishTime2 = parseInt(data.finishTime2 , 10);

            json.category = decodeURI(data.category);
            json.subCategory = decodeURI(data.subCategory);
            json.subSubCategory = decodeURI(data.subSubCategory);
            json.location = decodeURI(data.location);
            json.province = decodeURI(data.province);
            json.city = decodeURI(data.city);
            json.district = decodeURI(data.district);
            json.reference = decodeURI(data.reference);

            json.courseIntro = decodeURI(data.courseIntro);
            json.quiz = decodeURI(data.quiz);
            json.certification = decodeURI(data.certification);
            json.openCourseRequirement = decodeURI(data.openCourseRequirement);
            json.suitableStudent = decodeURI(data.suitableStudent);
            json.prerequest = decodeURI(data.prerequest);
            json.highScoreReward = decodeURI(data.highScoreReward);
            json.courseName = decodeURI(data.courseName);
            json.studyDaysNote = decodeURI(data.studyDaysNote);
            json.partnerCourseReference = decodeURI(data.partnerCourseReference);
            json.partnerIntro = decodeURI(data.partnerIntro);
            json.teachingMaterialIntro = decodeURI(data.teachingMaterialIntro);

            json.questionBank = decodeURI(data.questionBank);
            json.passAgreement = decodeURI(data.passAgreement);
            json.extracurricular = decodeURI(data.extracurricular);
            json.phone = decodeURI(data.phone);

            json.partnerDistinction = decodeURI(data.partnerDistinction);
            json.outline = decodeURI(data.outline);
            json.goal = decodeURI(data.goal);
            json.classTeacher = decodeURI(data.classTeacher);
            json.teachingAndExercise = decodeURI(data.teachingAndExercise);
            json.questionSession = decodeURI(data.questionSession);
            json.trail = decodeURI(data.trail);
            json.assignments = decodeURI(data.assignments);
            json.marking = decodeURI(data.marking);
            json.bonusService = decodeURI(data.bonusService);
            json.downloadMaterials = decodeURI(data.downloadMaterials);
            json.teachingMaterialFee = decodeURI(data.teachingMaterialFee);

            json.status = parseInt(data.status, 10);
            json.partnerQualification = parseInt(data.partnerQualification, 10);
            if (data.classImgUrls) {
                for (i = 0; i < data.classImgUrls.length; i++) {
                    classImgArr[i] = (decodeURIComponent(data.classImgUrls[i]));
                } 
                json.classImgUrls = classImgArr;
            }
            if (data.teacherImgUrls) {
                for (i = 0; i < data.teacherImgUrls.length; i++) {
                    imgArr[i] = (decodeURIComponent(data.teacherImgUrls[i]));
                }
                json.teacherImgUrls = imgArr;
            }
            if (data.teacherImgUrls) {
                for (i = 0; i < data.teacherIntros.length; i++) {
                    introArr[i] = (decodeURIComponent(data.teacherIntros[i]));
                }
                json.teacherIntros = introArr;
            }
            if (data.teacherImgUrls) {
                for (i = 0; i < data.teacherNames.length; i++) {
                    nameArr[i] = (decodeURIComponent(data.teacherNames[i]));
                }
                json.teacherNames = nameArr;
            }
            json.logoUrl = decodeURIComponent(data.logoUrl);
            json.instName = decodeURI(data.instName);
            json.wholeName = decodeURI(data.wholeName);
        }
        return json;
    },
    _toJSON: function () {
        var json = _.clone(this.attributes), studyDays, i;
        json.startDate = Utilities.getDateString(this.get('startDate'));
        json.finishDate = Utilities.getDateString(this.get('finishDate'));
        json.creationTime = Utilities.getDateString(this.get('creationTime'));
        json.cutoffDate = Utilities.getDateString(this.get('cutoffDate'));
        json.startTime1 = Math.floor(json.startTime1 / 100) + ":" + json.startTime1 % 100;
        json.startTime2 = Math.floor(json.startTime2 / 100) + ":" + json.startTime2 % 100;
        json.finishTime1 = Math.floor(json.finishTime1 / 100) + ":" + json.finishTime1 % 100;
        json.finishTime2 = Math.floor(json.finishTime2 / 100) + ":" + json.finishTime2 % 100;
        if (json.studyDays) {
            studyDays = "每周";
            for (i = 0; i < json.studyDays.length; i++ ) {
                studyDays = studyDays + Constants.weekDayArray[json.studyDays [i]];
                if (i < json.studyDays.length - 1) {
                    studyDays += ", ";
                }
            }
            json.studyDays = studyDays;
        }
        json.studyDaysNote =json.studyDaysNote ? "(" + json.studyDaysNote + ")" : "" ;

        return json;
    },
    //simplified toJSON, as courses are not updated by Ajax but by html form
    toJSON: function () {
        var json = _.clone(this.attributes),
            i = 0,
            introArr = [],
            nameArr = [],
            imgArr = [],
            classImgArr = [];
        json.startDate = Utilities.castToAPIFormat(this.get('startDate'));
        json.finishDate = Utilities.castToAPIFormat(this.get('finishDate'));
        json.cutoffDate = Utilities.castToAPIFormat(this.get('cutoffDate'));
        json.creationTime = Utilities.castToAPIFormat(this.get('creationTime'));
        json.noRefundDate = Utilities.castToAPIFormat(this.get('noRefundDate'));
        json.cashbackDate = Utilities.castToAPIFormat(this.get('cashbackDate'));

        json.category = encodeURI(json.category);
        json.subCategory = encodeURI(json.subCategory);
        json.subSubCategory = encodeURI(json.subSubCategory);
        json.location = encodeURI(json.location);
        json.province = encodeURI(json.province);
        json.city = encodeURI(json.city);
        json.district = encodeURI(json.district);
        json.reference = encodeURI(json.reference);

        json.courseIntro = encodeURI(json.courseIntro);
        json.quiz = encodeURI(json.quiz);
        json.certification = encodeURI(json.certification);
        json.openCourseRequirement = encodeURI(json.openCourseRequirement);
        json.suitableStudent = encodeURI(json.suitableStudent);
        json.prerequest = encodeURI(json.prerequest);
        json.highScoreReward = encodeURI(json.highScoreReward);
        json.courseName = encodeURI(json.courseName);
        json.studyDaysNote = encodeURI(json.studyDaysNote);
        json.partnerCourseReference = encodeURI(json.partnerCourseReference);
        json.partnerIntro = encodeURI(json.partnerIntro);
        json.teachingMaterialIntro = encodeURI(json.teachingMaterialIntro);

        json.questionBank = encodeURI(json.questionBank);
        json.passAgreement = encodeURI(json.passAgreement);
        json.extracurricular = encodeURI(json.extracurricular);
        json.phone = encodeURI(json.phone);

        json.partnerDistinction = encodeURI(json.partnerDistinction);
        json.outline = encodeURI(json.outline);
        json.goal = encodeURI(json.goal);
        json.classTeacher = encodeURI(json.classTeacher);
        json.teachingAndExercise = encodeURI(json.teachingAndExercise);
        json.questionSession = encodeURI(json.questionSession);
        json.trail = encodeURI(json.trail);
        json.assignments = encodeURI(json.assignments);
        json.marking = encodeURI(json.marking);
        json.bonusService = encodeURI(json.bonusService);
        json.downloadMaterials = encodeURI(json.downloadMaterials);
        json.teachingMaterialFee = encodeURI(json.teachingMaterialFee);

        json.partnerQualification = parseInt(json.partnerQualification, 10);
        if (json.classImgUrls) {
            for (i = 0; i < json.classImgUrls.length; i++) {
                classImgArr[i] = (encodeURIComponent(json.classImgUrls[i]));
            } 
            json.classImgUrls = classImgArr;
        }
        if (json.teacherImgUrls) {
            for (i = 0; i < json.teacherImgUrls.length; i++) {
                imgArr[i] = (encodeURIComponent(json.teacherImgUrls[i]));
            }
            json.teacherImgUrls = imgArr;
        }
        if (json.teacherImgUrls) {
            for (i = 0; i < json.teacherIntros.length; i++) {
                introArr[i] = (encodeURIComponent(json.teacherIntros[i]));
            }
            json.teacherIntros = introArr;
        }
        if (json.teacherImgUrls) {
            for (i = 0; i < json.teacherNames.length; i++) {
                nameArr[i] = (encodeURIComponent(json.teacherNames[i]));
            }
            json.teacherNames = nameArr;
        }
        json.logoUrl = encodeURIComponent(json.logoUrl);
        json.instName = encodeURI(json.instName);
        json.wholeName = encodeURI(json.wholeName);
        return json;
    },
    /* generate object with html wrapping as values, these values will append to the compare table one by one */
    // parseToCompare: function () {
    //     var obj = {};
    //     obj.courseName = this.td() +  '<h2 class="F_green">' + this.get("courseName") + '</h2>'+
    //                 '<div class="btn blank1"><input class="btn_O" type="button" value="立即预订"/></div>' +
    //                 '<div class="set"><a class="pre" href="#">向前</a><a class="delete" href="#">删除</a><a class="next" href="#">向后</a></div></td>';
    //     obj.suitableStudent = this.td() + this.get("suitableStudent") + "</td>";
    //     obj.s
    // },
    td: function () {
        return "<td width='195' class='row_" + this.courseId + "'>";
    },
    isNew: function () {
        return this.get("courseId") === -1;
    },
    _toSimpleJSON: function() {
        var json = {};
        json.courseId = this.get("courseId");
        json.courseName = this.get("courseName");
        json.suitableStudent = this.get("suitableStudent");
        json.startDate = Utilities.getDateString(this.get('startDate'));
        json.location = this.get("location");
        json.logoUrl = this.get("logoUrl");
        json.price = this.get("price");
        json.courseHourNum = this.get("courseHourNum");
        json.cashback = this.get("cashback");
        json.instName = this.get("instName");
        json.trail = this.get("trail");
        return json;
    }
});

var Courses = Backbone.Collection.extend({

    model: Course,

    url: Constants.origin + '/api/v1.0/course',

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