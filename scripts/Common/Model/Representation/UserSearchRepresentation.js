var UserSearchRepresentation = Backbone.Model.extend({

    defaults: function () {
        return {
            'userId': undefined,
            'name': undefined,
            'phone': undefined,
            'email': undefined,
            'status': undefined,

            'startBalance': undefined,
            'finishBalance': undefined,
            'startCoupon': undefined,
            'finishCoupon': undefined,
            'startCredit': undefined,
            'finishCredit': undefined,

            'invitationCode': undefined,
            'appliedInvitationCode': undefined,
            'accountNumber': undefined,

            'startcreateTime': undefined,
            'finishcreateTime': undefined

        };
    },

    initialize: function () {
        _.bindAll(this, 'toQueryString', 'castFromQuery', 'toJSON');
    },

    toQueryString: function () {
        var queryArr = [];
        var queryObj = this.toJSON();

        for (var property in queryObj) {
            if (queryObj.hasOwnProperty(property) && typeof queryObj[property] !== 'undefined') {
                queryArr.push(property + '=' + queryObj[property]);
            }
        }

        return queryArr.join('&');
    },

    castFromQuery: function (queryObj) {
        for (var property in queryObj) {
            if (queryObj.hasOwnProperty(property) && typeof queryObj[property] !== 'undefined') {
                this.set(property, decodeURI(queryObj[property]));
            }
        }
    },

    toJSON: function(){
        var queryObj = {};

        queryObj.userId = this.get('userId');
        queryObj.name = typeof this.get('name') === 'undefined' ? undefined : encodeURI(this.get('name'));
        queryObj.phone = typeof this.get('phone') === 'undefined' ? undefined : encodeURI(this.get('phone'));
        queryObj.email = typeof this.get('email') === 'undefined' ? undefined : encodeURI(this.get('email'));
        queryObj.status = this.get('status');
        queryObj.startcreateTime = typeof this.get('startcreateTime') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('startcreateTime'));
        queryObj.finishcreateTime = typeof this.get('finishcreateTime') === 'undefined' ? undefined : Utilities.castToAPIFormat(this.get('finishcreateTime'));

        queryObj.startBalance = this.get('startBalance');
        queryObj.finishBalance = this.get('finishBalance');
        queryObj.startCoupon = this.get('startCoupon');
        queryObj.finishCoupon = this.get('finishCoupon');
        queryObj.startCredit = this.get('startCredit');
        queryObj.finishCredit = this.get('finishCredit');

        queryObj.invitationCode = typeof this.get('invitationCode') === 'undefined' ? undefined : encodeURI(this.get('invitationCode'));
        queryObj.appliedInvitationCode = typeof this.get('appliedInvitationCode') === 'undefined' ? undefined : encodeURI(this.get('appliedInvitationCode'));
        queryObj.accountNumber = typeof this.get('accountNumber') === 'undefined' ? undefined : encodeURI(this.get('accountNumber'));

        return queryObj;
    }

});