DP.define(["mvp/tpl", "comm::mbox", "comm::paginate", "dom/dimension"],
    function (h, i) {
        var e = h.DOM,
            j = i("mvp/tpl"),
            g = i("dom/dimension"),
            k = i("comm::mbox"),
            l = i("comm::paginate"),
            f = -1 !== location.href.indexOf("alpha.dp") ? "s1.alpha.dp" : -1 !== location.href.indexOf(".51ping.com") ? "s1.51ping.com" : "t1.dpfile.com",
            f = "http://" + f + "/t/cssnew/img/map/",
            m = {
                listTemplate: "",
                title: "地图",
                markerConetentTemplate: "",
                range: 25,
                offset: "",
                closeFn: "",
                cb: "",
                map: "",
                noIndex: !1
            };
        return h.Class({
            Implements: "events",
            initialize: function (a) {
                h.mix(this,
                    h.mix(m, a));
                this.getScreenSize();
                this._createBox()
            },
            resize: function () {
                this.getScreenSize();
                e(".mbox-window").css({width: this.width, height: this.height});
                this.listHolder.css("height", this.height - 80);
                this.win.one(".J_pop").hasClass("on") ? (this.mapHolder.css("width", this.width), this.map.css("width", this.width), this.adapter.resize(this.width, this.height - 50)) : (this.mapHolder.css("width", this.width - 245), this.map.css("width", this.width - 245), this.adapter.resize(this.width - 245, this.height - 50));
                this.bindMapExtend();
                this.map.inject(e(this.mapHolder), "bottom");
                return this
            },
            zoomLevel: 13,
            bindMapExtend: function () {
                var a = this, b = a.listHolder, c = a.win.one(".J_pop"), d = a.win.one(".pagiantePage");
                c.css("top", parseInt(a.height / 2) - 30);
                c.off("click");
                c.on("click", function () {
                    e(this).hasClass("on") ? (a.mapHolder.css("width", a.width), a.map.css("width", a.width), a.adapter.resize(a.width, a.height - 50)) : (a.mapHolder.css("width", a.width - 245), a.map.css("width", a.width - 245), a.adapter.resize(a.width - 245, a.height - 50));
                    e(this).toggleClass("on");
                    b.parent().toggleClass("on");
                    d.toggleClass("on");
                    a.listHolder.toggleClass("on")
                })
            },
            getScreenSize: function () {
                this.height = parseInt(0.9 * g.size(e(window)).height) || 0;
                this.width = parseInt(0.9 * g.size(e(window)).width) || 0
            },
            _createBox: function () {
                this.box = new k({winCls: "mbox-window hotel-map-box-win", closable: !1, url: k.dialog(this.title, '<div class="hotel_map_box"><div id="myalert"></div><div class="hotel_list on"><span class="pop on J_pop"><i></i></span><ul class="J_list_holder"></ul><div class="pagiantePage"></div></div><div class="mapbox J_map_box"></div></div>',
                    []).dialog, size: {x: this.width, y: this.height}});
                this.win = this.box.get("win");
                this.pages = this.win.one(".pagiantePage");
                this.listHolder = this.win.one(".J_list_holder");
                this.listHolder.css("height", this.height - 80);
                this.mapHolder = this.win.one(".J_map_box");
                this._bind()
            },
            _bind: function () {
                var a = this, b = a.listHolder, c = this.mapHolder;
                a.bindMapExtend();
                a.box.get("closeBtn").inject(a.win).on("click", function () {
                    a.win.css("display", "none");
                    a.mapHolder.css("display", "none");
                    a.box.overlay && (a.box.overlay.destroy(),
                        a.box.overlay = null);
                    a.closeFn && a.closeFn()
                });
                b.on("mousewheel", function (a) {
                    a.stopBubble();
                    var c = g.scroll(b).top;
                    (0 === c && 0 <= a.wheel || c >= g.size(b, "scroll").height - g.size(b).height && 0 >= a.wheel) && a.prevent()
                });
                c.on("mousewheel", function (a) {
                    a.stop()
                });
                a.box.on("open", function () {
                    a.mapHolder.css("display", "block");
                    a.win.css("display", "block");
                    a.createMap();
                    a.setPages(a.data.length);
                    a.showNavInfo(1)
                })
            },
            createMap: function () {
                var a = this.map || "";
                this.mapHolder.css("width", this.width - 245);
                this.mapHolder.css("height",
                        this.height - 50);
                a.inject(e(this.mapHolder), "bottom");
                this.map.css("width", this.width - 245);
                this.map.css("height", this.height - 50);
                this.adapter.destory();
                this.adapter.init(a);
                this.adapter.resize(this.width - 245, this.height - 50)
            },
            renderMap: function (a, b) {
                var c = this, d = this.adapter;
                d.removePanel();
                d.clearOverlays();
                c.markers = [];
                c.panels = [];
                a = a.slice((b - 1) * c.range, b * c.range);
                a.forEach(function (a, b) {
                    var e = {lat: a.glat, lng: a.glng}, g = j.parse(c.markerConetentTemplate)(a), e = d.addMarker(e, {img: (!c.noIndex ? f + (b + 1) :
                        f + "0") + ".png", hover_img: (!c.noIndex ? f + (b + 1) : f + "0") + "-hover.png", label: a.shopName + (a.branchName ? "(" + a.branchName + ")" : ""), width: 24, height: 34});
                    c.panels.push(g);
                    c.markers.push(e);
                    e.on("click", function () {
                        c.select(b);
                        c.setPosition(b);
                        c.fn && c.fn(b)
                    })
                });
                d.setAutoZoom(c.markers);
                this.select(0, !1)
            },
            _setList: function (a) {
                var b = this;
                b.scorllHeight = [];
                b.listHolder.html(a);
                b.listHolder.all("li").forEach(function (a, d) {
                    var f = b.scorllHeight;
                    0 == d ? f.push(g.size(a).height) : f.push(f[d - 1] + g.size(a).height);
                    e(a).on("click",
                        function () {
                            b.select(d)
                        })
                })
            },
            setPosition: function (a) {
                var b = this.scorllHeight, c = b[a], a = 0 == a ? 0 : b[a - 1], b = b[b.length - 1];
                this.listHolder.el(0).scrollTop = c < this.height - 80 ? 0 : b - a < this.height - 80 && b - a >= this.height - 80 ? b : a
            },
            setData: function (a) {
                this.data = a
            },
            setPages: function (a) {
                var b = this;
                new l(this.pages, Math.ceil(a / b.range), 1, function (a) {
                    b.showNavInfo(a)
                })
            },
            showNavInfo: function (a) {
                var b = this.data || [], c = j.parse(this.listTemplate)(b.slice((a - 1) * this.range, a * this.range));
                this._setList(c);
                this.renderMap(b, a)
            },
            setAdapter: function (a) {
                this.adapter =
                    a
            },
            clear: function () {
                this.listHolder.html("")
            },
            open: function () {
                this.box.open()
            },
            select: function (a, b) {
                var c = this, d = c.data[a], f = this.markers[a], g = this.adapter.showPanel(c.data[a], f, this.panels[a], {adjust: {x: 0, y: 0}}).elem, h = c.listHolder.all("li");
                h.removeClass("hover");
                h.get(a).addClass("hover");
                e(g).one(".close").on("click", function () {
                    c.adapter.removePanel()
                });
                this.selected = d;
                this.adapter.pixelFromMarkerToCenter(f);
                this.adapter.setCenter({lat: d.glat, lng: d.glng}, c.zoomLevel);
                this.listHolder.children().removeClass("hover").get(a).addClass("hover");
                0 === a && !1 == b && (d = c.adapter.init(c.map), DPMap.maps.events.trigger(d, "resize"))
            }})
    });
