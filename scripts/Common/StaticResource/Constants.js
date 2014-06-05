/**
 *   This is a special global object that will be instantiated only once, storing all constants
 */

var getEnvironmentServerOrigin = function () {
    var isOnLocal = C_ENV_VAR !== 'REMOTE';
    return {
        'httpOrigin': isOnLocal ? 'http://localhost:8015' : '..',
        'socketOrigin': isOnLocal ? 'http://localhost:3000' : 'https://www.routea.ca:3000',
        'env': isOnLocal
    };

};

var Constants = {


    origin: getEnvironmentServerOrigin().httpOrigin,
    socketOrigin: getEnvironmentServerOrigin().socketOrigin,
    isOnLocal: getEnvironmentServerOrigin().isOnLocal,

    miliSecInDay: 86400000,

    templateResources: [
        "topBar-loggedIn", "topBar-notLoggedIn", 
        "front", "search","registration", "registration_finish",
        "mypage_base", "mypage_dashboard",
        "compareWidget", "compareWidgetEntry"
    ],

    partnerTemplateResource: [
    ],

    gender: {
        "male": 0,
        "female": 1,
        "both": 2
    },

    weekDayArray: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],

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
    }
};
