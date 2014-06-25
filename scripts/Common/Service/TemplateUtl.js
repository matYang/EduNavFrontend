tpl = {

    // Hash of preloaded templates for the app
    templates:{},

    // Recursively pre-load all the templates for the app.
    // This implementation should be changed in a production environment. All the template files should be
    // concatenated in a single file.
    loadTemplates:function (names, targetUrl, callback) {
        var tplContainer = $("#allTemplates");
        for (i = 0; i < names.length; i++){
            name = names[i];
            tplContent = tplContainer.find('#tpl_' + name).html();
            if (tplContent === undefined || tplContent === null){
                alert("FATAL ERROR: Template with name: " + name + " not found, if you see this, please contact us");
                throw new Error();
            }
            this.templates[name] = tplContent;
        }
        tplContainer.remove();
        tplContainer = null;
        callback();
    },

    // Get template by name from hash of preloaded templates
    get:function (name) {
        if (this.templates[name] === undefined || this.templates[name] === null){
            alert("FATAL ERROR: Retrived template data is not loaded");
            throw new Error();
        }
        return this.templates[name];
    }

};