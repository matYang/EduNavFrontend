var AdminUserCouponView = MultiPageView.extend({
	initialize: function(messages) {
		this.messages = messages;
        this.allMessages = messages;
        this.entryTemplate = _.template(tpl.get('adminUserCouponRow'));
        this.pageNumberClass = "searchResultPageNumber";
        this.pageNumberId = "searchResultPageNumber";
        this.pageNavigator = "couponNavigator";
        this.pageNavigatorClass = "page clearfix";
        this.user = app.sessionManager.sessionModel;
        this.entryHeight = 40;
        this.pageEntryNumber = 10;
        this.entryClass = "userCoupon";
        this.entryContainer = "adminUserCouponsContainer";
        this.$domContainer = $("#adminUserCouponsContainer");
        this.isClosed = false;
        this.pnc = true;
        this.render();
	},
	render: function () {
		MultiPageView.prototype.render.call(this);
	},

	close: function () {
		if (!this.isClosed){
			this.isClosed = true;
			this.$domContainer.empty();
		}
	}

});