var InfoModal = Backbone.View.extend({
	el:"#popup",
	isClosed: false,
	initialize: function () {
		_.bindAll(this, "render", "setMessage", "show", "bindEvents", "close");
		this.template = _.template(tpl.get("infoModal"));
		this.render();
		this.bindEvents();
	},
	render: function () {
		this.$el.append(this.template);
	},
	setMessage: function (message) {
		$("#popMessage").html(message);
	},
	show: function () {
		this.$el.removeClass("hidden");
		$("#overlay").removeClass("hidden");	
	},
	bindEvents: function () {
		var that = this;
		$("#gotIt").on("click", function () {
			that.$el.addClass("hidden");
			$("#overlay").addClass("hidden");
		}); 
	},
	close: function () {
		if (!this.isClosed) {
			this.isClosed = true;
			this.$el.empty();
		}
	}
});