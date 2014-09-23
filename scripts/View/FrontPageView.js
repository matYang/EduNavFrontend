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
            //cat1 一级目录列表
            //cat2 二级目录列表
            //cat3 三级目录列表
            var data = categories.data,
                len = data.length,
                colSize = Constants.categoryRowLength,//每行的列数
                i, j, k,
                cat1 = [], cat2 = [], cat3 = [],
                children1, children2, padding, obj = {};
            for (i = 0; i < len; i++) {
                cat1[i] = this.buttonTemplate({value: data[i].value, name: data[i].name, index: i + 1});
                children1 = data[i].children || [];
                for (j = 0; j < children1.length; j++) { //循环二级目录
                    children2 = children1[j].children;
                    for (k = 0; k < children2.length; k++) { //循环三级目录
                        cat3[k] = this.catButtonTemplate({value: children2[k].value, name: children2[k].name});
                    }
                    padding = (colSize - children2.length % colSize) % colSize;
                    while (padding) {
                        cat3.push("<li><a> --- </a></li>");
                        padding--;
                    }
                    obj.catgoryList = cat3.join("");
                    obj.catClass = 'cat' + (i + 1);//使用cat作为class 取一级循环中的序号 见index.css
                    obj.categoryName = children1[j].name;
                    obj.parentName = i;
                    obj.value = children1[j].value;
                    obj.parentValue = data[i].value;
                    cat2[j] = this.lvl2Template(obj);
                    cat3 = [];
                }
                $("#lv2Categories").append(cat2.join(""));
                cat2 = [];
            }
            $("#lv1Button").append(cat1.join(""));
            obj = null;

            this.afterRender();
            this.bindEvents();
        }
    },
    afterRender: function () {
        //二级目录 非第一行加入class "last" 控制边框显示 以及控制二级目录button的高度
        $("#lv2Categories").children("div").each(function (category) {
            var rowLength = Constants.categoryRowLength,
                list = $(this).find("li"), rowNum = list.length / rowLength;
            $(this).find("li:gt(-" + (rowLength + 1) + ")").addClass("last");
            $(this).addClass("c_h" + rowNum);
        });
        //初始化激活的标签
        var activeButton = $("#lv1Button").find("a:first").addClass("active");
        var activeButtonli = $("#lv1Button").find("li:first").addClass("active");
        $("#lv2Categories").children("div[data-parent=" + activeButton.parent().data("value") + "]").removeClass("hidden");
        $("#content").css("padding-bottom", 0);
        //这里是为了声明页面加载完毕
        $('body').attr('pageRenderReady', '')

    },
    bindEvents: function () {
        var that = this;
        //一级目录hover
        $("#lv1Button").on("mouseover", "li", function (e) {
            var category = $(this).data("value");
            $(e.delegateTarget).find(".active").removeClass("active");
            $(this).find("a").addClass("active");
            $(this).addClass("active");
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
            e.preventDefault();
            var value = $(this).data("value");
            if (value === undefined)return;
            that.searchRepresentation.set("categoryValue", value);
            app.navigate("search/" + that.searchRepresentation.toQueryString(), true);
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
        _.bindAll(this, 'render', 'close', 'selectCatSearch', 'selectCatApply');
        this.model = new Apply();
        this.colorInfoModal = new ColorInfoModal();
        this.searchRepresentation = new CourseSearchRepresentation();
        this.template = _.template(tpl.get('SearchCourse'));
        this.isClosed = false;
        this.render();
        this.bindEvents();
    },

    render: function () {
        this.$el.html(this.template);
        app.generalManager.getLocations(this);//同上 调用this.renderLocations
    },
    /*加载上课地点选项*/
    renderLocations: function (locations) {
        var buf = ['<option value>不限</option>'];
        var districts = locations[0].children[0].children;
        _.each(districts, function (district) {
            buf.push('<option value="' + district.value + '">' + district.name + '</option>');
        });
        var $dist = $("#home_location_select");
        $dist.html(buf.join(""));
        //select should after it is ready
        $dist.selectmenu();
    },
    clearModel: function () {
        this.model = new Apply();
        $('#home_phone_input').val('');
        $('#home_userName_input').val('');
        $('#home_remark_text').val('');
    },
    //以下两个均为选择目录后的回调函数 设置model 并更新view
    selectCatSearch: function (cat) {
        this.catSearch = cat;
        $('#courseChoose').val(cat.name);
    },
    selectCatApply: function (cat) {
        this.catApply = cat;
        $('#applyCourseChoose').val(cat.name);
    },
    bindEvents: function () {
        var that = this;

        /*select引用jquery-ui*/
        $("#select_startDate").selectmenu();
        $("#home_classType_select").selectmenu();

        //自助选课 课程类目的选择弹出框
        $("#courseChoose").on("click", function () {
            //传入选择目录以后的回调函数
            if (!that.courseTip) {
                that.courseTip = new SelectCatModal({callback: that.selectCatSearch});
            }
            else if (!that.courseTip.isShow) {
                that.courseTip.show({callback: that.selectCatSearch});
            }
        });
        //人工选课 课程类目的选择弹出框
        $("#applyCourseChoose").on("click", function () {
            //传入选择目录以后的回调函数
            if (!that.courseTip) {
                that.courseTip = new SelectCatModal({callback: that.selectCatApply});
            }
            else if (!that.courseTip.isShow) {
                that.courseTip.show({callback: that.selectCatApply});
            }
        });
        //首页 人工选课 ‘立即申请’按钮 提交人工选课的申请
        $("#btnSubmitApply").on("click", function () {
            var categoryId = that.catApply && that.catApply.id;
            var phone = $('#home_phone_input').val();
            var userName = $('#home_userName_input').val();
            var remark = $('#home_remark_text').val();

            //提交的时候进行输入信息的验证 未输入或者输入错误的进行提示
            if (!categoryId) {
                that.colorInfoModal.show({message: '亲，请选择您的意向课程'});
                return
            }
            if (!phone) {
                that.colorInfoModal.show({message: '亲，请输入您的联系电话'});
                return
            }
            if (!phone) {
                that.colorInfoModal.show({message: '亲，请输入您的联系电话'});
                return
            }
            if (phone.length !== 11 || isNaN(parseInt(phone, 10))) {
                that.colorInfoModal.show({message: '亲，您的联系电话输入有误'});
                return
            }
            if (!userName) {
                that.colorInfoModal.show({message: '亲，请输入您的姓名'});
                return
            }
            that.model.set('categoryId', categoryId);
            that.model.set('phone', phone);
            that.model.set('userName', userName);
            that.model.set('remark', remark);
            app.userManager.initApply(that.model, {
                success: function () {
                    that.clearModel();
                    if (!that.popTip) {
                        that.popTip = new SuccessPopTip();
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
            var categoryValue = that.catSearch && that.catSearch.value;
            var dataValue = $('#select_startDate').val();//上课日期
            var locationValue = $('#home_location_select').val();
            var classType = $('#home_classType_select').val();
            dataValue = dataValue == '' ? undefined : dataValue;
            locationValue = locationValue == '' ? undefined : locationValue;
            classType = classType == '' ? undefined : classType;

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
        });
    },

    close: function () {
        //需要关闭 生成的view  courseTip popTip
        if (this.courseTip) {
            this.courseTip.close();
        }
        if (this.popTip) {
            this.popTip.close();
        }
        this.colorInfoModal.close();
        this.$el.empty();
    }
});

//todo 申请人工选课 弹出层形式 创建新申请
var ApplyACourseModal = Backbone.View.extend({

    el: '#overlayASelection',
    initialize: function (opt) {
        _.bindAll(this, 'render', 'selectCatApply', 'autoName', 'close');
        this.validEle = '#modalA_submit_error';
        this.template = _.template(tpl.get('artificialSelection'));
        this.model = new Apply();
        //初始化时候的category
        this.render(opt.cat);
        this.bindEvents();
    },

    render: function (cat) {
        this.$el.html(this.template);
        this.selectCatApply(this)
    },
    clearModel: function () {
        this.model = new Apply();
        $('#modalA_phone_input').val('');
        $('#modalA_userName_input').val('');
        $('#modalA_remark_text').val('');
    },
    //以下为选择目录后的回调函数 设置model 并更新view
    selectCatApply: function (cat) {
        if (cat) {
            this.catApply = cat;
            $('#modalAChooseCat').val(cat.name);
        }
    },
    //自动填充用户名等
    autoName: function () {
        if (app.sessionManager.hasSession()) {
            //自动填充手机号和用户名 如果存在的话
            var name = app.sessionManager.sessionModel.get('username');
            var phone = app.sessionManager.sessionModel.get('phone');
            $('#modalA_userName_input').val(name);
            $('#modalA_phone_input').val(phone);
        }
    },
    bindEvents: function () {
        var that = this;
        //弹出层关闭事件（关闭按钮和取消按钮）
        $(".popAClose").on("click", function () {
            that.hide();
        });

        //选择具体的意向课程
        $("#modalAChooseCat").on("click", function () {
            //传入选择目录以后的回调函数
            if (!that.courseTip) {
                that.courseTip = new SelectCatModal({callback: that.selectCatApply});
            }
            else if (!that.courseTip.isShow) {
                that.courseTip.show({callback: that.selectCatApply});
            }
        });

        //弹出层里的‘立即申请’按钮 提交人工选课的申请
        $("#modalABtnSubmitApply").on("click", function () {
            //弹出层形式 提交Apply的时候进行输入信息的验证 未输入或者输入错误的进行提示
            var $valid = $(that.validEle);
            var categoryId = that.catApply && that.catApply.id;
            var phone = $('#modalA_phone_input').val();
            var userName = $('#modalA_userName_input').val();
            var remark = $('#modalA_remark_text').val();
            $valid.empty();
            //提交的时候进行输入信息的验证 未输入或者输入错误的进行提示
            if (!categoryId) {
                $valid.html('<i class="icon icon-error"></i>亲，请选择您的意向课程');
                return
            }
            if (!phone) {
                $valid.html('<i class="icon icon-error"></i>亲，请输入您的联系电话');
                return
            }
            if (phone.length !== 11 || isNaN(parseInt(phone, 10))) {
                $valid.html('<i class="icon icon-error"></i>亲，您的联系电话输入有误');
                return
            }
            if (!userName) {
                $valid.html('<i class="icon icon-error"></i>亲，请输入您的姓名');
                return
            }
            that.model.set('categoryId', categoryId);
            that.model.set('phone', phone);
            that.model.set('userName', userName);
            that.model.set('remark', remark);
            app.userManager.initApply(that.model, {
                success: function () {
                    that.hide();
                    that.clearModel();
                    if (!that.popTip) {
                        that.popTip = new SuccessPopTip();
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
    },
    hide: function () {
        $("#popartificialSelection").fadeOut(400);
    },

    close: function () {
        //需要关闭 生成的view  courseTip popTip
        if (this.courseTip) {
            this.courseTip.close();
        }
        if (this.popTip) {
            this.popTip.close();
        }
        this.$el.empty();
    }
});

//课程类目选择弹出框
var SelectCatModal = Backbone.View.extend({

    el: '#overlayCourse',
    initialize: function (opt) {
        _.bindAll(this, 'render', 'renderCategories', 'close');
        this.callback = opt.callback;
        this.template = _.template(tpl.get('courseTip'));
        this.isClosed = false;
        this.isShow = false;
        app.generalManager.getCategories(this);//传递this,会在获取目录之后调用this.renderCategories()
    },
    renderCategories: function (categories) {
        var that = this;
        this.courseAll = categories.data;
        this.courseLev1 = {};
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
            for (var i = 0; i < that.courseAll.length; i++) {
                htmlcourse += '<div class="cousedes cousedes0' + i + ' hidden">';
                that.courseSmallTitle = that.courseLev1[i];
                _.each(that.courseSmallTitle, function (v, index) {
                    //console.log(v.children);
                    that.courseLev2[index] = v.children;
                });

                _.each(that.courseSmallTitle, function (v, index) {
                    htmlcourse += '<li>';
                    htmlcourse += '    <div class="courseTipAContentTop"  data-value="' + v.value + '" data-id="' + v.id + '">' + v.name + '</div>';
                    htmlcourse += '    <ul class="courseTipAContentDesUl">';
                    //添加三级目录
                    _.each(that.courseLev2[index], function (s, index) {
                        //console.log(v.children);
                        htmlcourse += '<li data-value="' + s.value + '" data-id="' + s.id + '">' + s.name + '</li>';
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
            var thisvalue = $(this).attr("data-value");
            $(".courseTipAContentDes").find(".cousedes" + thisvalue).removeClass("hidden");
            $(this).addClass("courseTipATopHoverSpec");

        }, function () {

        });

        //点击三级目录
        $(".courseTipAContentDesUl li").on("click", function () {
            that.hide();
            var catObj = {};
            catObj.id = $(this).data('id');
            catObj.value = $(this).data('value');
            catObj.name = $(this).text();
            that.callback(catObj);
            catObj = null;
        });
    },
    show: function (opt) {
        this.callback = opt.callback;
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
var SuccessPopTip = Backbone.View.extend({

    el: '#overlayApplySuc',
    initialize: function () {
        _.bindAll(this, 'render', 'close');
        this.template = _.template(tpl.get('popTip'));
        this.isShow = false;
        this.render();
        this.bindEvents();
    },

    render: function () {
        app.viewRegistration.register(this);
        this.$el.append(this.template);
    },
    bindEvents: function () {
        var that = this;
        $(".popTipMidA").on("click", function () {
            that.hide();
        });
        $('#js_viewOtherCourses').on('click', function () {
            app.navigate('search', true)
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
        this.$el.empty();
        this.isClosed = true;
    }
});


