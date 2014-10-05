var CommentFormView = Backbone.View.extend({
    el: "#commentForm",
    template: _.template(tpl.get("commentForm")),
    initialize: function (opt) {
        this.courseTemplateId = opt.courseTemplateId;
        this.commentEntryTemplate = opt.commentEntryTemplate;
        this.isClosed = false;
        _.bindAll(this, "render", "bindEvents", "close");
        app.viewRegistration.register(this);
        var self = this;

        this.render();

    },

    render: function () {
        var that = this;
        this.comment = new Comment();
        this.comment.set('courseTemplateId',this.courseTemplateId);
        //todo 是否登陆
        this.$el.html(this.template());
        this.bindEvents();
    },


    bindEvents: function () {
        var that = this;
        this.$el.off();
        //点击设置星级
        $("#star_environment").raty({
            onClick: function (score) {
                that.comment.set('conditionRating',score);
            }
        });
        $("#star_teacher").raty({
            onClick: function (score) {
                that.comment.set('attitudeRating',score);
            }
        });
        $("#star_service").raty({
            onClick: function (score) {
                that.comment.set('satisfactionRating',score);
            }
        });
        /*添加评论*/
        this.$el.on("click",'#btn_AddComment', function () {
            var txtcomment = $("#tuanDetail .txt textarea").val();
            that.comment.set('content',txtcomment);

            app.userManager.addComment(that.comment,{
                success:function(model){
                    $('#commentsContainer').prepend(that.commentEntryTemplate(model._toJSON()));
                    var $comment = $('#satr_user_'+model.get('id'));
                    var starCount = $comment.data('value');
                    $comment.attr('stared', '');
                    $comment.raty({
                        readOnly: true,
                        start: starCount
                    });
                    //重置
                    that.render();
                },
                error:function(data){
                    Info.alert('提交失败，请稍后再试~');
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