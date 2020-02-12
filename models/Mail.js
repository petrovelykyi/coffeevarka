const mongoose = require('mongoose');

const { Schema } = mongoose;

const MailSchema = new Schema(
  {
    subscriberMail: {
      type: String,
      required: true,
    },
    mailSubject: {
      type: String,
      required: true,
    },
    mailBody: {
      type: String,
      required: true,
    },
    isSent: {
      type: Boolean,
      default: false,
    },
    attempt: {
      type: Number,
      default: 0,
    },
  },
  { strict: true },
);

module.exports = mongoose.model('Mail', MailSchema);
