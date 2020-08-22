var axios = require("axios");


exports.getAllPosts = (req, res) => {
  var username = req.params.username;

  res.set("Cache-Control", "public, max-age=300, s-maxage=600");

  axios
    .get(`https://dev.to/api/articles?username=${username}`)
    .then((resp) => {
      res.send(resp.data);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.getPostCount = (req, res) => {
  var username = req.params.username;

  res.set("Cache-Control", "public, max-age=300, s-maxage=600");

  axios
    .get(`https://dev.to/api/articles?username=${username}`)
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
