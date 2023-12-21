// const {
//   multipleMongooseToObject,
//   mongooseToObject,
// } = require("../utils/mongoose");
const User = require("../models/users");

const validationController = {
  validationEmail: async (req, res, next) => {
    const checkEmail = await User.findOne({ email: req.params.email });

    if (checkEmail) {
      res.json({ code: 400, message: "This email has been registered" });
    } else {
      res.json({ code: 200, message: "" });
    }
  },
};

module.exports = validationController;
