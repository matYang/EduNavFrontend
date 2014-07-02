var AdminPartnerPhotoView = BaseFormView.extend({
    el: "#main_content",
    teacherBlockTemplate: _.template(tpl.get("teacherInputBlock")),
    imageBlockTemplate: _.template(tpl.get("imageInputBlock")),
    template: _.template(tpl.get("adminPartnerPhotoManage")),
    formElem: "adminPartnerPhotoForm",
    
    submitButtonId: "partnerPostSubmit",
    form:true,
    callback: "uploadTarget",
    initialize: function(params){
        _.bindAll(this, "render", "bindEvents", "close", "addTeacherInfo", "addClassImg", "removeClassImg", "removeTeacherInfo");
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
        this.classCount = partner.get("classImgUrls").length + 1;
        this.teacherCount = partner.get("teachers").length + 1;
        this.$el.append(this.template(partner.toJSON()));
        this.$schools = $("#schoolImgs");
        this.$teachers = $("#teacherInfo");
        $("#searchResult").addClass("hidden");
        this.bindEvents();
    },
    bindEvents: function () {
        var that = this;
        BaseFormView.prototype.bindEvents.call(this);
        $("#addTeacherInfo").on("click", this.addTeacherInfo);
        $("#addPhoto").on("click", this.addClassImg);
        $("#cancel").on("click", function () {
            app.navigate("manage/partner/" + this.partnerId, true);
        });
    },  
    successCallback: function () {
        app.navigate("manage/partner", true);
    },
    submitAction: function () {
        var i, id, $field, s;
        for (i = 0; i < this.fields.length; i++ ) {
            id = this.fields[i].get("fieldId");
            $field = $("#" + id);
            if (!$field.val()) {
                $field.attr("type", "text").addClass("hidden").val(
                    this.course.get(id.substr(0, id.length-1) + "Urls")[Utilities.toInt(id.substr(id.length-1, 1))]);
            }
        }
    },

    findField: function (field, context) {
        return field.get("fieldId") === this.rejectId;
    },
    removeClassImg: function (id) {
        this.rejectId = id;
        this.fields = _.reject(this.fields, this.findField, this);
        $("#" + this.rejectId).remove();
        this.classCount--;
    },
    addClassImg: function () {
        this.fields.push(new BaseField({
            name: "学校照片" + this.classCount,
            fieldId: "classImg" + this.classCount,
            type: "file",
            mandatory: false,
            previewId: "preview" + this.classCount,
        }));
        debugger;
        this.$schools.append(this.imageBlockTemplate({text:"学校照片" + this.classCount, count: this.classCount, url:""}));
        this.classCount++;
    },
    removeTeacherInfo: function (id) {
        this.rejectId = id;
        this.fields = _.reject(this.fields, this.findField, this);
        $("#" + this.rejectId).remove();
        this.teacherCount--;
    },
    addTeacherInfo: function () {
        this.fields.push(new BaseField({
            name: "教师照片" + this.teacherCount,
            fieldId: "teacherImg" + this.teacherCount,
            type: "file",
            mandatory: false,
        }));
        this.$teachers.append(this.teacherBlockTemplate({count: this.teacherCount}));
        this.teacherCount++;
    },
    close: function () {
        if (!this.isClosed) {
            this.isClosed = false;
            this.$el.empty();
        }
    }
});