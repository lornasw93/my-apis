var functions = require('firebase-functions');
var express = require('express');

const app = express();

var cors = require("cors"),
    bodyParser = require('body-parser'),
    config = require('./config'),
    axios = require('axios');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.get("/repos", (req, res) => {
    axios({
        method: "get",
        url: `https://api.github.com/users/${config.githubUsername}/repos`,
        headers: {
            Authorization: `Bearer ${config.githubToken}`,
            "Content-Type": "application/json",
            "Accept": "application/vnd.github.mercy-preview+json" // MUST ADD TO INCLUDE TOPICS
        }
    }).then(response => {
        res.send(response.data);
    }).catch(err => {
        res.send(err);
    });
});

exports.app = functions.https.onRequest(app);
