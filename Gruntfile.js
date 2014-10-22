module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            common: {
                src: [
                    "scripts/Lib/LoadFirst/*min.js",
                    "scripts/Lib/backbone-min.js",
                    "scripts/Lib/jquery-ui.min.js",
                    "scripts/Lib/jquery.raty.js",
//                  "scripts/Lib/jquery-ui-1.10.0.custom.min.js",
//                  "scripts/Lib/datepicker-zh.js",
                    "scripts/Lib/jquery.placeholder.min.js",
                    "scripts/Lib/jquery.smooth-scroll.min.js",
                    "scripts/Lib/json2.js",
                    "scripts/Lib/backbone.notifier.js",
                    "scripts/Lib/bjqs.js"
                ],
                dest: 'build/Common.js'
            },
            main: {
                src: [
                    "scripts/Common/Config/*.js",
                    "scripts/Common/StaticResource/Constants.js",
                    "scripts/Common/StaticResource/ApiResource.js",
                    "scripts/Common/StaticResource/Resources.js",
                    "scripts/Common/StaticResource/Utilities.js",
                    "scripts/Model/Representation/*.js",
                    "scripts/Model/*.js",
                    "scripts/Common/Service/*.js",
                    "scripts/Test/TestMockObj.js",
                    "scripts/Common/DataManagers/GeneralManager.js",
                    "scripts/Common/DataManagers/SessionManager.js",
                    "scripts/Common/DataManagers/UserManager.js",
                    "scripts/View/Common/Shared/*.js",
                    "scripts/View/Common/*.js",
                    "scripts/View/Modal/Modal.js",
                    "scripts/View/Modal/*.js",
                    "scripts/mapLoadScript.js",
                    "scripts/View/MyPage/*.js",
                    "scripts/View/*.js",
                    "scripts/Main.js"
                ],
                dest: 'build/Main.js'
            }

        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            dist: {
                files: {
                    'build/common.min.js': ['<%= concat.common.dest %>'],
                    'build/main.min.js': ['<%= concat.main.dest %>']
                }
            }
        },
        cssmin: {
            dist: {
                files: {
                    'build/style/css/style-min.css': [
                        'style/css/Global.css',
                        'style/css/notifier-base.css',
                        'style/css/common-ui.css',
                        'style/css/modals.css',
                        'style/css/widgets.css',

                        'style/css/topBar.css',
                        'style/css/right_bar.css',
                        'style/css/override.css',
                        'style/css/index.css',
                        'style/css/reg.css',
                        'style/css/search.css',
                        'style/css/mypage.css',
                        'style/css/courseDetail.css',
                        'style/css/compare.css',
                        'style/css/booking.css',
                        'style/css/aboutUs.css',
                        'style/css/tuan.css',
                        'style/css/tuanDetail.css'
                    ]
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);
};