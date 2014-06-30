/**
 *   This is a special global object that will be instantiated only once, storing all constants
 */

var getEnvironmentServerOrigin = function () {
    var isOnLocal = C_ENV_VAR !== 'REMOTE';
    return {
        'httpOrigin': isOnLocal ? 'http://usertest.ishangke.cn/' : '..',
        'adminOrigin': isOnLocal ? 'http://localhost:8017' : '..',
        'env': isOnLocal
    };

};

var Constants = {


    origin: getEnvironmentServerOrigin().httpOrigin,
    adminOrigin: getEnvironmentServerOrigin().adminOrigin,
    isOnLocal: getEnvironmentServerOrigin().isOnLocal,

    miliSecInDay: 86400000,

    templateResources: [
        "topBar-loggedIn", "topBar-notLoggedIn", 
        "registration", "registration_finish", "findPassword_1", "findPassword_2",
        "front", "frontCategoryContainer", "search", "searchResultEntry", "courseDetail", "newBooking", "booking_submitted", "search_noMessage",
        "frontButton", "frontCatButton",
        "req", "subCategoryContainer", "subSubCategoryContainer", "subSubCategory", "subCategory", "category",
        "mypage_base", "mypage_dashboard", "mypage_bookingList", "mypage_bookingDetail", "booking_entry", "booking_noMessage",
        "mypage_coupons", "mypage_unclaimedCouponRow", "mypage_claimedCouponRow", "mypage_couponClaimed", "mypage_couponUnclaimed", "claimed_coupon_noMessage", "unclaimed_coupon_noMessage",
        "mypage_credit", "mypage_creditTable", "mypage_creditRow", "mypage_creditStore", "credit_noMessage",
        "mypage_password", "mypage_setting",
        "compareWidget", "compareWidgetEntry", "compareView", "courseDetailCompareWidget",
        "infoModal", "banner"
    ],

    partnerTemplateResource: [
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
    categoryClassMapper: {
        "语言培训":"language",
        "学历文凭":"master",
        "财会·金融":"f_and_e",
        "资格认证":"attestation"
    },
    categoryRowMapper: {
        "语言培训":10,
        "学历文凭":10,
        "财会·金融":5,
        "资格认证":5
    },
    voidFunction: function(){
        
    }
};
