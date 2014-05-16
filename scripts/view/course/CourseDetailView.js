var CourseDetailView = Backbone.View.extend({

    el: "#content",

    initialize: function (messageIdWrapper) {
        _.bindAll(this, 'render', 'bindEvents', 'createNewTransaction', 'openTransactionDetail', 'parseTransaction', 'renderPriceList', 'cancelSuccess', 'cancelError', 'close');
        app.viewRegistration.register("MessageDetail", this, true);
        this.isClosed = false;

        this.user = app.sessionManager.getSessionUser();
        this.userId = app.sessionManager.getUserId();
        var self = this;
        this.newTransaction = new Transaction ();
        this.quickmatchTemplate = _.template(tpl.get('SimpleMessage'));
        app.courseManager.fetchMessage(messageIdWrapper.messageId, {
            success: function (course) {
                self.course = course;
                self.courseId = course.get("courseId");
                self.ownerId = self.course.get("ownerId") || -1;

                self.template = _.template(tpl.get('DetailMessage'));
                self.transactionTemplate = _.template(tpl.get('Transaction'));
                self.render();
                self.bindEvents();
                self.createNewTransaction();
            },
            error: function () {
                Info.displayErrorPage("content", "信息读取失败, 请刷新页面");
            }
        });
    },

    render: function () {
        var mapParams = {
            div: "view_map",
            class: "messageDetail-map-content",
            originLocation: this.message.get("departure_location"),
            destLocation: this.message.get("arrival_location"),
            clickable: false
        };
        this.$el.append(this.template(this.parsedMessage));
        this.map = app.storage.getViewCache("MapView", mapParams);
    },
    bindEvents: function () {

    },
    createNewTransaction: function () {
        "bookingId": -1,

        "price": 0.0,
        "startTime": new Date (),
        "endTime": new Date (),
        "status": -1,
        "reference": "",

        "creationTime": new Date ()

        this.newTransaction.set("partner", this.ownerId);
        this.newTransaction.set("userId", this.userId);
        this.newTransaction.set("courseId", this.courseId);
        this.newTransaction.set("startTime", this.course.get("startTime"));
        this.newTransaction.set("endTime", this.course.get("startTime"));
    },
    openTransactionDetail: function (transaction) {
        var that = this;
        this.transactionDetailView = new TransactionDetailView (transaction);
    },

    parseTransaction: function (transaction, i) {
        var parsedTransaction = {};
        parsedTransaction.id = i;
        parsedTransaction.transactionId = transaction.get("transactionId");
        parsedTransaction.targetUserName = transaction.get("targetUserName");
        parsedTransaction.date = Utilities.getDateString(transaction.get("creationTime"));
        return parsedTransaction;
    },

    cancelSuccess: function(){
        this.$viewendConfirm.removeAttr("disabled").val("取消成功, 关闭").off().on("click", function (e) {
            $("#popup").empty().hide();
            $("#overlay").hide();
        });
        this.$viewend.off();
        this.$viewend.val("已经结束").removeClass("btn_R_long").attr("id", "view_expired");
    },

    cancelError: function(){
        this.$viewendConfirm.val("取消失败,请重试").removeAttr("disabled");
    },

    close: function () {
        if (!this.isClosed) {
            if (this.map) {
                this.map.close();
            }

            if ( typeof this.$el !== 'undefined') {
                this.$el.empty();
            }

            $("#popup").empty();
            this.isClosed = true;
        }
    }
});
