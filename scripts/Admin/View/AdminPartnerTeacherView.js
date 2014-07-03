var AdminPartnerAddTeacherView = BaseFormView.extend({
    el: "#main_content",
    teacherBlockTemplate: _.template(tpl.get("teacherInputBlock")),
    template: _.template(tpl.get("adminPartnerAdd")),
    formElem: "adminPartnerAddForm",
    
    submitButtonId: "ccreateSubmit",
    form:true,
    callback: "uploadTarget",
    initialize: function(params){
        _.bindAll(this, "render", "bindEvents", "close", "addTeacherInfo", "removeTeacherInfo", "reNumber", "findField");
        this.fields = [];
        BaseFormView.prototype.initialize.call(this);
        app.viewRegistration.register(this);
        params = params || {};
        this.action = AdminApiResource.admin_partner;
        this.create = false;
        if (params.partner) {
            this.render(params.partner);
        } else if (params.partnerId){
            app.adminManager.fetchPartner(params.partnerId, {
                success: this.render,
                error: function() {
                    app.navigate("manage", true);
                }
            });
        } else {
            //Create new partner
            this.create = true;
            this.render(new Partner());
        }
        
    },
 
    render: function (partner) {
        this.partner = partner;
        this.teacherCount = 1;
        this.$el.append(this.template(partner._toJSON()));
        this.$teachers = $("#entries");
        $("#searchResult").addClass("hidden");
        this.bindEvents();
    },
    bindEvents: function () {
        var that = this;
        BaseFormView.prototype.bindEvents.call(this);
        $("#addMore").on("click", this.addTeacherInfo);
        $("#cancel").on("click", function () {
            app.navigate("manage/partner/" + that.partner.get("partnerId"), true);
        });
        this.$teachers.on("click", ".removeTeacher", function (e) {
            var id = Utilities.toInt(Utilities.getId(e.target.id));
            that.removeTeacherInfo(id);
        });
    },  
    successCallback: function () {
        app.navigate("manage/partner", true);
    },
    findField: function (field, context) {
        return field.get("fieldId") === this.rejectId;
    },
    removeTeacherInfo: function (id) {
        BaseFormView.prototype.unbindFields.call(this);
        this.rejectId = "imgUrl" + id;
        this.fields = _.reject(this.fields, this.findField, this);
        $("#teacherBlock" + id).remove();
        this.teacherCount--;
        this.reNumber();
    },
    reNumber: function () {
        var $blocks = this.$teachers.find(".teacherBlock"), count, $block, labelNum, preview;
        for (count = 0; count < $blocks.length; count++) {
            labelNum = (count+1);
            $block = $($blocks[count]).attr("id", "teacherBlock" + labelNum);
            $block.find(".name").attr("name", "name" + labelNum);
            $block.find(".img").attr("name", "imgUrl" + labelNum).attr("id", "imgUrl" + labelNum);
            $block.find(".intro").attr("name", "intro" + labelNum);
            $block.find(".removeTeacher").attr("id", "remove_" + labelNum);
            $block.find(".nameLabel").html("教师名" + labelNum);
            $block.find(".imgLabel").html("教师照片" + labelNum);
            $block.find(".introLabel").html("教师简介" + labelNum);
            this.fields[count].set("name", "教师照片" + labelNum);
            this.fields[count].set("fieldId", "imgUrl" + labelNum);
            preview = $("#"+this.fields[count].get("previewId"));
            $("#imgUrl"+labelNum).on("change", preview, this.displayImagePreview).on("keydown", Utilities.preventDefault);
        }
    },
    addTeacherInfo: function () {
        this.fields.push(new BaseField({
            name: "教师照片" + this.teacherCount,
            fieldId: "imgUrl" + this.teacherCount,
            type: "file",
            mandatory: false,
            previewId: "imgPreview" + this.teacherCount
        }));
        this.$teachers.append(this.teacherBlockTemplate({count: this.teacherCount}));
        var preview = $("#"+this.fields[this.teacherCount-1].get("previewId")), that = this;
        $("#imgUrl"+(this.teacherCount)).on("change", preview, function (e) {
            that.displayImagePreview(e);
        }).on("keydown", Utilities.preventDefault);
        this.teacherCount++;
    },
    close: function () {
        if (!this.isClosed) {
            this.isClosed = false;
            this.$el.empty();
        }
    }
});

var AdminPartnerManageTeacherView = BaseFormView.extend({
    el: "#main_content",
    teacherBlockTemplate: _.template(tpl.get("teacherEditBlock")),
    template: _.template(tpl.get("adminPartnerEdit")),
    formElem: "adminPartnerEditForm",
    
    submitButtonId: "editSubmit",
    form:false,
    callback: "uploadTarget",
    initialize: function(params){
        _.bindAll(this, "render", "bindEvents", "close", "removeTeacherInfo", "successCallback");
        this.fields = [];
        BaseFormView.prototype.initialize.call(this);
        app.viewRegistration.register(this);
        params = params || {};
        this.action = AdminApiResource.admin_partner;
        this.create = false;
        if (params.partner) {
            this.render(params.partner);
        } else if (params.partnerId){
            app.adminManager.fetchPartner(params.partnerId, {
                success: this.render,
                error: function() {
                    app.navigate("manage", true);
                }
            });
        } else {
            app.navigate("manage", true);
        }
        
    },
 
    render: function (partner) {
        this.partner = partner;
        this.$el.append(this.template({entryTemplate: this.teacherBlockTemplate, partner:partner._toJSON(), list:partner._toJSON().teacherList}));
        this.$teachers = $("#entries");
        $("#searchResult").addClass("hidden");
        this.bindEvents();
    },
    bindEvents: function () {
        var that = this;
        BaseFormView.prototype.bindEvents.call(this);
        $("#cancel").on("click", function () {
            app.navigate("manage/partner/" + that.partner.get("partnerId"), true);
        });
        this.$teachers.on("click", ".removeTeacher", function (e) {
            var id = Utilities.toInt(Utilities.getId(e.target.id));
            that.removeTeacherInfo(id);
        });
    },  
    successCallback: function () {
        app.navigate("manage/partner/" + this.partner.get("partnerId"), true);
    },
    findField: function (field, context) {
        return field.get("fieldId") === this.rejectId;
    },
    removeTeacherInfo: function (id) {
        BaseFormView.prototype.unbindFields.call(this);
        this.rejectId = "imgUrl" + id;
        this.fields = _.reject(this.fields, this.findField, this);
        $("#teacherBlock" + id).remove();
        this.teacherCount--;
        this.reNumber();
    },
    reNumber: function () {
        var $blocks = this.$teachers.find(".teacherBlock"), count, $block, labelNum, preview;
        for (count = 0; count < $blocks.length; count++) {
            labelNum = (count+1);
            $block = $($blocks[count]).attr("id", "teacherBlock" + labelNum);
            $block.find(".name").attr("name", "name" + labelNum);
            $block.find(".intro").attr("name", "intro" + labelNum);
            $block.find(".removeTeacher").attr("id", "remove_" + labelNum);
            $block.find(".nameLabel").html("教师名" + labelNum);
            $block.find(".imgLabel").html("教师照片" + labelNum);
            $block.find(".introLabel").html("教师简介" + labelNum);
        }
    },
    submitAction: function () {
        var i, $blocks = this.$teachers.find(".teacherBlock"), $block, id, teachers = new Teachers(), teacher, that = this;
        for (i = 0; i < $blocks.length; i++) {
            teacher = new Teacher();
            $block = $($blocks[i]);
            id = Utilities.toInt($block.data("id"));
            teacher.set("teacherId", id);
            teacher.set("name", $block.find(".name").val());
            teacher.set("intro", $block.find(".intro").html());
            teacher.set("imgUrl", this.partner.get("teacherList").get(id).get("imgUrl"));
            teachers.add(teacher);
        }
        this.partner.set("teacherList", teachers);
        app.updatePartner(this.partner, {
            success: function() {
                app.navigate("manage/partner/" + that.partner.get("courseId"))
            },
            error: Utilities.defaultErrorHandler
        })
    },
    close: function () {
        if (!this.isClosed) {
            this.isClosed = false;
            this.$el.empty();
        }
    }
});