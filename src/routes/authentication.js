const express = require("express");
const router = express.Router();
const authenController = require("../controllers/AuthenController");
const fileUpload = require("../configs/Cloudinary/index");
// const middleWareAuth = require("../middlewares/auth");

// router.use("/update/:id", middleWareAuth, userController.updateUser);
// router.use("/admin", middleWareAuth, userController.getAdmin);
// router.use("/staff", middleWareAuth, userController.getStaff);
// router.use("/:id", middleWareAuth, userController.getOne);
router.use("/signup", fileUpload.single("image"), authenController.signUp);

module.exports = router;
