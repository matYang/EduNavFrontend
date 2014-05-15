var sideBarView =  Backbon.View.extend({
    buttons:[],
    initialize: function () {


    },
    close: function () {


    },

});

var adminSideBarView = sideBarView.extend({
    initialize: function () {
        this.buttons = [{
            name: "manage",
            buttonText: "管理",
            level: 1
        }, {
            name: "user",
            buttonText: "用户",
            level: 2,
            parent: "manage"
        }, {
            name: "message",
            buttonText: "拼车信息",
            level: 2,
            parent: "manage"
        }, {
            name: "transaction",
            buttonText: "交易",
            level: 2,
            parent: "manage"
        }];
        sideBarView.prototype.initialize.call(this);
    }, 
    close: function () {

    }

});