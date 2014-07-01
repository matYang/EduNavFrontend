var AdminUserSearchResultView = MultiPageView.extend({
    extPn: true,
    entryContainer: "searchResultContainer",
    pageNumberClass: "searchResultPageNumber",
    pageNumberId: "searchResultPageNumber",
    pageNavigator: "userSearchNavigator",
    pageNavigatorClass: "page clearfix",
    entryHeight: 27,
    pageEntryNumber: 20,
    entryClass: "userResult",
    actionClass: "view",
    entryTemplate: _.template(tpl.get('adminUserRow')),
    initialize: function (allMessages, messageList) {
        _.bindAll(this, 'render', 'entryEvent', 'close');
        this.messages = messageList || this.messages;
        this.allMessages = allMessages || this.allMessages;
        this.user = app.sessionManager.sessionModel;
        this.isClosed = false;
        this.render();
    },
    render: function () {
        MultiPageView.prototype.render.call(this);
    },
    entryEvent: function (id) {
        app.navigate("manage/user/" + id);
        if (!this.userView) {
            this.userView = new AdminUserView({user: this.allMessages.get(id)});
        } else {
            this.userView.initialize({user: this.allMessages.get(id)});
        }
    },
    close: function () {
        if (!this.isClosed) {
            MultiPageView.prototype.close.call(this);
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
    entryTemplate: _.template(tpl.get('adminCourseRow')),
    editViewTemplate: _.template(tpl.get('adminCourse')),
    initialize: function (allMessages, messageList) {
        _.bindAll(this, 'render', 'entryEvent', 'close');
        this.messages = messageList || this.messages;
        this.allMessages = allMessages || this.allMessages;
        this.user = app.sessionManager.sessionModel;
        this.isClosed = false;
        this.render();
        this.bindEvents();
    },
    render: function () {
        MultiPageView.prototype.render.call(this);

    },
    entryEvent: function (id) {
        app.navigate("manage/course/" + id);
        this.adminCourseView = new AdminCourseView({"courseId": id});
        $("#courseCRUDContainer").removeClass("hidden");
        $("#searchResult").addClass("hidden");
    },
    bindEvents: function () {
        var that = this;
        $("#createCourse").on("click", function () {
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
        $("#searchCourse").on("click", function () {
            $(this).addClass("active");
            $("#createCourse").removeClass("active");
            $("#searchResult").removeClass("hidden");
            $("#courseCRUDContainer").addClass("hidden");
            app.navigate("manage/course");

        });
    },
    close: function () {
        if (!this.isClosed) {
            $("#createCourse").off();
            $("#searchCourse").off();
            MultiPageView.prototype.close.call(this);
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
    entryTemplate: _.template(tpl.get('adminBookingRow')),
    initialize: function (allMessages, messageList) {
        _.bindAll(this, 'render', 'entryEvent', 'close');
        this.messages = messageList || this.messages;
        this.allMessages = allMessages || this.allMessages;
        this.user = app.sessionManager.sessionModel;
        this.isClosed = false;
        this.render();
    },
    render: function () {
        MultiPageView.prototype.render.call(this);
    },
    entryEvent: function (id) {
        app.navigate("manage/booking/" + id, true);
    },
    close: function () {
        if (!this.isClosed) {
            MultiPageView.prototype.close.call(this);
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
    entryTemplate: _.template(tpl.get('adminBookingRow')),
    initialize: function (allMessages, messageList) {
        _.bindAll(this, 'render', 'entryEvent', 'close');
        this.messages = messageList || this.messages;
        this.allMessages = allMessages || this.allMessages;
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
        $("#createAdmin").on("click", function () {
            $(this).addClass("active");
            $("#updateAdmin").removeClass("active");
            $("#adminCRUDContainer").removeClass("hidden");
            $("#searchResult").addClass("hidden");
            that.adminAdminView = new AdminAdminView(); //Create
        });
        $("#searchAdmin").on("click", function () {
            $(this).addClass("active");
            $("#createAdmin").removeClass("active");
            $("#searchResult").removeClass("hidden");
            $("#adminCRUDContainer").addClass("hidden");
            app.navigate("manage/admin");
        });
    },
    entryEvent: function (id) {
        app.navigate("manage/admin/" + id, true);
    },
    close: function () {
        if (!this.isClosed) {
            $("#createAdmin").off();
            $("#searchAdmin").off();
            MultiPageView.prototype.close.call(this);
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
    entryTemplate: _.template(tpl.get('adminPartnerRow')),
    pnc: true,
    initialize: function (allMessages, messageList) {
        _.bindAll(this, 'render', 'entryEvent', 'close');
        this.messages = messageList || this.messages;
        this.allMessages = allMessages || this.allMessages;
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
        $("#createPartner").on("click", function () {
            $(this).addClass("active");
            $("#updatePartner").removeClass("active");
            $("#partnerCRUDContainer").removeClass("hidden");
            $("#searchResult").addClass("hidden");
            that.adminPartnerView = new AdminPartnerView(); //Create
        });
        $("#searchPartner").on("click", function () {
            $(this).addClass("active");
            $("#createPartner").removeClass("active");
            $("#searchResult").removeClass("hidden");
            $("#partnerCRUDContainer").addClass("hidden");
            app.navigate("manage/partner");
        });
    },
    entryEvent: function (id) {
        app.navigate("manage/partner/" + id, true);
    },
    close: function () {
        if (!this.isClosed) {
            MultiPageView.prototype.close.call(this);
            this.isClosed = true;
        }
    }
});

var AdminManageView = Backbone.View.extend({
    el: "#main_content",
    resultView: {},
    templates: {
        user: _.template(tpl.get('adminUserManage')),
        course: _.template(tpl.get('adminCourseManage')),
        booking: _.template(tpl.get('adminBookingManage')),
        admin: _.template(tpl.get('adminAdminManage')),
        partner: _.template(tpl.get('adminPartnerManage'))
    },
    optionTemplate: _.template(tpl.get('simpleOption')),
    initialize: function (params) {
        _.bindAll(this, "render", "switchView", "bindEvents", "bindSearchEvent", "renderResult", "renderCategories", "renderSubCategories", "renderLocations", "renderDistrict", "close");
        this.isClosed = false;
        app.viewRegistration.register(this);
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
                app.generalManager.getLocations(this);
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
                Info.alert("invalid");
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
        this.bindPageEvent();
    },
    bindPageEvent: function(){
        $('a.more').on('click',function(){
            $('div.more').animate({height:'200px',opacity:1},300);
            $(this).hide();
            $('a.less').show();
        })
        $('a.less').on('click',function(){
            $('div.more').animate({height:'0',opacity:0},300);
            $(this).hide();
            $('a.more').show()
        })
    },
    bindSearchEvent: function () {
        var that = this;
        $("input[class=date]").datepicker({
            buttonImageOnly: true,
            buttonImage: "calendar.gif",
            buttonText: "Calendar",
            onSelect: function (text, inst) {
                var d = new Date();
                d.setDate(inst.selectedDay);
                d.setMonth(inst.selectedMonth);
                d.setYear(inst.selectedYear);
                that.sr[that.type].set($(this).attr("id").split("_")[0], d);
                $(this).val(Utilities.getDateString(d));
            }
        });
        if (this.type === "user") {
            $("#userSearchPanel").on("click", "a.search", function (e) {
                var id = e.target.id.split("_")[1];
                $(e.delegateTarget).children("div").addClass("hidden");
                $("#" + id).removeClass("hidden");
            });
            $("#queryUserBtn").on("click", function () {
                var obj = that.sr[that.type].toJSON(), attr, $input, value;
                for (attr in obj) {
                    $input = $("#queryUser").find("#" + attr + "_Input");
                    value = $input.val();
                    if (value && !$input.hasClass("date")) {
                        that.sr[that.type].set(attr, $input.attr("type") === "number" ? Utilities.toInt(value) : value);
                    }
                }
                app.adminManager.listUser(that.sr[that.type], {success: that.renderResult, error: Utilities.defaultErrorHandler});
            });
            $("#findUserBtn").on("click", function () {
                var id = $("#userId_Input").val();
                if (id) {
                    app.navigate("manage/user/" + id, true);
                }
            });
        } else if (this.type === "course") {
            $("#findCourseBtn").on("click", function () {
                var id = $("#courseId_Input").val();
                if (id) {
                    app.navigate("manage/course/" + id, true);
                }
            });
            $("#category_Input").on("change", function () {
                var category = $(this).val();
                that.sr[that.type].set("category", category);
                that.sr[that.type].set("subCategory", undefined);
                that.sr[that.type].set("subSubCategory", undefined);
                that.renderSubCategories(category);
                $("#subCategory_Input").val("");
                $("#subSubCategory_Input").val("");
            });
            $("#subCategory_Input").on("change", function () {
                that.sr[that.type].set("subCategory", $(this).val());
                that.sr[that.type].set("subSubCategory", undefined);
                that.renderSubSubCategories( that.sr[that.type].get("category"), $(this).val());
                $("#subSubCategory_Input").val("");
            });
            $("#subSubCategory_Input").on("change", function () {
                that.sr[that.type].set("subCategory", $(this).val());
            });
            
            $("#province_Input").on("change", function () {
                var province = $(this).val();
                that.sr[that.type].set("province", province);
                that.sr[that.type].set("city", undefined);
                that.sr[that.type].set("district", undefined);
                that.renderCity(province);
                $("#city_Input").val("");
                $("#district_Input").val("");
            });
            $("#city_Input").on("change", function () {
                var city = $(this).val();
                that.sr[that.type].set("city", city);
                that.sr[that.type].set("district", undefined);
                that.renderDistrict(that.sr[that.type].get("province"), city);
                $("#district_Input").val("");
            });
            $("#district_Input").on("change", function () {
                that.sr[that.type].set("district", $(this).val());
            });
            $("#queryCourseBtn").on("click", function (e) {
                var obj = that.sr[that.type].toJSON(), attr, $input, value;
                for (attr in obj) {
                    $input = $("#queryCourse").find("#" + attr + "_Input");
                    value = $input.val();
                    if (value && !$input.hasClass("date")) {
                        that.sr[that.type].set(attr, $input.attr("type") === "number" ? Utilities.toInt(value) : value);
                    }
                }
                app.generalManager.findCourse(that.sr[that.type], {success: that.renderResult, error: Utilities.defaultErrorHandler});
            });
            $("#courseSearchPanel").on("click", "a.search", function (e) {
                var id = e.target.id.split("_")[1];
                $(e.delegateTarget).children("div").addClass("hidden");
                $("#" + id).removeClass("hidden");
            });
        } else if (this.type === "booking") {
            $("#bookingSearchPanel").on("click", "a.search", function (e) {
                var id = e.target.id.split("_")[1];
                $(e.delegateTarget).children("div").addClass("hidden");
                $("#" + id).removeClass("hidden");
            });
            $("#bookingId_Input").on("keypress", function (e) {
                if (e.which === 13) {
                    var bookingId = $(this).val();
                    if (bookingId) {
                        app.navigate("manage/booking/" + bookingId, true);
                    }
                }
            });
            $("#findBookingBtn").on("click", function () {
                var bookingId = $("#bookingId_Input").val();
                if (bookingId) {
                    app.navigate("manage/booking/" + bookingId, true);
                }
            });
            $("#queryBookingBtn").on("click", function () {
                var obj = that.sr[that.type].toJSON(), attr, $input, value;
                for (attr in obj) {
                    $input = $("#queryBooking").find("#"  + attr + "_Input");
                    value = $input.val();
                    if (value && !$input.hasClass("date")) {
                        that.sr[that.type].set(attr, value);
                    }
                }
                app.adminManager.listBooking(that.sr[that.type], {success: that.renderResult, error: Utilities.defaultErrorHandler});
            });

        } else if (this.type === "partner") {
            $("#partnerSearchPanel").on("click", "a.search", function (e) {
                var id = e.target.id.split("_")[1];
                $(e.delegateTarget).children("div").addClass("hidden");
                $("#" + id).removeClass("hidden");
            });
            $("#findPartnerBtn").on("click", function () {
                var partnerId = $("#partnerId_Input").val();
                if (partnerId) {
                    app.navigate("manage/partner/" + partnerId, true);
                }
            });
            $("#queryPartnerBtn").on("click", function () {
                var obj = that.sr[that.type].toJSON(), attr, $input, value;
                for (attr in obj) {
                    $input = $("#queryUser").find("#" + attr + "_Input");
                    value = $input.val();
                    if (value && !$input.hasClass("date")) {
                        that.sr[that.type].set(attr, value);
                    }
                }
                app.adminManager.listPartner(that.sr[that.type], {success: that.renderResult, error: Utilities.defaultErrorHandler});
            });
        } else if (this.type === "admin") {
            $("#adminSearchPanel").on("click", "a.search", function (e) {
                var id = e.target.id.split("_")[1];
                $(e.delegateTarget).children("div").addClass("hidden");
                $("#" + id).removeClass("hidden");
            });
            $("#findAdminBtn").on("click", function () {
                var adminId = $("#adminId_Input").val();
                if (adminId) {
                    app.navigate("manage/admin/" + adminId, true);
                }
            });
            $("#queryAdminBtn").on("click", function () {
                var obj = that.sr[that.type].toJSON(), attr, value, $input;
                for (attr in obj) {
                    $input = $("#queryUser").find("#" + attr + "_Input");
                    value = $input.val();
                    if (value && !$input.hasClass("date")) {
                        that.sr[that.type].set(attr, value);
                    }
                }
                app.adminManager.listAdmin(that.sr[that.type], {success: that.renderResult, error: Utilities.defaultErrorHandler});
            });
        }
    },
    renderCategories: function (categories) {
        var buf = [], key, index, val;
        this.categories = categories;
        for (key in categories) {
            if (key !== "index") {
                index = categories[key].index;
                buf[index] = this.optionTemplate({val: key, text: key});
                if (index === 0) {
                    val = key;
                }
            }
        }
        $("#category_Input").empty().append('<option value="" disabled="" selected="">一级分类</option>' + buf.join(""));
        $("#subCategory_Input").empty().append('<option value="" disabled="" selected="">二级分类</option>');
        $("#subSubCategory_Input").empty().append('<option value="" disabled="" selected="">三级分类</option>');
    },
    renderSubCategories: function (category) {
        var subCategories = this.categories[category], buf = [], key, index, val;
        for (key in subCategories) {
            if (key !== "index") {
                index = subCategories[key].index;
                buf[index] = this.optionTemplate({val: key, text: key});
                if (index === 0) {
                    val = key;
                }
            }
        }
        $("#subCategory_Input").empty().append('<option value="" disabled="" selected="">二级分类</option>' + buf.join(""));
        $("#subSubCategory_Input").empty().append('<option value="" disabled="" selected="">三级分类</option>');
    },
    renderSubSubCategories: function (category, subCatgory) {
        var subSubCategories = this.categories[category][subCatgory], buf = [], key, index, val;
        for (key in subSubCategories) {
            if (key !== "index") {
                index = subSubCategories[key].index;
                buf[index] = this.optionTemplate({val: key, text: key});
                if (index === 0) {
                    val = key;
                }
            }
        }
        $("#subSubCategory_Input").empty().append('<option value="" disabled="" selected="">三级分类</option>' + buf.join(""));
    },
    renderLocations: function (list) {
        this.locations = list;
        var buf = [], attr, index;
        for (attr in list) {
            if (attr !== "index") {
                index = list[attr].index;
                buf[index] = this.optionTemplate({val: attr, text: attr});
            }
        }
        $("#province_Input").empty().append('<option value="" disabled="" selected="">省份</option>' + buf.join(""));
        $("#city_Input").empty().append('<option value="" disabled="" selected="">城市</option>');
        $("#district_Input").empty().append('<option value="" disabled="" selected="">地区</option>');
    },
    renderCity: function (province) {
        var cities = this.locations[province], buf = [], city, index;
        for (city in cities) {
            if (city !== "index") {
                index = cities[city].index;
                buf[index] = this.optionTemplate({val: city, text: city});
            }
        }
        $("#city_Input").empty().append('<option value="" disabled="" selected="">城市</option>' + buf.join(""));
        $("#district_Input").empty().append('<option value="" disabled="" selected="">地区</option>');
    },
    renderDistrict: function (province, city) {
        var districts = this.locations[province][city], buf = [], district, index;
        for (district in districts) {
            if (district !== "index") {
                index = districts[district].index;
                buf[index] = this.optionTemplate({val: district, text: district});
            }
        }
        $("#district_Input").empty().append('<option value="" disabled="" selected="">地区</option>' + buf.join(""));
    },
    renderResult: function (results) {
        var array = results.toArray();
        this.resultView[this.type].allMessages.reset(array);
        this.resultView[this.type].messages.reset(array);
        this.resultView[this.type].render();
    },
    closeActiveView: function () {
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