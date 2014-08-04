var ServiceCenterView = Backbone.View.extend({
    el: "#content",
    aboutUsPage: _.template(tpl.get('aboutUs')),
    joinUsPage: _.template(tpl.get('joinUs')),
    helpPage: _.template(tpl.get('help')),
    contactUsPage: _.template(tpl.get('contactUs')),
    advisePage: _.template(tpl.get('advise')),
    initialize: function (params) {
        this.currentTab = params ? params.tab || "about" : "about";
        this.isClosed = false;
        app.viewRegistration.register(this);
        _.bindAll(this, "render", "close");
        this.render();
    },

    render: function () {
        var that = this;
        // if ($("#terms_lang").length) {
        //     $("#terms_lang").off();
        // }
        switch (this.currentTab) {
        case "about":
            this.$el.empty().append(this.aboutUsPage);
            break;
        case "join":
            this.$el.empty().append(this.joinUsPage);
            break;
        case "contactUs":
            this.$el.empty().append(this.contactUsPage);
            break;
        case "advise":
            this.$el.empty().append(this.advisePage);
            break;
        case "help":
            this.$el.empty().append(this.helpPage);
            break;
        // case "faq":
        //     this.$contentEl.empty().append(this.faqPage);
        //     break;
        // case "career":
        //     this.$contentEl.empty().append(this.careerPage);
        //     break;
        // case "term":
        //     this.$contentEl.empty().append(this.termsPage);
        //     $("#terms_content").append(this.termsZhPage);
        //     $("#terms_lang").off().on("click", "li", function (e) {
        //         $(e.delegateTarget).find(".active").removeClass("active");
        //         if ($(e.target).addClass("active").attr("data-id") === "zh") {
        //             $("#terms_content").empty().append(that.termsZhPage);
        //         } else {
        //             $("#terms_content").empty().append(that.termsEnPage);
        //         }
        //     });
        //     break;
        // case "feedback":
        //     this.$contentEl.empty().append(this.feedbackPage);
        //     break;
        default:
            break;
        }
    },
    close: function () {
        if (!this.isClosed) {
            this.$el.empty();
            this.isClosed = true;
        }
    }
});