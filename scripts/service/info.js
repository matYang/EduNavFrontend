var Info = {

    alert: function (data, options) {
        alert(data);
        // Info.displayErrorPage("content", data);
    },

    log: function (data, options) {
        console.log(data);
    },

    warn: function (data, options) {
        console.warn(data);
    },

    displayErrorPage: function (div, message) {
        $("#" + div).empty();
        $("#" + div).append("<div class='errorMessage'>" + message + "</div>");
    },
    displayNotice: function (message, callback) {
        $("#topNoticeBar").html(message);
        $("#topNoticeBar").fadeIn(200, function(){
                setTimeout(function(){$("#topNoticeBar").fadeOut()}, 5000);
                
        });
        if (callback) {
            callback();
        }
    }
}; 