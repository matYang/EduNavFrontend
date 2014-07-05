var longText = "啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊";
testMockObj = {
    testMode: (C_ENV_VAR === "Local") ? false : false,
    testAdmin: (new Admin()).set("name", "admin1").set("phone", "2260000000"),
    testUser: new User(),
    testPartners: new Partners(),
    testPartner1: new Partner().set("partnerId", 1),
    testPartner2: new Partner().set("partnerId", 2),
    testPartner3: new Partner().set("partnerId", 3),
    testPartner4: new Partner().set("partnerId", 4),
    testPartner5: new Partner().set("partnerId", 5),
    testTeachers: new Teachers(),
    testTeacher1: new Teacher().set("teacherId", 1).set("name", "Teacher A"),
    testTeacher2: new Teacher().set("teacherId", 2).set("name", "Teacher B"),
    testTeacher3: new Teacher().set("teacherId", 3).set("name", "Teacher C"),
    testTeacher4: new Teacher().set("teacherId", 4).set("name", "Teacher D"),
    testTeacher5: new Teacher().set("teacherId", 5).set("name", "Teacher E"),
    testPhotos: new Photos(),
    testPhoto1: (new Photo()).set("photoId", 1).set("imgUrl", "/testUrl1"),
    testPhoto2: new Photo().set("photoId", 2).set("imgUrl", "/testUrl2"),
    testPhoto3: new Photo().set("photoId", 3).set("imgUrl", "/testUrl3"),
    testPhoto4: new Photo().set("photoId", 4).set("imgUrl", "/testUrl4"),
    testPhoto5: new Photo().set("photoId", 5).set("imgUrl", "/testUrl5"),
    testPhoto6: new Photo().set("photoId", 6).set("imgUrl", "/testUrl6"),

    testCourses: new Courses(),
    testCourse1: (new Course()).set("partnerIntro", longText).set("courseId", 1).set("courseName", "雅思英语").set("price", 10800).set("instName", "南京新东方").set("location", "南京市玄武区").set("cashback", 0),
    testCourse2: (new Course()).set("partnerIntro", longText).set("courseId", 2).set("courseName", "SAT").set("price", 10800).set("instName", "School A").set("location", "南京市白下区").set("cashback", 50),
    testCourse3: (new Course()).set("partnerIntro", longText).set("courseId", 3).set("courseName", "托福").set("price", 9800).set("instName", "School B").set("location", "南京市秦淮区").set("cashback", 12),
    testCourse4: (new Course()).set("courseId", 4).set("courseName", "GRE").set("price",12900).set("instName", "School C").set("location", "南京市建邺区"),
    testCourse5: (new Course()).set("courseId", 5).set("courseName", "四六级").set("price",5800).set("instName", "School D").set("location", "南京市鼓楼区").set("cashback", 10),
    testCourse6: (new Course()).set("courseId", 6).set("courseName", "雅思英语").set("price",9800).set("instName", "School E").set("location", "南京市下关区"),
    testCourse7: (new Course()).set("courseId", 7).set("courseName", "小学英语补习").set("price",4000).set("instName", "School F").set("location", "南京市浦口区"),
    testCourse8: (new Course()).set("courseId", 8).set("courseName", "初中英语").set("price",10800).set("instName", "School G").set("cashback", 50),
    testCourse9: (new Course()).set("courseId", 9).set("courseName", "商务英语").set("price",9800).set("instName", "School H"),
    testCourse10: (new Course()).set("courseId", 10).set("courseName", "OMG英语").set("price",12900).set("instName", "School I"),
    testCourse11: (new Course()).set("courseId", 11).set("courseName", "口语强化班").set("price",5800).set("instName", "School J").set("cashback", 100),
    testCourse12: (new Course()).set("courseId", 12).set("courseName", "高考图集").set("price",9800).set("instName", "School K"),
    testBookings: new Bookings(),
    testBooking1: (new Booking()).set("bookingId", 1).set("reference", "10001").set("status", 0).set("name", "马修").set("phone", 13915063907).set("email", "test@gmail.com").set("price",11999).set("note", "总而言之这是条测试信息"),
    testBooking2: (new Booking()).set("bookingId", 2).set("reference", "10002").set("status", 1).set("name", "John").set("phone", 13915063907).set("email", "test@gmail.com").set("price",10000),
    testBooking3: (new Booking()).set("bookingId", 3).set("reference", "10003").set("status", 2).set("name", "John").set("phone", 13915063907).set("email", "test@gmail.com").set("price",9800),
    testBooking4: (new Booking()).set("bookingId", 4).set("reference", "10004").set("status", 3).set("name", "John").set("phone", 13915063907).set("email", "test@gmail.com").set("price",4500),
    testBooking5: (new Booking()).set("bookingId", 5).set("reference", "10005").set("status", 4).set("name", "John").set("phone", 13915063907).set("email", "test@gmail.com").set("price",500),
    testBooking6: (new Booking()).set("bookingId", 6).set("reference", "10006").set("status", 5).set("name", "John").set("phone", 13915063907).set("email", "test@gmail.com").set("price",7000),
    testBooking7: (new Booking()).set("bookingId", 7).set("reference", "10007").set("status", 6).set("name", "马修").set("phone", 13915063907).set("email", "test@gmail.com").set("price",11999).set("note", "总而言之这是条测试信息"),
    testBooking8: (new Booking()).set("bookingId", 8).set("reference", "10008").set("status", 7).set("name", "John").set("phone", 13915063907).set("email", "test@gmail.com").set("price",11849),
    testBooking9: (new Booking()).set("bookingId", 9).set("reference", "10009").set("status", 8).set("name", "John").set("phone", 13915063907).set("email", "test@gmail.com").set("price",11000),
    testBooking10: (new Booking()).set("bookingId", 10).set("reference", "10010").set("status", 9).set("name", "John").set("phone", 13915063907).set("email", "test@gmail.com").set("price",998),
    testBooking11: (new Booking()).set("bookingId", 11).set("reference", "10011").set("status", 10).set("name", "John").set("phone", 13915063907).set("email", "test@gmail.com").set("price",4651),
    testBooking12: (new Booking()).set("bookingId", 12).set("reference", "10012").set("status", 11).set("name", "John").set("phone", 13915063907).set("email", "test@gmail.com").set("price",9781),
    testCoupons: new Coupons(),
    testCoupon1: (new Coupon()).set("couponId", 1).set("amount", 30),
    testCoupon2: (new Coupon()).set("couponId", 2).set("amount", 20),
    testCoupon3: (new Coupon()).set("couponId", 3).set("amount", 25),
    testCoupon4: (new Coupon()).set("couponId", 4).set("amount", 10),
    testCoupon5: (new Coupon()).set("couponId", 5).set("amount", 20).set("status", EnumConfig.CouponStatus.inactive),
    testCoupon6: (new Coupon()).set("couponId", 6).set("amount", 40).set("status", EnumConfig.CouponStatus.inactive),
    testCoupon7: (new Coupon()).set("couponId", 7).set("amount", 15).set("status", EnumConfig.CouponStatus.inactive),
    testCoupon8: (new Coupon()).set("couponId", 8).set("amount", 15).set("status", EnumConfig.CouponStatus.inactive),
    testCoupon9: (new Coupon()).set("couponId", 9).set("amount", 20).set("status", EnumConfig.CouponStatus.usable),
    testCoupon10: (new Coupon()).set("couponId", 10).set("amount", 40).set("status", EnumConfig.CouponStatus.usable),
    testCoupon11: (new Coupon()).set("couponId", 11).set("amount", 15).set("status", EnumConfig.CouponStatus.inactive),
    testCoupon12: (new Coupon()).set("couponId", 12).set("amount", 15).set("status", EnumConfig.CouponStatus.inactive),
    testCredits: new Credits(),
    testCredit1: (new Credit()).set("creditId", 1).set("amount", 1000),
    testCredit2: (new Credit()).set("creditId", 2).set("amount", 1000),
    testCredit3: (new Credit()).set("creditId", 3).set("amount", 1000),
    testCredit4: (new Credit()).set("creditId", 4).set("amount", 1000),
    testCredit5: (new Credit()).set("creditId", 5).set("amount", 1000),
    testCredit6: (new Credit()).set("creditId", 6).set("amount", 1000),
    testCredit7: (new Credit()).set("creditId", 7).set("amount", 1000),
    testCredit8: (new Credit()).set("creditId", 8).set("amount", 1000),
    testCategories: {
            "语言培训":{
                "英语":{
                    "雅思":{"index":1},
                    "四六级":{"index":2},
                    "托福":{"index":3},
                    "GRE":{"index":4},
                    "GMAT":{"index":5},
                    "SAT":{"index":6},
                    "SSAT":{"index":7},
                    "公共英语":{"index":8},
                    "商务英语":{"index":9},
                    "基础英语":{"index":10},
                    "职称英语":{"index":11},
                    "专业英语":{"index":12},
                    "少儿英语":{"index":13},
                    "剑桥英语":{"index":14},
                    "新概念英语":{"index":15},
                    "口译笔译":{"index":16},
                    "金融英语":{"index":0},
                    "index":1
                },
                "小语种":{
                    "日语":{"index":1},
                    "韩语":{"index":2},
                    "法语":{"index":3},
                    "德语":{"index":4},
                    "俄语":{"index":5},
                    "意大利语":{"index":6},
                    "西班牙语":{"index":7},
                    "葡萄牙语":{"index":8},
                    "阿拉伯语":{"index":9},
                    "荷兰语":{"index":10},
                    "index":0
                },
                "index":0
            },
            "学历文凭": {
                "考研":{
                    "考研":{"index":0},
                    "index":0
                },
                "index":1
            },
            "财会·金融":{
                "财务会计":{
                    "会计从业资格":{"index":1},
                    "初级会计职称":{"index":2},
                    "中级会计职称":{"index":3},
                    "高级会计职称":{"index":4},
                    "注册会计师":{"index":5},
                    "会计继续教育":{"index":6},
                    "会计电算化":{"index":7},
                    "会计实务":{"index":8},
                    "CFO":{"index":9},
                    "CMA":{"index":10},
                    "AIA":{"index":11},
                    "ACCA":{"index":12},
                    "CPA":{"index":0},
                    "index":0
                },
                "金融":{
                    "银行从业资格":{"index":1},
                    "证劵从业员":{"index":2},
                    "统计从业资格":{"index":3},
                    "期货从业资格":{"index":4},
                    "保险从业资格":{"index":5},
                    "保险经纪人":{"index":6},
                    "保险公估人":{"index":7},
                    "保险代理人":{"index":8},
                    "保荐代表人":{"index":9},
                    "基金销售员":{"index":10},
                    "价格鉴证师":{"index":11},
                    "理财规划师":{"index":12},
                    "注册税务师":{"index":13},
                    "资产评估师":{"index":14},
                    "经济师":{"index":15},
                    "统计师":{"index":16},
                    "审计师":{"index":17},
                    "精算师":{"index":18},
                    "CFA":{"index":0},
                    "index":1
                },
                "index":2
            },
            "资格认证":{
                "国家公职":{
                    "公务员":{"index":1},
                    "教师资格":{"index":2},
                    "幼师资格":{"index":3},
                    "司法考试":{"index":4},
                    "军转干考":{"index":5},
                    "企业法律顾问":{"index":0},
                    "index":1
                },  
                "外贸":{
                    "报关员":{"index":1},
                    "跟单员":{"index":2},
                    "外销员":{"index":3},
                    "单证员":{"index":4},
                    "货代员":{"index":5},
                    "物流师":{"index":6},
                    "报检员":{"index":7},
                    "国际商务师":{"index":0},
                    "index":0
                },
                "index":3
            }
        },
    testLocations: {
                    "江苏":{
                        "南京":{
                            "玄武":{"index":1},
                            "秦淮":{"index":2},
                            "建邺":{"index":3},
                            "鼓楼":{"index":4},
                            "浦口":{"index":5},
                            "栖霞":{"index":6},
                            "雨花":{"index":7},
                            "江宁":{"index":0},
                            "index":1
                        },
                        "苏州":{
                            "马修":{"index":0},
                            "index":0
                        },
                        "index":0
                    },
                    "上海":{
                        "上海":{
                            "浦东":{"index":1},
                            "虹桥":{"index":2},
                            "宝山":{"index":3},
                            "金山":{"index":0},
                            "index":0
                        },
                        "日本":{
                            "东京":{"index":0},
                            "小仓":{"index":1},
                            "广岛":{"index":2},
                            "index":1
                        },
                        "index":1
                    }
                }
};

testMockObj.testCourses.add([testMockObj.testCourse1,testMockObj.testCourse2,testMockObj.testCourse3,testMockObj.testCourse4,
                             testMockObj.testCourse5,testMockObj.testCourse6,testMockObj.testCourse7,testMockObj.testCourse8,
                             testMockObj.testCourse9,testMockObj.testCourse10,testMockObj.testCourse11,testMockObj.testCourse12]);
testMockObj.testBookings.add([testMockObj.testBooking1,testMockObj.testBooking2,testMockObj.testBooking3,testMockObj.testBooking4,testMockObj.testBooking5,testMockObj.testBooking6, testMockObj.testBooking7,testMockObj.testBooking8,testMockObj.testBooking9, testMockObj.testBooking10,testMockObj.testBooking11,testMockObj.testBooking12]);
testMockObj.testCoupons.add([testMockObj.testCoupon1,testMockObj.testCoupon2,testMockObj.testCoupon3,testMockObj.testCoupon4,
                            testMockObj.testCoupon5,testMockObj.testCoupon6,testMockObj.testCoupon7,testMockObj.testCoupon8,
                            testMockObj.testCoupon9,testMockObj.testCoupon10,testMockObj.testCoupon11,testMockObj.testCoupon12]);
testMockObj.testCredits.add([testMockObj.testCredit1,testMockObj.testCredit2,testMockObj.testCredit3,testMockObj.testCredit4,
                            testMockObj.testCredit5,testMockObj.testCredit6,testMockObj.testCredit7,testMockObj.testCredit8,
                            testMockObj.testCredit9,testMockObj.testCredit10,testMockObj.testCredit11,testMockObj.testCredit12]);
testMockObj.testTeachers.add([testMockObj.testTeacher1, testMockObj.testTeacher2, testMockObj.testTeacher3, testMockObj.testTeacher4, testMockObj.testTeacher5]);
testMockObj.testPhotos.add([testMockObj.testPhoto1, testMockObj.testPhoto2, testMockObj.testPhoto3, testMockObj.testPhoto4, testMockObj.testPhoto5]);
testMockObj.testPartner1.set("teacherIdList", [1, 2, 3, 4, 5]);
testMockObj.testPartner2.set("teacherIdList", [1, 2, 3, 4, 5]);
testMockObj.testPartner3.set("teacherIdList", [1, 2, 3, 4, 5]);
testMockObj.testPartner4.set("teacherIdList", [1, 2, 3, 4, 5]);
testMockObj.testPartner5.set("teacherIdList", [1, 2, 3, 4, 5]);

testMockObj.testPartner1.set("classPhotoIdList", [1, 2, 3, 4, 5]);
testMockObj.testPartner2.set("classPhotoIdList", [1, 2, 3, 4, 5]);
testMockObj.testPartner3.set("classPhotoIdList", [1, 2, 3, 4, 5]);
testMockObj.testPartner4.set("classPhotoIdList", [1, 2, 3, 4, 5]);
testMockObj.testPartner5.set("classPhotoIdList", [1, 2, 3, 4, 5]);
testMockObj.testPartner1.set("teacherList", testMockObj.testTeachers);
testMockObj.testPartner2.set("teacherList", testMockObj.testTeachers);
testMockObj.testPartner3.set("teacherList", testMockObj.testTeachers);
testMockObj.testPartner4.set("teacherList", testMockObj.testTeachers);
testMockObj.testPartner5.set("teacherList", testMockObj.testTeachers);
testMockObj.testPartner1.set("classPhotoList", testMockObj.testPhotos);
testMockObj.testPartner2.set("classPhotoList", testMockObj.testPhotos);
testMockObj.testPartner3.set("classPhotoList", testMockObj.testPhotos);
testMockObj.testPartner4.set("classPhotoList", testMockObj.testPhotos);
testMockObj.testPartner5.set("classPhotoList", testMockObj.testPhotos);

testMockObj.testPartners.add([testMockObj.testPartner1, testMockObj.testPartner2, testMockObj.testPartner3, testMockObj.testPartner4, testMockObj.testPartner5]);

testMockObj.testBooking1.set("course", testMockObj.testCourse1);
testMockObj.testBooking2.set("course", testMockObj.testCourse2);
testMockObj.testBooking3.set("course", testMockObj.testCourse3);
testMockObj.testBooking4.set("course", testMockObj.testCourse4);
testMockObj.testBooking5.set("course", testMockObj.testCourse5);
testMockObj.testBooking6.set("course", testMockObj.testCourse6);
testMockObj.testBooking7.set("course", testMockObj.testCourse1);
testMockObj.testBooking8.set("course", testMockObj.testCourse2);
testMockObj.testBooking9.set("course", testMockObj.testCourse3);
testMockObj.testBooking10.set("course", testMockObj.testCourse4);
testMockObj.testBooking11.set("course", testMockObj.testCourse5);
testMockObj.testBooking12.set("course", testMockObj.testCourse6);
testMockObj.testUser.set("bookingList", testMockObj.testBookings);
testMockObj.testUser.set("couponList", testMockObj.testCoupons);
testMockObj.testUser.set("creditList", testMockObj.testCredits);
testMockObj[EnumConfig.ModuleIdentifier.admin] = testMockObj.testAdmin;
testMockObj[EnumConfig.ModuleIdentifier.partner] = testMockObj.testPartner;
testMockObj[EnumConfig.ModuleIdentifier.user] = testMockObj.testUser;