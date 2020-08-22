const express = require("express");
const router = express.Router();
const repoController = require("../controllers/repo.controller");

router.get('/api/repos/:username', repoController.getRepos);
router.get('/api/:username/repo/:name/readme', repoController.getReadme); 
router.get('/api/repos/count/:username', repoController.getRepoCount);

module.exports = router;
