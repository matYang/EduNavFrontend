/*查看完整地图弹出框*/
var MapModal = Modal.extend({
    modalEl: '#mapModal',
    template: _.template(tpl.get("mapModal")),
    static: false,
    keyboard: true,
    fadeTime: 0,
    initialize: function (msg) {
        this.addresses = msg;//保存传入的地址列表
        Modal.prototype.initialize.call(this);
    },
    show: function (opt) {
        Modal.prototype.show.call(this, _.extend(this.addresses, opt));
        //below can bind more events..
        var self = this;
        this.mapView = new MapView({mapElId: 'largeMap', type: 'large'});
        this.$modalEl.find('.addressItem:first').addClass('active');
        self.mapView.addMarker(self.addresses.addressList[0]);
        this.$modalEl.on('click', '.addressItem', function (e) {
            //render element status
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            //render map
            var index = $(this).data('index');
            var address = self.addresses.addressList[index];
            self.mapView.removeAllMarkers();
            self.mapView.addMarker(address);
        });
    },
    hide: function () {
        Modal.prototype.hide.call(this);
        //below should unbind events bound in 'show' function..
    },
    close: function () {
        Modal.prototype.close.call(this);
    }
});