/*教师详情弹出框View*/
var SchoolModal = Modal.extend({
    modalEl: '#schoolModal',//todo 后续需要根据modalId向template中添加id
    template: _.template(tpl.get("mypage_schoolModal")),
    static: false,
    keyboard:true,
    //todo 可传入参数
    initialize: function (opt) {
        _.bindAll(this, 'renderLocations','renderSchools');
        Modal.prototype.initialize.call(this);
        this.parentView = opt.view;
        this.keyMap = {};
        this.provice = {};
    },

    show: function () {
        var that = this;

        app.generalManager.getLocations(this);//传递this,会在获取目录之后调用this.renderCategories()



    },
    renderLocations: function (locations) {
        var that = this;
        that.provice.data = locations;
        Modal.prototype.show.call(this,that.provice);


        _.each(locations, function (v, index) {
            that.keyMap[v.value] = v.children;
        });

        //选择省后的城市的二级联动
        $('#chooseshoolshen').change(function () {
            //alert($(this).val());
            var checkIndex = $(this).val();
            var city = that.keyMap[checkIndex];
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
            app.generalManager.fetchSchools(locationId, {
                success: that.renderSchools,
                error: that.renderSchoolsError
            });
        });

        //选择某个学校
        $('.school_list').on('click', 'li', function () {
            var schoolId = $(this).data('value');
            var schoolName = $(this).text();
            that.parentView.setChoosedSchool({id: schoolId, name: schoolName});
            that.hide();
        });
    },
    renderSchools: function (schoolList) {

        var that = this;


        //below can bind more events..


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
    hide: function () {
        Modal.prototype.hide.call(this);
        //below should unbind events bound in 'show' function..
    },
    close: function () {
        Modal.prototype.close.call(this);
    }
});