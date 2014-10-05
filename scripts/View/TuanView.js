var TuanView = Backbone.View.extend({
        el: "#content",
        template: _.template(tpl.get("tuan")),
        initialize: function () {
            this.isClosed = false;
            _.bindAll(this, "render", "bindEvents", "close");
            app.viewRegistration.register(this);
            //从本地初始化搜索条件
            this.searchRepresentation = app.storage.getSearchRepresentationCache("tuan");

            this.render();
        },
        render: function () {
            this.$el.html(this.template());
            if (!this.tuanBannerView) {
                this.tuanBannerView = new TuanBannerView();
            } else if (this.tuanBannerView.isClosed) {
                this.tuanBannerView.render();
            }
            if (!this.tuanResultView) {
                this.tuanResultView = new TuanResultView(this.searchRepresentation);
            } else if (this.tuanResultView.isClosed) {
                this.tuanResultView.render();
            }
            this.bindEvents();
        },

        bindEvents: function () {
            var that = this;
            //绑定右栏筛选按钮 todo 设置searchRepresentationModel存储当前的筛选条件
            $('.labels-category').on('click', 'span', function (e) {
                var $target = $(e.target);
                if ($target.hasClass('active')) {
                    return
                }
                $target.siblings().removeClass('active');
                $target.addClass('active');
                //todo 这里添加设置search按钮 直接fetch
            });
            $('.labels-location').on('click', 'span', function (e) {
                var $target = $(e.target);
                if ($target.hasClass('active')) {
                    return
                }
                $target.siblings().removeClass('active');
                $target.addClass('active');
            })

        },

        close: function () {
            if (!this.isClosed) {
                this.$el.off();
                this.$el.empty();
                this.isClosed = true;
                $('.labels').off();
            }
        }
    })
    ;

/*团BannerView*/
var TuanBannerView = Backbone.View.extend({
    el: "#tuanBanner",
    template: _.template(tpl.get("tuanBanner")),
    initialize: function () {
        var that = this;
        this.isClosed = false;
        _.bindAll(this, "render", "afterRender", "bindEvents", "close");
        app.viewRegistration.register(this);
        //should be no error
        app.generalManager.findTopTuan({
            success:that.render
        });
        this.render();
    },
    render: function (tuans) {
        if(!tuans||!tuans.length){
            return;
        }
        //left img buf and right text buf
        var l_buf=[],r_buf=[];
        this.$el.html(this.template());
        tuans.forEach(function(tuan){
           tuan = tuan._toJSON();
           l_buf.push('<a class="pics" href="#tuan/'+tuan.id+'" target="_blank"><img src="'+tuan.photoList[0].url+'" alt=""/></a> ');
           r_buf.push(
               '<li class="tips_li">'
                   +'<div class="c c-left">'+tuan.title+'</div>'
                   +'<div class="c c-right">'
                       +'<p class="price">￥'+tuan.groupBuyPrice+'</p>'
                       +'<p>&nbsp;&nbsp;原价：<s>&nbsp;'+tuan.course.originalPrice+'&nbsp;</s></p>'
                   +'</div>'
               +'</li>'
           )
        });
        this.$el.find('.pic').html(l_buf.join(''));
        this.$el.find('.tips').html(r_buf.join(''));

        this.afterRender();
        this.bindEvents();
    },
    afterRender:function(){
        this.$el.find('.pic .pics:first').addClass('active');
        this.$el.find('.tips .tips_li:first').addClass('active');
    },
    bindEvents: function () {
        var that = this;
        $(".tips .tips_li").hover(function () {
            var bindex = $(".tips .tips_li").index(this);
            $(".tips .tips_li").removeClass("active");
            $(this).addClass("active");
            $(".pic .pics").removeClass("active");
            $(".pic .pics:eq(" + bindex + ")").addClass("active");
        });
    },

    close: function () {
        if (!this.isClosed) {
            this.$el.off();
            this.$el.empty();
            this.isClosed = true;
        }
    }
});

/*团列表View*/
var TuanResultView = MultiPageView.extend({
    pageNavigator: "tuanResultPage",
    entryContainer: "tuanResultContainer",
    noMessage: _.template(tpl.get("search_noMessage")),
    entryTemplate: _.template(tpl.get("tuanResultEntry")),
    pageEntryNumber: 10,
    scroll:false,
    initialize: function (representation, compareWidget) {
        _.bindAll(this, "bindEvents", "renderSearchResults", "renderError", "close");
        MultiPageView.prototype.initialize.call(this);
        this.sr = representation;
        //$entryContainer根据entryContainer生成 直接使用即可 与el相同
        this.$entryContainer.empty();
        this.user = app.sessionManager.sessionModel;
        this.countDowns = [];

        this.fetchAction();
        this.bindEvents();
        this.bindEntryEvents();
    },
    render: function () {
        this.isClosed = false;
        MultiPageView.prototype.render.call(this);
        this.afterRender();
    },
    //页面成功渲染后的结果
    afterRender: function(){
        var self = this;
        //endTime 倒计时
        var $countDowns = $('.tuan_endTime');
        $.each($countDowns,function(k,$item){
            self.countDowns.push(Utilities.countDown($item))
        });
        //这里是为了声明页面加载完毕 seo
        $('body').attr('pageRenderReady', '')
    },
    bindEvents: function () {
        var that = this;
    },

    bindEntryEvents: function () {
        this.$entryContainer.on('click', '.viewDetail', function () {
            var id = $(this).data('id');
            if (id == '')return;
            //百度统计
            _hmt.push(['_trackEvent', 'tuan', 'click', id]);
            app.navigate("tuan/" + id, true);
        });
    },
    fetchAction: function (pageIndex) {
        var self = this;
        //根据过滤条件(包括分页信息)重新获取数据
        if (pageIndex === undefined) {// 未传入参数

            if (self.sr.get("start") === undefined)// localStorage中不存在缓存
                self.sr.set("start", 0);// 则设置默认的start为0
        } else {
            self.sr.set("start", (pageIndex - 1) * self.pageEntryNumber);
        }
        this.sr.set("count", self.pageEntryNumber);
        self.currentPage = self.sr.get('start') / self.pageEntryNumber + 1;

//        app.navigate("tuan/" + this.sr.toQueryString(), {trigger: false, replace: true});
        $("#" + this.entryContainer).empty().append('<div class="loading"></div>');
        app.generalManager.findTuan(this.sr, {
            success: self.renderSearchResults,
            error: self.renderError
        });
        app.storage.setSearchRepresentationCache(self.sr, "tuan");
    },
    renderError: function (data) {
        if (!this.isClosed) {
            $("#" + this.entryContainer).html('<div class="no_data"><div>很抱歉，您的网络似乎不大好~~</div><p>请稍后再试</p></div>');
        }
    },
    renderSearchResults: function (data) {
        if (!this.isClosed) {
            var searchResults = data || new Courses();
            this.messages = searchResults;
            var total = searchResults.total;//当前筛选条件下的数据总数
            this.startIndex = 0;
            this.render();
        }
    },
    close: function () {
        if (!this.isClosed) {
            _.each(this.countDowns,function(item){
                window.clearInterval(item)
            });
            this.$entryContainer.off();
            MultiPageView.prototype.close.call(this);
        }
    }
});
