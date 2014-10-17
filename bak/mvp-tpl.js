DP.define(["mvp/tpl"], function (d, g) {
    var i = g("mvp/tpl"),
        e = -1 !== location.href.indexOf("alpha.dp") ? "s1.alpha.dp" : -1 !== location.href.indexOf(".51ping.com") ? "s1.51ping.com" : "t1.dpfile.com",
        e = "http://" + e + "/t/cssnew/img/map/",
        j = {
            markerConetentTemplate: "",
            width: 300,
            height: 220,
            offsetWidth: "",
            offsetHeight: "",
            clickFn: "",
            cb: "", map: $(".J_map"),
            display: ".J_map_box",
            noIndex: !1};
    return d.Class({
        initialize: function (a) {
            d.mix(this, d.mix(j, a))
        },
        setAdapter: function (a) {
            this.adapter = a
        },
        zoomLevel: 13,
        renderMap: function (a) {
            var b =
                this, c = this.adapter;
            c && c.removePanel();
            c && c.clearOverlays();
            b.markers = [];
            b.panels = [];
            a.forEach(function (a, f) {
                var d = {lat: a.glat, lng: a.glng}, g = i.parse(b.markerConetentTemplate)(a), h = c.addMarker(d, {img: (!b.noIndex ? e + (f + 1) : e + "0") + ".png", hover_img: (!b.noIndex ? e + (f + 1) : e + "0") + "-hover.png", label: a.shopName + (a.branchName ? "(" + a.branchName + ")" : ""), width: 24, height: 34});
                b.panels.push(g);
                b.markers.push(h);
                0 === f && c.setCenter(d, b.zoomLevel);
                h.on("click", function () {
                    b.select(f);
                    b.clickFn && b.clickFn(f)
                })
            });
            c.setAutoZoom(b.markers);
            1 === a.length && this.select(0)
        },
        setData: function (a) {
            this.data = a;
            this.renderMap(a)
        },
        select: function (a) {
            var b = this.data[a], a = this.markers[a];
            this.selected = b;
            this.adapter.pixelFromMarkerToCenter(a);
            this.adapter.setCenter({lat: b.glat, lng: b.glng}, this.zoomLevel)
        },
        createMap: function () {
            var a = this.map || "";
            a.css({height: this.height, width: this.width});
            a.inject($(this.display), "bottom");
            this.adapter.resize(this.width, this.height)
        }})
});
