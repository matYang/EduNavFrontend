/**
 *   This is a special global object that will be instantiated only once, storing all utility functions
 */

var Utilities = {


    //converts an date object to a human-friendly data string, eg: 明天，下周二，5月3号
    getDateString: function (targetDate, flag) {
        if (!targetDate) {
            Constants.dLog("Utilities::getDateString invalid parameter, null or undefined");
            targetDate = new Date ();
        }
        var tempDate = new Date (), curDate = new Date (targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate()), today = new Date (tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate()), dayDifference = Math.floor((curDate.getTime() - today.getTime()) / Constants.miliSecInDay), time = "";

        if (flag) {
            time = targetDate.getHours() + "点";
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
            Constants.dLog("Utilities::getTimeRange  invalid startTime paramters, either null or undefined");
            startTime = new Date ();
        }
        if (!endTime) {
            Constants.dLog("Utilities::getTimeRange  invalid endTime paramters, either null or undefined");
            endTime = new Date ();
        }
        if (startTime.getFullYear() !== endTime.getFullYear || startTime.getMonth() !== endTime.getMonth() || startTime.getDate() !== endTime.getDate()) {
            Constants.dLog("Utilities::getTimeRange warning, startTime and endTime are not on the date day");
        }
        if (endTime.getTime() >= startTime.getTime()) {
            Constants.dLog("Utilities:getTimeRange warning, endTime is earlier than or equals startTime");
        }

        return startTime.getHours() + ":" + startTime.getMinutes() + " - " + endTime.getHours() + ":" + endTime.getMinutes();
    },

    //get the duration in a readable format from startTime and endTime
    //expected return format is xx小时xx分钟
    getDuration: function (startTime, endTime) {
        if (!startTime) {
            Constants.dLog("Utilities::getTimeRange  invalid startTime paramters, either null or undefined");
            startTime = new Date ();
        }
        if (!endTime) {
            Constants.dLog("Utilities::getTimeRange  invalid endTime paramters, either null or undefined");
            endTime = new Date ();
        }
        if (startTime.getFullYear() !== endTime.getFullYear || startTime.getMonth() !== endTime.getMonth() || startTime.getDate() !== endTime.getDate()) {
            Constants.dLog("Utilities::getDuration warning, startTime and endTime are not on the date day");
        }

        var miliDif = endTime.getTime() - startTime.getTime(), hourDif = 0, minuteDif = 0;

        if (miliDif <= 0) {
            Constants.dLog("Utilities:getTimeRange warning, endTime is earlier than or equal startTime");
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
            Constants.dLog("Utilities::getTimeRange  invalid startTime paramters, either null or undefined");
            startTime = new Date ();
        }
        if (!endTime) {
            Constants.dLog("Utilities::getTimeRange  invalid endTime paramters, either null or undefined");
            endTime = new Date ();
        }
        if (startTime.getFullYear() !== endTime.getFullYear || startTime.getMonth() !== endTime.getMonth() || startTime.getDate() !== endTime.getDate()) {
            Constants.dLog("Utilities::getHourlyRate warning, startTime and endTime are not on the date day");
        }
        if (price === undefined || price < 0) {
            Constants.dLog("Utilities::getHourlyRate warning, price undefined or less than 0");
        }

        var miliDif = endTime.getTime() - startTime.getTime(), hourLength = 0;

        if (miliDif <= 0) {
            Constants.dLog("Utilities::getHourlyRate warning, endTime is earlier or equal startTime");
        }

        hourLength = miliDif / (1000 * 60 * 60);

        return Math.round(price / hourLength);
    },

    toInt: function (number) {
        return parseInt(number, 10);
    },

    getTimeFromString: function (time) {
        var hour = 0;
        if (time.indexOf("中午") > -1)
            return 12;
        if (time.indexOf("晚上") > -1 || time.indexOf("下午") > -1 || time.indexOf("午后") > -1 || time.indexOf("傍晚") > -1)
            hour = 12;
        var clockhour = this.toInt(time.replace(/\D+/g, ''));
        return (clockhour + hour);
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
        var match = dateString.match(/^(\d+)-(\d+)-(\d+) (\d+)\:(\d+)\:(\d+)$/);
        var date = new Date (match[1], match[2] - 1, match[3], match[4], match[5], match[6]);
        return date;
    },
    castToAPIFormat: function (date) {
        var d = date, str = [d.getFullYear(), (d.getMonth() + 1).padLeft(), d.getDate().padLeft()].join('-') + ' ' + [d.getHours().padLeft(), d.getMinutes().padLeft(), d.getSeconds().padLeft()].join(':');
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
    

    getDayTimeSlotText: function(timeSlot){
        var prefixText = '',
            actualStartHour = 0,
            actualEndHour = 1;
        if (timeSlot < Constants.DayTimeSlot.n12){
            prefixText = '上午';
            actualStartHour = timeSlot;
            actualEndHour = actualStartHour + 1;
        }
        else if (timeSlot < Constants.DayTimeSlot.n18){
            prefixText = '下午';
            if ( timeSlot === Constants.DayTimeSlot.n12 ) {
                actualEndHour = 1;
            } else {
                actualStartHour = timeSlot - 12;
                actualEndHour = actualStartHour + 1;
            }
        }
        else{
            prefixText = '晚上';
            actualStartHour = timeSlot - 12;
            actualEndHour = actualStartHour + 1;

        }
        return prefixText+actualStartHour+'-'+actualEndHour+'点';
    },
    getDayTimeSlot_morningStart: function(){
        return Constants.DayTimeSlot.n0;
    },
    getDayTimeSlot_afternoonStart: function(){
        return Constants.DayTimeSlot.n12;
    },
    getDayTimeSlot_nightStart: function(){
        return Constants.DayTimeSlot.n18;
    },

    //accepts id in number, string, object, array formats
    getIdList: function(idOpt){
        var _id = -1;
        var _arr = [];
        if ($.isArray(idOpt)){
            if (idOpt.length === 0){
                throw new Error('fatal error: id array empty');
            }
            return idOpt;
        }
        else{
            switch (typeof idOpt){
                case 'string':
                    _id = parseInt(idOpt, 10);
                    _arr.push(_id);
                    break;
                case 'object':
                    _id = parseInt(idOpt.id, 10);
                    _arr.push(_id);
                    break;
                case 'number':
                    _arr.push(_id);
                    break;
                default:
                    throw new Error('fatal error: Invalid id format');
            }
            return _arr;
        }
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
    }
};