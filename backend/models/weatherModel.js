const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const weatherSchema = new Schema({

});

const User = mongoose.model('Weather',weatherSchema);
module.exports = Weather;