const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  title: { type: String, default: "" },
  createdAt: { type: String },
  type: { type: String },
  members: { type: Array },
});

module.exports = mongoose.model("conversation", conversationSchema);
