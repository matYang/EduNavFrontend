var CourseManageView = MultiPageView.extend({
    entryTemplate: "courseManageEntry",
    entryContainer: "#courses",
    entryClass: "courseEntry",
    pageNavigator: "",
    pageNavigatorClass: "",
    pageEntryNumber: 10,
    pageNumberClass: "",
    pageNumberId: "",
    entryEvent: "",
    allMessages: [],
    messages: null,
    entryHeight: 80,
    minHeight: 400,
    noMessage: "暂无课程",
    el: null,
    initialize: function(){
        this.isClosed = false;
        MultiPageView.prototype.initialize.call(this);
        app.courseManager.findCourse(
            new CourseSearchRepresentation({partnerId: app.sessionManager.sessionModel.id}), 
            {
                "success": this.render,
                "error": function(){}
            }
        );
        
    },
    render: function () {
        MultiPageView.prototype.render.call(this);
    },
    renderFail: function () {

    },
    bindEvents: function () {

    },
    close: function () {
        if (!this.isClosed) {
            this.isClosed = false;
            $el.empty();
        }
    }
});