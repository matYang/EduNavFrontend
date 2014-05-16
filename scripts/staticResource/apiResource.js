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

            versionPrefix: '/v1.0',

            moduleResource: {
                'course': '/course',
                'users': '/users',
                'booking': '/booking',
                'location': '/location',
            },

            moduleSufixResource: {
                'course': {
                    recent: '/recent',
                    search: '/search',
                    transaction: '/transaction',
                    autoMatch: '/autoMatch',
                    message: '/dianming'
                },

                'users': {
                    findSession: '/findSession',
                    user: '/user',
                    login: '/login',
                    logout: '/logout',
                    img: '/img',
                    email: '/email',
                    changePassword: '/changePassword',
                    contactInfo: '/contactInfo',

                    emailActivation: '/emailActivation',
                    resendActivationEmail: '/resendActivationEmail',
                    forgetPassword: '/forgetPassword',
                    
                    messageHistory: '/messageHistory',
                    transaction: '/transaction',
                    notification: '/notification',
                    searchHistory: '/searchHistory'
                },

                'booking': {
                    transaction: '/transaction',
                    admin: '/admin'
                },
                'location': {
                    location: '/location'
                }
            }
        };

        var api_maker = function (moduleName, actionName) {
            return api_modules.rootPrefix + api_modules.versionPrefix + api_modules.moduleResource[moduleName] + api_modules.moduleSufixResource[moduleName][actionName];
        };

        var api_assembler = function () {

            return {
                message_message: api_maker("message", "message"),
                message_recent: api_maker('message', 'recent'),
                message_search: api_maker('message', 'search'),
                message_transaction: api_maker('message', 'transaction'),
                message_autoMatch: api_maker('message', 'autoMatch'),

                users_findSession: api_maker('users', 'findSession'), //GET added to session manaegr
                users_user: api_maker('users', 'user'), //GET and POST added to user manager
                users_login: api_maker('users', 'login'), //GET dded to session manager
                users_logout: api_maker('users', 'logout'), //GET added to session manager
                users_img: api_maker('users', 'img'), //
                users_email: api_maker('users', 'email'),
                users_changePassword: api_maker('users', 'changePassword'),
                users_contactInfo: api_maker('users', 'contactInfo'),
                
                users_emailActivation: api_maker('users', 'emailActivation'),
                users_resendActivationEmail: api_maker('users', 'resendActivationEmail'),
                
                users_messageHistory: api_maker('users', 'messageHistory'),
                users_transaction: api_maker('users', 'transaction'),
                users_notification: api_maker('users', 'notification'),
                users_searchUser: api_maker('users', 'searchUser'),

                transaction_transaction: api_maker('booking', 'transaction'),
                transaction_admin: api_maker('booking', 'admin'),
            };
        };

        return api_assembler();
    };

}).call(this);
