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

            'categoryValue':undefined,

            'address': undefined,
            'registraLocation': undefined,
            'reference': undefined,

            'courseIntro': undefined,
            'quiz': undefined,
            'certification': undefined,
            'openCourseRequirement': undefined,
            'suitableStudent': undefined,
            'prerequest': undefined,
            'highScoreReward': undefined,
            'courseName': undefined,
            'studyDayNote': undefined,
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
        if (typeof data !== 'undefined') {
            data.id = data.id || data.courseId;
            json.id = parseInt(data.id, 10);
            json.courseId = json.id;
            json.partnerId = parseInt(data.partnerId, 10);
            json.creationTime = Utilities.castFromAPIFormat(data.creationTime);

            /*others*/
            json.popularity = parseInt(data.popularity, 10);//人气值
            json.bookingType = parseInt(data.bookingType, 10);
            json.startUponArrival = parseInt(data.startUponArrival, 10);
            json.studyDayNote = (data.studyDayNote);//备注信息
            json.qualityAssurance = (data.qualityAssurance);
            json.regPhone = (data.regPhone);
            json.contact = (data.contact);
            json.trail = (data.trail);//试听

            /*header部分信息*/

            json.categoryValue = (data.categoryValue);//类目

            json.courseName = (data.courseName);//课程名
            json.suitableStudent = (data.suitableStudent);//适合学员
            json.cashback = parseInt(data.cashback, 10);//返现
            json.price = parseInt(data.price, 10);//爱上课价格
            json.originalPrice = parseInt(data.price, 10);//原价

            json.logoUrl = decodeURIComponent(data.logoUrl);//logo
            json.address = (data.address);//上课地点
            json.regAddress = (data.regAddress);//报名地点

            /*基本信息*/
            json.startDate = Utilities.castFromAPIFormat(data.startDate);
            json.finishDate = Utilities.castFromAPIFormat(data.finishDate);//开课日期
            json.courseHourNum = parseInt(data.courseHourNum, 10);//课时总数
            json.courseHourLength = parseInt(data.courseHourLength, 10);//课时长度
            json.startTime1 = parseInt(data.startTime1, 10);
            json.finishTime1 = parseInt(data.finishTime1, 10);
            json.startTime2 = parseInt(data.startTime2, 10);
            json.finishTime2 = parseInt(data.finishTime2, 10);//上课时间
            json.classSize = data.classSize;//班级类型
            json.openCourseRequirement = (data.openCourseRequirement);//开班要求
            json.cutoffDate = Utilities.castFromAPIFormat(data.cutoffDate);//报名截止日期
            json.wholeName = decodeURIComponent(data.wholeName);//机构全称
            json.partnerDistinction = (data.partnerDistinction);//机构荣誉
            json.partnerIntro = (data.partnerIntro);//机构概况
            if (data.teacherList) {
                for (i = 0; i < data.teacherList.length; i++) {
                    imgArr[i] = new Teacher(data.teacherList[i], {parse: true});
                }
                json.teacherList = imgArr;
            }//老师介绍


            /*教学信息*/
            json.courseIntro = data.courseIntro;//课程介绍
            json.goal = data.goal;//教学目标
            json.prerequest = data.prerequest;//先修知识
            json.teachingMethod = data.teachingMethod;//上课形式
            json.teachingMaterialIntro = data.teachingMaterialIntro;//教材介绍
            json.teachingMaterialFee = data.teachingMaterialFee;//教材费用
            json.outline = data.outline;//课程提纲

            /*教学补充*/
            json.downloadMaterials = data.downloadMaterials;//课件下载
            json.questionBank = data.questionBank;//题库支持
            json.classTeacher = data.classTeacher;//班主任导学
            json.teachingAndExercise = data.teachingAndExercise;//讲练结合
            json.quiz = data.quiz;//阶段测评
            json.questionSession = data.questionSession;//课后答疑
            json.assignments = data.assignments;//课后作业
            json.marking = data.marking;//作业批改

            /*教学保障*/
            json.passAgreement = (data.passAgreement);//教学保过
            json.highScoreReward = (data.highScoreReward);//高分奖励

            /*特色服务*/
            json.certification = data.certification;//结业证书
            json.extracurricular = data.extracurricular;//课后互动
            json.bonusService = data.bonusService;//赠送服务

            json.status = parseInt(data.status, 10);
            json.partnerQualification = parseInt(data.partnerQualification, 10);
            if (data.classPhotoList) {
                for (i = 0; i < data.classPhotoList.length; i++) {
                    classImgArr[i] = new Photo(data.classPhotoList[i], {parse: true});
                }
                json.classPhotoList = classImgArr;
            }



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
            for (i = 0; i < json.studyDays.length; i++) {
                studyDays = studyDays + Constants.weekDayArray[json.studyDays [i]];
                if (i < json.studyDays.length - 1) {
                    studyDays += ", ";
                }
            }
            json.studyDays = studyDays;
        }
        json.studyDayNote = json.studyDayNote ? "(" + json.studyDayNote + ")" : "";
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
        json.address = (json.address);
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
        json.studyDayNote = (json.studyDayNote);
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
        json.logoUrl = (json.logoUrl);
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
    _toSimpleJSON: function () {
        var json = {};
        json.courseId = this.get("courseId");
        json.courseName = this.get("courseName");
        json.suitableStudent = this.get("suitableStudent");
        json.startDate = Utilities.getDateString(this.get('startDate'));
        json.address = this.get("address");
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