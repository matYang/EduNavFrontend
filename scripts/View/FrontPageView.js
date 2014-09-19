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
        this.searchRepresentation = app.storage.getSearchRepresentationCache("course");
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
        var activeButtonli = $("#lv1Button").find("li:first").addClass("active");
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
//首页的搜素
var SearchArea = Backbone.View.extend({
    el: '#searchArea',
    initialize: function () {
        _.bindAll(this, 'render', 'close');
        this.template = _.template(tpl.get('SearchCourse'));
        this.isClosed = false;
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
        $(".SearchIcon").on("click", function () {
            if (!that.artificialSelection) {
                that.artificialSelection = new ArtificialSelection();

            } else if (that.artificialSelection.isClosed) {
                that.artificialSelection.render();
            } else if (!that.artificialSelection.isShow) {
                that.artificialSelection.show();
            }


        });

        $("#corseChoose").on("click", function () {
            var thats = this;
            if (!that.courseTip) {
                that.courseTip = new CourseTip();
            } else if (that.courseTip.isClosed) {
                that.courseTip.render();
            }
            if (!that.courseTip.isShow) {
                that.courseTip.show();
            }

            $(".courseTipAContentDesUl li").on("click", function () {
                that.courseTip.hide();
                $(thats).val(" " + $(this).html());
            });
        });


    },

    close: function () {
        if (!this.isClosed) {
            this.$el.empty();
            //this.artificialSelection.close();
            this.isClosed = true;
            var isShow = false;


        }
    }
});
//人工选课
var ArtificialSelection = Backbone.View.extend({

    el: '#overlayASelection',
    initialize: function () {
        _.bindAll(this, 'render', 'close');
        this.template = _.template(tpl.get('artificialSelection'));
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
        $(".popMainClose").on("click", function () {
            that.hide();
        });

        $(".popBtnNo").on("click", function () {
            that.hide();
        });

        $("#btnAppleartificialSelection").on("click", function () {
            that.hide();
            if (!that.popTip) {
                that.popTip = new PopTip();
            } else if (that.popTip.isClosed) {
                that.popTip.render();
            }
            if (!that.popTip.isShow) {
                that.popTip.show();

            }
        });

        $("#aSelectiontxt").on("click", function () {
            var thats=this;
            if (!that.courseTip) {
                that.courseTip = new CourseTip();
            } else if (that.courseTip.isClosed) {
                that.courseTip.render();
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


//课程弹出框
var CourseTip = Backbone.View.extend({

    el: '#overlayCourse',
    initialize: function () {
        _.bindAll(this, 'render', 'close');
        this.template = _.template(tpl.get('courseTip'));
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
        $(".courseTipClose").on("click", function () {
            that.hide();
        });
        $(".courseTipATopHover").hover(function () {
            $(".courseTipATopHover").removeClass("courseTipATopHoverSpec");
            $(this).addClass("courseTipATopHoverSpec");
        }, function () {

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
