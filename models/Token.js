const mongoose = require('mongoose');

const { Schema } = mongoose;

const TokenSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    token: {
      type: String,
      index: true,
      unique: true,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { strict: true },
);

module.exports = mongoose.model('Token', TokenSchema);
