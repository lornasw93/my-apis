const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  nodemailer = require("nodemailer"),
  repoRoutes = require("./routes/repo.routes"),
  blogRoutes = require("./routes/blog.routes"),
  aws = require('aws-sdk');

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
 
app.get("/api/repos", repoRoutes);
app.get("/api/repo/:name/readme", repoRoutes);
app.get("/api/repos/count", repoRoutes);
app.get("/api/posts", blogRoutes);
app.get("/api/posts/count", blogRoutes);

let config = new aws.S3({
    host: process.env.SMTP_HOST,
    password: process.env.SMTP_PASSWORD,
    fromEmail: process.env.SMTP_FROM_EMAIL,
    fromName: process.env.SMTP_FROM_NAME,
    toEmail: process.env.SMTP_TO_EMAIL
});
 
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

var port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server has started listening on port ${port}`);
});