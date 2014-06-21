(function () {
    'use strict';

    this.ApiResource = function () {

        /*---------------  API level constants   --------------*/
        var api_modules = {

            rootPrefix: Constants.origin + ':8015/api',
            partnerRootPrefix: Constants.origin + '/p-api',
            versionPrefix: '/v1.0',

            moduleResource: {
                'partner': '/partner',
                'user': '/user',
                'booking': '/booking',
                'general': '/general',
                'coupon': '/coupon',
            },

            moduleSufixResource: {
                'general': {
                    location:"/location",
                    category:"/category",
                    partner:"/partner",
                    course:"/course",
                    courseByIdList:"/courseByIdList"
                },


                'user': {
                    findSession: '/findSession',
                    smsVerification: '/smsVerification',
                    user: '/user',
                    changePassword: '/changePassword',
                    info: "/info",
                    changeCell: '/changeCell',
                    login: '/login',
                    logout: '/logout',
                    forgetPassword: '/forgetPassword',
                },

                'partner': {
                    findSession: '/findSession',
                    login: '/login',
                    logout: '/logout',
                    partner: '/partner',
                    forgetPassword: '/forgetPassword',
                    changePassword: '/changePassword',
                },

                'booking': {
                    booking: '/booking',
                },
                'course': {
                    course: '/course'
                },
                'coupon': {
                    coupon: "/coupon"
                }
            }
        };

        var api_maker = function (prefix, moduleName, actionName) {
            return prefix + api_modules.versionPrefix + api_modules.moduleResource[moduleName] + api_modules.moduleSufixResource[moduleName][actionName];
        };

        var api_assembler = function () {

            return {
                general_location: api_maker(api_modules.rootPrefix, "general", "location"),
                general_category: api_maker(api_modules.rootPrefix, "general", "category"),
                general_partner: api_maker(api_modules.rootPrefix, "general", "partner"),
                general_course: api_maker(api_modules.rootPrefix, "general", "course"),
                general_courseByIdList: api_maker(api_modules.rootPrefix, "general", "courseByIdList"), 
                
                user_findSession: api_maker(api_modules.rootPrefix, 'user', 'findSession'), //GET added to session manaegr
                user_smsVerification: api_maker(api_modules.rootPrefix, 'user', 'smsVerification'),
                user_user: api_maker(api_modules.rootPrefix, 'user', 'user'), //GET and POST added to user manager
                user_changePassword: api_maker(api_modules.rootPrefix, 'user', 'changePassword'),
                user_info: api_maker(api_modules.rootPrefix, 'user', 'info'),
                user_changeCell: api_maker(api_modules.rootPrefix, 'user', 'changeCell'),
                user_login: api_maker(api_modules.rootPrefix, 'user', 'login'), //GET dded to session manager
                user_logout: api_maker(api_modules.rootPrefix, 'user', 'logout'), //GET added to session manager
                user_forgetPassword: api_maker(api_modules.rootPrefix, 'user', 'forgetPassword'),
                user_booking: api_maker(api_modules.rootPrefix, 'booking', 'booking'),
                user_coupon: api_maker(api_modules.rootPrefix, 'coupon', 'coupon'),

                partner_findSession: api_maker(api_modules.partnerRootPrefix, 'partner', 'findSession'),
                partner_login: api_maker(api_modules.partnerRootPrefix, 'partner', 'login'), //GET dded to session manager
                partner_logout: api_maker(api_modules.partnerRootPrefix, 'partner', 'logout'), //GET added to session manager
                partner_partner: api_maker(api_modules.partnerRootPrefix, 'partner', 'partner'),
                partner_forgetPassword: api_maker(api_modules.partnerRootPrefix, 'partner', 'forgetPassword'),
                partner_changePassword: api_maker(api_modules.partnerRootPrefix, 'partner', 'changePassword'),
                partner_course: api_maker(api_modules.partnerRootPrefix, 'course', 'course'), //GET dded to session manager
            };
        };

        return api_assembler();
    };

}).call(this);
