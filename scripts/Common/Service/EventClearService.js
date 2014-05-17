(function () {
    'use strict';
    
    var clearableViewQueue = [];

    //constructor
    this.EventClearService = function () {
        var self = this;
        $('body').on('click', function(){
            self.clearViews();
        });

    };

    EventClearService.prototype.clearViews = function() {
        for (var i = clearableViewQueue.length-1; i >=0; i--){
            if (typeof clearableViewQueue[i] !== 'undefined' && clearableViewQueue[i] !== null){
                clearableViewQueue[i].close();
            }
            clearableViewQueue.pop();
        }
    };

    EventClearService.prototype.registerView = function(clearableView) {
        if (typeof clearableView !== 'undefined' && clearableView instanceof Backbone.View){
            clearableViewQueue.push(clearableView);
        }
    };

    
}).call(this);