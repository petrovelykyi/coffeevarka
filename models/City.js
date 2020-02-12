const mongoose = require('mongoose');

const { Schema } = mongoose;

const CitySchema = new Schema(
  {
    checked: {
      type: Boolean,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  { strict: true },
);

module.exports = mongoose.model('City', CitySchema);
