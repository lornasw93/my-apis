const express = require('express');
const router = express.Router();
const clickyController = require('../controllers/clicky.controller');

router.get('/clicky/actions-downloads', clickyController.getDownloadsCount); 

module.exports = router;
