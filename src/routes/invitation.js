const express = require("express");
const router = express.Router();
const invitationsController = require("../controllers/InvitationsController");
const middleWareAuth = require("../middlewares/auth");

router.use("/create", invitationsController.createOne);

module.exports = router;
