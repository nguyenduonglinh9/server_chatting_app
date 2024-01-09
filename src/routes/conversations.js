const express = require("express");
const router = express.Router();
const conversationsController = require("../controllers/ConversationsController");
const middleWareAuth = require("../middlewares/auth");

// router.use("/login/social", authenController.loginSocial);
// router.use("/login/default", authenController.loginDefault);
// router.use("/changepassword", authenController.changepassword);
// router.use("/forgotpassword", authenController.forgotpassword);
// router.use("/social", authenController.socialSignUp);
// router.use("/verity", authenController.validationCode);
// router.use("/signup", authenController.defaultsignUp);

module.exports = router;
