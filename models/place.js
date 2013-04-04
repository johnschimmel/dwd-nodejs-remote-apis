var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// define place schema
var PlaceSchema = new Schema({
    slug : { type: String, lowercase: true, required: true, unique: true },
	name : { type: String, required: true},
	city : String,
	geo : { type: [Number], index: { 
		type: '2dsphere', 
		sparse: true 
	},
    lastupdated : { type: Date, default: Date.now }
});

// export 'Place' model
module.exports = mongoose.model('Place',PlaceSchema);