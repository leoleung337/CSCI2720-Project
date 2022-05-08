const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  userName: { type: String, required: true},
  location: {
    type: Schema.Types.ObjectId,
    ref: "Location",
    required: true,
  },
  content: { type: String, required: true },
});
       
module.exports = Comment;
