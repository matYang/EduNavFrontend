var User = Backbone.Model.extend({
    //TODO fill in Constants with enum int mapping
    defaults: function () {
        return {
            'id': -1,
            'userId': -1,

            'avatarUrl': undefined,
            'name': undefined,//真实姓名
            'phone': undefined,
            'password': undefined,
            'email': undefined,
            'schoolId': undefined,
            'schoolName': undefined,
            'gender': undefined,
            'invitationCode': undefined,
            'appliedInvitationCode': undefined,

            'createTime': undefined,
            'lastLogin': undefined,
            'lastModifyTime': undefined,

            'account': new Account(),//现金账户
            'credit': new Credit(),//积分
            'couponTotal': 0 //优惠券
        };
    },

    idAttribute: 'id',

    urlRoot: Constants.origin + '/api/v1.0/user/user',

    initialize: function (urlRootOverride) {
        _.bindAll(this, 'overrideUrl', 'isNew', 'parse', '_toJSON', 'toJSON');
        if (typeof urlRootOverride !== 'undefined') {
            this.urlRoot = urlRootOverride;
        }
    },
    overrideUrl: function (urlRootOverride) {
        if (typeof urlRootOverride !== 'undefined') {
            this.urlRoot = urlRootOverride;
        }
    },

    isNew: function () {
        return this.id === -1;
    },

    parse: function (data) {
        if (typeof data !== 'undefined') {
            if (data instanceof Array) {
                data = data[0];
            }
            data.id = Utilities.parseNum(data.id);
            data.userId = data.id;

            data.gender = Utilities.parseNum(data.gender);
            data.schoolId = Utilities.parseNum(data.schoolId);

            data.createTime = Utilities.castFromAPIFormat(data.createTime);
            data.lastLogin = Utilities.castFromAPIFormat(data.lastLogin);
            data.lastModifyTime = Utilities.castFromAPIFormat(data.lastModifyTime);

            data.couponTotal = Utilities.parseNum(data.couponTotal);
            data.account = new Account(data.account,{parse:true});
            data.credit = new Credit(data.credit,{parse:true});
        }
        return data;
    },

    _toJSON: function () {
        var json = _.clone(this.attributes);
//        if(typeof json.couponTotal)json.couponTotal = json.couponTotal.toFixed(0);
        json.createTime = Utilities.getDateString(this.get('createTime'));
        json.lastLogin = Utilities.getDateString(this.get('lastLogin'));
        json.lastModifyTime = Utilities.getDateString(this.get('lastModifyTime'));
        json.account = json.account._toJSON();
        json.credit = json.credit._toJSON();
        return json;
    },

    toJSON: function () {
        //user向服务器发送请求时 主要用于更新用户信息 只需要以下几个参数
        var json = _.clone(this.attributes);
        var user = {};
        user.id = json.id;
        user.avatarUrl = json.avatarUrl;
        user.name = json.name;
        user.email = json.email;
        user.gender = json.gender;
        user.schoolId = json.schoolId;
        user.invitationCode = json.invitationCode;
        return user;
    }

});