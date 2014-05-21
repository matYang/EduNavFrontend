var CourseManageView = MultiPageView.extend({
    entryTemplate: "courseManageEntry",
    entryContainer: "#courses",
    entryClass: "courseEntry",
    pageNavigator: "",
    pageNavigatorClass: "",
    pageEntryNumber: 10,
    startIndex: 0,
    currentPage: 1,
    pageNumberClass: "",
    pageNumberId: "",
    entryEvent: "",
    allMessages: [],
    messages: null,
    entryHeight: -1,
    entryRowNum: 1,
    minHeight: 0,
    noMessage: "暂无课程",
    _filters:[],
    _sorter:[],
    eventBound: false,
    $domContainer: null,
    initialize: function(){
        MultiPageView.prototype.initialize.call(this);
        app.courseManager.searchCourses(new SearchRepresentation({partnerId: app.sessionManager.getSessionUser().id}),
            {
                "success": this.render,
                "error": function(){}
            });
        
    },
    render: function () {
        MultiPageView.prototype.render.call(this);
    },
    close: function () {

    }
});