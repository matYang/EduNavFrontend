(function () {
    'use strict';

    this.GeneralManager = function(sessionManager){

        this.apis = new ApiResource();

        //time stamp updates when user data changes or sycns
        this.timeStamp = new Date();
    };


    //reset the manager state upon logout
    GeneralManager.prototype.release = function() {
        this.timeStamp = new Date();
    };

    GeneralManager.prototype.fetchCourse = function () {

    }

}).call(this);
