var BaiduMapView = Backbone.View.extend({
    el: "",

    initialize: function (config) {
        _.bindAll(this, 'render', 'mapInitialize', 'getLatLng', 'close');
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
        this.map.enableScrollWheelZoom();
        this.getLatLng(this.location);
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
                    that.map.centerAndZoom(point, 13);
                } else {
                    Info.warn('Geocode was not successful');
                }
            }
        );
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
