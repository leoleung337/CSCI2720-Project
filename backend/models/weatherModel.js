const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const weatherSchema = new Schema({
    location: [{type: mongoose.Schema.Types.ObjectId, ref: 'Location'}],
    time: { type: date, required: true },
    temp_c: { type: Number, required: true },
    wind_kph: { type: Number, required: true },
    wind_dir: { type: Number, required: true },
    humidity: { type: Number, required: true },
    precip_mm: { type: Number, required: true },
    vis_km: { type: Number, required: true }
});

const Weather = mongoose.model('Weather', weatherSchema);
module.exports = Weather;