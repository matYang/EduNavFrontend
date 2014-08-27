
var EnumConfig = {

    'Status': {
        activated: 0,
        deactivated: 1,
        deleted: 2
    },

    'ModuleIdentifier':{
        user: 0,
        partner: 1,
        admin: 2
    },

    'CreditStatus': {
        usable: 0,
        expired: 1,
        used: 2
    },

    //现金券状态取值
    'CouponStatus': {
        usable: 0,//可使用的
        expired: 1,//已过期的
        used: 2,//已使用的
        inactive: 3//
    },
    //现金券的状态显示
    'CouponStatusText': {
        0:'可使用',
        1:'已过期',
        2:'已使用'
    },
    /*用户对订单可执行的操作*/
    'BookingActionText':{
        onlineCancel:'取消订单',
        offlineCancel:'取消订单',
        offlineUserDelay:'推迟报道'
    },

    /*订单状态 from 'BookingStatusUserText' to now*/
    "BookingStatusText": {
        //线下支付的状态
        0: '预订成功',
        1: '拒绝',
        2: '已取消',
        3: '机构已确认',
        4: '推迟报道',
        5: '爽约',
        6: '完成报道',
        7: '已交学费',
        8: '已开学',
        9: '已退学',
        10: '入学成功',

        //在线支付的状态
        11: '待支付',
        12: '已取消',
        13: '支付成功',
        14: '应退费',
        15: '已退款',
        16: '机构已确认',
        17: '已开学',
        18: '入学成功',
        19: '已获返利',
        20: '支付过期',
        21: '支付成功',
        22: '终止交费',
        23: '已获返利'
    },

    "PayType": {
        offline: 1,
        online: 0
    },
    'BookingTypeText': {
        0: "在线支付",
        1: "线下支付"
    },

    'Privilege': {
        root: 0,
        management: 1,
        routine: 2
    },

    /*课程状态*/
    'CourseStatus': {
        onlined: 2 //已上线
    },

    'PartnerQualification': {
        verified: 0,
        unverified: 1
    },

    'WeekText':['星期一','星期二','星期三','星期四','星期五','星期六','星期日'],

    'BookingHistoryText':{
        0:'您提交了订单，请您在30分钟内完成支付，过时系统将自动取消',
        2:'您提交了订单，请等待系统审核',
        5:'您的订单已被学校确认，将有资深课程顾问与您联系',
        9:'已通知学校询问您的入学状态',
        10:'入学成功，期待您学有所成',
        11:'您的订单已被学校确认，将有资深课程顾问与您联系',

        16:'您的学费已经支付成功；请关注开课日期，以免错过课程',
        19:'已通知学校询问您的入学状态，并确认是否可以获得返现',
        20:'学校已确认您已完成课程学习；您的返现可以使用',
        23:'您已成功获得了返利'
    }

};