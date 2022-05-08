const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  location: {
    type: Schema.Types.ObjectId,
    ref: "Location",
    required: true,
  },
  content: { type: String, required: true },
});
       
module.exports = Comment;
