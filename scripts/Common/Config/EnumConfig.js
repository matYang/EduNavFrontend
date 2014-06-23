
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
        enter: 3,
        finished: 4,
        failed: 5,
        quit: 6,
        delivered: 7,
        consolidated: 8
    },

    'BookingStatusText': {
        0: "等待确认",
        1: "机构确认",
        2: "已取消",
        3: "成功入学",
        4: "完成交易",
        5: "订单失败",
        6: "退学",
        7: "delivered",
        8: "内部结算"
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