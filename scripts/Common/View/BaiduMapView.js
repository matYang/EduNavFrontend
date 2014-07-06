var BaiduMapView = Backbone.View.extend({
    labelTemplate: _.template(tpl.get("mapLabel")),
    initialize: function () {
        this.markers = [];
        this.markerCount = {};
        this.markerName = {};
        if (BMap !== undefined) {
            this.geocoder = new BMap.Geocoder();
            this.mapInitialize();
        } else {
            this.geocoder = {getPoint: Constants.voidFunction};
        }
    },
    // cacheConfig: function (config) {
    //     this.div = config.div;
    //     this.location = config.location || "南京";
    //     this.clickable = config.clickable;
    //     this.init = config.init;
    //     this.class = config.class;
    //     $("#" + this.div).after($("#mapcache").attr("id", "newMap"));
    //     $("#mapcache").remove();
    //     $("#" + this.div).remove();
    //     if (this.class) {
    //         $("#newMap").attr("class", this.class);
    //     }
    //     $("#newMap").attr("id", this.div);
    //     this.mapInitialize();
    // },
    mapInitialize: function () {
        // var opts;
        var poi = new BMap.Point(121.442823, 31.194107);
        this.isClosed = false;
        app.viewRegistration.register(this);
        this.map = new BMap.Map(this.el.id, {enableMapClick: false});  //this should never expire
        var opts = {type: BMAP_NAVIGATION_CONTROL_SMALL}    
        this.map.addControl(new BMap.NavigationControl(opts));
        // this.setCenter(this.location);
    },
    getLatLng: function (locationString, instName) {
        var poi = app.cache.get("poi", locationString);
        this.markerName[locationString] = instName;
        if (poi) {
            this.poi(poi, {address: locationString});
            return;
        }
        this.geocoder.getPoint(locationString, this.poi);
    },
    poi: function (poi, locationObj) {   //っぽい
        var label;
        if (poi) {
            if (this.markers.length === 0) {
                //this.map.panTo(poi);
            }
            label = new BMap.Label(this.labelTemplate({text: this.markerName[locationObj.address]}), {position:poi});
            this.addMarker(label, locationObj.address);
            app.cache.set("poi", locationObj.address, poi);
        } else {
            Info.warn('Geocode was not successful');
        }
    },
    setCenter: function (locationString) {
        var that = this;
        this.geocoder.getPoint(
            locationString,
            function (point) {
                if (point && that.map) {
                    that.map.panTo(point, 11);
                } else {
                    Info.warn('Geocode was not successful');
                }
            }
        );
    },
    addMarker: function (marker, locationString) {
        var add = true, i;
        marker.locationString = locationString;
        for (i = 0; i < this.markers.length; i++) {
            if (this.markers[i].locationString === marker.locationString) {
                add = false;
                break;
            }
        }
        if (add) {
            this.markers.push(marker);
            this.map.addOverlay(marker);
            this.markerCount[locationString] = 0;
        }
        // this.map.panTo(new BMap.Point(marker.N.lng, marker.N.lat));
        this.markerCount[locationString]++;
    },
    removeMarker: function (locationString) {
        var i;
        for (i = 0; i < this.markers.length; i++) {
            if (this.markers[i].locationString === locationString) {
                if (this.markerCount[locationString] === 1) {
                    this.map.removeOverlay(this.markers[i]);
                    this.markers[i] = undefined;
                } else {
                    this.markerCount[locationString]--;
                    return;           
                }
            }
            if (!this.markers[i]) {
                if (i < this.markers.length - 1) {
                    this.markers[i] = this.markers[i + 1];
                } else {
                    this.markers.pop();
                }
            }
        }
    },
    removeAllMarkers: function () {
        var i;
        for (i = 0; i < this.markers.length; i++) {
            this.map.removeOverlay(this.markers[i]);
            delete this.markers[i];
        }
        this.markerCount = [];
        this.markers = [];
    },
    close: function () {
        if (this.map) {
            this.map.removeEventListener('click');
        }
        this.map = null;
        this.geocoder = null;
        if (!this.isClosed) {
            this.$el.empty();
            this.isClosed = true;
        }
    }
});

var MainMapView = BaiduMapView.extend({
    el: "#mainMap",
    clickable: false,
    cssClass: "mainPage-map",
    initialize: function () {
        this.location = "南京";
        _.bindAll(this, 'render', 'mapInitialize', 'getLatLng', 'addMarker', 'removeMarker', 'removeAllMarkers', 'poi', 'close');
        BaiduMapView.prototype.initialize.call(this);

    },
    close: function () {
        this.removeAllMarkers();
        BaiduMapView.prototype.close.call(this);
    }
});

