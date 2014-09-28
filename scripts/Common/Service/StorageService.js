(function () {
    
    //wooooooola, no more global objects, globals are bad, very bad

    //note this is not a global helper function, it is encapsulated inside this modular function scope
    var isStorageSupported = function () {
        if ( typeof (localStorage) === "undefined" || typeof (sessionStorage) === "undefined") {
            if (!window.localStorage) {
              Object.defineProperty(window, "localStorage", new (function () {
                var aKeys = [], oStorage = {};
                Object.defineProperty(oStorage, "getItem", {
                  value: function (sKey) { return sKey ? this[sKey] : null; },
                  writable: false,
                  configurable: false,
                  enumerable: false
                });
                Object.defineProperty(oStorage, "key", {
                  value: function (nKeyId) { return aKeys[nKeyId]; },
                  writable: false,
                  configurable: false,
                  enumerable: false
                });
                Object.defineProperty(oStorage, "setItem", {
                  value: function (sKey, sValue) {
                    if(!sKey) { return; }
                    document.cookie = escape(sKey) + "=" + escape(sValue) + "; path=/";
                  },
                  writable: false,
                  configurable: false,
                  enumerable: false
                });
                Object.defineProperty(oStorage, "length", {
                  get: function () { return aKeys.length; },
                  configurable: false,
                  enumerable: false
                });
                Object.defineProperty(oStorage, "removeItem", {
                  value: function (sKey) {
                    if(!sKey) { return; }
                    var sExpDate = new Date();
                    sExpDate.setDate(sExpDate.getDate() - 1);
                    document.cookie = escape(sKey) + "=; expires=" + sExpDate.toGMTString() + "; path=/";
                  },
                  writable: false,
                  configurable: false,
                  enumerable: false
                });
                this.get = function () {
                  var iThisIndx;
                  for (var sKey in oStorage) {
                    iThisIndx = aKeys.indexOf(sKey);
                    if (iThisIndx === -1) { oStorage.setItem(sKey, oStorage[sKey]); }
                    else { aKeys.splice(iThisIndx, 1); }
                    delete oStorage[sKey];
                  }
                  for (aKeys; aKeys.length > 0; aKeys.splice(0, 1)) { oStorage.removeItem(aKeys[0]); }
                  for (var iCouple, iKey, iCouplId = 0, aCouples = document.cookie.split(/\s*;\s*/); iCouplId < aCouples.length; iCouplId++) {
                    iCouple = aCouples[iCouplId].split(/\s*=\s*/);
                    if (iCouple.length > 1) {
                      oStorage[iKey = unescape(iCouple[0])] = unescape(iCouple[1]);
                      aKeys.push(iKey);
                    }
                  }
                  return oStorage;
                };
                this.configurable = false;
                this.enumerable = true;
              })());
            }
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
                tuan: new CourseSearchRepresentation (),
                user: new UserSearchRepresentation (),
                partner: new PartnerSearchRepresentation (),
                booking: new BookingSearchRepresentation ()
            };
        }
        if (this.isSupported) {
            if (localStorage.sr) {
                this.sr = {
                    course: new CourseSearchRepresentation (localStorage.sr.course, {parse: true}),
                    tuan: new TuanSearchRepresentation (localStorage.sr.tuan, {parse: true}),
                    user: new UserSearchRepresentation (localStorage.sr.user, {parse: true}),
                    partner: new PartnerSearchRepresentation (localStorage.sr.partner, {parse: true}),
                    booking: new BookingSearchRepresentation (localStorage.sr.booking, {parse: true})
                };
            } 
            if (localStorage.compareList) {
                this.compareList = JSON.parse(localStorage.compareList || "[]");
            }
            if (typeof this.compareList === "number") {
                this.compareList = [];
                if (localStorage) {
                    localStorage.compareList = "";
                }
            }

        } else {
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
            if (localStorage) {
                localStorage.compareList = JSON.stringify(this.compareList);
            }
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
        if (localStorage) {
            localStorage.compareList = JSON.stringify(this.compareList);
        }
    };

    StorageService.prototype.getCoursesToCompare = function () {
        if (localStorage) {
            this.compareList = JSON.parse(localStorage.compareList || "[]");
        } else {
            this.compareList = [];
        }
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
            this.compareList = list;
            if (localStorage) {
                localStorage.compareList = JSON.stringify(this.compareList);
            }
            return true;
        } else {
            return false;
        }
    };
}).call(this);