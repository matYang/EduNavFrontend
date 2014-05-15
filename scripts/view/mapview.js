var MapView = Backbone.View.extend({
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
        this.directionDisplay = new google.maps.DirectionsRenderer ();
        this.directionService = new google.maps.DirectionsService ();
        this.geocoder = new google.maps.Geocoder ();
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
        var center = new google.maps.LatLng (this.oLatLng.lat, this.oLatLng.lng);
        var myOptions = {
            center: center,
            minZoom: 8,
            maxZoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        if (!this.map) {
            this.map = new google.maps.Map (document.getElementById(this.div), myOptions);  //this should never expire
            this.directionDisplay.setMap(this.map);
        }
        this.marker = undefined;
        this.oMarker = undefined;
        this.dMarker = undefined;
        var that = this;
        google.maps.event.addListenerOnce(this.map, 'idle', function(){
            if (that.oLatLng.lat && that.dLatLng.lat) {
                 that.getDirection(that.oLatLng, that.dLatLng);
            }
            if (that.origin instanceof Backbone.Model && this.dest instanceof Backbone.Model && this.origin.get("city") && this.dest.get("city") && !this.origin.equals(this.dest)) {
                that.getDirection(that.origin, that.dest);
            }
        });
        if (this.clickable) {
            this.bindClickEvent();
        }
        google.maps.event.trigger(this.map, 'resize');
    },
    bindClickEvent: function () {
        var that = this,
            divSetOD = "<span class='markerButton' id='markerSetOrigin'><a>设为起点</a></span>&nbsp;&nbsp;&nbsp;<span class='markerButton' id='markerSetDest'><a>设为终点</a></span>",
            contentString;
        google.maps.event.addListener(this.map, 'click', function (e) {
            if (that.infowindow) {
                that.infowindow.close();
            }
            if (that.marker) {
                that.marker.setMap(null);
            }
                
            that.marker = new google.maps.Marker({
                position: e.latLng,
                map: that.map
            });
            that.marker.setMap(that.map);

            $.ajax({
                  url: "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + e.latLng.lat() + "," + e.latLng.lng() + "&sensor=false",
                  context: document.body
            }).done(function(json) {
                $(".markerButton").off();
                if (that.init){
                    contentString = "<div>" + json.results[0].formatted_address + "</div>" + divSetOD;
                } else {
                    contentString = "<div>" + json.results[0].formatted_address + "</div>";
                }
                that.infowindow = new google.maps.InfoWindow({
                    content: contentString,
                    width: 250,
                    height: 80
                });
                that.infowindow.open(that.map, that.marker);
                if (that.init) {
                    google.maps.event.addListener(that.infowindow, 'domready', function() {
                        $(".markerButton").on('click', function(e){ 
                            if (e.delegateTarget.id === 'markerSetOrigin') 
                                that.setLocation("origin", json);
                            else if (e.delegateTarget.id === 'markerSetDest') 
                                that.setLocation("dest", json);
                        });
                    });
                }
            });

        });
    },
    setLocation: function (type, json) {
        if (type === "origin") {
            if (this.oMarker) this.oMarker.setMap(null);
            this.oMarker = this.marker;
        } else {
            if (this.dMarker) this.dMarker.setMap(null);
            this.dMarker = this.marker;
        }
        this.marker = null;
        if (this.init && this.init.updateByMapMarker) {
            this.init.updateByMapMarker(type, json);    
        }
        if (this.oMarker && this.dMarker) {
            this.getDirection(this.oMarker.getPosition(), this.dMarker.getPosition());
            this.oMarker.setMap(null);
            this.dMarker.setMap(null);
        } else if (type === "origin") {
            this.getDirection(this.oMarker.getPosition(), this.dest);
            this.oMarker.setMap(null);
        } else if (type === "dest") {
            this.getDirection(this.origin, this.dMarker.getPosition());
            this.dMarker.setMap(null);
        }
    },
    getLatLng: function (location, latlng, noFetch) {
        if (location.get("defaultId") > 0 || noFetch) {
            latlng.lat = location.get("lat");
            latlng.lng = location.get("lng");
            return;  
        } 
        var request = {};
        var me = this;
        request.address = location.get("pointAddress") + "," + location.get("city") + "," + location.get("province");
        var result = this.geocoder.geocode(request, function (geocodeResults, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                me.map.setCenter(geocodeResults[0].geometry.location);
                me.map.setZoom(13);
                latlng.lat = geocodeResults[0].geometry.location.lat();
                latlng.lng = geocodeResults[0].geometry.location.lng();
                location.set("lat", latlng.lat);
                location.set("lng", latlng.lng);
                location.set("pointAddress", geocodeResults[0].formatted_address);
                location.set("pointName", geocodeResults[0].formatted_address.split(",")[0]);
            } else {
                Info.warn('Geocode was not successful for the following reason: ' + status);
            }
        });
    },
    drawCircle: function (lat, lgt) {
        var center = new google.maps.LatLng (lat, lgt);

        // var marker = new google.maps.Marker({
        // 	map: me.map,
        // 	position: geocodeResults[0].geometry.location
        // });
        //drawing the circle
        var circleOptions = {
            strokeColor: '#2E8AE6',
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: '#2E8AE6',
            fillOpacity: 0.25,
            map: this.map,
            center: center,
            radius: 500,     //******note that this sets the radius of the circle area
        };
        var userCircle = new google.maps.Circle (circleOptions);

        //add a marker at the center of the circle
        var userMarker = new google.maps.Marker ({
            position: center,
            map: this.map
        });
    },
    getDirection: function (origin, dest) {
        var request = {}, that = this;
        if (origin) {
            if (origin instanceof UserLocation) {
                if ( origin.isDefault() ) {
                    request.origin = origin.get("lat") + "," + origin.get("lng");
                } else {
                    request.origin = origin.get("pointAddress") + " " + origin.get("city") + " " + origin.get("province");
                }
                this.origin = origin;
            } else if (origin instanceof google.maps.LatLng ){
                request.origin = origin.lat() + "," + origin.lng();
            } else {
                request.origin = origin.lat+ "," + origin.lng;
            }
        } else {
            return;
        }
        if (dest) {
            if (dest instanceof UserLocation) {
                if ( dest.isDefault() ) {
                    request.destination = dest.get("lat") + "," + dest.get("lng");
                } else {
                    request.destination = dest.get("pointAddress") + " " + dest.get("city") + " " + dest.get("province");
                }
                this.dest = dest;
            } else if (origin instanceof google.maps.LatLng ) {
                request.destination = dest.lat() +","+dest.lng();
            } else {
                request.destination = dest.lat +","+dest.lng;
            }
        } else {
            return;
        }
        request.travelMode = google.maps.TravelMode.DRIVING;
        request.unitSystem = google.maps.UnitSystem.METRIC;
        this.directionService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                that.directionDisplay.setDirections(response);
            }
        });
    },
    setMarker:function (json, point) {
        var contentString = "<div>" + json.results[0].formatted_address + "</div>";
        this.infowindow = this.infowindo || new google.maps.InfoWindow({
            content: contentString,
            width: 250,
            height: 80
        });
        if (point == "origin") {
            if (this.oMarker) {
                this.oMarker.setMap(null);
            }
            this.oMarker = new google.maps.Marker ({
                position: json.results[0].geometry.location,
                map: this.map
            });
            this.infowindow.open(this.map, this.oMarker);
        } else {
            if (this.dMarker) {
                this.dMarker.setMap(null);
            }
            this.dMarker = new google.maps.Marker ({
                position: json.results[0].geometry.location,
                map: this.map
            });
            this.infowindow.open(this.map, this.dMarker);
        }
        if (this.oMarker && this.dMarker) {
            this.getDirection(this.oMarker.getPosition(), this.dMarker.getPosition());
            this.oMarker.setMap(null);
            this.dMarker.setMap(null);
        } else if (point === "origin" && this.dest) {
            this.getDirection(this.oMarker.getPosition(), this.dest);
        } else if (point === "dest" && this.origin) {
            this.getDirection(this.origin, this.dMarker.getPosition());
        }
    },
    close: function (destroy) {
        if (this.marker) {
            this.marker.setMap(null);
            this.marker = null;
        }
        if (this.oMarker) {
            this.oMarker.setMap(null);
            this.oMarker = null;
        }
        if (this.dMarker) {
            this.dMarker.setMap(null);
            this.dMarker = null;
        }
        google.maps.event.clearListeners(this.map, 'click');
        if (!this.isClosed) {
            if (destroy) {

            } else {
                $("#cache").append($("#"+this.div).attr("id","mapcache"));
            }
            this.isClosed = true;
        }
    }
});
