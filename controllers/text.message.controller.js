const client = require("twilio")(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

exports.sendText = (req, res) => {
  client.messages
    .create({
      body: req.query.body,
      from: process.env.TWILIO_FROM_NUMBER,
      to: process.env.TWILIO_TO_NUMBER
    })
    .then((message) => res.send(message.sid))
    .catch((err) => {
      res.send(err);
    });
};
