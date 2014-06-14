var BaiduMapView = Backbone.View.extend({
    el: "",
    markers: [],
    initialize: function (config) {
        _.bindAll(this, 'render', 'mapInitialize', 'getLatLng', 'addMarker', 'removeMarker', 'removeAllMarkers', 'close');
        this.div = config.div;
        this.location = config.location || "南京";
        this.clickable = config.clickable;
        this.class = config.class;
        this.init = config.init;
        this.geocoder = new BMap.Geocoder();
        this.mapInitialize();
    },
    cacheConfig: function(config) {
        this.div = config.div;
        this.location = config.location || "南京";
        this.clickable = config.clickable;
        this.init = config.init;
        this.class = config.class;
        $("#"+this.div).after($("#mapcache").attr("id","newMap"));
        $("#mapcache").remove();
        $("#"+this.div).remove();
        if (this.class) {
            $("#newMap").attr("class", this.class);
        }
        $("#newMap").attr("id", this.div);
        this.mapInitialize();
    },
    mapInitialize: function () {
        this.isClosed = false;
        var that = this;
        if (!this.map) {
            this.map = new BMap.Map (this.div);  //this should never expire
        }
        this.removeAllMarkers();
        var opts = {type: BMAP_NAVIGATION_CONTROL_SMALL}    
        this.map.addControl(new BMap.NavigationControl(opts)); 
        if (this.clickable) {
            this.bindClickEvent();
        }
    },
    getLatLng: function (locationString) {
        var that = this;
        var result = this.geocoder.getPoint(
            locationString,
            function (point) {
                if (point) {
                    if (that.markers.length === 0) {
                        that.map.centerAndZoom(point, 12);
                    }
                    that.addMarker(new BMap.Marker(point), locationString);        // 创建标注    
                } else {
                    Info.warn('Geocode was not successful');
                }
            }
        );
    },
    addMarker: function(marker, locationString) {
        marker.locationString = locationString;
        var add = true;
        for (var i = 0; i < this.markers.length; i++){
            if (this.markers[i].locationString === marker.locationString) {
                add = false;
                break;
            }
        }
        if (add) {
            this.markers.push(marker);
            this.map.addOverlay(marker);
        }
    },
    removeMarker: function(locationString) {
        for (var i = 0; i < this.markers.length; i++){
            if (this.markers[i].locationString === marker.locationString) {
                this.map.removeOverlay(this.markers[i]);
                this.markers[i] = undefined;
            }
            if (!this.markers[i]) {
                if ( i < this.markers.length - 1) {
                    this.markers[i] = this.markers[i+1];
                } else {
                    this.markers.pop();
                }
            }
        }
        if (add) {
            this.markers.push(marker);
            this.map.addOverlay(marker);
        }
    },
    removeAllMarkers: function (){
        for (var i = 0; i < this.markers.length; i++){
            this.map.removeOverlay(this.markers[i]);
        }
        this.markers = [];
    },
    close: function (destroy) {
        this.map.removeEventListener('click');
        if (!this.isClosed) {
            if (destroy) {

            } else {
                $("#cache").append($("#"+this.div).attr("id","mapcache"));
            }
            this.isClosed = true;
        }
    }
});
