var longText = "啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊";
testMockObj = {
    testMode: (C_ENV_VAR === "LOCAL") ? true : false,
    testUser: new User().set('name', '白痴').set('phone', '15012312312').set('gender', 0).set('id', 1),
    testPartners: new Partners(),
    testPartner1: new Partner().set("id", 1),
    testPartner2: new Partner().set("id", 2),

    testTeachers: new Teachers(),
    testTeacher1: new Teacher().set("id", 1).set("name", "Teacher A").set("imgUrl", "/testUrl1")
        .set('intro', '这是SD卡很疯狂和水电费三角裤好地方水电费水电费较深的回复三等奖回复水电费金黄色的'),
    testTeacher2: new Teacher().set("id", 2).set("name", "Teacher B").set("imgUrl", "/testUrl1"),
    testTeacher3: new Teacher().set("id", 3).set("name", "Teacher C").set("imgUrl", "/testUrl1"),
    testPhotos: new Photos(),
    testPhoto1: (new Photo()).set("id", 1).set("imgUrl", "/testUrl1"),
    testPhoto2: new Photo().set("id", 2).set("imgUrl", "/testUrl2"),
    testPhoto3: new Photo().set("id", 3).set("imgUrl", "/testUrl3"),

    testAddressList: new Addresses(),
    testAddress1: (new Address()).set('id', 1).set('detail', '南京市玄武区孝陵卫200号'),
    testAddress2: (new Address()).set('id', 2).set('detail', '南京市秦淮区人民政府'),
    testAddress3: (new Address()).set('id', 3).set('detail', '南京市中山北路222号xx大厦3楼'),

    testComments: new Comments(),
    testComment1: new Comment().set('id', 1).set('user', {phone: '133****23232'})
        .set('content', '这是评论测试内容1').set('createTime', new Date())
        .set('conditionRating', 2).set('attitudeRating', 3).set('satisfactionRating', 5),
    testComment2: new Comment().set('id', 2).set('user', {phone: '150****23232'})
        .set('content', '这是评论测试内容2').set('createTime', new Date())
        .set('conditionRating', 2).set('attitudeRating', 3).set('satisfactionRating', 4),


    testTuans: new Tuans(),
    testTuan1: (new Tuan()).set('id', 1).set('courseId', 1)
        .set('title', '团购测试标题1').set('groupBuyPrice', 299)
        .set('bookingTotal', 123).set('hot', 1).set('endTime', 1412200111111)
        .set('photoList', [
            {url: './style/images/t_item_banner_test.jpg'},//约定第一张为置顶课程的图片
            {url: './style/images/t_item_banner_test.jpg'},//约定第二张为团购列表中的封面
            {url: './style/images/t_item_banner_test.jpg'},//第三张之后的都是团购详情中的图片
            {url: './style/images/t_item_banner_test.jpg'},
        ]),
    testTuan2: (new Tuan()).set('id', 2).set('courseId', 2)
        .set('title', '团购测试标题2').set('groupBuyPrice', 299)
        .set('bookingTotal', 123).set('hot', 1).set('endTime', 1412200222222)
        .set('photoList', [
            {url: './style/images/t_item_banner_test.jpg'},//约定第一张为置顶课程的图片
            {url: './style/images/t_item_banner_test.jpg'},//约定第二张为团购列表中的封面
            {url: './style/images/t_item_banner_test.jpg'},//第三张之后的都是团购详情中的图片
            {url: './style/images/t_item_banner_test.jpg'},
        ]),


    testCourses: new Courses(),
    testCourse1: (new Course()).set("categoryValue", "000101").set("partnerIntro", longText).set("id", 1)
        .set("courseName", "雅思英语").set("cashback", 10).set("commission", 95)
        .set("originalPrice", 899)
        .set('schooltimeWeek', [1, 2]).set('schooltimeDay', [3, 4])
        .set('startTime1', '0900').set('finishTime1', '1100')
        .set("instName", "南京新东方").set("address", "南京市玄武区")
        .set("circleName", '仙林大学城1')
        .set("status", EnumConfig.CourseStatus.onlined)
        .set("bookingType", 1)
        .set('startUponArrival', 1).set('startDate', new Date())
        //课程详情
        .set('qualityAssurance', '课时信息-test')
        .set('classSize', '班级类型-测试数据')
        .set('teachingMaterialIntro', '教材介绍-test')
        .set('teachingMaterialFee', '教材费用-test')
        .set('suitableStudent', '适合学员-test')
        //特色服务
        .set('passAgreement', '签约保过-test')
        .set('classTeacher', '推荐就业-test')
        .set('certification', '结业证书-test')
        .set('extracurricular', '课后互动-test')
        .set('bonusService', '赠送服务-test')
        .set('quiz', '阶段测评-test')
        .set('teachingAndExercise', '讲练结合-test')
        .set('questionBank', '题库支持-test')
        .set('downloadMaterials', '课件下载-test'),
    testCourse2: (new Course()).set("categoryValue", "000101").set("id", 2).set("courseName", "GRE"),
    testCourse3: (new Course()).set("categoryValue", "000101").set("id", 3).set("courseName", "GRE"),
    testCourse4: (new Course()).set("categoryValue", "000101").set("id", 4).set("courseName", "GRE"),
    testCourse5: (new Course()).set("categoryValue", "000101").set("id", 5).set("courseName", "GRE"),
    testCourse6: (new Course()).set("categoryValue", "000101").set("id", 6).set("courseName", "GRE"),
    testCourse7: (new Course()).set("categoryValue", "000101").set("id", 7).set("courseName", "GRE"),
    testCourse8: (new Course()).set("categoryValue", "000101").set("id", 8).set("courseName", "GRE"),
    testCourse9: (new Course()).set("categoryValue", "000101").set("id", 9).set("courseName", "GRE"),
    testCourse10: (new Course()).set("categoryValue", "000101").set("id", 10).set("courseName", "GRE"),
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

    testCategories: {"errorCode": 0, "start": 0, "count": 0, "total": 0, "data": [
        {"errorCode": 0, "name": "语言培训", "value": "00", "children": [
            {"errorCode": 0, "name": "英语", "value": "0000", "children": [
                {"errorCode": 0, "name": "四六级", "value": "000000", "children": [], "id": 227, "enabled": 0},
                {"errorCode": 0, "name": "雅思", "value": "000001", "children": [], "id": 240, "enabled": 0},
                {"errorCode": 0, "name": "托福", "value": "000002", "children": [], "id": 253, "enabled": 0},
                {"errorCode": 0, "name": "托业", "value": "000003", "children": [], "id": 266, "enabled": 0},
                {"errorCode": 0, "name": "GRE", "value": "000004", "children": [], "id": 276, "enabled": 0},
                {"errorCode": 0, "name": "GMAT", "value": "000005", "children": [], "id": 286, "enabled": 0},
                {"errorCode": 0, "name": "SAT", "value": "000006", "children": [], "id": 295, "enabled": 0},
                {"errorCode": 0, "name": "SSAT", "value": "000007", "children": [], "id": 302, "enabled": 0},
                {"errorCode": 0, "name": "AP", "value": "000008", "children": [], "id": 309, "enabled": 0},
                {"errorCode": 0, "name": "ACT", "value": "000009", "children": [], "id": 314, "enabled": 0},
                {"errorCode": 0, "name": "英语口语", "value": "000010", "children": [], "id": 318, "enabled": 0},
                {"errorCode": 0, "name": "职场英语", "value": "000011", "children": [], "id": 321, "enabled": 0},
                {"errorCode": 0, "name": "商务英语", "value": "000012", "children": [], "id": 323, "enabled": 0},
                {"errorCode": 0, "name": "出国英语", "value": "000013", "children": [], "id": 324, "enabled": 0},
                {"errorCode": 0, "name": "分年龄学习", "value": "000014", "children": [], "id": 325, "enabled": 0},
                {"errorCode": 0, "name": "新概念英语", "value": "000015", "children": [], "id": 331, "enabled": 0},
                {"errorCode": 0, "name": "基础英语", "value": "000016", "children": [], "id": 352, "enabled": 0}
            ], "id": 214, "enabled": 0},
            {"errorCode": 0, "name": "小语种", "value": "0001", "children": [
                {"errorCode": 0, "name": "日语", "value": "000100", "children": [], "id": 228, "enabled": 0},
                {"errorCode": 0, "name": "韩语", "value": "000101", "children": [], "id": 241, "enabled": 0},
                {"errorCode": 0, "name": "法语", "value": "000102", "children": [], "id": 254, "enabled": 0},
                {"errorCode": 0, "name": "德语", "value": "000103", "children": [], "id": 267, "enabled": 0},
                {"errorCode": 0, "name": "意大利语", "value": "000104", "children": [], "id": 277, "enabled": 0},
                {"errorCode": 0, "name": "西班牙语", "value": "000105", "children": [], "id": 287, "enabled": 0},
                {"errorCode": 0, "name": "葡萄牙语", "value": "000106", "children": [], "id": 296, "enabled": 0},
                {"errorCode": 0, "name": "阿拉伯语", "value": "000107", "children": [], "id": 303, "enabled": 0},
                {"errorCode": 0, "name": "俄语", "value": "000108", "children": [], "id": 326, "enabled": 0},
                {"errorCode": 0, "name": "印尼语", "value": "000109", "children": [], "id": 327, "enabled": 0},
                {"errorCode": 0, "name": "泰语", "value": "000110", "children": [], "id": 328, "enabled": 0},
                {"errorCode": 0, "name": "越南语", "value": "000111", "children": [], "id": 329, "enabled": 0},
                {"errorCode": 0, "name": "粤语", "value": "000112", "children": [], "id": 330, "enabled": 0}
            ], "id": 215, "enabled": 0}
        ], "id": 210, "enabled": 0},
        {"errorCode": 0, "name": "IT培训", "value": "01", "children": [
            {"errorCode": 0, "name": "基础考级", "value": "0100", "children": [
                {"errorCode": 0, "name": "办公应用", "value": "010000", "children": [], "id": 229, "enabled": 0},
                {"errorCode": 0, "name": "电脑维修", "value": "010001", "children": [], "id": 242, "enabled": 0},
                {"errorCode": 0, "name": "计算机一级", "value": "010002", "children": [], "id": 255, "enabled": 0},
                {"errorCode": 0, "name": "计算机二级", "value": "010003", "children": [], "id": 268, "enabled": 0},
                {"errorCode": 0, "name": "计算机三级", "value": "010004", "children": [], "id": 278, "enabled": 0},
                {"errorCode": 0, "name": "计算机四级", "value": "010005", "children": [], "id": 288, "enabled": 0}
            ], "id": 216, "enabled": 0},
            {"errorCode": 0, "name": "设计制作", "value": "0101", "children": [
                {"errorCode": 0, "name": "平面设计", "value": "010100", "children": [], "id": 230, "enabled": 0},
                {"errorCode": 0, "name": "工业设计", "value": "010101", "children": [], "id": 243, "enabled": 0},
                {"errorCode": 0, "name": "室内外设计", "value": "010102", "children": [], "id": 256, "enabled": 0},
                {"errorCode": 0, "name": "网页设计", "value": "010103", "children": [], "id": 269, "enabled": 0},
                {"errorCode": 0, "name": "影视设计", "value": "010104", "children": [], "id": 279, "enabled": 0},
                {"errorCode": 0, "name": "UI设计师", "value": "010105", "children": [], "id": 350, "enabled": 0}
            ], "id": 217, "enabled": 0},
            {"errorCode": 0, "name": "电商运营", "value": "0102", "children": [
                {"errorCode": 0, "name": "淘宝运营", "value": "010200", "children": [], "id": 231, "enabled": 0},
                {"errorCode": 0, "name": "网络营销", "value": "010201", "children": [], "id": 244, "enabled": 0},
                {"errorCode": 0, "name": "电子商务师", "value": "010202", "children": [], "id": 257, "enabled": 0}
            ], "id": 218, "enabled": 0},
            {"errorCode": 0, "name": "软件开发", "value": "0103", "children": [
                {"errorCode": 0, "name": "ACCP", "value": "010300", "children": [], "id": 232, "enabled": 0},
                {"errorCode": 0, "name": "手机应用", "value": "010301", "children": [], "id": 245, "enabled": 0},
                {"errorCode": 0, "name": "C", "value": "010302", "children": [], "id": 258, "enabled": 0},
                {"errorCode": 0, "name": "C#", "value": "010303", "children": [], "id": 270, "enabled": 0},
                {"errorCode": 0, "name": "JAVA", "value": "010304", "children": [], "id": 280, "enabled": 0},
                {"errorCode": 0, "name": "LINUX", "value": "010305", "children": [], "id": 289, "enabled": 0},
                {"errorCode": 0, "name": "NET", "value": "010306", "children": [], "id": 297, "enabled": 0},
                {"errorCode": 0, "name": "数据库", "value": "010307", "children": [], "id": 304, "enabled": 0},
                {"errorCode": 0, "name": "软件测试", "value": "010308", "children": [], "id": 310, "enabled": 0},
                {"errorCode": 0, "name": "C++", "value": "010309", "children": [], "id": 332, "enabled": 0},
                {"errorCode": 0, "name": "PHP", "value": "010310", "children": [], "id": 349, "enabled": 0},
                {"errorCode": 0, "name": "思科认证", "value": "010311", "children": [], "id": 351, "enabled": 0}
            ], "id": 219, "enabled": 0}
        ], "id": 211, "enabled": 0},
        {"errorCode": 0, "name": "资格认证", "value": "02", "children": [
            {"errorCode": 0, "name": "财会金融", "value": "0200", "children": [
                {"errorCode": 0, "name": "会计从业资格", "value": "020000", "children": [], "id": 233, "enabled": 0},
                {"errorCode": 0, "name": "会计实务", "value": "020001", "children": [], "id": 246, "enabled": 0},
                {"errorCode": 0, "name": "注册会计师", "value": "020002", "children": [], "id": 259, "enabled": 0},
                {"errorCode": 0, "name": "初级会计职称", "value": "020003", "children": [], "id": 271, "enabled": 0},
                {"errorCode": 0, "name": "中级会计职称", "value": "020004", "children": [], "id": 281, "enabled": 0},
                {"errorCode": 0, "name": "会计继续教育", "value": "020005", "children": [], "id": 290, "enabled": 0},
                {"errorCode": 0, "name": "银行从业资格", "value": "020006", "children": [], "id": 298, "enabled": 0},
                {"errorCode": 0, "name": "证券从业资格", "value": "020007", "children": [], "id": 305, "enabled": 0},
                {"errorCode": 0, "name": "理财规划师", "value": "020008", "children": [], "id": 311, "enabled": 0},
                {"errorCode": 0, "name": "经济师", "value": "020009", "children": [], "id": 315, "enabled": 0},
                {"errorCode": 0, "name": "黄金投资分析师", "value": "020010", "children": [], "id": 333, "enabled": 0},
                {"errorCode": 0, "name": "信用管理师", "value": "020011", "children": [], "id": 334, "enabled": 0}
            ], "id": 220, "enabled": 0},
            {"errorCode": 0, "name": "国家公职", "value": "0201", "children": [
                {"errorCode": 0, "name": "公务员", "value": "020100", "children": [], "id": 234, "enabled": 0},
                {"errorCode": 0, "name": "司法考试", "value": "020101", "children": [], "id": 247, "enabled": 0},
                {"errorCode": 0, "name": "政法干警", "value": "020102", "children": [], "id": 260, "enabled": 0}
            ], "id": 221, "enabled": 0},
            {"errorCode": 0, "name": "职称技能", "value": "0202", "children": [
                {"errorCode": 0, "name": "教师证", "value": "020200", "children": [], "id": 236, "enabled": 0},
                {"errorCode": 0, "name": "导游证", "value": "020201", "children": [], "id": 249, "enabled": 0},
                {"errorCode": 0, "name": "茶艺师", "value": "020202", "children": [], "id": 262, "enabled": 0},
                {"errorCode": 0, "name": "月嫂", "value": "020203", "children": [], "id": 273, "enabled": 0},
                {"errorCode": 0, "name": "育婴师", "value": "020204", "children": [], "id": 283, "enabled": 0},
                {"errorCode": 0, "name": "心理咨询师", "value": "020205", "children": [], "id": 292, "enabled": 0},
                {"errorCode": 0, "name": "公共营养师", "value": "020206", "children": [], "id": 300, "enabled": 0},
                {"errorCode": 0, "name": "汽车评估师", "value": "020207", "children": [], "id": 307, "enabled": 0},
                {"errorCode": 0, "name": "婚姻咨询师", "value": "020208", "children": [], "id": 312, "enabled": 0},
                {"errorCode": 0, "name": "驾驶证", "value": "020209", "children": [], "id": 316, "enabled": 0},
                {"errorCode": 0, "name": "电工", "value": "020210", "children": [], "id": 319, "enabled": 0},
                {"errorCode": 0, "name": "营销师", "value": "020211", "children": [], "id": 336, "enabled": 0},
                {"errorCode": 0, "name": "化妆师", "value": "020212", "children": [], "id": 337, "enabled": 1},
                {"errorCode": 0, "name": "美容师", "value": "020213", "children": [], "id": 338, "enabled": 1},
                {"errorCode": 0, "name": "形象设计师", "value": "020214", "children": [], "id": 339, "enabled": 1},
                {"errorCode": 0, "name": "操作工", "value": "020215", "children": [], "id": 340, "enabled": 1},
                {"errorCode": 0, "name": "模具工", "value": "020216", "children": [], "id": 341, "enabled": 1},
                {"errorCode": 0, "name": "汽车修理工", "value": "020217", "children": [], "id": 342, "enabled": 1},
                {"errorCode": 0, "name": "钳工师", "value": "020218", "children": [], "id": 343, "enabled": 1},
                {"errorCode": 0, "name": "数控车工", "value": "020219", "children": [], "id": 344, "enabled": 1},
                {"errorCode": 0, "name": "数控铣工", "value": "020220", "children": [], "id": 345, "enabled": 1}
            ], "id": 223, "enabled": 0},
            {"errorCode": 0, "name": "建筑物业", "value": "0203", "children": [
                {"errorCode": 0, "name": "建造师", "value": "020300", "children": [], "id": 235, "enabled": 0},
                {"errorCode": 0, "name": "造价员", "value": "020301", "children": [], "id": 248, "enabled": 0},
                {"errorCode": 0, "name": "造价工程师", "value": "020302", "children": [], "id": 261, "enabled": 0},
                {"errorCode": 0, "name": "建筑九大员", "value": "020303", "children": [], "id": 272, "enabled": 0},
                {"errorCode": 0, "name": "监理工程师", "value": "020304", "children": [], "id": 282, "enabled": 0},
                {"errorCode": 0, "name": "安全工程师", "value": "020305", "children": [], "id": 291, "enabled": 0},
                {"errorCode": 0, "name": "消防工程师", "value": "020306", "children": [], "id": 299, "enabled": 0},
                {"errorCode": 0, "name": "物业管理师", "value": "020307", "children": [], "id": 306, "enabled": 0},
                {"errorCode": 0, "name": "房地产策划师", "value": "020308", "children": [], "id": 335, "enabled": 0},
                {"errorCode": 0, "name": "物业经理人", "value": "020309", "children": [], "id": 353, "enabled": 0},
                {"errorCode": 0, "name": "安全ABC证书", "value": "020310", "children": [], "id": 354, "enabled": 0}
            ], "id": 222, "enabled": 0},
            {"errorCode": 0, "name": "企业相关", "value": "0204", "children": [
                {"errorCode": 0, "name": "企业培训师", "value": "020400", "children": [], "id": 237, "enabled": 0},
                {"errorCode": 0, "name": "行政管理师", "value": "020401", "children": [], "id": 250, "enabled": 0},
                {"errorCode": 0, "name": "企业职业经理人", "value": "020402", "children": [], "id": 263, "enabled": 0},
                {"errorCode": 0, "name": "项目管理师", "value": "020403", "children": [], "id": 274, "enabled": 0},
                {"errorCode": 0, "name": "职业培训师", "value": "020404", "children": [], "id": 284, "enabled": 0},
                {"errorCode": 0, "name": "人力资源师", "value": "020405", "children": [], "id": 293, "enabled": 0},
                {"errorCode": 0, "name": "劳动关系协调员", "value": "020406", "children": [], "id": 301, "enabled": 0},
                {"errorCode": 0, "name": "内训师", "value": "020407", "children": [], "id": 308, "enabled": 0},
                {"errorCode": 0, "name": "采购师", "value": "020408", "children": [], "id": 313, "enabled": 0},
                {"errorCode": 0, "name": "物流师", "value": "020409", "children": [], "id": 317, "enabled": 0},
                {"errorCode": 0, "name": "内审员", "value": "020410", "children": [], "id": 320, "enabled": 0},
                {"errorCode": 0, "name": "外审员", "value": "020411", "children": [], "id": 322, "enabled": 0},
                {"errorCode": 0, "name": "秘书", "value": "020412", "children": [], "id": 346, "enabled": 0},
                {"errorCode": 0, "name": "会展策划师", "value": "020413", "children": [], "id": 347, "enabled": 0},
                {"errorCode": 0, "name": "企业文化师", "value": "020414", "children": [], "id": 348, "enabled": 0},
                {"errorCode": 0, "name": "质量工程师", "value": "020415", "children": [], "id": 355, "enabled": 0},
                {"errorCode": 0, "name": "质量管理师", "value": "020416", "children": [], "id": 356, "enabled": 0}
            ], "id": 224, "enabled": 0}
        ], "id": 212, "enabled": 0},
        {"errorCode": 0, "name": "学历文凭", "value": "03", "children": [
            {"errorCode": 0, "name": "成人学历", "value": "0300", "children": [
                {"errorCode": 0, "name": "自考", "value": "030000", "children": [], "id": 238, "enabled": 0},
                {"errorCode": 0, "name": "成人高考", "value": "030001", "children": [], "id": 251, "enabled": 0},
                {"errorCode": 0, "name": "远程学历", "value": "030002", "children": [], "id": 264, "enabled": 0}
            ], "id": 225, "enabled": 0},
            {"errorCode": 0, "name": "考研考博", "value": "0301", "children": [
                {"errorCode": 0, "name": "考研", "value": "030100", "children": [], "id": 239, "enabled": 0},
                {"errorCode": 0, "name": "法律硕士", "value": "030101", "children": [], "id": 252, "enabled": 0},
                {"errorCode": 0, "name": "MBA", "value": "030102", "children": [], "id": 265, "enabled": 0},
                {"errorCode": 0, "name": "MPA", "value": "030103", "children": [], "id": 275, "enabled": 0},
                {"errorCode": 0, "name": "MPAcc", "value": "030104", "children": [], "id": 285, "enabled": 0},
                {"errorCode": 0, "name": "MEM", "value": "030105", "children": [], "id": 294, "enabled": 0},
                {"errorCode": 0, "name": "法律博士", "value": "030106", "children": [], "id": 357, "enabled": 0}
            ], "id": 226, "enabled": 0}
        ], "id": 213, "enabled": 0}
    ]},
    testSchools: {"errorCode": 0, "start": 0, "count": 0, "total": 0, "data": [
        {"errorCode": 0, "name": "南京财经大学红山学院", "children": [], "id": 213, "enabled": 0, "locationId": 35},
        {"errorCode": 0, "name": "江苏农林职业技术学院", "children": [], "id": 214, "enabled": 0, "locationId": 35},
        {"errorCode": 0, "name": "江苏大学", "children": [], "id": 215, "enabled": 0, "locationId": 35},
        {"errorCode": 0, "name": "江苏大学京江学院", "children": [], "id": 216, "enabled": 0, "locationId": 35},
        {"errorCode": 0, "name": "江苏省司法警官高等职业学校", "children": [], "id": 217, "enabled": 0, "locationId": 35},
        {"errorCode": 0, "name": "江苏科技大学", "children": [], "id": 218, "enabled": 0, "locationId": 35},
        {"errorCode": 0, "name": "金山职业技术学院", "children": [], "id": 219, "enabled": 0, "locationId": 35},
        {"errorCode": 0, "name": "镇江高等专科学校", "children": [], "id": 220, "enabled": 0, "locationId": 35}
    ]},
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


testMockObj.testComments.add([
    testMockObj.testComment1,
    testMockObj.testComment2
]);
testMockObj.testComments.total = 13;

testMockObj.testCourses.add([
    testMockObj.testCourse1,
    testMockObj.testCourse2,
    testMockObj.testCourse3,
    testMockObj.testCourse4,
    testMockObj.testCourse5,
    testMockObj.testCourse6,
    testMockObj.testCourse7,
    testMockObj.testCourse8,
    testMockObj.testCourse9,
    testMockObj.testCourse10
]);
testMockObj.testAddressList.add([
    testMockObj.testAddress1,
    testMockObj.testAddress2,
    testMockObj.testAddress3
]);
testMockObj.testTuans.add([
    testMockObj.testTuan1,
    testMockObj.testTuan2
]);
testMockObj.testTuan1.set('course', testMockObj.testCourse1);
testMockObj.testTuan2.set('course', testMockObj.testCourse1);
testMockObj.testTuan1.set('addressList', testMockObj.testAddressList);
testMockObj.testTuan2.set('addressList', testMockObj.testAddressList);
testMockObj.testTuans.total = 29;
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

testMockObj.testPartners.add([testMockObj.testPartner1, testMockObj.testPartner2]);

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