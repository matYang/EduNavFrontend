var AdminPartnerView = BaseFormView.extend({
    el: "#partnerCRUDContainer",
    fields: [
        new BaseField({
            name: "学校标志",
            fieldId: "logoUrl",
            type: "file",
            mandatory: true,
            previewId: "logoPreview"
        }),
        new BaseField({
            name: "机构全称",
            fieldId: "wholeName",
            type: "text",
            mandatory: true
        }),
        new BaseField({
            name: "机构简介",
            fieldId: "partnerIntro",
            type: "text",
            mandatory: false
        }),
        new BaseField({
            name: "机构荣誉",
            fieldId: "partnerDistinction",
            type: "text",
            mandatory: false
        }),
        new BaseField({
            name: "执照",
            fieldId: "license",
            type: "text",
            mandatory: true
        }),
        new BaseField({
            name: "机构号",
            fieldId: "organizationNum",
            type: "text",
            mandatory: true
        }),
        new BaseField({
            name: "识别号",
            fieldId: "reference",
            type: "text",
            mandatory: true
        }),
        new BaseField({
            name: "公司总部地址",
            fieldId: "hqLocation",
            type: "text",
            mandatory: true
        }),
        new BaseField({
            name: "总部合作关系对接人",
            fieldId: "hqContact",
            type: "text",
            mandatory: false
        }), 
        new BaseField({
            name: "总部合作关系对接人联系电话",
            fieldId: "hqContactPhone",
            type: "text",
            mandatory: false,
            validatorFunction: Utilities.phoneValid
        }),
        new BaseField({
            name: "课程详情联联络人",
            fieldId: "courseContact",
            type: "text",
            mandatory: false
        }),
        new BaseField({
            name: "课程详情联络人联系电话",
            fieldId: "courseContactPhone",
            type: "text",
            mandatory: false,
            validatorFunction: Utilities.phoneValid
        }),
        new BaseField({
            name: "学员咨询联系电话",
            fieldId: "studentInqueryPhone",
            type: "text",
            mandatory: false,
            validatorFunction: Utilities.phoneValid
        }),
        new BaseField({
            name: "报名学员入学状态对接人",
            fieldId: "registraContact",
            type: "text",
            mandatory: false,
        }),
        new BaseField({
            name: "报名学员入学状态联系电话",
            fieldId: "registraContactPhone",
            type: "text",
            mandatory: false,
            validatorFunction: Utilities.phoneValid
        }),
        new BaseField({
            name: "报名学员入学状态传真号码",
            fieldId: "registraContactFax",
            type: "text",
            mandatory: false,
            validatorFunction: Utilities.phoneValid
        }),
        new BaseField({
            name: "默认课程截止日",
            fieldId: "defaultCutoffDay",
            type: "text",
            mandatory: false
        }),
        new BaseField({
            name: "默认截止日几点截止",
            fieldId: "defaultCutoffTime",
            type: "text",
            mandatory: false
        }),
        new BaseField({
            name: "状态",
            fieldId: "status",
            type: "text",
            mandatory: true
        }),
        new BaseField({
            name: "学校名",
            fieldId: "instName",
            type: "text",
            mandatory: true
        }),
        new BaseField({
            name: "合作伙伴资格",
            fieldId: "partnerQualification",
            type: "text",
            mandatory: true
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
        this.subLocationCount = partner.get("subLocations").length ? partner.get("subLocations").length + 1 : 2;
        this.uniform = partner.get("uniformRegistraLocation") || false;
        this.$el.append(this.template(partner._toJSON()));
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
        $("#addLocation").on("click", function () {
            if (!that.uniform) {
                $(this).before('<input type="text" class="form-control subLocations" id="subLocations' +
                                that.subLocationCount + '" name="subLocations' +
                                that.subLocationCount +'"/>');
                that.subLocationCount++;
            }
        });
        $("#uniformRegistraLocation").on("change", function () {
            if ($(this).prop("checked")) {
                $(".subLocations").prop("disabled", true);
                that.uniform = true;
            } else {
                $(".subLocations").prop("disabled", false);
                that.uniform = false;
            }
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