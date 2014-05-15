//TODO: test
//Do not initialize this directly, extend it.
//workflow:
//  Initialize, append form to the active view.
//  bind validators to all fields
//  If it's a form (using <form>), then prepare iframe for post action

var baseFormView = Backbone.View.extend({
    el: "",
    form: true,
    template: "",
    fields:[],
    submitButtonId: "",
    initialize: function(params){
        _.bindAll(this, "bindEvents", "render", "unbindValidators", "submitAction", "formReady", "displayImagePreview");
        this.closed = false;
        this.el = params.el;
        this.template = params.template;
        this.fields = params.fields;
        this.formElem = params.formElem;
        this.action = params.action;
        this.callback = params.callback;
        this.successCallback = params.successCallback;
        this.submitButtonId = params.submitButtonId;
    },
    submitAction: function(){},
    render: function () {
        this.$el.empty().append(this.template);
        this.bindEvents();
    },
    bindEvents: function() {
        this.fieldNum = this.fields.length;
        var i, that = this;
        for ( i = 0; i < this.fieldNum; i++ ){

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
                }).on('blur', function (e) {
                    var val = $(this).val();
                    that.fields[Utilities.toInt($(this).data("field-index"))].testValue(val, $(e.target));
                });
            } else {
                $field.on("change", {"field":field}, function (e) {
                    var val = $(this).val();
                    e.data.field.testValue(val, $(e.target));
                });
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
        action = action + (action.indexOf('?') == -1 ? '?' : '&');

        // we create an iframe and use the callback as its name (why not).
        iframe.setAttribute('name', callback);
        iframe.style.display = 'none';

        // we add the target and edit the action of the form
        formElem.setAttribute('target', callback);
        formElem.setAttribute('action', action);

        // we add the hidden iframe after the form
        formElem.parentNode.appendChild(iframe);

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
    close: function () {
        if (!this.closed) {
            this.unbindValidators();      
            this.$el.empty();
        }
    }
    
});

var baseField = Backbone.Model.extend({
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
            $preview: null
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
        this.set("$preview", params.$preview);
    },

    buildValidatorDiv: function (valid, type, text) {
        if (valid) {
            return "<dd class='" + this.get("validClass") + "' id='"+this.get("fieldId")+"_right'></dd>";
        } else if (type === "empty") {
            return "<div class='" + this.get("errorClass") + "' id='" + this.get("fieldId") + "_wrong' title='"+this.get("name")+"不能为空'><p>" + this.get("name") + "不能为空</p></div>";
        } else if (text) {
            return "<div class='" + this.get("errorClass") + "' id='" + this.get("fieldId") + "_wrong' title='" + text + "'><p>" + text + "</p></div>";
        } else {
            return "<div class='" + this.get("errorClass") + "' id='" + this.get("fieldId") + "_wrong' title='" + this.get("errorText") + "'></p>" + this.get("errorClass") + "</p></div>";
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
        } else if (this.get("regex")) {
            if (this.regex.test(val) ) {
                div = this.buildValidatorDiv(true);
                valid = true;
            } else {
                div = this.buildValidatorDiv(false, "regex", this.errorText);
            }
        } else if (this.validatorFunction){
            var validResult = this.validatorFunction(val);
            if (validResult) {
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
        (this.validatorContainer) ? this.validatorContainer.append(div) : $input.after(div);
        return true;
    }
});