const express = require("express"),
      router = express.Router(),
      blogController = require('../controllers/blog.controller');

router.get('/api/posts/:username', blogController.getAllPosts); 
router.get('/api/posts/count/:username', blogController.getPostCount); 

module.exports = router;
