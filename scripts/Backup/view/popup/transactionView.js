var BookingDetailView = Backbone.View.extend({

    el: "",

    initialize: function (transaction, info) {
        var i, that = this;
        _.bindAll(this, 'render', 'bindEvents', 'bookSuccess', 'scoreSuccess', 'bookFail', 'scoreFail', 'bindEvaluationEvent', 'renderStar', 'close');
        app.viewRegistration.register("bookingDetail", this, true);
        this.isClosed = false;
        this.transaction = transaction;
        this.info = info;
        this.json = this.transaction._toJSON();
        for (i in info) {
            this.json[i] = info[i];
        }

        this.user = app.sessionManager.getSessionUser();
        // if (testMockObj.testMode){
        // 	this.transaction = testMockObj.sampleBookingA;
        // 	//To allow edit
        // }
        this.user = app.sessionManager.getSessionUser();
        this.editable = transaction.get("bookingId") === -1;
        this.userId = this.user.get("userId");
        this.template = _.template(tpl.get('transactionDetail'));
        this.$domContainer = $('#popup').addClass("message_reservation");
        this.$mask = $('#overlay').show();
        this.render();
        this.textareaClicked = false;

        this.bindEvents();
        if (this.transaction.get("state") === 3) {
            this.bindEvaluationEvent(); 
        }
    },
    render: function () {
        this.$domContainer.append(this.template(this.json));
        this.$unitPrice = $("#unitPriceValue");
        this.$totalPrice = $("#transaction_totalPrice");
        this.$domContainer.show();
    },
    bindEvents: function () {
        var that = this, temp;
        this.$closeButton = $("#closeButton").on("click", function () {
            that.close();
        });
        if (this.editable) {
            this.$transactionNote = $("#transaction_userNote").on("focus", function (e) {
                if (!that.textareaClicked) {
                    that.textareaClicked = true;
                    e.target.textContent = "";
                }
            });
            
        }
        if (this.transaction.id === -1) {
            this.$functionButton = $("#startButton").on("click", function () {
                if (that.textareaClicked) {
                    that.transaction.set("userNote", that.$transactionNote.val());
                }
                that.transaction.set("departure_seatsBooked" , that.bookInfo.number);
                if ((that.info.departure_seatsNumber >= that.transaction.get("departure_seatsBooked") && that.bookInfo.go) || (that.info.arrival_seatsNumber >= that.transaction.get("arrival_seatsBooked") && that.bookInfo.back)) {
                    if (that.bookInfo.go === 1) {
                        $(this).val("预 约 中...").prop("disabled", true);
                        app.transactionManager.initTransaction(that.transaction, {
                            "success": that.bookSuccess,
                            "error": that.bookFail
                        });
                    }
                    if (that.bookInfo.back === 1) {
                        $(this).val("预 约 中...").prop("disabled", true);
                        var temp = that.transaction.get("arrival_location");
                        that.transaction.set("arrival_location", that.transaction.get("departure_location"));
                        that.transaction.set("departure_location", temp);
                        app.transactionManager.initTransaction(that.transaction, {
                            "success": that.bookSuccess,
                            "error": that.bookFail
                        });
                    }
                } else {
                    that.$transactionNumber.addClass("invalid_input");
                }
            });
        } else if (this.transaction.get("state") === Constants.transactionState.init) {
            this.$functionButton = $("#cancelButton").on("click", function () {
                app.transactionManager.changeTransactionState({
                    "bookingId": that.transaction,
                    "stateChangeAction": Constants.transactionStateChangeAction.cancel
                }, {
                    "success": that.bookSuccess,
                    "error": that.bookFail
                });
            });
        } else {
            this.$functionButton = $("#contactButton").on("click", function () {
                var targetUserId = that.user.id === that.transaction.get("provider").id ? that.transaction.get("customer").id : that.transaction.get("provider").id;
                app.letterView.switchContact(targetUserId);
            });
        }
    },

    bookSuccess: function () {
        $("#bookedStatus").show();
        this.$functionButton.off().val("预 约 成 功");
    },
    scoreSuccess: function () {
        
    },
    scoreFail: function () {
        
    },
    bookFail: function () {
        this.$functionButton.val("预约失败, 重试").removeAttr("disabled");
    },
    bindEvaluationEvent: function () {

        this.$providerStar = $("#providerStar");
        this.$customerStar = $("#customerStar");
        var submit = {
            "transactionId":this.transaction.id,
            "stateChangeAction":Constants.transactionStateChangeAction.evaluate
        }, that = this;
        if (this.transaction.providerId === this.user.id) {
            this.$customerStar.children(".star").on("mouseenter", function (e) {
                $(this).prevAll().addClass("on");
                $(this).addClass("on");
                $(this).nextAll().removeClass("on");
            }).on("mouseleave", function (e) {
                if (!$(e.toElement).hasClass("star")) {
                    that.renderStar(0);
                }
            }).on("click", function (e) {
                submit.score = that.$customerStar.children(".star").index(this);
                app.transactionManager.changeTransactionState(submit, {
                    "success":that.scoreSuccess,
                    "error":that.scoreFail
                });
            });
        } else if (this.transaction.customerId === this.user.id){
            this.$providerStar.children(".star").on("mouseenter", function (e) {
                $(this).prevAll().addClass("on");
                $(this).addClass("on");
                $(this).nextAll().removeClass("on");
            }).on("mouseleave", function (e) {
                if (!$(e.toElement).hasClass("star")) {
                    that.renderStar(1);
                }
            }).on("click", function (e) {
                submit.score = that.$providerStar.children(".star").index(this);
                app.transactionManager.changeTransactionState(submit, {
                    "success":that.scoreSuccess,
                    "error":that.scoreFail
                });
            });
        }
    },
    renderStar: function(flag) {
        var pevaluation = this.transaction.get("providerEvaluation"),
            cevaluation = this.transaction.get("customerEvaluation"),
            pstars = this.$providerStar.children(".star"), 
            cstars = this.$customerStar.children(".star"),
            i;
        if (flag === 0) {
            if ( cevaluation > 0) {
                cstars.slice( 0, cevaluation-1).addClass("on");
                cstars.slice( cevaluation-1, 5).removeClass("on");
            }
        } else if (flag === 1) {
            if ( pevaluation > 0) {
                pstars.slice( 0, pevaluation-1).addClass("on");
                pstars.slice( pevaluation-1, 5).removeClass("on");
            }
        } else {

        }
    },
    close: function () {
        if (!this.isClosed) {
            this.$closeButton.off();
            this.$functionButton.off();
            if (this.$providerStar) {
                this.$providerStar.children(".star").off();
            } else if (this.$customerStar) {
                this.$customerStar.children(".star").off();
            }
            this.$domContainer.empty();
            this.$domContainer.hide();
            this.$mask.hide();
            this.isClosed = true;
        }
    }
});
