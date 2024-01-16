const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  socialid: { type: String },
  email: { type: String },
  fullname: { type: String },
  createdAt: { type: String },
  imageURL: { type: String },
  address: { type: String, default: "" },
  phone: { type: String },
  password: { type: String },
  code: { type: String },
  files: { type: Array },
  messageList: { type: Array },
  type: { type: String },
  friends: { type: Array, default: [] },
});

module.exports = mongoose.model("user", userSchema);
