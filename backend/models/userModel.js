const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    username:{ type: String, required: true, unique: true },
    password:{ type: String, required: true },
    favouriteLocations:[{ type: Schema.Types.ObjectId, ref: 'Location' }]

});

const User = mongoose.model('User',userSchema);
module.exports = User;