var axios = require("axios");

exports.getAllPosts = (req, res) => {
  res.set("Cache-Control", "public, max-age=300, s-maxage=600");

  axios
    .get(`https://dev.to/api/articles?username=lornasw93`)
    .then((resp) => {
      res.send(resp.data);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.getPostCount = (req, res) => {
  res.set("Cache-Control", "public, max-age=300, s-maxage=600");

  axios
    .get(`https://dev.to/api/articles?usernamelornasw93`)
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
