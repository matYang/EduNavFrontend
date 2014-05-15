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
        // var that = this;

        // if (this.ownerId === this.userId) {
        //     this.cancelWindowTpl = _.template(tpl.get('messageCancel'));
        //     var $popup = $("#popup").attr("class", "pop book_no").append(that.cancelWindowTpl());
        //     var $overlay = $("#overlay");
        //     this.$viewend = $("#view_end").on("click", function () {
        //         $popup.show();
        //         $overlay.show();
        //     });
        //     this.$viewendConfirm = $("#messageEndConfirm").on("click", function(){
        //         $(this).val("取 消 中 ...").prop("disabled", true);
        //         app.courseManager.deactivateMessage(that.message.id, {
        //             "success": that.cancelSuccess,
        //             "error": that.cancelError
        //         });
        //     });
        //     this.$viewendCancel = $("#messageEndClose,#messageEndCancel").on("click", function(){
        //         that.$viewendConfirm.val("确认");
        //         $popup.hide();
        //         $overlay.hide();
        //     });
        // }

        // var n = this.departureSeats < this.arrivalSeats ? this.departureSeats : this.arrivalSeats;
        // this.$viewbook = $("#view_book");
        // this.$viewcontact = $("#view_contact");
        // this.$viewlink = $("#view_contactLink");
        // if (this.departureSeats === 0 && this.arrivalSeats === 0) {
        //     this.$viewbook.text("座位已满").css("background-color", "#888888").css("width", "100%").off();
        // } else if (this.parsedMessage.type === Constants.messageType.help) {
        //     this.$viewbook.on("click", function (e) {
        //         if (app.sessionManager.hasSession()) {
        //             that.transactionView = new TransactionDetailView (that.newTransaction, {
        //                 "departure_seatsNumber": that.message.get("departure_seatsNumber") - that.message.get("departure_seatsBooked"),
        //                 "arrival_seatsNumber": that.message.get("arrival_seatsNumber") - that.message.get("arrival_seatsBooked")
        //             });
        //         } else {
        //             Info.alert("请先登录。若是已经登陆，请刷新页面。");
        //             $("html, body").animate({ scrollTop: 0, complete: function(){ $("#loginBox").show();} }, "slow");
        //         }
        //     });
        // } else if (this.parsedMessage.type === Constants.messageType.ask) {
        //     this.$viewcontact.on('click', function () {
        //         if (app.sessionManager.hasSession()) {
        //             app.letterView.switchContact(that.ownerId);
        //         } else {
        //             Info.alert("请先登录。若是已经登陆，请刷新页面。");
        //             $("html, body").animate({ scrollTop: 0, complete: function(){ $("#loginBox").show();} }, "slow");
        //         }
        //     });
        // }
        // this.$viewlink.on('click', function (e) {
        //     e.preventDefault();
        //     app.letterView.switchContact(that.ownerId);
        // });
        // $("#view_profilePicture, #view_profileName").on("click", function (e) {
        //     app.navigate("personal/"+this.ownerId, true);
        // });
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
