var AdminCourseView = BaseFormView.extend({
	el: "#main_content",
	initialize: function(params){
		_.bindAll(this, "render", "bindEvents", "close");
		this.isClosed = false;
		this.template = _.template(tpl.get("adminCourseView"));
		if (params.course) {
			this.render(params.course);
		} else {
			app.generalManager.fetchCourse(params.courseId, {
				success: this.render,
				error: function() {
					app.navigate("manage", true);
				}
			});
		}
		
	},

	render: function (course) {
		this.course = course;
		this.$el.append(this.template(course)));
		this.bindEvents();	
	},
	bindEvents: function () {

	},
	close: function () {
		if (!this.isClosed) {
			this.isClosed = false;
		}
	}
});