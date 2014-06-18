var AdminUserView = BaseFormView.extend({
    el:"#main_content",
    form: false,
    submitButtonId: "userSubmit",
    initialize: function (params) {
        this.isClosed = false;
        app.viewRegistration.register(this);
        _.bindAll(this, "render", "bindEvents", "close");
        this.template = _.template(tpl.get("adminUser"));
        this.newUser = false;
        this.fields = [
            new BaseField({
                name: "手机",
                fieldId: "userPhone",
                type: "text",
                mandatory: true,
                validatorFunction: this.phoneValid,
                modelAttr: "phone",
                
            }),
            new BaseField({
                name: "名字",
                fieldId: "userName",
                type: "text",
                mandatory: true,
                modelAttr: "name",
                
            }),
            new BaseField({
                name: "邮箱",
                fieldId: "userEmail",
                type: "text",
                mandatory: false,
                modelAttr: "email",
                
            })  
        ];
        if (!params.user) {
            this.userId = params.userId;
            var that = this;
            app.adminManager.fetchUser(this.userId, {
                success: this.render,
                error: function () {
                }
            });
        } else if (params.user) {
            this.user = params.user;
        } else {
            this.newUser = true;
        }
    },
    render: function (user) {
        this.model = user || new User();
        this.$el.append(this.template(this.model.toJSON()));
        $("#searchResult").addClass("hidden");
        if (this.newUser) {
            $("#adminUserForm").find(".edit").show();
            $("#adminUserForm").find(".detail").hide(); 
        } else {
            $("#adminUserForm").find(".detail").show();
            $("#adminUserForm").find(".edit").hide();
            
        }
        this.bindEvents();
    },
    bindEvents: function () {
        BaseFormView.prototype.bindEvents.call(this);
        $("#cancel").on("click", function () {
            $("#adminUserForm").find(".detail").show();
            $("#adminUserForm").find(".edit").hide();
        });
        $("#editUser").on("click", function () {
            $("#adminUserForm").find(".edit").show();
            $("#adminUserForm").find(".detail").hide(); 
        });
    },
    close: function() {
        if (!this.isClosed) {
            this.isClosed = true;
            this.$el.empty();
        }
    },
    submitAction: function () {
        app.adminManager.updateUser(this.model, {
            success: function (admin) {
                app.navigate("manage/admin/"+ admin.id);
                $("#adminUserForm").find(".detail").show();
                $("#adminUserForm").find(".edit").hide();
            },
            error: function () {

            }
        });
    },
    passValid: function (val) {
        var p1 = $("#password").val(), p2 = $("#passwordConfirm").val();
        if ( p1 !== p2 ) {
            return {valid: false, text:"密码长度至少为6位"};
        } else if (val.length < 6 ){
            return {valid: false, text:"两次输入密码不匹配"};
        } else {
            return {valid:true};
        }
    },
    phoneValid: function(val) {
        if (!val || val.length !== 11 || isNaN(parseInt(val,10)) ){
            return {valid: false, text:"手机号码格式不正确"};
        } else {
            return {valid: true};
        }
    }
});