(function () {

    //used for top-level view management upon page switches, it only deals with the sudo divs that are defined in
    // index.html
    this.ViewRegistrationService = function () {

        var viewRegistrationTable = {};
        return {
            register: function (view) {
                var registrationTarget, i = 0;
                    //check if the any anti-requested views has been registered, if so, attemp to close it
                if (!view.el || !view.el.tagName) {

                    return;
                }
                if (viewRegistrationTable[view.el.id]) { //Backbone会在view建立的时候将el转换成DOM object,
                    //check if the view is valid with a close function, if so, close it, then deletes the
                    // registration record
                    if ( typeof viewRegistrationTable[view.el.id].close === 'function') {
                        viewRegistrationTable[view.el.id].close();
                        viewRegistrationTable[view.el.id].stopListening();
                        delete viewRegistrationTable[view.el.id].el;
                        //remove the registration entry, compeletely unregister it
                        //delete viewRegistrationTable[view.el.id];
                    } else {
                        alert("fatal error: viewRegistrationService:: register:: alert, member does not contain close function");
                        return;
                    }
                }
                //registers the new view, if the view is already registered, do not register new view (unless the
                viewRegistrationTable[view.el.id] = view;
            }
        };
    };

}).call(this);

// 该服务用于保证在一个DOM里只存在最多一个view
// 所有view需要在渲染前调用该服务的register方法并传入改view的对象, 来强制关闭同一DOM里尚未关闭的view, 
// 并保证这个新的view会在页面切换时被强制关闭。