const express = require('express');
const router = express.Router();
const textMessageController = require('../controllers/text.message.controller');

router.get('/api/sms:body', textMessageController.sendText); 

module.exports = router;
