var Info = {

    alert: function (data, options) {
        app.infoModal.setMessage(data).show();
        // Info.displayErrorPage("content", data);
    },

    log: function (data, options) {
        console.log(data);
    },

    warn: function (data, options) {
        console.warn(data);
    },

    displayErrorPage: function (div, message) {
        app.infoModal.setMessage(message).show();
    },
    displayNotice: function (message, callback) {
        app.infoModal.setMessage(message).show();
        if (callback) {
            callback();
        }
    }
}; 