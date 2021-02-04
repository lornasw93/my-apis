var config = require("../config"),
    nodemailer = require("nodemailer");

exports.sendContactEmail = (req, res) => { 
    var text = `<p><b>${req.body.name}</b> has filled out the contact form on https://lorna.dev/contact. The details are:</p>
      <p><b>Email</b>: ${req.body.email}</p>
      <p><b>Message</b>: ${req.body.message}</p>`;
  
    var transporter = nodemailer.createTransport(
      `smtps://${config.fromEmail}:${config.password}@${config.host}`
    );
  
    const mailOptions = {
      from: `"${config.fromName}" <${config.fromEmail}>`,
      to: config.toEmail,
      subject: 'Form Submitted from https://lorna.dev/contact',
      html: text,
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      }
  
      res.status(200).send({
        message: 'success',
      });
    });  
};
