const usersRouter = require("../routes/users");
const authenRouter = require("../routes/authentication");
const validationRouter = require("../routes/validation");
const fileUpload = require("../configs/Cloudinary/index");
const route = (app) => {
  //validation
  app.use("/validation", validationRouter);
  //use
  app.use("/users", usersRouter);
  //authentication
  app.use("/authentication", authenRouter);
  //upload image
  app.use("/upload", fileUpload.array("images"), (req, res, next) => {
    if (!req.files) {
      res.json({
        code: 400,
        message: "no files were uploaded !",
      });
    }

    res.json({ code: 200, message: req.files });
  });
  app.use("/", (req, res, next) => {
    res.send("Welcome to Server Chatting App!");
  });
};

module.exports = route;
