/**
 *   This is a special global object that will be instantiated only once, storing all utility functions
 */

var Utilities = {
    emailRegex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

    //converts an date object to a human-friendly data string, eg: 明天，下周二，5月3号
    getDateString: function (targetDate, relativeFlag) {
        if (!targetDate) {
//            Info.log("Utilities::getDateString invalid parameter, null or undefined");
            return null;
        } else {
            //v2 时间统一为时间戳格式 new Date(timestamp) or new Date(dateObj)
            targetDate = new Date(targetDate);
        }
        var tempDate = new Date(), curDate = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate()), today = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate()), dayDifference = Math.floor((curDate.getTime() - today.getTime()) / Constants.miliSecInDay), time = "";

        if (!relativeFlag) {
            return targetDate.getFullYear() + "年" + (curDate.getMonth() + 1) + "月" + curDate.getDate() + "日";
        }

        if (dayDifference === 0) {
            return "今天" + time;
        }
        if (dayDifference === 1) {
            return "明天" + time;
        }
        if (dayDifference === 2) {
            return "后天" + time;
        }
        if (dayDifference === -1) {
            return "昨天" + time;
        }
        if (dayDifference === -2) {
            return "前天" + time;
        }
        if (dayDifference < -2 && dayDifference > -8) {
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
        }
        return "date display error";
    },

    //get the time range in the same day, startTime and endTime should be on the same day
    //expected return format is "startTime - endTime"
    getTimeRange: function (startTime, endTime) {
        if (!startTime) {
            Info.log("Utilities::getTimeRange  invalid startTime paramters, either null or undefined");
            startTime = new Date();
        }
        if (!endTime) {
            Info.log("Utilities::getTimeRange  invalid endTime paramters, either null or undefined");
            endTime = new Date();
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
            startTime = new Date();
        }
        if (!endTime) {
            Info.log("Utilities::getTimeRange  invalid endTime paramters, either null or undefined");
            endTime = new Date();
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
        }
        return minuteDif + "分钟";
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

    /**
     * 用于格式化response data的时间戳
     * @param timestamp string
     * @returns Date
     */
    castFromAPIFormat: function (timestamp) {
        if (!timestamp) {
//            Info.warn("castFromAPIFormat: dateString is null");
            return null;
        }
//        if (timestamp instanceof Date) {
//            return timestamp;
//        }
//        dateString = decodeURIComponent(dateString);
//        var match = dateString.match(/^(\d+)-(\d+)-(\d+) (\d+)\:(\d+)\:(\d+)$/);
//        if (!match) {
//            match = dateString.match(/^(\d+)-(\d+)-(\d+)\+(\d+)\:(\d+)\:(\d+)$/);
//        }
//        var date = new Date(match[1], match[2] - 1, match[3], match[4], match[5], match[6]);
        /*必须先转换为number 否则13位以上string会出现invalid date*/
        timestamp = parseInt(timestamp, 10);
        if (isNaN(timestamp)) {
            return null;
        }
        return new Date(timestamp);
    },
    /**
     * 用于格式化request data
     * @param date Date
     * @returns {*}
     */
    castToAPIFormat: function (date) {
        if (!date) {
//            Info.warn("castFromAPIFormat: date is null");
            return null;
        }
//        if (typeof date === "string") {
//            return date;
//        }
//        var d = date, str = [d.getFullYear(), (d.getMonth() + 1).padLeft(), d.getDate().padLeft()].join('-') + ' ' + [d.getHours().padLeft(), d.getMinutes().padLeft(), d.getSeconds().padLeft()].join(':');

        return date.getTime();
    },

    // //deprecated
    // castFromRepresentationFormat: function (dateString) {
    //     var match = dateString.match(/^(\d+)-(\d+)-(\d+)$/);
    //     var date = new Date (match[1], match[2] - 1, match[3], 0, 0, 0, 0);
    //     return date;
    // },
    // castToRepresentationFormat: function (date) {
    //     var d = date, str = [d.getFullYear(), (d.getMonth() + 1).padLeft(), d.getDate().padLeft()].join('-');
    //     return str;
    // },


    getUrlParams: function (name) {
        if (name === (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(location.search)) {
            return decodeURIComponent(name[1]);
        }
    },
    getCookie: function (c_name) {
        var i, x, y, ARRcookies = document.cookie.split(";");
        if (ARRcookies[0] === "") {
            ARRcookies[0] = document.cookie;
        }
        for (i = 0; i < ARRcookies.length; i++) {
            x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
            y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
            x = x.replace(/^\s+|\s+$/g, "");
            if (x === c_name) {
                return unescape(y);
            }
        }
    },
    parseQueryParam: function (queryString) {
        var params = {};
        if (queryString) {
            _.each(
                _.map(decodeURI(queryString).split(/&/g), function (el, i) {
                    var aux = el.split('='), o = {};
                    if (aux.length >= 1) {
                        var val;
                        if (aux.length === 2) {
                            val = aux[1];
                        }
                        o[aux[0]] = val;
                    }
                    return o;
                }),
                function (o) {
                    _.extend(params, o);
                }
            );
        }
        return params;
    },

    parseNum: function (val) {
        val = parseFloat(val);
        if (isNaN(val))
            return null;
        return val
    },

    passValid: function (val) {
        var p1 = $("#password").val(), p2 = $("#passwordConfirm").val();
        if (p1 !== p2) {
            return {valid: false, text: "密码长度至少为6位"};
        }
        if (val.length < 6) {
            return {valid: false, text: "两次输入密码不匹配"};
        }
        return {valid: true};
    },

    //验证用户名 中英文 不可为纯数字 todo 非法字符
    usernameValid: function (username) {
        if (username && isNaN(Utilities.toInt(username))) {
            return {valid: true};
        }
        return {valid: false, text: "用户名格式不正确"};
    },
    phoneValid: function (phone) {
        if (phone && phone.length === 11 && !isNaN(Utilities.toInt(phone))) {
            return {valid: true};
        }
        return {valid: false, text: "手机号码格式不正确"};
    },
    emailValid: function (email) {
        if (Utilities.emailRegex.test(email)) {
            return {valid: true};
        }
        return {valid: false, text: "邮箱格式不正确"};
    },
    preventDefault: function (e) {
        e.preventDefault();
    },
    preventNonNumber: function (e) {
        if (e.data.fieldType === "number" && !(e.which >= 48 && e.which <= 57) && !(e.which >= 96 && e.which <= 105) && e.which > 13) {
            e.preventDefault();
        }
    },
    defaultValidDivBuilder: function (valid, type, text) {
        //This function overloads baseField's default buildValidatorDiv. It should only be invoked by BaseField's testValue function, thus this refers the BaseForm model in this case,
        //This function is not bound to the view.
        $("#" + this.get("fieldId") + "_info").remove();
        if (valid) {
            $("#" + this.get("fieldId")).removeClass("wrong_color");
            return '<dd class="success" id="' + this.get("fieldId") + '_right"></dd>';
        }
        if (type === "empty") {
            $("#" + this.get("fieldId")).addClass("wrong_color");
            return '<dd class="wrong" id="' + this.get("fieldId") + '_wrong" ><span class="form_tip"><span class="form_tip_top">' + this.get("name") + "不能为空" + '</span><span class="form_tip_bottom"></span></span></dd>';
        }
        if (text) {
            $("#" + this.get("fieldId")).addClass("wrong_color");
            return '<dd class="wrong" id="' + this.get("fieldId") + '_wrong"><span class="form_tip"><span class="form_tip_top">' + text + '</span><span class="form_tip_bottom"></span></span></dd>';
        }
        $("#" + this.get("fieldId")).addClass("wrong_color");
        return '<dd class="wrong" id="' + this.get("fieldId") + '_wrong"><span class="form_tip"><span class="form_tip_top">' + this.get("errorText") + '</span><span class="form_tip_bottom"></span></span></dd>';
    },
    defaultSmsRequestHandler: function ($button, $info) {
        return {
            success: function () {
//                $info.html("验证码已经发送至您的手机，若2分钟没有收到短信，请确认手机号填写正确并重试");\
                $info.html("验证码已经发送至您的手机");

                var count_down = function (k) {
                    if (k > 0) {
                        setTimeout(function () {
                            $button.val('重新发送(' + k + '秒)');
                            count_down(k - 1);
                        }, 1000)
                    } else {
                        $button.val('重新发送');
                    }
                };
                count_down(120);
                $button.prop("disabled", true).css("background", "#999");
                setTimeout(function () {
                    $button.prop("disabled", false).css("background", "");
                }, 120000);
            },
            error: function (data) {
                $info.html(data.message || "发送失败，请检查网络正常并重试");
                $button.val("重新发送").prop("disabled", false);
            }
        };
    },
    defaultErrorHandler: function (data) {
        Info.alert(data.message || Resources.networkErrorText);
    },
    calcCompleteness: function (course) {
        var json = course._toJSON(), attr, comp = 0;
        for (attr in json) {
            if (json[attr]) {
                comp += 1;
                if (attr === "popularity") {
                    comp += Math.round(Math.sqrt(json[attr]));
                }
            }
        }
        return comp;
    },
    //value should be a 2/4/6 digit decimal string
    getNameFromHierachy: function (value, hierachy) {
        var len = value.length, i, j, k, data = hierachy.data, children1, children2, ret = [];
        for (i = 0; i < data.length; i++) {
            if (data[i].value === value.substr(0, 2)) {
                ret[0] = data[i].name;
                children1 = data[i].children;
                for (j = 0; j < children1.length; j++) {
                    if (children1[j].value === value.substr(0, 4)) {
                        ret[1] = children1[j].name;
                        children2 = children1[j].children;
                        for (k = 0; k < children2.length; k++) {
                            if (children2[k].value) {
                                ret[2] = children2[k].name;
                                break;
                            }
                        }
                        break;
                    }
                }
                break;
            }
        }
        return ret;
    },

    /**
     * 根据课程的类目值和类目参照表生成一二三级的目录obj的array
     * @param categoryValue
     * @param categoryObj
     * @returns {Array}
     */
    getCategoryArray: function (categoryValue, categoryObj) {
        if (categoryValue !== undefined && categoryValue.length !== 6 && categoryObj !== undefined)return null;
        var catArray = [];
        var getCat = function (value, start, cat) {
            if (start >= value.length)return []
            for (var a in cat.children) {
                if (cat.children.hasOwnProperty(a) && cat.children[a].value == value.substr(0, start + 2))
                    return [//每次返回一个包含一个键值对对象的数组进行递归拼接
                        {name: cat.children[a].name, value: cat.children[a].value}
                    ].concat(getCat(value, start + 2, cat.children[a]));
            }
            return [];
        };
        catArray = getCat(categoryValue, 0, {children: categoryObj});
        return catArray;
    },

    toSchoolTimeList: function (val, textEnum) {
        // console.log(val);
        //value = 1 or + 2 or + 4
        var list = [];
        if (!val || textEnum === undefined) {
            return list;
        }
        _.each(textEnum, function (v, k) {//k is the number value in schoolTimeDay or schoolTimeWeek
            if ((k & val ) !== 0)
                list.push(parseInt(k));
        }, list);
        if (list.join() === '')
            return undefined;
        return list;
    },

    toSchoolTimeText: function (list, textEnum) {
        if (!list || textEnum === undefined) {
            return '';
        }
        var text = _.map(list, function (val) {
            return textEnum[val];
        });
        return text.join('+');
    },

    /**
     * todo 用于获取下delta个月的开始和结束时间的时间戳 取代searchView里面根据选择的日期过滤的方法
     * 如delta=1表示获取下个月的开始和结束时间（结束时间为下下个月的开始）
     * @param delta 与当前月相差的月数（为正）
     * @returns {*[]} 返回开始和结束时间的时间戳
     */
    getDeltaMonthTimestamp: function (delta) {
        var date1 = 1, date2 = 1;
        return [date1, date2]
    }
};