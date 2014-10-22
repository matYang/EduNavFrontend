var Apply = Backbone.Model.extend({

    defaults: function () {
        return {
            'id': -1,
            /*需要填写的信息*/
//            'categoryId':undefined,
            'userName': undefined,
            'phone': undefined,
            'remark': undefined
        };
    },
    idAttribute: 'id',
    initialize: function (urlRootOverride) {
        _.bindAll(this, 'overrideUrl');

        if (typeof urlRootOverride !== 'undefined') {
            this.urlRoot = urlRootOverride;
        }
    },
    overrideUrl: function (urlRootOverride) {
        if (typeof urlRootOverride !== 'undefined') {
            this.urlRoot = urlRootOverride;
        }
    },
    isNew: function () {
        return this.id === -1;
    },
    toJSON: function () {
        var json = _.clone(this.attributes);
        json.remark = json.remark||''+'【PC】';
        return json;
    }
});