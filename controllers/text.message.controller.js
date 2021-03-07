const aws = require('aws-sdk');

let config = new aws.S3({
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
  fromNumber: process.env.TWILIO_FROM_NUMBER,
  myNumber: process.env.TWILIO_TO_NUMBER
});

const client = require("twilio")(config.accountSid, config.authToken);

exports.sendText = (req, res) => {
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
};
