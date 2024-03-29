tpl = {

    // Hash of preloaded templates for the app
    templates:{},

    // Recursively pre-load all the templates for the app.
    // This implementation should be changed in a production environment. All the template files should be
    // concatenated in a single file.
    loadTemplates:function (names, callback) {
        var tplContainer = $("#allTemplates");
        for (i = 0; i < names.length; i++){
            name = names[i];
            if (!name) {
            	continue;
            }
            tplContent = tplContainer.find('#tpl_' + name).html();
            if (tplContent === undefined || tplContent === null){
                console.log("FATAL ERROR: Template with name: " + name + " not found, if you see this, please contact us");
                throw new Error();
            }
            this.templates[name] = tplContent;
        }
        tplContainer.remove();
        tplContainer = null;
        if (callback){
            callback();
        }
    },

    // Get template by name from hash of preloaded templates
    get:function (name) {
        if (this.templates[name] === undefined || this.templates[name] === null){

            console.log("FATAL ERROR: Retrived template " + name + " is not loaded");
            throw new Error();
        }
        return this.templates[name];
    }

};

tpl.loadTemplates(Constants.templateResources);