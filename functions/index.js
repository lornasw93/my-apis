const functions = require("firebase-functions"),
  express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  nodemailer = require("nodemailer"),
  config = require("./config"),
  repoRoutes = require("./routes/repo.routes"),
  //emailRoutes = require('./routes/email.routes');
  blogRoutes = require("./routes/blog.routes"),
  textMessageRoutes = require("./routes/text.message.routes"),
  clickyRoutes = require("./routes/clicky.routes");

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

// setup routes (to be extracted into a separate file)
app.get("/api/repos/:username", repoRoutes);
app.get("/api/:username/repo/:name/readme", repoRoutes);
app.get("/api/repos/count/:username", repoRoutes);
app.get("/api/posts/:username", blogRoutes);
app.get("/api/posts/count/:username", blogRoutes);
app.get("/api/sms:body", textMessageRoutes);
app.get("/api/clicky/actions-downloads", clickyRoutes);

//TODO setup route for emails too
app.post("/api/email/my-website/contact", cors(corsOptions), function (req, res) {
  var text = `<p><b>${req.body.name}</b> has filled out the contact form on https://lorna.dev/contact. The details are:</p>
    <p><b>Email</b>: ${req.body.email}</p>
    <p><b>Message</b>: ${req.body.message}</p>`;

  var transporter = nodemailer.createTransport(
    `smtps://${config.fromEmail}:${config.password}@${config.host}`
  );

  const mailOptions = {
    from: `"${config.fromName}" <${config.fromEmail}>`,
    to: config.toEmail,
    subject: "Form Submitted from https://lorna.dev/contact",
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

exports.app = functions.https.onRequest(app);
