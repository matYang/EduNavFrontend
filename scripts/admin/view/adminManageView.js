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
        this.entryHeight = 27;
        this.pageEntryNumber = 20;
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
        app.navigate("manage/user/"+id);
        this.userView = new AdminUserView({user: this.allMessages.get(id)});
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
        this.entryHeight = 27;
        this.pageEntryNumber = 20;
        this.entryClass = "courseResult";
        this.actionClass = "view";
        this.entryContainer = "searchResultContainer";
        this.$domContainer = $("#searchResultContainer");
        this.isClosed = false;
        this.pnc = true;
        this.editViewTemplate = _.template(tpl.get('adminCourse'));
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
            that.adminCourseView = new AdminCourseView(); //Create
        });
        $("#searchCourse").on("click", function(){
            $(this).addClass("active");
            $("#createCourse").removeClass("active");
            $("#searchResult").removeClass("hidden");
            $("#courseCRUDContainer").addClass("hidden");
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
        this.entryHeight = 27;
        this.pageEntryNumber = 20;
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
        app.navigate("manage/booking/"+id, true);
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
        this.entryHeight = 27;
        this.pageEntryNumber = 20;
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
        app.navigate("manage/booking/"+id, true);
    },
    close: function () {
        this.$domContainer.empty();
    }
});

var AdminPartnerSearchResultView = MultiPageView.extend({
    initialize: function (allMessages, messageList) {
        _.bindAll(this, 'render', 'entryEvent', 'close');
        this.messages = messageList;
        this.allMessages = allMessages;
        this.entryTemplate = _.template(tpl.get('adminPartnerRow'));
        this.pageNumberClass = "searchResultPageNumber";
        this.pageNumberId = "searchResultPageNumber";
        this.pageNavigator = "partnerSearchNavigator";
        this.pageNavigatorClass = "page clearfix";
        this.user = app.sessionManager.sessionModel;
        this.entryHeight = 27;
        this.pageEntryNumber = 20;
        this.entryClass = "adminResult";
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
        $("#adminUserName").html(app.sessionManager.sessionModel.get("name"));
    },
    bindEvents: function () {
        var that = this;
        $("#createPartner").on("click", function(){
            $(this).addClass("active");
            $("#updatePartner").removeClass("active");
            $("#partnerCRUDContainer").removeClass("hidden");
            $("#searchResult").addClass("hidden");
            that.adminCourseView = new AdminPartnerView(); //Create
        });
        $("#searchPartner").on("click", function(){
            $(this).addClass("active");
            $("#createPartner").removeClass("active");
            $("#searchResult").removeClass("hidden");
            $("#partnerCRUDContainer").addClass("hidden");
        });
    },
    entryEvent: function (id) {
        app.navigate("manage/partner/"+id, true);
    },
    close: function () {
        this.$domContainer.empty();
    }
});

var AdminManageView = Backbone.View.extend({
    el:"#main_content",
    initialize: function (params) {
        _.bindAll(this, "render", "bindEvents", "bindSearchEvent", "renderResult", "renderCategories", "renderSubCategories", "renderLocations", "renderDistrict", "close", "search");
        this.isClosed = false;
        this.type = params.type;
        app.viewRegistration.register(this);
        this.templates = {
            user: _.template(tpl.get('adminUserManage')),
            course: _.template(tpl.get('adminCourseManage')),
            booking: _.template(tpl.get('adminBookingManage')),
            admin: _.template(tpl.get('adminAdminManage')),
            partner: _.template(tpl.get('adminPartnerManage'))
        };
        this.baseTemplate = this.templates[this.type];
        this.query = params.query;
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
                this.sr = new UserSearchRepresentation();
                this.resultView = new AdminUserSearchResultView(this.allMessages, this.allMessages);
                break;
            case "course":
                this.allMessages = new Courses();
                this.sr = new CourseSearchRepresentation();
                this.resultView = new AdminCourseSearchResultView(this.allMessages, this.allMessages);
                app.generalManager.getCategories(this);
                break;
            case "booking":
                this.allMessages = new Bookings();
                this.sr = new BookingSearchRepresentation();
                this.resultView = new AdminBookingSearchResultView(this.allMessages, this.allMessages);
                break;
            case "admin":
                this.allMessages = new Admins();
                this.sr = new UserSearchRepresentation();
                // this.resultView = new AdminBookingSearchResultView(this.allMessages, this.allMessages);
                break;
            case "partner":
                this.allMessages = new Partners();
                this.sr = new PartnerSearchRepresentation();
                this.resultView = new AdminPartnerSearchResultView(this.allMessages, this.allMessages);
                break;
            default:
                alert("invalid");
                break;
        }
        if (this.query) {
            this.sr.castFromQuery(this.query);
        }
    },
    bindEvents: function () {
        this.bindSearchEvent();
    },
    bindSearchEvent: function () {
        var that = this;
        if (this.type === "user") {
            $("#searchInput").on("change", function() {
                var value = $(this).val(), num = Utilities.toInt(value);
                if (isNaN(num)) {
                    that.sr.set("name", value);
                } else {
                    that.sr.set("userId", num);
                }
            });
        } else if (this.type === "course") {
            $("#searchInput_id").on("change", function() {
                that.sr.set("courseId", Utilities.toInt($(this).val()) );
            });
            $("#searchInput_schoolName").on("change", function() {
                that.sr.set("institutionName", $(this).val());
            });
            $("#searchInput_category").on("change", function() {
                var category = $(this).val();
                that.sr.set("category", category);
                that.sr.set("subCategory", undefined);
                that.renderSubCategory(category);
            });
            $("#searchInput_subCategory").on("change", function() {
                that.sr.set("subCategory", $(this).val());
            });
            $("#searchInput_city").on("change", function() {
                var city = $(this).val();
                that.sr.set("city", city);
                that.sr.set("district", undefined);
                that.renderDistrict(city);
            });
            $("#searchInput_district").on("change", function() {
                that.sr.set("district", $(this).val());
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
            })
            $("#getBookingBtn").on("click", function (e) {
                var bookingId = $("#bookingId_Input").val();
                if (bookingId) {
                    app.navigate("manage/booking/"+ bookingId, true);
                }
            });
            $("#queryBookingBtn").on("click", function (e) {
                var userId = $("#userId_Input").val();
                var name = $("#name_Input").val();
                var partnerId = $("#partnerId_Input").val();
                var courseId = $("#courseId_Input").val();
                var wasConfirmedIndex = $("#wasConfirmedIndex_Input").prop("checked") ? 1 : 2;

                that.sr.set("userId", userId);
                that.sr.set("name", name);
                that.sr.set("partnerId", partnerId);
                that.sr.set("courseId", courseId);
                that.sr.set("wasConfirmedIndex", wasConfirmedIndex);
                app.adminManager.listBooking(that.sr, {success:this.renderResult, error:function(){}});
            });
            $("#scheduledTime_Input").datepicker({
                buttonImageOnly: true,
                buttonImage: "calendar.gif",
                buttonText: "Calendar",
                onSelect: function (text, inst) {
                    var d = new Date ();
                    d.setDate(inst.selectedDay);
                    d.setMonth(inst.selectedMonth);
                    d.setYear(inst.selectedYear);
                    that.sr.set("scheduledTime", d);
                    $(this).val(Utilities.getDateString(d));
                }
            });
        } else if (this.type === "partner") {
            $("#searchInput").on("change", function() {
                var value = $(this).val(), num = Utilities.toInt(value);
                if (isNaN(num)) {
                    that.sr.set("wholeName", value);
                } else {
                    that.sr.set("partnerId", num);
                }
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
    close: function () {
        if (!this.isClosed) {
            this.isClosed = true;
            $("#sideBarClose").off();
            this.$el.empty();
        }
    }
});