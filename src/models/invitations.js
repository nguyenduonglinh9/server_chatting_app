const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const invitationSchema = new Schema({
  send_id: { type: String },
  receive_id: { type: String },
  createdAt: { type: String },
  status: { type: String },
});

module.exports = mongoose.model("invitation", invitationSchema);
