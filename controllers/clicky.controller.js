var axios = require("axios");

exports.getDownloadsCount = (req, res) => {
  axios({
    method: "get",
    url: `http://api.clicky.com/api/stats/4?site_id=${process.env.CLICKY_SITE_ID}&sitekey=${process.env.CLICKY_SITE_KEY}&type=downloads&output=json&date=2020`,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.send(err);
    });
};
