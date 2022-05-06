const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({

});

const User = mongoose.model('Comment',commentSchema);
module.exports = Comment;