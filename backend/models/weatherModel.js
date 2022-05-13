/*
Hui Cheuk Hin 1155124935
Law Wan Chun Jeffrey 1155125137
Lee Kam Chung Gordon 1155142809
Leung Tsz Hin Leo 1155127195
Wong Kai Lok Peter 1155125720
Wong Yuen Ying Angel 1155125283
*/
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const weatherSchema = new Schema({
  location: { type: mongoose.Schema.Types.ObjectId, ref: "Location" },
  time: { type: String, required: true },
  temp_c: { type: Number, required: true },
  wind_kph: { type: Number, required: true },
  wind_dir: { type: String, required: true },
  humidity: { type: Number, required: true },
  precip_mm: { type: Number, required: true },
  vis_km: { type: Number, required: true },
});

const Weather = mongoose.model("Weather", weatherSchema);
module.exports = Weather;
