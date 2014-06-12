//IE 8 fallBack for placeholders
$('input, textarea').placeholder();

var AppRouter = Backbone.Router.extend({

    routes: {
        "": "defaultRoute",

        "front": "front",
        "search": "search",
        "search/*search": "encodedSearch",

        "mypage": "mypage",
        "mypage/booking/:id": "myBooking",
        "mypage/:view": "mypage",

        "course/:courseId": "courseDetail",
        "course/:courseId/": "courseDetail",
        
        "booking/c:courseId": "newBooking",
        "booking/b:bookingId": "booking",

        "compare": "compare",
        "register": "register",
        "register/*registerState": "register",
        "lost/": "lost",
        "lost" : "lost",
        "forgetPassword/*token" : "lost",
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

        this.eventClearService = new EventClearService();

        //initializing all the data managers
        this.sessionManager = new SessionManager (EnumConfig.ModuleIdentifier.user);
        this.generalManager = new GeneralManager (this.sessionManager);
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
        this.compareList = this.storage.getCoursesToCompare();
        
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
            this.navigate("search", {trigger: true});
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
    myBooking: function (id) {
        if (!this.sessionManager.hasSession()) {
            this.navigate("front", {trigger: true, replace: true});
            return;
        }
        if (this.myPageView && !this.myPageView.isClosed) {
            this.myPageView.query = "bookingDetail";
            this.myPageView.bookingId = id;
            this.myPageView.createChildView();
        } else {
            this.myPageView = new MyPageView ({query:"bookingDetail", bookingId: id});
        }
    },
    mypage: function (query) {
        if (!this.sessionManager.hasSession()) {
            this.navigate("front", {trigger: true, replace: true});
            return;
        }
        
        this.myPageView = new MyPageView ({query:query});
    },

    courseDetail: function (courseId) {
        this.courseDetailView = new CourseDetailView ({
            'courseId': Utilities.toInt(courseId)
        });
    },

    newBooking:function (courseId) {
        this.newBookingView = new NewBookingView({courseId:courseId});
    },
    booking: function (bookingId) {

    },

    compare: function () {
        this.compareView = new CompareView();
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

});

//warning: tpl is the global object for templating services, do not name any variable "tpl" in any context in any files
tpl.loadTemplates(Constants.templateResources, 'scripts/User/Templates.js', function () {
    app = new AppRouter ();
    app.topBarView = new TopBarView ();
    Backbone.history.start();
    console.log("Wow, Congratulations!");
    console.log("はい、榛名は大丈夫です!");
});

