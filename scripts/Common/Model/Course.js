var Course = Backbone.Model.extend({
    defaults: function () {
        return {
            'courseId': undefined,
            'partnerId': undefined,
            'courseName': undefined,
            'courseIntro': undefined,
            'suitableStudent': undefined,
            'price': undefined,
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
            nameArr = [];
        if ( typeof data !== 'undefined') {
            data.courseId = parseInt(data.courseId, 10);
            data.courseName = decodeURI(data.courseName);
            

            data.courseId = parseInt(data.courseId, 10);
            data.partnerId = parseInt(data.partnerId , 10);
            data.price = parseInt(data.price , 10);
            data.courseHourNum = parseInt(data.courseHourNum , 10);
            data.courseHourLength = parseInt(data.courseHourLength , 10);
                
            data.classSize = parseInt(data.classSize , 10);
            data.cashback = parseInt(data.cashback , 10);
            data.popularity = parseInt(data.popularity , 10);
            data.bookingType = parseInt(data.bookingType , 10);
                
            data.startUponArrival = parseInt(data.startUponArrival, 10);
            data.cutoffDate =  Utilities.castFromAPIFormat(data.cutoffDate);
            data.creationTime = Utilities.castFromAPIFormat(data.creationTime);
            data.startDate = Utilities.castFromAPIFormat(data.startDate);
            data.finishDate = Utilities.castFromAPIFormat(data.finishDate);
            data.noRefundDate = Utilities.castFromAPIFormat(data.noRefundDate);
            data.cashbackDate = Utilities.castFromAPIFormat(data.cashbackDate);

            data.startTime1 = parseInt(data.startTime1 , 10);
            data.finishTime1 = parseInt(data.finishTime1 , 10);
            data.startTime2 = parseInt(data.startTime2 , 10);
            data.finishTime2 = parseInt(data.finishTime2 , 10);
                
            data.category = decodeURI(data.category);
            data.subCategory = decodeURI(data.subCategory);
            data.subSubCategory = decodeURI(data.subSubCategory);
            data.location = decodeURI(data.location);
            data.province = decodeURI(data.province);
            data.city = decodeURI(data.city);
            data.district = decodeURI(data.district);
            data.reference = decodeURI(data.reference);

            data.courseIntro = decodeURI(data.courseIntro);
            data.quiz = decodeURI(data.quiz);
            data.certification = decodeURI(data.certification);
            data.openCourseRequirement = decodeURI(data.openCourseRequirement);
            data.suitableStudent = decodeURI(data.suitableStudent);
            data.prerequest = decodeURI(data.prerequest);
            data.highScoreReward = decodeURI(data.highScoreReward);
            data.courseName = decodeURI(data.courseName);
            data.studyDaysNote = decodeURI(data.studyDaysNote);
            data.partnerCourseReference = decodeURI(data.partnerCourseReference);
            data.partnerIntro = decodeURI(data.partnerIntro);
            data.teachingMaterialIntro = decodeURI(data.teachingMaterialIntro);

            data.questionBank = decodeURI(data.questionBank);
            data.passAgreement = decodeURI(data.passAgreement);
            data.extracurricular = decodeURI(data.extracurricular);
            data.phone = decodeURI(data.phone);
                
            data.partnerDistinction = decodeURI(data.partnerDistinction);
            data.outline = decodeURI(data.outline);
            data.goal = decodeURI(data.goal);
            data.classTeacher = decodeURI(data.classTeacher);
            data.teachingAndExercise = decodeURI(data.teachingAndExercise);
            data.questionSession = decodeURI(data.questionSession);
            data.trail = decodeURI(data.trail);
            data.assignments = decodeURI(data.assignments);
            data.marking = decodeURI(data.marking);
            data.bonusService = decodeURI(data.bonusService);
            data.downloadMaterials = decodeURI(data.downloadMaterials);
            data.teachingMaterialFee = decodeURI(data.teachingMaterialFee);
                
            data.status = parseInt(data.status, 10);
            data.partnerQualification = parseInt(data.partnerQualification, 10);
                 
            data.studyDays = data.studyDays;
            data.classImgUrls = data.classImgUrls;
            data.teacherImgUrls = data.teacherImgUrls;

            for (i = 0; i < data.teacherIntros.length; i++){
                introArr.push(decodeURI(data.teacherIntros[i]));
            }
            data.teacherIntros = introArr;
            for (i = 0; i < data.teacherNames.length; i++){
                nameArr.push(decodeURI(data.teacherNames[i]));
            }
            data.teacherNames = nameArr;

            data.logoUrl = decodeURI(data.logoUrl);
            data.instName = decodeURI(data.instName);
            data.wholeName = decodeURI(data.wholeName);
        }
        return data;
    },
    _toJSON: function () {
        var json = _.clone(this.attributes);
        json.startDate = Utilities.getDateString(this.get('startDate'));
        json.finishDate = Utilities.getDateString(this.get('finishDate'));
        json.creationTime = Utilities.getDateString(this.get('creationTime'));
        json.cutoffDate = Utilities.getDateString(this.get('cutoffDate'));
        json.startTime1 = Math.floor(json.startTime1/100) + ":" + json.startTime1%100;
        json.startTime2 = Math.floor(json.startTime2/100) + ":" + json.startTime2%100;
        json.finishTime1 = Math.floor(json.finishTime1/100) + ":" + json.finishTime1%100;
        json.finishTime2 = Math.floor(json.finishTime2/100) + ":" + json.finishTime2%100;
        if (studyDays) {
            var studyDays = "每周";
            for (var i = 0; i < json.studyDays.length; i++ ){
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
        var json = _.clone(this.attributes);
        json.startDate = Utilities.castToAPIFormat(this.get('startDate'));
        json.finishDate = Utilities.castToAPIFormat(this.get('finishDate'));
        json.cutoffDate = Utilities.castToAPIFormat(this.get('cutoffDate'));
        json.creationTime = Utilities.castToAPIFormat(this.get('creationTime'));

        json.noRefundDate = Utilities.castToAPIFormat(this.get('noRefundDate'));
        json.cashbackDate = Utilities.castToAPIFormat(this.get('cashbackDate'));

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