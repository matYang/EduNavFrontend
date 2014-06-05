var AdminPartnerView = BaseFormView.extend({
	el: "#partnerCRUDContainer",
    fields: [],
    formElem: "adminPartnerForm",
    submitButtonId: "partnerPostSubmit",
    callback: "uploadTarget",
    initialize: function(params){
        _.bindAll(this, "render", "bindEvents", "close");
        BaseFormView.prototype.initialize.call(this);
        app.viewRegistration.register("adminPartner", this, true);
        params = params || {};
        var apis = new AdminApiResource();
        this.template = _.template(tpl.get("adminPartner"));
        this.action = apis.admin_partner;
        this.newPartner = false;
        if (params.partner) {
            this.render(params.partner);
        } else if (params.partnerId){
            app.generalManager.fetchPartner(params.partnerId, {
                success: this.render,
                error: function() {
                    app.navigate("manage", true);
                }
            });
        } else {
            //Create new partner
            this.newPartner = true;
            this.partner = new Partner();
            this.render(this.partner);
        }
        
    },

    render: function (partner) {
        this.partner = partner;
        this.$el.append(this.template(partner.toJSON()));
        if (this.newPartner) {
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