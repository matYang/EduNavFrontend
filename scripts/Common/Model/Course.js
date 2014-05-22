var Course = Backbone.Model.extend({
    defaults: function () {
        return {
            "courseId":-1,
            "partnerId":-1,

            "startTime": new Date(),
            "finishTime": new Date(),
            "price": 0,
            "seatsTotal": -1,
            "seatsLeft": -1,
            "status": 0,
            "category": "",
            "subcategory": "",
            "title": "",
            "location": "",
            "city": "",
            "district": "",
            "reference": "",

            "teacherInfo": "",
            "teacherImgUrl": "",
            "teachingMaterial": "",
            "backgroundUrl": "",
            "courseInfo": "",
            
            "partner": null,
            "creationTime": new Date()
        };
    },
    idAttribute: "courseId",
    parse: function (data) {
        if ( typeof data !== 'undefined') {
            data.courseId = parseInt(data.courseId, 10);
            data.partnerId = parseInt(data.p_Id, 10);
            
            data.startTime = Utilities.castFromAPIFormat(data.startTime);
            data.finishTime = Utilities.castFromAPIFormat(data.finishTime);
            data.price =  parseInt(data.price, 10);
            data.seatsTotal =  parseInt(data.seatsTotal, 10);
            data.seatsLeft =  parseInt(data.seatsLeft, 10);
            data.status = parseInt(data.status, 10);
            data.category = decodeURI(data.category);
            data.subcategory = decodeURI(data.subcategory);
            data.title = decodeURI(data.title);
            data.location = decodeURI(data.location);
            data.city = decodeURI(data.city);
            data.district = decodeURI(data.district);
            data.reference =  decodeURI(data.reference);


            data.teacherInfo = decodeURI(data.t_Info);
            data.teacherImgUrl = decodeURI(data.t_ImgURL);
            data.teachingMaterial = decodeURI(data.t_Material);
            data.backgroundUrl = decodeURI(data.backgroundURL);
            data.courseInfo = decodeURI(data.courseInfo);

            data.creationTime =  Utilities.castFromAPIFormat(data.creationTime);
            data.partner = new Partner(data.partner, {parse: true});
        }
        return data;
    },
    _toJSON: function () {
        var json = this.toJSON();
        return json;
    },
    toJSON: function () {
        var json = _.clone(this.attributes);
        json.city = encodeURI(json.city);
        json.district = encodeURI(json.district);
        json.location = encodeURI(json.location);
        return json;
    }
});

var Courses = Backbone.Collection.extend({

    model: Course,

    url: Constants.origin + "/api/v1.0/course",

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