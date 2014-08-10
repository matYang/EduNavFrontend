
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

    'CouponStatus': {
        usable: 0,
        expired: 1,
        used: 2,
        inactive: 3
    },

    'CouponOrigin': {
        registration: 0,
        invitation: 1,
        admin: 2
    },
    /*todo 订单的状态信息*/
    'BookingStatus': {
        awaiting: 0,
        confirmed: 1,
        cancelled: 2,
        failed: 3,
        delivered: 4,
        noShow: 5,
        late: 6,
        registered: 7,
        paid: 8,
        noPay: 9,
        started: 10,
        refunded: 11,
        succeeded: 12,
        consolidated: 13
    },
//
//    'BookingStatusText': {
//        0: '等待确认',
//        1: '预订成功',
//        2: '订单取消',
//        3: '失败',
//        4: '已送达机构',
//        5: '爽约',
//        6: '延迟报道',
//        7: '完成报到',
//        8: '完成交费',
//        9: '中止交费',
//        10: '已开学',
//        11: '退学退费',
//        12: '入学成功',
//        13: '返利完结'
//    },
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

        //线上支付的状态
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


//        0: '等待确认',
//        1: '预订成功',
//        2: '已经取消',
//        3: '拒绝订单',
//        4: '预订成功',
//        5: '爽约',
//        6: '预订成功',
//        7: '预订成功',
//        8: '预订成功',
//        9: '已经取消',
//        10: '预订成功',
//        11: '已经取消',
//        12: '成功入学',
//        13: '成功入学'
    },

    "PayType": {
        offline: 1,
        online: 0
    },
    'BookingTypeText': {
        0: "线上支付",
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
    }

};