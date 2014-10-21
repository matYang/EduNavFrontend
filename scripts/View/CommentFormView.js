var CommentFormView = Backbone.View.extend({
    el: "#commentForm",
    template: _.template(tpl.get("commentForm")),
    initialize: function (opt) {
        this.parentView = opt.parentView;
        this.courseTemplateId = opt.courseTemplateId;
        this.isClosed = false;
        this.showState = opt.showState;
        _.bindAll(this, "render", "bindEvents", "close");
        app.viewRegistration.register(this);
        var self = this;
        this.render();
    },

    render: function () {
        var that = this;
        this.comment = new Comment();
        this.comment.set('courseTemplateId', this.courseTemplateId);
        //todo 是否登陆
        if(this.showState == "true"){
            this.$el.html(this.template());
        }
        this.bindEvents();
    },


    bindEvents: function () {
        var that = this;
        this.$el.off();
        //点击设置星级
        $("#star_environment").raty({
            onClick: function (score) {
                that.comment.set('conditionRating', score);
            }
        });
        $("#star_teacher").raty({
            onClick: function (score) {
                that.comment.set('attitudeRating', score);
            }
        });
        $("#star_service").raty({
            onClick: function (score) {
                that.comment.set('satisfactionRating', score);
            }
        });
        /*添加评论*/
        this.$el.on("click", '#btn_AddComment', function () {
            if (!app.sessionManager.hasSession()) {
                that.parentView.parentView.showLoginModal();
                return;
            }
            //var txtcomment = $("#tuanDetail .txt textarea").val();
            var txtcomment = $(this).parent().find(".txt textarea").val();
            that.comment.set('content', txtcomment);

            app.userManager.addComment(that.comment, {
                success: function (model) {
                    //重置表单
                    that.render();

                    //方案1 直接追加内容 忽略。。问题太多
                    //model.set('user', app.sessionManager.sessionModel);
//                    var $comment = $('#satr_user_' + model.get('id'));
//                    var starCount = $comment.data('value');
//                    $comment.attr('stared', '');
//                    $comment.raty({
//                        readOnly: true,
//                        start: starCount
//                    });

                    //设置评论内容的分页信息 +1
                    //如果其他人也提交了评论 还是会出现重复的评论 这里还是使用方案2了
//                    that.parentView.sr.set('start', that.parentView.sr.get('start') + 1);
                    //方案2 重新拉取第一页评论
                    //清空评论主体内容并重置start为0
                    $('#commentsContainer').html('');
                    that.parentView.sr.set('start', 0);
                    that.parentView.fetchComments();
                },
                error: function (data) {
                    Info.alert(data.message || '提交失败，请稍后再试~');
                }
            })
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