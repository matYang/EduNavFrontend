var Course = Backbone.Model.extend({
        defaults: function () {
            return {
                'id': -1,
                'courseId': -1,
                'partnerId': undefined,
                'createTime': undefined,

                /*others*/
                'reference': undefined,//课程识别号 不用了
                'noRefundDate': undefined,
                'cashbackDate': undefined,
                'popularity': undefined,//人气值
                'bookingType': undefined,
                'startUponArrival': undefined,//转换成了是否有具体的开课日期
                'regPhone': undefined,//转换成了没有开课日期的备注
                'studyDaysNote': undefined,//备注信息
                'qualityAssurance': undefined, //质量保证 修改为 课时信息
                "contact": undefined,//课程联系方式
                "trail": undefined,//试听
                'status': undefined,//课程状态
                'partnerQualification': undefined,//机构资质 是否进行认证

                /*header部分信息*/

                'categoryValue': undefined,//类目

                'courseName': undefined,//课程名
                'suitableStudent': undefined,//适合学员
                'cashback': undefined,//线下返现
                'commission': undefined,//线上立减
                'price': undefined,//爱上课价格
                'originalPrice': undefined,//原价

                'logoUrl': undefined,//logo
                'address': undefined,//上课地点
                'regAddress': undefined,//报名地点

                'classPhotoList': null,

                /*基本信息*/
                'startDate': undefined,
                'finishDate': undefined,//开课日期
                'courseHourNum': undefined,//课时总数
                'courseHourLength': undefined,//课时长度
                'studyDays': undefined,//todo
                'startTime1': undefined,
                'finishTime1': undefined,
                'startTime2': undefined,
                'finishTime2': undefined,//上课时间
                'classSize': undefined,//班级类型
                'openCourseRequirement': undefined,//开班要求
                'cutoffDate': undefined,//报名截止日期
                'instName': undefined,
                'wholeName': undefined,
                'partnerDistinction': undefined,//机构荣誉
                'partnerIntro': undefined,//机构概况
                'teacherList': null,//老师介绍


                /*教学信息*/
                'courseIntro': undefined,//课程介绍
                'goal': undefined,//教学目标
                'prerequest': undefined,//先修知识
                'teachingMethod': undefined,//上课形式

                'teachingMaterialIntro': undefined,//教材介绍
                'teachingMaterialFee': undefined,//教材费用
                'outline': undefined,//课程提纲

                /*教学补充*/
                'downloadMaterials': undefined,//课件下载
                'questionBank': undefined,//题库支持
                'classTeacher': undefined,//班主任导学 修改为推荐就业
                'teachingAndExercise': undefined,//讲练结合
                'quiz': undefined,//阶段测评
                'questionSession': undefined,//课后答疑
                'assignments': undefined,//课后作业

                'marking': undefined,//作业批改 改用为优惠信息

                /*教学保障*/
                'passAgreement': undefined,//教学保过
                'highScoreReward': undefined,//高分奖励 改用为教学特色

                /*特色服务*/
                'certification': undefined,//结业证书
                'extracurricular': undefined,//课后互动
                'bonusService': undefined//赠送服务
            };
        },
        idAttribute: 'id',
        parse: function (data) {
            var i = 0,
                imgArr = [],
                classImgArr = [];
            if (typeof data !== 'undefined') {
                data.id = parseInt(data.id, 10);
                data.courseId = data.id;
                data.partnerId = parseInt(data.partnerId, 10);
                data.createTime = Utilities.castFromAPIFormat(data.createTime);

                /*others*/
                data.bookingType = Utilities.parseNum(data.bookingType);//线上或者线下支付
                data.popularity = Utilities.parseNum(data.popularity);//人气值
                data.startUponArrival = Utilities.parseNum(data.startUponArrival);//这个用来判断是否有开课日期

                data.cashback = Utilities.parseNum(data.cashback);//返现
                data.commission = Utilities.parseNum(data.commission);//在线支付折扣
                data.price = Utilities.parseNum(data.price);//爱上课价格
                data.originalPrice = Utilities.parseNum(data.originalPrice);//原价

                if(data.originalPrice == data.price){
                    data.originalPrice = null;
                }
                if(typeof data.price =='number' &&data.originalPrice=='number'){
                    if(data.price>data.originalPrice){
                        Info.warn('Price is large than original price!!CourseId>>'+data.id);
                    }
                }

                /*基本信息*/
                data.cutoffDate = Utilities.castFromAPIFormat(this.get('cutoffDate'));
                data.createTime = Utilities.castFromAPIFormat(this.get('createTime'));
                data.noRefundDate = Utilities.castFromAPIFormat(this.get('noRefundDate'));
                data.cashbackDate = Utilities.castFromAPIFormat(this.get('cashbackDate'));

                data.startDate = Utilities.castFromAPIFormat(data.startDate);
                data.finishDate = Utilities.castFromAPIFormat(data.finishDate);//开课日期
                data.courseHourNum = Utilities.parseNum(data.courseHourNum, 10);//课时总数
                data.courseHourLength = Utilities.parseNum(data.courseHourLength, 10);//课时长度
                data.startTime1 = Utilities.parseNum(data.startTime1, 10);
                data.finishTime1 = Utilities.parseNum(data.finishTime1, 10);
                data.startTime2 = Utilities.parseNum(data.startTime2, 10);
                data.finishTime2 = Utilities.parseNum(data.finishTime2, 10);//上课时间

                if (data.teacherList) {
                    for (i = 0; i < data.teacherList.length; i++) {
                        imgArr[i] = new Teacher(data.teacherList[i], {parse: true});
                    }
                    data.teacherList = imgArr;
                }//老师介绍

                data.status = parseInt(data.status, 10);
                data.partnerQualification = parseInt(data.partnerQualification, 10);
                if (data.classPhotoList) {
                    for (i = 0; i < data.classPhotoList.length; i++) {
                        classImgArr[i] = new Photo(data.classPhotoList[i], {parse: true});
                    }
                    data.classPhotoList = classImgArr;
                }
            }
            return data;
        },
        _toJSON: function () {
            var json = _.clone(this.attributes), studyDays, i;
//            if (typeof json.price === 'number')json.price = json.price.toFixed(2);
//            if (typeof json.originalPrice === 'number')json.originalPrice = json.originalPrice.toFixed(2);
            if (json.startDate) {
                var dateObj = json.startDate;
                json.startDateDate = dateObj.getFullYear() + '年' + (dateObj.getMonth() + 1) + '月';
                json.startDateDay = dateObj.getDate();
                json.startDateWeek = EnumConfig.WeekText[dateObj.getDay() - 1];
            }
            json.startDate = Utilities.getDateString(this.get('startDate'));
            json.finishDate = Utilities.getDateString(this.get('finishDate'));
            json.createTime = Utilities.getDateString(this.get('createTime'));
            json.cutoffDate = Utilities.getDateString(this.get('cutoffDate'));
            json.startTime1 = json.startTime1 == null ? null : Math.floor(json.startTime1 / 100) + ":" + ((json.startTime1 % 100 < 10) ? "0" + json.startTime1 % 100 : json.startTime1 % 100);
            json.startTime2 = json.startTime2 == null ? null : Math.floor(json.startTime2 / 100) + ":" + ((json.startTime2 % 100 < 10) ? "0" + json.startTime2 % 100 : json.startTime2 % 100);
            json.finishTime1 = json.finishTime1 == null ? null : Math.floor(json.finishTime1 / 100) + ":" + ((json.finishTime1 % 100 < 10) ? "0" + json.finishTime1 % 100 : json.finishTime1 % 100);
            json.finishTime2 = json.finishTime2 == null ? null : Math.floor(json.finishTime2 / 100) + ":" + ((json.finishTime2 % 100 < 10) ? "0" + json.finishTime2 % 100 : json.finishTime2 % 100);


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
            json.studyDaysNote = json.studyDaysNote ? "(" + json.studyDaysNote + ")" : "";
            if (json.teacherList) {
                var teacherList = [];
                json.teacherList.forEach(function(teacher){
                    teacherList.push((teacher._toJSON()));
                });
                json.teacherList = teacherList;
            }
            if (json.classPhotoList) {
                var classPhotoList = [];
                json.classPhotoList.forEach(function(photo){
                    classPhotoList.push((photo._toJSON()));
                });
                json.classPhotoList = classPhotoList;
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
            json.createTime = Utilities.castToAPIFormat(this.get('createTime'));
            json.noRefundDate = Utilities.castToAPIFormat(this.get('noRefundDate'));
            json.cashbackDate = Utilities.castToAPIFormat(this.get('cashbackDate'));

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
            json.id = this.get("id");
            json.courseName = this.get("courseName");
            json.regPhone = this.get("regPhone");

            json.startUponArrival = this.get("startUponArrival");
            json.startDate = Utilities.getDateString(this.get('startDate'));
            json.finishDate = Utilities.getDateString(this.get('finishDate'));

            json.createTime = Utilities.getDateString(this.get('createTime'));
            json.cutoffDate = Utilities.getDateString(this.get('cutoffDate'));
            json.startTime1 = json.startTime1 == null ? null : Math.floor(json.startTime1 / 100) + ":" + ((json.startTime1 % 100 < 10) ? "0" + json.startTime1 % 100 : json.startTime1 % 100);
            json.startTime2 = json.startTime2 == null ? null : Math.floor(json.startTime2 / 100) + ":" + ((json.startTime2 % 100 < 10) ? "0" + json.startTime2 % 100 : json.startTime2 % 100);
            json.finishTime1 = json.finishTime1 == null ? null : Math.floor(json.finishTime1 / 100) + ":" + ((json.finishTime1 % 100 < 10) ? "0" + json.finishTime1 % 100 : json.finishTime1 % 100);
            json.finishTime2 = json.finishTime2 == null ? null : Math.floor(json.finishTime2 / 100) + ":" + ((json.finishTime2 % 100 < 10) ? "0" + json.finishTime2 % 100 : json.finishTime2 % 100);


            json.price = this.get("price");
            json.cashback = this.get("cashback");
            json.commission = this.get("commission");

            json.address = this.get("address");

            json.logoUrl = this.get("logoUrl");
            json.instName = this.get("instName");
            return json;
        }
    })
    ;

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