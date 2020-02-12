const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    orderNumber: {
      type: Number,
    },
    purchaseDate: {
      type: Date,
    },
    orderItems: {
      type: Array,
      required: true,
    },
    recipient: {
      type: Object,
      required: true,
    },
    recipientId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    delivery: {
      type: String,
      required: true,
      enum: ['courier', 'self'],
    },
    deliveryPayment: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ['cache', 'card'],
    },
    payment: {
      type: Number,
      required: true,
    },
  },
  { strict: true },
);

OrderSchema.plugin(AutoIncrement, { inc_field: 'orderNumber', collection_name: 'orders_seq', start_seq: 1110001 });

module.exports = mongoose.model('Order', OrderSchema);
