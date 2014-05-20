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

    //all console logs/warns should use these methods to help IE compatability
    dLog: function (message) {
        Info.log(message);
    },

    dWarn: function (err) {
        Info.warn(err);
    },

    origin: getEnvironmentServerOrigin().httpOrigin,
    socketOrigin: getEnvironmentServerOrigin().socketOrigin,
    isOnLocal: getEnvironmentServerOrigin().isOnLocal,

    miliSecInDay: 86400000,

    templateResources: [
    ],
    partnerTemplateResource: [
    ],

    gender: {
        "male": 0,
        "female": 1,
        "both": 2
    },

    genderLookup: ["male", "female", "both"],

    paymentMethod: {
        "offline": 0,
        "paypal": 1,
        "all": 2
    },

    transactionState: {
        'init': 0,
        'cancelled': 1,
        'aboutToStart': 2,
        'finished': 3,
        'underInvestigation': 4,
        'invalid': 5
    },

    transactionStateChangeAction: {
        'init': 0,
        'cancel': 1,
        'report': 2,
        'evaluate': 3
    },

    transactionType: {
        'departure': 0,
        'arrival': 1
    },

    stateText: ["待确认", "已确认", "已拒绝", "即将开始", "已取消", "已评分", "审理中", "未评分", "卖方评分", "买方评分", "完成"],

    userState: {
        "normal": 0,
        "invalid": -1
    },

    userSearchState: {
        "universityAsk": 0,
        "universityHelp": 1,
        "regionAsk": 2,
        "regionHelp": 3,
        "universityGroupAsk": 4,
        "universityGroupHelp": 5
    },

    messageState: {
        "open": 2,
        "closed": 1,
        "deleted": 0
    },

    DayTimeSlot: {
        'n0': 0,
        'n1': 1,
        'n2': 2,
        'n3': 3,
        'n4': 4,
        'n5': 5,
        'n6': 6,
        'n7': 7,
        'n8': 8,
        'n9': 9,
        'n10': 10,
        'n11': 11,
        'n12': 12,
        'n13': 13,
        'n14': 14,
        'n15': 15,
        'n16': 16,
        'n17': 17,
        'n18': 18,
        'n19': 19,
        'n20': 20,
        'n21': 21,
        'n22': 22,
        'n23': 23
    },

    weekDayArray: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],

    /*---------------  Personal view constants   --------------*/
    personalTemplateMapping: {
        'personalUtility': 'personalPage/personalUtility'
    },
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
