var axios = require("axios");

exports.getAllPosts = (req, res) => {
  res.set("Cache-Control", "public, max-age=300, s-maxage=600");

  axios
    .get(`https://dev.to/api/articles?username=lornasw93`)
    .then((response) => {
      if (response.data != null) {
        res.send(response.data.slice(0, 4));
      }
      else {
        res.status(404).send('None found');
      }
    }).catch((err) => {
      res.status(500).send('Error with retrieving posts');
    });
};

exports.getPostCount = (req, res) => {
  res.set("Cache-Control", "public, max-age=300, s-maxage=600");

  axios
    .get(`https://dev.to/api/articles?username=lornasw93`)
    .then((response) => {
      if (response.data) {
        res.send({ 'count': Object.entries(response.data).length });
      }
      else {
        res.status(404).send('Not found');
      }
    }).catch((err) => {
      res.status(500).send('Error with retrieving post count');
    });
};