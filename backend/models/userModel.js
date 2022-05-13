/*
Hui Cheuk Hin 1155124935
Law Wan Chun Jeffrey 1155125137
Lee Kam Chung Gordon 1155142809
Leung Tsz Hin Leo 1155127195
Wong Kai Lok Peter 1155125720
Wong Yuen Ying Angel 1155125283
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    username:{ type: String, required: true, unique: true },
    password:{ type: String, required: true },
    favouriteLocations:[{ type: Schema.Types.ObjectId, ref: 'Location' }]

});

const User = mongoose.model('User', userSchema);
module.exports = User;
