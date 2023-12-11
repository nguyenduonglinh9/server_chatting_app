const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String },
  fullname: { type: String },
  createdAt: { type: String },
  imageURL: { type: String },
  address: { type: String },
  phone: { type: String },
  password: { type: String },
  files: { type: Array },
  messageList: { type: Array },
});

module.exports = mongoose.model("user", userSchema);