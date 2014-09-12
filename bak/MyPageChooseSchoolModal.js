/**
 * Created by jz on 2014/8/31.
 */
var ChooseSchoolView = Backbone.View.extend({
    form: false,
    modalClass: 'schoolModal',
    template: _.template(tpl.get('mypage_chooseschoolModal')),


    initialize: function (opt) {

        var self = this;
        app.viewRegistration.register(this);
        this.isClosed = false;
        this.parentView = opt.view;

        this.province = [
            {name: '江苏省', value: 00, child: [
                {name: '南京', value: 0000 , id: 2},
                {name: '无锡', value: 0001 , id: 29}
            ]},
            {name: '浙江省', value: 01, child: [
                {name: '杭州', value: 0100 , id: 3}
            ]},
            {name: '山东省', value: 02, child: [
                {name: '济南', value: 0200 , id: 4}
            ]},
            {name: '陕西省', value: 03, child: [
                {name: '西安', value: 0300 , id: 5}
            ]}
        ];
        this.school=[
            {name: '三江学院',locationId:2},
            {name: '东南大学',locationId:2},
            {name: '东南大学成贤学院',locationId:2},
            {name: '中国传媒大学南广学院',locationId:2},
            {name: '浙江大学',locationId:3},
            {name: '山东大学',locationId:4},
            {name: '西安交通大学',locationId:5},
            {name: '南京大学',locationId:2},
            {name: '无锡大学',locationId:2},
            {name: '南京医科大学',locationId:2},
            {name: '南京体育学院',locationId:2},
            {name: '南京农业大学',locationId:2},
            {name: '南京林业大学',locationId:2},
            {name: '南京信息工程大学',locationId:2},
            {name: '南京工业大学',locationId:2}

        ];
        this.city = {};
        this.keyMap = {};
        this.keyschool = {};
        _.each(this.province, function (v, index) {
            self.keyMap[v.value] = v.child;
        });

        this.notify = new Backbone.Notifier({
            fadeInMs: 0,
            fadeOutMs: 0,
            ms: null,
            message: self.template({
                province: self.province

            }),
            modal: true,
            closeBtn: true,
            position: 'center',
            cls: self.modalClass,
            width: '712'
        });

        this.render();
    },
    render: function () {
        var self = this;
    },
    bindEvents: function () {
        var self = this;
        $('#chooseshoolshen').change(function () {
            //alert($(this).val());
            var checkIndex = $(this).val();
            var city = self.keyMap[checkIndex];
            var buf = '<option value="请选择">- 请选择市 -</option>';
            _.each(city, function (v, index) {
                buf += '<option value="' + v.id + '">'+v.name+'</option>';
            });
            $('#chooseshoolshi').html(buf);
            $('#chooseshoolshi').change(function (){
                var getlocationid= $(this).val();
                //alert(self.school);
                var htmlschool='';
                for(var i=0;i<self.school.length;i++)
                {
                    //alert(self.school[i].id);
                    if(self.school[i].locationId == getlocationid)
                    {
                        //alert(self.school[i].name);
                        //self.keyschool.push({name:self.school[i].name});

                        htmlschool += '<li title="'+ self.school[i].name+'"><span class="square"></span>'+ self.school[i].name+'</li>';
                        //alert(htmlschool);
                    }
                }
                $('#schoolclearfix').html(htmlschool);

                /*var htmlschool='';
                _.each(self.keyschool, function (v, index) {

                    htmlschool += '<li title="'+ v.name+'"><span class="square"></span>'+ v.name+'</li>';
                    alert(htmlschool);
                });*/
            });
        });
    },

    show: function () {
        this.modalView = this.notify.notify();
        this.bindEvents();
    },
    hide: function () {
        this.modalView.destroy();
    },

    saveSuccess: function (user) {

    },
    saveError: function (data) {

    },
    buildValidatorDiv: function (valid, type, text) {

    },

    close: function () {
        if (!this.isClosed) {
            //this.modal.destroy();
            this.notifier = null;
        }
    }
});