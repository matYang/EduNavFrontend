module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
     admin: {
        src: ["scripts/lib/jquery-1.9.1.min.js",
              "scripts/lib/jquery.cycle2.min.js",
              "scripts/lib/underscore-1.5.2-min.js",
              "scripts/lib/backbone-1.1.0-min.js",
              "scripts/lib/jquery-ui-1.10.0.custom.min.js",
              "scripts/lib/jquery.placeholder.min.js",
              "scripts/lib/jquery.validate.min.js",
              "scripts/lib/additional-methods.min.js",
              "scripts/lib/json2.js",
              "scripts/lib/socket.io.js",
              "scripts/lib/custom.js",
              "scripts/lib/DD_belatedPNG_0.0.8a.js",
              "scripts/service/info.js",
              "scripts/prototypes.js",
              "scripts/admin/resource/*.js",
              "scripts/staticResource/*.js",
              "scripts/service/storageService.js",
              "scripts/service/utilities.js",
              "scripts/service/templateUtl.js",
              "scripts/service/viewRegistrationService.js",
              "scripts/service/eventClearService.js",
              "scripts/model/representation/searchRepresentation.js",
              "scripts/model/representation/userSearchRepresentation.js",
              "scripts/model/notification.js",
              "scripts/model/booking.js",
              "scripts/model/user.js",
              "scripts/model/partner.js",
              "scripts/model/admin.js",
              "scripts/model/course.js",
              
              "scripts/service/locationService.js",
              "scripts/test/testMockObj.js",
              "scripts/dataManagers/sessionManager.js",
              "scripts/dataManagers/userManager.js",
              "scripts/dataManagers/courseManager.js",
              "scripts/dataManagers/bookingManager.js",
              "scripts/admin/adminManager",
              "scripts/view/shared/multiPageView.js",
              "scripts/view/shared/BaseFormView.js"
              "scripts/admin/view/*.js",
              "scripts/admin/adminMain.js"
              ],
        dest: 'build/adminMain.js'
      },
      partner: {
        src: ["scripts/lib/jquery-1.9.1.min.js",
              "scripts/lib/jquery.cycle2.min.js",
              "scripts/lib/underscore-1.5.2-min.js",
              "scripts/lib/backbone-1.1.0-min.js",
              "scripts/lib/jquery-ui-1.10.0.custom.min.js",
              "scripts/lib/jquery.placeholder.min.js",
              "scripts/lib/jquery.validate.min.js",
              "scripts/lib/additional-methods.min.js",
              "scripts/lib/json2.js",
              "scripts/lib/socket.io.js",
              "scripts/lib/custom.js",
              "scripts/lib/DD_belatedPNG_0.0.8a.js",
              "scripts/service/info.js",
              "scripts/prototypes.js",
              "scripts/staticResource/*.js",
              "scripts/service/storageService.js",
              "scripts/service/utilities.js",
              "scripts/service/templateUtl.js",
              "scripts/service/viewRegistrationService.js",
              "scripts/service/eventClearService.js",
              "scripts/model/representation/searchRepresentation.js",

              "scripts/model/booking.js",
              "scripts/model/user.js",
              "scripts/model/partner.js",
              "scripts/model/course.js",

              "scripts/service/locationService.js",
              "scripts/test/testMockObj.js",
              "scripts/dataManagers/sessionManager.js",
              "scripts/dataManagers/userManager.js",
              "scripts/dataManagers/courseManager.js",
              "scripts/dataManagers/bookingManager.js",
              "scripts/dataManagers/partnerManager.js",

              "scripts/view/shared/multiPageView.js",
              "scripts/view/shared/BaseFormView.js"
              "scripts/view/mapview.js",
              
              "scripts/view/dropdown/baseDropDownView.js",
              "scripts/view/dropdown/locationDropDownView.js",
              "scripts/view/dropdown/idTypeDropDownView.js",
              "scripts/view/course/CourseDetailView.js",
              "scripts/view/course/MessagePostView.js",
              "scripts/view/course/MessagePublishView.js",
              "scripts/view/course/MessageEditView.js",
              "scripts/view/searchResultView.js",
              "scripts/view/userSearchResultView.js",
              "scripts/view/frontPageView.js",
              "scripts/view/mainPageView.js",
              "scripts/view/personalView.js",
              "scripts/view/registrationView.js",
              "scripts/view/findPasswordView.js",
              "scripts/view/popup/transactionView.js",
              "scripts/view/topBarView.js",
              "scripts/view/howItWorksView.js",
              "scripts/view/serviceCenterView.js",
              "scripts/partnerMain.js"
              ],
        dest: 'build/partnerMain.js'
      },
      main: {
        src: ["scripts/lib/jquery-1.9.1.min.js",
              "scripts/lib/jquery.cycle2.min.js",
              "scripts/lib/underscore-1.5.2-min.js",
              "scripts/lib/backbone-1.1.0-min.js",
              "scripts/lib/jquery-ui-1.10.0.custom.min.js",
              "scripts/lib/jquery.placeholder.min.js",
              "scripts/lib/jquery.validate.min.js",
              "scripts/lib/additional-methods.min.js",
              "scripts/lib/json2.js",
              "scripts/lib/socket.io.js",
              "scripts/lib/custom.js",
              "scripts/lib/DD_belatedPNG_0.0.8a.js",
              "scripts/service/info.js",
              "scripts/prototypes.js",
              "scripts/staticResource/*.js",
              "scripts/service/storageService.js",
              "scripts/service/utilities.js",
              "scripts/service/templateUtl.js",
              "scripts/service/viewRegistrationService.js",
              "scripts/service/eventClearService.js",
              "scripts/model/representation/searchRepresentation.js",
              
              
              "scripts/model/booking.js",
              "scripts/model/user.js",
              "scripts/model/partner.js",
              "scripts/model/course.js",
              
              "scripts/service/locationService.js",
              "scripts/test/testMockObj.js",
              "scripts/dataManagers/sessionManager.js",
              "scripts/dataManagers/userManager.js",
              "scripts/dataManagers/courseManager.js",
              "scripts/dataManagers/transactionManager.js",

              "scripts/view/shared/multiPageView.js",
              "scripts/view/shared/BaseFormView.js"
              "scripts/view/dropdown/baseDropDownView.js",
              "scripts/view/dropdown/locationDropDownView.js",
              "scripts/view/course/CourseDetailView.js",
              "scripts/view/searchResultView.js",
              
              "scripts/view/frontPageView.js",
              "scripts/view/mainPageView.js",
              "scripts/view/personalView.js",
              "scripts/view/registrationView.js",
              "scripts/view/findPasswordView.js",
              "scripts/view/popup/transactionView.js",
              "scripts/view/topBarView.js",
              "scripts/view/howItWorksView.js",
              "scripts/view/serviceCenterView.js",
              "scripts/main.js"
              ],
        dest: 'build/main.js'
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
