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
        var that = this;
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
        var that = this;
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
        var that = this;
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
        var that = this;
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
        this.templates = {
            user: _.template(tpl.get('adminUserManage')),
            course: _.template(tpl.get('adminCourseManage')),
            booking: _.template(tpl.get('adminBookingManage')),
            admin: _.template(tpl.get('adminAdminManage')),
        };
        this.rowTemplates = {
            user: _.template(tpl.get('adminUserRow')),
            course: _.template(tpl.get('adminCourseRow')),
            booking: _.template(tpl.get('adminBookingRow')),
            booking: _.template(tpl.get('adminAdminRow')),
        }
        this.baseTemplate = this.templates[this.type];
        this.rowTemplate = this.rowTemplates[this.type];
        this.render();
        this.bindEvents();
    },
    render: function () {
        this.$el.append(this.baseTemplate);
        debugger;
        switch (this.type) {
            case "user":
                var users = new Users();
                this.resultView = new AdminUserSearchResultView(users, users);
                break;
            case "course":
                var courses = new Courses();
                this.resultView = new AdminCourseSearchResultView(courses, courses);
                break;
            case "booking":
                var bookings = new Bookings();
                this.resultView = new AdminBookingSearchResultView(bookings, bookings);
                break;
            case "admin":
                var admins = new Admins();
                this.resultView = new AdminBookingSearchResultView(admins, admins);
                break;
            default:
                alert("invalid");
                break;
        }
    },
    bindEvents: function () {
        $("#searchInput").on("keypress", function (e) {
            if (e.which === 13) {
                e.preventDefault();
            }
        });
        $("#search").on("click", function (e) {
            var val = $("#searchInput").val();

        });
    },
    renderResult: function () {

    },
    close: function () {
        if (!this.isClosed) {
            this.isClosed = true;
            $("#sideBarClose").off();
            this.$el.empty();
        }
    }
});