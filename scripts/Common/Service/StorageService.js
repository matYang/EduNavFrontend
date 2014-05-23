(function () {
    'use strict';
    //wooooooola, no more global objects, globals are bad, very bad

    //note this is not a global helper function, it is encapsulated inside this modular function scope
    var isStorageSupported = function () {
        if ( typeof (localStorage) === "undefined" || typeof (sessionStorage) === "undefined") {
            alert("您的浏览器不支持本地存贮，已经过时");
            return false;
        }
        return true;
    };

    //constructor
    this.StorageService = function () {
        this.searchQueryState = {
            
        };

        this.views = {};
        //detect once upon initialization
        this.isSupported = isStorageSupported();
        //if local storage supported, reinitialize the storage variables from local storage, now control hands over to
        // live storage variables
        if (this.isSupported) {
            this.searchQueryState = {
            
            };

            
        }

        this.sr = new SearchRepresentation ();
    };

    /**
     * expecting: UserLocaton object, date object, searchType
     */
    StorageService.prototype.updateSearchQueryState = function (newSearchLocation, newSearchDate, newSearchType) {
        this.searchQueryState = {
        
        };

        //if has local storage, update the storage as well
        if (this.isSupported) {
            // localStorage.searchLocation = newSearchLocation.castToString();
            // localStorage.searchDate = newSearchDate.toString();
            // localStorage.searchType = newSearchType;
        }
    };

    StorageService.prototype.getSearchQueryState = function () {
        return this.searchQueryState;
    };

    StorageService.prototype.getSearchRepresentationCache = function () {
        return typeof this.sr !== 'undefined' ? this.sr : new SearchRepresentation ();
    };

    StorageService.prototype.setSearchRepresentationCache = function (sr) {
        if ( sr instanceof Backbone.Model) {
            this.sr = sr;
        }
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