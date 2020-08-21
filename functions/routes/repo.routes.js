const express = require("express");
const router = express.Router();
const repoController = require("../controllers/repo.controller");

router.get('/repos/:username', repoController.getRepos);
router.get('/:username/repo/:name/readme', repoController.getReadme);
 
module.exports = router;
