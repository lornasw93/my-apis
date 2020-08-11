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
