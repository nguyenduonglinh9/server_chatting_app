// const {
//   multipleMongooseToObject,
//   mongooseToObject,
// } = require("../utils/mongoose");
const { query } = require("express");
const User = require("../models/users");
const toNonAccentVietnamese = require("../utils/nonAccentVietnamese");
const mongoose = require("mongoose");

const userController = {
  getAll: async (req, res, next) => {
    await User.find({})
      .then((users) => {
        res.json(users);
      })
      .catch((err) => next(err));
  },

  findUsers: async (req, res, next) => {
    if (req.query.keywords == "") {
      res.json({
        code: 404,
        message: "Not Found",
      });
    } else {
      const keywords = new RegExp(req.query.keywords);
      const filterUsers = await User.find({
        $or: [
          { fullname: { $regex: keywords, $options: "i" } },
          { email: { $regex: keywords, $options: "i" } },
          { phone: { $regex: keywords, $options: "i" } },
        ],
      });

      if (filterUsers.length > 0) {
        res.json({ code: 200, message: filterUsers });
      } else {
        res.json({
          code: 404,
          message: "Not Found",
        });
      }
    }
  },

  getProfile: async (req, res, next) => {
    if (mongoose.Types.ObjectId.isValid(req.params._id)) {
      try {
        const user = await User.findById(req.params._id).exec();
        if (user) {
          res.json({ code: 200, message: "User found", infor: user });
        } else {
          res.json({ code: 404, message: "User not found" });
        }
      } catch (error) {
        res.json({ code: 400, message: `Error : ${error.message}` });
      }
    } else {
      res.json({ code: 400, message: "The id format is incorrect" });
    }
  },
};

module.exports = userController;
