const express = require("express");
const path = require("path");
const db = require("./src/configs/DB");
const route = require("./src/routes");
const port = 3000;
const cors = require("cors");
var app = express();
const multer = require("multer");
//cors
app.use(cors());
//connect to db
db.connect();
//body-paser
// app.use(bodyParser.json());
app.use(require("body-parser").urlencoded({ extended: true }));
app.use(require("body-parser").json({ extended: true }));

//static file
app.use(express.static(path.join(__dirname, "public")));
//middleware
// app.use(upload.none());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
//router init
route(app);
//on port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
