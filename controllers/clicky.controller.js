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

// CV Downloads:

// https://api.clicky.com/api/stats/4?site_id=${process.env.CLICKY_SITE_ID}&sitekey=${process.env.CLICKY_SITE_KEY}&type=actions-downloads&date=2019
// https://api.clicky.com/api/stats/4?site_id=${process.env.CLICKY_SITE_ID}&sitekey=${process.env.CLICKY_SITE_KEY}&type=actions-downloads&date=2020
// https://api.clicky.com/api/stats/4?site_id=${process.env.CLICKY_SITE_ID}&sitekey=${process.env.CLICKY_SITE_KEY}&type=actions-downloads&date=2021

// Visitors:

// https://api.clicky.com/api/stats/4?site_id=${process.env.CLICKY_SITE_ID}&sitekey=${process.env.CLICKY_SITE_KEY}&type=visitors&date=2019
// https://api.clicky.com/api/stats/4?site_id=${process.env.CLICKY_SITE_ID}&sitekey=${process.env.CLICKY_SITE_KEY}&type=visitors&date=2020
// https://api.clicky.com/api/stats/4?site_id=${process.env.CLICKY_SITE_ID}&sitekey=${process.env.CLICKY_SITE_KEY}&type=visitors&date=2021

// Unique Visitors:

// https://api.clicky.com/api/stats/4?site_id=${process.env.CLICKY_SITE_ID}&sitekey=${process.env.CLICKY_SITE_KEY}&type=visitors-unique&date=2019
// https://api.clicky.com/api/stats/4?site_id=${process.env.CLICKY_SITE_ID}&sitekey=${process.env.CLICKY_SITE_KEY}&type=visitors-unique&date=2020
// https://api.clicky.com/api/stats/4?site_id=${process.env.CLICKY_SITE_ID}&sitekey=${process.env.CLICKY_SITE_KEY}&type=visitors-unique&date=2021
