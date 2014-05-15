(function () {
    'use strict';
    
    var defaultLocations = new DefaultUserLocations();

    //constructor
    this.LocationService = function () {
        this.isLoading = true;
        var self = this;
        defaultLocations.fetch({
            dataType:'json',

            success: function(model, response){
                self.timeStamp = new Date();
                self.isLoading = false;
                Info.log("Defualt Location Successfully Loaded");
            },

            error: function(model, response){
                self.isLoading = false;
                Info.warn("Default Location Not Loaded Properly");
            }
        });

    };

    LocationService.prototype.shouldReload = function() {
        if (typeof this.timeStamp === 'undefined' || defaultLocations.length === 0){
            return true;
        }
        var expireTime = 24*3600*1000,   //expires in 24 hours
            curTime = new Date(),
            timeDiff = curTime.getTime() - this.timeStamp.getTime();
        
        return timeDiff >= expireTime;
    };

    LocationService.prototype.getDefaultLocations = function(callback, inst){
        if (this.shouldReload()){
            this.reload(callback, inst);
        } else if (inst && callback) {
            inst.defaultLocations = defaultLocations;
            callback();
        }
        //no matter reload or not, always immediately return the current cache, ensuring total sync is too much effort
        return defaultLocations;
    };

    LocationService.prototype.reload = function(callback, inst){
        if (this.isLoading && !callback){
            return;
        }
        this.isLoading = true;
        var self = this;

        defaultLocations.fetch({
            dataType:'json',

            success:function(model, response){
                self.timeStamp = new Date();
                self.isLoading = false;
                Info.log("Defualt Location successfully loaded");
                if (typeof inst !== 'undefined'){
                    inst.defaultLocations = defaultLocations;
                }
                if (callback) {
                    callback();
                }
            },

            error: function(model, response){
                self.isLoading = false;
                Info.warn("Default Location Not Loaded Properly");
            }
        });

    };
    
}).call(this);