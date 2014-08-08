var longText = "啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊";
testMockObj = {
    testMode: (C_ENV_VAR === "LOCAL") ? true : false,
    testUser: new User().set('invitationCode','白痴'),
    testPartners: new Partners(),
    testPartner1: new Partner().set("id", 1),
    testPartner2: new Partner().set("id", 2),
    testPartner3: new Partner().set("id", 3),
    testPartner4: new Partner().set("id", 4),
    testPartner5: new Partner().set("id", 5),
    testTeachers: new Teachers(),
    testTeacher1: new Teacher().set("id", 1).set("name", "Teacher A"),
    testTeacher2: new Teacher().set("id", 2).set("name", "Teacher B"),
    testTeacher3: new Teacher().set("id", 3).set("name", "Teacher C"),
    testTeacher4: new Teacher().set("id", 4).set("name", "Teacher D"),
    testTeacher5: new Teacher().set("id", 5).set("name", "Teacher E"),
    testPhotos: new Photos(),
    testPhoto1: (new Photo()).set("id", 1).set("imgUrl", "/testUrl1"),
    testPhoto2: new Photo().set("id", 2).set("imgUrl", "/testUrl2"),
    testPhoto3: new Photo().set("id", 3).set("imgUrl", "/testUrl3"),
    testPhoto4: new Photo().set("id", 4).set("imgUrl", "/testUrl4"),
    testPhoto5: new Photo().set("id", 5).set("imgUrl", "/testUrl5"),
    testPhoto6: new Photo().set("id", 6).set("imgUrl", "/testUrl6"),
    testCourses: new Courses(),
    testCourse1: (new Course()).set("categoryValue","000101").set("partnerIntro", longText).set("id", 1).set("courseName", "雅思英语").set("price", 10800).set("instName", "南京新东方").set("address", "南京市玄武区").set("cashback", 0).set("status",  EnumConfig.CourseStatus.onlined),
    testCourse2: (new Course()).set("categoryValue","000101").set("partnerIntro", longText).set("id", 2).set("courseName", "SAT").set("price", 10800).set("instName", "School A").set("address", "南京市白下区").set("cashback", 50).set("status",  EnumConfig.CourseStatus.onlined),
    testCourse3: (new Course()).set("categoryValue","000101").set("partnerIntro", longText).set("id", 3).set("courseName", "托福").set("price", 9800).set("instName", "School B").set("address", "南京市秦淮区").set("cashback", 12).set("status",  EnumConfig.CourseStatus.onlined),
    testCourse4: (new Course()).set("categoryValue","000101").set("id", 4).set("courseName", "GRE").set("price",12900).set("instName", "School C").set("address", "南京市建邺区").set("status",  EnumConfig.CourseStatus.onlined),
    testCourse5: (new Course()).set("categoryValue","000101").set("id", 5).set("courseName", "四六级").set("price",5800).set("instName", "School D").set("address", "南京市鼓楼区").set("cashback", 10).set("status",  EnumConfig.CourseStatus.onlined),
    testCourse6: (new Course()).set("categoryValue","000101").set("id", 6).set("courseName", "雅思英语").set("price",9800).set("instName", "School E").set("address", "南京市下关区").set("status",  EnumConfig.CourseStatus.onlined),
    testCourse7: (new Course()).set("categoryValue","000101").set("id", 7).set("courseName", "小学英语补习").set("price",4000).set("instName", "School F").set("address", "南京市浦口区").set("status",  EnumConfig.CourseStatus.onlined),
    testCourse8: (new Course()).set("categoryValue","000101").set("id", 8).set("courseName", "初中英语").set("price",10800).set("instName", "School G").set("cashback", 50).set("status",  EnumConfig.CourseStatus.onlined),
    testCourse9: (new Course()).set("categoryValue","000101").set("id", 9).set("courseName", "商务英语").set("price",9800).set("instName", "School H").set("status",  EnumConfig.CourseStatus.onlined),
    testCourse10: (new Course()).set("categoryValue","000101").set("id", 10).set("courseName", "OMG英语").set("price",12900).set("instName", "School I").set("status",  EnumConfig.CourseStatus.onlined),
    testCourse11: (new Course()).set("categoryValue","000101").set("id", 11).set("courseName", "口语强化班").set("price",5800).set("instName", "School J").set("cashback", 100).set("status",  EnumConfig.CourseStatus.onlined),
    testCourse12: (new Course()).set("categoryValue","000101").set("id", 12).set("courseName", "高考图集").set("price",9800).set("instName", "School K").set("status",  EnumConfig.CourseStatus.onlined),
    testBookings: new Bookings(),
    testBooking1: (new Booking()).set("id", 1).set("reference", "10001").set("status", 0).set("name", "马修").set("phone", 13915063907).set("email", "test@gmail.com").set("price",11999).set("note", "总而言之这是条测试信息"),
    testBooking2: (new Booking()).set("id", 2).set("reference", "10002").set("status", 1).set("name", "John").set("phone", 13915063907).set("email", "test@gmail.com").set("price",10000),
    testBooking3: (new Booking()).set("id", 3).set("reference", "10003").set("status", 2).set("name", "John").set("phone", 13915063907).set("email", "test@gmail.com").set("price",9800),
    testBooking4: (new Booking()).set("id", 4).set("reference", "10004").set("status", 3).set("name", "John").set("phone", 13915063907).set("email", "test@gmail.com").set("price",4500),
    testBooking5: (new Booking()).set("id", 5).set("reference", "10005").set("status", 4).set("name", "John").set("phone", 13915063907).set("email", "test@gmail.com").set("price",500),
    testBooking6: (new Booking()).set("id", 6).set("reference", "10006").set("status", 5).set("name", "John").set("phone", 13915063907).set("email", "test@gmail.com").set("price",7000),
    testBooking7: (new Booking()).set("id", 7).set("reference", "10007").set("status", 6).set("name", "马修").set("phone", 13915063907).set("email", "test@gmail.com").set("price",11999).set("note", "总而言之这是条测试信息"),
    testBooking8: (new Booking()).set("id", 8).set("reference", "10008").set("status", 7).set("name", "John").set("phone", 13915063907).set("email", "test@gmail.com").set("price",11849),
    testBooking9: (new Booking()).set("id", 9).set("reference", "10009").set("status", 8).set("name", "John").set("phone", 13915063907).set("email", "test@gmail.com").set("price",11000),
    testBooking10: (new Booking()).set("id", 10).set("reference", "10010").set("status", 9).set("name", "John").set("phone", 13915063907).set("email", "test@gmail.com").set("price",998),
    testBooking11: (new Booking()).set("id", 11).set("reference", "10011").set("status", 10).set("name", "John").set("phone", 13915063907).set("email", "test@gmail.com").set("price",4651),
    testBooking12: (new Booking()).set("id", 12).set("reference", "10012").set("status", 11).set("name", "John").set("phone", 13915063907).set("email", "test@gmail.com").set("price",9781),
    testCoupons: new Coupons(),
    testCoupon1: (new Coupon()).set("id", 1).set("amount", 30),
    testCoupon2: (new Coupon()).set("id", 2).set("amount", 20),
    testCoupon3: (new Coupon()).set("id", 3).set("amount", 25),
    testCoupon4: (new Coupon()).set("id", 4).set("amount", 10),
    testCoupon5: (new Coupon()).set("id", 5).set("amount", 20).set("status", EnumConfig.CouponStatus.inactive),
    testCoupon6: (new Coupon()).set("id", 6).set("amount", 40).set("status", EnumConfig.CouponStatus.inactive),
    testCoupon7: (new Coupon()).set("id", 7).set("amount", 15).set("status", EnumConfig.CouponStatus.inactive),
    testCoupon8: (new Coupon()).set("id", 8).set("amount", 15).set("status", EnumConfig.CouponStatus.inactive),
    testCoupon9: (new Coupon()).set("id", 9).set("amount", 20).set("status", EnumConfig.CouponStatus.usable),
    testCoupon10: (new Coupon()).set("id", 10).set("amount", 40).set("status", EnumConfig.CouponStatus.usable),
    testCoupon11: (new Coupon()).set("id", 11).set("amount", 15).set("status", EnumConfig.CouponStatus.inactive),
    testCoupon12: (new Coupon()).set("id", 12).set("amount", 15).set("status", EnumConfig.CouponStatus.inactive),
    testCredits: new Credits(),
    testCredit1: (new Credit()).set("id", 1).set("amount", 1000),
    testCredit2: (new Credit()).set("id", 2).set("amount", 1000),
    testCredit3: (new Credit()).set("id", 3).set("amount", 1000),
    testCredit4: (new Credit()).set("id", 4).set("amount", 1000),
    testCredit5: (new Credit()).set("id", 5).set("amount", 1000),
    testCredit6: (new Credit()).set("id", 6).set("amount", 1000),
    testCredit7: (new Credit()).set("id", 7).set("amount", 1000),
    testCredit8: (new Credit()).set("id", 8).set("amount", 1000),
    testCategories:{
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
            "children":[
            {
                "id": 2,
                "value": "0000",
                "name": "南京",
                "children":[
                    {
                        "id": 5,
                        "value": "000000",
                        "name": "浦口区",
                        "children":[]
                    },
                    {
                        "id": 6,
                        "value": "000001",
                        "name": "鼓楼区",
                        "children":[]
                    },
                    {
                        "id": 6,
                        "value": "000002",
                        "name": "秦淮区",
                        "children":[]
                    }
                ]
            }]
        }
        ]
    }
};

testMockObj.testCourses.add([testMockObj.testCourse1,testMockObj.testCourse2,testMockObj.testCourse3,testMockObj.testCourse4,
                             testMockObj.testCourse5,testMockObj.testCourse6,testMockObj.testCourse7,testMockObj.testCourse8,
                             testMockObj.testCourse9,testMockObj.testCourse10,testMockObj.testCourse11,testMockObj.testCourse12]);
testMockObj.testCourses.total = 39;
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
testMockObj.testBookings.add([,testMockObj.testBooking1,testMockObj.testBooking2,testMockObj.testBooking4,testMockObj.testBooking5]);

testMockObj.testUser.set("couponList", testMockObj.testCoupons);
testMockObj.testUser.set("creditList", testMockObj.testCredits);
testMockObj[EnumConfig.ModuleIdentifier.user] = testMockObj.testUser;