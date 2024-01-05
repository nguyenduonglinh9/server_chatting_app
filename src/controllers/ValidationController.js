const User = require("../models/users");

const validationController = {
  validationEmail: async (req, res, next) => {
    const requestEmail = req.params.email;
    const user = await User.findOne({
      email: requestEmail.toLowerCase(),
      type: "default",
    });

    if (user) {
      res.json({
        code: 400,
        message: "This email has been registered",
        infor: user,
      });
    } else {
      res.json({ code: 200, message: "This email is not registered" });
    }
  },
  validationSocial: async (req, res, next) => {
    const checkSocialid = await User.findOne({ socialid: req.params.socialid });

    if (checkSocialid) {
      res.json({ code: 400, message: "An account exists" });
    } else {
      res.json({ code: 200, message: "No account exists yet" });
    }
  },
};

module.exports = validationController;
