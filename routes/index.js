
/*
 * routes/index.js
 * 
 * Routes contains the functions (callbacks) associated with request urls.
 */
var request = require('request'); // library to make requests to remote urls

var moment = require("moment"); // date manipulation library
var placeModel = require("../models/place.js"); //db model

// UPDATE WITH YOUR GOOGLE MAPS API KEY
// https://developers.google.com/maps/documentation/javascript/tutorial#api_key
var google_maps_key = "AIzaSyBcwy-Vt6p6Kl8ubXOkGixnyLj2jYaIvWA";

/*
	GET /
*/
exports.index = function(req, res) {
	
	// render the map and form template
	// pass in the google_maps_key, used in /views/index.html when requesting the Google Maps JS

	templateData = {
		pageTitle : 'All Places',
		google_maps_key : google_maps_key
	};

	res.render('index.html', templateData);

};

exports.get_places = function(req, res) {

	// query for all places
	var query = placeModel.find({});
	query.select('name geo_name geo');
	query.exec(function(err, allPlaces){

		if (err) {
			res.send("Unable to query database for places").status(500);
		};

		console.log("retrieved " + allPlaces.length + " places from database");

		//build and render template
		var data = {
			status : 'OK',
			places : allPlaces
		};

		// was JSONP requested does querystring have callback
		// allow remote domains to request places json
		if (req.query.callback != undefined) {
			res.jsonp(data);
	
		// 
		} else {
			res.json(data);
		}
		
	});

};

// Add new place via POST
// accepts name, latlng ("lat,lng") and geo_name
// Returns JSON if request is XHR

exports.post_add_place = function(req, res) {

	// var name = req.body.place_name;
	var latlng_str = req.body.latlng; // just a string
	var latlng_array = latlng_str.split(","); // split string into array

	var new_place = placeModel({
		name : req.body.name,
		geo : latlng_array, 
		geo_name : req.body.geo_name
	});
	
	// save to mongodb
	new_place.save(function(err){
		if (err) {
			console.log("there was an error saving");
			console.log(err);
		} else {
			console.log("New Place saved");
			console.log(new_place);
		}
	});

	// RESPONSE

	// if req is XMLHTTPRequest (AJAX) then respond with JSON
	if (req.xhr) {
		var replyData = {
			status : 'OK',
			msg : 'Place added successfully.'
		};
		res.json(replyData);

	} else {
		res.redirect('/');	
	}
	

}
