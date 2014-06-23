(function () {
    'use strict';

    //constructor
    this.CacheService = function () {
        this.enableCache = true;
        this.cache = {
            "course":{},
        }
        this.expireTime = {
            "course":86400000
        }
    };

    CacheService.prototype.getCache(type, key) {
        var date;
        if (this.cache[type][key]) {
            date = new Date();

            return date.getTime < this.cache[type][key].timestamp + this.expireTime[type] ? this.cache[type][key].value: null;
        }
    }

    CacheService.prototype.getCache(type, key, value) {
        var date = new Date();
        this.cache[type][key] = {
            "timestamp": date.getTime(),
            "value": value
        }
    }    

}).call(this);