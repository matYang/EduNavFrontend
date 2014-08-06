var Course = Backbone.Model.extend({
    defaults: function () {
        return {
            'id': -1,
            'courseId': -1,
            'partnerId': undefined,
            'price': undefined,
            'originalPrice': undefined,
            'courseHourNum': undefined,
            'courseHourLength': undefined,

            'classSize': undefined,
            'cashback': undefined,
            'popularity': undefined,
            
            'creationTime': new Date(),
            'startDate': new Date(),
            'finishDate': new Date(),
            'cutoffDate': new Date(),

            'noRefundDate': new Date(),
            'cashbackDate': new Date(),
            'bookingType': undefined,

            'startUponArrival': undefined,
            'startTime1': undefined,
            'finishTime1': undefined,
            'startTime2': undefined,
            'finishTime2': undefined,

            'category': undefined,
            'subCategory': undefined,
            'subSubCategory': undefined,
            'location': undefined,
            'registraLocation': undefined,
            'province': undefined,
            'city': undefined,
            'district': undefined,
			'reference': undefined,
            
            'courseIntro': undefined,
            'quiz': undefined,
            'certification': undefined,
            'openCourseRequirement': undefined,
            'suitableStudent': undefined,
            'prerequest': undefined,
            'highScoreReward': undefined,
            'courseName': undefined,
            'studyDaysNote': undefined,
            'teachingMaterialIntro': undefined,
            'questionBank': undefined,
            'qualityAssurance': undefined,
            'passAgreement': undefined,
            'extracurricular': undefined,

            'contact': undefined,
            'registraPhone': undefined,
            'outline': undefined,
            'goal': undefined,
            'classTeacher': undefined,
            'teachingAndExercise': undefined,
            'questionSession': undefined,
            'trail': undefined,
            'assignments': undefined,
            'marking': undefined,
            'bonusService': undefined,
            'downloadMaterials': undefined,
            'teachingMaterialFee': undefined,
            
            'teachingMethod': undefined,

            'status': undefined,
            'studyDays': undefined,

            'classPhotoList': [],
            'classPhotoIdList': [],
            'teacherList': [],
            'teacherIdList': [],

            'logoUrl': undefined,
            'instName': undefined,
            'wholeName': undefined,
            'partnerIntro': undefined,
            'partnerQualification': undefined,
            'partnerDistinction': undefined
        };
    },
    idAttribute: 'id',
    parse: function (data) {
        var i = 0,
            introArr = [],
            nameArr = [],
            imgArr = [],
            classImgArr = [],
            json = {};
        if ( typeof data !== 'undefined') {
            data.id = data.id || data.courseId;
            json.id = parseInt(data.id, 10);
            json.courseId = json.id;
            json.courseName = decodeURIComponent(data.courseName);
            

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

            json.category = decodeURIComponent(data.category);
            json.subCategory = decodeURIComponent(data.subCategory);
            json.subSubCategory = decodeURIComponent(data.subSubCategory);
            json.location = decodeURIComponent(data.location);
        	json.registraLocation = decodeURIComponent(data.registraLocation);
            json.province = decodeURIComponent(data.province);
            json.city = decodeURIComponent(data.city);
            json.district = decodeURIComponent(data.district);
            json.reference = decodeURIComponent(data.reference);

            json.courseIntro = decodeURIComponent(data.courseIntro);
            json.quiz = decodeURIComponent(data.quiz);
            json.certification = decodeURIComponent(data.certification);
            json.openCourseRequirement = decodeURIComponent(data.openCourseRequirement);
            json.suitableStudent = decodeURIComponent(data.suitableStudent);
            json.prerequest = decodeURIComponent(data.prerequest);
            json.highScoreReward = decodeURIComponent(data.highScoreReward);
            json.courseName = decodeURIComponent(data.courseName);
            json.studyDaysNote = decodeURIComponent(data.studyDaysNote);
            json.partnerIntro = decodeURIComponent(data.partnerIntro);
            json.teachingMaterialIntro = decodeURIComponent(data.teachingMaterialIntro);
            json.qualityAssurance = decodeURIComponent(data.qualityAssurance);
            json.questionBank = decodeURIComponent(data.questionBank);
            json.passAgreement = decodeURIComponent(data.passAgreement);
            json.extracurricular = decodeURIComponent(data.extracurricular);
            json.registraPhone = decodeURIComponent(data.registraPhone);
            json.contact = decodeURIComponent(data.contact);
			json.teachingMethod = decodeURIComponent(data.teachingMethod);
            
            json.partnerDistinction = decodeURIComponent(data.partnerDistinction);
            json.outline = decodeURIComponent(data.outline);
            json.goal = decodeURIComponent(data.goal);
            json.classTeacher = decodeURIComponent(data.classTeacher);
            json.teachingAndExercise = decodeURIComponent(data.teachingAndExercise);
            json.questionSession = decodeURIComponent(data.questionSession);
            json.trail = decodeURIComponent(data.trail);
            json.assignments = decodeURIComponent(data.assignments);
            json.marking = decodeURIComponent(data.marking);
            json.bonusService = decodeURIComponent(data.bonusService);
            json.downloadMaterials = decodeURIComponent(data.downloadMaterials);
            json.teachingMaterialFee = decodeURIComponent(data.teachingMaterialFee);

            json.status = parseInt(data.status, 10);
            json.partnerQualification = parseInt(data.partnerQualification, 10);
            if (data.classPhotoList) {
                for (i = 0; i < data.classPhotoList.length; i++) {
                    classImgArr[i] = new Photo(data.classPhotoList[i], {parse: true});
                } 
                json.classPhotoList = classImgArr;
            }
            if (data.teacherList) {
                for (i = 0; i < data.teacherList.length; i++) {
                    imgArr[i] = new Teacher(data.teacherList[i], {parse: true});
                }
                json.teacherList = imgArr;
            }
            json.logoUrl = decodeURIComponent(data.logoUrl);
            json.instName = decodeURIComponent(data.instName);
            json.wholeName = decodeURIComponent(data.wholeName);
        }
        return json;
    },
    _toJSON: function () {
        var json = _.clone(this.attributes), studyDays, i;
        json.startDate = Utilities.getDateString(this.get('startDate'));
        json.finishDate = Utilities.getDateString(this.get('finishDate'));
        json.creationTime = Utilities.getDateString(this.get('creationTime'));
        json.cutoffDate = Utilities.getDateString(this.get('cutoffDate'));
        json.startTime1 = Math.floor(json.startTime1 / 100) + ":" + ((json.startTime1 % 100 < 10) ? "0" + json.startTime1 % 100 : json.startTime1 % 100);
        json.startTime2 = Math.floor(json.startTime2 / 100) + ":" + ((json.startTime2 % 100 < 10) ? "0" + json.startTime2 % 100 : json.startTime2 % 100);
        json.finishTime1 = Math.floor(json.finishTime1 / 100) + ":" + ((json.finishTime1 % 100 < 10) ? "0" + json.finishTime1 % 100 : json.finishTime1 % 100);
        json.finishTime2 = Math.floor(json.finishTime2 / 100) + ":" + ((json.finishTime2 % 100 < 10) ? "0" + json.finishTime2 % 100 : json.finishTime2 % 100);
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
        if (json.teacherList) {
            for (i = 0; i < json.teacherList.length; i++) {
                if (json.teacherList[i] instanceof Teacher) {
                    json.teacherList[i] = json.teacherList[i]._toJSON();
                } else {
                    json.teacherList[i] = json.teacherList[i];

                }
            }
        }
        if (json.classPhotoList) {
            for (i = 0; i < json.classPhotoList.length; i++) {
                if (json.classPhotoList[i] instanceof Photo) {
                    json.classPhotoList[i] = json.classPhotoList[i]._toJSON();
                } else {
                    json.classPhotoList[i] = json.classPhotoList[i];
                }
            }
        }
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

        json.category = (json.category);
        json.subCategory = (json.subCategory);
        json.subSubCategory = (json.subSubCategory);
        json.location = (json.location);
        json.registraLocation = (json.registraLocation);

        json.province = (json.province);
        json.city = (json.city);
        json.district = (json.district);
        json.reference = (json.reference);

        json.courseIntro = (json.courseIntro);
        json.quiz = (json.quiz);
        json.certification = (json.certification);
        json.openCourseRequirement = (json.openCourseRequirement);
        json.suitableStudent = (json.suitableStudent);
        json.prerequest = (json.prerequest);
        json.highScoreReward = (json.highScoreReward);
        json.courseName = (json.courseName);
        json.studyDaysNote = (json.studyDaysNote);
        json.partnerIntro = (json.partnerIntro);
        json.teachingMaterialIntro = (json.teachingMaterialIntro);

        json.qualityAssurance = (json.qualityAssurance);
        json.questionBank = (json.questionBank);
        json.passAgreement = (json.passAgreement);
        json.extracurricular = (json.extracurricular);
        json.registraPhone = (json.registraPhone);
		json.contact = (json.contact);
		json.teachingMethod = (json.teachingMethod);

        json.partnerDistinction = (json.partnerDistinction);
        json.outline = (json.outline);
        json.goal = (json.goal);
        json.classTeacher = (json.classTeacher);
        json.teachingAndExercise = (json.teachingAndExercise);
        json.questionSession = (json.questionSession);
        json.trail = (json.trail);
        json.assignments = (json.assignments);
        json.marking = (json.marking);
        json.bonusService = (json.bonusService);
        json.downloadMaterials = (json.downloadMaterials);
        json.teachingMaterialFee = (json.teachingMaterialFee);

        json.partnerQualification = parseInt(json.partnerQualification, 10);
        if (json.classPhotoList) {
            for (i = 0; i < json.classPhotoList.length; i++) {
                if (json.classPhotoList[i] instanceof Photo) {
                    classImgArr[i] = json.classPhotoList[i].toJSON();
                } else {
                    classImgArr[i] = json.classPhotoList[i];

                }
            } 
            json.classPhotoList = classImgArr;
        }
        if (json.teacherList) {
            for (i = 0; i < json.teacherList.length; i++) {
                if (json.classPhotoList[i] instanceof Teacher) {
                    imgArr[i] = json.teacherList[i].toJSON();
                } else {
                    imgArr[i] = json.teacherList[i];
                }
            }
            json.teacherList = imgArr;
        }
        json.logoUrl = Component(json.logoUrl);
        json.instName = (json.instName);
        json.wholeName = (json.wholeName);
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
        return this.get("id") === -1;
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