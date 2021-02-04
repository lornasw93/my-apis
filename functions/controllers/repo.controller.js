var config = require("../config"),
    axios = require("axios"),
    cheerio = require("cheerio");

exports.getRepos = (req, res) => {
  res.set("Cache-Control", "public, max-age=300, s-maxage=600");

  var username = req.params.username;

  axios({
    method: "get",
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      Authorization: `Bearer ${config.githubToken}`,
      "Content-Type": "application/json",
      Accept: "application/vnd.github.mercy-preview+json", // MUST ADD TO INCLUDE TOPICS
    },
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.send(err);
    });
};
 
exports.getReadme = (req, res) => {
  var repo = req.params.name;
  var username = req.params.username;

  axios({
    method: "get",
    url: `https://github.com/${username}/${repo}/blob/master/README.md`
  })
    .then((response) => {
      const data = response.data;
      const $ = cheerio.load(data);
      const article = $("article").html();
      res.send(article);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.getRepoCount = (req, res) => {
  var username = req.params.username;

  res.set("Cache-Control", "public, max-age=300, s-maxage=600");

  axios({
    method: "get",
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      Authorization: `Bearer ${config.githubToken}`,
      "Content-Type": "application/json",
      Accept: "application/vnd.github.mercy-preview+json", // MUST ADD TO INCLUDE TOPICS
    },
  })
    .then((resp) => {
      if (resp.data) {
        var count = Object.entries(resp.data).length;

        res.send({ 'count': count });
      }
    })
    .catch((err) => {
      res.send(err);
    }); 
};
