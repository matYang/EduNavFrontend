(function () {
    'use strict';
    //wooooooola, no more global objects, globals are bad, very bad

    //note this is not a global helper function, it is encapsulated inside this modular function scope
    var isStorageSupported = function () {
        if ( typeof (localStorage) === "undefined" || typeof (sessionStorage) === "undefined") {
            alert("您的浏览器已经成为历史，强烈建议您使用Chrome浏览器. PS: 神马360，搜狗，遨游浏览器都是IE内核，跟Chrome比起来基本处于石器时代");
            return false;
        }
        return true;
    };

    //constructor
    this.StorageService = function () {
        this.searchQueryState = {
            "searchLocation": new UserLocation (),
            "seachDate": new Date (),
            "searchType": Constants.messageType.ask
        };
        this.searchFilterState = {
            "searchGender": Constants.gender.both,
            "searchTimeSlot": Constants.DayTimeSlot.n0,
            "searchPriceInterval": {
                "min": 0,
                "max": 999
            }
        };
        this.views = {};
        //detect once upon initialization
        this.isSupported = isStorageSupported();
        //if local storage supported, reinitialize the storage variables from local storage, now control hands over to
        // live storage variables
        if (this.isSupported) {
            this.searchQueryState = {
                "searchLocation": new UserLocation (true, localStorage.searchLocation),
                "searchDate": new Date (localStorage.searchDate),
                "searchType": localStorage.searchType
            };

            this.searchFilterState = {
                "searchGender": localStorage.searchGender,
                "searchTimeSlot": localStorage.searchTimeSlot,
                "searchPriceInterval": {
                    "min": localStorage.searchPriceMin,
                    "max": localStorage.searchPriceMax
                }
            };
            localStorage.lastContact = localStorage.lastContact || {};
        }

        this.sr = new SearchRepresentation ();
    };

    /**
     * expecting: UserLocaton object, date object, searchType
     */
    StorageService.prototype.updateSearchQueryState = function (newSearchLocation, newSearchDate, newSearchType) {
        this.searchQueryState = {
            "searchLocation": newSearchLocation,
            "searchDate": newSearchDate,
            "searchType": newSearchType
        };

        //if has local storage, update the storage as well
        if (this.isSupported) {
            localStorage.searchLocation = newSearchLocation.castToString();
            localStorage.searchDate = newSearchDate.toString();
            localStorage.searchType = newSearchType;
        }
    };

    StorageService.prototype.getSearchQueryState = function () {
        return this.searchQueryState;
    };

    StorageService.prototype.updateSearchFilterState = function (newSearchGender, newSearchTimeSlot, newSearchPriceInterval) {
        this.searchFilterState = {
            "searchGender": newSearchGender,
            "searchTimeSlot": newSearchTimeSlot,
            "searchPriceInterval": {
                "min": newSearchPriceInterval.min,
                "max": newSearchPriceInterval.max
            }
        };

        if (this.isSupported) {
            localStorage.searchGender = newSearchGender;
            localStorage.searchTimeSlot = newSearchTimeSlot;
            localStorage.searchPriceMin = newSearchPriceInterval.min;
            localStorage.searchPriceMax = newSearchPriceInterval.max;
            localStorage.searchPriceMax = newSearchPriceInterval.max;
        }
    };

    StorageService.prototype.getSearchFilterState = function () {
        return this.searchFilterState;
    };

    StorageService.prototype.getSearchRepresentationCache = function () {
        return typeof this.sr !== 'undefined' ? this.sr : new SearchRepresentation ();
    };

    StorageService.prototype.setSearchRepresentationCache = function (sr) {
        if ( sr instanceof Backbone.Model) {
            this.sr = sr;
        }
    };
	StorageService.prototype.getLastContact = function () {
        if (!this.isSupported) return -1;
        var ret = localStorage.lastContact.split("|");
        if ( Utilities.toInt(ret[0]) === app.sessionManager.sessionUser.id ) {
            return Utilities.toInt(ret[1]);
        } else {
            return -1;
        }
    };

    StorageService.prototype.setLastContact = function (id) {
        localStorage.lastContact = app.sessionManager.sessionUser.id + "|" + id;
    };

    StorageService.prototype.setRecentMessages = function (recentMessages) {
        var now = new Date();
        var json = "";
        for (var i = 0; i < recentMessages.length; i++){
            json+=JSON.stringify(recentMessages.at(i)._toJSON())+"$"; 
        }

        localStorage.recent = now.getTime()+"|"+json;
    };
    StorageService.prototype.getRecentMessages = function (id) {
        if (!this.isSupported) return null;
        var now = new Date();
        now = now.getTime();
        var timestamp, json, raw;
        if (localStorage.recent) {
            raw = localStorage.recent.split("|");
            timestamp = Utilities.toInt(raw[0]);
            json = raw[1];
            if (now - timestamp < 90000){
                json = json.split("$") ;
                for (var i = 0; i < json.length; i++){
                    if (json[i]) {
                        json[i] = JSON.parse(json[i]);
                        
                    }
                }
                json.length-=1;
                return json;
            }
        }
        localStorage.recent = "";
        return null;
    };


    StorageService.prototype.setViewCache = function (type, view) {
        this.views[type] = view;
    };

    StorageService.prototype.getViewCache = function (type, params) {
        this.views[type] = this.views[type];
        if (!this.views[type]){
            this.views[type] = new window[type](params); //create view with dynamic class name
        } else {
            this.views[type].cacheConfig(params);
        }
        return this.views[type];
    };

}).call(this);