const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");
const middleWareAuth = require("../middlewares/auth");

router.use("/findOne/:_id", middleWareAuth, userController.getProfile);
router.use("/find", middleWareAuth, userController.findUsers);
router.use("/", userController.getAll);

module.exports = router;
