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
//                Info.displayErrorPage("content", response.responseJSON);
            }
        });
    },
    //渲染相关课程列表
    render: function (courses) {
        var self = this;
        courses = _.reject(courses, function(course){ return course.get('id') == self.courseId; });
        if (courses && courses.length > 0) {
            var buf=[],course;
            var len = 5;//只显示前5个课程
            for (var i = 0; i < len; i++) {
                if (courses instanceof Backbone.Collection) {
                    course = courses.at(i);
                } else {
                    course = courses[i];
                }
                var data = course._toSimpleJSON();
//                if(data.id == this.courseId){
//                    len++;continue;
//                }
                buf[i] = this.entryTemplate(data);
            }
            this.$el.html(buf.join(""));
        }else{
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
