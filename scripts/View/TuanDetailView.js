var TuanDetailView = Backbone.View.extend({
    el: "#content",
    //todo need to write template named 'tpl_tuanDetail'
    template: _.template(tpl.get("tuanDetail")),
    initialize: function (opt) {
        this.isClosed = false;
        _.bindAll(this, "render", "bindEvents", "close");
        app.viewRegistration.register(this);

        var self = this;
        //这里获取课程数据信息
        app.generalManager.fetchCourse(opt.courseId, {
            success: function (course) {
                app.generalManager.fetchCategories({
                    success: function (catObj) {
                        self.course = course.clone();
                        self.courseId = course.get("id");
                        self.courseTemplateId = course.get("courseTemplateId");
                        //将categoryValue转换成一二三级的键值对
                        var catArray = Utilities.getCategoryArray(self.course.get("categoryValue"), catObj.data);
                        self.course.set("category", catArray[0]);
                        self.course.set("subCategory", catArray[1]);
                        self.course.set("subSubCategory", catArray[2]);
                        self.render();
                        self.bindEvents();
                    }
                });

            },
            error: function (data) {
                Info.displayErrorPage("content", data.message);
            }
        });

    },
    render: function () {
        document.title = '全城最低价';
        this.$el.html(this.template(this.course._toJSON()));
        $("#tuanDetail .pic .pic_list").find("i:first").removeClass("active");
        $("body").css("background-color","#f1f1f1");
        /*评价星级*/
        $("#starDemo").raty({
            readOnly:  true,
            start: 4
        });
        $("#star_environment").raty();
        $("#star_teacher").raty();
        $("#star_service").raty();
        $("#star_eleft").raty({
            readOnly:  true,
            start: 4
        });
        $("#evaluate_environment").raty({
            readOnly:  true,
            start: 5
        });
        $("#evaluate_teacher").raty({
            readOnly:  true,
            start: 4
        })
        ;$("#evaluate_service").raty({
            readOnly:  true,
            start: 4
        });
        for(var i= 0;i<4;i++)
        {
            $("#satr_user"+i).raty({
                readOnly:  true,
                start: 4
            });
        }

        this.bindEvents();
    },

    bindEvents: function () {
        var that = this;
        /*banner图片的hover事件*/
        $("#tuanDetail .pic .pic_list a").hover(function(){
            var index =  $(this).attr("index");
            $("#tuanDetail .pic .pic_list i").addClass("active");
            $(this).find(".active").removeClass("active");
            $("#tuanDetail .pic .pic_big a").removeClass("active");
            $("#tuanDetail .pic .pic_big").find("a:eq("+index+")").addClass("active");
        });

        /*每列的高度*/
        this.tuan_content_1 = $("#tuan_content_1").offset().top;//课程详情
        this.tuan_content_2 = $("#tuan_content_2").offset().top;//学校师质
        this.tuan_content_3 = $("#tuan_content_3").offset().top;//特色服务
        this.tuan_content_4 = $("#tuan_content_4").offset().top;//评价

        /*详情页click*/
        $("#tuanDetail .tuan_sorter li").on("click",function(){
            var tindex=$(this).attr("index");
            var id = "#tuan_content_"+tindex;
            $.smoothScroll({
                scrollTarget: id,
                offset: -40,
                speed: 650
            });
        });






        /*地图那块位置不变*/
        var navH = $("#tuan_fright").offset().top;
        //滚动条事件
        $(window).scroll(function(){
            //获取滚动条的滑动距离
            var scroH = $(this).scrollTop();
            //alert(scroH);
            //滚动条的滑动距离大于等于定位元素距离浏览器顶部的距离，就固定，反之就不固定
            if(scroH >= navH){
                $("#tuan_fright").css({"position":"fixed","top":4,"margin-left":750});
                $("#tuan_btn").show();
                $("#tuanDetail .fright .site_map").css({"margin":"55px 0 0 0"});
                $(".tuan_sorterArea").css({"position":"fixed","padding-top":"4px","top":0});
            }
            else if(scroH<navH){
                $("#tuan_fright").css({"position":"relative","top":"","margin-left":""});
                $("#tuan_btn").hide();
                $("#tuanDetail .fright .site_map").css({"margin":""});
                $(".tuan_sorterArea").css({"position":"","top":"","padding-top":"4px"});
            }

            $(".tuan_sorter li a").removeClass("active");
            /*滚动到下方，导航栏变active*/
            var stickHeight=64;
            if (scroH + 63 < that.tuan_content_2-stickHeight) {
                $(".tuan_sorter li a:eq(0)").addClass("active");
            } else if (scroH + 63 >= that.tuan_content_2-stickHeight && scroH + 63 < that.tuan_content_3-stickHeight) {
                $(".tuan_sorter li a:eq(1)").addClass("active");
            } else if (scroH + 63 >= that.tuan_content_3-stickHeight && scroH + 63 < that.tuan_content_4-stickHeight) {
                $(".tuan_sorter li a:eq(2)").addClass("active");
            } else if (scroH + 63 >= that.tuan_content_4-stickHeight) {
                $(".tuan_sorter li a:eq(3)").addClass("active");
            }
        });
    },

    close: function () {
        if (!this.isClosed) {
            this.$el.off();
            this.$el.empty();
            this.isClosed = true;
            $("body").css("background-color","#fff");
        }
    }
});
