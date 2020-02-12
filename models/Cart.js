const mongoose = require('mongoose');

const { Schema } = mongoose;

const CartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderItems: {
      type: Array,
      required: true,
    },
  },
  { strict: true },
);

CartSchema.index(
  { userId: 1 },
  { unique: true },
);

module.exports = mongoose.model('Cart', CartSchema, 'cart');
