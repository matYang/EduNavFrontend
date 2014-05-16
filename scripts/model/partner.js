var Partner = BaseUser.extend({

    
    defaults: function () {
        return {
            "partnerId":"",
            "license": "",
            "organization": "", 
            "reference": "", 
            "creationTime": "",
            "institutionName": ""
        };
    },
    idAttribute: "partnerId",

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