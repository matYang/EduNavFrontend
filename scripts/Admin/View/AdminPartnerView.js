var AdminPartnerView = BaseFormView.extend({
    el: "#partnerCRUDContainer",
    fields: [
        new BaseField({
            name: "学校标志",
            fieldId: "logoUrl",
            type: "file",
            mandatory: true,
            previewId: "logoPreview",
        }),
        new BaseField({
            name: "机构全称",
            fieldId: "wholeName",
            type: "text",
            mandatory: true,
        }),
        new BaseField({
            name: "执照",
            fieldId: "license",
            type: "text",
            mandatory: true,
        }),
        new BaseField({
            name: "机构号",
            fieldId: "organizationNum",
            type: "text",
            mandatory: true,
        }),
        new BaseField({
            name: "识别号",
            fieldId: "reference",
            type: "text",
            mandatory: true,
        }),
        new BaseField({
            name: "电话",
            fieldId: "phone",
            type: "text",
            mandatory: true,
            validatorFunction: Utilities.phoneValid
        }),
        new BaseField({
            name: "状态",
            fieldId: "status",
            type: "text",
            mandatory: true,
        }),
        new BaseField({
            name: "学校名",
            fieldId: "instName",
            type: "text",
            mandatory: true,
        })
    ],
    formElem: "adminPartnerForm",
    submitButtonId: "partnerManagePostSubmit",
    form:true,
    callback: "uploadTarget",
    initialize: function(params){
        _.bindAll(this, "render", "bindEvents", "close");
        BaseFormView.prototype.initialize.call(this);
        app.viewRegistration.register(this);
        params = params || {};
        this.template = _.template(tpl.get("adminPartner"));
        this.action = AdminApiResource.admin_partner;
        this.create = false;
        if (params.partner) {
            this.render(params.partner);
        } else if (params.partnerId){
            app.adminManager.fetchPartner(params.partnerId, {
                success: this.render,
                error: function() {
                    app.navigate("manage/partner", true);
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
        this.classCount = partner.get("classPhotoList").length + 1;
        this.teacherCount = partner.get("teacherList").length + 1;
        this.$el.append(this.template(partner.toJSON()));
        this.$schools = $("#schoolImgs");
        this.$teachers = $("#teacherInfo");
        $("#searchResult").addClass("hidden");
        if (this.create) {
            $("#adminPartnerForm").find(".detail").hide();
            $("#adminPartnerForm").find(".edit").show();
            $("#cancel").hide();
        } else {
            $("#adminPartnerForm").find(".edit").hide();
            $("#adminPartnerForm").find(".detail").show();
        }
        this.bindEvents();
    },
    bindEvents: function () {
        var that = this;
        BaseFormView.prototype.bindEvents.call(this);
        $("#createSimilarPartner").on("click", function() {
            $("#adminPartnerForm").find("edit").show();
            $("#adminPartnerForm").find("detail").hide();
            var json = that.partner.toJSON();
            for (var attr in json) {
                var $edit = $("input[name=" + attr + "]");
                if ($edit.attr("type") === "checkbox") {
                    $edit.prop("checked", json[attr]);
                }
                $edit.val(json[attr]);
            }
        });
        $("#editPartner").on("click", function () {
            that.partnerCopy = that.partner.clone();
            $("#adminPartnerForm").find(".detail").hide();
            $("#adminPartnerForm").find(".edit").show();
        });
        $("#addPhoto").on("click", function () {
            app.navigate("manage/addPhoto/" + that.partner.get("partnerId"), true);
        });
        $("#managePhoto").on("click", function () {
            app.navigate("manage/managePhoto/" + that.partner.get("partnerId"), true);
        });
        $("#addTeacher").on("click", function () {
            app.navigate("manage/addTeacher/" + that.partner.get("partnerId"), true);
        });
        $("#manageTeacher").on("click", function () {
            app.navigate("manage/manageTeacher/" + that.partner.get("partnerId"), true);
        });

        $("#cancel").on("click", function () {
            that.partner = that.partnerCopy;
            $("#adminPartnerForm").find(".edit").hide();
            $("#adminPartnerForm").find(".detail").show();   
        });
    },  
    successCallback: function () {
        app.navigate("manage/partner", true);
    },
    submitAction: function () {
        var i, id, $field, s;
        if (!$("#logoUrl").val()) {
            if (this.partner.get("logoUrl")) {
                $("#logoUrl").attr("type", "text").val(this.partner.get("logoUrl")).addClass("hidden");
            } else {
                alert("学校标志不能为空");
            }
        }
    },
    close: function () {
        if (!this.isClosed) {
            this.isClosed = false;
            this.$el.empty();
        }
    }
});