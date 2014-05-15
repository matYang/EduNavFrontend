var AdminUserSearchResultView = MultiPageView.extend({
    initialize: function (allMessages, messageList, isSearchResult) {
        _.bindAll(this, 'render', 'transferURL', 'close');
        this.messages = messageList;
        this.allMessages = allMessages;
        this.isSearchResult = isSearchResult;
        this.entryTemplate = _.template(tpl.get('adminUserRow'));
        this.pageNumberClass = "searchResultPageNumber";
        this.pageNumberId = "searchResultPageNumber";
        this.pageNavigator = "userSearchNavigator";
        this.pageNavigatorClass = "page clearfix";
        this.user = app.sessionManager.getSessionUser();
        this.entryHeight = 71;
        this.pageEntryNumber = 10;
        this.entryClass = "userResult";
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
    close: function () {
        this.$domContainer.empty();
    }
});

var AdminManageView = Backbone.View.extend({
    el:"#main_content",
    initialize: function (type) {
        _.bindAll(this, "render", "bindEvents", "close");
        this.isClosed = false;
        this.baseTemplate = _.template(tpl.get('adminUserManage'));
        this.rowTemplate = _.template(tpl.get('adminUserRow'));
        this.render();
        this.bindEvents();
    },
    render: function () {
        this.$el.append(this.baseTemplate);
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