const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog.controller');

router.get('/api/posts/:username', blogController.getAllPosts); 
router.get('/api/posts/count/:username', blogController.getPostCount); 

module.exports = router;
