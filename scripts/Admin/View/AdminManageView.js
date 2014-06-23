var AdminUserSearchResultView = MultiPageView.extend({
    extPn:true,
    entryContainer: "searchResultContainer",
    pageNumberClass: "searchResultPageNumber",
    pageNumberId: "searchResultPageNumber",
    pageNavigator: "userSearchNavigator",
    pageNavigatorClass: "page clearfix",
    entryHeight: 27,
    pageEntryNumber: 20,
    entryClass: "userResult",
    actionClass: "view",
    initialize: function (allMessages, messageList) {
        _.bindAll(this, 'render', 'entryEvent', 'close');
        this.messages = messageList || this.messages;
        this.allMessages = allMessages || this.allMessages;
        this.entryTemplate = _.template(tpl.get('adminUserRow'));
        this.user = app.sessionManager.sessionModel;
        this.isClosed = false;
        this.render();
    },
    render: function () {
        MultiPageView.prototype.render.call(this);
    },
    entryEvent: function (id) {
        app.navigate("manage/user/"+id);
        if (!this.userView) {
            this.userView = new AdminUserView({user: this.allMessages.get(id)});
        } else {
            this.userView.initialize({user: this.allMessages.get(id)});
        }
    },
    close: function () {
        if (!this.isClosed){
            MultiPageView.prototype.close.call(this);
            this.$domContainer.empty();
            this.isClosed = true;
        }
    }
});

var AdminCourseSearchResultView = MultiPageView.extend({
    pageNumberClass: "searchResultPageNumber",
    pageNumberId: "searchResultPageNumber",
    pageNavigator: "courseSearchNavigator",
    pageNavigatorClass: "page clearfix",
    entryHeight: 27,
    pageEntryNumber: 20,
    entryClass: "courseResult",
    actionClass: "view",
    entryContainer: "searchResultContainer",
    pnc: true,
    initialize: function (allMessages, messageList) {
        _.bindAll(this, 'render', 'entryEvent', 'close');
        this.messages = messageList || this.messages;
        this.allMessages = allMessages || this.allMessages;
        this.entryTemplate = _.template(tpl.get('adminCourseRow'));
        this.editViewTemplate = _.template(tpl.get('adminCourse'));
        this.user = app.sessionManager.sessionModel;
        this.isClosed = false;
        this.render();
        this.bindEvents();
    },
    render: function () {
        MultiPageView.prototype.render.call(this);

    },
    entryEvent: function (id) {
        app.navigate("manage/course/"+id);
        this.adminCourseView = new AdminCourseView({"courseId":id});
        $("#courseCRUDContainer").removeClass("hidden");
        $("#searchResult").addClass("hidden");
    },
    bindEvents: function () {
        var that = this;
        $("#createCourse").on("click", function(){
            $(this).addClass("active");
            $("#updateCourse").removeClass("active");
            $("#courseCRUDContainer").removeClass("hidden");
            $("#searchResult").addClass("hidden");
            if (!that.adminCourseView) {
                that.adminCourseView = new AdminCourseView(); //Create
            } else {
                that.adminCourseView.initialize();
            }
        });
        $("#searchCourse").on("click", function(){
            $(this).addClass("active");
            $("#createCourse").removeClass("active");
            $("#searchResult").removeClass("hidden");
            $("#courseCRUDContainer").addClass("hidden");
            app.navigate("manage/course");

        });
    },
    close: function () {
        if (!this.isClosed){
            $("#createCourse").off();
            $("#searchCourse").off();
            MultiPageView.prototype.close.call(this);
            this.$domContainer.empty();
            this.isClosed = true;
        }
    }
});

var AdminBookingSearchResultView = MultiPageView.extend({
    pageNumberClass: "searchResultPageNumber",
    pageNumberId: "searchResultPageNumber",
    pageNavigator: "bookingSearchNavigator",
    pageNavigatorClass: "page clearfix",
    entryHeight: 27,
    pageEntryNumber: 20,
    entryClass: "bookingResult",
    actionClass: "view",
    entryContainer: "searchResultContainer",
    pnc: true,
    initialize: function (allMessages, messageList) {
        _.bindAll(this, 'render', 'entryEvent', 'close');
        this.messages = messageList || this.messages;
        this.allMessages = allMessages || this.allMessages;
        this.entryTemplate = _.template(tpl.get('adminBookingRow'));
        this.user = app.sessionManager.sessionModel;
        this.isClosed = false;
        this.render();
    },
    render: function () {
        MultiPageView.prototype.render.call(this);
    },
    entryEvent: function (id) {
        app.navigate("manage/booking/"+id, true);
    },
    close: function () {
        if (!this.isClosed){
            MultiPageView.prototype.close.call(this);
            this.$domContainer.empty();
            this.isClosed = true;
        }
    }
});

var AdminAdminSearchResultView = MultiPageView.extend({
    pageNumberClass: "searchResultPageNumber",
    pageNumberId: "searchResultPageNumber",
    pageNavigator: "adminSearchNavigator",
    pageNavigatorClass: "page clearfix",
    entryHeight: 27,
    pageEntryNumber: 20,
    entryClass: "adminResult",
    actionClass: "view",
    entryContainer: "searchResultContainer",
    pnc: true,
    initialize: function (allMessages, messageList) {
        _.bindAll(this, 'render', 'entryEvent', 'close');
        this.messages = messageList || this.messages;
        this.allMessages = allMessages || this.allMessages;
        this.entryTemplate = _.template(tpl.get('adminBookingRow'));
        this.user = app.sessionManager.sessionModel;
        this.isClosed = false;
        this.render();
        this.bindEvents();
    },
    render: function () {
        MultiPageView.prototype.render.call(this);
    },
    bindEvents: function () {
        var that = this;
        $("#createAdmin").on("click", function(){
            $(this).addClass("active");
            $("#updateAdmin").removeClass("active");
            $("#adminCRUDContainer").removeClass("hidden");
            $("#searchResult").addClass("hidden");
            that.adminAdminView = new AdminAdminView(); //Create
        });
        $("#searchAdmin").on("click", function(){
            $(this).addClass("active");
            $("#createAdmin").removeClass("active");
            $("#searchResult").removeClass("hidden");
            $("#adminCRUDContainer").addClass("hidden");
            app.navigate("manage/admin");
        });
    },
    entryEvent: function (id) {
        app.navigate("manage/admin/"+id, true);
    },
    close: function () {
        if (!this.isClosed){
            $("#createAdmin").off();
            $("#searchAdmin").off();
            MultiPageView.prototype.close.call(this);
            this.$domContainer.empty();
            this.isClosed = true;
        }
    }
});

var AdminPartnerSearchResultView = MultiPageView.extend({
    pageNumberClass: "searchResultPageNumber",
    pageNumberId: "searchResultPageNumber",
    pageNavigator: "partnerSearchNavigator",
    pageNavigatorClass: "page clearfix",
    entryHeight: 27,
    pageEntryNumber: 20,
    entryClass: "partnerResult",
    actionClass: "view",
    entryContainer: "searchResultContainer",
    pnc: true,
    initialize: function (allMessages, messageList) {
        _.bindAll(this, 'render', 'entryEvent', 'close');
        this.messages = messageList || this.messages;
        this.allMessages = allMessages || this.allMessages;
        this.entryTemplate = _.template(tpl.get('adminPartnerRow'));
        this.user = app.sessionManager.sessionModel;
        this.isClosed = false;
        this.render();
        this.bindEvents();
    },
    render: function () {
        MultiPageView.prototype.render.call(this);
    },
    bindEvents: function () {
        var that = this;
        $("#createPartner").on("click", function(){
            $(this).addClass("active");
            $("#updatePartner").removeClass("active");
            $("#partnerCRUDContainer").removeClass("hidden");
            $("#searchResult").addClass("hidden");
            that.adminPartnerView = new AdminPartnerView(); //Create
        });
        $("#searchPartner").on("click", function(){
            $(this).addClass("active");
            $("#createPartner").removeClass("active");
            $("#searchResult").removeClass("hidden");
            $("#partnerCRUDContainer").addClass("hidden");
            app.navigate("manage/partner");
        });
    },
    entryEvent: function (id) {
        app.navigate("manage/partner/"+id, true);
    },
    close: function () {
        if (!this.isClosed){
            MultiPageView.prototype.close.call(this);
            this.$domContainer.empty();
            this.isClosed = true;
        }
    }
});

var AdminManageView = Backbone.View.extend({
    el:"#main_content",
    resultView: {},
    initialize: function (params) {
        _.bindAll(this, "render", "switchView", "bindEvents", "bindSearchEvent", "renderResult", "renderCategories", "renderSubCategories", "renderLocations", "renderDistrict", "close", "search");
        this.isClosed = false;
        app.viewRegistration.register(this);
        this.templates = {
            user: _.template(tpl.get('adminUserManage')),
            course: _.template(tpl.get('adminCourseManage')),
            booking: _.template(tpl.get('adminBookingManage')),
            admin: _.template(tpl.get('adminAdminManage')),
            partner: _.template(tpl.get('adminPartnerManage'))
        };
        this.sr = {
            user: new UserSearchRepresentation(),
            course: new CourseSearchRepresentation(),
            booking: new BookingSearchRepresentation(),
            admin: new AdminSearchRepresentation(),
            partner: new PartnerSearchRepresentation()
        };
        this.baseTemplate = this.templates[this.type];
        this.$el.append(this.baseTemplate);
        this.switchView(params.type, params.query);
    },
    switchView: function (viewName, query) {
        this.closeActiveView();
        this.query = query;
        this.type = viewName;
        this.baseTemplate = this.templates[this.type];
        this.$el.append(this.baseTemplate);
        this.render();
        this.bindEvents();
    },
    render: function () {
        var view;
        $("#sideBar").find(".active").removeClass("active");
        $("#" + this.type + "Manage").addClass("active");
        if (this.resultView[this.type]) {
            this.resultView[this.type].initialize();
        } else {
            switch (this.type) {
                case "user":
                    this.allMessages = new Users();
                    this.resultView[this.type] = new AdminUserSearchResultView(this.allMessages, this.allMessages);
                    break;
                case "course":
                    this.allMessages = new Courses();
                    this.resultView[this.type] = new AdminCourseSearchResultView(this.allMessages, this.allMessages);
                    app.generalManager.getCategories(this);
                    break;
                case "booking":
                    this.allMessages = new Bookings();
                    this.resultView[this.type] = new AdminBookingSearchResultView(this.allMessages, this.allMessages);
                    break;
                case "admin":
                    this.allMessages = new Admins();
                    this.resultView[this.type] = new AdminAdminSearchResultView(this.allMessages, this.allMessages);
                    break;
                case "partner":
                    this.allMessages = new Partners();
                    this.resultView[this.type] = new AdminPartnerSearchResultView(this.allMessages, this.allMessages);
                    break;
                default:
                    alert("invalid");
                    break;
            }
        }
        if (this.query) {
            this.sr[this.type].castFromQuery(this.query);
        }
        $("#adminUserName").html(app.sessionManager.sessionModel.get("name"));

    },
    bindEvents: function () {
        this.bindSearchEvent();
    },
    bindSearchEvent: function () {
        var that = this;
        if (this.type === "user") {
            $("#userSearchPanel").on("click", "a", function (e) {
                var id = e.target.id.split("_")[1];
                $(e.delegateTarget).children("div").addClass("hidden");
                $("#"+id).removeClass("hidden");
            });
            $("#queryUserBtn").on("click", function (e) {
                var obj = that.sr[that.type].toJSON();
                for ( var attr in obj ) {
                    var $input = $("#queryUser").find("#" +attr+"_Input"), value = $input.val();
                    if (value && !$input.hasClass("date") ) {
                        that.sr[that.type].set(attr, $input.attr("type") === "number" ? Utilities.toInt(value) : value);
                    }
                }
                app.adminManager.listUser(that.sr[this.type], {success:that.renderResult, error:function(){}});
            });
            $("#findUserBtn").on("click", function (e) {
                var id = $("#userId_Input").val();
                if (id) {
                    app.navigate("manage/user/" + id, true );
                }
            });
            $("#startCreationTime_Input").datepicker({
                buttonImageOnly: true,
                buttonImage: "calendar.gif",
                buttonText: "Calendar",
                minDate: new Date (),
                onSelect: function (text, inst) {
                    var d = new Date ();
                    d.setDate(inst.selectedDay);
                    d.setMonth(inst.selectedMonth);
                    d.setYear(inst.selectedYear);
                    that.sr[that.type].set("startScheduledTime", d);
                    $(this).val(Utilities.getDateString(d));
                }
            });
            $("#finishCreationTime_Input").datepicker({
                buttonImageOnly: true,
                buttonImage: "calendar.gif",
                buttonText: "Calendar",
                minDate: new Date (),
                onSelect: function (text, inst) {
                    var d = new Date ();
                    d.setDate(inst.selectedDay);
                    d.setMonth(inst.selectedMonth);
                    d.setYear(inst.selectedYear);
                    that.sr[that.type].set("startScheduledTime", d);
                    $(this).val(Utilities.getDateString(d));
                }
            });
        } else if (this.type === "course") {
            $("#findCourseBtn").on("click", function() {
                var id = $("#courseId_Input").val();
                if (id) {
                    app.navigate("manage/course/" + id, true );
                }
            });
            $("#startDate_Input").datepicker({
                buttonImageOnly: true,
                buttonImage: "calendar.gif",
                buttonText: "Calendar",
                onSelect: function (text, inst) {
                    var d = new Date ();
                    d.setDate(inst.selectedDay);
                    d.setMonth(inst.selectedMonth);
                    d.setYear(inst.selectedYear);
                    that.sr[that.type].set("startDate", d);
                    $(this).val(Utilities.getDateString(d));
                }
            });
            $("#finishDate_Input").datepicker({
                buttonImageOnly: true,
                buttonImage: "calendar.gif",
                buttonText: "Calendar",
                onSelect: function (text, inst) {
                    var d = new Date ();
                    d.setDate(inst.selectedDay);
                    d.setMonth(inst.selectedMonth);
                    d.setYear(inst.selectedYear);
                    that.sr[that.type].set("finishDate", d);
                    $(this).val(Utilities.getDateString(d));
                }
            });
            $("#startCutoffDate_Input").datepicker({
                buttonImageOnly: true,
                buttonImage: "calendar.gif",
                buttonText: "Calendar",
                onSelect: function (text, inst) {
                    var d = new Date ();
                    d.setDate(inst.selectedDay);
                    d.setMonth(inst.selectedMonth);
                    d.setYear(inst.selectedYear);
                    that.sr[that.type].set("startCutoffDate", d);
                    $(this).val(Utilities.getDateString(d));
                }
            });
            $("#finishCutoffDate_Input").datepicker({
                buttonImageOnly: true,
                buttonImage: "calendar.gif",
                buttonText: "Calendar",
                onSelect: function (text, inst) {
                    var d = new Date ();
                    d.setDate(inst.selectedDay);
                    d.setMonth(inst.selectedMonth);
                    d.setYear(inst.selectedYear);
                    that.sr[that.type].set("finishCutoffDate", d);
                    $(this).val(Utilities.getDateString(d));
                }
            });
            $("#searchInput_category").on("change", function() {
                var category = $(this).val();
                that.sr[that.type].set("category", category);
                that.sr[that.type].set("subCategory", undefined);
                that.renderSubCategory(category);
            });
            $("#searchInput_subCategory").on("change", function() {
                that.sr[that.type].set("subCategory", $(this).val());
            });
            $("#searchInput_city").on("change", function() {
                var city = $(this).val();
                that.sr[that.type].set("city", city);
                that.sr[that.type].set("district", undefined);
                that.renderDistrict(city);
            });
            $("#searchInput_district").on("change", function() {
                that.sr[that.type].set("district", $(this).val());
            });
            $("#queryCourseBtn").on("click", function (e) {
                var obj = that.sr[that.type].toJSON();
                for ( var attr in obj ) {
                    var $input = $("#queryCourse").find("#" +attr+"_Input"), value = $input.val();
                    if (value && !$input.hasClass("date") ) {
                        that.sr[that.type].set(attr, $input.attr("type") === "number" ? Utilities.toInt(value) : value);
                    }
                }
                app.generalManager.findCourse(that.sr, {success:that.renderResult, error:function(){}});
            });
            $("#courseSearchPanel").on("click", "a", function (e) {
                var id = e.target.id.split("_")[1];
                $(e.delegateTarget).children("div").addClass("hidden");
                $("#"+id).removeClass("hidden");
            });
        } else if (this.type === "booking") {
            $("#bookingSearchPanel").on("click", "a", function (e) {
                var id = e.target.id.split("_")[1];
                $(e.delegateTarget).children("div").addClass("hidden");
                $("#"+id).removeClass("hidden");
            });
            $("#bookingId_Input").on("keypress", function (e) {
                if (e.which === 13) {
                    var bookingId = $(this).val();
                    if (bookingId) {
                        app.navigate("manage/booking/"+ bookingId, true);
                    }    
                }
            });
            $("#findBookingBtn").on("click", function (e) {
                var bookingId = $("#bookingId_Input").val();
                if (bookingId) {
                    app.navigate("manage/booking/"+ bookingId, true);
                }
            });
            $("#queryBookingBtn").on("click", function (e) {
                var obj = that.sr[that.type].toJSON();
                for ( var attr in obj ) {
                    var $input = $("#queryBooking").find("#" +attr+"_Input"), value = $input.val();
                    if (value && !$input.hasClass("date") ) {
                        that.sr[that.type].set(attr, value);
                    }
                }
                app.adminManager.listBooking(that.sr, {success:that.renderResult, error:function(){}});
            });
            $("#startScheduledTime_Input").datepicker({
                buttonImageOnly: true,
                buttonImage: "calendar.gif",
                buttonText: "Calendar",
                onSelect: function (text, inst) {
                    var d = new Date ();
                    d.setDate(inst.selectedDay);
                    d.setMonth(inst.selectedMonth);
                    d.setYear(inst.selectedYear);
                    that.sr[that.type].set("startScheduledTime", d);
                    $(this).val(Utilities.getDateString(d));
                }
            });
            $("#finishScheduledTime_Input").datepicker({
                buttonImageOnly: true,
                buttonImage: "calendar.gif",
                buttonText: "Calendar",
                onSelect: function (text, inst) {
                    var d = new Date ();
                    d.setDate(inst.selectedDay);
                    d.setMonth(inst.selectedMonth);
                    d.setYear(inst.selectedYear);
                    that.sr[that.type].set("finishScheduledTime", d);
                    $(this).val(Utilities.getDateString(d));
                }
            });
            $("#startAdjustTime_Input").datepicker({
                buttonImageOnly: true,
                buttonImage: "calendar.gif",
                buttonText: "Calendar",
                onSelect: function (text, inst) {
                    var d = new Date ();
                    d.setDate(inst.selectedDay);
                    d.setMonth(inst.selectedMonth);
                    d.setYear(inst.selectedYear);
                    that.sr[that.type].set("startAdjustTime", d);
                    $(this).val(Utilities.getDateString(d));
                }
            });
            $("#finishSdjustTime_Input").datepicker({
                buttonImageOnly: true,
                buttonImage: "calendar.gif",
                buttonText: "Calendar",
                onSelect: function (text, inst) {
                    var d = new Date ();
                    d.setDate(inst.selectedDay);
                    d.setMonth(inst.selectedMonth);
                    d.setYear(inst.selectedYear);
                    that.sr[that.type].set("finishAdjustTime", d);
                    $(this).val(Utilities.getDateString(d));
                }
            });
            $("#startCreationTime_Input").datepicker({
                buttonImageOnly: true,
                buttonImage: "calendar.gif",
                buttonText: "Calendar",
                onSelect: function (text, inst) {
                    var d = new Date ();
                    d.setDate(inst.selectedDay);
                    d.setMonth(inst.selectedMonth);
                    d.setYear(inst.selectedYear);
                    that.sr[that.type].set("startCreationTime", d);
                    $(this).val(Utilities.getDateString(d));
                }
            });
            $("#finishCreationTime_Input").datepicker({
                buttonImageOnly: true,
                buttonImage: "calendar.gif",
                buttonText: "Calendar",
                onSelect: function (text, inst) {
                    var d = new Date ();
                    d.setDate(inst.selectedDay);
                    d.setMonth(inst.selectedMonth);
                    d.setYear(inst.selectedYear);
                    that.sr[that.type].set("finishCreationTime", d);
                    $(this).val(Utilities.getDateString(d));
                }
            });
        } else if (this.type === "partner") {
            $("#partnerSearchPanel").on("click", "a", function (e) {
                var id = e.target.id.split("_")[1];
                $(e.delegateTarget).children("div").addClass("hidden");
                $("#"+id).removeClass("hidden");
            });
            $("#findPartnerBtn").on("click", function (e) {
                var partnerId = $("#partnerId_Input").val();
                if (partnerId) {
                    app.navigate("manage/partner/"+ partnerId, true);
                }
            });
            $("#queryPartnerBtn").on("click", function (e) {
                var obj = that.sr[that.type].toJSON();
                for ( var attr in obj ) {
                    var $input = $("#queryUser").find("#" +attr+"_Input"), value = $input.val();
                    if (value && !$input.hasClass("date") ) {
                        that.sr[that.type].set(attr, value);
                    }
                }
                app.adminManager.listPartner(that.sr, {success:that.renderResult, error:function(){}});
            });
            $("#startCreationTime_Input").datepicker({
                buttonImageOnly: true,
                buttonImage: "calendar.gif",
                buttonText: "Calendar",
                onSelect: function (text, inst) {
                    var d = new Date ();
                    d.setDate(inst.selectedDay);
                    d.setMonth(inst.selectedMonth);
                    d.setYear(inst.selectedYear);
                    that.sr[that.type].set("startCreationTime", d);
                    $(this).val(Utilities.getDateString(d));
                }
            });
            $("#finishCreationTime_Input").datepicker({
                buttonImageOnly: true,
                buttonImage: "calendar.gif",
                buttonText: "Calendar",
                onSelect: function (text, inst) {
                    var d = new Date ();
                    d.setDate(inst.selectedDay);
                    d.setMonth(inst.selectedMonth);
                    d.setYear(inst.selectedYear);
                    that.sr[that.type].set("finishCreationTime", d);
                    $(this).val(Utilities.getDateString(d));
                }
            });
        } else if (this.type === "admin") {
            $("#adminSearchPanel").on("click", "a", function (e) {
                var id = e.target.id.split("_")[1];
                $(e.delegateTarget).children("div").addClass("hidden");
                $("#"+id).removeClass("hidden");
            });
            $("#findAdminBtn").on("click", function (e) {
                var adminId = $("#adminId_Input").val();
                if (adminId) {
                    app.navigate("manage/admin/"+ adminId, true);
                }
            });
            $("#queryAdminBtn").on("click", function (e) {
                var obj = that.sr[that.type].toJSON();
                for ( var attr in obj ) {
                    var $input = $("#queryUser").find("#" +attr+"_Input"), value = $input.val();
                   if (value && !$input.hasClass("date") ) {
                        that.sr[that.type].set(attr, value);
                    }
                }
                app.adminManager.listAdmin(that.sr, {success:that.renderResult, error:function(){}});
            });
        }
    },
    search: function () {
        var val = $("#searchInput").val(), regex = /[0-9]+/;
        if (this.type === "user") {
            app.adminManager.listUser(this.sr, {success:this.renderResult, error:function(){}});
        } else if (this.type === "course") {
            app.generalManager.findCourse(this.sr, {success:this.renderResult, error:function(){}});
        } else if (this.type === "booking") {
            if (val) {
                app.navigate("manage/booking/" + val, true);
            } else {
                
            }
        } else if (this.type === "partner") {

        }
    },
    renderCategories: function (categories) {
        this.categories = categories;
        var buf = [], obj;
        for ( var key in categories) {
            buf.push("<option value='" + key + "'>" + key + "</option>");
        }
        $("#searchInput_category").append(buf.join());
    },
    renderSubCategories: function (category) {
        var subCategories = this.categories[category], buf = [];
        for ( var key in subCategories) {
            buf.push("<option value='" + key + "'>" + key + "</option>");
        }
        $("#searchInput_district").empty().append(buf.join());
    },
    renderLocations: function (list) {
        this.locations = list;
        var len = list.length, buf = [], obj;
        for ( var i = 0; i < len; i ++) {
            obj = this.locations[i];
            for ( var attr in obj ) {
                buf.push("<option value='" + attr + "'>" + attr + "</option>");
            }
        }
        $("#searchInput_city").append(buf.join());
    },
    renderDistrict: function (city) {
        var districts = this.locations[city], len = districts.length, buf = [], obj;
        for ( var i = 0; i < len; i ++) {
            buf.push("<option value='" + districts[i] + "'>" + districts[i] + "</option>");
        }
        $("#searchInput_district").empty().append(buf.join());
    },
    renderResult: function (results) {
        var array = results.toArray();
        this.resultView.allMessages.reset(array);
        this.resultView.messages.reset(array);
        this.resultView.render();
    },
    closeActiveView: function (){
        if (this.type === "user") {
            $("#userSearchPanel").off();
            $("#queryUserBtn").off();
            $("#findUserBtn").off();
        } else if (this.type === "course") {
            $("#findCourseBtn").off();
            $("#searchInput_category").off();
            $("#searchInput_subCategory").off();
            $("#searchInput_city").off();
            $("#searchInput_district").off();
            $("#queryCourseBtn").off();
            $("#courseSearchPanel").off();
        } else if (this.type === "booking") {
            $("#bookingSearchPanel").off();
            $("#bookingId_Input").off();
            $("#findBookingBtn").off();
            $("#queryBookingBtn").off();
        } else if (this.type === "partner") {
            $("#partnerSearchPanel").off();
            $("#findPartnerBtn").off();
            $("#queryPartnerBtn").off();
        } else if (this.type === "admin") {
            $("#adminSearchPanel").off();
            $("#findAdminBtn").off();
            $("#queryAdminBtn").off();
        }    
        if (this.resultView[this.type]) {
            this.resultView[this.type].close();
            this.$el.empty();
        }
    },
    close: function () {
        if (!this.isClosed) {
            if (!this.resultView[this.type].isClosed) {
                this.closeActiveView();
            }
            this.isClosed = true;
            $("#sideBarClose").off();
            this.$el.empty();
        }
    }
});