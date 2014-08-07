(function () {
    

    this.ApiResource = (function () {

        /*---------------  API level constants   --------------*/
        var api_modules = {

            rootPrefix: Constants.origin +  '/api',
            partnerRootPrefix: Constants.origin + '/p-api',
            versionPrefix: '/v2',

            moduleSufixResource: {
                'general': {
                    location:"/location",
                    category:"/category",
                    partner:"/partner",
                    course:"/course",
                },

                'user': {
                    findSession: '/findSession',
                    smsVerification: '/smsVerification',
                    register: '/registration',
                    changePassword: '{0}/changePassword',
                    info: "",
                    changeCell: '/changeCell',
                    login: '/login/phone', //use phone number to login
                    logout: '{0}/logout', //todo /{id}/logout
                    forgetPassword: '/forgetPassword'
                },

                'booking': {
                    booking: '/booking'
                },
                'course': {
                    course: ''
                },
                'coupon': {
                    coupon: "/coupon"
                }
            }
        };

        var api_maker = function (prefix, resourceName, actionName) {
            return prefix + api_modules.versionPrefix +'/'+ resourceName + api_modules.moduleSufixResource[resourceName][actionName];
        };

        var api_assembler = function () {

            return {
                general_location: api_maker(api_modules.rootPrefix, "general", "location"),
                general_category: api_maker(api_modules.rootPrefix, "general", "category"),
                general_partner: api_maker(api_modules.rootPrefix, "general", "partner"),

                courses: api_maker(api_modules.rootPrefix, "course", "course"),

                //can also use 'courses' with '?ids=1,2,3'
//                general_courseByIdList: api_maker(api_modules.rootPrefix, "general", "courseByIdList"),
                
                user_findSession: api_maker(api_modules.rootPrefix, 'user', 'findSession'), //GET added to session manaegr
                user_smsVerification: api_maker(api_modules.rootPrefix, 'user', 'smsVerification'),
                user_register: api_maker(api_modules.rootPrefix, 'user', 'register'), //GET and POST added to user manager
                user_changePassword: api_maker(api_modules.rootPrefix, 'user', 'changePassword'),
                user_info: api_maker(api_modules.rootPrefix, 'user', 'info'),
                user_changeCell: api_maker(api_modules.rootPrefix, 'user', 'changeCell'),
                user_login: api_maker(api_modules.rootPrefix, 'user', 'login'), //GET dded to session manager
                user_logout: api_maker(api_modules.rootPrefix, 'user', 'logout'), //GET added to session manager
                user_forgetPassword: api_maker(api_modules.rootPrefix, 'user', 'forgetPassword'),
                user_booking: api_maker(api_modules.rootPrefix, 'booking', 'booking'),
                user_coupon: api_maker(api_modules.rootPrefix, 'coupon', 'coupon')
            };
        };

        return api_assembler();
    })();

}).call(this);
