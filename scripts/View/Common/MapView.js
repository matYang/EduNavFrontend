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
    type: 'small',//地图的类型 small和large
    //todo 设置地图图标
    labelTemplate: _.template('<div class="map_icon" style="top:-29px; left:-11px;"><span><%= text %></span><em></em></div>'),
    geocoder: null,//地理服务对象 主要用于将地址解析为经纬度
    markersName: {},
    markers: [],

    initialize: function (obj) {
        _.bindAll(this, 'addMarker', 'removeAllMarkers', '_getLatLng', '_setMarker', 'close');
        app.viewRegistration.register(this);
        if (!obj.mapElId) {
            console.log('error:should provide an element to contain map');
            return
        }
        if(obj.type){
            this.type = obj.type;
        }
        this.mapElId = obj.mapElId;
        if (typeof BMap !== 'undefined') {
            this.geocoder = new BMap.Geocoder();
            this.map = new BMap.Map(this.mapElId);  //this should never expire
            this.map.setCurrentCity("南京");
            this._getConfig();
            this._initMyMarker();
        } else {
            this.geocoder = {getPoint: Constants.voidFunction};
        }
    },


    //添加marker
    addMarker: function (locationObj) {
        this._getLatLng(locationObj);
    },
    //获取地址的经纬度 并‘设置marker
    _getLatLng: function (locationObj) {
        var self = this;
        var locationString, point;
        if (locationObj.lng) {//如果设置了经纬度 则直接setMarker
            this.markersName[locationObj.name] = locationObj.label;
            point = new BMap.Point(locationObj.lng, locationObj.lat);
            self._setMarker(point, locationObj.name);
        } else {
            //如果向baidu发起请求 应除去括号内的内容 否则会找不到该地址（后台括号内存的是其他信息）
            locationString = this.formatAddr(locationObj.name);//去除小括号 转小写
            this.markersName[locationString] = locationObj.label;
            //缓存中是否存在经纬度 key为具体的地址（格式化后）
            point = app.cache.get("poi", locationString);
            if (point) {
                self._setMarker(point, bLocationObj.address);
            } else {
                //不存在缓存
                this.geocoder.getPoint(locationString, function (point, bLocationObj) {
                    self._setMarker(point, bLocationObj.address);
                    //对向百度发起地址解析请求的地址的经纬度进行缓存
                    point && app.cache.set("poi", bLocationObj.address, point);
                });
            }
        }
    },

    //set center and set marker
    _setMarker: function (point, locationName) {
        //todo 如果locationObj是由百度地图返回 里面的标点和英文的大小写可能会发生变化
        //todo 那么从map中取地理位置对应的机构名时会发生错误
        if (point) {
            if(this.type== 'small'){
                this.map.centerAndZoom(point, 16);
            }else{
                this.map.centerAndZoom(point, 16);
            }
            //1# 使用图标进行显示
//            var marker = new BMap.Marker(point);
//            marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
            //2# todo 使用自定义覆盖物进行显示 使用覆盖物组件和js事件绑定
            var marker = new this.MyMarker(point, this.markersName[locationName]);
            //3# todo 使用label进行显示 使用本地图片和css
//            var marker = new BMap.Label(this.labelTemplate({text: this.markersName[locationName]}), {position: point});
            this.map.addOverlay(marker);
        }
        this.markers.push(marker);
    },
    //配置地图的显示
    _getConfig: function (type) {
        this.map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
        this.map.enableScrollWheelZoom();//启动鼠标滚轮缩放地图
        if (this.type == 'small') {
            //导航和标尺（右下角+偏移）
            this.map.addControl(new BMap.NavigationControl({type: BMAP_NAVIGATION_CONTROL_ZOOM, anchor: BMAP_ANCHOR_TOP_RIGHT}));
            this.map.addControl(new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT, offset: new BMap.Size(5, 5)}));
        } else if (this.type == 'large') {
            this.map.enableKeyboard();//启动键盘操作地图
            this.map.addControl(new BMap.NavigationControl());
            this.map.addControl(new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP,BMAP_HYBRID_MAP]}));
            this.map.addControl(new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT}));
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
//        if (this.map) {
//            this.map.removeEventListener('click');
//        }
        this.map = null;
        this.geocoder = null;
        if (!this.isClosed) {
            this.$el.empty();
            this.isClosed = true;
        }
    },
    //设置自定义覆盖物
    _initMyMarker: function () {
        // 复杂的自定义覆盖物 坐标+文本+hover状态的显示文本
        this.MyMarker = function (point, text, mouseoverText) {
            this._point = point;
            this._text = text;
            if (!mouseoverText) {
                mouseoverText = text;
            }
            this._overText = mouseoverText;
        };
        this.MyMarker.prototype = new BMap.Overlay();
        this.MyMarker.prototype.initialize = function (map) {
            this._map = map;
            var div = this._div = document.createElement("div");
            div.style.position = "absolute";
            div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
            div.style.backgroundColor = "#EE5D5B";
            div.style.border = "1px solid #BF5351";
            div.style.color = "white";
            div.style.height = "18px";
            div.style.padding = "2px 4px";
            div.style.lineHeight = "18px";
            div.style.whiteSpace = "nowrap";
            div.style.MozUserSelect = "none";
            div.style.fontSize = "12px";
            var span = this._span = document.createElement("span");
            div.appendChild(span);
            span.appendChild(document.createTextNode(this._text));
            var that = this;

            var arrow = this._arrow = document.createElement("div");
            arrow.style.background = "url(http://map.baidu.com/fwmap/upload/r/map/fwmap/static/house/images/label.png) no-repeat";
            arrow.style.position = "absolute";
            arrow.style.width = "11px";
            arrow.style.height = "10px";
            arrow.style.top = "22px";
            arrow.style.left = "10px";
            arrow.style.overflow = "hidden";
            div.appendChild(arrow);

            div.onmouseover = function () {
                this.style.backgroundColor = "#6BADCA";
                this.style.borderColor = "#6E90A2";
                this.getElementsByTagName("span")[0].innerHTML = that._overText;
                arrow.style.backgroundPosition = "0px -20px";
            };

            div.onmouseout = function () {
                this.style.backgroundColor = "#EE5D5B";
                this.style.borderColor = "#BF5351";
                this.getElementsByTagName("span")[0].innerHTML = that._text;
                arrow.style.backgroundPosition = "0px 0px";
            };

            map.getPanes().labelPane.appendChild(div);

            return div;
        };
        this.MyMarker.prototype.draw = function () {
            var map = this._map;
            var pixel = map.pointToOverlayPixel(this._point);
            this._div.style.left = pixel.x - 14 + "px";
            this._div.style.top = pixel.y - 32 + "px";
        }
    }
});