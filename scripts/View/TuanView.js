var TuanView = Backbone.View.extend({
        el: "#content",
        template: _.template(tpl.get("tuan")),
        initialize: function () {
            this.isClosed = false;
            _.bindAll(this, "render", "renderCircle", "bindEvents", "close");
            app.viewRegistration.register(this);
            app.topBarView.activeNavigator('tuan');
            this.render();
        },
        render: function () {

            //var circle = app.generalManager.fetchCircle();
            $(document).scrollTop(0);
            this.$el.html(this.template());
            if (!this.tuanBannerView) {
                this.tuanBannerView = new TuanBannerView();
            } else if (this.tuanBannerView.isClosed) {
                this.tuanBannerView.render();
            }
            if (!this.tuanResultView) {
                this.tuanResultView = new TuanResultView();
            } else if (this.tuanResultView.isClosed) {
                this.tuanResultView.render();
            }
            app.generalManager.getCircle(this);//调用renderCircle
            this.bindEvents();

        },
        renderCircle: function (Circle) {
            var circle = Circle;
            var circleHtml = '<span data-value="no">不限</span>';
            for (var i = 0; i < circle.length; i++) {
                circleHtml += '<span data-value="' + circle[i].id + '">' + circle[i].name + '</span>';
            }
            $("#labels_circle").html(circleHtml).find("span:eq(0)").addClass("active");
        },

        bindEvents: function () {
            var that = this;
            //绑定右栏筛选按钮 设置searchRepresentationModel存储当前的筛选条件
            $('.labels').on('click', 'span', function (e) {
                var $deleget = $(e.delegateTarget);
                var $target = $(e.target);
                if ($target.hasClass('active')) {
                    return
                }
                $target.siblings().removeClass('active');
                $target.addClass('active');
                var value = $target.data('value');
                var filterId = $deleget.attr("id").split("_")[1] + 'Id';// 'location'+'Id'
                if (value == 'no') {
                    that.tuanResultView.sr.set(filterId, undefined);
                } else {
                    that.tuanResultView.sr.set(filterId, value);
                }
                that.tuanResultView.fetchAction(1);

            });
        },

        close: function () {
            if (!this.isClosed) {
                this.$el.off();
                this.$el.empty();
                this.tuanBannerView.close();
                this.isClosed = true;
                $('.labels').off();
                app.topBarView.clearNavigator();
            }
        }
    })
    ;

/*团BannerView*/
var TuanBannerView = Backbone.View.extend({
    el: "#tuanBanner",
    template: _.template(tpl.get("tuanBanner")),
    timer: null,
    total: 4,//default 4-->actually is tuans.length
    index: 0,
    initialize: function () {
        var that = this;
        this.isClosed = false;
        _.bindAll(this, "render", "afterRender", "bindEvents", "close", 'changePic', 'moveTo');
        app.viewRegistration.register(this);
        //should be no error
        app.generalManager.findTopTuan({
            success: that.render
        });
        this.render();
    },
    render: function (tuans) {
        if (!tuans || !tuans.length) {
            return;
        }
        this.total = tuans.length;
        //left img buf and right text buf
        var l_buf = [], r_buf = [];
        this.$el.html(this.template());
        tuans.forEach(function (tuan) {
            tuan = tuan._toJSON();
            l_buf.push('<a class="pics" href="#tuan/' + tuan.id + '" target="_blank"><img src="' + tuan.photoList[0].url + '" alt=""/></a> ');
            r_buf.push(
                    '<li class="tips_li"><a href="#tuan/' + tuan.id + '" target="_blank">'
                    + '<div class="c c-left">' + tuan.title + '</div>'
                    + '<div class="c c-right">'
                    + '<p class="price">￥' + tuan.groupBuyPrice + '</p>'
                    + '<p>&nbsp;&nbsp;原价：<s>&nbsp;' + tuan.course.originalPrice + '&nbsp;</s></p>'
                    + '</div>'
                    + '</a></li>'
            )
        });
        this.total = Math.min(tuans.total, 4);
        this.$el.find('.pic').html(l_buf.join(''));
        this.$el.find('.tips').html(r_buf.join(''));

        this.afterRender();
        this.bindEvents();
    },
    afterRender: function () {
        this.$el.find('.pic .pics:first').addClass('active');
        this.$el.find('.tips .tips_li:first').addClass('active');
    },
    bindEvents: function () {
        var that = this;

        this.timer = setTimeout(that.changePic, 3000);

        $(".tips .tips_li").hover(function () {
            var $tipLis = $(".tips .tips_li");
            that.index = $tipLis.index(this);
            $tipLis.removeClass("active last");
            $(this).addClass("active");
            that.moveTo(that.index);
        }, function () {
        });
    },
    changePic: function () {
        if(this.total){
            return;
        }
        this.index = (this.index + 1) % 4;
        $(".tips .tips_li").removeClass("active last");
        $(".tips .tips_li:eq(" + this.index + ")").addClass("active");
        $(".pic .pics").removeClass("active");
        this.moveTo(this.index);
        this.timer = setTimeout(this.changePic, 3000);
    },
    moveTo: function (index) {
        $(".pic .pics").removeClass("active");
        if (index == this.total) {
            $(".pic .pics:eq(" + index + ")").addClass("active last");
        } else {
            $(".pic .pics:eq(" + index + ")").addClass("active");
        }
    },

    close: function () {
        if (!this.isClosed) {
            this.$el.off();
            this.$el.empty();
            window.clearTimeout(this.timer);
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
    pageEntryNumber: 30,
    scroll: false,
    initialize: function () {
        _.bindAll(this, "bindEvents", "renderSearchResults", "clearCountdown", "renderError", "close");
        MultiPageView.prototype.initialize.call(this);
        this.sr = new TuanSearchRepresentation();
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
    afterRender: function () {
        //首先清除之前的倒计时
        this.clearCountdown();

        var self = this;
        //endTime 倒计时
        var $countDowns = $('.tuan_endTime');
        $.each($countDowns, function (k, $item) {
            self.countDowns.push(Utilities.countDown($item))
        });
        //这里是为了声明页面加载完毕 seo
        $('body').attr('pageRenderReady', '')
    },
    clearCountdown: function () {
        _.each(this.countDowns, function (item) {
            window.clearInterval(item);
        });
        this.countDowns = [];
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
            this.render();
        }
    },
    close: function () {
        if (!this.isClosed) {
            this.clearCountdown();
            this.$entryContainer.off();
            MultiPageView.prototype.close.call(this);
        }
    }
});
