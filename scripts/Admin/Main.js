//IE 8 fallBack for placeholders
$('input, textarea').placeholder();

var AppRouter = Backbone.Router.extend({

    routes: {
        "": "defaultRoute",
        "login": "login",
        "manage/:type":"manage",
        "manage/:type/q:query":"manage",
        "manage/course/:id": "course",
        "manage/user/:id": "user",
        "manage/booking/:id": "booking",
        "manage/admin/:id": "admin",
        "manage": "manage",
        "*default" : "defaultRoute"
    },

    initialize: function () {
        //initializing the registration service, now views should be hooked to DOM via registration
        this.viewRegistration = new ViewRegistrationService ();
        //initializing the storage services, some resuable user information will be persisted by local storage
        this.storage = new StorageService ();
        this.eventClearService = new EventClearService();

        //initializing all the data managers
        this.sessionManager = new SessionManager (EnumConfig.ModuleIdentifier.admin);

        this.generalManager = new GeneralManager (this.sessionManager);
        this.adminManager = new AdminManager (this.sessionManager);

        //determine if the user has logged in or not
        var that = this;
        this.sessionManager.fetchSession(false, {
            success: function () {
                Info.log("session fetch success");
                if (that.loginView) {
                    that.loginView.close();
                }
                that.navigate("manage/user");
            },
            error: function () {
                Info.log("session fetch failed, user not logged in");
            }
        });
        this.curDate = new Date ();

    },
    defaultRoute: function () {
        if (!this.sessionManager.hasSession()) {
            this.navigate("login", {trigger:true, replace:true});
        }
        this.navigate("manage", {trigger:true, replace:true});
    },
    login: function () {
        if (this.sessionManager.hasSession()) {
            this.navigate("manage", true);
        } else {
            this.loginView = new AdminLoginView();
        }
    },
    manage: function (type, query) {
        if (!this.sessionManager.hasSession()) {
            this.navigate("login", {trigger:true, replace:true});
            return;
        } else if (!this.baseView) {
            this.baseView = new AdminBaseView(this.sessionManager);
            type = type || "user";
        }
        if (!this.manageView) {
            this.manageView = new AdminManageView({type:type, query:query});
        } else {
            if (!this.manageView.isClosed) {
                this.manageView.switchView(type, query);
            } else {
                this.manageView.$el.append(this.manageView.baseTemplate);
                this.manageView.switchView(type, query);
            }
        }
    },
    course: function (id) {
        if (!this.sessionManager.hasSession()) {
            this.navigate("login", {trigger:true, replace:true});
        } else if (!this.baseView) {
            this.baseView = new AdminBaseView(this.sessionManager);
        }
        this.manageView = new AdminManageView({type:"course"});
        if (id) {
            this.courseView = new AdminCourseView({courseId:id});
        }
    },
    user: function (id) {
        if (!this.sessionManager.hasSession()) {
            this.navigate("login", {trigger:true, replace:true});
        } else if (!this.baseView) {
            this.baseView = new AdminBaseView(this.sessionManager);
        }
        this.manageView = new AdminManageView({type:"user"});
        if (id) {
            this.userView = new AdminUserView({userId:id});
        }
    },
    booking: function (id) {
        if (!this.sessionManager.hasSession()) {
            this.navigate("login", {trigger:true, replace:true});
        } else if (!this.baseView) {
            this.baseView = new AdminBaseView(this.sessionManager);
        }
        this.manageView = new AdminManageView({type:"booking"});
        if (id) {
            this.courseView = new AdminBookingView({bookingId:id});
        }
    },
    admin: function (id) {
        if (!this.sessionManager.hasSession()) {
            this.navigate("login", {trigger:true, replace:true});
        } else if (!this.baseView) {
            this.baseView = new AdminBaseView(this.sessionManager);
        }
        this.manageView = new AdminManageView({type:"admin"});
        if (id) {
            this.adminView = new AdminAdminView({adminId:id});
        }
    },
});

//warning: tpl is the global object for templating services, do not name any variable "tpl" in any context in any files

tpl.loadTemplates(AdminConstants.templateResources, 'scripts/Admin/Template.js', function () {

    app = new AppRouter ();
    // app.sideBarView = new sideBarView();
    Backbone.history.start();
});

