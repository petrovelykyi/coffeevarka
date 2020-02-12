const nodemailer = require('nodemailer');

// Doesn't work from Heroku
module.exports = async (mail) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    secure: false,
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASSWORD,
    },
    debug: true, // show debug output
    logger: true, // log information in console
  });

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: mail.subscriberMail,
    subject: mail.mailSubject,
    html: mail.mailBody,
  };

  const result = await transporter.sendMail(mailOptions);
  return result;
};
