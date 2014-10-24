var PartnerDetailView = Backbone.View.extend({
    el: "#content",
    template: _.template(tpl.get('partnerDetail')),
    initialize: function (opt) {
        _.bindAll(this, 'render', 'bindEvents', 'renderMap', 'close','openModal');
        app.viewRegistration.register(this);
        this.isClosed = false;
        this.sr = new CourseSearchRepresentation();

        this.freeTrialModal = new FreeTrialModal();
        this.teacherModal = new TeacherModal();

        this.user = app.sessionManager.sessionModel;
        var self = this;
        app.generalManager.fetchPartner(opt.partnerId, {
            success: function (partner) {
                self.partner = partner.clone();
                self.partnerPhotos = partner.get('classPhotoList').slice(2);//从第三张图片开始为团购详情页面的图片index = 2
                self.teacherList = partner.get("teacherList");
                self.addressList =partner.get("addressList");

                self.render();
                self.bindEvents();
            },
            error: function (data) {
                Info.displayErrorPage("content", data.message);
            }
        });
    },
    //todo 在地图脚本回调结束后会执行renderMap见mapLoadScript
    renderMap: function () {
        if (typeof BMap !== 'undefined' && !this.mapView) {
            var self = this;
            self.addressList = [];
            this.partner.get('addressList').forEach(function (address) {
                self.addressList.push((address.toLocationObj(self.partner.get('instName'))));
            });
            //新建地图view
            this.mapView = new MapView({mapElId: 'smallMap'});
            this.mapView.addMarker( self.addressList[0]);
            $('#smallMap').after('<a class="margin-top block J_viewLarge text-center">查看完整地图</a>');
            $('.addressItem').hover(function () {
                var a = BMap;
                var index = $(this).data('index');
                var address = self.addressList[index];
                self.mapView.removeAllMarkers();
                self.mapView.addMarker(address);
            }, function () {
            });
            this.$el.on('click', '.J_viewLarge', function () {
                self.mapModal = new MapModal({addressList:  self.addressList});
                var $body = $('body');
                var width = $body.width() - 40;
                var height = $body.height() - 60;
                self.mapModal.show({width: width, height: height});
            });
        }
    },
    render: function () {
        var that = this;
        this.partnerJson = this.partner._toJSON();
        $(document).scrollTop(0);
        var address = [],circle = {};
        address = this.partnerJson.addressList;
       _.each(address, function (v, index) {
           if(v.circleId){
               circle[v.circleName] = v.circleId;
           }
        });
        //that.circle = circle;
        this.$el.html(this.template(this.partner._toJSON()));

        var buf = '';
        _.each(circle, function (v, k) {
            buf += '<option value="'+ v +'">' + k + '</option>';
        });

        $("#locationChoose").append(buf);

        this.belongPartnerListView = new BelongPartnerListView({partner : this.partner});
//        //新建相关课程视图
//        this.relatedCourseListView = new RelatedCourseListView({course: this.partner});
//        document.title = "爱上课 | " + this.partner.get("category").name +
//            " | " + this.partner.get("subCategory").name +
//            " | " + this.partner.get("subSubCategory").name +
//            "培训 | " + this.partner.get("courseName");

        /*移除所有table的宽度*/
        $('.course_content .rich table').css('width', '100%');
        var $teachers = $(".teacherInfo"), i, maxHeight = -1, $teacher;
        for (i = 0; i < $teachers.length; i++) {
            $teacher = $($teachers[i]);
            maxHeight = maxHeight > $teacher.height() ? maxHeight : $teacher.height();
        }
        $teachers.css("height", maxHeight);


        //this.compareWidget = new CourseDetailCompareWidgetView();




        //这里是为了声明页面加载完毕
        $('body').attr('pageRenderReady', '');
        //star
//        var rate1 = this.course.get('conditionRating');
//        var rate2 = this.course.get('attitudeRating');
//        var rate3 = this.course.get('satisfactionRating');
//        var evenRating = this.course.get('evenRating');
//        /*评价星级*/
        $("#starDemo").raty({
            readOnly: true,
            start: 4
        });
//
//        $("#star_eleft").raty({
//            readOnly: true,
//            start: evenRating
//        });
//        $("#evaluate_environment").raty({
//            readOnly: true,
//            start: rate1
//        });
//        $("#evaluate_teacher").raty({
//            readOnly: true,
//            start: rate2
//        })
//        ;
//        $("#evaluate_service").raty({
//            readOnly: true,
//            start: rate3
//        });
        $(".detailArea .pic .pic_big").find("a:first").addClass("active");
        $(".detailArea .pic .pic_list").find("i:first").removeClass("active");
//
        var sr = new CommentSearchRepresentation();
        sr.set('partnerId', that.partner.get("id"));
        this.commentsView = new CommentsView({
            sr: sr,
            parentView: that,
            config:{
                showForm:false
            }
        });

        $("#courseChoose").selectmenu();
        $("#locationChoose").selectmenu();
        this.renderMap();
    },
    bindEvents: function () {
        var that = this;

        this.content1_top = $(".tuan_content_1").offset().top;//课程详情
        this.content2_top = $(".tuan_content_2").offset().top;//特色服务
        this.content3_top = $(".tuan_content_3").offset().top;//名师团队
        this.content4_top = $(".tuan_content_4").offset().top;//评价

        /*教师详情*/
        $(".tuan_content_2 .teacher_pic").on("click", function () {
            var teacherIndex = $(this).attr("data-id");
            var teacher = {};
            if (that.partner.get('teacherList') instanceof  Backbone.Collection) {
                teacher = that.partner.get('teacherList').at(teacherIndex);
            } else {
                teacher = that.partner.get('teacherList')[teacherIndex];
            }
            that.teacherModal.show(teacher);
        });
        $(".tuan_content_2 .teacher_pic").hover(function () {
            $(this).find(".overlay_teacher").show();
            $(this).find("span").css("display", "block");
        }, function () {
            $(this).find(".overlay_teacher").hide();
            $(this).find("span").css("display", "none");
        });

        /*banner图片的hover事件*/
        $(".partnerDetail .pic .pic_list a").hover(function () {
            var index = $(this).attr("index");
            $(".partnerDetail .pic .pic_list i").addClass("active");
            $(this).find(".active").removeClass("active");
            $(".partnerDetail .pic .pic_big a").removeClass("active");
            $(".partnerDetail .pic .pic_big").find("a:eq(" + index + ")").addClass("active");
        });

        /*详情页click*/
        $(".partnerDetail .tuan_sorter li").on("click", function () {
            var tindex = $(this).attr("index");
            var id = ".tuan_content_" + tindex;
            $.smoothScroll({
                scrollTarget: id,
                offset: -63,
                speed: 650
            });
        });
        var navH = $("#tuan_fright").offset().top;
        //滚动条事件
        $(window).scroll(function () {
            /*地图那块位置不变*/

            //获取滚动条的滑动距离
            var scroH = $(this).scrollTop();
            //alert(scroH);
            //滚动条的滑动距离大于等于定位元素距离浏览器顶部的距离，就固定，反之就不固定
            if (scroH >= navH) {
                $("#tuan_fright").addClass("stickyHeader");
                $(".partnerDetail .w_730").css("margin-top", "63px");
                $(".tuan_btn").show();
                $(".tuan_sorterArea").addClass("stickyHeader");
                $(".promise").addClass("hidden");
            }
            else if (scroH < navH) {
                $("#tuan_fright").removeClass("stickyHeader");
                $(".partnerDetail .w_730").css("margin-top", "");
                $(".tuan_btn").hide();
                $(".tuan_sorterArea").removeClass("stickyHeader");
                $(".promise").removeClass("hidden");
            }

            $(".tuan_sorter li a").removeClass("active");
            /*滚动到下方，导航栏变active*/
            var stickHeight = 64;
            if (scroH + 63 < that.content2_top - stickHeight) {
                $(".tuan_sorter li a:eq(0)").addClass("active");
            } else if (scroH + 63 >= that.content2_top - stickHeight && scroH + 63 < that.content3_top - stickHeight) {
                $(".tuan_sorter li a:eq(1)").addClass("active");
            } else if (scroH + 63 >= that.content3_top - stickHeight && scroH + 63 < that.content4_top - stickHeight) {
                $(".tuan_sorter li a:eq(2)").addClass("active");
            } else if (scroH + 63 >= that.content4_top - stickHeight) {
                $(".tuan_sorter li a:eq(3)").addClass("active");
            }
        });



        //课程详情中广告图的事件绑定
        $('.partnerDetail .bannerImg').on('click', function () {
            //打开客服系统
            doyoo.util.openChat('g=82548');
        });
        $("#siteMap").on("click", "span", function (e) {
            var id = e.target.id;
            if (id === "siteMap") {
                return;
            }
            that.sr.set("categoryValue", $(this).data('value'));
            app.navigate("search/" + that.sr.toQueryString(), true);
        });

        var catAll = 0;
        var locAll = 0;
        //搜索该机构的课程
        $("#searchInPartner").on("click",function(){
            var cat = $("#courseChoose").val();
            if(cat=="课程分类"){
                cat = undefined;
            }
            var loc = $("#locationChoose").val();
            if(loc=="上课地点"){
                loc = undefined;
            }
            //var loc = $("#locationChoose").attr("data-id");
            that.belongPartnerListView.close();
            that.belongPartnerListView = new BelongPartnerListView({
                partner : that.partner,
                categoryId:cat,
                locationId:loc
            });
        });

        //申请人工选课
        $("#applyCourse").on("click",function(){
           that.applyCourseModal = new ApplyCourseModal();
            that.applyCourseModal.show();
        });

//        $(".tuanIcon").on("click",function(){
//            $.smoothScroll({
//                scrollTarget: ".tuan_content_3",
//                offset: -63,
//                speed: 650
//            });
//        });


        //分享
        jiathis_config.summary = "学霸是怎样练成的？坚持不懈爱上课！强力推荐个好学校http://www.ishangke.cn/#inst/"+ that.partner.id +"，注册即送800元现金券，还有更多课程团购低至一折，快跟我一起去上课吧";

        $('.invitation_share a').on('click',function(e){
            e.preventDefault();
            if (!app.sessionManager.sessionModel.get("invitationCode")) {
                self.openModal();
                //阻止事件追加:分享到其它社区里
                e.stopImmediatePropagation();
            }
        });
        /*bind events end*/
        //load jiathis js for social share
        if($('#jiathis_script').length === 0){
            this.$el.append('<script id="jiathis_script" type="text/javascript" src="http://v3.jiathis.com/code/jia.js?uid=1407735888243953" charset="utf-8"></script>');
        }
        var userAgent = window.navigator.userAgent.toLowerCase();
        var is_ie = (userAgent.indexOf('msie') != -1 && !is_opera) && userAgent.substr(userAgent.indexOf('msie') + 5, 3);
        if (!window.clipboardData) {
            $("#clickCopy").remove();
        } else {
            $("#clickCopy").on("click", function () {
                window.clipboardData.setData("Text", $("#copy_content").val());
            });
        }
    },
    openModal: function () {
        this.usernameModal = new UsernameModal({view:this});
    },

    close: function () {
        if (!this.isClosed) {
            this.$el.empty();
            if(this.applyCourseModal){
                this.applyCourseModal.close();
            }
            if (this.compareWidget) {
                this.compareWidget.close();
            }
            if (this.commentsView) {
                this.commentsView.close();
            }
            if(this.teacherModal){
                this.teacherModal.close();
            }
            if(this.freeTrialModal){
                this.freeTrialModal.close();
            }
            $(document).off("scroll");
            $("#courseNavigateTab").off();
            this.isClosed = true;
            this.belongPartnerListView.close();
            app.partnerDetailView = null;
        }
    }
});


var jiathis_config = {
    boldNum: 0,
    siteNum: 7,
    showClose: false,
    sm: "t163,kaixin001,renren,douban,tsina,tqq,tsohu",
    // imageUrl:"http://v2.jiathis.com/code/images/r5.gif",
    // imageWidth:26,
    // marginTop:150,
    url: "http://www.ishangke.cn",
    title: "学霸是怎样练成的？坚持不懈爱上课！",
    summary: "我请大家免费上培训班啦！接受邀请请点击www.iShangke.cn，注册成为爱会员，我们都能获得20元红包奖励！赶快行动吧！",
    // pic:"自定义分享的图片连接地址",
    data_track_clickback: true,
    shortUrl: true
};
