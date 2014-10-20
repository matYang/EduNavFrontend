//IE 8 fallBack for placeholders
$('input, textarea').placeholder();
//配置ajax
$.ajaxSetup({
    headers: {
        'Content-Type': 'application/json'
    },
    dataType: 'json'
});


var AppRouter = Backbone.Router.extend({

    routes: {
        "": "home",
        //课程搜索
        "search": "search",
        "search/*search": "encodedSearch",

        //机构搜索(inst-->parnter使用inst对应后台的partner)
        "inst/search": "partnerSearch",
        "inst/search/*search": "partnerEncodedSearch",
        "inst/:partnerId": "partnerDetail",

        "mypage": "mypage",
        "mypage/booking/:id": "myBooking",
        "mypage/tbooking/:id": "myTBooking",
        "mypage/booking/:id/pay": "myBookingPay",
        "mypage/:view": "mypage",

        //todo 课程团购
        'tuan': 'tuan',
        'tuan/:tuanId': 'tuanDetail',

        //课程详情
        "course/:courseId": "courseDetail",
        "course/:courseId/": "courseDetail",
        //订单生成
        "booking/c:courseId": "newBooking",//新建booking
//        "booking/b:bookingId": "booking",//修改booking 暂不使用
        //课程对比
        "compare": "compare",
        "compare/*anything": "compare",
        //注册
        "register": "register",
        "register/ref=*ref": "register",
        "register/invite=*invite": "inviteRegister",
        //忘记密码
        "lost/": "lost",
        "lost": "lost",
        "forgetPassword/*token": "lost",
        // "howitworks": "howItWorks",
        //底部链接
        "service": "serviceCenter",
        "service/:tab": "serviceCenter",

        "error/pay/ref=*ref": 'errorPay',

        "*default": "error"
    },

    initialize: function () {
        //initializing the registration service, now views should be hooked to DOM via registration
        this.viewRegistration = new ViewRegistrationService();
        //initializing the storage services, some resuable user information will be persisted by local storage
        this.storage = new StorageService();
        this.eventClearService = new EventClearService();
        this.cache = new CacheService();
        //initializing all the data managers
        this.sessionManager = new SessionManager();
        this.generalManager = new GeneralManager();
        this.userManager = new UserManager(this.sessionManager);
        this.infoModal = new InfoModal();
        $.ajaxSetup({
            cache: false //close AJAX cache
        });
        this.sessionManager.fetchSession(false, {
            success: function () {
                Info.log("session fetch success");
            },
            error: function () {
                Info.log("session fetch failed, user not logged in");
                //todo here should clear cookie
            }
        });

        //intializing search query states & filter states, look into localStorage to find previous history
        this.compareList = this.storage.getCoursesToCompare();

        this.bindGlobalLinks();
    },
    //全局的点击事件绑定(footer中的链接)
    bindGlobalLinks: function () {
        var that = this;
        $("#footer_service_link").on("click", 'a', function (e) {
            e.preventDefault();
            $("html, body").animate({ scrollTop: 0, complete: function () {
                $("#loginBox").show();
            } }, "slow");
            that.navigate("service/" + e.target.id.split("_")[1], true);
        });
    },

    home: function () {
        this.homePageView = new HomePageView();
    },

    //机构搜索（带参数） 以及详情查看
    partnerSearch: function () {
        this.partnerSearchView = new PartnerSearchView();
    },
    partnerEncodedSearch: function (encodedSearchKey) {
        this.partnerSearchView = new PartnerSearchView({
            "searchKey": encodedSearchKey
        });
    },
    partnerDetail: function (partnerId) {
        this.partnerDetailView = new PartnerDetailView({
            'partnerId': Utilities.toInt(partnerId)
        });
    },

    //团购页面和详情页
    tuan: function () {
        this.tuanView = new TuanView();
    },
    tuanDetail: function (tuanId) {
        this.tuanDetailView = new TuanDetailView({
            'tuanId': Utilities.toInt(tuanId)
        });
    },

    //课程搜索 课程详情查看
    search: function () {
        this.searchView = new SearchView();
    },
    encodedSearch: function (encodedSearchKey) {
        this.searchView = new SearchView({
            "searchKey": encodedSearchKey
        });
        // this.advertisementView = new AdvertisementView ();
    },
    courseDetail: function (courseId) {
        this.courseDetailView = new CourseDetailView({
            'courseId': Utilities.toInt(courseId)
        });
    },
    //课程对比
    compare: function () {
        this.compareView = new CompareView();
    },

    //个人中心页面
    mypage: function (query) {
        if (!this.sessionManager.hasSession()) {
            this.navigate("home", {trigger: true, replace: true});
            return;
        }
        this.myPageView = new MyPageView({query: query});
    },
    //我的试听申请订单
    myBooking: function (id) {
        if (!this.sessionManager.hasSession()) {
            this.navigate("home", {trigger: true, replace: true});
            return;
        }
        if (this.myPageView && !this.myPageView.isClosed) {
            this.myPageView.query = "bookingDetail";
            this.myPageView.reference = id;
            this.myPageView.createChildView();
        } else {
            this.myPageView = new MyPageView({query: "bookingDetail", reference: id});
        }
    },
    //我的团购订单
    myTBooking: function (id) {
        if (!this.sessionManager.hasSession()) {
            this.navigate("home", {trigger: true, replace: true});
            return;
        }
        if (this.myPageView && !this.myPageView.isClosed) {
            this.myPageView.query = "tbookingDetail";
            this.myPageView.reference = id;
            this.myPageView.createChildView();
        } else {
            this.myPageView = new MyPageView({query: "tbookingDetail", reference: id});
        }
    },
    myBookingPay: function (id) {
        //BookingPayView
        if (!this.sessionManager.hasSession()) {
            this.navigate("home", {trigger: true, replace: true});
            return;
        }
        this.myPagePayView = new BookingPayView({bookingId: id});
    },


    newBooking: function (courseId) {
        this.newBookingView = new NewBookingView({courseId: courseId});
    },
    //修改订单 暂不使用
//    booking: function (bookingId) {
//        this.bookingEditView = new NewBookingView({reference: bookingId});
//    },


    register: function (ref) {
        if (this.sessionManager.hasSession()) {
            this.navigate("main", true);
            return;
        }
        this.registrationView = new RegistrationView({"ref": ref});
    },
    inviteRegister: function (invite) {
        if (this.sessionManager.hasSession()) {
            this.navigate("main", true);
            return;
        }
        this.registrationView = new RegistrationView({"invite": invite});
    },

    lost: function () {
        this.findPasswordView = new FindPasswordView();
    },
    error: function () {
        app.navigate("search", {trigger: true, replace: true});
    },
    serviceCenter: function (tab) {
        this.serviceCenterView = new ServiceCenterView({tab: tab});
    },
    errorPay: function (ref) {
        this.errorPayView = new ErrorPayView({"ref": ref});
    }
});

//warning: tpl is the global object for templating services, do not name any variable "tpl" in any context in any files

(function () {
    app = new AppRouter();
    app.topBarView = new TopBarView();
    app.sideBarView = new SiderBarView();
    Backbone.history.start();
    $(window).unload(function () {
        localStorage.cache = JSON.stringify(app.cache.cache);
    });
    // $("body").append("<script type='text/javascript' src='http://tb.53kf.com/kf.php?arg=10074249&style=1'> </script>");
})();