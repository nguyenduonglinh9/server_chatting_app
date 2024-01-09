// const {
//   multipleMongooseToObject,
//   mongooseToObject,
// } = require("../utils/mongoose");
const User = require("../models/users");

const userController = {
  getAll: async (req, res, next) => {
    await User.find({})
      .then((users) => {
        res.json(users);
      })
      .catch((err) => next(err));
  },

  findUsers: async (req, res, next) => {
    const keywords = new RegExp(req.query.keywords);

    const filterName = await User.find({
      fullname: { $regex: keywords, $options: "i" },
    });
    if (filterName.length > 0) {
      res.json({
        code: 200,
        message: filterName,
      });
    } else {
      const filterEmail = await User.find({
        email: { $regex: keywords, $options: "i" },
      }).exec();
      if (filterEmail.length > 0) {
        res.json({
          code: 200,
          message: filterEmail,
        });
      } else {
        const filterPhone = await User.find({
          phone: { $regex: keywords, $options: "i" },
        }).exec();
        if (filterPhone.length > 0) {
          res.json({
            code: 200,
            message: filterPhone,
          });
        } else {
          res.json({
            code: 404,
            message: "Not Found",
          });
        }
      }
    }
  },
};

module.exports = userController;
