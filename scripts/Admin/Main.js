//IE 8 fallBack for placeholders
$('input, textarea').placeholder();

var AppRouter = Backbone.Router.extend({

    routes: {
        "": "defaultRoute",
        "login": "login",
        "manage":"manage",
        "manage/*type":"manage",
        "*default" : "defaultRoute"
    },

    initialize: function () {
        //initializing the registration service, now views should be hooked to DOM via registration
        this.viewRegistration = new ViewRegistrationService ();
        //initializing the storage services, some resuable user information will be persisted by local storage
        this.storage = new StorageService ();
        this.eventClearService = new EventClearService();

        //initializing all the data managers
        this.sessionManager = new SessionManager ();
        this.userManager = new UserManager (this.sessionManager);
        this.adminManager = new AdminManager (this.sessionManager);

        //determine if the user has logged in or not
        var that = this;
        this.sessionManager.fetchSession(false, {
            success: function () {
                Info.log("session fetch success");
                if (that.loginView) {
                    that.loginView.close();
                }
                that.baseView = new AdminBaseView();    
            },
            error: function () {
                Info.log("session fetch failed, user not logged in");
            }
        });
        this.userLocation = new UserLocation ();
        this.curDate = new Date ();
        this.searchResult = new Courses ();
    },
    defaultRoute: function () {
        this.navigate("login", true);
    },
    login: function () {
        this.loginView = new AdminLoginView();

    },
    manage: function (type) {
        if (!this.sessionManager.hasSession()) {
            this.navigate("login", true);
        } else if (!this.baseView) {
            this.baseView = new AdminBaseView();
        }
        this.manageView = new AdminManageView({type:type});
    }
});

//warning: tpl is the global object for templating services, do not name any variable "tpl" in any context in any files
tpl.loadTemplates(AdminConstants.templateResources, 'scripts/admin/adminTemplate.js', function () {
    app = new AppRouter ();
    // app.sideBarView = new sideBarView();
    Backbone.history.start();
});

