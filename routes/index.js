
/*
 * routes/index.js
 * 
 * Routes contains the functions (callbacks) associated with request urls.
 */

var request = require('request'); // library to make requests to remote urls

var moment = require("moment"); // date manipulation library
var placeModel = require("../models/place.js"); //db model


/*
	GET /
*/
exports.index = function(req, res) {
	
	console.log("main page requested");

	// query for all places
	var query = placeModel.find({});
	query.exec(function(err, allPlaces){

		if (err) {
			res.send("Unable to query database for places").status(500);
		};

		console.log("retrieved " + allPlaces.length + " places from database");

		//build and render template
		var templateData = {
			places : allPlaces,
			pageTitle : "NASA Astronauts (" + allAstros.length + ")"
		}

		res.render('index.html', templateData);

	});

};


exports.post_add_place = function(req, res) {

	var name = req.body.place_name;
	var latlng_str = req.body.latlng_str;
	var latlng_array = latlng_str.split(",");

	var new_place = placeModel({
		name : req.body.place_name,
		geo : 
	})

}
