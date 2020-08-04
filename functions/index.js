var functions = require("firebase-functions");
var express = require("express");

const app = express();

var cors = require("cors"),
  bodyParser = require("body-parser"),
  config = require("./config"),
  axios = require("axios"),
  nodemailer = require("nodemailer");

const client = require("twilio")(config.accountSid, config.authToken);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

const whitelist = ["http://localhost:4200", "https://lorna.dev"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

const username = "lornasw93";

app.get("/repos", (req, res) => {
  axios({
    method: "get",
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      Authorization: `Bearer ${config.githubToken}`,
      "Content-Type": "application/json",
      Accept: "application/vnd.github.mercy-preview+json", // MUST ADD TO INCLUDE TOPICS
    },
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post("/contactEmail", cors(corsOptions), (request, response) => {
  var text = `<p><b>${req.query.name}</b> has filled out the contact form on https://lorna.dev/contact. The details are:</p>
    <p><b>Email</b>: ${req.query.email}</p>
    <p><b>Message</b>: ${req.query.message}</p>`;

  var transporter = nodemailer.createTransport(
    `smtps://${config.fromEmail}:${config.password}@${config.host}`
  );

  const mailOptions = {
    from: `"${config.fromName}" <${config.fromEmail}>`,
    to: config.toEmail,
    subject: `Form Submitted from https://lorna.dev/contact`,
    html: text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    }
    res.status(200).send({
      message: "success",
    });
  });
});

app.get("/blogPosts", (req, res) => {
  axios
    .get(`https://dev.to/api//articles?username=${username}`)
    .then((resp) => {
      res.send(resp.data);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/sms:body", (req, res) => { 
  client.messages
    .create({
      body: req.query.body,
      from: config.fromNumber,
      to: config.myNumber,
    })
    .then((message) => res.send(message.sid))
    .catch((err) => {
        res.send(err);
    });
});

exports.app = functions.https.onRequest(app);
