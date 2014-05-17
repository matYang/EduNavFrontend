var ServiceCenterView = Backbone.View.extend({
    el: "#content",
    initialize: function(params){
        this.currentTab = params ? params.tab || "about" : "about";
        this.isClosed = false;
        app.viewRegistration.register("serviceCenter", this, true);
        _.bindAll(this, "preRender", "render", "bindEvents", "close");
        this.baseTemplate = _.template(tpl.get('serviceCenter_base'));
        this.aboutUsPage = _.template(tpl.get('serviceCenter_aboutUs'));
        this.feedbackPage = _.template(tpl.get('serviceCenter_feedback'));
        this.termsPage = _.template(tpl.get('serviceCenter_terms'));
        this.termsZhPage = _.template(tpl.get('serviceCenter_terms_zh'));
        this.termsEnPage = _.template(tpl.get('serviceCenter_terms_en'));
        this.faqPage = _.template(tpl.get('serviceCenter_faq'));
        this.careerPage = _.template(tpl.get('serviceCenter_career'));
        this.preRender();
        this.render();
        this.bindEvents();
    },
    preRender: function() {
        this.$el.append(this.baseTemplate);
        this.$contentEl = $("#help_content");
        $("#serviceTab").find(".active").removeClass("active");
        $("dd[data-id="+this.currentTab+"]").addClass("active");
    },
    render: function (){
        if ($("#terms_lang").length){
            $("#terms_lang").off();
        }
        switch(this.currentTab){
            case "about":
                this.$contentEl.empty().append(this.aboutUsPage);
                $("#aboutUs_toTerms").off().on("click", function (e) {
                    e.preventDefault();
                    that.currentTab = "term";
                    app.navigate("/service/term")
                    that.render();
                });
                break;
            case "faq":
                this.$contentEl.empty().append(this.faqPage);
                break;
            case "career":
                this.$contentEl.empty().append(this.careerPage);
                break;
            case "term":
                this.$contentEl.empty().append(this.termsPage);
                $("#terms_content").append(this.termsZhPage);
                var that = this;
                $("#terms_lang").off().on("click", "li", function (e) {
                    $(e.delegateTarget).find(".active").removeClass("active");
                    if ($(e.target).addClass("active").attr("data-id") === "zh") {
                        $("#terms_content").empty().append(that.termsZhPage);
                    } else {
                        $("#terms_content").empty().append(that.termsEnPage);
                    }
                });
                break;
            case "feedback":
                this.$contentEl.empty().append(this.feedbackPage);
                break;
            default:
            break;
        }
    },
    bindEvents: function (){
        var that = this;
        $("#serviceTab").on("click", "dd", function (e) {
            $("#terms_lang").off();
            $(e.delegateTarget).find(".active").removeClass("active");
            that.currentTab = $(e.target).addClass("active").attr("data-id");
            app.navigate("/service/"+that.currentTab)
            that.render();
        });
    },
    close: function (){
        if (!this.isClosed){
            $("#serviceTab").off();
            $("#terms_lang").off();
            this.$el.empty();
            this.isClosed = true;
        }
    }
});