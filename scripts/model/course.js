var Course = Backbone.Model.extend({
    defaults: function () {
        return {
            "courseId":-1,
            "creationTime": new Date(),
            "partnerId":-1,
            "startTime": new Date(),
            "finishTime": new Date(),
            "location": "",
            "teacherInfo": "",
            "teacherImgUrl": "",
            "teachingMaterial": "",
            "classroomImgUrl": "",
            "price": 0.0,
            "seatsTotal": -1,
            "seatsTaken": -1,
            "reference": -1,


            "category": "",
            "subcategory": "",
            "city": "",
            "district": "",
            "title": "",

            "partner": {}
        };
    },
    idAttribute: "courseId",
    parse: function (data) {
        if ( typeof data !== 'undefined' && typeof data.courseId !== 'undefined') {
            data.courseId = parseInt(data.id, 10);

            data.partnerId = parseInt(data.partner_id, 10);

            data.location = decodeURI(data.location);
            data.teacherInfo = decodeURI(data.teacherInfo);
            data.teacherImgUrl = decodeURI(data.teacherImgUrl);
            data.teachingMaterial = decodeURI(data.teachingMaterial);
            data.classroomImgUrl = decodeURI(data.classroomImgUrl);
            data.price =  parseFloat(data.price, 10);
            data.seatsTotal =  parseInt(data.seatsTotal, 10);
            data.seatsTaken =  parseInt(data.seatsTaken, 10);
            data.referenceNum =  parseInt(data.referenceNum, 10);
            data.category = decodeURI(data.category);
            data.subcategory = decodeURI(data.subcategory);
            data.city = decodeURI(data.city);
            data.district = decodeURI(data.district);
            data.title = decodeURI(data.title);
        }
        return data;
    },
});

var Courses = Backbone.Collection.extend({

    model: Course,

    url: Constants.origin + "/api/v1.0/courses",

    initialize: function (urlOverride) {
        _.bindAll(this, 'overrideUrl');
        if ( typeof urlOverride !== 'undefined') {
            this.url = urlOverride;
        }
    },

    overrideUrl: function (urlOverride) {
        if ( typeof urlOverride !== 'undefined') {
            this.url = urlOverride;
        }
    }
});