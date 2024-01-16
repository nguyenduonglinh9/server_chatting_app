const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://L123456:L123456@cluster0.9papmkm.mongodb.net/CHATTING",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connect Successfully !");
  } catch (error) {
    console.log("Connect Failed !");
  }
}

module.exports = { connect };
