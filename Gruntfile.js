module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
     common: {
        src: [
          "scripts/Lib/LoadFirst/*min.js",
          "scripts/Lib/backbone-min.js",
          "scripts/Lib/jquery-ui-1.10.0.custom.min.js",
          "scripts/Lib/datepicker-zh.js",
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
              "scripts/Common/StaticResource/Status.js",
              "scripts/Common/StaticResource/Utilities.js",
              "scripts/Common/Model/Representation/*.js",
              "scripts/Common/Model/*.js",
              "scripts/Common/Service/*.js",
              "scripts/Test/TestMockObj.js",
              "scripts/Common/DataManagers/GeneralManager.js",
              "scripts/Common/DataManagers/SessionManager.js",
              "scripts/Common/DataManagers/UserManager.js",
              "scripts/Common/View/Shared/*.js",
              "scripts/Common/View/*.js",
              "scripts/User/baiduLoadScript.js",
              "scripts/User/View/MyPage/*.js",
              "scripts/User/View/*.js",
              "scripts/User/Main.js"
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
          'build/common.min.js':['<%= concat.common.dest %>'],
          'build/main.min.js':['<%= concat.main.dest %>'],
          'build/adminMain.min.js':['<%= concat.admin.dest %>'],
          //'build/partnerMain.min.js':['<%= concat.partner.dest %>'],
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
            'style/css/topBar.css',
            'style/css/override.css',
            'style/css/index.css',
            'style/css/reg.css',
            'style/css/search.css',
            'style/css/mypage.css',
            'style/css/courseDetail.css',
            'style/css/compare.css',
            'style/css/booking.css',
            'style/css/aboutUs.css'
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