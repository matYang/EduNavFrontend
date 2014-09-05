var longText = "啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊";
testMockObj = {
    testMode: (C_ENV_VAR === "LOCAL") ? true : false,
    testUser: new User().set('name', '白痴').set('phone', '1555****555').set('gender', 0).set('id', -1),
    testPartners: new Partners(),
    testPartner1: new Partner().set("id", 1),
    testPartner2: new Partner().set("id", 2),
    testPartner3: new Partner().set("id", 3),
    testPartner4: new Partner().set("id", 4),
    testPartner5: new Partner().set("id", 5),
    testTeachers: new Teachers(),
    testTeacher1: new Teacher().set("id", 1).set("name", "Teacher A").set("imgUrl", "/testUrl1")
        .set('intro','这是SD卡很疯狂和水电费三角裤好地方水电费水电费较深的回复三等奖回复水电费金黄色的'),
    testTeacher2: new Teacher().set("id", 2).set("name", "Teacher B").set("imgUrl", "/testUrl1"),
    testTeacher3: new Teacher().set("id", 3).set("name", "Teacher C").set("imgUrl", "/testUrl1"),
    testPhotos: new Photos(),
    testPhoto1: (new Photo()).set("id", 1).set("imgUrl", "/testUrl1"),
    testPhoto2: new Photo().set("id", 2).set("imgUrl", "/testUrl2"),
    testPhoto3: new Photo().set("id", 3).set("imgUrl", "/testUrl3"),
    testCourses: new Courses(),
    testCourse1: (new Course()).set("categoryValue", "000101").set("partnerIntro", longText).set("id", 1)
        .set("marking", '近期门店有优惠活动').set("courseName", "雅思英语").set("price", 10800).set('schoolTimeWeek',3).set('schoolTimeDay',3)
        .set("originalPrice", 12800).set("instName", "南京新东方").set("address", "南京市玄武区")
        .set("cashback", 10).set("commission", 20).set("status", EnumConfig.CourseStatus.onlined)
        .set("bookingType", 2).set('startUponArrival', 1).set('startDate', new Date()).set('quiz', 'adhj'),
    testCourse2: (new Course()).set("categoryValue", "000101").set("partnerIntro", longText).set("id", 2).set('schoolTimeWeek',1).set('schoolTimeDay',4)
        .set("courseName", "SAT").set("price", 10800).set("instName", "School A").set("address", "南京市白下区")
        .set("cashback", 50).set("status", EnumConfig.CourseStatus.onlined).set('startUponArrival', 1)
        .set('startDate', new Date(1400000000000)),
    testCourse3: (new Course()).set("categoryValue", "000101").set("partnerIntro", longText).set("id", 3)
        .set("courseName", "托福").set("price", 9800).set("instName", "School B").set("address", "南京市秦淮区")
        .set("cashback", 12).set("status", EnumConfig.CourseStatus.onlined).set('startUponArrival', 0).set('schoolTimeWeek',2).set('schoolTimeDay',3)
        .set('regPhone', '随到随学,机构咨询'),
    testCourse4: (new Course()).set("categoryValue", "000101").set("id", 4).set("courseName", "GRE").set("price", 12900)
        .set("instName", "School C").set("address", "南京市建邺区").set("status", EnumConfig.CourseStatus.onlined)
        .set('startUponArrival', 1)
        .set('startDate', new Date()),
    testBookings: new Bookings(),
    testBooking1: (new Booking()).set("id", 1).set("reference", "10001").set("status", 0).set("type", 1).set("name", "马修")
        .set("phone", 13915063907).set("email", "test@gmail.com").set("price", 11999)
        .set('actionList', [
            {name: 'onlineCancel'}
        ]).set('type', 0).set('status', 11),
    testBooking2: (new Booking()).set("id", 2).set("reference", "10002").set("status", 1).set("type", 1).set("name", "John")
        .set("phone", 13915063907).set("email", "test@gmail.com").set("price", 10000)
        .set('actionList', [
            {name: 'onlineCancel'},
            {name: 'offlineUserDelay'}
        ]).set('type', 0).set('status', 11),
    testBooking3: (new Booking()).set("id", 3).set("reference", "10003").set("status", 2).set("type", 1).set("name", "John")
        .set("phone", 13915063907).set("email", "test@gmail.com").set("price", 9800).set('actionList', [
            {name: 'onlineCancel'}
        ]),
    testBooking4: (new Booking()).set("id", 4).set("reference", "10004").set("status", 3).set("type", 1).set("name", "John")
        .set("phone", 13915063907).set("email", "test@gmail.com").set("price", 4500).set('actionList', [
            {name: 'onlineCancel'}
        ]),

    testBookingHistories: new BookingHistories(),
    testBookingHistory1: (new BookingHistory().set('id', 1)),
    testBookingHistory2: (new BookingHistory().set('id', 2)),
    testBookingHistory3: (new BookingHistory().set('id', 3)),

    testCreditHistories: new CreditHistories(),
    testCreditHistory1: (new CreditHistory().set('id', 1)),
    testCreditHistory2: (new CreditHistory().set('id', 2)),
    testCreditHistory3: (new CreditHistory().set('id', 3)),

    testAccountHistories: new AccountHistories(),
    testAccountHistory1: (new AccountHistory().set('id', 1)),
    testAccountHistory2: (new AccountHistory().set('id', 2)),
    testAccountHistory3: (new AccountHistory().set('id', 3)),

    testCoupons: new Coupons(),
    testCoupon1: (new Coupon()).set("id", 1).set("balance", 30).set("total", 30).set("expiryTime", new Date()),
    testCoupon2: (new Coupon()).set("id", 2).set("balance", 20).set("total", 30),
    testCoupon3: (new Coupon()).set("id", 3).set("balance", 25).set("total", 30),

    testCategories: {
        "data": [

            {
                "id": 0,
                "value": "00",
                "name": "语言培训",
                "children": [
                    {
                        "id": 1,
                        "value": "0001",
                        "name": "小语种",
                        "children": [
                            {
                                "id": 2,
                                "value": "000101",
                                "name": "日语",
                                "children": []
                            },
                            {
                                "id": 3,
                                "value": "000102",
                                "name": "韩语",
                                "children": []
                            }
                        ]
                    },
                    {
                        "id": 4,
                        "value": "0002",
                        "name": "英语",
                        "children": [
                            {
                                "id": 5,
                                "value": "000201",
                                "name": "GMAT",
                                "children": []
                            },
                            {
                                "id": 6,
                                "value": "000202",
                                "name": "GRE",
                                "children": []
                            }
                        ]
                    }

                ]
            },
            {
                "id": 16,
                "value": "01",
                "name": "学历文凭",
                "children": [
                    {
                        "id": 17,
                        "value": "0101",
                        "name": "考研",
                        "children": [
                            {
                                "id": 7,
                                "value": "010101",
                                "name": "数学",
                                "children": []
                            },
                            {
                                "id": 8,
                                "value": "010102",
                                "name": "政治",
                                "children": []
                            }
                        ]
                    }

                ]

            },
            {
                "id": 9,
                "value": "02",
                "name": "资格认证",
                "children": [
                    {
                        "id": 10,
                        "value": "0201",
                        "name": "国家公职",
                        "children": [
                            {
                                "id": 11,
                                "value": "020101",
                                "name": "企业法律顾问",
                                "children": []
                            },
                            {
                                "id": 12,
                                "value": "020102",
                                "name": "公务员",
                                "children": []
                            }
                        ]
                    },
                    {
                        "id": 13,
                        "value": "0202",
                        "name": "外贸",
                        "children": [
                            {
                                "id": 14,
                                "value": "020201",
                                "name": "单证员",
                                "children": []
                            },
                            {
                                "id": 15,
                                "value": "020202",
                                "name": "报关员",
                                "children": []
                            }
                        ]
                    }

                ]
            }
        ]
    },
    testLocations: {
        "start": 0,
        "count": 1,
        "total": 1,
        "data": [
            {
                "id": 0,
                "value": "00",
                "name": "江苏",
                "children": [
                    {
                        "id": 2,
                        "value": "0000",
                        "name": "南京",
                        "children": [
                            {
                                "id": 5,
                                "value": "000000",
                                "name": "浦口区",
                                "children": []
                            },
                            {
                                "id": 6,
                                "value": "000001",
                                "name": "鼓楼区",
                                "children": []
                            },
                            {
                                "id": 6,
                                "value": "000002",
                                "name": "秦淮区",
                                "children": []
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

testMockObj.testCourses.add([testMockObj.testCourse1, testMockObj.testCourse2, testMockObj.testCourse3, testMockObj.testCourse4]);
testMockObj.testCourses.total = 39;
testMockObj.testBookings.add([testMockObj.testBooking1, testMockObj.testBooking2, testMockObj.testBooking3, testMockObj.testBooking4]);
testMockObj.testCoupons.add([testMockObj.testCoupon1, testMockObj.testCoupon2, testMockObj.testCoupon3]);
testMockObj.testTeachers.add([testMockObj.testTeacher1, testMockObj.testTeacher2, testMockObj.testTeacher3]);
testMockObj.testPhotos.add([testMockObj.testPhoto1, testMockObj.testPhoto2, testMockObj.testPhoto3]);

testMockObj.testCourse1.set("teacherList", testMockObj.testTeachers);
testMockObj.testCourse2.set("teacherList", testMockObj.testTeachers);
testMockObj.testCourse3.set("teacherList", testMockObj.testTeachers);

testMockObj.testCourse1.set("classPhotoList", testMockObj.testPhotos);
testMockObj.testCourse2.set("classPhotoList", testMockObj.testPhotos);
testMockObj.testCourse3.set("classPhotoList", testMockObj.testPhotos);

testMockObj.testPartners.add([testMockObj.testPartner1, testMockObj.testPartner2, testMockObj.testPartner3, testMockObj.testPartner4]);

testMockObj.testBooking1.set("course", testMockObj.testCourse1).set('reference', 'isk-2323-s232');
testMockObj.testBooking2.set("course", testMockObj.testCourse2).set('reference', 'isk-2323-s232');
testMockObj.testBooking3.set("course", testMockObj.testCourse3).set('reference', 'isk-2323-s232');
testMockObj.testBookings.add([testMockObj.testBooking1, testMockObj.testBooking2, testMockObj.testBooking3]);

testMockObj.testBookingHistory1.set('remark', 'qq').set('createTime', new Date()).set('optName', 0);
testMockObj.testBookingHistory2.set('remark', 'qq').set('createTime', new Date()).set('optName', 0);
testMockObj.testBookingHistory3.set('remark', 'qq').set('createTime', new Date()).set('optName', 0);
testMockObj.testBookingHistories.add([testMockObj.testBookingHistory1, testMockObj.testBookingHistory2, testMockObj.testBookingHistory3]);

testMockObj.testCreditHistory1.set('charge', 200).set('createTime', new Date()).set('operation', 0);
testMockObj.testCreditHistory2.set('charge', 300).set('createTime', new Date()).set('operation', 0);
testMockObj.testCreditHistory3.set('charge', 400).set('createTime', new Date()).set('operation', 0);
testMockObj.testCreditHistories.add([testMockObj.testCreditHistory1, testMockObj.testCreditHistory2, testMockObj.testCreditHistory3]);

testMockObj.testAccountHistory1.set('charge', 700).set('createTime', new Date()).set('operation', 1);
testMockObj.testAccountHistory2.set('charge', 300).set('createTime', new Date()).set('operation', 0);
testMockObj.testAccountHistory3.set('charge', 400).set('createTime', new Date()).set('operation', 0);
testMockObj.testAccountHistories.add([testMockObj.testAccountHistory1, testMockObj.testAccountHistory2, testMockObj.testAccountHistory3]);