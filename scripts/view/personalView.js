var PersonalView = Backbone.View.extend({
    initialize: function (params) {
        _.bindAll(this, 'preRender', 'render', 'renderError', 'switchChildView', 'createChildView', 'getCurrentUserId', 'renderWatchButton', 'bindEvents', 'close');
        app.viewRegistration.register("personal", this, true);
        this.isClosed = false;

        this.template = _.template(tpl.get('personal'));
        //this curUserId is used to record the id of the user the personalPage is currently displaying
        this.curUserId = Utilities.toInt(params.intendedUserId);
        this.activeViewState = params.viewState;
        this.childrenViews = {};
        this.domContainer = $('#content');
        this.watched = false;
        this.sessionUser = app.sessionManager.getSessionUser();
        this.query = params.query;
        app.userManager.fetchUser(this.curUserId, {
            "success": this.preRender,
            "error": this.renderError
        });

    },

    preRender: function (user) {
        if ( location.href.indexOf("personal/"+this.curUserId) < 0) {
            return;
        }
        var that = this;
        this.user = user;
        var userJson = this.user._toJSON();
        this.domContainer.append(this.template(userJson));
        app.userManager.fetchWatchedUsers(this.sessionUser.id, {
            "success": this.renderWatchButton,
            "error": function(response) {
                Info.log(response);
                if (that.curUserId.id !== that.sessionUser.id) {
                    $("#profilePage_utilityTab").hide();
                }
            }
        });
        $("#popup").attr("class", "pop message_reservation");
        this.render();
        this.switchChildView(this.activeViewState);
        this.bindEvents();
    },
    renderWatchButton: function (socialList) {
        if (this.sessionUser.get("userId") !== this.curUserId) {

            for (var user = 0; user < socialList.length; user++) {
                if (socialList.at(user).get("userId") === this.curUserId) {
                    this.watched = true;
                    break;
                }
            }
            //if user has watched this user
            if (this.watched) {
                $("#profilePage_utilityTab").html(" - 取消关注");
                this.bindDeWatchEvent();
            } else {
                $("#profilePage_utilityTab").html(" + 关注");
                this.bindWatchEvent();
            }
        }
    },
    render: function () {
    },
    renderError: function () {
        if (this.curUserId.id !== that.sessionUser.id) {
            $("#profilePage_utilityTab").hide();
        }
        Info.displayErrorPage("content", "个人页面加载失败，请稍后再试");
    },
    switchChildView: function (viewState, query) {

        //validity of viewState is guranteed on the URL level, since deep linking is applied
        //reduncy of safety check is not necessary here because in development, we need to know where things go wrong
        if ( viewState instanceof Object) {
            this.activeViewState = viewState.viewState;
        } else {
            this.activeViewState = viewState;
        }
        if (query) {
            this.query = query;
        }
        this.createChildView();
    },

    getCurrentUserId: function () {
        return this.curUserId;
    },

    createChildView: function () {
        if (this.activeChildView) {
            this.activeChildView.close();
        }
        var create = true;
        $('#myPage_tabControl>.active').removeClass('active');
        switch (this.activeViewState) {
            case "message":
                $('#profilePage_messageTab').addClass('active');
                this.activeChildView = new PersonalMessageView ({
                    'intendedUserId': this.curUserId
                });
                break;
            case "history":
                $('#profilePage_historyTab').addClass('active');
                this.activeChildView = new PersonalHistoryView ({
                    'intendedUserId': this.curUserId
                });
                break;
            case "utility":
                if (this.sessionUser.get("userId") === this.curUserId) {
                    $('#profilePage_utilityTab').addClass('active');
                    this.activeChildView = new PersonalUtilityView ({
                        'intendedUserId': this.curUserId,
                        'query': this.query
                    });
                }
                break;
            default:
                Info.warn("PersonalView:: createChildView:: this.viewState matchin failed in switch, using Watch as default");
                this.activeChildView = new PersonalHistoryView ({
                    'intendedUserid': this.curUserId
                });
                break;
        }

        this.childrenViews[this.activeViewState] = this.activeChildView;
    },

    bindEvents: function () {
        var that = this;
        $('#profilePage_messageTab').on('click', function () {
            app.navigate("personal/" + that.curUserId + "/message");
            that.switchChildView("message");
        });

        $('#profilePage_historyTab').on('click', function () {
            app.navigate("personal/" + that.curUserId + "/history");
            that.switchChildView("history");
        });

        $('#profilePage_utilityTab').on('click', function () {
            if (app.sessionManager.getUserId() === that.curUserId) {
                app.navigate("personal/" + that.curUserId + "/utility");
                that.switchChildView("utility");
            } else {
                
            }
        });
    },
    close: function () {
        if (!this.isClosed) {
            if (this.activeChildView) {
                this.activeChildView.close();
            }
            $('#profilePage_messageTab').off();
            $('#profilePage_historyTab').off();
            $('#profilePage_utilityTab').off();

            this.unbind();
            this.domContainer.empty();
            this.isClosed = true;
        }
    }
});
