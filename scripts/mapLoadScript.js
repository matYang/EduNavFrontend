function loadScripts() {
    //腾讯地图
//    var script = document.createElement("script");
//    script.type = "text/javascript";
//    script.src = "http://map.qq.com/api/js?v=2.exp&callback=initMap&key=FABBZ-LHMRV-4QKPB-UYO2Z-GF74S-KVB3F";
//    document.body.appendChild(script);

    //百度梯度
    var bscript = document.createElement("script");
    bscript.type = "text/javascript";
    bscript.src = "http://api.map.baidu.com/api?v=2.0&ak=RpBwKog20Z0RI2LXj092ZsFv&callback=initMap";
    document.body.appendChild(bscript);

    //高德地图
//    var gscript = document.createElement("script");
//    gscript.type = "text/javascript";
//    gscript.src = "http://webapi.amap.com/maps?v=1.3&key=3f89354600cf9d5895859de81ca4ce12&callback=initGMap";
//    document.body.appendChild(gscript);
}

//function initMap() {
//    if (app && app.courseDetailView) {
////        app.courseDetailView.renderMap();
//    }
//}
function initMap() {
    if (app && app.courseDetailView) {
        app.courseDetailView.renderMap();
    }
    if (app && app.tuanDetailView) {
        app.tuanDetailView.renderMap();
    }
    if (app && app.partnerDetailView) {
        app.partnerDetailView.renderMap();
    }
}
//function initGMap() {
//    if (app && app.courseDetailView) {
//        app.courseDetailView.renderGMap();
//    }
//}
window.onload = loadScripts;