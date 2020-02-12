const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      index: true,
      unique: true,
      dropDups: true,
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    street: {
      type: String,
      required: false,
    },
    house: {
      type: String,
      required: false,
    },
    apartment: {
      type: String,
      required: false,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  { strict: true },
);

UserSchema.methods.verifyPassword = function (value) {
  return bcrypt.compareSync(value, this.passwordHash);
};

module.exports = mongoose.model('User', UserSchema);
