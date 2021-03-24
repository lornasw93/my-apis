var axios = require("axios");

exports.getAllPosts = (req, res) => {
  res.set("Cache-Control", "public, max-age=300, s-maxage=600");

  axios
    .get(`https://dev.to/api/articles?username=lornasw93`)
    .then((resp) => {
      if (resp.data.length > 0) {
        var r = resp.data.sort((a, b) => {
          return a.public_reactions_count - b.public_reactions_count
        }).reverse();

        var posts = r.slice(0, 10).sort((a, b) => {
          var dateA = new Date(a.created_at), dateB = new Date(b.created_at);
          return dateA.getDate() - dateB.getDate();
        });

        res.send(posts);
      }
    }).catch((err) => {
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
