/*
 no matter who we are, where we are from, each of us is a part
 of something greater, more consequential, than we individualy are
 wonders can only be achieved, by hardwork and unity
 I believe we can, we must, get the project going fast
 we do big things from the days of our funding,
 big things, cause we dare to dream
 our destiny is our choice, and we share common hopes common creed
 while all of us have different backgrounds, different stories different beliefs,
 we do not give up, not this time
 */

(function () {'use strict';

    this.AdminApiResource = function () {

        /*---------------  API level constants   --------------*/
        var api_modules = {

            rootPrefix: Constants.origin + '/a-api',

            versionPrefix: '/v1.0',

            moduleResource: {
                'admin': "/admin"
            },

            moduleSufixResource: {
                'admin': {
                    admin: '/admin',
                    partner: '/partner',
                    user: '/user',
                    booking: '/booking',
                    stateChange: "/stateChange",
                    statAnalysis: "/stat",
                    routine: "/routine",
                    login: "/login",
                    logout: "/logout"
                }
            }
        };

        var api_maker = function (moduleName, actionName) {
            return api_modules.rootPrefix + api_modules.versionPrefix + api_modules.moduleResource[moduleName] + api_modules.moduleSufixResource[moduleName][actionName];
        };

        var api_assembler = function () {

            return {
                admin_login: api_maker('admin', 'login'),
                admin_logout: api_maker('admin', 'logout'),
                admin_admin: api_maker('admin', 'admin'),
                admin_partner: api_maker('admin', 'partner'),
                admin_user: api_maker('admin', 'user'),
                admin_booking: api_maker('admin', 'booking')
            };
        };

        return api_assembler();
    };

}).call(this);
