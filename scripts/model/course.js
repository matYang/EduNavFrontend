var Course = Backbone.Model.extend({
    defaults: function () {
        return {
            "courseId":-1,
            "creationTime": new Date(),
            "partnerId":-1,
            "startTime": new Date(), 
            "finishTime": new Date(), 
            // "location": "",
            "teacherInfo": "",
            "teacherImgUrl": "",
            "teachingMaterial": "",
            "backgroundUrl": "",
            "instName":"",
            "price": 0.0,
            "seatsTotal": -1,
            "seatsLeft": -1,
            "referenceNum": -1,
            "category": "",
            "subcategory": "",
            // "city": "", 
            // "district": "",
            "title": "",
            "partner": null
        };
    },
    idAttribute: "courseId",
    parse: function (data) {
        if ( typeof data !== 'undefined' && typeof data.courseId !== 'undefined') {
            data.courseId = parseInt(data.courseId, 10);

            data.partnerId = parseInt(data.p_Id, 10);
            data.creationTime =  Utilities.castFromAPIFormat(data.creationTime);
            data.startTime = Utilities.castFromAPIFormat(data.startTime);
            data.finishTime = Utilities.castFromAPIFormat(data.finishTime);

            data.location = decodeURI(data.location);
            data.teacherInfo = decodeURI(data.t_Info);
            data.teacherImgUrl = decodeURI(data.t_ImgURL);
            data.teachingMaterial = decodeURI(data.t_Material);
            data.backgroundUrl = decodeURI(data.backgroundURL);
            data.instName = decodeURI(data.instName);
            data.price =  parseFloat(data.price);
            data.seatsTotal =  parseInt(data.seatsTotal, 10);
            data.seatsLeft =  parseInt(data.seatsLeft, 10);
            data.referenceNum =  parseInt(data.referenceNum, 10);
            data.category = decodeURI(data.category);
            data.subcategory = decodeURI(data.subcategory);
            data.city = decodeURI(data.city);
            data.district = decodeURI(data.district);
            data.title = decodeURI(data.title);
            data.partner = new Partner(data.partner, {parse: true});
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