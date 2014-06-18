var AdminBaseView = Backbone.View.extend({
    el:"body",
    initialize: function(sessionManager) {
        _.bindAll(this, "render", "bindEvents", "close");
        this.sessionManager = sessionManager;
        app.viewRegistration.register(this);
        this.isClosed = false;
        this.baseTemplate = _.template(tpl.get('adminBase'))
        this.render();
        this.bindEvents();
        this.sidebarShown = true;
    },
    render: function () {
        this.$el.attr("class", "").append(this.baseTemplate);
    },
    bindEvents: function () {
        var that = this;
        $("#userManage").on("click", function(){
            that.goto("user");
        });
        $("#partnerManage").on("click", function(){
            that.goto("partner");
        });
        $("#courseManage").on("click", function(){
            that.goto("course");
        });
        $("#bookingManage").on("click", function(){
            that.goto("booking");
        });
        $("#adminManage").on("click", function(){
            that.goto("admin");
        });
        $("#logout").on("click", function (e) {
            that.sessionManager.logout({
                success: function () {
                    that.close();
                    app.navigate("login", true);
                },
                error: function () {

                }
            });
        });
    },
    goto: function (dest) {
        $(".active").removeClass("active");
        $("#" + dest + "Manage").addClass("active");
        app.navigate("manage/" + dest, true);
    },
    close: function () {
        if (!this.isClosed) {
            this.isClosed = true;
            $("#sideBarClose").off();
            this.$el.empty();
        }
    }


});
