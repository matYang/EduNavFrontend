var RelatedCourseListView = Backbone.View.extend({
    el: "#relatedCourseList",//相关课程tbody
    entryTemplate: _.template(tpl.get('relatedCourseRow')),
    noItemTemplate: _.template(tpl.get('relatedCourseNoRow')),
    errorItemTemplate: _.template(tpl.get('relatedCourseErrorRow')),
    initialize: function (options) {
        var course = options.course;
        _.bindAll(this, 'render', 'close');
        app.viewRegistration.register(this);
        this.isClosed = false;
        this.courseTemplateId = course.get('courseTemplateId');
        this.courseId = course.get('id');
        this.sr = new CourseSearchRepresentation();
        this.sr.set('courseTemplateId', this.courseTemplateId);
        var self = this;
        app.generalManager.findCourse(this.sr, {
            success: self.render,
            error: function (response) {
                this.$el.html(self.errorItemTemplate);
            }
        });
    },
    //渲染相关课程列表
    render: function (courses) {
        var self = this;
        //可以显示当前课程 不可查看详情
//        courses = courses.reject(function (course) {
//            return course.get('id') === self.courseId;
//        });
        if (courses && courses.length > 0) {
            var buf = [], course;
            var len = Math.min(20, courses.length);//最多显示前xx个课程

            //需要将当期课程提至最上面,然后按照开课时间排序
            if (courses instanceof Backbone.Collection) {
                courses = courses.sortBy(function(obj){
                    if(obj.get('id') == self.courseId)return 0;
                    return obj.get('startUponArrival')?obj.get('startDate').getTime():9999999999999;
                })
            } else {
                course = _.sortBy(courses,function(obj){
                    if(obj['id'] == self.courseId)return 0;
                    return obj['startUponArrival']?obj['startDate'].getTime():9999999999999;
                });
            }

            for (var i = 0; i < len; i++) {
                if (courses instanceof Backbone.Collection) {
                    course = courses.at(i);
                } else {
                    course = courses[i];
                }
                var data = course._toSimpleJSON();
                //除了当前课程另外显示len条数据
//                if(data.id == this.courseId){
//                    len++;continue;
//                }
                data.current = (data.id == this.courseId);
                buf[i] = this.entryTemplate(data);
            }
            this.$el.html(buf.join(""));
        } else {
            this.$el.html(this.noItemTemplate);
        }
    },

    close: function () {
        if (!this.isClosed) {
            if (this.$el !== 'undefined') {
                this.$el.empty();
            }
        }
        this.isClosed = true;
        app.relatedCourseListView = null;
    }

});
