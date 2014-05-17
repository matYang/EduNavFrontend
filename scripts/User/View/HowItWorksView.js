var HowItWorksView = Backbone.View.extend({

    el: "#content",
    currentPage: "driver",

    initialize: function (messageIdWrapper) {
        app.viewRegistration.register("HowItWorkds", this, true);
        _.bindAll(this, "render", "close");
        this.baseTemplate = _.template(tpl.get('howItWorks_base'));
        this.driverTemplate = _.template(tpl.get('howItWorks_driver'));
        this.passengerTemplate = _.template(tpl.get('howItWorks_passenger'));
        this.render();
        this.isClosed = false;
    },
    render: function () {
        this.$el.append(this.baseTemplate);
        this.$table = this.$el.find("table").append(this.driverTemplate);
        this.bindEvents();
    },
    bindEvents: function () {
        var that = this;
        $("#howItWorks_tabs").on("click", "li", function (e) {
            var clicked = $(e.target).attr("data-id");
            if ( clicked === that.currentPage ) {
                return;
            }
            that.currentPage = clicked;
            $("#howItWorks_tabs").children("li").removeClass("active");
            $("#howItWorks_tabs").find("span").remove();
            $(e.target).addClass("active").append("<span></span>");
            if (clicked === "driver") {
                that.$table.empty().append(that.driverTemplate);
            } else {
                that.$table.empty().append(that.passengerTemplate);
            }
        })
    },

    close: function () {
        if (!this.isClosed) {
            $("#howItWorks_tabs").off();
            this.$el.empty();
            this.isClosed = true;
        }
    }
});
