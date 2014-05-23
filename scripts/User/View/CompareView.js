var compareView = Backbone.View.extend({
    el: "#content",
    highlighted: false,
    hided: false,
    initialize: function (params) {
        this.items = params.items; // array of items to compare
        app.viewRegistration.register("compare", this, true);
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
        this.highlighted = !this.highlighted;
        if (this.highlighted) {
            $(".highlighted").removeClass("highlight");
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