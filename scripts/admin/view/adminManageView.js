var AdminUserSearchResultView = MultiPageView.extend({
    initialize: function (allMessages, messageList) {
        _.bindAll(this, 'render', 'entryEvent', 'close');
        this.messages = messageList;
        this.allMessages = allMessages;
        this.entryTemplate = _.template(tpl.get('adminUserRow'));
        this.pageNumberClass = "searchResultPageNumber";
        this.pageNumberId = "searchResultPageNumber";
        this.pageNavigator = "userSearchNavigator";
        this.pageNavigatorClass = "page clearfix";
        this.user = app.sessionManager.sessionModel;
        this.entryHeight = 71;
        this.pageEntryNumber = 10;
        this.entryClass = "userResult";
        this.actionClass = "view";
        this.entryContainer = "searchResultContainer";
        this.$domContainer = $("#searchResultContainer");
        this.isClosed = false;
        this.pnc = true;
        this.render();
    },
    render: function () {
        MultiPageView.prototype.render.call(this);
    },
    entryEvent: function (id) {
        app.navigate("course/"+id, true);
    },
    close: function () {
        this.$domContainer.empty();
    }
});

var AdminCourseSearchResultView = MultiPageView.extend({
    initialize: function (allMessages, messageList) {
        _.bindAll(this, 'render', 'entryEvent', 'close');
        this.messages = messageList;
        this.allMessages = allMessages;
        this.entryTemplate = _.template(tpl.get('adminCourseRow'));
        this.pageNumberClass = "searchResultPageNumber";
        this.pageNumberId = "searchResultPageNumber";
        this.pageNavigator = "bookingSearchNavigator";
        this.pageNavigatorClass = "page clearfix";
        this.user = app.sessionManager.sessionModel;
        this.entryHeight = 71;
        this.pageEntryNumber = 10;
        this.entryClass = "courseResult";
        this.actionClass = "view";
        this.entryContainer = "searchResultContainer";
        this.$domContainer = $("#searchResultContainer");
        this.isClosed = false;
        this.pnc = true;
        this.render();
        this.bindEvents();
    },
    render: function () {
        MultiPageView.prototype.render.call(this);
    },
    entryEvent: function (id) {
        app.navigate("course/"+id, true);
    },
    bindEvents: function () {
        $("#createCourse").on("click", function(){
            $(this).addClass("active");
            $("#updateCourse").removeClass("active");
            $("#createCourseContent").removeClass("hidden");
            $("#updateCourseContent").addClass("hidden");
        });
        $("#updateCourse").on("click", function(){
            $(this).addClass("active");
            $("#createCourse").removeClass("active");
            $("#updateCourseContent").removeClass("hidden");
            $("#createCourseContent").addClass("hidden");
        });
    },
    close: function () {
        this.$domContainer.empty();
    }
});

var AdminBookingSearchResultView = MultiPageView.extend({
    initialize: function (allMessages, messageList) {
        _.bindAll(this, 'render', 'entryEvent', 'close');
        this.messages = messageList;
        this.allMessages = allMessages;
        this.entryTemplate = _.template(tpl.get('adminBookingRow'));
        this.pageNumberClass = "searchResultPageNumber";
        this.pageNumberId = "searchResultPageNumber";
        this.pageNavigator = "bookingSearchNavigator";
        this.pageNavigatorClass = "page clearfix";
        this.user = app.sessionManager.sessionModel;
        this.entryHeight = 71;
        this.pageEntryNumber = 10;
        this.entryClass = "bookingResult";
        this.actionClass = "view";
        this.entryContainer = "searchResultContainer";
        this.$domContainer = $("#searchResultContainer");
        this.isClosed = false;
        this.pnc = true;
        this.render();
    },
    render: function () {
        MultiPageView.prototype.render.call(this);
    },
    entryEvent: function (id) {
        app.navigate("booking/"+id, true);
    },
    close: function () {
        this.$domContainer.empty();
    }
});

var AdminAdminSearchResultView = MultiPageView.extend({
    initialize: function (allMessages, messageList) {
        _.bindAll(this, 'render', 'entryEvent', 'close');
        this.messages = messageList;
        this.allMessages = allMessages;
        this.entryTemplate = _.template(tpl.get('adminBookingRow'));
        this.pageNumberClass = "searchResultPageNumber";
        this.pageNumberId = "searchResultPageNumber";
        this.pageNavigator = "bookingSearchNavigator";
        this.pageNavigatorClass = "page clearfix";
        this.user = app.sessionManager.sessionModel;
        this.entryHeight = 71;
        this.pageEntryNumber = 10;
        this.entryClass = "adminResult";
        this.actionClass = "view";
        this.entryContainer = "searchResultContainer";
        this.$domContainer = $("#searchResultContainer");
        this.isClosed = false;
        this.pnc = true;
        this.render();
    },
    render: function () {
        MultiPageView.prototype.render.call(this);
    },
    entryEvent: function (id) {
        app.navigate("booking/"+id, true);
    },
    close: function () {
        this.$domContainer.empty();
    }
});

var AdminManageView = Backbone.View.extend({
    el:"#main_content",
    initialize: function (params) {
        _.bindAll(this, "render", "bindEvents", "close");
        this.isClosed = false;
        this.type = params.type;
        app.viewRegistration.register(this.type + "Manage", this, true);
        this.templates = {
            user: _.template(tpl.get('adminUserManage')),
            course: _.template(tpl.get('adminCourseManage')),
            booking: _.template(tpl.get('adminBookingManage')),
            admin: _.template(tpl.get('adminAdminManage'))
        };
        this.rowTemplates = {
            user: _.template(tpl.get('adminUserRow')),
            course: _.template(tpl.get('adminCourseRow')),
            booking: _.template(tpl.get('adminBookingRow')),
            admin: _.template(tpl.get('adminAdminRow'))
        }
        this.baseTemplate = this.templates[this.type];
        this.rowTemplate = this.rowTemplates[this.type];
        this.render();
        this.bindEvents();
    },
    render: function () {
        this.$el.append(this.baseTemplate);
        if (this.resultView) {
            this.resultView.close();
        }
        $("#sideBar").find(".active").removeClass("active");
        $("#" + this.type + "Manage").addClass("active");
        switch (this.type) {
            case "user":
                this.allMessages = new Users();
                this.resultView = new AdminUserSearchResultView(this.allMessages, this.allMessages);
                this.sr = new UserSearchRepresentation();
                break;
            case "course":
                this.allMessages = new Courses();
                this.resultView = new AdminCourseSearchResultView(this.allMessages, this.allMessages);
                this.sr = new CourseSearchRepresentation();
                break;
            case "booking":
                this.allMessages = new Bookings();
                this.resultView = new AdminBookingSearchResultView(this.allMessages, this.allMessages);
                this.sr = new BookingSearchRepresentation();
                break;
            case "admin":
                this.allMessages = new Admins();
                this.resultView = new AdminBookingSearchResultView(this.allMessages, this.allMessages);
                this.sr = new UserSearchRepresentation();
                break;
            default:
                alert("invalid");
                break;
        }
    },
    bindEvents: function () {
        var that = this;
        $("#searchInput").on("keypress", function (e) {
            if (e.which === 13) {
                e.preventDefault();
            }
            that.search();
        });
        $("#search").on("click", function (e) {

        });
    },
    search: function () {
        var val = $("#searchInput").val(), regex = /[0-9]+/;
        if (regex.str(val)) {
            this.sr.set(this.sr.idAttribute, parseInt(val, 10));
        } else {
            if (this.type === "user") {
                this.sr.set("name", val);
                app.adminManager.listUsers(this.sr, this.renderResult);
            } else if (this.type === "course") {
                this.sr.set("courseName", val);
            } else if (this.type === "booking") {

            } else if (this.type === "partner") {

            }
        }

    },
    renderResult: function (results) {
        this.allMessages.reset(results);
        this.resultView.render();
    },
    close: function () {
        if (!this.isClosed) {
            this.isClosed = true;
            $("#sideBarClose").off();
            this.$el.empty();
        }
    }
});