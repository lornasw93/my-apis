var axios = require("axios"),
  cheerio = require("cheerio");

exports.getRepos = (req, res) => {
  res.set("Cache-Control", "public, max-age=300, s-maxage=600");

  axios({
    method: "get",
    url: `https://api.github.com/users/lornasw93/repos`,
    headers: {
      Authorization: process.env.GITHUB_TOKEN,
      "Content-Type": "application/json",
      Accept: "application/vnd.github.mercy-preview+json", // ❗ must add to include topics aka tags
    },
  }).then((response) => {
    if (response.data != null) {

      // 😇 bit of a bodge, as I believe not able to get a list of pinned repos via GitHub API currently... so manually filtering the ones I want instead
      var repos = response.data.filter(x => x.name == 'my-website'
        || x.name == 'my-apis'
        || x.name == 'devops-analysis-tool'
        || x.name == 'test-results-parser');

      res.send(repos);
    }
    else {
      res.status(404).send('None found');
    }
  }).catch((err) => {
    res.status(500).send('Error with retrieving repos');
  });
};

exports.getReadme = (req, res) => {
  var repo = req.params.name;

  axios({
    method: "get",
    url: `https://github.com/lornasw93/${repo}/blob/master/README.md`
  }).then((response) => {
    if (response.data != null) {
      const $ = cheerio.load(response.data);
      const article = $("article").html();
      res.send(article);
    } else {
      res.status(404).send('Not found');
    }
  }).catch((err) => {
    res.status(500).send('Error with retrieving readme');
  });
};

exports.getRepoCount = (req, res) => {
  res.set("Cache-Control", "public, max-age=300, s-maxage=600");

  axios({
    method: "get",
    url: `https://api.github.com/users/lornasw93/repos`,
    headers: {
      Authorization: process.env.GITHUB_TOKEN,
      "Content-Type": "application/json",
      Accept: "application/vnd.github.mercy-preview+json", // MUST ADD TO INCLUDE TOPICS
    },
  }).then((resp) => {
    if (resp.data) {
      res.send({ 'count': Object.entries(resp.data).length });
    }
    else {
      res.status(404).send('Not found');
    }
  }).catch((err) => {
    res.status(500).send('Error with retrieving repo count');
  });
};