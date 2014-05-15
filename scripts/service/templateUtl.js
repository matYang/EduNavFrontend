tpl = {

    // Hash of preloaded templates for the app
    templates:{},

    // Recursively pre-load all the templates for the app.
    // This implementation should be changed in a production environment. All the template files should be
    // concatenated in a single file.
    loadTemplates:function (names, callback) {

        if (names.length > 0){

            //previous async recursion to load all html files
            // var that = this,
            //     i = 0,
            //     tplCount = 0;

            // var loopingLoadTemplate = function(index){
            //     var name = names[index];

            //     $.get('templates/' + name + '.html', function (data) {
            //         that.templates[name] = data;
            //         tplCount++;
            //         //safety lock
            //         if (tplCount === names.length){
            //             callback();
            //         }
            //     });
            // };

            // for (i = 0; i < names.length; i++){
            //     loopingLoadTemplate(i);
            // }
            
            var i = 0,
                name, tplContainer,
                tplContent = null,
                self = this;

            $.ajax({
                url: 'targets/templates.min.js',
                dataType: "html",
                success: function (data) {
                    tplContainer = $('#tpl_main_invisible_placeholder_v1');
                    tplContainer.append(data);
                    for (i = 0; i < names.length; i++){
                        name = names[i];
                        tplContent = tplContainer.find('#tpl_' + name).html();
                        if (tplContent === undefined || tplContent === null){
                            alert("FATAL ERROR: Template with name: " + name + " not found, if you see this, please contact us");
                            throw new Error();
                        }
                        self.templates[name] = tplContent;
                    }
                    tplContainer.remove();
                    callback();
                },
                error: function(){
                    alert("FATAL ERROR: Failed to load template file");
                    throw new Error();
                }
            });
        }
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