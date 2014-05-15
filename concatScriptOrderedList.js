//script to generate ordered list for grunt-concat to consume

//We have to concat the javascript files in order because wo did not use any dependency library.

var concatScriptOrderedList = function () {
	var scripts = $("script");
	var buf = [];
	for (var i = 0, len = scripts.length; i < len; i++) {
		var src = $(scripts[0]).attr("src");
		if (!src||src.contains("lib")) {
			continue;
		}
		buf.push(src);
	}
	return "[" + buf.join(",")+"]";
}