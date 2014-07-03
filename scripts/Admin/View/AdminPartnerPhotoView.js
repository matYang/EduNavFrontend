var AdminPartnerAddPhotoView = BaseFormView.extend({
    el: "#main_content",
    teacherBlockTemplate: _.template(tpl.get("photoInputBlock")),
    template: _.template(tpl.get("adminPartnerAdd")),
    formElem: "adminPartnerAddForm",
    
    submitButtonId: "createSubmit",
    form:true,
    callback: "uploadTarget",
    initialize: function(params){
        _.bindAll(this, "render", "bindEvents", "close", "addPhoto", "removePhoto", "reNumber", "findField");
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
        this.photoCount = 1;
        this.$el.append(this.template(partner.toJSON()));
        this.$photos = $("#entries");
        $("#searchResult").addClass("hidden");
        this.bindEvents();
    },
    bindEvents: function () {
        var that = this;
        BaseFormView.prototype.bindEvents.call(this);
        $("#addMore").on("click", this.addPhoto);
        $("#cancel").on("click", function () {
            app.navigate("manage/partner/" + that.partner.get("partnerId"), true);
        });
        this.$photos.on("click", ".removeTeacher", function (e) {
            var id = Utilities.toInt(Utilities.getId(e.target.id));
            that.removeTeacherInfo(id);
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

    removePhoto: function (id) {
        BaseFormView.prototype.unbindFields.call(this);
        this.rejectId = "imgUrl" + id;
        this.fields = _.reject(this.fields, this.findField, this);
        $("#teacherBlock" + id).remove();
        this.photoCount--;
        this.reNumber();
    },
    reNumber: function () {
        var $blocks = this.$photos.find(".teacherBlock"), count, $block, labelNum, preview;
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
    addPhoto: function () {
        this.fields.push(new BaseField({
            name: "学校照片" + this.photoCount,
            fieldId: "imgUrl" + this.photoCount,
            type: "file",
            mandatory: false,
            previewId: "imgPreview" + this.photoCount
        }));
        this.$photos.append(this.teacherBlockTemplate({count: this.photoCount}));
        var preview = $("#"+this.fields[this.photoCount-1].get("previewId")), that = this;
        $("#imgUrl"+(this.photoCount)).on("change", preview, function (e) {
            that.displayImagePreview(e);
        }).on("keydown", Utilities.preventDefault);
        this.photoCount++;
    },
    close: function () {
        if (!this.isClosed) {
            this.isClosed = false;
            this.$el.empty();
        }
    }
});

var AdminPartnerManagePhotoView = BaseFormView.extend({
    el: "#main_content",
    photoBlockTemplate: _.template(tpl.get("photoEditBlock")),
    template: _.template(tpl.get("adminPartnerEdit")),
    formElem: "adminPartnerEditForm",
    
    submitButtonId: "editSubmit",
    form:false,
    callback: "uploadTarget",
    initialize: function(params){
        _.bindAll(this, "render", "bindEvents", "close", "removePhoto");
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
        this.$el.append(this.template({entryTemplate: this.photoBlockTemplate, partner: partner._toJSON(), list: partner._toJSON().classImgList}));
        this.$photos = $("#entries");
        $("#searchResult").addClass("hidden");
        this.bindEvents();
    },
    bindEvents: function () {
        var that = this;
        BaseFormView.prototype.bindEvents.call(this);
        $("#cancel").on("click", function () {
            app.navigate("manage/partner/" + that.partner.get("partnerId"), true);
        });
        this.$photos.on("click", ".removePhoto", function (e) {
            var id = Utilities.toInt(Utilities.getId(e.target.id));
            that.removePhoto(id);
        });
    },  
    successCallback: function () {
        app.navigate("manage/partner/" + this.partner.get("partnerId"), true);
    },
    findField: function (field, context) {
        return field.get("fieldId") === this.rejectId;
    },
    removePhoto: function (id) {
        $("#photoBlock" + id).remove();
    },
    submitAction: function () {
        var i, $blocks = this.$photos.find(".photoBlock"), $block, id, photos = new Photos(), photo;
        for (i = 0; i < $blocks.length; i++) {
            $block = $($blocks[i]);
            id = Utilities.toInt($block.data("id"));
            photos.add(this.partner.get("classImgList").get(id));
        }
        this.partner.set("classImgList", photos);
    },
    close: function () {
        if (!this.isClosed) {
            this.isClosed = false;
            this.$el.empty();
        }
    }
});