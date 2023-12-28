const User = require("../models/users");
const bcrypt = require("bcrypt");
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
var jwt = require("jsonwebtoken");
const keys = require("../keys/index");

const userController = {
  getAll: async (req, res, next) => {
    await User.find({})
      .then((users) => {
        res.json(users);
      })
      .catch((err) => next(err));
  },

  socialAuthen: async (req, res, next) => {
    try {
      const newUser = new User({
        socialid: req.body.socialid,
        fullname: req.body.fullname,
        email: req.body.email.toLowerCase(),
        createdAt: req.body.createdAt,
        imageURL: req.body.image,
        address: req.body.address,
        phone: req.body.phone,
        files: req.body.files,
        messageList: req.body.messageList,
      });
      await newUser.save();
      res.json({
        code: 200,
        message: "success",
        // access_token: access_token,
      });
    } catch (error) {
      res.json({
        code: 400,
        message: error,
      });
    }
  },
  signUp: async (req, res, next) => {
    var salt = await bcrypt.genSalt(10);
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
        password:
          req.body.password == undefined
            ? null
            : await bcrypt.hash(req.body.password, salt),
        code: code.toLowerCase(),
      });
      await newUser.save();
      const access_token = jwt.sign(
        {
          email: req.body.email,
          fullname: req.body.fullname,
          createdAt: req.body.createdAt,
          imageURL: req.body.image,
        },
        keys.access_token_secret
      );
      res.json({
        code: 200,
        message: "success",
        // access_token: access_token,
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
};

module.exports = userController;
