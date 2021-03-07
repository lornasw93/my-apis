const express = require("express"),
      router = express.Router(),
      textMessageController = require('../controllers/text.message.controller');

router.get('/api/sms:body', textMessageController.sendText); 

module.exports = router;
