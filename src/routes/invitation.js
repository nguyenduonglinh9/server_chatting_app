const express = require("express");
const router = express.Router();
const invitationsController = require("../controllers/InvitationsController");
const middleWareAuth = require("../middlewares/auth");

router.use("/findByTwoId/", middleWareAuth, invitationsController.findByTwoid);
router.use("/create", middleWareAuth, invitationsController.createOne);

module.exports = router;
