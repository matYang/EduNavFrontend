var TuanDetailCommentsView = Backbone.View.extend({
    el: "#tuanDetailCommentsContainer",
    template: _.template(tpl.get("tuanDetailCommentsContainer")),
    entryContainer: '#commentsContainer',
    pageContainer: '#commentsPagination',
    commentEntryTemplate: _.template(tpl.get("commentEntry")),
    initialize: function (opt) {
        this.courseId = opt.courseId;
        this.comment = new Comment();
        //评论的搜索条件 初始化courseId
        this.sr = new CommentSearchRepresentation();
        //其实团购里面的courseId以及course都是课程模板相关内容
        this.sr.set('courseTemplateId', opt.courseId);
        this.sr.set('start', 0);
        this.sr.set('count', 5);
        this.isClosed = false;
        _.bindAll(this, "render", "afterRender", "setPagination", "bindEvents", "close");
        app.viewRegistration.register(this);
        var self = this;
        this.$el.html(this.template);
        this.commentFormView = new CommentFormView({
            //其实这里的courseId就是templateId
            courseTemplateId:this.courseId,
            commentEntryTemplate:this.commentEntryTemplate
        });
        this.bindEvents();
        this.fetchComments();
    },
    fetchComments: function () {
        var that = this;
        $(that.pageContainer).html('<div class="loading"></div>');
        //这里获取课程数据信息
        app.generalManager.findComments(this.sr, {
            success: that.render,
            error: function (data) {
                Info.displayErrorPage("content", data.message);
            }
        });
    },
    render: function (comments) {
        var that = this;
        var commentsBuf = [];
        comments.each(function (comment) {
            commentsBuf.push(that.commentEntryTemplate(comment._toJSON()))
        });
        $(this.entryContainer).append(commentsBuf.join(''));
        this.setPagination(comments.total);
        this.afterRender();
    },

    afterRender: function () {
        /*评论的星级*/
        var $comments = $('.commentStars:not([stared])');
        _.each($comments, function (comment) {
            var $comment = $(comment);
            var starCount = $comment.data('value');
            $comment.attr('stared', '');
            $comment.raty({
                readOnly: true,
                start: starCount
            });
        });
    },
    //设置分页
    setPagination: function (total) {
        var hasMore = this.sr.get('start') + this.sr.get('count') < total;
        if (hasMore) {
            $(this.pageContainer).html('<a class="moreComments">更多精彩评价</a>')
        } else {
            $(this.pageContainer).html('没有更多评价了~')
        }
    },

    bindEvents: function () {
        var that = this;

        /*更多评论*/
        this.$el.on("click", '.moreComments', function () {
            that.sr.set('start', that.sr.get('start') + that.sr.get('count'));
            that.fetchComments();
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