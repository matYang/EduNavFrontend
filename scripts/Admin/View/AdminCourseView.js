var AdminCourseView = BaseFormView.extend({
    el: "#courseCRUDContainer",
    form: false,
    formElem: "adminCourseForm",
    template: _.template(tpl.get("adminCourse")),
    optionTemplate: _.template(tpl.get("simpleOption")),
    selectTemplate: _.template("<select class='selectTeacher'><option value='-1'>无</option><%= options %></select>"),
    submitButtonId: "coursePostSubmit",    
    initialize: function(params){
        _.bindAll(this, "render", "bindEvents", "renderCategories", "renderSubCategories", "renderThirdCategories", "renderLocations", "renderL2Locations", "renderL3Locations", "fetchPartnerTeacherList", "submitAction", "close");
        BaseFormView.prototype.initialize.call(this);
        params = params || {};
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
            this.render(new Course());
        }
        
    },
    fetchPartnerTeacherList: function () {
        var that = this;
        app.adminManager.fetchPartner(this.model.get("partnerId"), {        //Fetch all teachers belong to the partner (partner Id is supplied by admin input)
            "success": function (partner) {
                teachers = partner.get("teacherList");
                var buf = [], i, $teacherDom;
                that.partnerTeacherList = teachers;
                for (i = 0; i < that.partnerTeacherList.length; i++) {      //Build select List
                    buf[i] = that.optionTemplate({
                        val: that.partnerTeacherList.at(i).get("teacherId"),
                        text: that.partnerTeacherList.at(i).get("name")
                    });
                }
                that.teacherSelectHtml = that.selectTemplate({options: buf.join("")});         //This will be reused when admin adds more teachers
                $teacherDom = $(".selectTeacher").empty().append(that.teacherSelectHtml);      //When this line of code is being excuted, the webpage should always have enough select tags for existing teachers in this course
                for (i = 0; i < that.model.get("teacherIdList").length; i++ ) {
                    $($teacherDom[i]).val(that.model.get("teacherIdList")[i]);
                }
            },
            "error": function () {
                alert("合作伙伴ID无效");
            }
        });
    },
    render: function (course) {
        this.model = course.clone();
        this.isClosed = false;
        app.viewRegistration.register(this);
        this.$el.empty().append(this.template(course._toJSON())).removeClass("hidden");
        if (course.get("partnerId") >= 0) {
            this.fetchPartnerTeacherList();
        }
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
        $("#searchResult").addClass("hidden");
        this.bindEvents();
    },

    bindEvents: function () {
        var that = this;
        BaseFormView.prototype.bindEvents.call(this);
        $("#createSimilarCourse").on("click", function() {
            that.modelCopy = that.model;
            that.model = that.modelCopy.clone().set("courseId", -1);;
            var json = that.model._toJSON(), attr;
            $("#adminCourseForm").find(".edit").show();
            $("#adminCourseForm").find(".detail").hide();
            for (attr in json) {
                var $edit = $("[name=" + attr + "]");
                if ($edit.attr("type") === "checkbox") {
                    $edit.prop("checked", json[attr]);
                } else if ($edit.prop("tagName") === "TEXTAREA") {
                    $edit.html(json[attr]);
                } else {
                    $edit.val(json[attr]);
                }
            }
        });
        $("input[name=partnerId]").on("change", this.fetchPartnerTeacherList);
        $("#cancel").on("click", function () {
            that.model = that.modelCopy;
            $("#adminCourseForm").find(".edit").hide();
            $("#adminCourseForm").find(".detail").show();   
        });
        $("#editCourse").on("click", function () {
            $("#adminCourseForm").find(".edit").show();
            $("#adminCourseForm").find(".detail").hide(); 
            var json = that.model._toJSON();
            for (var attr in json) {
                var $edit = $("input[name=" + attr + "]");
                if ($edit.attr("type") === "checkbox") {
                    $edit.prop("checked", json[attr]);
                } else if ($edit.prop("tagName") === "TEXTAREA") {
                    $edit.html(json[attr]);
                } else if ($edit.hasClass("date")) {
                    $edit.val(Utilities.getDateString(that.model.get(attr)));
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
                    $(this).val(Utilities.getDateString(d));
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
        $("input.date").datepicker({
                buttonImageOnly: true,
                buttonImage: "calendar.gif",
                buttonText: "Calendar",
                onSelect: function (text, inst) {
                    var d = new Date ();
                    d.setDate(inst.selectedDay);
                    d.setMonth(inst.selectedMonth);
                    d.setYear(inst.selectedYear);
                    $(this).val(Utilities.getDateString(d));
                }
            });
        $("#addTeacher").on("click", function () {
            if (!that.teacherSelectHtml) {
                alert("你还没有输入合作伙伴ID，或者该合作伙伴尚未建立教师档案");
            }
            if (($("#newTeachers").children("select").length + $("#existingTeachers").children("select").length) >= 4) {
                return;
            } else {
                $("#newTeachers").append(that.teacherSelectHtml);
            }
        });
    },  
    successCallback: function () {
        app.navigate("manage/course", true);
    },
    errorCallback: function () {
        var i, id, $field, s;
        for (i = 0; i < this.fields.length; i++ ) {
            id = this.fields[i].get("fieldId");
            $field = $("#" + id);
            if (!$field.attr("type") === "text")  {
                $field.attr("type", "file").removeClass("hidden").val("");
            }
        }

    },
    renderCategories: function (categories) {
        this.categories = categories;
        var buf = [], first = "";
        for ( var key in categories ) {
            buf.push("<option value='" + key + "'>" + key + "</option>");
            if (categories[key].index === 0) {
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
                if (subCategory[key].index === 0) {
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
                if (l3Category[key].index === 0) {
                    first = key;
                }
            }
        }
        $("select[name=subSubCategory]").empty().append(buf.join("")).val(first);
    },
    renderLocations: function (list) {
        this.locations = list;
         var buf = [], first = "";
        for ( var key in this.locations ) {
            if (key !== "index") {
                buf.push("<option value='" + key + "'>" + key + "</option>");
                if (this.locations[key].index === 0) {
                    first = key;
                }
            }
        }
        $("select[name=province]").empty().append(buf.join()).val(first);
        this.renderL2Locations(first);
    },
    renderL2Locations: function (loc1) {
        var buf = [], first = "";
        for ( var key in this.locations[loc1] ) {
            if (key !== "index") {
                buf.push("<option value='" + key + "'>" + key + "</option>");
                if (this.locations[loc1][key].index === 0) {
                    first = key;
                }
            }
        }
        $("select[name=city]").empty().append(buf.join()).val(first);
        this.renderL3Locations(loc1, first);
    },
    renderL3Locations: function (loc1, loc2) {
        var l3Location = this.locations[loc1][loc2], buf = [], first = "";
        for ( var key in l3Location ) {
            if (key !== "index") {
                buf.push("<option value='" + key + "'>" + key + "</option>");
                if (l3Location[key].index === 0) {
                    first = key;
                }
            }
        }
        $("select[name=district]").empty().append(buf.join()).val(first);
    },
    submitAction: function (e) {
        var $teachers = $(".selectTeacher"), i, idList = [], count = 0, id;
        for (i = 0; i < $teachers.length; i++) {
            id = $($teachers[i]).val();
            if (id !== -1) {
                idList[count++] = id;
            }
        }
        this.model.set("teacherIdList", idList);
        app.adminManager.updateCourse(this.model, {
            "success": function (model) {
                app.navigate("manage/course/" + model.get("courseId"), true);
            },
            "error": Utilities.defaultErrorHandler
        });
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
            $("input[name=partnerId]").off();
            this.isClosed = true;
            this.$el.empty();
        }
    }
});