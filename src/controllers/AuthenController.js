// const {
//   multipleMongooseToObject,
//   mongooseToObject,
// } = require("../utils/mongoose");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const { request } = require("express");
var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  logger: true,
  debug: true,
  secureConnection: false,
  auth: {
    user: "ndlcompany335@gmail.com",
    pass: "mymm tmuk jgsf kngu",
  },
  tls: {
    rejectUnauthorized: true,
  },
});
var code = "";

const userController = {
  getAll: async (req, res, next) => {
    await User.find({})
      .then((users) => {
        res.json(users);
      })
      .catch((err) => next(err));
  },

  signUp: async (req, res, next) => {
    var salt = await bcrypt.genSalt(10);
    var myEncrpytedPass = await bcrypt.hash(req.body.password, salt);
    code = Math.random().toString(36).substring(3, 9);
    try {
      const newUser = new User({
        fullname: req.body.fullname,
        email: req.body.email.toLowerCase(),
        createdAt: req.body.createdAt,
        imageURL: req.body.image,
        address: req.body.address,
        phone: req.body.phone,
        files: req.body.files,
        messageList: req.body.messageList,
        password: myEncrpytedPass,
        code: code.toLowerCase(),
      });
      await newUser.save();
      res.json({
        code: 200,
        message: "success",
      });

      var mailOptions = {
        from: ' "Contact Support" <ndlcompany335@gmail.com>',
        to: req.body.email,
        subject: "Registration authentication code",
        html: `
        <div> 
         <p style="width:fit-content;margin:10px auto">This is your authentication code, please do not share it with anyone</p>
         <div style="display:flex;justify-content:center;margin:10px 0px"><img style="width:70%;margin:auto" src="https://blog.cdn.cmarix.com/blog/wp-content/uploads/2021/02/Why-it-is-Best-time-to-launch-an-app-like-whatsapp-1.png" alt="Italian Trulli"></div>
         <h1 style="color:red;margin:10px auto; width:fit-content">${code.toUpperCase()}</h1>
        </div>
        `,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log("lỗi : " + error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    } catch (error) {
      res.json({
        code: 400,
        message: error,
      });
      console.log("LỖI" + error);
    }
  },

  validationCode: async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email.toLowerCase() });
    if (user) {
      const verity = await User.findOne({
        email: req.body.email.toLowerCase(),
        code: req.body.code.toLowerCase(),
      });
      if (verity) {
        res.json({ code: 200, message: "Authentication successful" });
      } else {
        res.json({ code: 400, message: "Authentication code is incorrect" });
      }
    }
  },

  getOne: async (req, res, next) => {
    await User.findOne({ googleID: req.params.id })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => next(err));
  },
  getStaff: async (req, res, next) => {
    await User.find({ role: "staff" })
      .then((staffs) => res.json(staffs))
      .catch((err) => next(err));
  },
  getAdmin: async (req, res, next) => {
    await User.find({ role: "admin" })
      .then((admins) => res.json(admins))
      .catch((err) => next(err));
  },
  updateUser: async (req, res, next) => {
    try {
      const newUser = await User.findOneAndUpdate(
        { googleID: req.params.id },
        {
          role: req.body.role,
          employeeType: req.body.employeeType,
        },
        {
          new: true,
        }
      );
      if (newUser) {
        res.json({ code: 200, message: newUser });
      } else {
        res.json({ code: 400, message: "error" });
      }
    } catch (error) {
      res.json({ code: 400, message: "LỖI : " + error });
    }
  },
};

module.exports = userController;
