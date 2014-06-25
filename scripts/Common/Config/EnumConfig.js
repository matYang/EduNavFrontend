
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

    'TransactionType': {
        cashback: 0,
        deposit: 1,
        withdraw: 2,
        invitation: 3
    },

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

    'BookingStatusText': {
        0: '等待确认',
        1: '预订成功',
        2: '订单取消',
        3: '失败',
        4: '已送达机构',
        5: '爽约',
        6: '延迟报道',
        7: '完成报到',
        8: '完成交费',
        9: '中止交费',
        10: '已开学',
        11: '退学退费',
        12: '入学成功',
        13: '返利完结'
    },

    'BookingStatusUserText': {
        0: '等待确认',
        1: '预订成功',
        2: '已经取消',
        3: '拒绝订单',
        4: '预订成功',
        5: '爽约',
        6: '预订成功',
        7: '预订成功',
        8: '预订成功',
        9: '已经取消',
        10: '预订成功',
        11: '已经取消',
        12: '成功入学',
        13: '成功入学'
    },

    'BookingType': {
        offline: 0,
        online: 1
    },
        
    'ServiceFeeStatus': {
        shouldCharge: 0,
        hasCharged: 1,
        refundCharge: 2,
        noCharge: 3,
        consolidated: 4,
        naive: 5
    },

    'ServiceFeeStatusText': {
        0: '应收服务费',
        1: '已收服务费',
        2: '退换服务费',
        3: '无服务费',
        4: '服务费完结',
        5: '空'
    },

    'CommissionStatus': {
        shouldCharge: 0,
        hasCharged: 1,
        refundCharge: 2,
        noCharge: 3,
        consolidated: 4,
        naive: 5
    },

    'CommissionStatusText': {
        0: '应收佣金',
        1: '已收佣金',
        2: '退还佣金',
        3: '无佣金',
        4: '佣金完结',
        5: '空'
    },

    'Privilege': {
        root: 0,
        management: 1,
        routine: 2
    },

    'CourseStatus': {
        openEnroll: 0,
        deactivated: 1,
        consolidated: 2
    },

    'PartnerQualification': {
        verified: 0,
        unverified: 1
    }

};