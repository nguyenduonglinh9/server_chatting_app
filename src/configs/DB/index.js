const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://duonglinh:Linh201198@cluster0.9papmkm.mongodb.net/CHATTING",
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
