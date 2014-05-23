var CoursePostView = BaseFormView.extend({
    container:"#content",
    formElem:"#coursePostForm",
    submitButtonId: "submit",
    initialize: function () {
        var apis = new ApiResource();

        this.action = apis.course_course;
        this.fields = [
            new BaseField({
                fieldId: "title",
                fieldType: "text",
                mandatory: true,
                validatorContainer: null,
                name: "课程名", //Used for error Text
            }),
            new BaseField({
                fieldId: "startTime",
                fieldType: "date",
                mandatory: true,
                validatorContainer: null,
                name: "开始日期", //Used for error Text
            }),
            new BaseField({
                fieldId: "finishTime",
                fieldType: "date",
                mandatory: true,
                validatorContainer: null,
                name: "结束日期", //Used for error Text
            }),
            new BaseField({
                fieldId: "location",
                fieldType: "text",
                mandatory: true,
                errorClass: "wrong",
                validClass: "right",
                validatorContainer: null,
                name: "地址", //Used for error Text
            }),
            new BaseField({
                fieldId: "teacherInfo",
                fieldType: "text",
                mandatory: true,
                errorClass: "wrong",
                validClass: "right",
                validatorContainer: null,
                name: "教师信息", //Used for error Text
            }),
            new BaseField({
                fieldId: "teacherImg",
                fieldType: "file",
                mandatory: true,
                validatorContainer: null,
                name: "教师照片", //Used for error Text
                previewId: "tercherImgPreview"
            }),
            new BaseField({
                fieldId: "location",
                fieldType: "text",
                mandatory: true,
                validatorContainer: null,
                name: "地址", //Used for error Text
            }),
            new BaseField({
                fieldId: "teacherInfo",
                fieldType: "text",
                mandatory: true,
                validatorContainer: null,
                name: "教师信息", //Used for error Text
            }),
            new BaseField({
                fieldId: "teacherMaterial",
                fieldType: "text",
                mandatory: true,
                validatorContainer: null,
                name: "教材", //Used for error Text
            }),
            new BaseField({
                fieldId: "background",
                fieldType: "text",
                mandatory: true,
                validatorContainer: null,
                name: "背景", //Used for error Text
            }),
            new BaseField({
                fieldId: "price",
                fieldType: "number",
                mandatory: true,
                validatorContainer: null,
                name: "价格", //Used for error Text
            }),
            new BaseField({
                fieldId: "seatsTotal",
                fieldType: "number",
                mandatory: true,
                validatorContainer: null,
                name: "招生人数", //Used for error Text
            }),
            new BaseField({
                fieldId: "category",
                fieldType: "text",
                mandatory: true,
                validatorContainer: null,
                name: "课程分类", //Used for error Text
            }),
            new BaseField({
                fieldId: "subcategory",
                fieldType: "text",
                mandatory: true,
                validatorContainer: null,
                name: "具体分类", //Used for error Text
            }),
            new BaseField({
                fieldId: "city",
                fieldType: "text",
                mandatory: true,
                validatorContainer: null,
                name: "城市", //Used for error Text
            }),
            new BaseField({
                fieldId: "district",
                fieldType: "text",
                mandatory: true,
                validatorContainer: null,
                name: "区域", //Used for error Text
            }),
        ];
        this.template: _.template(tpl.get("coursePostView")),
        BaseFormView.prototype.initialize.call(this, params);
        this.formElem = params.formElem;
        this.action = params.action;
        this.callback = params.callback;
        this.successCallback = params.successCallback;
        this.submitButtonId = params.submitButtonId;

    },
    successCallback: function () {
        app.navigate("course/");
    }    
    close: function () {

    }
});