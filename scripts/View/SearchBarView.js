/**
 * 搜索框(搜索机构和课程 进入对应的搜索页面)
 */
var SearchBarView = Backbone.View.extend({
    el: "#searchBarWrap",
    searchType: 'course',//当前的搜索条件
    style: '',
    template: _.template(tpl.get('searchBar')),
    initialize: function (opt) {
        _.bindAll(this, "render", "bindEvents", 'doSearch', 'clearSearch', "close");
        this.isClosed = false;
        if (opt.searchType) {
            this.searchType = opt.searchType;
        }
        if (opt.style) {
            this.style = opt.style;
        }
        var name = opt && opt.name;
        this.render(name);
        this.bindEvents();
    },
    render: function (name) {
        this.$el.append(this.template({searchType: this.searchType, style: this.style, name: name}));
    },
    /**
     * 1#课程搜索和机构搜索的切换--改变当前的搜索状态变量
     * 2#点击搜索按钮的事件（点击按钮以及按回车）
     */
    bindEvents: function () {
        var that = this;
        //1#todo 搜索类型的切换


        //2#搜索事件的触发
        //热门关键词的点击搜索事件
        $(".search_tip").on("click", ".search_span", function () {
            var name = $(this).html();
            that.doSearch(name);
        });
        //点击以及键盘事件的触发
        this.$el.on('click', '.search_btn', function () {
            that.doSearch(that.$el.find('.searchInput').val());
        });
        this.$el.on('keypress', '.search_input', function (e) {
            if (e.which === 13) {
                that.doSearch($(this).val());
            }
        })

    },

    //根据输入的字段以及搜索类型进行搜索
    doSearch: function (name) {
        if (name) {
            var sr;
            if (this.searchType === 'course') {
                sr = new CourseSearchRepresentation();
                sr.set("courseName", name);
                app.navigate("search/" + sr.toQueryString(), true);
            } else if (this.searchType === 'partner') {
                sr = new PartnerSearchRepresentation();
                sr.set('instName', name);
                app.navigate("inst/search/" + sr.toQueryString(), true);
            }

        }
    },
    //清空当前的搜索条件
    clearSearch: function () {
        this.$el.find('.searchInput').val('')
    },
    close: function () {
        if (!this.isClosed) {
            this.isClosed = true;
            this.$el.empty();
        }
    }
});