const sgMail = require('@sendgrid/mail');

module.exports = async (mail) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    from: process.env.MAILER_USER,
    to: mail.subscriberMail,
    subject: mail.mailSubject,
    html: mail.mailBody,
  };

  const result = await sgMail.send(msg);
  return result;
};
