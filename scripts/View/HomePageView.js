var HomePageView = Backbone.View.extend({
    el: '#content',
    template: _.template(tpl.get('home')),
    lvl2Template: _.template(tpl.get("homeCategoryContainer")),
    buttonTemplate: _.template(tpl.get("homeButton")),
    catButtonTemplate: _.template(tpl.get("homeCatButton")),
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
        app.topBarView.activeNavigator('home');
        this.searchRepresentation = new CourseSearchRepresentation();
        $("body").addClass("index");
//        if (!this.banner) {
//            this.banner = new BannerView();
//        } else if (this.banner.isClosed) {
//            this.banner.render();
//        }
        this.$el.append(this.template);

        if (!this.searchArea) {
            this.searchArea = new SearchArea();
        } else if (this.searchArea.isClosed) {
            this.searchArea.render();
        }
        if (!this.tuanBannerView) {
            this.tuanBannerView = new TuanBannerView();
        } else if (this.tuanBannerView.isClosed) {
            this.tuanBannerView.render();
        }

        $("#lv1Button").after("<div id='tuanPic'></div>");


        app.generalManager.getCategories(this);
    },
    renderCategories: function (categories) {
        //build the buttons on home page;

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
                    /*padding = (colSize - children2.length % colSize) % colSize;
                     while (padding) {
                     cat3.push("<li><a> --- </a></li>");
                     padding--;
                     }*/
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
        var that = this;
        //滚动图片

        //二级目录 非第一行加入class "last" 控制边框显示 以及控制二级目录button的高度
        $("#lv2Categories").children("div").each(function (category) {
            var rowLength = Constants.categoryRowLength,
                list = $(this).find("li"), rowNum = Math.ceil(list.length / rowLength);
            $(this).find("li:gt(-" + (rowLength + 1) + ")").addClass("last");
            $(this).addClass("c_h" + rowNum);
        });
        //初始化激活的标签
        var activeButton = $("#lv1Button").find("a:first").addClass("active");
        var activeButtonli = $("#lv1Button").find("li:first").addClass("active");
        $("#lv2Categories").children("div[data-parent=" + activeButton.parent().data("value") + "]").removeClass("hidden");

        /*//添加滚动图片
         var htmlpic = '';
         for(var i=0;i<4;i++)
         {

         }
         $("#lv1Button").after("<div id='tuanPic'></div>");*/
        if (!that.homePic) {
            that.homePic = new HomePic();
        } else if (that.homePic.isClosed) {
            that.homePic.render();
        }
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
            $("#tuanPic .pic_eve").addClass("hidden");
            $("#tuanPic .pic_eve:eq(" + category + ")").removeClass("hidden");
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
        //背景色改变
        $(".lv2category").hover(function () {
            $(this).find(".fleft").css("background-color", "#47BC78");
        }, function () {
            $(this).find(".fleft").css("background-color", "");
        });
        $(".lv2category .clearfix li").hover(function () {
            $(this).find("a").css("color", "#fff");
            $(this).css({"background-color": "#47BC78", "border-radius": "20px"});
        }, function () {
            $(this).find("a").css("color", "");
            $(this).css({"background-color": ""});
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
//            this.banner.close();
            this.searchArea.close();
            this.tuanBannerView.close();
            //this.artificialSelection.close();
            app.homePageView = null;
            app.topBarView.clearNavigator();
        }
    }
});

//var BannerView = Backbone.View.extend({
//
//    el: '#visualScope',
//    initialize: function () {
//        _.bindAll(this, 'render', 'bindEvents', 'close');
//        this.template = _.template(tpl.get('banner'));
//        this.isClosed = false;
//        this.render();
//    },
//
//    render: function () {
//        if (!this.isClosed) {
//            app.viewRegistration.register(this);
//            this.$el.append(this.template);
//            this.bindEvents();
//        }
//    },
//
//    bindEvents: function () {
//        //img slider
//        $('#visual_container').bjqs({
//            height: 320,
//            width: 1960,
////            randomstart: true,     // start from a random slide
//            animtype: 'fade', // accepts 'fade' or 'slide'
//            animduration: 750, // how fast the animation are
//            animspeed: 4200, // the delay between each slide
//            hoverpause: true // pause the slider on hover
//        });
//        $('#visual_container').css('width', '');
//        $('#visual_container ol.bjqs-markers').css('left', '');
//    },
//
//    close: function () {
//        if (!this.isClosed) {
//            this.$el.empty();
//            this.isClosed = true;
//        }
//    }
//});


//首页的自助选课和人工选课 以及 课程搜索
var SearchArea = Backbone.View.extend({
    el: '#searchArea',
    initialize: function () {
        _.bindAll(this, 'render', 'close', 'selectCatSearch', 'selectCatApply');
        this.model = new Apply();
        this.colorInfoModal = new ColorInfoModal();
        this.searchRepresentation = new CourseSearchRepresentation();
        this.selectCatModal = new SelectCatModal({callback: this.selectCatSearch});
        this.template = _.template(tpl.get('SearchCourse'));
        this.isClosed = false;
        this.render();
        this.bindEvents();

    },

    render: function () {
        this.$el.html(this.template);
        this.searchBarView = new SearchBarView();
        $("#searchCourse .topBar li:eq(0)").addClass("active");
        $(".scperson").addClass("hidden");
        app.generalManager.getLocations(this);//同上 调用this.renderLocations
    },

    /*加载上课地点选项*/
    renderLocations: function (locations) {
        var buf = [];
        var districts = locations[0].children[0].children;
        _.each(districts, function (district) {
            buf.push('<span value="' + district.value + '">' + district.name + '</span>');
        });
        var $dist = $("#location_list");
        $dist.html(buf.join(""));
//        $("#course_search").selectmenu();

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
        $('#courseChoose ').val(cat.name);
    },
    selectCatApply: function (cat) {
        this.catApply = cat;
        $('#applyCourseChoose').val(cat.name);
    },
    bindEvents: function () {
        var that = this;
        //回车触发
        this.$el.on("keypress", function (e) {
            if (e.which === 13) {
                $(".search_btn").click();
            }
        });
        //首页的按照课程名搜索
        this.$el.on('click', '.search_btn', function () {
            var courseName = $('.search_input').val();
            if (courseName) {
                var searchRepresentation = new CourseSearchRepresentation();
                searchRepresentation.set("courseName", courseName);
                app.navigate("search/" + searchRepresentation.toQueryString(), true);
            }
        });
        //大家都在搜
        $(".search_tip").on("click", ".search_span", function () {
            var courseName = $(this).html();
            if (courseName) {
                var searchRepresentation = new CourseSearchRepresentation();
                searchRepresentation.set("courseName", courseName);
                app.navigate("search/" + searchRepresentation.toQueryString(), true);
            }
        });

        /*切换*/
        $("#searchArea .topBar li").on("click", function () {
            var thisclass = $(this).attr("upclass");
            $(".searchContent").addClass("hidden");
            $("." + thisclass).removeClass("hidden");
            $(".topBar li").removeClass("active");
            $(this).addClass("active");
        });

        /**/
        $("#location_list").on("click", 'span', function () {
            $("#location_list span").removeClass("active");
            $("#location_list span").attr("id", "");
            $(this).addClass("active");
            $(this).attr("id", "home_location_select");
        });

        //自助选课 课程类目的选择弹出框
        $("#courseChooseContainer").on("click", function () {
            that.selectCatModal.show();
        });

        //首页 人工选课 ‘立即申请’按钮 提交人工选课的申请
        $("#btnSubmitApply").on("click", function () {
            //var categoryId = that.catApply && that.catApply.id;
            var phone = $('#home_phone_input').val();
            var userName = $('#home_userName_input').val();
            var remark = $('#home_remark_text').val();

            //提交的时候进行输入信息的验证 未输入或者输入错误的进行提示
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
            //that.model.set('categoryId', categoryId);
            that.model.set('phone', phone);
            that.model.set('userName', userName);
            that.model.set('remark', '【PC-首页】' + remark);
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
            var locationValue = $('#home_location_select').attr("value");
            locationValue = locationValue == '' ? undefined : locationValue;

            that.searchRepresentation.set("categoryValue", categoryValue);
            that.searchRepresentation.set("locationValue", locationValue);
            app.navigate("search/" + that.searchRepresentation.toQueryString(), true);
        });
    },

    close: function () {
        if (this.popTip) {
            this.popTip.close();
        }
        if (this.searchBarView) {
            this.searchBarView.close();
        }
        this.colorInfoModal.close();
        this.selectCatModal.close();
        this.$el.empty();
    }
});

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
        setTimeout(this.hide, 1500)
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

//首页滚动图片
var HomePic = Backbone.View.extend({

    el: '#tuanPic',
    initialize: function () {
        _.bindAll(this, 'render', 'close');
        this.template = _.template(tpl.get('homePic'));
        this.isShow = false;
        this.render();
        this.bindEvents();
    },

    render: function () {
        this.$el.append(this.template);
    },
    bindEvents: function () {
        var that = this;
    },

    close: function () {
        this.$el.empty();
        this.isClosed = true;
    }
});


