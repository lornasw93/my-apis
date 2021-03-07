const express = require("express"),
      router = express.Router(),
      clickyController = require('../controllers/clicky.controller');

router.get('/api/clicky/downloads', clickyController.getDownloadsCount); 

module.exports = router;
