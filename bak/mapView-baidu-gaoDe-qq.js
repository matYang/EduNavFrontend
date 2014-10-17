/**
 * Created by Jet on 14-10-16.
 */
/**
 * 地图view
 * 1#根据传入的dom元素初始化地图
 * 2#添加marker（地址图标）
 * -1#获取坐标（是否本地存在缓存，存在则进行设置，不存在则请求完再设置）
 * -2#根据坐标设置marker
 */
var MapView = Backbone.View.extend({
    name: 'map.baidu',
    map: null,//地图对象
    type: 'small',//地图的类型 small和large 使用不同的mapConfig

    geocoder: null,//地理服务对象 主要用于将地址解析为经纬度
    mapConfig: {//default map config
        zoom: 15
    },
    markersName: {},
    markers: [],

    initialize: function (obj) {
        _.bindAll(this, 'addMarker', 'removeAllMarkers', '_getLatLng', '_setMarker', 'close');
        if (!obj.mapElId) {
            console.log('error:should provide an element to contain map');
            return
        }
        this.mapElId = obj.mapElId;
        if (BMap !== undefined) {

            this.geocoder = new BMap.Geocoder();
            // var opts;
            var point = new BMap.Point(121.442823, 31.194107);
            this.isClosed = false;
            app.viewRegistration.register(this);
            this.map = new BMap.Map(this.mapElId);  //this should never expire
            this.map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
            this.map.enableScrollWheelZoom();//启动鼠标滚轮缩放地图
            this.map.enableKeyboard();//启动键盘操作地图
            this._getConfig();
        } else {
            this.geocoder = {getPoint: Constants.voidFunction};
        }
    },


    //添加marker
    addMarker: function (locationString) {
        this._getLatLng(locationString);
    },
    //获取地址的经纬度 并‘设置marker
    _getLatLng: function (locationString, instName) {
        var self = this;
        locationString = this.formatAddr(locationString);//去除小括号 转小写
        //缓存已获取经纬度的地理位置 避免向百度继续发送请求分析地址的经纬度 以提高速度
        this.markersName[locationString] = instName;

        //向百度发起请求 来设置地理位置
        this.geocoder.getPoint(locationString, function (point, locationObj) {
            self._setMarker(point, locationObj)
        });
    },

    //set center and set marker
    _setMarker: function (point, locationObj) {
        console.log(locationObj);
        //todo 如果locationObj是由百度地图返回 里面的标点和英文的大小写可能会发生变化
        //todo 那么从map中取地理位置对应的机构名时会发生错误
        if (point) {
            this.map.centerAndZoom(point, 16);
            var marker = new BMap.Marker(point);
//            var marker = new BMap.Label(this.labelTemplate({text: this.markerName[locationObj.address]}), {position: point});
            this.map.addOverlay(marker);
        }
        //每次设置完地理位置进行该地理位置(已有经纬度)的缓存
//        app.cache.set("poi", locationObj.address, point);
        this.markers.push(marker);
    },
    _getConfig: function (type) {
        if (this.type == 'small') {
            this.map.addControl(new BMap.NavigationControl({type: BMAP_NAVIGATION_CONTROL_ZOOM,anchor:BMAP_ANCHOR_TOP_RIGHT}));
            this.map.addControl(new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,offset: new BMap.Size(5, 5)}));
        } else if (this.type == 'large') {
            this.map.addControl(new BMap.NavigationControl());
            this.map.addControl(new BMap.ScaleControl());
        }
    },
    removeAllMarkers: function () {
        var self = this;
        _.each(this.markers, function (marker) {
            self.map.removeOverlay(marker);
        });
        this.markers.length = 0;
    },
    formatAddr: function (addr) {//小写是一个临时的解决方案
        if (addr) {
            addr = addr.split('（')[0];
            addr = addr.toLowerCase();
        }
        return addr;
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





//
//var MapView = Backbone.View.extend({
//    /**
//     * qq地图经纬度顺序为维度、经度
//     */
//    name: 'map.qq',
//    map: null,//地图对象
//    type: 'small',//地图的类型 small和large 使用不同的mapConfig
//
//    geocoder: null,//地理服务对象 主要用于将地址解析为经纬度
//    mapConfig: {//default map config
//        zoom: 15
//    },
//    markersName: {},
//    markers: [],
//
//    labelTemplate: _.template('<div class="map_icon" style="top:-29px; left:-11px;"><span><%= text %></span><em></em></div>'),
//    initialize: function (obj) {
//        _.bindAll(this, 'addMarker', 'removeAllMarkers', '_getLatLng', '_setMarker', 'close')
//        if (!obj.mapElId) {
//            console.log('error:should provide an element to contain map');
//            return
//        }
//        if (obj.type) {
//            this.type = obj.type;
//        }
//        _.extend(this.mapConfig, this._getConfig());
//        if (qq.maps !== undefined) {
//            app.viewRegistration.register(this);
//            this.$mapEl = document.getElementById(obj.mapElId);
//            //todo 异常处理 地图回调错误 导致对象未定义
//            this.map = new qq.maps.Map(this.$mapEl, this.mapConfig);
//            //地址和经纬度之间进行转换服务
//            this.geocoder = new qq.maps.Geocoder();
//        }
//    },
//    //添加marker
//    addMarker: function (locationString) {
//        this._getLatLng(locationString);
//    },
//    removeAllMarkers: function () {
//        _.each(this.markers, function (marker) {
//            marker.setMap(null);
//        });
//        this.markers.length = 0;
//    },
//    //获取地址的经纬度后立刻设置marker
//    _getLatLng: function (locationString, instName) {
//        var self = this;
//        //locationString = this.formatAddr(locationString);//去除小括号 转小写todo 验证腾讯是否有该问题
//        this.geocoder.getLocation(locationString);
//        this.geocoder.setComplete(function (result) {
//            console.log(result);
//            self._setMarker(result.detail.location)
//
//        });
//    },
//    _setMarker: function (location) {
//        //        locationString = this.formatAddr(locationString);//去除小括号 转小写
//        this.map.setCenter(location);
//        var marker = new qq.maps.Marker({
//            position: location,
//            map: this.map
//        });
//        this.markers.push(marker);
//    },
//
//    //缓存已获取经纬度的地理位置 避免进行map地址解析（减少请求数） todo 后台配置经纬度进行获取比较方便
////        var point = app.cache.get("poi", locationString);
////        this.markerName[locationString] = instName;
////        if (point) {
////            //如果本地已缓存经纬度 直接在地图上设置地理位置
////            this.setPosition(point, {address: locationString});
////        } else {
////            //否则向百度发起请求 来设置地理位置
////            this.geocoder.getPoint(locationString, this.setPosition);
////        }
//
//    //每次设置完地理位置进行该地理位置(已有经纬度)的缓存
////        app.cache.set("poi", locationObj.address, point);
//
////    formatAddr: function (addr) {//小写是一个临时的解决方案
////        if (addr) {
////            addr = addr.split('（')[0];
////            addr = addr.toLowerCase();
////        }
////        return addr;
////    },
//    close: function () {
//        this.map = null;
//        this.geocoder = null;
//        this.$el.empty();
//    },
//    _getConfig: function (type) {
//        if (this.type == 'small') {
//            return {//default map config
//                zoom: 15,
//                disableDefaultUI: true,
//                panControl: false,//是否上下左右移动圆盘
//                scaleControl: false,//是否请用比例尺
//                zoomControl: true,//是否启用缩放按钮
//                scaleControlOptions: {
//                    position: qq.maps.ControlPosition.BOTTOM_RIGHT
//                },
//                //设置缩放控件的位置和样式
//                zoomControlOptions: {
//                    position: qq.maps.ControlPosition.TOP_RIGHT,
//                    style: qq.maps.ZoomControlStyle.SMALL
//                }
//            }
//        } else if (this.type == 'large') {
//            return {//default map config
//                zoom: 15
//            }
//        }
//    }
//});

//
//var GMapView = Backbone.View.extend({
//    name: 'map.gaode',
//    map: null,//地图对象
//    type: 'small',//地图的类型 small和large 使用不同的mapConfig
//
//    geocoder: null,//地理服务对象 主要用于将地址解析为经纬度
//    mapConfig: {//default map config
//        zoom: 15
//    },
//    markersName: {},
//    markers: [],
//
//    initialize: function (obj) {
//        var self = this;
//        _.bindAll(this, 'addMarker', 'removeAllMarkers', '_getLatLng', '_setMarker', 'close');
//        if (!obj.mapElId) {
//            console.log('error:should provide an element to contain map');
//            return
//        }
//        this.mapElId = obj.mapElId;
//        if (BMap !== undefined) {
//
//            this.isClosed = false;
//            app.viewRegistration.register(this);
//            this.map = new AMap.Map(this.mapElId);
//            this.map.plugin(["AMap.Geocoder"], function() {
//                self.geocoder = new AMap.Geocoder();
//            });
//            this._getConfig()
//        } else {
//            this.geocoder = {getPoint: Constants.voidFunction};
//        }
//    },
//
//
//    //添加marker
//    addMarker: function (locationString) {
//        this._getLatLng(locationString);
//    },
//    //获取地址的经纬度 并‘设置marker
//    _getLatLng: function (locationString, instName) {
//        var self = this;
//        locationString = this.formatAddr(locationString);//去除小括号 转小写
//        //缓存已获取经纬度的地理位置 避免向百度继续发送请求分析地址的经纬度 以提高速度
//        this.markersName[locationString] = instName;
//
//        //返回地理编码结果
//        AMap.event.addListener(this.geocoder, "complete", function(data){
//            console.log(data);
//            //地理编码结果数组
//            var geocode = data.geocodes;
//            var d = geocode[0];
//            var lngX = d.location.getLng();
//            var latY = d.location.getLat();
//            var point = new AMap.LngLat(lngX, latY);
//            self._setMarker(point)
//        });
//        //地理编码
//        this.geocoder.getLocation(locationString);
//    },
//
//    //set center and set marker
//    _setMarker: function (point, locationObj) {
//        if (point) {
//            var marker = new AMap.Marker({position:point});
//            marker.setMap(this.map);
//
//            this.map.setFitView();
//            //每次设置完地理位置进行该地理位置(已有经纬度)的缓存
////        app.cache.set("poi", locationObj.address, point);
//            this.markers.push(marker);
//        }
//    },
//    _getConfig: function (type) {
//        var self = this;
//        if (this.type == 'small') {
//            this.map.plugin(["AMap.Scale"],function(){
//                var scale = new AMap.Scale();
//                self.map.addControl(scale);
//            });
//            //在地图中添加ToolBar插件
//            this.map.plugin(["AMap.ToolBar"],function(){
//                var toolBar = new AMap.ToolBar();
//                toolBar.hideDirection();
//                toolBar.hideRuler();
//                self.map.addControl(toolBar);
//            });
//        } else if (this.type == 'large') {
//            this.map.plugin(["AMap.Scale"],function(){
//                var scale = new AMap.Scale();
//                self.map.addControl(scale);
//            });
//            //在地图中添加ToolBar插件
//            this.map.plugin(["AMap.ToolBar"],function(){
//                var toolBar = new AMap.ToolBar();
//                self.map.addControl(toolBar);
//            });
//        }
//    },
//
//    removeAllMarkers: function () {
//        var self = this;
//        _.each(this.markers, function (marker) {
//            self.map.removeOverlay(marker);
//        });
//        this.markers.length = 0;
//    },
//    formatAddr: function (addr) {//小写是一个临时的解决方案
//        if (addr) {
//            addr = addr.split('（')[0];
//            addr = addr.toLowerCase();
//        }
//        return addr;
//    },
//    close: function () {
//        if (this.map) {
//            this.map.removeEventListener('click');
//        }
//        this.map = null;
//        this.geocoder = null;
//        if (!this.isClosed) {
//            this.$el.empty();
//            this.isClosed = true;
//        }
//    }
//});