var MessageEditView = MessagePostView.extend({

    el: "",
    initialize: function (messageIdObj) {
        _.bindAll(this, 'render', 'renderFirstPage', 'renderSecondPage', 'renderThirdPage', 'reverseMessage', 'close');
        app.viewRegistration.register("MessageEdit", this, true);
        var self = this;
        app.courseManager.fetchMessage(messageIdObj.messageId, {
            success: function (message) {
                self.message = message;
                self.reverseMessage(self.message);
                MessagePostView.prototype.initialize({
                    "method": "message/" + self.message.get("messageId") + "/edit"
                });
                self.renderFirstPage();
            },
            error: function () {
                Info.displayErrorPage("content", "消息读取失败, 请刷新页面");
            }
        });

    },
    render: function (step) {
        if (step === 1) {
            this.renderFirstPage();
        } else if (step === 2) {
            this.renderSecondPage();
        } else if (step === 3) {
            this.renderThirdPage();
        }

    },
    renderFirstPage: function () {
        var that = this;
        MessagePostView.prototype.render(1);
        $('#publish_nextStep').off();
        $('#publish_nextStep').on('click', function () {
            if (MessagePostView.prototype.validate(1)) {
                app.navigate("message/" + that.message.id + "/edit/step2");
                that.renderSecondPage();
            }
        });
        $('#publish_type>div').off();
    },
    renderSecondPage: function () {
        var that = this;
        MessagePostView.prototype.render(2);
        $('#publish_nextStep').off();
        $('#publish_nextStep').on('click', function () {
            if (MessagePostView.prototype.validate(2)) {
                app.navigate("message/" + that.message.id + "/edit/step3");
                that.renderThirdPage(3);
            }
        });
        $('#publish_back').on('click', function () {
            app.navigate("message/" + that.message.id + "/edit/step1");
            that.renderFirstPage(1);
        });
        $("#publish_time_add").hide();
        $('#publish_delete').remove();
    },
    renderThirdPage: function () {
        var that = this;
        MessagePostView.prototype.render(3);
        $('#publish_nextStep').off();
        $('#publish_back').off();
        $('#publish_back').on('click', function () {
            app.navigate("message/" + that.message.id + "/edit/step1");
            that.renderSecondPage();
        });
        $("#publish_finish").on("click", function (e) {
            that.finish();
        });
    },

    finish: function () {
        var messages = this.toMessage();

        var length = messages.length;
        for (var r = 0; r < length; r++) {
            messages.at(r).set("messageId", this.message.get("messageId"));
            app.courseManager.updateMessage(messages.at(r), {
                "success": this.success,
                "error": this.error
            });
        }
    },
    success: function (message) {
        Info.displayNotice("信息更新成功", function(){
            app.navigate("message/" + message.id, true);
        });
    },  
    error: function () {
        Info.displayNotice("信息更新失败，请稍后重试");
    },
    reverseMessage: function (message) {
        var toSubmit = MessagePostView.prototype.toSubmit;
        toSubmit.origin = message.get("departure_location");
        toSubmit.dest = message.get("arrival_location");
        toSubmit.numberRequests = 1;
        toSubmit.description = message.get("note");
        toSubmit.priceList = message.get("departure_priceList");
        toSubmit.departureSeats = message.get("departure_seatsNumber");
        toSubmit.returnSeats = message.get("arrival_seatsNumber");
        toSubmit.type = message.get("type");
        toSubmit.requests[0] = {};
        toSubmit.requests[0].departDate = message.get("departure_time");
        toSubmit.requests[0].returnDate = message.get("arrival_time");
        toSubmit.requests[0].round = message.get("isRoundTrip");
        toSubmit.requests[0].type = message.get("type");
        toSubmit.requests[0].departTime = message.get("departure_timeSlot");
        toSubmit.requests[0].returnTime = message.get("arrival_timeSlot");
        var entryNum = 0;
        var index = 0;
        for (var p = 0; p < toSubmit.priceList.length; p++) {
            entryNum += (toSubmit.priceList[p] > 0) ? 1 : 0;
            index = p;
        }
        toSubmit.priceListEntries = entryNum;
        toSubmit.conditionalPrice = entryNum > 1 || p > 0;

    },
    close: function () {
        MessagePostView.prototype.close();
    }
});
