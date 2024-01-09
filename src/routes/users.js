const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");
// const middleWareAuth = require("../middlewares/auth");

router.use("/find", userController.findUsers);
router.use("/", userController.getAll);

module.exports = router;
