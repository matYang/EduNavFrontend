var Course = Backbone.Model.extend({
        defaults: function () {
            return {
                'id': -1,
                'courseId': -1,
                'partnerId': undefined,
                'createTime': undefined,

                /*others*/
                'groupBuyActivity': null,//团购信息
                'bookingTotal': 0,//预订总数
                'viewTotal': 0,//浏览总数
                'popularity': undefined,//人气值
                'bookingType': undefined,
                'startUponArrival': undefined,//转换成了是否有具体的开课日期
                'regPhone': undefined,//转换成了没有开课日期的备注
//                'studyDaysNote': undefined,//备注信息
                'qualityAssurance': undefined, //质量保证 修改为 课时信息
                "trail": undefined,//试听
                'status': undefined,//课程状态
                'partnerQualification': undefined,//机构资质 是否进行认证

                /*header部分信息*/

                'categoryValue': undefined,//类目
                'circleName': undefined,//大学城（商圈）名字

                'courseName': undefined,//课程名
                'suitableStudent': undefined,//适合学员
                'cashback': undefined,//线下返现
                'commission': undefined,//线上立减 修改为存储课程的折扣 0-100 {number}
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
//                'studyDays': undefined,//todo 未使用
                'startTime1': undefined, //number 一系列的上课时间组合
                'finishTime1': undefined,
                'startTime2': undefined,
                'finishTime2': undefined,
                'schoolTimeWeek': undefined,//number平时(1) 周末(2)
                'schoolTimeDay': undefined,//number 白天(1+2) 晚上(4)


                'classSize': undefined,//班级类型
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
                'bonusService': undefined,//赠送服务

                'conditionRating': 0,
                'attitudeRating': 0,
                'satisfactionRating': 0,
                'evenRating': 0
            };
        },
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

                if (data.originalPrice == data.price) {
                    data.originalPrice = undefined;
                }
                if (typeof data.price == 'number' && data.originalPrice == 'number') {
                    if (data.price > data.originalPrice) {
                        Info.warn('Price is large than original price!!CourseId>>' + data.id);
                    }
                }

                /*基本信息*/
                data.createTime = Utilities.castFromAPIFormat(this.get('createTime'));

                data.startDate = Utilities.castFromAPIFormat(data.startDate);
                data.finishDate = Utilities.castFromAPIFormat(data.finishDate);//开课日期
                data.courseHourNum = Utilities.parseNum(data.courseHourNum);//课时总数
                data.courseHourLength = Utilities.parseNum(data.courseHourLength);//课时长度
                data.startTime1 = Utilities.parseNum(data.startTime1);
                data.finishTime1 = Utilities.parseNum(data.finishTime1);
                data.startTime2 = Utilities.parseNum(data.startTime2);
                data.finishTime2 = Utilities.parseNum(data.finishTime2);//上课时间

                data.schooltimeWeek = Utilities.toSchoolTimeList(data.schooltimeWeek, EnumConfig.schooltimeWeek);//周末什么的
                data.schooltimeDay = Utilities.toSchoolTimeList(data.schooltimeDay, EnumConfig.schooltimeDay);//白天什么的

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
                data.conditionRating = Utilities.parseNum(data.conditionRating, 1);
                data.attitudeRating = Utilities.parseNum(data.attitudeRating, 1);
                data.satisfactionRating = Utilities.parseNum(data.satisfactionRating, 1);
                if (!data.conditionRating) {
                    data.conditionRating = 0;
                }
                if (!data.attitudeRating) {
                    data.attitudeRating = 0;
                }
                if (!data.satisfactionRating) {
                    data.satisfactionRating = 0;
                }
                data.evenRating = ((data.conditionRating + data.attitudeRating + data.satisfactionRating) / 3);
                data.evenRating = Utilities.parseNum(data.evenRating, 1);
            }
            return data;
        },
        _toJSON: function () {
            var json = _.clone(this.attributes), studyDays, i;
            if (json.startDate) {
                var dateObj = json.startDate;
                json.startDateDate = dateObj.getFullYear() + '年' + (dateObj.getMonth() + 1) + '月';
                json.startDateDay = dateObj.getDate();
                json.startDateWeek = EnumConfig.WeekText[dateObj.getDay() - 1];
            }
            json.startDate = Utilities.getDateString(this.get('startDate'));
            json.finishDate = Utilities.getDateString(this.get('finishDate'));
            json.createTime = Utilities.getDateString(this.get('createTime'));
            json.startTime1 = json.startTime1 == null ? null : Math.floor(json.startTime1 / 100) + ":" + ((json.startTime1 % 100 < 10) ? "0" + json.startTime1 % 100 : json.startTime1 % 100);
            json.startTime2 = json.startTime2 == null ? null : Math.floor(json.startTime2 / 100) + ":" + ((json.startTime2 % 100 < 10) ? "0" + json.startTime2 % 100 : json.startTime2 % 100);
            json.finishTime1 = json.finishTime1 == null ? null : Math.floor(json.finishTime1 / 100) + ":" + ((json.finishTime1 % 100 < 10) ? "0" + json.finishTime1 % 100 : json.finishTime1 % 100);
            json.finishTime2 = json.finishTime2 == null ? null : Math.floor(json.finishTime2 / 100) + ":" + ((json.finishTime2 % 100 < 10) ? "0" + json.finishTime2 % 100 : json.finishTime2 % 100);

            json.schooltimeWeek = Utilities.toSchoolTimeText(json.schooltimeWeek, EnumConfig.schooltimeWeek);//周末什么的
            json.schooltimeDay = Utilities.toSchoolTimeText(json.schooltimeDay, EnumConfig.schooltimeDay, '/');//白天什么的


//            if (json.studyDays) {
//                studyDays = "每周";
//                for (i = 0; i < json.studyDays.length; i++) {
//                    studyDays = studyDays + Constants.weekDayArray[json.studyDays [i]];
//                    if (i < json.studyDays.length - 1) {
//                        studyDays += ", ";
//                    }
//                }
//                json.studyDays = studyDays;
//            }
//            json.studyDaysNote = json.studyDaysNote ? "(" + json.studyDaysNote + ")" : "";
            if (json.teacherList) {
                var teacherList = [];
                json.teacherList.forEach(function (teacher) {
                    teacherList.push((teacher._toJSON()));
                });
                json.teacherList = teacherList;
            }
            if (json.classPhotoList) {
                var classPhotoList = [];
                json.classPhotoList.forEach(function (photo) {
                    classPhotoList.push((photo._toJSON()));
                });
                json.classPhotoList = classPhotoList;
            }
            return json;
        },
        td: function () {
            return "<td width='195' class='row_" + this.courseId + "'>";
        },
        isNew: function () {
            return this.get("id") === -1;
        },
        //简化的course对象 这里主要用于生成course列表 multiPageView中会优先使用该方法 其次为_toJSON方法
        _toSimpleJSON: function () {
            var json = {};

            json.id = this.get("id");
            json.courseName = this.get("courseName");
            json.logoUrl = this.get("logoUrl");
            json.instName = this.get("instName");

            json.bookingTotal = this.get("bookingTotal");
            json.viewTotal = this.get("viewTotal");
            json.groupBuyActivity = this.get("groupBuyActivity");

            //以下为显示开课日期所需的字段
            json.regPhone = this.get("regPhone");//开课日期备注信息
            json.startUponArrival = this.get("startUponArrival");//是否具有开课日期
            json.startDate = Utilities.getDateString(this.get('startDate'));
            json.finishDate = Utilities.getDateString(this.get('finishDate'));

            //以下为显示开课时间所需的字段 平时周末以及白天晚上 加上一天内的上课时间
            json.startTime1 = this.get("startTime1");
            json.startTime2 = this.get("startTime2");
            json.finishTime1 = this.get("finishTime1");
            json.finishTime2 = this.get("finishTime2");
            json.startTime1 = json.startTime1 == null ? null : Math.floor(json.startTime1 / 100) + ":" + ((json.startTime1 % 100 < 10) ? "0" + json.startTime1 % 100 : json.startTime1 % 100);
            json.startTime2 = json.startTime2 == null ? null : Math.floor(json.startTime2 / 100) + ":" + ((json.startTime2 % 100 < 10) ? "0" + json.startTime2 % 100 : json.startTime2 % 100);
            json.finishTime1 = json.finishTime1 == null ? null : Math.floor(json.finishTime1 / 100) + ":" + ((json.finishTime1 % 100 < 10) ? "0" + json.finishTime1 % 100 : json.finishTime1 % 100);
            json.finishTime2 = json.finishTime2 == null ? null : Math.floor(json.finishTime2 / 100) + ":" + ((json.finishTime2 % 100 < 10) ? "0" + json.finishTime2 % 100 : json.finishTime2 % 100);
            json.schooltimeWeek = this.get("schooltimeWeek");
            json.schooltimeDay = this.get("schooltimeDay");
            json.schooltimeWeek = Utilities.toSchoolTimeText(json.schooltimeWeek, EnumConfig.schooltimeWeek);//周末什么的
            json.schooltimeDay = Utilities.toSchoolTimeText(json.schooltimeDay, EnumConfig.schooltimeDay, '/');//白天什么的

            //以下为生成课程价格相关信息所需的字段
            json.price = this.get("price");
            json.originalPrice = this.get("originalPrice");
            json.cashback = this.get("cashback");
            json.commission = this.get("commission");//折扣
//            json.marking = this.get("marking");//优惠信息 不显示了

            //上课地址
            json.address = this.get("address");
            json.circleName = this.get("circleName");

            return json;
        }
    })
    ;

var Courses = Backbone.Collection.extend({
    model: Course,
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