var BaiduMapView = Backbone.View.extend({
    el: "",

    initialize: function (config) {
        _.bindAll(this, 'render', 'mapInitialize', 'bindClickEvent', 'setLocation', 'drawCircle', 'getLatLng');
        this.div = config.div;
        this.origin = config.originLocation || new UserLocation();
        this.dest = config.destLocation || new UserLocation();
        this.clickable = config.clickable;
        this.class = config.class;
        this.oLatLng = {};
        this.dLatLng = {};
        this.init = config.init;
        this.geocoder = new BMap.Geocoder();
        this.mapInitialize();
    },
    cacheConfig: function(config) {
        this.div = config.div;
        this.origin = config.originLocation || new UserLocation();
        this.dest = config.destLocation || new UserLocation();
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
        this.getLatLng(this.origin, this.oLatLng, true);
        this.getLatLng(this.dest, this.dLatLng, true);
        var center = new BMap.Point (116.404, 39.915);
        var myOptions = {
            minZoom: 8,
            maxZoom: 13,
        };
        if (!this.map) {
            this.map = new BMap.Map (this.div);  //this should never expire
            this.map.centerAndZoom(center, 12);
            this.drivingRoute = new BMap.DrivingRoute(this.map, {
                renderOptions: {
                    map   : this.map,
                    autoViewport: true
                }
            });    
        }
        this.marker = undefined;
        this.oMarker = undefined;
        this.dMarker = undefined;
        var that = this;
        // this.map.addEventListener('tilesloaded', function(){
        //     if (that.oLatLng.lat && that.dLatLng.lat) {
        //          that.getDirection(that.oLatLng, that.dLatLng);
        //     }
        //     if (that.origin instanceof Backbone.Model && this.dest instanceof Backbone.Model && this.origin.get("city") && this.dest.get("city") && !this.origin.equals(this.dest)) {
        //         that.getDirection(that.origin, that.dest);
        //     }
        //     that.map.removeEventListener('tilesloaded');
        // });
        if (this.clickable) {
            this.bindClickEvent();
        }
    },
    bindClickEvent: function () {
        var that = this,
            contentString;
        this.map.addEventListener('click', function (e) {
            if (that.infowindow) {
                that.infowindow.close();
            }
            if (that.marker) {
                that.map.removeOverlay(that.marker);
            }
                
            that.marker = new BMap.Marker({
                point: e.point
            });
            that.map.addOverlay(that.marker);
            this.geocoder.getLocation(e.point, that.geoCallback);
            

        });
    },
    geoCallback: function(result) {
        var divSetOD = "<span class='markerButton' id='markerSetOrigin'><a>设为起点</a></span>&nbsp;&nbsp;&nbsp;<span class='markerButton' id='markerSetDest'><a>设为终点</a></span>";
        $(".markerButton").off();
        if (that.init){
            contentString = "<div>" + result.address + "</div>" + divSetOD;
        } else {
            contentString = "<div>" + result.address + "</div>";
        }
        if (!this.infowindow) {
            this.infowindow = new BMap.InfoWindow({
                content: contentString,
                opts: {
                    width: 250,
                    height: 80,
                    enableCloseOnClick: true
                }
            });
            this.map.addOverlay(this.infowindow);
        } else {
            this.infowindow.setContent(contentString);
        }
        if (that.init) {
            that.infowindow.addEventListener('click', function (e) {
                if (e.target.id === 'markerSetOrigin') 
                    that.setLocation("origin", result);
                else if (e.target.id === 'markerSetDest') 
                    that.setLocation("dest", result);
            });
        }
    },

    setLocation: function (type, result) {
        if (type === "origin") {
            if (this.oMarker) this.map.removeOverlay(this.oMarker);
            this.oMarker = this.marker;
        } else {
            if (this.dMarker) this.map.removeOverlay(this.dMarker);
            this.dMarker = this.marker;
        }
        this.marker = null;
        if (this.init && this.init.updateByMapMarker) {
            this.init.updateByMapMarker(type, result);    
        }
        if (this.oMarker && this.dMarker) {
            this.getDirection(this.oMarker.getPosition(), this.dMarker.getPosition());
            this.map.removeOverlay(this.oMarker);
            this.map.removeOverlay(this.dMarker);
        } else if (type === "origin") {
            this.getDirection(this.oMarker.getPosition(), this.dest);
            this.map.removeOverlay(this.oMarker)
        } else if (type === "dest") {
            this.getDirection(this.origin, this.dMarker.getPosition());
            this.map.removeOverlay(this.dMarker)
        }
    },
    getLatLng: function (location, latlng, noFetch) {
        if (location.get("defaultId") > 0 || noFetch) {
            latlng.lat = location.get("lat");
            latlng.lng = location.get("lng");
            return;  
        } 
        var request = {};
        var that = this;
        request.address = location.get("province") + location.get("city") + location.get("pointAddress");
        var result = this.geocoder.getPoint(
            location.get("pointAddress"),
            function (point) {
                if (point) {
                    that.map.setCenter(point);
                    latlng.lat = point.lat;
                    latlng.lng = point.lng;
                    location.set("lat", point.lat);
                    location.set("lng", poing.lng);
                } else {
                    Info.warn('Geocode was not successful');
                }
            },
            location.get("city")
        );
    },
    drawCircle: function (lat, lgt) {
        var center = new BMap.Point(lat, lgt);
        //drawing the circle
        var circleOptions = {
            strokeColor: '#2E8AE6',
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: '#2E8AE6',
            fillOpacity: 0.25
        };
        var userCircle = new BMap.Circle (center, 500, circleOptions);

        //add a marker at the center of the circle
        var userMarker = new BMap.Marker ({
            point: center,
        });
        this.map.addOverlay(userCircle);
        this.map.addOverlay(userMarker);
    },
    getDirection: function (origin, dest) {
        var request = {}, that = this;
        if (origin) {
            if (origin instanceof UserLocation) {
                if ( origin.isDefault() ) {
                    request.origin = new BMap.Point(origin.get("lat"), origin.get("lng"));
                } else {
                    request.origin = origin.get("province") + origin.get("city") + origin.get("pointAddress");
                }
                this.origin = origin;
            } else {
                request.origin = new BMap.Point(origin.lat, origin.lng);
            }
        } else {
            return;
        }
        if (dest) {
            if (dest instanceof UserLocation) {
                if ( dest.isDefault() ) {
                    request.destination = new BMap.Point(dest.get("lat"), dest.get("lng"));
                } else {
                    request.destination = dest.get("province") + dest.get("city") + dest.get("pointAddress");
                }
                this.dest = dest;
            } else {
                request.destination = new BMap.Point(dest.lat, dest.lng);
            }
        } else {
            return;
        }

        this.drivingRoute.search(request.origin, request.destination, {
            policy: BMap.BMAP_DRIVING_POLICY_LEAST_TIME,
            renderOptions: {    
                map: that.map,    
                autoViewport: true    
            }
        });
    },
    setMarker:function (result, point) {
        var contentString = "<div>" + result.address + "</div>";
        if (!this.infowindow) {
            this.infowindow = new BMap.InfoWindow({
                content: contentString,
                opts: {
                    width: 250,
                    height: 80,
                    enableCloseOnClick: true
                }
            });
            this.map.addOverlay(this.infowindow);
        } else {
            this.infowindow.setContent(contentString);
        }
        if (point == "origin") {
            if (this.oMarker) {
                this.map.removeOverlay(this.oMarker);
            }
            this.oMarker = new BMap.Marker ({
                point: result.point
            });
            this.map.addOverlay(this.oMarker);
        } else {
            if (this.dMarker) {
                this.map.removeOverlay(this.dMarker);
            }
            this.dMarker = new BMap.Marker ({
                position: result.point
            });
            this.map.addOverlay(this.dMarker);
        }
        if (this.oMarker && this.dMarker) {
            this.getDirection(this.oMarker.getPosition(), this.dMarker.getPosition());
            this.map.removeOverlay(this.oMarker);
            this.map.removeOverlay(this.dMarker);
        } else if (point === "origin" && this.dest) {
            this.getDirection(this.oMarker.getPosition(), this.dest);
        } else if (point === "dest" && this.origin) {
            this.getDirection(this.origin, this.dMarker.getPosition());
        }
    },
    close: function (destroy) {
        if (this.marker) {
            this.map.removeOverlay(this.marker);
            this.marker = null;
        }
        if (this.oMarker) {
            this.map.removeOverlay(this.oMarker);
            this.oMarker = null;
        }
        if (this.dMarker) {
            this.map.removeOverlay(this.dMarker);
            this.dMarker = null;
        }
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
