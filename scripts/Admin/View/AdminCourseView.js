var AdminCourseFields = [
    new BaseField({
        name:"course Id",
        fieldId: "courseId",
        fieldType: "number",
        mandatory: true,
        modelAttr: "courseId"
    }),
    new BaseField({
        name:"partner Id",
        fieldId: "partnerId",
        fieldType: "number",
        mandatory: true,
        modelAttr: "partnerId"
    }),
    new BaseField({
        name:"课程名",
        fieldId: "courseName",
        fieldType: "text",
        mandatory: true,
        modelAttr: "courseName"
    }),
    new BaseField({
        name:"课程简介",
        fieldId: "courseIntro",
        fieldType: "text",
        mandatory: true,
        modelAttr: "courseIntro"
    }),
    new BaseField({
        name:"适合学生",
        fieldId: "suitableStudent",
        fieldType: "text",
        mandatory: false,
        modelAttr: "suitableStudent"
    }),
    new BaseField({
        name:"学时",
        fieldId: "courseHourNum",
        fieldType: "number",
        mandatory: false,
        modelAttr: "courseHourNum"
    }),
    new BaseField({
        name:"学时时间",
        fieldId: "courseHourLength",
        fieldType: "number",
        mandatory: false,
        modelAttr: "courseHourLength"
    }),
    new BaseField({
        name:"招生人数",
        fieldId: "classSize",
        fieldType: "number",
        mandatory: false,
        modelAttr: "classSize"
    }),
    new BaseField({
        name:"反金金额",
        fieldId: "cashback",
        fieldType: "text",
        mandatory: false,
        modelAttr: "cashback"
    }),
    new BaseField({
        name:"人气值",
        fieldId: "popularity",
        fieldType: "number",
        mandatory: false,
        modelAttr: "popularity"
    }),
    new BaseField({
        name:"开始日期",
        fieldId: "startDate",
        fieldType: "date",
        mandatory: false,
        modelAttr: "startDate"
    }),
    new BaseField({
        name:"结束日期",
        fieldId: "finishDate",
        fieldType: "date",
        mandatory: false,
        modelAttr: "finishDate"
    }),
    new BaseField({
        name:"截止日期",
        fieldId: "cutoffDate",
        fieldType: "date",
        mandatory: false,
        modelAttr: "cutoffDate"
    }),
    new BaseField({
        name:"无退款日期",
        fieldId: "noRefundDate",
        fieldType: "date",
        mandatory: false,
        modelAttr: "noRefundDate"
    }),
    new BaseField({
        name:"返金日期",
        fieldId: "cashbackDate",
        fieldType: "date",
        mandatory: false,
        modelAttr: "cashbackDate"
    }),
    new BaseField({
        name:"上学时间1",
        fieldId: "startTime1",
        fieldType: "number",
        mandatory: false,
        modelAttr: "startTime1"
    }),
    new BaseField({
        name:"放学时间1",
        fieldId: "finishTime1",
        fieldType: "number",
        mandatory: false,
        modelAttr: "finishTime1"
    }),
    new BaseField({
        name:"上学时间2",
        fieldId: "startTime2",
        fieldType: "number",
        mandatory: false,
        modelAttr: "startTime2"
    }),
    new BaseField({
        name:"放学时间2",
        fieldId: "finishTime2",
        fieldType: "number",
        mandatory: false,
        modelAttr: "finishTime2"
    }),
    new BaseField({
        name:"上课日",
        fieldId: "studyDays",
        fieldType: "text",
        mandatory: false,
        modelAttr: "studyDays"
    }),
    new BaseField({
        name:"上课日备注",
        fieldId: "studyDaysNote",
        fieldType: "text",
        mandatory: false,
        modelAttr: "studyDaysNote"
    }),
    new BaseField({
        name:"一级分类",
        fieldId: "category",
        fieldType: "select",
        mandatory: false,
        modelAttr: "category"
    }),
    new BaseField({
        name:"二级分类",
        fieldId: "subCategory",
        fieldType: "select",
        mandatory: false,
        modelAttr: "subCategory"
    }),
    new BaseField({
        name:"三级分类",
        fieldId: "subSubCategory",
        fieldType: "select",
        mandatory: false,
        modelAttr: "subSubCategory"
    }),
    new BaseField({
        name:"省份",
        fieldId: "province",
        fieldType: "select",
        mandatory: false,
        modelAttr: "province"
    }),
    new BaseField({
        name:"城市",
        fieldId: "city",
        fieldType: "select",
        mandatory: false,
        modelAttr: "city"
    }),
    new BaseField({
        name:"地区",
        fieldId: "district",
        fieldType: "select",
        mandatory: false,
        modelAttr: "district"
    }),
    new BaseField({
        name:"地址",
        fieldId: "location",
        fieldType: "text",
        mandatory: false,
        modelAttr: "location"
    }),
    new BaseField({
        name:"注册地点",
        fieldId: "registraLocation",
        fieldType: "text",
        mandatory: false,
        modelAttr: "registraLocation"
    }),
    new BaseField({
        name:"查询号",
        fieldId: "reference",
        fieldType: "text",
        mandatory: false,
        modelAttr: "reference"
    }),
    new BaseField({
        name:"订单类型",
        fieldId: "bookingType",
        fieldType: "select",
        mandatory: false,
        modelAttr: "bookingType"
    }),
    new BaseField({
        name:"开课要求",
        fieldId: "openCourseRequirement",
        fieldType: "text",
        mandatory: false,
        modelAttr: "openCourseRequirement"
    }),
    new BaseField({
        name:"教材简介",
        fieldId: "teachingMaterialIntro",
        fieldType: "text",
        mandatory: false,
        modelAttr: "teachingMaterialIntro"
    }),
    new BaseField({
        name:"教材费用",
        fieldId: "teachingMaterialFee",
        fieldType: "text",
        mandatory: false,
        modelAttr: "teachingMaterialFee"
    }),
    new BaseField({
        name:"教学方式",
        fieldId: "teachingMethod",
        fieldType: "text",
        mandatory: false,
        modelAttr: "teachingMethod"
    }),
    new BaseField({
        name:"学前要求",
        fieldId: "prerequest",
        fieldType: "text",
        mandatory: false,
        modelAttr: "prerequest"
    }),
    new BaseField({
        name:"下载材料",
        fieldId: "downloadMaterials",
        fieldType: "text",
        mandatory: false,
        modelAttr: "downloadMaterials"
    }),
    new BaseField({
        name:"题库",
        fieldId: "questionBank",
        fieldType: "text",
        mandatory: false,
        modelAttr: "questionBank"
    }),
    new BaseField({
        name:"质量保证",
        fieldId: "qualityAssurance",
        fieldType: "text",
        mandatory: false,
        modelAttr: "qualityAssurance"
    }),
    new BaseField({
        name:"高分奖励",
        fieldId: "highScoreReward",
        fieldType: "text",
        mandatory: false,
        modelAttr: "highScoreReward"
    }),
    new BaseField({
        name:"保过协议",
        fieldId: "passAgreement",
        fieldType: "text",
        mandatory: false,
        modelAttr: "passAgreement"
    }),
    new BaseField({
        name:"阶段评估",
        fieldId: "quiz",
        fieldType: "text",
        mandatory: false,
        modelAttr: "quiz"
    }),
    new BaseField({
        name:"课后作业",
        fieldId: "assignments",
        fieldType: "text",
        mandatory: false,
        modelAttr: "assignments"
    }),
    new BaseField({
        name:"作业批改",
        fieldId: "marking",
        fieldType: "text",
        mandatory: false,
        modelAttr: "marking"
    }),
    new BaseField({
        name:"结业证书",
        fieldId: "certification",
        fieldType: "text",
        mandatory: false,
        modelAttr: "certification"
    }),
    new BaseField({
        name:"课后活动",
        fieldId: "extracurricular",
        fieldType: "text",
        mandatory: false,
        modelAttr: "extracurricular"
    }),
    new BaseField({
        name:"状态",
        fieldId: "status",
        fieldType: "select",
        mandatory: false,
        modelAttr: "status"
    }),
    new BaseField({
        name:"联系方式",
        fieldId: "contact",
        fieldType: "text",
        mandatory: false,
        modelAttr: "contact"
    }),
    new BaseField({
        name:"报名电话",
        fieldId: "registraPhone",
        fieldType: "text",
        mandatory: false,
        modelAttr: "registraPhone"
    }),
    new BaseField({
        name:"提纲",
        fieldId: "outline",
        fieldType: "text",
        mandatory: false,
        modelAttr: "outline"
    }),
    new BaseField({
        name:"教学目标",
        fieldId: "goal",
        fieldType: "text",
        mandatory: false,
        modelAttr: "goal"
    }),
    new BaseField({
        name:"班主任导读",
        fieldId: "classTeacher",
        fieldType: "text",
        mandatory: false,
        modelAttr: "classTeacher"
    }),
    new BaseField({
        name:"讲练结合",
        fieldId: "teachingAndExercise",
        fieldType: "text",
        mandatory: false,
        modelAttr: "teachingAndExercise"
    }),
    new BaseField({
        name:"问答时间",
        fieldId: "questionSession",
        fieldType: "text",
        mandatory: false,
        modelAttr: "questionSession"
    }),
    new BaseField({
        name:"试听",
        fieldId: "trail",
        fieldType: "text",
        mandatory: false,
        modelAttr: "trail"
    }),
    new BaseField({
        name:"附加服务",
        fieldId: "bonusService",
        fieldType: "text",
        mandatory: false,
        modelAttr: "bonusService"
    }),
];

var AdminCourseView = BaseFormView.extend({
    el: "#courseCRUDContainer",
    form: false,
    formElem: "adminCourseForm",
    template: _.template(tpl.get("adminCourse")),
    optionTemplate: _.template(tpl.get("simpleOption")),
    selectTemplate: _.template("<select class='selectTeacher'><option value='-1'>无</option><%= options %></select>"),
    submitButtonId: "coursePostSubmit",
    fields: AdminCourseFields,
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
                        val: that.partnerTeacherList[i].get("teacherId"),
                        text: that.partnerTeacherList[i].get("name")
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
        var $teachers = $(".selectTeacher"), i, idList = [], count = 0, id, fields, field, value;
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

