var AdminAdminView = BaseFormView.extend({
    el: "#adminCRUDContainer",
    fields: [],
    form: false,
    formElem: "adminAdminForm",
    submitButtonId: "adminPostSubmit",
    callback: "uploadTarget",
    initialize: function(params){
        _.bindAll(this, "render", "bindEvents", "close");
        BaseFormView.prototype.initialize.call(this);
        app.viewRegistration.register(this);
        params = params || {};
        this.template = _.template(tpl.get("adminAdmin"));
        this.action = AdminApiResource.admin_admin;
        this.create = false;
        this.fields = [
            new BaseField({
                name:"电话",
                fieldId: "adminPhone",
                fieldType: "text",
                mandatory: true,
                modelAttr: "phone"
            }),
            new BaseField({
                name:"名字",
                fieldId: "adminName",
                fieldType: "text",
                mandatory: true,
                modelAttr: "name"
            }),
            new BaseField({
                name:"密码",
                fieldId: "adminPassword",
                fieldType: "text",
                mandatory: true,
                modelAttr: "password"
            }),
            new BaseField({
                name:"确认密码",
                fieldId: "adminConfirm",
                fieldType: "text",
                mandatory: true,
                modelAttr: "confirmPassword"
            }),
            new BaseField({
                name:"权限",
                fieldId: "adminPrivilege",
                fieldType: "text",
                mandatory: true,
                modelAttr: "privilege"
            }),
        ];
        if (params.admin) {
            this.render(params.admin);
        } else if (params.adminId){

            app.adminManager.fetchAdmin(params.adminId, {
                success: this.render,
                error: function() {
                    app.navigate("manage/admin", true);
                }
            });
        } else {
            //Create new course
            this.create = true;
            this.model = new Admin();
            this.render(this.model);
        }
        
    },

    render: function (admin) {
        this.model = admin;
        this.$el.append(this.template(admin.toJSON()));
        if (this.create) {
            $("#adminAdminForm").find(".detail").hide();
            $("#adminAdminForm").find(".edit").show();
            $("#cancel").hide();
        } else {
            $("#adminAdminForm").find(".detail").show();
            $("#adminAdminForm").find(".edit").hide();
        }
        $("#adminAdminForm").children("div:even").css("background-color","#f0f0f0");
        $("#searchResult").addClass("hidden");
        this.bindEvents();
    },

    bindEvents: function () {
        var that = this;
        BaseFormView.prototype.bindEvents.call(this);
        $("#cancel").on("click", function () {
            $("#adminAdminForm").find(".edit").hide();
            $("#adminAdminForm").find(".detail").show();   
        });
        $("#editAdmin").on("click", function () {
            $("#adminAdminForm").find(".edit").show();
            $("#adminAdminForm").find(".detail").hide(); 
        });
    },  
    successCallback: function () {
        app.navigate("manage/admin", true);
    },

    submitAction: function () {
        var keys = {};
        keys.secret1 = $("#key1").val();
        keys.secret2 = $("#key2").val();
        keys.secret3 = $("#key3").val();
        if (this.create) {
            app.adminManager.createAdmin(this.model, {
                success: function (admin) {
                    app.navigate("manage/admin/"+admin.id, true);
                },
                error: function() {}
            }, keys);
        } else {
            app.adminManager.updateAdmin(this.model, {
                success: function () {},
                error: function() {}
            }, keys);
        }
    },
    close: function () {
        if (!this.isClosed) {
            this.isClosed = false;
            this.$el.empty();
        }
    }
});