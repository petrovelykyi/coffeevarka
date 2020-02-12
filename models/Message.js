const mongoose = require('mongoose');

const { Schema } = mongoose;

const MessageSchema = new Schema(
  {
    fullName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    subject: {
      type: String,
      required: false,
    },
    text: {
      type: String,
      required: false,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    received: {
      type: Date,
      required: false,
    },
  },
  { strict: true },
);

module.exports = mongoose.model('Message', MessageSchema);
