var Partner = BaseUser.extend({
    defaults: {
           "license": "",
           "organization": "", 
           "reference": "", 
           "creationTime": "",
           "institutionName": ""
    },
    parse: function (data) {
        if ( typeof data !== 'undefined' && typeof data.courseId !== 'undefined') {
            data = BaseUser.prototype.parse(data);
            
            data.partnerId = decodeURI(data.id);
            data.license = decodeURI(data.license);
            data.organization = decodeURI(data.organizationNum);

            data.name = decodeURI(data.name);
        }
        return data;
    }
});