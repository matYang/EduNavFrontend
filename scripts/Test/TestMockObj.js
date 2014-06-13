testMockObj = {
	testMode: true,
	testAdmin: (new Admin()).set("name", "admin1").set("phone","2260000000"),
	testUser: new User(),
	testPartner: new Partner(),
	testCourses: new Courses(),
	testCourse1: (new Course()).set("courseId",1).set("courseName", "雅思英语").set("price",10800).set("instName","南京新东方"),
	testCourse2: (new Course()).set("courseId",2).set("courseName", "SAT").set("price",10800).set("instName","南京新东方"),
	testCourse3: (new Course()).set("courseId",3).set("courseName", "托福").set("price",9800).set("instName","南京新东方"),
	testCourse4: (new Course()).set("courseId",4).set("courseName", "GRE").set("price",12900).set("instName","南京新东方"),
	testCourse5: (new Course()).set("courseId",5).set("courseName", "四六级").set("price",5800).set("instName","南京新东方"),
	testCourse6: (new Course()).set("courseId",6).set("courseName", "雅思英语").set("price",9800).set("instName","南京新东方"),
	testBookings: new Bookings(),
	testBooking1: (new Booking()).set("bookingId", 1).set("reference", "10001").set("status", EnumConfig.BookingStatus.awaiting).set("name","马修").set("phone", 13915063907).set("email", "test@gmail.com").set("price",11999).set("note","总而言之这是条测试信息"),
	testBooking2: (new Booking()).set("bookingId", 2).set("reference", "10002").set("status", EnumConfig.BookingStatus.confirmed).set("name","John").set("phone", 13915063907).set("email", "test@gmail.com"),
	testBooking3: (new Booking()).set("bookingId", 3).set("reference", "10003").set("status", EnumConfig.BookingStatus.cancelled).set("name","John").set("phone", 13915063907).set("email", "test@gmail.com"),
	testBooking4: (new Booking()).set("bookingId", 4).set("reference", "10004").set("status", EnumConfig.BookingStatus.enter).set("name","John").set("phone", 13915063907).set("email", "test@gmail.com"),
	testBooking5: (new Booking()).set("bookingId", 5).set("reference", "10005").set("status", EnumConfig.BookingStatus.finished).set("name","John").set("phone", 13915063907).set("email", "test@gmail.com"),
	testBooking6: (new Booking()).set("bookingId", 6).set("reference", "10006").set("status", EnumConfig.BookingStatus.failed).set("name","John").set("phone", 13915063907).set("email", "test@gmail.com"),
	testCategories: {
		"数学":{"初中": null,"高中": null},
		"语文":{"初中": null,"高中": null},
		"英语":{"四级": null,"六级": null,"托福": null,"雅思": null,"SAT": null,"GRE": null},
		"考研":{"考研": null},
		"会计":{"会计证": null,"职称证": null,"职业资格证": null},
		"小语种":{"日语": null,"韩语": null,"法语": null,"西班牙语": null,"阿拉伯语": null,"Simon语": null}
	}
}
testMockObj.testCourses.add([testMockObj.testCourse1,testMockObj.testCourse2,testMockObj.testCourse3,testMockObj.testCourse4,testMockObj.testCourse5,testMockObj.testCourse6]);
testMockObj.testBookings.add([testMockObj.testBooking1,testMockObj.testBooking2,testMockObj.testBooking3,testMockObj.testBooking4,testMockObj.testBooking5,testMockObj.testBooking6]);
testMockObj.testBooking1.set("course", testMockObj.testCourse1);
testMockObj.testBooking2.set("course", testMockObj.testCourse2);
testMockObj.testBooking3.set("course", testMockObj.testCourse3);
testMockObj.testBooking4.set("course", testMockObj.testCourse4);
testMockObj.testBooking5.set("course", testMockObj.testCourse5);
testMockObj.testBooking6.set("course", testMockObj.testCourse6);
testMockObj.testUser.set("bookings", testMockObj.testBookings);
testMockObj[EnumConfig.ModuleIdentifier.admin] = testMockObj.testAdmin;
testMockObj[EnumConfig.ModuleIdentifier.partner] = testMockObj.testPartner;
testMockObj[EnumConfig.ModuleIdentifier.user] = testMockObj.testUser;