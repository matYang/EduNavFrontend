var AdminCourseView = BaseFormView.extend({
    el: "#main_content",
    fields: [],
    formElem: "adminCourseForm",
    action: this.action,
    callback: 'uploadTarget',
    
    submitButtonId: "coursePostSubmit",
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
        this.$el.append(this.template(course.toJSON())));
        $("#adminCourseForm").find("edit").hide();
        $("#adminCourseForm").find("detail").show();
        this.bindEvents();
    },
    bindEvents: function () {
        var that = this;
        $("#createSimilarCourse").on("click", function() {
            $("#adminCourseForm").find("edit").show();
            $("#adminCourseForm").find("detail").hide();
            var json = that.course.toJSON();
            for (var attr in json) {
                var $edit = $("input[name="+attr+"]");
                if ($edit.attr("type") === "checkbox") {
                    $edit.prop("checked", json[attr]);
                }
                $edit.val(json[attr]);
            }
        });
        $("#deleteCourse").on("click", function() {
            that.course.
        });
    },  
    successCallback: function () {
        app.navigate("manage/course", true);
    },
    close: function () {
        if (!this.isClosed) {
            this.isClosed = false;
        }
    }
});