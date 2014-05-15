var PersonalMessageView = Backbone.View.extend({
    el: "#profilePage_content",
    initialize: function (params) {
        _.bindAll(this, 'render', 'loadMessage', 'close');
        this.isClosed = false;
        this.wrapperTemplate = _.template(tpl.get('personalMessage'));

        this.curUserId = params.intendedUserId;
        this.user = app.sessionManager.getSessionUser();
        this.$el.append(this.wrapperTemplate);
        app.userManager.fetchMessageHistory(this.curUserId, {
            "success": this.render,
            "error": this.error
        });
    },

    render: function (courses) {
        // this.myActiveContainer = $("#profilePage_messagePublishedContent");
        // this.myFinishedContainer = $("#profilePage_messageParticipatedContent");
        // this.loadMessage(messages);
    },

    loadMessage: function (courses) {
        // var myMessages = new Messages (), pMessages = new C ();
        // for (var i = 0; i < messages.length; i++) {
        //     message = messages.at(i);
        //     if (message.get("ownerId") === this.curUserId) {
        //         myMessages.add(message);
        //     }
        // }
        // this.myMessageHistoryView = new MessageHistoryView (myMessages, "profilePage_messagePublished");

    },
    error: function () {
        Info.displayErrorPage("profilePage_content", "Message History fetch failed");
    },
    close: function () {
        if (!this.isClosed) {
            //TODO: unbind all the events
            this.$el.empty();
            this.isClosed = true;
        }
    }
}); 