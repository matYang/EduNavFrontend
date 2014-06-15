testMockObj = {
    testMode: false,
    testAdmin: (new Admin()).set("name", "admin1").set("phone","2260000000"),
    testUser: new User(),
    testPartner: new Partner(),
    testCourses: new Courses(),
    testCourse1: (new Course()).set("courseId",1).set("courseName", "雅思英语").set("price",10800).set("instName","南京新东方").set("location", "南京市玄武区"),
    testCourse2: (new Course()).set("courseId",2).set("courseName", "SAT").set("price",10800).set("instName","School A").set("location", "南京市白下区"),
    testCourse3: (new Course()).set("courseId",3).set("courseName", "托福").set("price",9800).set("instName","School B").set("location", "南京市秦淮区"),
    testCourse4: (new Course()).set("courseId",4).set("courseName", "GRE").set("price",12900).set("instName","School C").set("location", "南京市建邺区"),
    testCourse5: (new Course()).set("courseId",5).set("courseName", "四六级").set("price",5800).set("instName","School D").set("location", "南京市鼓楼区"),
    testCourse6: (new Course()).set("courseId",6).set("courseName", "雅思英语").set("price",9800).set("instName","School E").set("location", "南京市下关区"),
    testCourse7: (new Course()).set("courseId",7).set("courseName", "小学英语补习").set("price",4000).set("instName","School F").set("location", "南京市浦口区"),
    testCourse8: (new Course()).set("courseId",8).set("courseName", "初中英语").set("price",10800).set("instName","School G"),
    testCourse9: (new Course()).set("courseId",9).set("courseName", "商务英语").set("price",9800).set("instName","School H"),
    testCourse10: (new Course()).set("courseId",10).set("courseName", "OMG英语").set("price",12900).set("instName","School I"),
    testCourse11: (new Course()).set("courseId",11).set("courseName", "口语强化班").set("price",5800).set("instName","School J"),
    testCourse12: (new Course()).set("courseId",12).set("courseName", "高考图集").set("price",9800).set("instName","School K"),
    testBookings: new Bookings(),
    testBooking1: (new Booking()).set("bookingId", 1).set("reference", "10001").set("status", EnumConfig.BookingStatus.awaiting).set("name","马修").set("phone", 13915063907).set("email", "test@gmail.com").set("price",11999).set("note","总而言之这是条测试信息"),
    testBooking2: (new Booking()).set("bookingId", 2).set("reference", "10002").set("status", EnumConfig.BookingStatus.confirmed).set("name","John").set("phone", 13915063907).set("email", "test@gmail.com").set("price",10000),
    testBooking3: (new Booking()).set("bookingId", 3).set("reference", "10003").set("status", EnumConfig.BookingStatus.cancelled).set("name","John").set("phone", 13915063907).set("email", "test@gmail.com").set("price",9800),
    testBooking4: (new Booking()).set("bookingId", 4).set("reference", "10004").set("status", EnumConfig.BookingStatus.enter).set("name","John").set("phone", 13915063907).set("email", "test@gmail.com").set("price",4500),
    testBooking5: (new Booking()).set("bookingId", 5).set("reference", "10005").set("status", EnumConfig.BookingStatus.finished).set("name","John").set("phone", 13915063907).set("email", "test@gmail.com").set("price",500),
    testBooking6: (new Booking()).set("bookingId", 6).set("reference", "10006").set("status", EnumConfig.BookingStatus.failed).set("name","John").set("phone", 13915063907).set("email", "test@gmail.com").set("price",7000),
    testBooking7: (new Booking()).set("bookingId", 7).set("reference", "10007").set("status", EnumConfig.BookingStatus.awaiting).set("name","马修").set("phone", 13915063907).set("email", "test@gmail.com").set("price",11999).set("note","总而言之这是条测试信息"),
    testBooking8: (new Booking()).set("bookingId", 8).set("reference", "10008").set("status", EnumConfig.BookingStatus.confirmed).set("name","John").set("phone", 13915063907).set("email", "test@gmail.com").set("price",11849),
    testBooking9: (new Booking()).set("bookingId", 9).set("reference", "10009").set("status", EnumConfig.BookingStatus.cancelled).set("name","John").set("phone", 13915063907).set("email", "test@gmail.com").set("price",11000),
    testBooking10: (new Booking()).set("bookingId", 10).set("reference", "10010").set("status", EnumConfig.BookingStatus.enter).set("name","John").set("phone", 13915063907).set("email", "test@gmail.com").set("price",998),
    testBooking11: (new Booking()).set("bookingId", 11).set("reference", "10011").set("status", EnumConfig.BookingStatus.finished).set("name","John").set("phone", 13915063907).set("email", "test@gmail.com").set("price",4651),
    testBooking12: (new Booking()).set("bookingId", 12).set("reference", "10012").set("status", EnumConfig.BookingStatus.failed).set("name","John").set("phone", 13915063907).set("email", "test@gmail.com").set("price",9781),

    testCategories: {
            "初中辅导":{
                "初一":{
                    "语文":{"index":1},
                    "数学":{"index":2},
                    "英语":{"index":3},
                    "物理":{"index":4},
                    "化学":{"index":5},
                    "地理":{"index":6},
                    "index":1
                },
                "初二":{
                    "语文":{"index":1},
                    "数学":{"index":2},
                    "英语":{"index":3},
                    "物理":{"index":4},
                    "化学":{"index":5},
                    "地理":{"index":6},
                    "index":2
                },
                "初三":{
                    "语文":{"index":1},
                    "数学":{"index":2},
                    "英语":{"index":3},
                    "物理":{"index":4},
                    "化学":{"index":5},
                    "地理":{"index":6},
                    "index":3
                },
                "index":1
            },
            "高中辅导":{
                "高一":{
                    "语文":{"index":1},
                    "数学":{"index":2},
                    "英语":{"index":3},
                    "物理":{"index":4},
                    "化学":{"index":5},
                    "地理":{"index":6},
                    "index":1
                },
                "高二":{
                    "语文":{"index":1},
                    "数学":{"index":2},
                    "英语":{"index":3},
                    "物理":{"index":4},
                    "化学":{"index":5},
                    "地理":{"index":6},
                    "index":2
                },
                "高三":{
                    "语文":{"index":1},
                    "数学":{"index":2},
                    "英语":{"index":3},
                    "物理":{"index":4},
                    "化学":{"index":5},
                    "地理":{"index":6},
                    "index":3
                },
                "index":2
            },
            "英语提升":{
                "级别":{
                    "CET1":{"index":1},
                    "CET2":{"index":2},
                    "CET3":{"index":3},
                    "index":1
                    
                },
                "index":3
            },
            "英语考级":{
                "四级":{
                    "入门":{"index":1},
                    "冲分":{"index":2},
                    "index":1
                },
                "六级":{
                    "入门":{"index":1},
                    "冲分":{"index":2},
                    "index":2
                },
                "index":4
            },
            "出国留学":{
                "出国":{
                    "托福":{"index":1},
                    "雅思":{"index":2},
                    "SAT":{"index":3},
                    "GRE":{"index":4},
                    "GMAT":{"index":5},
                    "index":1
                },
                "index":5
            },
            "小语种":{
                "日语":{
                    "N1":{"index":1},
                    "N2":{"index":2},
                    "N3":{"index":3},
                    "N4":{"index":4},
                    "index":1
                },
                "韩语":{
                    "思密达1":{"index":1},
                    "思密达2":{"index":2},
                    "思密达3":{"index":3},
                    "index":2
                },
                "法语":{
                    "bounju":{"index":1},
                    "gooday":{"index":2},
                    "index":3
                },
                "index":6
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
                            "江宁":{"index":8},
                            "index":1
                        },
                        "苏州":{
                            "马修":{"index":1},
                            "index":2
                        },
                        "index":1
                    },
                    "上海":{
                        "上海":{
                            "浦东":{"index":1},
                            "虹桥":{"index":2},
                            "宝山":{"index":3},
                            "金山":{"index":4},
                            "index":1
                        },
                        "日本":{
                            "东京":{"index":1},
                            "小仓":{"index":2},
                            "广岛":{"index":3},
                            "index":2
                        },
                        "index":2
                    }
                }
}

testMockObj.testCourses.add([testMockObj.testCourse1,testMockObj.testCourse2,testMockObj.testCourse3,testMockObj.testCourse4,
                             testMockObj.testCourse5,testMockObj.testCourse6,testMockObj.testCourse7,testMockObj.testCourse8,
                             testMockObj.testCourse9,testMockObj.testCourse10,testMockObj.testCourse11,testMockObj.testCourse12]);
testMockObj.testBookings.add([testMockObj.testBooking1,testMockObj.testBooking2,testMockObj.testBooking3,testMockObj.testBooking4,testMockObj.testBooking5,testMockObj.testBooking6, testMockObj.testBooking7,testMockObj.testBooking8,testMockObj.testBooking9, testMockObj.testBooking10,testMockObj.testBooking11,testMockObj.testBooking12]);
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
testMockObj.testUser.set("bookings", testMockObj.testBookings);
testMockObj[EnumConfig.ModuleIdentifier.admin] = testMockObj.testAdmin;
testMockObj[EnumConfig.ModuleIdentifier.partner] = testMockObj.testPartner;
testMockObj[EnumConfig.ModuleIdentifier.user] = testMockObj.testUser;