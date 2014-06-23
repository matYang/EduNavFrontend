var AdminCourseView = BaseFormView.extend({
    el: "#courseCRUDContainer",
    form: true,
    formElem: "adminCourseForm",
    submitButtonId: "coursePostSubmit",
    callback: "uploadTarget",
    fields: [
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
    ],
    initialize: function(params){
        _.bindAll(this, "render", "bindEvents", "renderCategories", "renderSubCategories", "renderThirdCategories", "renderLocations", "renderL2Locations", "renderL3Locations", "close");
        BaseFormView.prototype.initialize.call(this);
        app.viewRegistration.register(this);
        params = params || {};
        this.template = _.template(tpl.get("adminCourse"));
        this.action = AdminApiResource.admin_course;
        this.create = false;
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
            this.create = true;
            this.course = new Course();
            this.render(this.course);
        }
        
    },

    render: function (course) {
        this.course = course.clone();
        this.$el.append(this.template(course.toJSON()));
        if (this.create) {
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
            var json = that.course._toJSON();
            for (var attr in json) {
                var $edit = $("input[name="+attr+"]");
                if ($edit.attr("type") === "checkbox") {
                    $edit.prop("checked", json[attr]);
                } else if ($edit.prop("tagName") === "TEXTAREA") {
                    $edit.html(json[attr]);
                } else if ($edit.hasClass("date")) {
                    $edit.val(Utilities.castToAPIFormat(that.course.get(attr)));
                } else {
                    $edit.val(json[attr]);
                }
            }
        });
        $("input[name=scheduledTime]").datepicker({
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
        $("select[name=category]").on("change", function() {
            var category = $(this).val();
            that.renderSubCategories(category);
        });
        $("select[name=subCategory]").on("change", function() {
            var category = $(this).val();
            that.renderThirdCategories($("select[name=category]").val(), category);
        });
        $("select[name=province]").on("change", function() {
            var province = $(this).val();
            that.renderL2Locations(province);
        });
        $("select[name=city]").on("change", function() {
            var city = $(this).val();
            that.renderL3Locations($("select[name=province]").val(), city);
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
         var buf = [];
        for ( var key in this.locations ) {
            if (key !== "index") {
                buf.push("<option value='" + key + "'>" + key + "</option>");
                if (this.locations[key].index === 1) {
                    first = key;
                }
            }
        }
        $("select[name=province]").empty().append(buf.join()).val(first);
        this.renderL2Locations(first);
    },
    renderL2Locations: function (loc1) {
        var buf = [];
        for ( var key in this.locations[loc1] ) {
            if (key !== "index") {
                buf.push("<option value='" + key + "'>" + key + "</option>");
                if (this.locations[loc1][key].index === 1) {
                    first = key;
                }
            }
        }
        $("select[name=city]").empty().append(buf.join()).val(first);
        this.renderL3Locations(loc1, first);
    },
    renderL3Locations: function (loc1, loc2) {
        var l3Location = this.locations[loc1][loc2], buf = [], first;
        for ( var key in l3Location ) {
            if (key !== "index") {
                buf.push("<option value='" + key + "'>" + key + "</option>");
                if (l3Location[key].index === 1) {
                    first = key;
                }
            }
        }
        $("select[name=district]").empty().append(buf.join()).val(first);
    },
    submitAction: function () {

    },
    close: function () {
        if (!this.isClosed) {
            $("#createSimilarCourse").off();
            $("#cancel").off();
            $("#editCourse").off();
            $("select[name=category]").off();
            $("select[name=subCategory]").off();
            $("select[name=province]").off();
            $("select[name=city]").off();
            this.isClosed = false;
            this.$el.empty();
        }
    }
});