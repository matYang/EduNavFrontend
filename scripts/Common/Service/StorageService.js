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
        this.compareList = [];
        this.views = {};
        //detect once upon initialization
        this.isSupported = isStorageSupported();
        //if local storage supported, reinitialize the storage variables from local storage, now control hands over to
        // live storage variables
        if (!this.isSupported || !localStorage.sr) {
            this.sr = {
                course: new CourseSearchRepresentation (),
                user: new UserSearchRepresentation (),
                partner: new PartnerSearchRepresentation (),
                booking: new BookingSearchRepresentation ()
            }

        }
        if (this.isSupported) {
            if (localStorage.sr) {
                this.sr = {
                    course: new CourseSearchRepresentation (localStorage.sr.course, {parse: true}),
                    user: new UserSearchRepresentation (localStorage.sr.user, {parse: true}),
                    partner: new PartnerSearchRepresentation (localStorage.sr.partner, {parse: true}),
                    booking: new BookingSearchRepresentation (localStorage.sr.booking, {parse: true})
                }
            } 
            if (localStorage.compareList) {
                this.compareList = JSON.parse(localStorage.compareList || "[]");
            }
            if (typeof this.compareList === "number") {
                this.compareList = [];
                localStorage.compareList = "";
            }

        } 
    };

    /**
     * expecting: UserLocaton object, date object, searchType
     */

    StorageService.prototype.getSearchQueryState = function () {
        return this.searchQueryState;
    };

    StorageService.prototype.getSearchRepresentationCache = function (type) {
        return typeof this.sr[type] !== 'undefined' ? this.sr[type] : new UserSearchRepresentation ();
    };

    StorageService.prototype.setSearchRepresentationCache = function (sr, type) {
        if ( sr instanceof Backbone.Model) {
            this.sr[type] = sr;
            localStorage.sr = this.sr;
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

    StorageService.prototype.addCourseToCompare = function (courseId) {
        for (var i = 0; i < this.compareList.length; i++) {
            if (this.compareList[i] === courseId) {
                return false;
            }
        }
        if (this.compareList.length < 4 && courseId) {
            this.compareList.push(courseId);
            localStorage.compareList = JSON.stringify(this.compareList);
            return true;
        } else {
            return false;
        }
    };

    StorageService.prototype.removeCourseFromCompare = function (index) {
        if (typeof index === "string") {
            index = Utilities.toInt(index);
        }
        var newArray = [];
        for (var i = 0; i < this.compareList.length; i++) {
            if (this.compareList[i] && this.compareList[i] !== index) {
                newArray.push(this.compareList[i]);
            }
        }
        this.compareList = newArray;
        localStorage.compareList = JSON.stringify(this.compareList);
    };

    StorageService.prototype.getCoursesToCompare = function () {
        this.compareList = JSON.parse(localStorage.compareList || "[]");
        for (var i = 0; i < this.compareList.length; i++) {
            if (!this.compareList[i]) {
                if (i < this.compareList.length - 1) {
                    this.compareList[i] = this.compareList[i+1];
                    this.compareList[i+1] = null;
                } else {
                    this.compareList.pop();
                }
            }
        }
        return this.compareList;
    };

    StorageService.prototype.setCoursesToCompare = function (list) { 
        if (list && list instanceof Array && list.length <= 4) {
            for (var i = 0; i < list.length; i++) {
                if (!list[i]) {
                    if (i < list.length - 1) {
                        list[i] = list[i+1];
                        list[i+1] = null;
                    } else {
                        list.pop();
                    }
                }
            }
            this.compareList = list
            localStorage.compareList = JSON.stringify(this.compareList);
            return true;
        } else {
            return false;
        }
    };
}).call(this);