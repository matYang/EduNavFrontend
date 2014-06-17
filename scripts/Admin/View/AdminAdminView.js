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
        var apis = new AdminApiResource();
        this.template = _.template(tpl.get("adminAdmin"));
        this.action = apis.admin_admin;
        this.newAdmin = false;
        if (params.admin) {
            this.render(params.admin);
        } else if (params.adminId){

            app.generalManager.fetchCourse(params.adminId, {
                success: this.render,
                error: function() {
                    app.navigate("manage/admin", true);
                }
            });
        } else {
            //Create new course
            this.newAdmin = true;
            this.model = new Admin();
            this.render(this.model);
        }
        
    },

    render: function (admin) {
        this.model = admin;
        debugger;
        this.$el.append(this.template(admin.toJSON()));
        if (this.newAdmin) {
            $("#adminAdminForm").find(".detail").hide();
            $("#adminAdminForm").find(".edit").show();
            $("#cancel").hide();
        } else {
        	debugger;
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
    	app.adminManager.createAdmin(this.model, {
    		success: function () {},
    		error: function() {}
    	}, keys);
    },
    close: function () {
        if (!this.isClosed) {
            this.isClosed = false;
            this.$el.empty();
        }
    }
});