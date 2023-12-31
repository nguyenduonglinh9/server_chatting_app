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
        type: "social",
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
        type: "default",
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
    const user = await User.findOne({
      email: req.body.email.toLowerCase(),
      type: "default",
    });
    if (user) {
      if (user.code == req.body.code.toLowerCase()) {
        res.json({
          code: 200,
          message: "Authentication successful",
        });
      } else {
        res.json({ code: 400, message: "Authentication code is incorrect" });
      }
    }
  },

  loginDefault: async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email, type: "default" });
    if (user) {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (validPassword) {
        res.json({ code: 200, message: "Logged in successfully" });
      } else {
        res.json({ code: 400, message: "Incorrect email or password" });
      }
    } else {
      res.json({ code: 400, message: "Incorrect email or password" });
    }
  },

  forgotpassword: async (req, res, next) => {
    const code = Math.random().toString(36).substring(3, 9);
    const filter = { email: req.body.email.toLowerCase(), type: "default" };
    try {
      const user = await User.findOneAndUpdate(
        filter,
        { code: code },
        { new: true }
      );
      res.json({
        code: 200,
        message: "Update Code Successfully",
        result: user,
      });
      var mailOptions = {
        from: ' "Contact Support" <ndlcompany335@gmail.com>',
        to: req.body.email,
        subject: "Registration authentication code",
        html: `
        <div>
         <div style="background-image:url(https://res.cloudinary.com/dznigtf2h/image/upload/v1703929900/Downloader.la_-658fe61f1129b_uqdkke.jpg);width:40%;margin:auto;padding:40px;">
           <img style="border-radius:50%; width:15%;height:15%;display:block;margin-left:auto;margin-right:auto;margin-top:15;margin-bottom:15" src="https://res.cloudinary.com/dznigtf2h/image/upload/v1703931250/Downloader.la_-658fed548a765_rpsjtw.jpg" alt="Girl in a jacket">
           <h1 style="font-size:32px;font-weight:500;line-height:39px;margin:25px auto;text-align:center;color:black";>Authentication Code</h1>
           <div style="width:70%;background-color:white;margin-left:auto;margin-right:auto;margin-top:15px;margin-bottom:15px;padding:10px">
             <p style="width:fit-content;margin:15px auto;font-size:18px;font-weight:500;line-height:25px;color:#666666">Here is your approval code:</p>
             <h1 style="color:red;margin:10px auto; width:fit-content;margin-top:15px;margin-bottom:15px;letter-spacing:5px;">${code.toUpperCase()}</h1>
           </div>
         </div>
        </div>
        `,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.json({
            code: 400,
            message: error,
          });
          console.log("lỗi : " + error);
        } else {
          res.json({
            code: 200,
            message: "Email sent: " + info.response,
          });
          console.log("Email sent: " + info.response);
        }
      });
    } catch (error) {
      res.json({
        code: 400,
        message: error,
      });
    }
  },

  changepassword: async (req, res, next) => {
    var salt = await bcrypt.genSalt(10);
    try {
      const user = await User.findByIdAndUpdate(
        req.body.id,
        {
          password: await bcrypt.hash(req.body.password, salt),
        },
        {
          new: true,
        }
      );
      res.json({
        code: 200,
        message: "Password changed successfully",
        result: user,
      });
    } catch (error) {
      res.json({
        code: 400,
        message: error,
      });
    }
  },
};

module.exports = userController;
