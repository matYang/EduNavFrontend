/**
 * Created by jz on 2014/8/31.
 */
//var ChooseSchoolView = Backbone.View.extend({
//    form: false,
//    modalClass: 'schoolModal',
//    template: _.template(tpl.get('mypage_chooseSchoolModal')),
//
//    initialize: function (opt) {
//        //将attr绑定到this中 native code todo 那么如果是通过prototype定义的renderLocations是否与下面一致
//        //不写bindAll的话renderLocations只会出现在_proto_中而不是对象的直接属性中
//        _.bindAll(this, 'renderLocations', 'renderSchools', 'close');
//
//        var self = this;
//        app.viewRegistration.register(this);
//        this.isClosed = false;
//        this.isShow = false;
//        this.parentView = opt.view;
//
//        this.province = [];
//        this.city = {};
//        this.keyMap = {};
//        app.generalManager.getLocations(this);
//    },
//    renderLocations: function (locations) {
//        var self = this;
//        this.province = locations;
//        _.each(this.province, function (v, index) {
//            self.keyMap[v.value] = v.children;
//        });
//        $("body").append(this.template({
//            province: self.province
//        }));
//    },
//    bindEvents: function () {
//
//        var self = this;
//        //关闭按钮
//        $('#chooseschoolclose').click(function(){
//            $('#chooseschoolAll').hide();
//            self.isShow = false;
//        });
//        //选择省后的城市的二级联动
//        $('#chooseshoolshen').change(function () {
//            //alert($(this).val());
//            var checkIndex = $(this).val();
//            var city = self.keyMap[checkIndex];
//            var buf = '<option value="请选择">- 请选择市 -</option>';
//            _.each(city, function (v, index) {
//                buf += '<option value="' + v.id + '">' + v.name + '</option>';
//            });
//            $('#chooseshoolshi').html(buf);
//        });
//        //选择城市后拉取学校数据进行显示
//        $('#chooseshoolshi').change(function () {
//            var locationId = $(this).val();
//            if (!locationId)return;
//            app.generalManager.fetchSchools(locationId, {
//                success: self.renderSchools,
//                error: self.renderSchoolsError
//            });
//        });
//        //选择某个学校
//        $('.school_list').on('click', 'li', function () {
//            var schoolId = $(this).data('value');
//            var schoolName = $(this).text();
//            self.parentView.setChoosedSchool({id: schoolId, name: schoolName});
//            self.hide();
//        });
//    },
//    renderSchools: function (schoolList) {
//        var school_buf = '';
//        _.each(schoolList, function (school) {
//            school_buf += '<li data-value=' + school.id + ' title="' + school.name + '"><span class="square"></span>' + school.name + '</li>';
//        });
//        $('#schoolclearfix').html(school_buf);
//    },
//    renderSchoolsError: function () {
//        //todo 数据拉取失败
//        $('#schoolclearfix').html('<p>数据获取失败</p>');
//    },
//
//    show: function () {
//        //this.modalView = this.notify.notify();
//        $('#chooseschoolAll').show();
//
//        this.isShow = true;
//        this.bindEvents();
//    },
//    hide: function () {
//        $('#chooseschoolAll').hide();
//        this.isShow = false;
//        //alert(this.modalView.isshow);
//        //this.modalView.hide();
//    },
//    close: function () {
//        if (!this.isClosed) {
//            //todo 关闭后没有对弹出框进行任何处理！！需要remove掉选择框
//            //this.modal.destroy();
//        }
//    }
//});