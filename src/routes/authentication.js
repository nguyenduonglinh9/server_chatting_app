const express = require("express");
const router = express.Router();
const authenController = require("../controllers/AuthenController");
const middleWareAuth = require("../middlewares/auth");

router.use("/changepassword", authenController.changepassword);
router.use("/forgotpassword", authenController.forgotpassword);
router.use("/login", authenController.loginDefault);
router.use("/social", authenController.socialAuthen);
router.use("/verity", authenController.validationCode);
router.use("/signup", authenController.signUp);

module.exports = router;
