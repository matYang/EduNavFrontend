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

        /*对比页*/
        "compareView",

        /*课程搜索模块*/
        "front", "frontCategoryContainer","frontButton", "frontCatButton",
        "search", "searchResultEntry",  "search_noMessage",
        "mapLabel","compareWidget", "courseDetailCompareWidget",  "compareWidgetEntry",
        //已筛选的条件 一二三级类目
        "req","subCategoryContainer", "subSubCategoryContainer", "subSubCategory", "subCategory", "category",

        /*课程详情和新建订单*/
        "courseDetail",
        "relatedCourseRow","relatedCourseNoRow","relatedCourseErrorRow",//相关课程
        "newBooking", "booking_submitted",

        /*个人中心模块*/
        "mypage_base", "mypage_dashboard",

        //我的订单
        "mypage_bookingList","booking_entry", "booking_noMessage",
        "mypage_bookingDetail","mypage_bookingPay",
        "mypage_bookingDetailHistory",

        //我的优惠券
        "mypage_coupons",
        "mypage_usableCouponRow", "mypage_couponUsable", "usable_coupon_noMessage",
        "mypage_gotCouponRow", "mypage_couponGot", "got_coupon_noMessage",
        //我的现金账户
        "mypage_cash",
        //我的积分
        "mypage_credit", "mypage_creditTable", "mypage_creditRow", "mypage_creditStore", "credit_noMessage",
        //个人资料
        "mypage_password", "mypage_setting", "mypage_share",


        //底部栏
        "aboutUs", "joinUs", "contactUs", "advise", "help",

        //其它
        "infoModal", "banner"

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
    categoryRowMapper: [10, 10, 5, 5],
    voidFunction: function () {

    }
};
