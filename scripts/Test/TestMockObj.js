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
	testBooking1: (new Booking()).set("bookingId", 1).set("course", new Course()),
	testBooking2: (new Booking()).set("bookingId", 2).set("course", new Course()),
	testBooking3: (new Booking()).set("bookingId", 3).set("course", new Course()),
	testBooking4: (new Booking()).set("bookingId", 4).set("course", new Course()),
	testBooking5: (new Booking()).set("bookingId", 5).set("course", new Course()),
	testBooking6: (new Booking()).set("bookingId", 6).set("course", new Course()),
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
testMockObj.testUser.set("bookings", testMockObj.testBookings);
testMockObj[EnumConfig.ModuleIdentifier.admin] = testMockObj.testAdmin;
testMockObj[EnumConfig.ModuleIdentifier.partner] = testMockObj.testPartner;
testMockObj[EnumConfig.ModuleIdentifier.user] = testMockObj.testUser;