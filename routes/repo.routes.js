const express = require("express"),
      router = express.Router(),
      repoController = require("../controllers/repo.controller");

router.get('/api/repos/', repoController.getRepos);
router.get('/api/repo/:name/readme', repoController.getReadme); 
router.get('/api/repos/count', repoController.getRepoCount);

module.exports = router;
