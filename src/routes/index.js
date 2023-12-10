const usersRouter = require("../routes/users");
const authenRouter = require("../routes/authentication");
const route = (app) => {
  app.use("/users", usersRouter);
  app.use("/authentication", authenRouter);
  app.use("/", (req, res, next) => {
    res.send("Welcome to Server Chatting App!");
  });
};

module.exports = route;
