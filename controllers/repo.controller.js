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
      Accept: "application/vnd.github.mercy-preview+json", // MUST ADD TO INCLUDE TOPICS
    },
  }).then((response) => {

    // var filter = [
    //   'my-apis', 'my-website', 'api-the-musical-kind', 'xml-to-map', 'csv-to-map', 'devops-api-tool.frontend', 'devops-api-tool.backend'
    // ];

    // var repos = response.data.filter((item) => {
    //   for (var key in filter) {
    //     if (item[key] === undefined || item[key] != filter[key])
    //       return false;
    //   }
    //   return true;
    // });

    res.send(response.data);

  }).catch((err) => {
    res.send(err);
  });
};

exports.getReadme = (req, res) => {
  var repo = req.params.name;

  axios({
    method: "get",
    url: `https://github.com/lornasw93/${repo}/blob/master/README.md`
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
  res.set("Cache-Control", "public, max-age=300, s-maxage=600");

  axios({
    method: "get",
    url: `https://api.github.com/users/lornasw93/repos`,
    headers: {
      Authorization: process.env.GITHUB_TOKEN,
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
