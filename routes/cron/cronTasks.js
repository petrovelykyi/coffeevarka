const cron = require('node-cron');
const Mail = require('../../models/Mail');
const sendMail = require('../helpers/sgMailSender');

const sendMails = async () => {
  const mailQueue = await Mail.find({
    isSent: false,
    attempt: { $lte: 10 },
  });

  for (const mail of mailQueue) {
    try {
      const sentMail = await sendMail(mail);
      if (parseInt(sentMail[0].statusCode, 10) === 202) {
        await Mail.findOneAndUpdate(
          { _id: mail._id },
          { $set: { isSent: true } },
          { upsert: true, new: true },
        );
      } else {
        await Mail.findOneAndUpdate(
          { _id: mail._id },
          { $set: { attempt: mail.attempt + 1 } },
          { upsert: true, new: true },
        );
      }
    } catch (e) {
      console.log(e);
    }
  }
};

const cronTaskMailSender = () => cron.schedule('* * * * *', async () => {
  await sendMails();
});

module.exports = {
  cronTaskMailSender,
};
