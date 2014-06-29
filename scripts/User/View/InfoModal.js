var InfoModal = Backbone.View.extend({
	el:"#popup",
	template: _.template(tpl.get("infoModal")),
	initialize: function () {
		_.bindAll(this, "render", "setMessage", "show", "bindEvents", "close");
		this.isClosed = false;
		this.render();
		this.bindEvents();
	},
	render: function () {
		this.$el.append(this.template);
	},
	setMessage: function (message) {
		$("#popMessage").html(message);
		return this;
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