(function () {
    
    this.AdminApiResource = (function () {

        /*---------------  API level constants   --------------*/
        var api_modules = {

            rootPrefix: Constants.adminOrigin +  (C_ENV_VAR === 'TEST' ? '/test-a-api' : '/a-api'),

            versionPrefix: '/v1.0',

            moduleResource: {
                'admin': '/admin',
                'partner': '/partner',
                'user': '/user',
                'booking': '/booking',
                'course': '/course'
            },

            moduleSufixResource: {
                'admin': {
                    admin: '/admin',
                    login: "/login",
                    logout: "/logout",
                    findSession: '/findSession',
                    changePassword: '/changePassword'
                },
                'partner': {
                    partner: '/partner',
                    postClassPhoto: '/postClassPhoto',
                    updateClassPhoto: '/updateClassPhoto',
                    postTeacher: '/postTeacher',
                    updateTeacher: '/updateTeacher',
                },
                'user': {
                    user: '/user'
                },
                'booking': {
                    booking: '/booking'
                },
                'course': {
                    course: '/course'
                }
            }
        };

        var api_maker = function (moduleName, actionName) {
            return api_modules.rootPrefix + api_modules.versionPrefix + api_modules.moduleResource[moduleName] + api_modules.moduleSufixResource[moduleName][actionName];
        };

        var api_assembler = function () {

            return {
                admin_admin: api_maker('admin', 'admin'),
                admin_login: api_maker('admin', 'login'),
                admin_logout: api_maker('admin', 'logout'),
                admin_findSession: api_maker('admin', 'findSession'),
                admin_changePassword: api_maker('admin', 'changePassword'),
                
                admin_partner: api_maker('partner', 'partner'),
                admin_user: api_maker('user', 'user'),
                admin_booking: api_maker('booking', 'booking'),
                admin_course: api_maker('course', 'course'),

                admin_postTeacher: api_maker('partner', 'postTeacher'),
                admin_updateTeacher: api_maker('partner', 'updateTeacher'),
                admin_postPhoto: api_maker('partner', 'postClassPhoto'),
                admin_updatePhoto: api_maker('partner', 'updateClassPhoto'),
            };
        };

        return api_assembler();
    })();

}).call(this);
