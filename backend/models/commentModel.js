const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  UserID: {type: String, required: true},
  location: {
    type: Schema.Types.ObjectId,
    ref: "Location",
    required: true,
  },
  content: { type: String, required: true },
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
