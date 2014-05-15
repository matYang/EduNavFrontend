//	deprecated
// (function () {
// 	'use strict';

// 	var assert = function(condition, message) {
// 		if (condition !== true) {
// 			throw message || "Assertion failed";
// 		}
// 	};

// 	var locRepA = new UserLocation({'hierarchyNameList': ['Canada', 'Ontario', 'Waterloo', 'MC3022'], 'customDepthIndex': 3});
// 	var locRepB = new UserLocation({});
// 	locRepB.castFromString('Canada_Ontario_Waterloo_MC3022_3');

// 	assert(['Canada', 'Ontario', 'Waterloo'].compare(['Canada', 'Ontario', 'Waterloo']), 'Array Prototype compare incorrect');

// 	assert(locRepA.get('hierarchyNameList').compare(locRepB.get('hierarchyNameList')));

// 	assert(locRepA.equals(locRepB), 'UserLocation initialization incorrect');
// 	assert(locRepA.get('country') === locRepB.get('country'));
// 	assert(locRepA.get('province') === locRepB.get('province'));
// 	assert(locRepA.get('city') === locRepB.get('city'));
// 	assert(locRepA.get('point') === locRepB.get('point'));
// 	assert(locRepA.get('hierarchyNameList').compare(locRepB.get('hierarchyNameList')));
// 	assert(locRepA.get('customDepthIndex') === locRepB.get('customDepthIndex'));
// 	assert(locRepA.get('customNameList').compare(locRepB.get('customNameList')));

// 	var locRepC = new UserLocation(locRepA.toJSON());
// 	assert(locRepC.equals(locRepA));
// 	var locRepD = new UserLocation({});
// 	locRepD.castFromString(locRepB.toString());
// 	var locRepE = new UserLocation({});
// 	locRepE.castFromString(locRepB.toString());
// 	assert(locRepC.equals(locRepD));
// 	assert(locRepC.isEquivalentTo(locRepD));
// 	assert(!locRepD.equals(new UserLocation({'hierarchyNameList': ['Canada', 'Ontario', 'Waterloo', 'MC'], 'customDepthIndex': 3})));

	
// 	var spA = new SearchRepresentation({'isRoundTrip': false, 'departureLocation': locRepA.toJSON(), 'arrivalLocation': locRepB.toJSON(), 'departureDate': Utilities.castToAPIFormat(new Date()),
// 			'arrivalDate': Utilities.castToAPIFormat(new Date()), 'targetType': 0, 'departureTimeSlot': 0, 'arrivalTimeSlot': 0}, {'parse': true});
// 	var spB = new SearchRepresentation(spA.toJSON(), {'parse': true});
// 	var spC = new SearchRepresentation();
// 	spC.castFromString(spB.toString());
// 	var spD = new SearchRepresentation(spC.toJSON(), {'parse': true});
// 	var spE = new SearchRepresentation();
// 	spE.castFromString(spD.toString());
// 	Info.log("RepresentationTest: SearchRepresentation: " + spE.toString());
// 	assert(spA.toString() === spE.toString());
// 	Info.log(spE);


// }).call(this);