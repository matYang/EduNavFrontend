var AdminConstants = {
    templateResources: [
    	"adminLogin", "adminBase", 
        "adminUserManage", "adminCourseManage","adminBookingManage", "adminAdminManage", "adminPartnerManage",
        "adminUserRow", "adminCourseRow", "adminBookingRow", "adminAdminRow", "adminPartnerRow",
        "adminUser", "adminCourse", "adminPartner", "adminBooking", "adminAdmin"
    ],
    verifcationResult: {
        "rejected": 0,
        "verified": 1
    }
}

Constants.origin = C_ENV_VAR !== 'REMOTE' ? 'http://localhost:8017' : '..';