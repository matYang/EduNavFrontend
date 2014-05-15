var Admin = BaseUser.extend({
    defaults: {
           "reference": "",
           "privilege": ""
    },
    idAttribute: "courseId",
    parse: function (data) {
        if ( typeof data !== 'undefined' && typeof data.courseId !== 'undefined') {
            data = BaseUser.prototype.parse(data);
            data.courseId = parseInt(data.id, 10);

            data.partnerId = parseInt(data.partner_id, 10);

            data.location = decodeURI(data.location);
            data.teacherInfo = decodeURI(data.teacherInfo);
            data.teacherImgUrl = decodeURI(data.teacherImgUrl);
            data.teachingMaterial = decodeURI(data.teachingMaterial);
            data.classroomImgUrl = decodeURI(data.classroomImgUrl);
            data.price =  parseInt(data.price, 10);
            data.seatsTotal =  parseInt(data.seatsTotal, 10);
            data.seatsTaken =  parseInt(data.seatsTaken, 10);
            data.referenceNum =  parseInt(data.referenceNum, 10);
            data.price =  parseInt(data.price, 10);
            data.category = decodeURI(data.category);
            data.subcategory = decodeURI(data.subcategory);
            data.city = decodeURI(data.city);
            data.district = decodeURI(data.district);
            
            data.name = decodeURI(data.name);
        }
        return data;
    }
});