var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// define place schema
var PlaceSchema = new Schema({
	name : { type: String, required: true},
	geo : { type: [Number], index: { type: '2dsphere', sparse: true } },
	geo_name : String,
    lastupdated : { type: Date, default: Date.now }
})

// export 'Place' model
module.exports = mongoose.model('Place',PlaceSchema);