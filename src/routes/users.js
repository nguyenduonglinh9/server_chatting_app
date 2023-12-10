const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");
// const middleWareAuth = require("../middlewares/auth");

// router.use("/update/:id", middleWareAuth, userController.updateUser);
// router.use("/admin", middleWareAuth, userController.getAdmin);
// router.use("/staff", middleWareAuth, userController.getStaff);
// router.use("/:id", middleWareAuth, userController.getOne);
router.use("/create", userController.createOne);
router.use("/", userController.getAll);

module.exports = router;
