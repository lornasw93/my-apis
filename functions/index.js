var functions = require("firebase-functions");
var express = require("express");

const app = express();
var cors = require("cors"),
  bodyParser = require("body-parser"),
  config = require("./config"),
  axios = require("axios"),
  nodemailer = require("nodemailer");

const cheerio = require("cheerio");
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

function setCache(response) {
  response.set("Cache-Control", "public, max-age=300, s-maxage=600");
}

const username = "lornasw93";

app.get("/repos", (req, res) => {
  setCache(res);

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

app.get("/repo/:name/readme", (request, res) => {
  var repo = request.params.name;

  axios({
    method: "get",
    url: `https://github.com/lornasw93/${repo}/blob/master/README.md`
  })
    .then((response) => {
      const htmlString = response.data;
      const $ = cheerio.load(htmlString);
      const pText = $("article").html();
      res.send(pText);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post(
  "/email/my-website/contact",
  cors(corsOptions),
  (request, response) => {
    var text = `<p><b>${request.body.name}</b> has filled out the contact form on https://lorna.dev/contact. The details are:</p>
                <p><b>Email</b>: ${request.body.email}</p>
                <p><b>Message</b>: ${request.body.message}</p>`;

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
      response.status(200).send({
        message: "success",
      });
    });
  }
);

app.post(
  "/email/mikes-flooring/contact",
  cors(corsOptions),
  (request, response) => {
    var text = `<p><b>${request.body.name}</b> has filled out the contact form on https://mikesflooring.co.uk/contact. The details are:</p>
              <p><b>Email</b>: ${request.body.email}</p>
              <p><b>Phone</b>: ${request.body.phone}</p>
              <p><b>Service</b>: ${request.body.service}</p>
              <p><b>Message</b>: ${request.body.message}</p>`;

    var transporter = nodemailer.createTransport(
      `smtps://${config.fromEmail}:${config.password}@${config.host}`
    );

    const mailOptions = {
      from: `"${config.fromName}" <${config.fromEmail}>`,
      to: config.toEmail,
      subject: `Form Submitted from https://mikesflooring.co.uk/contact`,
      html: text,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      }
      response.status(200).send({
        message: "success",
      });
    });
  }
);

app.get("/posts", (req, res) => {
  setCache(res);

  axios
    .get(`https://dev.to/api/articles?username=${username}`)
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
