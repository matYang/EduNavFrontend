(function () {


    this.ApiResource = (function () {

        /*---------------  API level constants   --------------*/
        var api_modules = {

            rootPrefix: Constants.origin + '/api',
            partnerRootPrefix: Constants.origin + '/p-api',
            versionPrefix: '/v2',

            moduleSufixResource: {
                'general': {
                    school: "/school",
                    location: "/location",
                    circle: "/circle",
                    category: "/category",
                    partner: "/partner",
                    course: "/course"
                },

                'user': {
                    findSession: '/findSession',
                    smsVerification: '/smsVerification',
                    register: '/registration',
                    changePassword: '/{0}/changePassword',
                    info: "",
                    changeCell: '/changeCell',
                    login: '/login/phone', //use phone number to login
                    logout: '/{0}/logout',
                    forgetPassword: '/forgetPassword',

                    fastLogin:'/qlogin',
                    fastLoginSms:'/qloginSmsVerification'
                },

                'booking': {
                    create: '',
                    history: '/history',
                    operate: '/{0}/{1}'//{0} is bookingId,{1} is operation name
                },
                //人工选课申请
                'purpose': {
                    create: ''
                },
                'course': {
                    course: ''
                },
                'coupon': {
                    coupon: ''
                },
                'credit': {
                    history: '/history'
                },
                'account': {
                    history: '/history'
                },
                'groupBuy': {
                    list: '',
                    booking: '/booking'
                },
                'comment': {
                    'create': '',
                    'course': ''
                }
            }
        };

        var api_maker = function (prefix, resourceName, actionName) {
            return prefix + api_modules.versionPrefix + '/' + resourceName + api_modules.moduleSufixResource[resourceName][actionName];
        };

        var api_assembler = function () {

            return {
                general_location: api_maker(api_modules.rootPrefix, "general", "location"),
                general_circle: api_maker(api_modules.rootPrefix, "general", "circle"),//商圈的api
                general_school: api_maker(api_modules.rootPrefix, "general", "school"),
                general_category: api_maker(api_modules.rootPrefix, "general", "category"),

                general_partner: api_maker(api_modules.rootPrefix, "general", "partner"),

                courses: api_maker(api_modules.rootPrefix, "course", "course"),


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
                user_apply: api_maker(api_modules.rootPrefix, 'purpose', 'create'),
                user_booking: api_maker(api_modules.rootPrefix, 'booking', 'create'),
                user_booking_history: api_maker(api_modules.rootPrefix, 'booking', 'history'),
                user_booking_operate: api_maker(api_modules.rootPrefix, 'booking', 'operate'),
                user_coupon: api_maker(api_modules.rootPrefix, 'coupon', 'coupon'),
                user_credit_history: api_maker(api_modules.rootPrefix, 'credit', 'history'),
                user_account_history: api_maker(api_modules.rootPrefix, 'account', 'history'),

                user_fastLogin:api_maker(api_modules.rootPrefix, 'user', 'fastLogin'),
                user_fastLoginSms:api_maker(api_modules.rootPrefix, 'user', 'fastLoginSms'),

                groupBuy: api_maker(api_modules.rootPrefix, "groupBuy", "list"),
                groupBuy_booking: api_maker(api_modules.rootPrefix, "groupBuy", "booking"),
                create_comment: api_maker(api_modules.rootPrefix, 'comment', 'create'),
                course_comment: api_maker(api_modules.rootPrefix, 'comment', 'course')
            };
        };

        return api_assembler();
    })();

}).call(this);
