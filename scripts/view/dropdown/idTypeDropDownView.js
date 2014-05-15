var idTypeDropdownView = baseDropDownView.extend({
    dataIdName:"id",
    ulId: "idTypeDropdown",
    selectionClass: "idTypeDropdown-li",
    selections: [{"key":Constants.LicenseType.driverLisence_a,"value":"A照"},{"key":Constants.LicenseType.driverLisence_b,"value":"B照"},{"key":Constants.LicenseType.driverLisence_c,"value":"C照"}],
    initialize: function ($parentContainer, parentView) {
        _.bindAll(this, 'assembleHtml', 'render', 'doEvent', 'getName');
        this.htmlContent = this.assembleHtml();
        this.$parentContainer = $parentContainer;
        this.parentView = parentView;
        baseDropDownView.prototype.initialize.call(this);
        this.render();
        app.eventClearService.registerView(this);
    },

    assembleHtml: function(){
        return baseDropDownView.prototype.assembleHtml.call(this);
    },

    render: function () {
      
        baseDropDownView.prototype.render.call(this);
        baseDropDownView.prototype.bindEvents.call(this);
    },

    doEvent: function(e){        
        var id = parseInt($(e.target).attr('data-id'), 10);
        var name = this.getName(id);
        $("#id_type_select").val(name);
        $("#id_type").val(id);
    },
    getName: function(id) {
        for (var i = 0; i < this.selections.length; i++) {
            if (this.selections[i].key === id) return this.selections[i].value;
        }
        return null;
    }
});