var Partner = BaseUser.extend({

    
    defaults: function () {
        return {
            "partnerId":"",
            "license": "",
            "organization": "",
            "reference": "",
            "creationTime": "",
            "instName": "",
            "logoUrl":""
        };
    },
    idAttribute: "partnerId",

    urlRoot: Constants.origin + "/p-api/v1.0/partner/partner",

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