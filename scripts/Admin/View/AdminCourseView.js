var AdminCourseView = BaseFormView.extend({
    el: "#courseCRUDContainer",
    fields: [],
    form: true,
    formElem: "adminCourseForm",
    submitButtonId: "coursePostSubmit",
    callback: "uploadTarget",
    initialize: function(params){
        _.bindAll(this, "render", "bindEvents", "renderCategories", "renderSubCategories", "renderThirdCategories", "close");
        BaseFormView.prototype.initialize.call(this);
        app.viewRegistration.register(this);
        params = params || {};
        var apis = new AdminApiResource();
        this.template = _.template(tpl.get("adminCourse"));
        this.action = apis.admin_course;
        this.newCourse = false;
        this.fields = [
             new BaseField({
                name: "教室照片1",
                fieldId: "classImg1",
                type: "file",
                mandatory: true,
                previewId: "preview1"
            }), 
            new BaseField({
                name: "教室照片2",
                fieldId: "classImg2",
                type: "file",
                mandatory: true,
                previewId: "preview2"
            }),
            new BaseField({
                name: "教室照片3",
                fieldId: "classImg3",
                type: "file",
                mandatory: true,
                previewId: "preview3"
            }),
            new BaseField({
                name: "教室照片4",
                fieldId: "classImg4",
                type: "file",
                mandatory: true,
                previewId: "preview4"
            }),
            new BaseField({
                name: "教室照片5",
                fieldId: "classImg5",
                type: "file",
                mandatory: true,
                previewId: "preview5"
            }),
        ];
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
        app.generalManager.getCategories(this);
        app.generalManager.getLocations(this);
        $("#adminCourseForm").children("div:even").css("background-color","#f0f0f0");
        $("#searchResult").addClass("hidden");
        this.bindEvents();
    },

    bindEvents: function () {
        var that = this;
        BaseFormView.prototype.bindEvents.call(this);
        $("#createSimilarCourse").on("click", function() {
            $("#adminCourseForm").find(".edit").show();
            $("#adminCourseForm").find(".detail").hide();
            var json = that.course.toJSON();
            for (var attr in json) {
                var $edit = $("[name="+attr+"]");
                if ($edit.attr("type") === "checkbox") {
                    $edit.prop("checked", json[attr]);
                } else if ($edit.prop("tagName") === "TEXTAREA") {
                    $edit.html(json[attr]);
                } else {
                    $edit.val(json[attr]);
                }
            }
        });
        $("#cancel").on("click", function () {
            $("#adminCourseForm").find(".edit").hide();
            $("#adminCourseForm").find(".detail").show();   
        });
        $("#editCourse").on("click", function () {
            $("#adminCourseForm").find(".edit").show();
            $("#adminCourseForm").find(".detail").hide(); 
        });
        $("select[name=category]").on("change", function() {
            var category = $(this).val();
            that.renderSubCategories(category);
        });
        $("select[name=subCategory]").on("change", function() {
            var category = $(this).val();
            that.renderThirdCategories($("select[name=category]").val(), category);
        });
        $("select[name=city]").on("change", function() {
            var city = $(this).val();
            that.renderDistrict(city);
        });
        $("input[class=date]").datepicker({
                buttonImageOnly: true,
                buttonImage: "calendar.gif",
                buttonText: "Calendar",
                onSelect: function (text, inst) {
                    var d = new Date ();
                    d.setDate(inst.selectedDay);
                    d.setMonth(inst.selectedMonth);
                    d.setYear(inst.selectedYear);
                    $(this).val(Utilities.castToAPIFormat(d));
                }
            });

    },  
    successCallback: function () {
        app.navigate("manage/course", true);
    },
    
    renderCategories: function (categories) {
        this.categories = categories;
        var buf = [];
        for ( var key in categories ) {
            buf.push("<option value='" + key + "'>" + key + "</option>");
            if (categories[key].index === 1) {
                first = key;
            }
        }

        $("select[name=category]").empty().append(buf.join("")).val(first);
        this.renderSubCategories(first);
    },
    renderSubCategories: function (category) {
        var subCategory = this.categories[category], buf = [], first;
        for ( var key in subCategory) {
            if (key !== "index") {
                buf[subCategory[key].index]="<option value='" + key + "'>" + key + "</option>";
                if (subCategory[key].index === 1) {
                    first = key;
                }
            }
        }
        $("select[name=subCategory]").empty().append(buf.join("")).val(first);

        this.renderThirdCategories(category, first);
    },
    renderThirdCategories: function (cat1, cat2) {
        var l3Category = this.categories[cat1][cat2], buf = [], first;
        for ( var key in l3Category) {
            if (key !== "index") {
                buf[l3Category[key].index]="<option value='" + key + "'>" + key + "</option>";
                if (l3Category[key].index === 1) {
                    first = key;
                }
            }
        }
        $("select[name=subSubCategory]").empty().append(buf.join("")).val(first);
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
    submitAction: function () {

    },
    close: function () {
        if (!this.isClosed) {
            this.isClosed = false;
            this.$el.empty();
        }
    }
});