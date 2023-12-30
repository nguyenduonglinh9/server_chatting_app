const express = require("express");
const router = express.Router();
const validationController = require("../controllers/ValidationController");
// const middleWareAuth = require("../middlewares/auth");

router.use("/socialid/:socialid", validationController.validationSocial);
router.use("/email/:email", validationController.validationEmail);

module.exports = router;
