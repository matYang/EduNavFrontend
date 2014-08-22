
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

//    'CreditStatus': {
//        usable: 0,
//        expired: 1,
//        used: 2
//    },

    //现金券状态取值
    'CouponStatus': {
        usable: 0,
        expired: 1,
        used: 2,
        inactive: 3
    },
    //现金券的状态显示
    'CouponStatusText': {
        0:'',
        1:'',
        2:''
    },
    'CouponOrigin': {
        registration: 0,
        invitation: 1,
        admin: 2
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
        onlined: 2, //已上线
        offlined: 3,//已下线
        deactivated: 1,//
        consolidated: 2
    },

    'PartnerQualification': {
        verified: 0,
        unverified: 1
    },

    'WeekText':['星期一','星期二','星期三','星期四','星期五','星期六','星期日']

};