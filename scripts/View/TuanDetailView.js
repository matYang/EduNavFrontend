var TuanDetailView = BaseFormView.extend({
    el: "#content",
    //todo need to write template named 'tpl_tuanDetail'
    template: _.template(tpl.get("tuanDetail")),
    initialize: function (opt) {
        this.isClosed = false;
        _.bindAll(this, "render", "bindEvents", "close");
        app.viewRegistration.register(this);

        var self = this;
        //这里获取课程数据信息
        app.generalManager.fetchCourse(opt.courseId, {
            success: function (course) {
                app.generalManager.fetchCategories({
                    success: function (catObj) {
                        self.course = course.clone();
                        self.courseId = course.get("id");
                        self.courseTemplateId = course.get("courseTemplateId");
                        //将categoryValue转换成一二三级的键值对
                        var catArray = Utilities.getCategoryArray(self.course.get("categoryValue"), catObj.data);
                        self.course.set("category", catArray[0]);
                        self.course.set("subCategory", catArray[1]);
                        self.course.set("subSubCategory", catArray[2]);
                        self.render();
                        self.bindEvents();
                    }
                });

            },
            error: function (data) {
                Info.displayErrorPage("content", data.message);
            }
        });

    },
    render: function () {
        document.title = '全城最低价';
        this.$el.html(this.template(this.course._toJSON()));
        this.bindEvents();
    },

    bindEvents: function () {
        var that = this;
    },

    close: function () {
        if (!this.isClosed) {
            this.$el.off();
            this.$el.empty();
            this.isClosed = true;
        }
    }
});
