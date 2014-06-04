var AdminPartnerView = BaseFormView.extend({
	el: "#partnerCRUDContainer",
    fields: [],
    formElem: "adminPartnerForm",
    submitButtonId: "partnerPostSubmit",
    callback: "uploadTarget",
    initialize: function(params){
        _.bindAll(this, "render", "bindEvents", "close");
        BaseFormView.prototype.initialize.call(this);
        app.viewRegistration.register("adminPartner", this, true);
        params = params || {};
        var apis = new AdminApiResource();
        this.template = _.template(tpl.get("adminPartner"));
        this.action = apis.admin_course;
        this.newCourse = false;
        if (params.course) {
            this.render(params.course);
        } else if (params.courseId){
            app.generalManager.fetchCourse(params.courseId, {
                success: this.render,
                error: function() {
                    app.navigate("manage", true);
                }
            });
        } else {
            //Create new course
            this.newCourse = true;
            this.course = new Course();
            this.render(this.course);
        }
        
    },

    render: function (course) {
        this.course = course;
        this.$el.append(this.template(course.toJSON()));
        if (this.newCourse) {
            $("#adminCourseForm").find(".detail").hide();
            $("#adminCourseForm").find(".edit").show();
        } else {
            $("#adminCourseForm").find(".edit").hide();
            $("#adminCourseForm").find(".detail").show();
        }
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
            
        });
    },  
    successCallback: function () {
        app.navigate("manage/course", true);
    },
    callback: function(){

    },
    close: function () {
        if (!this.isClosed) {
            this.isClosed = false;
            this.$el.empty();
        }
    }
});