const express = require("express"),
  router = express.Router(),
  emailController = require("../controllers/email.controller");

router.post("/email/my-website/contact", emailController.sendContactEmail);

module.exports = router;
