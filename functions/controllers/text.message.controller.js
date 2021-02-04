const config = require("../config"),
      client = require("twilio")(config.accountSid, config.authToken);

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
