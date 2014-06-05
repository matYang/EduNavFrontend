var AdminCourseView = BaseFormView.extend({
    el: "#courseCRUDContainer",
    fields: [],
    form: true,
    formElem: "adminCourseForm",
    submitButtonId: "coursePostSubmit",
    callback: "uploadTarget",
    initialize: function(params){
        debugger;
        _.bindAll(this, "render", "bindEvents", "close");
        BaseFormView.prototype.initialize.call(this);
        app.viewRegistration.register("adminCourse", this, true);
        params = params || {};
        var apis = new AdminApiResource();
        this.template = _.template(tpl.get("adminCourse"));
        this.action = apis.admin_course;
        this.newCourse = false;
        if (params.course) {
            this.render(params.course);
        } else if (params.courseId){
            app.generalManager.fetchCourse(params.courseId, {
                success: this.render,
                error: function() {
                    app.navigate("manage/course", true);
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
            $("#cancel").hide();
        } else {
            $("#adminCourseForm").find(".edit").hide();
            $("#adminCourseForm").find(".detail").show();
        }
        generalManager.getCategories(this);
        generalManager.getLocations(this);
        $("#searchResult").addClass("hidden");
        this.bindEvents();
    },

    bindEvents: function () {
        var that = this;
        BaseFormView.prototype.bindEvents.call(this);
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
        $("#cancel").on("click", function () {
            $("#adminCourseForm").find("input").val("");
            $("#adminCourseForm").find(".edit").hide();
            $("#adminCourseForm").find(".detail").show();   
        });
        $("#editCourse").on("click", function () {
            $("#adminCourseForm").find(".edit").show();
            $("#adminCourseForm").find(".detail").hide(); 
        });
        $("#deleteCourse").on("click", function() {
            
        });
        $("#select[name=category]").on("change", function() {
            var category = $(this).val();
            that.renderSubCategory(category);
        });
        $("#select[name=city]").on("change", function() {
            var city = $(this).val();
            that.renderDistrict(city);
        });
    },  
    successCallback: function () {
        app.navigate("manage/course", true);
    },
    
    renderCategories: function (list) {
        this.categories = list;
        var len = list.length, buf = [], obj;
        for ( var i = 0; i < len; i ++) {
            obj = this.categories[i];
            for ( var attr in obj ) {
                buf.push("<option value='" + attr + "'>" + attr + "</option>");
            }
        }
        $("select[name=category]").empty().append(buf.join());
    },
    renderSubCategories: function (category) {
        var subCategory = this.categories[category], len = subCategory.length, buf = [];
        for ( var i = 0; i < len; i ++) {
            buf.push("<option value='" + subCategory[i] + "'>" + subCategory[i] + "</option>");
        }
        $("select[name=subCategory]").empty().append(buf.join());
    },
    renderLocations: function (list) {
        this.locations = list;
        var len = list.length, buf = [], obj;
        for ( var i = 0; i < len; i ++) {
            obj = this.locations[i];
            for ( var attr in obj ) {
                buf.push("<option value='" + attr + "'>" + attr + "</option>");
            }
        }
        $("select[name=city]").empty().append(buf.join());
    },
    renderDistrict: function (city) {
        var districts = this.locations[city], len = districts.length, buf = [], obj;
        for ( var i = 0; i < len; i ++) {
            buf.push("<option value='" + districts[i] + "'>" + districts[i] + "</option>");
        }
        $("select[name=district]").empty().append(buf.join());
    },
    close: function () {
        if (!this.isClosed) {
            this.isClosed = false;
            this.$el.empty();
        }
    }
});