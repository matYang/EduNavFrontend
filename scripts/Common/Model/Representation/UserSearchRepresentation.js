var UserSearchRepresentation = Backbone.Model.extend({

    defaults: function () {
        return {
            'userId': undefined,
            'name': undefined,
            'phone': undefined,
            'email': undefined,
            'status': undefined,
            'creationTime': undefined,

            'startBalance': undefined,
            'finishBalance': undefined,
            'startCoupon': undefined,
            'finishCoupon': undefined,
            'startCredit': undefined,
            'finishCredit': undefined,

            'invitationalCode': undefined,
            'appliedInvitationalCode': undefined,
            'accountNumber': undefined

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
        queryObj.creationTime = typeof this.get('creationTime') === 'undefined' ? undefined : Utilities.castToRepresentationFormat(this.get('creationTime'));

        queryObj.startBalance = this.get('startBalance');
        queryObj.finishBalance = this.get('finishBalance');
        queryObj.startCoupon = this.get('startCoupon');
        queryObj.finishCoupon = this.get('finishCoupon');
        queryObj.startCredit = this.get('startCredit');
        queryObj.finishCredit = this.get('finishCredit');

        queryObj.invitationalCode = typeof this.get('invitationalCode') === 'undefined' ? undefined : encodeURI(this.get('invitationalCode'));
        queryObj.appliedInvitationalCode = typeof this.get('appliedInvitationalCode') === 'undefined' ? undefined : encodeURI(this.get('appliedInvitationalCode'));
        queryObj.accountNumber = typeof this.get('accountNumber') === 'undefined' ? undefined : encodeURI(this.get('accountNumber'));

        return queryObj;
    }

});