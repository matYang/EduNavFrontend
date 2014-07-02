var AdminTeacherView = new BaseFormView.extend({
	el: "#teacherCRUDContainer",
    fields: [],
    formElem: "adminPartnerForm",
    submitButtonId: "teacherPostSubmit",
    callback: "uploadTarget",
    form:true,
    initialize: function(params){
        _.bindAll(this, "render", "bindEvents", "close");
        BaseFormView.prototype.initialize.call(this);
        app.viewRegistration.register(this);
        params = params || {};
        this.template = _.template(tpl.get("adminPartner"));
        this.action = AdminApiResource.admin_teacher;
        this.create = false;
        if (params.teacher) {
            this.render(params.teacher);
        } else if (params.teacherId){
            app.generalManager.fetchPartner(params.teacherId, {
                success: this.render,
                error: function(data) {
                    alert(data.responseText ? data.responseText : Resources.networkErrorText);
                    app.navigate("manage", true);
                }
            });
        } else {
            //Create new teacher
            this.create = true;
            this.render(new Teacher());
        }
        
    },

    render: function (teacher) {
        this.teacher = teacher;
        this.$el.append(this.template(teacher._toJSON()));
        if (this.create) {
            $("#adminPartnerForm").find(".detail").hide();
            $("#adminPartnerForm").find(".edit").show();
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
                var $edit = $("input[name="+attr+"]");
                if ($edit.attr("type") === "checkbox") {
                    $edit.prop("checked", json[attr]);
                }
                $edit.val(json[attr]);
            }
        });
        $("#deletePartner").on("click", function() {
            
        });
    },  
    successCallback: function () {
        app.navigate("manage/partner", true);
    },
    close: function () {
        if (!this.isClosed) {
            this.isClosed = false;
            this.$el.empty();
        }
    }
});