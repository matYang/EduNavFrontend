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
        var point = new BMap.Point(121.442823, 31.194107);
        this.isClosed = false;
        app.viewRegistration.register(this);
        this.map = new BMap.Map(this.el.id, {enableMapClick: false});  //this should never expire
        var opts = {type: BMAP_NAVIGATION_CONTROL_SMALL};
        this.map.addControl(new BMap.NavigationControl(opts));
        // this.setCenter(this.location);
    },
    //获取地址的经纬度
    getLatLng: function (locationString, instName) {
        //缓存已获取经纬度的地理位置 避免向百度继续发送请求分析地址的经纬度 以提高速度
        var point = app.cache.get("poi", locationString);
        this.markerName[locationString] = instName;
        if (point) {
            //如果本地已缓存经纬度 直接在地图上设置地理位置
            this.setPosition(point, {address: locationString});
        }else{
            //否则向百度发起请求 来设置地理位置
            this.geocoder.getPoint(locationString, this.setPosition);
        }
    },
    //生成地理位置的图标
    setPosition: function (point, locationObj) {
        //todo 如果locationObj是由百度地图返回 里面的标点和英文的大小写可能会发生变化
        //todo 那么从map中取地理位置对应的机构名时会发生错误
        var label;
        if (point) {
            if (this.markers.length === 0) {
                //this.map.panTo(poi);
            }
            label = new BMap.Label(this.labelTemplate({text: this.markerName[locationObj.address]}), {position:point});
            this.addMarker(label, locationObj.address);
            //每次设置完地理位置进行该地理位置(已有经纬度)的缓存
            app.cache.set("poi", locationObj.address, point);
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
        if (add && this.map) {
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
            if (this.map) {
                this.map.removeOverlay(this.markers[i]);
                delete this.markers[i];
            }
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

