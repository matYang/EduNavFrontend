/*
* This file is used to override/increment the default prototypes to provide global helper functions
*/

//used for date formatting, add 0s to the left
Number.prototype.padLeft = function (base, chr) {
    var len = (String(base || 10).length - String(this).length) + 1;
    return len > 0 ? new Array (len).join(chr || '0') + this : this;
};

//compare the equalness of 2 arrays
Array.prototype.compare = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0; i < this.length; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].compare(array[i]))
                return false;
        } else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
};

Array.prototype.containsAny = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (val === this[i]) return true;
    }
    return false;
};

//用于进行string的占位符替换 异常处理以后再说
String.prototype.format=function(){
    if(arguments.length==0) return this;
    for(var s=this, i=0; i<arguments.length; i++)
        s=s.replace(new RegExp("\\{"+i+"\\}","g"), arguments[i]);
    return s;
};

Backbone.Model.prototype.overrideUrl = function (urlRootOverride) {
    if (typeof urlRootOverride !== 'undefined') {
        this.urlRoot = urlRootOverride;
    }
};

Backbone.Collection.prototype.overrideUrl = function (urlRootOverride) {
    if (typeof urlRootOverride !== 'undefined') {
        this.url = urlRootOverride;
    }
};

(function() {
    if (!console) {
        console = {"log": function(){}};
    }
})();