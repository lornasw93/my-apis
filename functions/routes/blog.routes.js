const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog.controller');

router.get('/posts/:username', blogController.getAllPosts); 

router.get('/posts/count/:username', blogController.getPostCount); 

module.exports = router;
