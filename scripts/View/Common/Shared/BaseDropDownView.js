var baseDropDownView = Backbone.View.extend({
    // dataIdName:"",
    // selectionClass: "",
    // dataAttribute: "",
    // parentContainer: null,
    // ulId: "",

    initialize: function () {
        _.bindAll(this, 'assembleHtml', 'render', 'bindEvents', '_clearAll', 'close');
    },

    assembleHtml: function(){
        var self = this;
        this.htmlContent = '';
        if (this.selections instanceof Backbone.Collection) {
            this.selections.each(function(select){
                self.htmlContent += '<li class="' + self.selectionClass + '" data-' + self.dataIdName + '="' + select.get(self.dataAttribute) + '">' + select.toUiString() + '</li>';
            });
        } else {
            for (var i = 0; i < this.selections.length; i++ ){
                self.htmlContent += '<li class="' + self.selectionClass + '" data-' + self.dataIdName + '="' + this.selections[i].key + '">' + this.selections[i].value + '</li>';
            }
        }
        this.htmlContent = '<ul id="' + this.ulId + '" class="' + this.ulClass + '">' + this.htmlContent + '</ul>';
        return this.htmlContent;
    },

    render: function () {
        this.$parentContainer.append(this.htmlContent);
        this.$ul = $('#'+this.ulId);
    },

    bindEvents: function(){
        var self = this;
        this.$ul.children('li').on('click', function (e) {
            self.doEvent(e);
            e.stopPropagation();
            self.close();
        });
    },

    _clearAll: function () {
        this.$ul.children('li').off();
        this.$ul.remove();
    },

    close: function () {
        this._clearAll();
        Backbone.View.prototype.remove.call(this);
    }
});