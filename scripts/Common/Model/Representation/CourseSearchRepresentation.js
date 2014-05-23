var CourseSearchRepresentation = Backbone.Model.extend({

    defaults: function () {
        return {
            'category': undefined,
            'subCategory': undefined,
    
            'city': undefined,
            'district': undefined,
            
            'startTime': undefined,
            'finishTime': undefined,
            
            'institutionName': undefined,
            'status': undefined,
            
            'startPrice': undefined,
            'finishPrice': undefined,
            
            'courseReference': undefined,
            'partnerReference': undefined,
            
            'courseId': undefined,
            'partnerId': undefined,
            'userId': undefined,
            'creationTime': undefined
        };
    },

    initialize: function () {
        _.bindAll(this, 'toQueryString', 'castFromQuery');
    },

    toQueryString: function () {
        var queryArr = [];
        var queryObj = {};

        queryObj.category = this.get('category');
        queryObj.subCategory = this.get('subCategory');
        queryObj.city = this.get('city');
        queryObj.district = this.get('district');

        queryObj.startTime = typeof this.get('startTime') === 'undefined' ? undefined : Utilities.castToRepresentationFormat(this.get('startTime'));
        queryObj.finishTime = typeof this.get('finishTime') === 'undefined' ? undefined : Utilities.castToRepresentationFormat(this.get('finishTime'));

        queryObj.institutionName = this.get('institutionName');
        queryObj.status = this.get('status');

        queryObj.startPrice = this.get('startPrice');
        queryObj.finishPrice = this.get('finishPrice');
        queryObj.courseReference = this.get('courseReference');
        queryObj.partnerReference = this.get('partnerReference');
        queryObj.courseId = this.get('courseId');
        queryObj.partnerId = this.get('partnerId');
        queryObj.userId = this.get('userId');

        queryObj.creationTime = typeof this.get('creationTime') === 'undefined' ? undefined : Utilities.castToRepresentationFormat(this.get('creationTime'));
    
        for (var property in queryObj) {
            if (queryObj.hasOwnProperty(property) && typeof queryObj[property] !== 'undefined') {
                queryArr.push(property + '=' + queryObj[property]);
            }
        }

        return queryArr.join('&');
    },

    castFromQuery: function (queryObj) {
        for (var property in queryObj) {
            if (queryObj.hasOwnProperty(property) && typeof queryObj[property] !== 'undefined') {
                this.set(property, queryObj[property]);
            }
        }
    }

});

