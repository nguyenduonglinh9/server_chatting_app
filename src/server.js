const express = require("express");
const path = require("path");
const db = require("./configs/DB");
const route = require("./routes");
const port = 3000;
const cors = require("cors");
var app = express();
//cors
app.use(cors());

//connect to db
db.connect();
//body-parser
app.use(require("body-parser").urlencoded({ extended: true }));
//static file
app.use(express.static(path.join(__dirname, "public")));
//middleware
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
