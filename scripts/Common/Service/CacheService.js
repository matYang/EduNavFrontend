(function () {
    'use strict';

    //constructor

    this.CacheService = function () {
        this.enableCache = true;
        this.cache = {
            "course":{},
            "poi":{}    //
        }
        this.expireTime = {
            "course":86400000,
            "poi": -1
        }
    };

    CacheService.prototype.get = function(type, key) {
        if (!this.enableCache) {
            return null;
        }
        var date;
        if (this.cache[type] && this.cache[type][key]) {
            if (this.expireTime[type] === -1) {
                return this.cache[type][key].value;
            }
            date = new Date();

            return date.getTime < this.cache[type][key].timestamp + this.expireTime[type] ? this.cache[type][key].value: null;
        } else {
            return null;
        }
    }

    CacheService.prototype.set = function(type, key, value) {
        if (!this.enableCache) {
            return;
        }
        var date = new Date();
        if (!this.cache[type])  {
            this.cache[type] = {};
        }
        this.cache[type][key] = {
            "timestamp": date.getTime(),
            "value": value
        }
    }    

}).call(this);