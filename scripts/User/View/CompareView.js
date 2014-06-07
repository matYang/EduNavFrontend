var CompareView = Backbone.View.extend({
    el: "#content",
    highlighted: false,
    hided: false,
    courses: [],
    initialize: function (params) {
        
        app.viewRegistration.register(this);
        this.isClosed = false;
        _.bindAll(this, "render", "bindEvents", "highlight", "hideSame", "close");
        this.template = _.template(tpl.get("compareView"));
        this.entryTemplate = _.template(tpl.get("compareEntry"));
        this.$el.append(this.template(this.obj));
        if (params.courseIdList) {
            this.courseIdList = params.courseIdList; // array of items to compare
        }
        for (var i = 0; i < this.courseIdList.length; i++) {
            app.generalManager.fetchCourse(this.courseIdList[i], {
                success: this.render,
                error: this.renderError
            });
        }
        this.render();
        this.bindEvents();
    },
    render: function (course) {
        var len = this.courses.length, buf = [];
        this.courses.push(course);
        if (len === this.courseIdList.length) {
            for ( var i = 0; i < len; i++) {
                buf.push(this.entryTemplate(this.courses[i]._toJSON));
            }
        }
        $("#compareEntriesContainer").append(buf.join(""));
    },
    renderError: function () {
        $("#compareEntriesContainer").append("<div>课程信息好像载入失败了....诶嘿...</div>");
    },
    bindEvents: function () {
        var that = this;
        //highlight different
        $("#highlightBtn").on("click", function (e) {
            that.highlight();
        });
        //hide similar
        $("#hideBtn").on("click", function (e) {
            that.hideSame();
        });
    },
    highlight: function () {
        if (this.highlighted) {
            $(".highlighted").removeClass("highlight");
            this.highlighted = false;
            return;
        }
        var i, count;
        var keys = this.items[0].keys(), len = this.obj.len;
        for ( count = 0; count < keys.lenght; count++) {
            for ( i = 0; i < len; i++ ) {
                if (this.items[i].get(keys[count]) !== this.items[(i+1)%len].get(keys[count])) {
                    $("."+keys[count]).addClass("highlight");
                }
            }
        }
        this.highlighted = true;
    },
    hideSame: function () {
        this.hided = !this.hided;
        if (this.hided) {
            $(".hidden").removeClass("hidden");
            return;
        }
        var i, count;
        var keys = this.items[0].keys(), len = this.obj.len;
        for ( count = 0; count < keys.lenght; count++) {
            for ( i = 0; i < len; i++ ) {
                if (this.items[i].get(keys[count]) !== this.items[(i+1)%len].get(keys[count])) {
                    $("."+keys[count]).addClass("hidden");
                }
            }
        }
    },
    close: function () {
        if (!this.isClosed) {
            this.isClosed = true;
            $("#hideBtn").off();
            $("#highlightBtn").off();
        }
    }
});