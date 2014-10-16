/**
 *   This is a special global object that will be instantiated only once, storing all constants
 */

var getEnvironmentServerOrigin = function () {
    var isOnLocal = C_ENV_VAR === 'LOCAL';

    return {
        'httpOrigin': isOnLocal ? 'http://114.215.181.254:8080/UserWeb' : '..',
        'env': isOnLocal
    };

};

var Constants = {


    origin: getEnvironmentServerOrigin().httpOrigin,
    isOnLocal: getEnvironmentServerOrigin().isOnLocal,

    miliSecInDay: 86400000,

    templateResources: [
        "topBar-loggedIn", "topBar-notLoggedIn",
        /*注册模块*/
        "registration", "registration_finish", "findPassword_1", "findPassword_2",

        /*首页推荐课程滚动图*/
        "homePic",

        /*对比页*/
        "compareView",

        /*课程搜索模块*/
        "home", "homeCategoryContainer", "homeButton", "homeCatButton",
        "search", "searchResultEntry", "search_noMessage",
        //地图上的自定义标签
        "mapLabel",
        "compareWidget", "courseDetailCompareWidget",
        "compareWidgetEntry",
        //人工选课
        "SearchCourse",
        //已筛选的条件 一二三级类目
        "req", "subCategoryContainer", "subSubCategoryContainer", "subSubCategory", "subCategory", "category",

        /*课程团购*/
        'tuan', 'tuanDetail',
        'tuanBanner', 'tuanResultEntry',
        //评论相关
        'tuanDetailCommentsContainer',
        'commentEntry',
        'commentForm',

        /*课程详情*/
        "courseDetail",
        "relatedCourseRow", "relatedCourseNoRow", "relatedCourseErrorRow",//相关课程
        /*新建订单*/
        "newBooking", "newBooking_price", "booking_submitted",

        /*个人中心模块*/
        "mypage_base", "mypage_dashboard",

        //我的订单
        //我的试听订单
        "booking_noMessage",
        "mypage_bookingList", "booking_entry",
        "mypage_bookingDetail", "mypage_bookingPay",
        "mypage_bookingDetailHistory", "mypage_bookingDetailFlow",
        //我的团购订单
        "mypage_groupBuyBookingList",
        "mypage_groupBuyBookingDetail",
        "groupBuyBooking_entry",

        //我的优惠券
        "mypage_coupons",
        "mypage_usableCouponRow", "mypage_couponUsable", "usable_coupon_noMessage",
        "mypage_gotCouponRow", "mypage_couponGot", "got_coupon_noMessage",

        //我的现金账户
        "mypage_cash",
        "mypage_accountIn", "mypage_accountInRow", "accountInNoMessage",
        "mypage_accountOut", "mypage_accountOutRow", "accountOutNoMessage",

        //我的积分
        "mypage_credit",
        "mypage_creditTable", "mypage_creditRow", "credit_noMessage",
        "mypage_creditStore",

        //个人资料
        "mypage_password", "mypage_setting", "mypage_share",

        //底部栏
        "aboutUs", "joinUs", "contactUs", "advise", "help",

        //其它
        'errorPay',//支付失败的帮助页面

        "sideBarView",//侧边工具栏
//        "banner",//首页的大屏滚动banner

        "infoModal",//信息提示 没有背景
        "popTip",//【首页】申请成功弹出窗 没有背景
        "colorInfoModal",//【首页】表单验证提示 没有背景

        //todo 使用Modal start
        "mypage_usernameModal", //设置用户名的弹出框
        "mypage_chooseSchoolModal", //设置毕业院校的弹出框
        "courseTip",//【首页】课程选择页面

        //todo 使用Modal end
        "courseTipModal",//【首页】课程选择页面
        "loginFastModal",//【课程详情|团购详情】快速登录
        "freeTrialModal",//【课程详情】免费试听弹出框
        "teacherModal",//【课程详情|团购详情】教师信息弹出框
        "payInfoModal",//【团购订单支付页面】支付结果用户确认--遇到问题或成功

        //todo 人工选课弹出框 暂未使用
        "artificialSelection"
    ],
    gender: {
        "male": 0,
        "female": 1,
        "both": 2
    },

    weekDayArray: ["日", "一", "二", "三", "四", "五", "六"],

    /*---------------  Personal view constants   --------------*/
    emailLink: {
        "qq.com": "mail.qq.com",
        "sina.com": "mail.sina.com",
        "163.com": "mail.163.com",
        "126.com": "mail.126.com",
        "sohu.com": "mail.sohu.com",
        "yahoo.com.cn": "mail.yahoo.com.cn",
        "yahoo.com": "mail.yahoo.com",
        "live.com": "mail.live.com",
        "live.cn": "mail.live.com"
    },
    categoryRowLength: 8,//首页目录每行的列数
    voidFunction: function () {

    }
};