var FrontPageView = Backbone.View.extend({
    el: '#content',
    template: _.template(tpl.get('front')),
    lvl2Template: _.template(tpl.get("frontCategoryContainer")),
    buttonTemplate: _.template(tpl.get("frontButton")),
    catButtonTemplate: _.template(tpl.get("frontCatButton")),
    initialize: function () {
        _.bindAll(this, 'render', 'renderCategories', 'bindEvents', 'close');
        // $("#viewStyle").attr("href", "style/css/index.css");
        this.user = app.sessionManager.sessionModel;

        this.render();
        //app.sessionManager.fetchSession();
    },

    render: function () {
        document.title = "爱上课 | 为您选择最合适，最优惠的课程";
        this.isClosed = false;
        app.viewRegistration.register(this);
        this.searchRepresentation = new CourseSearchRepresentation();
        $("body").addClass("index");
        if (!this.banner) {
            this.banner = new BannerView();
        } else if (this.banner.isClosed) {
            this.banner.render();
        }
        if (!this.searchArea) {
            this.searchArea = new SearchArea();
        } else if (this.searchArea.isClosed) {
            this.searchArea.render();
        }

        this.$el.append(this.template);
        app.generalManager.getCategories(this);
    },
    renderCategories: function (categories) {
        //build the buttons on front page;

        if (!this.isClosed) {
            this.categories = categories;
            //cbuf 一级目录列表
            //scbuf 二级目录列表
            //tcbuf 三级目录列表
            var data = categories.data, len = data.length, i, j, k, cbuf = [], scbuf = [], tcbuf = [], children1, children2, tc = "", padding, lvl3counter = 0, obj = {};
            for (i = 0; i < len; i++) {
                cbuf[i] = this.buttonTemplate({value: data[i].value, name: data[i].name, index: i + 1});
                children1 = data[i].children || [];
                for (j = 0; j < children1.length; j++) { //循环二级目录
                    children2 = children1[j].children;
                    for (k = 0; k < children2.length; k++) { //循环三级目录
                        lvl3counter++;
                        tcbuf[k] = this.catButtonTemplate({value: children2[k].value, name: children2[k].name});
                    }
                    padding = (Constants.categoryRowMapper[i] - lvl3counter % Constants.categoryRowMapper[i]) % Constants.categoryRowMapper[i];
                    while (padding) {
                        tcbuf.push("<li><a> --- </a></li>");
                        padding--;
                    }
                    obj.catgoryList = tcbuf.join("");
                    obj.catClass = 'cat' + (i + 1);//使用cat作为class 取一级循环中的序号 见index.css
                    obj.categoryName = children1[j].name;
                    obj.parentName = i;
                    obj.value = children1[j].value;
                    obj.parentValue = data[i].value;
                    scbuf[j] = this.lvl2Template(obj);
                    tcbuf = [];
                    lvl3counter = 0;
                }
                $("#lv2Categories").append(scbuf.join(""));
                scbuf = [];
            }
            $("#lv1Button").append(cbuf.join(""));

            this.afterRender();
            this.bindEvents();
        }
    },
    afterRender: function () {
        //二级目录 非第一行加入class "last" 控制边框显示 以及控制二级目录button的高度
        $("#lv2Categories").children("div").each(function (category) {
            var rowLength = Constants.categoryRowMapper[$(this).data("parentname")], list = $(this).find("li"), rowNum = list.length / rowLength;
            $(this).find("li:gt(-" + (rowLength + 1) + ")").addClass("last");
            $(this).addClass("c_h" + rowNum);
        });
        //初始化激活的标签
        var activeButton = $("#lv1Button").find("a:first").addClass("active");
        $("#lv2Categories").children("div[data-parent=" + activeButton.parent().data("value") + "]").removeClass("hidden");
        $("#content").css("padding-bottom", 0);
        //todo 这里是为了声明页面加载完毕
        $('body').attr('pageRenderReady', '')

    },
    bindEvents: function () {
        var that = this;
        //一级目录hover
        $("#lv1Button").on("mouseover", "li", function (e) {
            var category = $(this).data("value");
            $(e.delegateTarget).find(".active").removeClass("active");
            $(this).find("a").addClass("active");
            $("#lv2Categories").children(".hidden").removeClass("hidden");
            $("#lv2Categories").children("div[data-parent!=" + category + "]").addClass("hidden");
        }).on("click", "li", function (e) {
            //一级目录click
            e.preventDefault();
            that.searchRepresentation.set("categoryValue", $(this).data("value"));
            app.navigate("search/" + that.searchRepresentation.toQueryString(), true);
        });
        $("#lv2Categories").on("click", ".fleft", function (e) {
            if (e.target.tagName === "A") {
                e.preventDefault();
                that.searchRepresentation.set("categoryValue", $(this).parent().data("value"));
                app.navigate("search/" + that.searchRepresentation.toQueryString(), true);
            }
        });
        $(".lv2category").on("click", "li", function (e) {
            if (e.target.tagName === "A") {
                e.preventDefault();
                var value = $(this).data("value");
                if (value === undefined)return;
                that.searchRepresentation.set("categoryValue", value);
                app.navigate("search/" + that.searchRepresentation.toQueryString(), true);
            }
        });
    },
    close: function () {
        if (!this.isClosed) {
            $("#lv1Button").off();
            $(".lv2category").off();
            $("#lv2Categories").off();
            $("body").removeClass("index");
            this.$el.empty();
            this.isClosed = true;
            this.banner.close();
            this.searchArea.close();
            //this.artificialSelection.close();
            $("#content").css("padding-bottom", "");
            app.frontPageView = null;
        }
    }
});

var BannerView = Backbone.View.extend({

    el: '#visualScope',
    initialize: function () {
        _.bindAll(this, 'render', 'bindEvents', 'close');
        this.template = _.template(tpl.get('banner'));
        this.isClosed = false;
        this.render();
    },

    render: function () {
        if (!this.isClosed) {
            app.viewRegistration.register(this);
            this.$el.append(this.template);
            this.bindEvents();
        }
    },

    bindEvents: function () {
        //img slider
        $('#visual_container').bjqs({
            height: 320,
            width: 1960,
//            randomstart: true,     // start from a random slide
            animtype: 'fade', // accepts 'fade' or 'slide'
            animduration: 750, // how fast the animation are
            animspeed: 4200, // the delay between each slide
            hoverpause: true // pause the slider on hover
        });
        $('#visual_container').css('width', '');
        $('#visual_container ol.bjqs-markers').css('left', '');
    },

    close: function () {
        if (!this.isClosed) {
            this.$el.empty();
            this.isClosed = true;
        }
    }
});


//首页的自助选课和人工选课
var SearchArea = Backbone.View.extend({
    el: '#searchArea',
    initialize: function () {
        _.bindAll(this, 'render', 'close');
        this.searchRepresentation = new CourseSearchRepresentation();
        this.template = _.template(tpl.get('SearchCourse'));
        this.isClosed = false;
        this.render();
        this.bindEvents();
    },

    render: function () {
        app.viewRegistration.register(this);
        this.$el.append(this.template);
        app.generalManager.getLocations(this);//同上 调用this.renderLocations

    },
    /*加载上课地点选项*/
    renderLocations: function (locations) {
        var buf = ['<option value>不限</option>'];
        var districts = locations[0].children[0].children;
        _.each(districts,function(district){
            buf.push('<option value="'+district.value+'">'+district.name+'</option>');
        });
        var $dist = $("#home_location_select");
        $dist.html(buf.join(""));
    },
    bindEvents: function () {
        var that = this;
        
        //自助选课 课程类目的选择弹出框
        $("#corseChoose").on("click", function () {
            //todo 传入参数 说明是从搜索课程的view中获取的 参数为option
            if (!that.courseTip) {
                that.courseTip = new CourseTip();
            }
            else if (!that.courseTip.isShow) {
                that.courseTip.show();
            }
            //todo 当然不能在这里绑定事件来获取返回的值了    
            $("#popcourseTip").attr("showid", "corseChoose");
        });
        //首页 人工选课 ‘立即申请’按钮 提交人工选课的申请
        $("#btnSubmitApply").on("click", function () {
            //todo 提交的时候进行输入信息的验证 未输入或者输入错误的进行提示
            var phone = $('#home_phone_input').val();
            var userName = $('#home_userName_input').val();
            var remark = $('#home_remark_input').val();

            if(!phone){
                alert('hi man,no phone number');
                return
            }
            if(!userName){
                alert('hi man, no userName');
                return
            }

            app.userManager.initApply(that.model, {
                success: function () {
                    if (!that.popTip) {
                        that.popTip = new PopTip();
                    } else {
                        that.popTip.show();
                    }
                },
                error: function (data) {
                }
            });
        });
        //首页 自助选课 ‘搜索’按钮 根据当前选择的搜索条件进入到对应的搜索内容中
        $(".SearchIcon").on("click", function () {
            //todo 如何获取课程类目的值
            var categoryValue = undefined;
            var dataValue = $('#select_startDate').val();//上课日期
            var locationValue = $('#home_location_select').val();
            var classType = $('#home_classType_select').val();
            dataValue= dataValue==''?undefined:dataValue;
            locationValue= locationValue==''?undefined:locationValue;
            classType= classType==''?undefined:classType;

            var now = new Date();
            var date1 = new Date(Date.parse([now.getFullYear(), now.getMonth() + 1].join('-')));
            var date2;
            var month = date1.getMonth();
            //设置当月的时间
            if (dataValue === "thisMonth") {
                date2 = new Date(date1);
                if (month === 11) {
                    date2.setMonth(0);
                    date2.setFullYear(date1.getFullYear() + 1);
                } else {
                    date2.setMonth(date1.getMonth() + 1);
                }
            }
            //设置下个月的时间
            else if (dataValue === "nextMonth") {
                if (month === 11) {
                    date1.setMonth(0);
                    date1.setFullYear(date1.getFullYear() + 1);
                    date2 = new Date(date1);
                    date2.setMonth(date2.getMonth() + 1);
                } else {
                    date1.setMonth(date1.getMonth() + 1);
                    date2 = new Date(date1);
                    if (month === 10) {
                        date2.setMonth(0);
                        date2.setFullYear(date2.getFullYear() + 1);
                    } else {
                        date2.setMonth(date2.getMonth() + 1);
                    }

                }
            } else if (dataValue === "twoMonthsAfter") {
                if (month >= 10) {
                    date1.setMonth((date1.getMonth() + 2) % 12);
                    date1.setFullYear(date1.getFullYear() + 1);
                    date2 = new Date(date1);
                    date2.setMonth(date2.getMonth() + 1);
                } else {
                    date1.setMonth(date1.getMonth() + 2);
                    date2 = new Date(date1);
                    if (month === 10) {
                        date2.setMonth(0);
                        date2.setFullYear(date2.getFullYear() + 1);
                    } else {
                        date2.setMonth(date2.getMonth() + 1);
                    }
                }
            } else {
                date1 = undefined;
                date2 = undefined;
            }

            that.searchRepresentation.set("categoryValue", categoryValue);
            that.searchRepresentation.set("startDateStart", date1);
            that.searchRepresentation.set("startDateEnd", date2);
            that.searchRepresentation.set("locationValue", locationValue);
            that.searchRepresentation.set("classType", classType);
            app.navigate("search/" + that.searchRepresentation.toQueryString(), true);
            //以下内容为弹出人工选课的弹出框
//            if (!that.artificialSelection) {
//                that.artificialSelection = new ArtificialSelection();
//
//            } else if (that.artificialSelection.isClosed) {
//                that.artificialSelection.render();
//            } else if (!that.artificialSelection.isShow) {
//                that.artificialSelection.show();
//            }


        });
    },

    close: function () {
        this.$el.empty();
        //this.artificialSelection.close();
        var isShow = false;
    }
});

//申请人工选课弹出层 创建新申请
var ArtificialSelection = Backbone.View.extend({

    el: '#overlayASelection',
    initialize: function () {
        _.bindAll(this, 'render', 'close');
        this.template = _.template(tpl.get('artificialSelection'));
        this.model = new Apply();
        this.isClosed = false;
        this.isShow = false;
        this.render();
        this.bindEvents();
    },

    render: function () {
        if (!this.isClosed) {
            app.viewRegistration.register(this);
            this.$el.append(this.template);
        }
    },
    bindEvents: function () {
        var that = this;
        //弹出层关闭事件（关闭按钮和取消按钮）
        $(".popMainClose").on("click", function () {
            that.hide();
        });
        $(".popBtnNo").on("click", function () {
            that.hide();
        });

        //选择具体的意向课程
        $("#aSelectiontxt").on("click", function () {
            $("#popcourseTip").attr("showid", "aSelectiontxt");
            var thats = this;
            if (!that.courseTip) {
                that.courseTip = new CourseTip();
            } else if (!that.courseTip.isShow) {
                that.courseTip.show();
            }

            $(".courseTipAContentDesUl li").on("click",function(){
                //alert("2");
                that.courseTip.hide();
                //alert($(this).html());
                $("#asel-course").val("  "+$(this).html());
            });
        });

        //todo 弹出层里 ‘立即申请’按钮 提交人工选课的申请
        $("#btnSubmitApply").on("click", function () {
            //todo 提交的时候进行输入信息的验证 未输入或者输入错误的进行提示
            var phone = $('#home_phone_input').val();
            var userName = $('#home_userName_input').val();
            var remark = $('#home_remark_input').val();

            if(!phone){
                alert('hi man,no phone number')
            }
            if(!userName){
                alert('hi man, no userName')
            }

            app.userManager.initApply(that.model, {
                success: function () {
                    that.hide();
                    if (!that.popTip) {
                        that.popTip = new PopTip();
                    } else {
                        that.popTip.show();
                    }
                },
                error: function (data) {
                }
            });
        });
    },
    show: function () {
        $("#popartificialSelection").fadeIn(400);
        this.isShow = true;
    },
    hide: function () {
        $("#popartificialSelection").fadeOut(400);
        this.isShow = false;
    },


    close: function () {
        if (!this.isClosed) {
            /*if(!this.popTip.isClosed)
             {
             this.popTip.close();
             }*/
            //this.popTip.close();
            //this.courseTip.close();
            this.$el.empty();
            this.isClosed = true;
        }
    }
});

//课程弹出框
var CourseTip = Backbone.View.extend({

    el: '#overlayCourse',
    initialize: function () {
        var that=this;
        _.bindAll(this, 'render', 'close');
        this.template = _.template(tpl.get('courseTip'));
        this.isClosed = false;
        this.isShow = false;
        this.courseAll = testMockObj.testCategories.data;
        this.courseLev1={};
        this.courseSmallTitle = {};
        this.courseLev2 = {};


        _.each(this.courseAll, function (v, index) {
            that.courseLev1[index] = v.children;
        });

        this.render();
    },

    render: function () {
        var that = this;


        if (!this.isClosed) {
            app.viewRegistration.register(this);
            this.$el.append(this.template({
                courseTitle: that.courseAll
            }));
            $(".courseTipATop").find("li:first").addClass("courseTipATopHoverSpec");

            //开始的时候生成的目录
            //var x = $(".courseTipATopHoverSpec").attr("data-value");
            var htmlcourse = "";
            for(i=0;i<that.courseAll.length;i++)
            {
                htmlcourse += '<div class="cousedes cousedes0'+ i +' hidden">';
                that.courseSmallTitle = that.courseLev1[i];
                _.each(that.courseSmallTitle, function (v, index) {
                    //console.log(v.children);
                    that.courseLev2[index] = v.children;
                });

                _.each(that.courseSmallTitle, function (v, index) {
                    htmlcourse += '<li>';
                    htmlcourse += '    <div class="courseTipAContentTop"  data-value="'+ v.value+'" data-id="'+v.id+'">' + v.name + '</div>';
                    htmlcourse += '    <ul class="courseTipAContentDesUl">';
                    //添加三级目录
                    _.each(that.courseLev2[index], function (s, index) {
                        //console.log(v.children);
                        htmlcourse += '<li data-value="'+ s.value+'" data-id="'+s.id+'">'+ s.name +'</li>';
                    });
                    htmlcourse += '    </ul>';
                    htmlcourse += '</li>';
                });
                htmlcourse += '</div>';
            }
            $(".courseTipAContentDes").html(htmlcourse);

            $(".courseTipAContentDes").find(".cousedes:first").removeClass("hidden");


            this.bindEvents();
        }
    },
    bindEvents: function () {
        var that = this;
        $(".courseTipClose").on("click", function () {
            that.hide();
        });
        //hover移动二级目录
        $(".courseTipATopHover").hover(function () {
            $(".courseTipATopHover").removeClass("courseTipATopHoverSpec");
            $(".courseTipAContentDes").find(".cousedes").addClass("hidden");
            var thisvalue=$(this).attr("data-value");
            $(".courseTipAContentDes").find(".cousedes"+thisvalue).removeClass("hidden");
            $(this).addClass("courseTipATopHoverSpec");

        }, function () {

        });

        //点击三级目录
        $(".courseTipAContentDesUl li").on("click", function () {
            that.hide();
            var txtid = $("#popcourseTip").attr("showid");
            $("#"+txtid).val("  " + $(this).html());
        });
    },
    show: function () {
        $("#popcourseTip").fadeIn(400);
        this.isShow = true;
    },
    hide: function () {
        $("#popcourseTip").fadeOut(400);
        this.isShow = false;
    },


    close: function () {
        if (!this.isClosed) {
            this.$el.empty();
            this.isClosed = true;
        }
    }
});
//申请成功弹出窗口
var PopTip = Backbone.View.extend({

    el: '#overlayApplySuc',
    initialize: function () {
        _.bindAll(this, 'render', 'close');
        this.template = _.template(tpl.get('popTip'));
        this.isClosed = false;
        this.isShow = false;
        this.render();
        this.bindEvents();
    },

    render: function () {
        if (!this.isClosed) {
            app.viewRegistration.register(this);
            this.$el.append(this.template);
        }
    },
    bindEvents: function () {
        var that = this;
        $(".popTipMidA").on("click", function () {
            that.hide();
        });
    },
    show: function () {
        $("#popSuccessApple").fadeIn(400);
        this.isShow = true;
        setTimeout(this.hide, 4000);
    },
    hide: function () {
        $("#popSuccessApple").fadeOut(400);
        this.isShow = false;
    },


    close: function () {
        if (!this.isClosed) {
            this.$el.empty();
            this.isClosed = true;
        }
    }
});


