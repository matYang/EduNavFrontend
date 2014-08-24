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

        "registration", "registration_finish", "findPassword_1", "findPassword_2",

        "front", "frontCategoryContainer", "search", "searchResultEntry", "courseDetail", "newBooking", "booking_submitted", "search_noMessage",
        "frontButton", "frontCatButton",
        "req", "subCategoryContainer", "subSubCategoryContainer", "subSubCategory", "subCategory", "category",

        "mypage_base", "mypage_dashboard", "mypage_bookingList", "mypage_bookingDetail", "booking_entry", "booking_noMessage","mypage_bookingPay",

        "mypage_coupons", "mypage_unclaimedCouponRow", "mypage_claimedCouponRow", "mypage_couponClaimed", "mypage_couponExpired", "claimed_coupon_noMessage", "expired_coupon_noMessage",
        "mypage_usedCouponRow", "mypage_couponUsed", "used_coupon_noMessage",

        "mypage_credit", "mypage_creditTable", "mypage_creditRow", "mypage_creditStore", "credit_noMessage",
        "mypage_cash",

        "mypage_password", "mypage_setting", "mypage_share",

        "compareWidget", "compareWidgetEntry", "compareView", "courseDetailCompareWidget", "mapLabel",
        "infoModal", "banner",
        "aboutUs", "joinUs", "contactUs", "advise", "help"
    ],
    gender: {
        "male": 0,
        "female": 1,
        "both": 2
    },

    weekDayArray: ["日", "一", "二", "三", "四", "五", "六"],

    /*---------------  Personal view constants   --------------*/
    emailLink: {
        "qq.com":"mail.qq.com",
        "sina.com":"mail.sina.com",
        "163.com":"mail.163.com",
        "126.com":"mail.126.com",
        "sohu.com":"mail.sohu.com",
        "yahoo.com.cn":"mail.yahoo.com.cn",
        "yahoo.com":"mail.yahoo.com",
        "live.com":"mail.live.com",
        "live.cn":"mail.live.com"
    },
    categoryRowMapper: [10,10,5,5],
    voidFunction: function(){
        
    }
};
