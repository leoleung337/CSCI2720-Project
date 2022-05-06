const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    
    locationName:{ type: String, required: true, unique: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
});

const User = mongoose.model('Location',locationSchema);
module.exports = Location;