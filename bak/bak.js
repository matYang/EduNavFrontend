//课程详情页面中右侧免费试听的事件绑定
$("#trialButton").on("click", function (e) {
    e.preventDefault();
    var $this = $(this);
    //处于关闭状态
    if ($(e.target).hasClass("close")) {
        $this.find("img").attr("src", "style/images/up_mianfei.png").css("margin-left", 200);
        $this.addClass("shrinked");
        $(e.target).addClass("hidden");
    }
    //点击图片（收缩和展开状态） 收缩状态展开 展开状态进入客服系统
    else if (e.target.tagName === "IMG") {
        if ($this.hasClass("shrinked")) {
            $this.find("img").attr("src", "style/images/shiting.gif").css("margin-left", 0);
            $this.removeClass("shrinked");
            $this.find(".close").removeClass("hidden");
        } else {
            //打开客服系统
            doyoo.util.openChat('g=82548');
//                    app.navigate("booking/c" + app.courseDetailView.courseId, true);
        }
    }
}).on("mouseover", "img", function (e) {//收缩状态下图片的hover状态改变
    if ($(e.delegateTarget).hasClass("shrinked")) {
        $(e.target).attr("src", "style/images/up_shiting.png");
    }
}).on("mouseout", "img", function (e) {
    if ($(e.delegateTarget).hasClass("shrinked")) {
        $(e.target).attr("src", "style/images/up_mianfei.png");
    }
});