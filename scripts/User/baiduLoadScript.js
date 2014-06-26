(function(){ window.BMap_loadScriptTime = (new Date).getTime(); document.write('<script id="baidugetscript" type="text/javascript" src="http://api.map.baidu.com/getscript?v=1.5&ak=vggLRKhm2CCdqnOK2egQ3lK6&services=&t=20140102035215"></script>');
	$(document.getElementById("baidugetscript")).ready(function(){
		if (app && app.searchView && !app.searchView.isClosed) {
			app.mapView = new MainMapView();
		}
	});
})();