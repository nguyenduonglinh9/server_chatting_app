const express = require("express");
const router = express.Router();
const authenController = require("../controllers/AuthenController");
// const middleWareAuth = require("../middlewares/auth");

// router.use("/update/:id", middleWareAuth, userController.updateUser);
// router.use("/admin", middleWareAuth, userController.getAdmin);
// router.use("/staff", middleWareAuth, userController.getStaff);
// router.use("/:id", middleWareAuth, userController.getOne);
router.use("/signup", authenController.signUp);

module.exports = router;
