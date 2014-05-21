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

    this.ApiResource = function () {

        /*---------------  API level constants   --------------*/
        var api_modules = {

            rootPrefix: Constants.origin + '/api',
            partnerRootPrefix: Constants.origin + '/p-api',
            versionPrefix: '/v1.0',

            moduleResource: {
                'course': '/course',
                'users': '/users',
                'booking': '/booking',
                'general': '/general',
            },

            moduleSufixResource: {
                'general': {
                    location:"location",
                    category:"category",
                    partner:"partner",
                    course:"course"
                },
                'course': {
                    course: '/course'
                },

                'user': {
                    findSession: '/findSession',
                    user: '/user',
                    img: '/img',
                    email: '/email',
                    changePassword: '/changePassword',
                    changeCell: '/changeCell',
                    info: "info",

                    login: '/login',
                    logout: '/logout',
                    forgetPassword: '/forgetPassword',
                    recoverPassword: '/recoverPassword',
                },

                'partner': {
                    login: '/login',
                    logout: '/logout',
                    forgetPassword: '/forgetPassword',
                    recoverPassword: '/recoverPassword',
                    course: '/course'
                },

                'booking': {
                    booking: '/booking',
                }
            }
        };

        var api_maker = function (prefix, moduleName, actionName) {
            return api_modules.rootPrefix + api_modules.versionPrefix + api_modules.moduleResource[moduleName] + api_modules.moduleSufixResource[moduleName][actionName];
        };

        var api_assembler = function () {

            return {
                general_location: api_maker(api_modules.rootPrefix, "general", "location"),
                general_category: api_maker(api_modules.rootPrefix, "general", "category"),
                general_partner: api_maker(api_modules.rootPrefix, "general", "partner"),
                general_course: api_maker(api_modules.rootPrefix, "general", "course"),

                course_course: api_maker(api_modules.rootPrefix, "course", "course"),
                
                user_findSession: api_maker(api_modules.rootPrefix, 'user', 'findSession'), //GET added to session manaegr
                user_user: api_maker(api_modules.rootPrefix, 'user', 'user'), //GET and POST added to user manager
                user_login: api_maker(api_modules.rootPrefix, 'user', 'login'), //GET dded to session manager
                user_logout: api_maker(api_modules.rootPrefix, 'user', 'logout'), //GET added to session manager
                user_img: api_maker(api_modules.rootPrefix, 'user', 'img'), //
                user_email: api_maker(api_modules.rootPrefix, 'user', 'email'),
                user_changePassword: api_maker(api_modules.rootPrefix, 'user', 'changePassword'),
                user_changeCell: api_maker(api_modules.rootPrefix, 'user', 'changeCell'),
                user_info: api_maker(api_modules.rootPrefix, 'user', 'info'),
                user_forgetPassword: api_maker(api_modules.rootPrefix, 'user', 'forgetPassword'),
                user_recoverPassword: api_maker(api_modules.rootPrefix, 'user', 'recoverPassword'),

                partner_login: api_maker(api_modules.partnerRootPrefix, 'partner', 'partner'), //GET dded to session manager
                partner_logout: api_maker(api_modules.partnerRootPrefix, 'partner', 'partner'), //GET added to session manager
                partner_forgetPassword: api_maker(api_modules.partnerRootPrefix, 'partner', 'forgetPassword'),
                partner_recoverPassword: api_maker(api_modules.partnerRootPrefix, 'partner', 'recoverPassword'),
                partner_course: api_maker(api_modules.partnerRootPrefix, 'course', 'course'), //GET dded to session manager

                booking_booking: api_maker(api_modules.rootPrefix, 'booking', 'booking')
            };
        };

        return api_assembler();
    };

}).call(this);
