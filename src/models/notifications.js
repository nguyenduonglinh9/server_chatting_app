const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  title: { type: String },
  content: { type: String },
  user_id: { type: String },
  data: { type: String },
  createdAt: { type: String },
});

module.exports = mongoose.model("notification", notificationSchema);
