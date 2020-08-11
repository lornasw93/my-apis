const express = require("express");
const router = express.Router();
const repoController = require("../controllers/repo.controller");

router.get('/repos', repoController.getRepos);
router.get('/repo/:name/readme', repoController.getReadme);
 
module.exports = router;
