const express = require("express"),
      router = express.Router(),
      repoController = require("../controllers/repo.controller");

router.get('/api/repos/:username', repoController.getRepos);
router.get('/api/:username/repo/:name/readme', repoController.getReadme); 
router.get('/api/repos/count/:username', repoController.getRepoCount);

module.exports = router;
