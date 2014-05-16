var compareView = Backbone.View.extend({
    el: "#content",
    initialize: function (params) {
        this.items = params.items; // array of items to compare
        this.isClosed = false;
        _.bindAll(this, "render", "bindEvents", "highlight", "hideSame", "close");
        this.template = _.template(tpl.get("compareView"));
        this.render();
        this.bindEvents();
    },
    render: function () {
        var len = this.items.length;
        this.obj = {
            "items":[this.items[0].toJSON()],
        }

        if (len === 1) {
            app.navigate("course/" + this.items[0].get("courseId"));
        } 
        if (len === 2) {
            this.obj.items.push(this.items[1].toJSON());
        }
        if (len === 3) {
            this.obj.items.push(this.items[2].toJSON())
        }
        this.$el.append(this.template(this.obj));

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
        var i;
        var keys = this.items[0].keys()
        for ( i = 0; i < this.obj.len; i++ ) {

        }
    },
    hideSame: function () {
    
    },
    close: function () {
        if (!this.isClosed) {
            this.isClosed = true;
            $("#hideBtn").off();
            $("#highlightBtn").off();
        }
    }
});