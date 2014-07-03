var AdminPartnerView = BaseFormView.extend({
    el: "#partnerCRUDContainer",
    fields: [
        new BaseField({
            name: "学校标志",
            fieldId: "logo",
            type: "file",
            mandatory: true,
            previewId: "logoPreview",
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
        $("#managePhoto").on("click", function () {
            app.navigate("manage/partnerPhoto/" + that.partner.get("partnerId"), true);
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
        for (i = 0; i < this.fields.length; i++ ) {
            id = this.fields[i].get("fieldId");
            $field = $("#" + id);
            if (!$field.val()) {
                $field.attr("type", "text").addClass("hidden").val(
                    this.course.get(id.substr(0, id.length-1) + "Urls")[Utilities.toInt(id.substr(id.length-1, 1))]);
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