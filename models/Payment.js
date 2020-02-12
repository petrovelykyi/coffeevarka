const mongoose = require('mongoose');

const { Schema } = mongoose;

const PaymentSchema = new Schema(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      default: null,
    },
    orderNumber: {
      type: Number,
    },
    purchaseDate: {
      type: Date,
    },
    paymentDate: {
      type: Date,
    },
    payment: {
      type: Number,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  { strict: true },
);

module.exports = mongoose.model('Payment', PaymentSchema);
