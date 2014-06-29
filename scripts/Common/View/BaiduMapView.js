var BaiduMapView = Backbone.View.extend({
    initialize: function () {
        this.markers = [];
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
        this.isClosed = false;
        app.viewRegistration.register(this);
        this.map = new BMap.Map(this.el.id, {enableMapClick: false});  //this should never expire
        // this.setCenter(this.location);
    },
    getLatLng: function (locationString) {
        var poi = app.cache.get("poi", locationString);
        if (poi) {
            this.poi(poi, {address: locationString});
            return;
        }
        this.geocoder.getPoint(locationString, this.poi);
    },
    poi: function (poi, locationString) {   //っぽい
        if (poi) {
            if (this.markers.length === 0) {
                this.map.centerAndZoom(poi, 12);
            }
            this.addMarker(new BMap.Marker(poi), locationString.address);
            app.cache.set("poi", locationString.address, poi);
        } else {
            Info.warn('Geocode was not successful');
        }
    },
    setCenter: function (locationString) {
        var that = this;
        this.geocoder.getPoint(
            locationString,
            function (point) {
                if (point) {
                    that.map.centerAndZoom(point, 11);
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
            this.map.centerAndZoom(marker.N, 11);
        }
    },
    removeMarker: function (locationString) {
        var i;
        for (i = 0; i < this.markers.length; i++) {
            if (this.markers[i].locationString === locationString) {
                this.map.removeOverlay(this.markers[i]);
                this.markers[i] = undefined;
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
    class: "mainPage-map",
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

