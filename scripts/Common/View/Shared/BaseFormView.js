//This view has the following feature:
//Configurable fields, automatic one-way binding between model and input fields.
//When fields are set, model's value is automatically updated when the value has changed
//Validation is done everytime a field is blurred or submit button is clicked.
//For multi-forms, this view also automatically prepares an iframe target that prevents reloading after forms submission.
//In HTML5 supported browsers, images can be previewed if $preview is set in the field configuration

//limitations: Validation messages are in fixed structure. If it needs to be changed, either override the buildValidatorDiv function, or giff up.
//This field value will not update automatically if the model is updated by http requests.


//Do not initialize this directly, extend it.
//workflow:
//  Initialize, append form to the active view.
//  bind validators to all fields
//  If it's a form (using <form>), then prepare iframe for post action



var BaseFormView = Backbone.View.extend({
    el: "",
    form: true,
    template: "",
    fields:[],
    submitButtonId: "",
    model: undefined,
    create: true,
    initialize: function(params){
        _.bindAll(this, "bindEvents", "render", "unbindValidators", "submitAction", "formReady", "displayImagePreview");
        this.closed = false;
        params = params || {};
        this.el = params.el || this.el;
        this.template = params.template || this.template;
        this.fields = params.fields || this.fields;
        this.formElem = params.formElem || this.formElem;
        this.action = params.action || this.action;
        this.callback = params.callback || this.callback;
        this.successCallback = params.successCallback || this.successCallback;
        this.submitButtonId = params.submitButtonId || this.submitButtonId;
    },
    submitAction: function(){},
    render: function () {
        this.bindEvents();
    },
    bindEvents: function() {
        this.isBB = this.model instanceof Backbone.Model;
        this.fieldNum = this.fields.length;
        var i, that = this;
        for ( i = 0; i < this.fieldNum; i++ ) {
            var field = this.fields[i], $field = $("#"+ field.get("fieldId")), fieldType = field.get("type");
            if (fieldType === "file") {
                var preview = $("#"+field.get("previewId"));
                $field.on("change", preview, function (e) {
                    that.displayImagePreview(e);
                }).on("keydown", function (e) {
                    e.preventDefault()
                });
            } else if (fieldType !== "select") {
                $field.attr("data-field-index", i);
                $field.on("keydown", {"fileType": fieldType}, function (e) {
                    if (e.data.fieldType === "number" && !(e.which >= 48 && e.which <= 57) && !(e.which >= 96 && e.which <= 105) && e.which > 13) {
                        e.preventDefault();
                    }
                }).on('blur', {"field": field}, function (e) {
                    var val = $(this).val();
                    e.data.field.testValue(val, $(e.target));
                });
            } else {
                $field.on("change", {"field":field}, function (e) {
                    var val = $(this).val();
                    e.data.field.testValue(val, $(e.target));
                });
            }
            if (field.get("modelAttr") && this.model) {
                this.bindFieldToModel(field);
            }
        }
        $("#"+this.submitButtonId).on("click", function (e) {
            var valid = true;
            for ( i = 0; i < that.fieldNum; i++ ){
                var field = that.fields[i], $field = $("#"+  field.get("fieldId"));
                valid = valid && field.testValue($field.val(), $field);
            }
            if (valid) {
                that.submitAction();
            } else {
                e.preventDefault();
            }
        });
        if (this.form) {
            this.formReady(document.getElementById(this.formElem), this.action, this.callback);
        }
    },
    formReady: function (formElem, action, callback) {

        var iframe = document.createElement('iframe'), that = this;
        action = action;

        // we create an iframe and use the callback as its name (why not).
        iframe.setAttribute('name', callback);
        iframe.style.display = 'none';

        // we add the target and edit the action of the form
        formElem.setAttribute('target', callback);
        formElem.setAttribute('action', action);

        // we add the hidden iframe after the form
        formElem.parentNode.appendChild(iframe);
        if (this.create) {
            formElem.setAttribute('method', 'POST');
        } else {
            formElem.setAttribute('method', 'PUT');
        }
        formElem.setAttribute("ENCTYPE", "multipart/form-data");
        $(iframe).one("load", function () {
            app.sessionManager.fetchSession(true, {
                "success": function () {
                    that.successCallback();
                },
                "error":function(response) {
                    location.reload();
                }
            });
        });
    },
    displayImagePreview: function (evt) {
        if (!(window.File && window.FileReader && window.FileList)) {
            return;
        }
        var files = evt.target.files; // FileList object

        // Loop through the FileList and render image files as thumbnails.
        for (var i = 0, f; f = files[i]; i++) {

          // Only process image files.
            if (!f.type.match('image.*')) {
                continue;
            }

            var reader = new FileReader();

            // Closure to capture the file information.
            reader.onload = (function(theFile) {
            return function(e) {
              // Render thumbnail.
                if (evt.data) {
                    evt.data.attr("src", e.target.result).attr("title", escape(theFile.name));
                }
            };
            })(f);

            // Read in the image file as a data URL.
            reader.readAsDataURL(f);
        }
    },
    unbindValidators: function () {
        $("#"+this.submitButtonId).off();
        for ( i = 0; i < this.fieldNum; i++ ){
            $("#"+ this.fields[i].get("fieldId")).off();
        }
    },
    bindFieldToModel: function (field) {
        var that = this, value = this.isBB ? this.model.get(field.get("modelAttr")) : this.model[field.get("modelAttr")];
            var $field = $("#"+field.get("fieldId")).on("change", {"field":field }, function (e) {
            if (that.isBB) {
                that.model.set(e.data.field.get("modelAttr"), $(this).val());
            } else {
                that.model[e.data.field.get("modelAttr")] =$(this).val();
            }
        });
        if (value) {
            if (value instanceof Date) {
                $field.val(Utilities.getDateString(value));
            } else {
                $field.val(value);
            }
        }
        if (value === undefined) {
            if (that.isBB) {
                that.model.set(field.get("modelAttr"), "");
            } else {
                that.model[field.get("modelAttr")] = "";
            }
        }
    },
    close: function () {
        if (!this.closed) {
            this.unbindValidators();      
            this.$el.empty();
        }
    }
    
});

var BaseField = Backbone.Model.extend({
    defaults: function () {
        return {
            fieldId: "",
            fieldType: "",
            mandatory: false,
            regex: null,
            validatorFunction: null,    //return in the following format {"valid":true, "text":""}
            errorText: "",
            errorClass: "wrong",
            validClass: "right",
            validatorContainer: null,
            name: "", //Used for error Text
            modelAttr: "",              //2-way Binding
            previewId: null              //container of image preview
        }
    },
    idAttribute: "fieldId",

    initialize: function (params) {
        _.bindAll(this, 'buildValidatorDiv', 'removeValidatorDiv', 'testValue');
        this.set("fieldId", params.fieldId);
        this.set("fieldType", params.fieldType);
        this.set("mandatory", params.mandatory || this.get("mandatory"));
        this.set("regex", params.regex);
        this.set("errorText", params.errorText);
        this.set("errorClass", params.errorClass || this.get("errorClass"));
        this.set("validClass", params.validClass || this.get("validClass"));
        this.set("validatorContainer", params.validatorContainer);
        this.set("name", params.name);
        this.set("previewId", params.previewId);
        this.validatorFunction = params.validatorFunction || this.validatorFunction;
        this.buildValidatorDiv = params.buildValidatorDiv || this.buildValidatorDiv;
    },

    buildValidatorDiv: function (valid, type, text) {
        if (valid) {
            return "<dd class='" + this.get("validClass") + "' id='"+this.get("fieldId")+"_right'></dd>";
        } else if (type === "empty") {
            return "<dd class='" + this.get("errorClass") + "' id='" + this.get("fieldId") + "_wrong' title='"+this.get("name")+"不能为空'><p>" + this.get("name") + "不能为空</p></dd>";
        } else if (type === "dom") {

        } else if (text) {
            return "<dd class='" + this.get("errorClass") + "' id='" + this.get("fieldId") + "_wrong' title='" + text + "'><p>" + text + "</p></dd>";
        } else {
            return "<dd class='" + this.get("errorClass") + "' id='" + this.get("fieldId") + "_wrong' title='" + this.get("errorText") + "'></p>" + this.get("errorClass") + "</p></dd>";
        }
    }, 
    removeValidatorDiv: function () {
        $("#"+this.get("fieldId")+"_right").remove();
        $("#"+this.get("fieldId")+"_wrong").remove();
    },
    testValue: function(val, $input) {
        var div, valid;
        var valid = false;
        if (this.get("mandatory") && !val ) {
            div = this.buildValidatorDiv(false, "empty");
        } else if (!this.get("mandatory") && !val) {
            div = this.buildValidatorDiv(true);
            valid = true;
        } else if (this.get("regex")) {
            if (this.get("regex").test(val) ) {
                div = this.buildValidatorDiv(true);
                valid = true;
            } else {
                div = this.buildValidatorDiv(false, "regex", this.errorText);
            }
        } else if (this.validatorFunction){
            var validResult = this.validatorFunction(val);
            if (validResult.valid) {
                div = this.buildValidatorDiv(true);
                valid = true;
            } else {
                div = this.buildValidatorDiv(false, "other", validResult.text);
            }
        } else {
            div = this.buildValidatorDiv(true);
            valid = true;
        }
        this.removeValidatorDiv();
        this.get("validatorContainer") ? this.get("validatorContainer").append(div) : $input.after(div);
        return valid;
    }
});