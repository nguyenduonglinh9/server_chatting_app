const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  send_id: { type: String },
  receive_id: { type: String },
  content: { type: String },
  type: { type: String },
  status: { type: String },
  createdAt: { type: String },
  conversation_id: { type: String },
});

module.exports = mongoose.model("conversation", conversationSchema);
