module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
     admin: {
        src: ["scripts/Lib/LoadFirst/*.js",
              "scripts/Lib/*.js",
              "scripts/Common/Config/*.js",
              "scripts/Common/StaticResource/*.js",
              "scripts/Admin/Resource/*.js",

              "scripts/Common/Model/Representation/*",
              "scripts/Common/Model/Booking.js",
              "scripts/Common/Model/User.js",
              "scripts/Common/Model/Partner.js",
              "scripts/Common/Model/Admin.js",
              "scripts/Common/Model/Course.js",
              
              "scripts/Common/Service/*.js",
              
              "scripts/Test/testMockObj.js",
              "scripts/Common/DataManagers/GeneralManager.js",
              "scripts/Common/DataManagers/SessionManager.js",
              "scripts/Common/DataManagers/AdminManager.js",
              "scripts/Admin/Manager/*.js",
              "scripts/Common/View/shared/*.js",
              "scripts/Admin/View/*.js",
              "scripts/Admin/Main.js"
              ],
        dest: 'build/AdminMain.js'
      },
      partner: {
        src: ["scripts/Lib/LoadFirst/*.js",
              "scripts/Lib/*.js",
              "scripts/Common/Config/*.js",
              "scripts/Common/StaticResource/*.js",

              "scripts/Common/Model/Representation/*",
              "scripts/Common/Model/Booking.js",
              "scripts/Common/Model/User.js",
              "scripts/Common/Model/Partner.js",
              "scripts/Common/Model/Course.js",
              
              "scripts/Common/Service/*.js",
              
              "scripts/Test/testMockObj.js",
              "scripts/Common/DataManagers/GeneralManager.js",
              "scripts/Common/DataManagers/SessionManager.js",
              "scripts/Common/DataManagers/PartnerManager.js",
              "scripts/Common/View/shared/*.js",
              "scripts/Common/View/*.js",
              "scripts/Partner/Main.js"
              ],
        dest: 'build/PartnerMain.js'
      },
      main: {
        src: ["scripts/Lib/LoadFirst/*.js",
              "scripts/Lib/*.js",
              "scripts/Common/Config/*.js",
              "scripts/Common/StaticResource/*.js",

              "scripts/Common/Model/Representation/*",
              "scripts/Common/Model/Booking.js",
              "scripts/Common/Model/User.js",
              "scripts/Common/Model/Partner.js",
              "scripts/Common/Model/Course.js",
              
              "scripts/Common/Service/*.js",
              
              "scripts/Test/testMockObj.js",
              "scripts/Common/DataManagers/GeneralManager.js",
              "scripts/Common/DataManagers/SessionManager.js",
              "scripts/Common/DataManagers/UserManager.js",
              "scripts/Common/View/shared/*.js",
              "scripts/Common/View/*.js",
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
          'build/main.min.js':['<%= concat.main.dest %>'],
          'build/adminMain.min.js':['<%= concat.admin.dest %>'],
          'build/partnerMain.min.js':['<%= concat.partner.dest %>'],
        }
      }
    },
    cssmin: {
      dist: {
        files: {
          'build/style/css/style-min.css': ['style/css/*.css']
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);
};
