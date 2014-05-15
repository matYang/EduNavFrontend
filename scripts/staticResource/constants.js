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
    /* ---------  DM Modules  ----------*/
    "DetailMessage", "Publish_singleSlotAsk", "Publish_base", "Publish_step1", "Publish_step2", "Publish_step3", "SimpleMessage", "Edit", "Transaction", "findUserEntry",

    /*----------- dropdowns  ----------*/
    "notificationDropdown", "letterDropdown", "favoriteDropdown",

    /*-----------  modals  ---------*/
    "genderEditWindow", "hourRateEditWindow", "locationEditWindow", "timeDateEditWindow", "transactionDetail", "messageCancel", "locationPicker",

    /*-----------  person pages  -----------*/
    "personal", "personalWatch", "personalMessage", "personalHistory", "personalNotificationEntry", "personalUtility", "personalSocial", "personalSocialCard", "personalSimpleUser", "personalTransactionHistory", "personalNotificationHistory", "personalNotificationEntry",

    /*-----------  Registration  -----------*/
    "registration", "registration_finish", "findPassword_1", "findPassword_2", "findPassword_3",

    /*-----------  topBar  ------------*/
    "topBar-loggedIn", "topBar-notLoggedIn",

    /*-----------  letter -------------*/
    "letter",
    
    /*-----------  How It Works -------------*/
    "howItWorks_base", "howItWorks_driver", "howItWorks_passenger", 

    /*-----------  About us/service -----------*/
    "serviceCenter_base", "serviceCenter_aboutUs", "serviceCenter_feedback", "serviceCenter_terms", "serviceCenter_terms_zh", "serviceCenter_terms_en", "serviceCenter_faq", "serviceCenter_career", 

    /*-----------  IdentityVerification -----------*/
    "passengerIdentity_form", "passengerIdentity_landing", "driverIdentity_form", "driverIdentity_landing",

    /*-----------  top level moduels  ----------*/
    "tadv", "front", "main", "userSearch"],

    messageType: {
        "ask": 0,
        "help": 1,
        "both": 2
    },

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

    notificationState: {
        'unread': 0,
        'read': 1
    },

    notificationEvent: {
        'transactionInit': 0,
        'transactionCancelled': 1,
        'transactionAboutToStart': 2,
        'transactionEvaluated': 3,
        'tranasctionUnderInvestigation': 4,
        'transactionReleased': 5,
        'watched': 6
    },

    notificationStateChangeAction: {
        'check': 0,
        'delete': 1
    },

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

    LetterType: {
        'user': 0,
        'system': 1
    },

    LetterState: {
        'unread': 0,
        'read': 1,
        'invalid': 2
    },

    LetterDirection: {
        'inbound': 0,
        'outbound': 1,
        'both': 2
    },

    LocationDirection: {
        'from': 0,
        'to': 1
    },

    LicenseType: {
        "idCard": 0,
        "driverLisence_a": 1,
        "driverLisence_b": 2,
        "driverLisence_c": 3
    },


    VerificationType: {
        "driver": 0,
        "passenger": 1
    },
    
    VerificationState: {
        "pending": 0,
        "rejected": 1,
        "verified": 2,
        "expired": 3
    },

    PassengerVerificationOrigin: {
        "passenger": 0,
        "driver": 1
    },
    

    weekDayArray: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],

    /*---------------  Personal view constants   --------------*/
    personalTemplateMapping: {
        'personalHistory': 'personalPage/personalHistory',
        'persoanlMessage': 'personalPage/personalMessage',
        'personalSocial': 'personalPage/personalSocial',
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
    },
    getDefaultUserLocation: function () {
        return new UserLocation();
    },


};
