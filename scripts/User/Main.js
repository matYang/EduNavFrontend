//IE 8 fallBack for placeholders
$('input, textarea').placeholder();

var AppRouter = Backbone.Router.extend({

    routes: {
        "": "defaultRoute",

        "front": "front",
        "search": "search",
        "search/*search": "encodedSearch",

        "mypage": "mypage",
        "mypage/*query": "mypage",

        "course/:courseId": "courseDetail",
        "course/:courseId/": "courseDetail",
        "compare/*courses": "compare",
        "register": "register",
        "register/*registerState": "register",
        "lost/": "lost",
        "lost" : "lost",
        "forgetPassword/*token" : "lost",

        "emailActivation/*authKey": "emailActivation",
        // "howitworks": "howItWorks",
        // "service": "serviceCenter",
        // "service/*tab": "serviceCenter",

        "*default" : "front"
    },

    initialize: function () {
        //initializing the registration service, now views should be hooked to DOM via registration
        this.viewRegistration = new ViewRegistrationService ();
        //initializing the storage services, some resuable user information will be persisted by local storage
        this.storage = new StorageService ();

        this.locationService = new LocationService();
        this.eventClearService = new EventClearService();

        //initializing all the data managers
        this.generalManager = new GeneralManager ();
        this.sessionManager = new SessionManager ();
        this.userManager = new UserManager (this.sessionManager);
     
        this.sessionManager.fetchSession(false, {
            success: function () {
                Info.log("session fetch success");
            },
            error: function () {
                Info.log("session fetch failed, user not logged in");
            }
        });

        //intializing search query states & filter states, look into localStorage to find previous history
        this.searchQueryState = this.storage.getSearchQueryState();
        this.searchFilterState = this.storage.getSearchFilterState();

        this.curDate = new Date ();
        this.searchResult = new Courses ();
        this.bindGlobalLinks();
    },
    bindGlobalLinks: function() {
        var that = this;
        $("#footer_service_link").on("click", 'a', function (e) {
            e.preventDefault();
            $("html, body").animate({ scrollTop: 0, complete: function(){ $("#loginBox").show();} }, "slow");
            that.navigate("service/" + e.target.id.split("_")[1], true);
        });
    },
    defaultRoute: function () {
        //if login, procees to main/:id, if not, proceed to front
        if (this.sessionManager.hasSession()) {
            this.navigate("main", {trigger: true});
        } else {
            this.navigate("front", {trigger: true});
        }
    },

    front: function () {
        this.frontPageVew = new FrontPageView();
    },

    search: function () {
        this.searchView = new SearchView();
    },

    encodedSearch: function (encodedSearchKey) {
        this.searchVew = new SearchView ({
            "searchKey": encodedSearchKey
        });
        // this.advertisementView = new AdvertisementView ();
    },

    mypage: function (query) {
        if (!this.sessionManager.hasSession()) {
            this.navigate("front", {trigger: true, replace: true});
            return;
        }
        
        this.personalView = new PersonalView ({query:query});
    },

    courseDetail: function (messageId) {
        this.courseDetailView = new CourseDetailView ({
            'courseId': courseId
        });
    },

    compare: function (courses) {
        var courseIdList = courses.split("_");
        this.compareView = new CompareView({courseIds: courseIdList});
    },

    register: function (registrationState) {
        if (this.sessionManager.hasSession()) {
            this.navigate("main", true);
            return;
        }
        if (this.registrationView && !this.registrationView.isClosed) {
            this.registrationView.state = registrationState;
            this.registrationView.render();
        } else {
            this.registrationView = new RegistrationView ({"state":registrationState});
        }
        
    },

    lost: function (token) {
        this.findPasswordView = new FindPasswordView({"token":token});
    },

    emailActivation: function (authKey) {
        var self = this;
        this.userManager.activateAccount(authKey, {
            success: function () {
                self.sessionManager.fetchSession(true, {
                    success: function () {
                        Info.log("session fetch success");
                        app.letterView = new LetterView({
                            "toUserId": app.storage.getLastContact()
                        });
                        self.navigate("/main", true);
    
                    },
                    error: function () {
                        Info.log("session fetch failed, user not logged in");
                    }
                });

            },
            error: function (response) {
                Info.alert('Email验证失败');
            }
        });
    // },
    // howItWorks: function() {
    //     this.howItWorks = new HowItWorksView();
    // },
    // serviceCenter: function(tab) {
    //     if (!tab) {
    //         this.navigate("service/about", {replace: true});
    //     }
    //     this.serviceCenter = new ServiceCenterView({"tab":tab});
    }
});

//warning: tpl is the global object for templating services, do not name any variable "tpl" in any context in any files
tpl.loadTemplates(Constants.templateResources, 'scripts/User/Templates.js', function () {
    app = new AppRouter ();
    app.topBarView = new TopBarView ();
    Backbone.history.start();
    if (app.sessionManager.hasSession()) {
        // create letter view if use is logged in.
        app.letterView = new LetterView({
            "toUserId": app.storage.getLastContact()
        });
        $("#chat").show();
    }
});

