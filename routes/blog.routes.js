const express = require("express"),
      router = express.Router(),
      blogController = require('../controllers/blog.controller');

router.get('/api/posts/', blogController.getAllPosts); 
router.get('/api/posts/count', blogController.getPostCount); 

module.exports = router;
