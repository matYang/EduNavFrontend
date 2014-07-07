var AdminPartnerAddPhotoView = BaseFormView.extend({
    el: "#main_content",
    teacherBlockTemplate: _.template(tpl.get("photoInputBlock")),
    template: _.template(tpl.get("adminPartnerAdd")),
    formElem: "adminPartnerAddForm",
    submitButtonId: "createSubmit",
    callback: "uploadTarget",
    form: true,
    create: true,
    initialize: function (params) {
        _.bindAll(this, "render", "bindEvents", "close", "addPhoto", "removePhoto", "findField", "submitAction");
        this.fields = [];
        BaseFormView.prototype.initialize.call(this);
        app.viewRegistration.register(this);
        params = params || {};
        if (params.partner) {
            this.render(params.partner);
        } else if (params.partnerId) {
            app.adminManager.fetchPartner(params.partnerId, {
                success: this.render,
                error: function() {
                    app.navigate("manage", true);
                }
            });
        } else {
            //Create new partner
            alert("invalid partner id");
            app.navigate("manage", true);
        }

    },

    render: function (partner) {
        this.partner = partner;
        this.action = AdminApiResource.admin_postPhoto + "/" + partner.get("partnerId");
        this.photoCount = 1;
        this.$el.append(this.template(partner._toJSON()));
        this.$photos = $("#entries");
        $("#searchResult").addClass("hidden");
        this.bindEvents();
    },
    bindEvents: function () {
        var that = this;
        BaseFormView.prototype.bindEvents.call(this);
        $("#addMore").on("click", this.addPhoto);
        $("#cancel").on("click", function () {
            app.manageView = new AdminManageView({type: "partner"});
            app.partnerView = new AdminPartnerView({partner: that.partner});
        });
        this.$photos.on("click", ".removeTeacher", function (e) {
            var id = Utilities.toInt(Utilities.getId(e.target.id));
            that.removeTeacherInfo(id);
        });
    },
    successCallback: function () {
        app.partnerView = new AdminPartnerView({partner: that.partner});
    },

    findField: function (field, context) {
        return field.get("fieldId") === this.rejectId;
    },
    submitAction: function () {
        document.getElementById(this.formElem).setAttribute('action', this.action + "?totalNumber=" + (this.photoCount - 1));
    },
    removePhoto: function (id) {
        BaseFormView.prototype.unbindFields.call(this);
        this.rejectId = "imgUrl" + id;
        this.fields = _.reject(this.fields, this.findField, this);
        $("#teacherBlock" + id).remove();
        this.photoCount--;
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
        var preview = $("#" + this.fields[this.photoCount - 1].get("previewId")), that = this;
        $("#imgUrl" + (this.photoCount)).on("change", preview, function (e) {
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
    form: false,
    initialize: function (params) {
        _.bindAll(this, "render", "bindEvents", "close", "removePhoto");
        this.fields = [];
        BaseFormView.prototype.initialize.call(this);
        app.viewRegistration.register(this);
        params = params || {};
        this.create = false;
        if (params.partner) {
            this.render(params.partner);
        } else if (params.partnerId) {
            app.adminManager.fetchPartner(params.partnerId, {
                success: this.render,
                error: function () {
                    app.navigate("manage", true);
                }
            });
        } else {
            app.navigate("manage", true);
        }

    },

    render: function (partner) {
        this.partner = partner;
        this.$el.append(this.template({entryTemplate: this.photoBlockTemplate, partner: partner._toJSON(), list: partner._toJSON().classPhotoList}));
        this.$photos = $("#entries");
        $("#searchResult").addClass("hidden");
        this.bindEvents();
    },
    bindEvents: function () {
        var that = this;
        BaseFormView.prototype.bindEvents.call(this);
        $("#cancel").on("click", function () {
            app.manageView = new AdminManageView({type: "partner"});
            app.partnerView = new AdminPartnerView({partner: that.partner});
        });
        this.$photos.on("click", ".removePhoto", function (e) {
            var id = Utilities.toInt(Utilities.getId(e.target.id));
            that.removePhoto(id);
        });
    },
    successCallback: function () {
        app.partnerView = new AdminPartnerView({partner: that.partner});
    },
    findField: function (field, context) {
        return field.get("fieldId") === this.rejectId;
    },
    removePhoto: function (id) {
        $("#photoBlock" + id).remove();
    },
    submitAction: function () {
        var i, $blocks = this.$photos.find(".photoBlock"), $block, id, photos = new Photos();
        for (i = 0; i < $blocks.length; i++) {
            $block = $($blocks[i]);
            id = Utilities.toInt($block.data("id"));
            photos.add(this.partner.get("classPhotoList").get(id));
        }
        this.partner.set("classPhotoList", photos);
    },
    close: function () {
        if (!this.isClosed) {
            this.isClosed = false;
            this.$el.empty();
        }
    }
});