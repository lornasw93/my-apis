const express = require('express');
const router = express.Router();
const clickyController = require('../controllers/clicky.controller');

router.get('/api/clicky/downloads', clickyController.getDownloadsCount); 

module.exports = router;
