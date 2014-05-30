var AdminUserView = var Backbone.View.extend({
	el:"#main_content",
	initialize: function (params) {
		this.isClosed = false;
		app.viewRegistration.register("adminUser", this, true);
		this.template = _.template(tpl.get("adminUser"));
		if (!params.user) {
			this.userId = params.userId;
			var that = this;
			app.adminManager.fetchUser(this.userId, {
				success: this.render,
				error: function () {
				}
			});
		} else {
			this.user = params.user;
		}
	},
	render: function (user) {
		this.$el.append(this.template(user.toJSON()));
		this.couponsView = new Multi
		this.bindEvents();
	},
	bindEvents: function () {
		$("#editUser").on("click", function () {
			
		});
		$("#viewUser").on("click", function () {

		});
	},
	cloes: function() {
		if (!this.isClosed) {
			this.isClosed = true;
			this.$el.empty();
		}
	}
});