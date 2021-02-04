var axios = require("axios"),
    config = require("../config");

exports.getDownloadsCount = (req, res) => {
  axios({
    method: "get",
    url: `http://api.clicky.com/api/stats/4?site_id=${config.siteId}&sitekey=${config.siteKey}&type=downloads&output=json&date=2020`,
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
