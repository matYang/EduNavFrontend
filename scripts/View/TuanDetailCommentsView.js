var TuanDetailCommentsView = Backbone.View.extend({
    el: "#tuanDetailCommentsContainer",
    template: _.template(tpl.get("tuanDetailCommentsContainer")),
    entryContainer: '#commentsContainer',
    commentEntryTemplate: _.template(tpl.get("commentEntry")),
    initialize: function (opt) {
        this.courseId = opt.courseId;
        //评论的搜索条件 初始化courseId
        this.sr = new CommentSearchRepresentation();
        this.sr.set('courseId', opt.courseId);
        this.sr.set('start', 0);
        this.sr.set('count', 5);
        this.isClosed = false;
        _.bindAll(this, "render", "afterRender", "bindEvents", "close");
        app.viewRegistration.register(this);
        var self = this;
        //这里获取课程数据信息
        app.generalManager.findComments(this.sr, {
            success: function (comments) {
                self.comments = comments;
                self.render();
                self.bindEvents();
            },
            error: function (data) {
                Info.displayErrorPage("content", data.message);
            }
        });
    },
    render: function () {
        this.$el.html(this.template);
        var that = this;
        var commentsBuf = [];
        this.comments.each(function (comment) {
            commentsBuf.push(that.commentEntryTemplate(comment._toJSON()))
        });
        $(this.entryContainer).html(commentsBuf.join(''));
        this.afterRender();
        this.bindEvents();
    },

    afterRender: function () {
        /*评论的星级*/
        var $comments = $('.commentStars');
        _.each($comments, function (comment) {
            var $comment = $(comment);
            var starCount = $comment.data('value');
            $comment.raty({
                readOnly: true,
                start: starCount
            });
        });
    },

    bindEvents: function () {
        var that = this;


        /*更多评论*/
        /*$("#tuanDetail .more").on("click",function(){
         var commentid=$(this).attr("commentid");

         var commenthtml='';
         commenthtml+='    <li>';
         commenthtml+='        <div>';
         commenthtml+='            <div id="satr_user'+commentid+'" class="satr_user"></div>';
         commenthtml+='            <span>ppppppp0224</span>';
         commenthtml+='        </div>';
         commenthtml+='        <label>棒！</label>';
         commenthtml+='    </li>';
         $("#more_comment").append(commenthtml);
         $("#satr_user"+commentid).raty({
         readOnly:  true,
         start: 4
         });
         commentid++;
         $(this).attr("commentid",commentid);
         $("#tuanDetail .more").stop();
         });*/

        /*添加评论*/
        $("#tuanDetail .btnadd").on("click", function () {
            var txtcomment = $("#tuanDetail .txt textarea").val();
            var txtenvironment = $("#star_environment").attr("starscore");
            var txtteacher = $("#star_teacher").attr("starscore");
            var txtservice = $("#star_service").attr("starscore");
            //todo Data interaction
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