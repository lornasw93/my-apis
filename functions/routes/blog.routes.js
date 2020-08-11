const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog.controller');

router.get('/posts/:username', blogController.getAllPosts); 

module.exports = router;
