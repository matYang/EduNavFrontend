/**
 * Created by jz on 2014/8/31.
 */
var ChooseSchoolView = Backbone.View.extend({
    form: false,
    modalClass: 'schoolModal',
    template: _.template(tpl.get('mypage_chooseSchoolModal')),

    initialize: function (opt) {
        //将attr绑定到this中 native code
        _.bindAll(this, 'renderLocations', 'renderSchools', 'close');

        var self = this;
        app.viewRegistration.register(this);
        this.isClosed = false;
        this.parentView = opt.view;

        this.province = [];
        this.city = {};
        this.keyMap = {};
        app.generalManager.getLocations(this);
    },
    renderLocations: function (locations) {
        var self = this;
        this.province = locations;
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
    },
    bindEvents: function () {
        var self = this;
        //选择省后的城市的二级联动
        $('#chooseshoolshen').change(function () {
            //alert($(this).val());
            var checkIndex = $(this).val();
            var city = self.keyMap[checkIndex];
            var buf = '<option value="请选择">- 请选择市 -</option>';
            _.each(city, function (v, index) {
                buf += '<option value="' + v.id + '">' + v.name + '</option>';
            });
            $('#chooseshoolshi').html(buf);
        });
        //选择城市后拉取学校数据进行显示
        $('#chooseshoolshi').change(function () {
            var locationId = $(this).val();
            if (!locationId)return;
            app.generalManager.fetchSchools({
                success: self.renderSchools,
                error: self.renderSchoolsError
            });
        });
        //选择某个学校
        $('.school_list').on('click', 'li', function () {
            var schoolId = $(this).data('value');
            var schoolName = $(this).text();
            self.parentView.setChoosedSchool({id: schoolId, name: schoolName});
            self.hide();
        });
    },
    renderSchools: function (schoolList) {
        var school_buf = '';
        _.each(schoolList, function (school) {
            school_buf += '<li data-value=' + school.id + ' title="' + school.name + '"><span class="square"></span>' + school.name + '</li>';
        });
        $('#schoolclearfix').html(school_buf);
    },
    renderSchoolsError: function () {
        //todo 数据拉取失败
        $('#schoolclearfix').html('<p>数据获取失败</p>');
    },

    show: function () {
        this.modalView = this.notify.notify();
        this.bindEvents();
    },
    hide: function () {
        this.modalView.destroy();
    },

    close: function () {
        if (!this.isClosed) {
            //this.modal.destroy();
            this.notifier = null;
        }
    }
});