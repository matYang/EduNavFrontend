(function () {
    

    //constructor

    this.CacheService = function () {
        this.enableCache = false;
        if (localStorage && localStorage.cache) {
            this.cache = JSON.parse(localStorage.cache);
        } else {
            this.cache = {
                "course":{},
                "queryCourse": {},
                "poi":{}    //
            }
        }
        this.expireTime = {
            "course":86400000,
            "queryCourse": 600000,
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

            if (date.getTime() < this.cache[type][key].timestamp + this.expireTime[type]) {
                return this.cache[type][key].value;
            } else {
                this.cache[type][key] = null;
                return null;
            }
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