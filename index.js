const express = require("express"),
  app = express(),
  cors = require("cors"),
  nodemailer = require("nodemailer"),
  repoRoutes = require("./routes/repo.routes"),
  blogRoutes = require("./routes/blog.routes"),
  bodyParser = require("body-parser");
  
require('dotenv').config();

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

app.post("/api/email/contact", cors(corsOptions), function (req, res) {
  var text = `<p><b>${req.body.name}</b> has filled out the contact form on https://lorna.dev/contact. The details are:</p>
    <p><b>Email</b>: ${req.body.email}</p>
    <p><b>Message</b>: ${req.body.message}</p>`;

  var transporter = nodemailer.createTransport(
    `smtps://${process.env.SMTP_FROM_EMAIL}:${process.env.SMTP_PASSWORD}@${process.env.SMTP_HOST}`
  );

  const mailOptions = {
    from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
    to: process.env.SMTP_TO_EMAIL,
    subject: "Form Submitted from https://lorna.dev/contact",
    html: text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.status(500).send('Error sending email');
    }

    res.status(200).send({
      message: "success",
    });
  });
});

var port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});