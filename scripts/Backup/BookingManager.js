(function () {
	'use strict';


	this.BookingManager = function(sessionManager, userManager){

		this.apis = new ApiResource();

		this.sessionManager = sessionManager;
		this.userManager = userManager;

		this.timeStamp = new Date();

		this.sessionManager.resgisterManager(this);

	};


	BookingManager.prototype.release = function() {
		this.timeStamp = new Date();
	};


	BookingManager.prototype.fetchBookings = function(bookingId, callback) {
		if (typeof bookingId !== 'number' ){
			Info.warn("BookingManager::fetchBooking:: invalid parameter");
			return;
		}
		if (!this.sessionManager.hasSession()){
			Info.warn("BookingManager::fetchBooking:: session does not exist, exit");
			return;
		}

		var self = this;

		var booking = new Booking();
		booking.overrideUrl(this.apis.booking_booking);
		booking.set('bookingId', bookingId);

		booking.fetch({
			data: $.param({ 'userId': this.sessionManager.getUserId()}),
			dataType:'json',

			success:function(model, response){
				self.timeStamp = new Date();
				if(callback){
					callback.success(booking);
				}
			},

			error: function(model, response){
				Info.warn("BookingManager::fetchBooking:: fetch failed with response:");
				Info.log(response);
				if(callback){
					callback.error(response);
				}
			}
		});
	};

	BookingManager.prototype.initBooking = function(newBooking, callback){
		if (!newBooking || typeof newBooking !== 'object'){
			Info.warn("BookingManager::initBooking:: invalid parameter");
			return;
		}
		if (!this.sessionManager.hasSession()){
			Info.warn("BookingManager::initBooking:: session does not exist, exit");
			return;
		}

		var self = this;

		newBooking.overrideUrl(this.apis.booking_booking);
		newBooking.set('bookingId', -1);
		newBooking.set('userId', this.sessionManager.getUserId());
		newBooking.save({},{
			dataType:'json',

			success:function(model, response){
				self.booking = newBooking;
				self.timeStamp = new Date();

				if(callback){
					callback.success();
				}
			},

			error: function(model, response){
				Info.warn("BookingManager::initBooking:: save failed with response:");
				Info.log(response);
				if(callback){
					callback.error(response);
				}
			}
		});

	};


	//if evaluate, pass in score as well
	BookingManager.prototype.changeBookingState = function(options, callback) {
		var bookingId = options.bookingId;
		var stateChangeAction = options.stateChangeAction;
		var score = stateChangeAction === Constants.bookingStateChangeAction.evaluate ? options.score : 0;
		
		if (typeof bookingId !== 'number' || typeof stateChangeAction !== 'number'){
			Info.warn("BookingManager::changeBookingState:: invalid parameter");
			return;
		}
		if (!this.sessionManager.hasSession()){
			Info.warn("BookingManager::changeBookingState:: session does not exist, exit");
			return;
		}

		var self = this;
		var booking = new Booking();
		booking.overrideUrl(this.apis.booking_booking);
		booking.set('bookingId', bookingId);

		booking.save({},{
			data: JSON.stringify({ 'userId': this.sessionManager.getUserId(), 'stateChangeAction': stateChangeAction, 'score': score}),
			dataType:'json',

			success:function(model, response){
				self.timeStamp = new Date();
				if(callback){
					callback.success(booking);
				}
			},

			error: function(model, response){
				Info.warn("BookingManager::changeBookingState:: save failed with response:");
				Info.log(response);
				if(callback){
					callback.error(response);
				}
			}
		});
	};

	//BookingManager.prototype.deleteBooking = function(bookingId, callback) {
	//	if (typeof bookingId !== 'number'){
	//		Info.warn("BookingManager::deleteBooking:: invalid parameter");
	//		return;
	//	}
	//	if (!this.sessionManager.hasSession()){
	//		Info.warn("BookingManager::deleteBooking:: session does not exist, exit");
	//		return;
	//	}

	//	var self = this;

	//	this.booking.overrideUrl(this.apis.booking_booking);
	//	this.booking.set('bookingId', bookingId);

	//	this.booking.destroy({

	//		data: $.param({ 'userId': this.sessionManager.getUserId()}),
	//		dataType:'json',

	//		success:function(model, response){
	//			self.timeStamp = new Date();

	//			if(callback){
	//				callback.success();
	//			}
	//		},

	//		error: function(model, response){
	//			Info.warn("BookingManager::deleteBooking:: delete failed with response:");
	//			Info.log(response);
	//			if(callback){
	//				callback.error(response);
	//			}
	//		}
	//	});
	//};



	//BookingManager.prototype.changeBookingState_admin = function(bookingId, newState, access_admin ,callback) {
	//	if (!access_admin ||typeof bookingId !== 'number' || typeof newState !== 'number' || typeof access_admin !== 'string'){
	//		Info.warn("BookingManager::changeBookingState_admin:: invalid parameter");
	//		return;
	//	}

	//	var self = this;

	//	this.booking.overrideUrl(this.apis.booking_admin);
	//	this.booking.set('bookingId', bookingId);

	//	this.booking.save({},{

	//		data: $.param({ 'access_admin': access_admin, 'stateIndex': newState}),
	//		dataType:'json',

	//		success:function(model, response){
	//			self.timeStamp = new Date();

	//			if(callback){
	//				callback.success();
	//			}
	//		},

	//		error: function(model, response){
	//			Info.warn("BookingManager::changeBookingState_admin:: save failed with response:");
	//			Info.log(response);
	//			if(callback){
	//				callback.error(response);
	//			}
	//		}
	//	});
	//};


}).call(this);