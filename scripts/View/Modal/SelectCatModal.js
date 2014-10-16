/*教师详情弹出框View*/
var SelectCatModal = Modal.extend({
    modalEl: '#courseTipModal',//todo 后续需要根据modalId向template中添加id
    template: _.template(tpl.get("courseTipModal")),
    static: false,
    keyboard:true,
    //todo 可传入参数
    initialize: function (opt) {
        _.bindAll(this, 'renderCategories');
        Modal.prototype.initialize.call(this);
        this.callback = opt.callback;
    },

    show: function () {
        var that = this;

        app.generalManager.getCategories(this);//传递this,会在获取目录之后调用this.renderCategories()


        //hover移动二级目录
        $(".courseTipATopHover").hover(function () {
            $(".courseTipATopHover").removeClass("courseTipATopHoverSpec");
            $(".courseTipAContentDes").find(".cousedes").addClass("hidden");
            var thisvalue = $(this).attr("data-value");
            $(".courseTipAContentDes").find(".cousedes" + thisvalue).removeClass("hidden");
            $(this).addClass("courseTipATopHoverSpec");

        }, function () {

        });

        //点击三级目录
        $(".courseTipAContentDesUl li").on("click", function () {
            that.hide();
            var catObj = {};
            catObj.id = $(this).data('id');
            catObj.value = $(this).data('value');
            catObj.name = $(this).text();
            that.callback(catObj);
            catObj = null;
        });
    },
    renderCategories: function (categories) {

        var that = this;
        this.categories = categories.data;
        this.courseLev1 = {};
        this.courseSmallTitle = {};
        this.courseLev2 = {};
        _.each(this.categories, function (v, index) {
            that.courseLev1[index] = v.children;
        });


        this.categories = this.categories;
        Modal.prototype.show.call(this,categories);
        //below can bind more events..


        $(".courseTipATop").find("li:first").addClass("courseTipATopHoverSpec");

        //开始的时候生成的目录
        //var x = $(".courseTipATopHoverSpec").attr("data-value");
        var htmlcourse = "";
        for (var i = 0; i < that.categories.length; i++) {
            htmlcourse += '<div class="cousedes cousedes0' + i + ' hidden">';
            that.courseSmallTitle = that.courseLev1[i];
            _.each(that.courseSmallTitle, function (v, index) {
                //console.log(v.children);
                that.courseLev2[index] = v.children;
            });

            _.each(that.courseSmallTitle, function (v, index) {
                htmlcourse += '<li>';
                htmlcourse += '    <div class="courseTipAContentTop"  data-value="' + v.value + '" data-id="' + v.id + '">' + v.name + '</div>';
                htmlcourse += '    <ul class="courseTipAContentDesUl">';
                //添加三级目录
                _.each(that.courseLev2[index], function (s, index) {
                    //console.log(v.children);
                    htmlcourse += '<li data-value="' + s.value + '" data-id="' + s.id + '">' + s.name + '</li>';
                });
                htmlcourse += '    </ul>';
                htmlcourse += '</li>';
            });
            htmlcourse += '</div>';
        }
        $(".courseTipAContentDes").html(htmlcourse).find(".cousedes:first").removeClass("hidden");



    },
    hide: function () {
        Modal.prototype.hide.call(this);
        //below should unbind events bound in 'show' function..
    },
    close: function () {
        Modal.prototype.close.call(this);
    }
});