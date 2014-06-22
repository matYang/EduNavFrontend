/**
 *   This is a special global object that will be instantiated only once, storing all utility functions
 */

var Utilities = {
    emailRegex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

    //converts an date object to a human-friendly data string, eg: 明天，下周二，5月3号
    getDateString: function (targetDate, relativeFlag) {
        if (!targetDate) {
            Info.log("Utilities::getDateString invalid parameter, null or undefined");
            targetDate = new Date ();
        }
        var tempDate = new Date (), curDate = new Date (targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate()), today = new Date (tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate()), dayDifference = Math.floor((curDate.getTime() - today.getTime()) / Constants.miliSecInDay), time = "";

        if (!relativeFlag) {
            return (curDate.getMonth() + 1) + "月" + curDate.getDate() + "日";
        }

        if (dayDifference === 0) {
            return "今天" + time;
        } else if (dayDifference === 1) {
            return "明天" + time;
        } else if (dayDifference === 2) {
            return "后天" + time;
        } else if (dayDifference === -1) {
            return "昨天" + time;
        } else if (dayDifference === -2) {
            return "前天" + time;
        } else if (dayDifference < -2 && dayDifference > -8) {
            return (0 - dayDifference) + "天前" + time;
        }

        var curDayOfWeek = curDate.getDay();
        var todayOfWeek = today.getDay();
        var days = todayOfWeek + dayDifference;
        if (days > 13 || days <= -8) {
            return (curDate.getMonth() + 1) + "月" + curDate.getDate() + "日";
        }

        if (days <= 6) {
            return "这" + Constants.weekDayArray[curDayOfWeek];
        }

        if (days > 6) {
            return "下" + Constants.weekDayArray[curDayOfWeek];
        } else {
            return "date display error";
        }
    },

    //get the time range in the same day, startTime and endTime should be on the same day
    //expected return format is "startTime - endTime"
    getTimeRange: function (startTime, endTime) {
        if (!startTime) {
            Info.log("Utilities::getTimeRange  invalid startTime paramters, either null or undefined");
            startTime = new Date ();
        }
        if (!endTime) {
            Info.log("Utilities::getTimeRange  invalid endTime paramters, either null or undefined");
            endTime = new Date ();
        }
        if (startTime.getFullYear() !== endTime.getFullYear || startTime.getMonth() !== endTime.getMonth() || startTime.getDate() !== endTime.getDate()) {
            Info.log("Utilities::getTimeRange warning, startTime and endTime are not on the date day");
        }
        if (endTime.getTime() >= startTime.getTime()) {
            Info.log("Utilities:getTimeRange warning, endTime is earlier than or equals startTime");
        }

        return startTime.getHours() + ":" + startTime.getMinutes() + " - " + endTime.getHours() + ":" + endTime.getMinutes();
    },

    //get the duration in a readable format from startTime and endTime
    //expected return format is xx小时xx分钟
    getDuration: function (startTime, endTime) {
        if (!startTime) {
            Info.log("Utilities::getTimeRange  invalid startTime paramters, either null or undefined");
            startTime = new Date ();
        }
        if (!endTime) {
            Info.log("Utilities::getTimeRange  invalid endTime paramters, either null or undefined");
            endTime = new Date ();
        }
        if (startTime.getFullYear() !== endTime.getFullYear || startTime.getMonth() !== endTime.getMonth() || startTime.getDate() !== endTime.getDate()) {
            Info.log("Utilities::getDuration warning, startTime and endTime are not on the date day");
        }

        var miliDif = endTime.getTime() - startTime.getTime(), hourDif = 0, minuteDif = 0;

        if (miliDif <= 0) {
            Info.log("Utilities:getTimeRange warning, endTime is earlier than or equal startTime");
        }

        hourDif = Math.floor(miliDif / (1000 * 60 * 60));
        minuteDif = Math.floor((miliDif % (1000 * 60 * 60)) / (1000 * 60));

        if (hourDif > 0) {
            return hourDif + "小时" + minuteDif + "分钟";
        } else {
            return minuteDif + "分钟";
        }
    },

    getHourlyRate: function (startTime, endTime, price) {
        if (!startTime) {
            Info.log("Utilities::getTimeRange  invalid startTime paramters, either null or undefined");
            startTime = new Date ();
        }
        if (!endTime) {
            Info.log("Utilities::getTimeRange  invalid endTime paramters, either null or undefined");
            endTime = new Date ();
        }
        if (startTime.getFullYear() !== endTime.getFullYear || startTime.getMonth() !== endTime.getMonth() || startTime.getDate() !== endTime.getDate()) {
            Info.log("Utilities::getHourlyRate warning, startTime and endTime are not on the date day");
        }
        if (price === undefined || price < 0) {
            Info.log("Utilities::getHourlyRate warning, price undefined or less than 0");
        }

        var miliDif = endTime.getTime() - startTime.getTime(), hourLength = 0;

        if (miliDif <= 0) {
            Info.log("Utilities::getHourlyRate warning, endTime is earlier or equal startTime");
        }

        hourLength = miliDif / (1000 * 60 * 60);

        return Math.round(price / hourLength);
    },

    toInt: function (number) {
        return parseInt(number, 10);
    },

    getId: function (str, deli) {
        if (this.isEmpty(deli)) {
            deli = "_";
        }
        var list = str.split(deli);
        return list[list.length - 1];
    },

    isEmpty: function (str) {
        return (str === null || str === undefined || str === "");
    },


    castFromAPIFormat: function (dateString) {
        dateString = decodeURIComponent(dateString);
        var match = dateString.match(/^(\d+)-(\d+)-(\d+)\+(\d+)\:(\d+)\:(\d+)$/);
        var date = new Date (match[1], match[2] - 1, match[3], match[4], match[5], match[6]);
        return date;
    },
    castToAPIFormat: function (date) {
        var d = date, str = [d.getFullYear(), (d.getMonth() + 1).padLeft(), d.getDate().padLeft()].join('-') + '+' + [d.getHours().padLeft(), d.getMinutes().padLeft(), d.getSeconds().padLeft()].join(':');
        return str;
    },
    castFromRepresentationFormat: function (dateString) {
        var match = dateString.match(/^(\d+)-(\d+)-(\d+)$/);
        var date = new Date (match[1], match[2] - 1, match[3], 0, 0, 0, 0);
        return date;
    },
    castToRepresentationFormat: function (date) {
        var d = date, str = [d.getFullYear(), (d.getMonth() + 1).padLeft(), d.getDate().padLeft()].join('-');
        return str;
    },


    getUrlParams: function(name) {
        if(name===(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search));
              return decodeURIComponent(name[1]);
    },
    getCookie: function(c_name){
        var i, x, y, ARRcookies = document.cookie.split(";");
        if (ARRcookies[0] === "" ) {
            ARRcookies[0] = document.cookie;
        }
        for (i = 0; i < ARRcookies.length; i++) {
            x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
            y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
            x = x.replace(/^\s+|\s+$/g, "");
            if (x == c_name) {
                return unescape(y);
            }
        }
    },
    parseQueryParam: function(queryString){
        var params = {};
        if(queryString){
            _.each(
                _.map(decodeURI(queryString).split(/&/g),function(el,i){
                    var aux = el.split('='), o = {};
                    if(aux.length >= 1){
                        var val;
                        if(aux.length == 2)
                            val = aux[1];
                        o[aux[0]] = val;
                    }
                    return o;
                }),
                function(o){
                    _.extend(params,o);
                }
            );
        }
        return params;
    },
    passValid: function (val) {
        var p1 = $("#password").val(), p2 = $("#passwordConfirm").val();
        if ( p1 !== p2 ) {
            return {valid: false, text:"密码长度至少为6位"};
        } else if (val.length < 6 ){
            return {valid: false, text:"两次输入密码不匹配"};
        } else {
            return {valid:true};
        }
    },

    phoneValid: function(phone) {
        if (phone && phone.length === 11 && !isNaN(Utilities.toInt(phone))) {
            return {valid:true};
        } else {
            return {valid:false, text: "电话号码格式不正确"};
        }
    },
    emailValid: function (email) {
        if (Utilities.emailRegex.test(email)) {
            return {valid:true};
        } else {
            return {valid:false, text: "邮箱格式不正确"};
        }
    },
    preventDefault: function (e) {
        e.preventDefault();
    },
    preventNonNumber: function (e) {
        if (e.data.fieldType === "number" && !(e.which >= 48 && e.which <= 57) && !(e.which >= 96 && e.which <= 105) && e.which > 13) {
            e.preventDefault();
        }
    }
};