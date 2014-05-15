var PersonalHistoryView = Backbone.View.extend({
	el: "#profilePage_content",
	initialize: function(params){
		_.bindAll(this, 'renderTransactions', 'openTransactionDetail', 'close');
		this.isClosed = false;

		this.wrapperTemplate = _.template(tpl.get('personalHistory'));
		this.transactionTemplate = _.template(tpl.get('personalTransactionHistory'));
		//this is reserved for notification construction
		this.curUserId = params.intendedUserId;
		this.user = app.sessionManager.getSessionUser();
		this.transactionLookup = {};
		this.$el.append(this.wrapperTemplate);

		app.userManager.fetchTransactionList(this.curUserId, {"success":this.renderTransactions, "error":this.renderTransactionError});
	},

	renderTransactions: function(transactionList){
		this.transactionView = new TransactionHistoryView(transactionList);
	},
	renderTransactionError: function(){

	},
	openTransactionDetail: function(transaction, user){
		this.transactionDetailView = new TransactionDetailView(transaction, this.user, "personal/history");
	},

	close: function(){
		if (!this.isClosed){
			//TODO: unbind all events
			$("#transactionHistoryContent>.personal_transactionHistory_message").off();
			this.$el.empty();
			this.isClosed = true;
		}
	}


});