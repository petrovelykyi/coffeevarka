const express = require('express');
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('./config/config');
const { orderConfirmation } = require('./helpers/templates/mailBodyTemplates');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Mail = require('../models/Mail');

const router = express.Router();

router.get('/',
  passport.authenticate('jwt', {
    session: false,
  }),
  async (req, res) => {
    try {
      const payload = jwt.verify(req.cookies.jwt, config.jwt.secret);
      const orders = await Order.find({ recipientId: payload.user })
        .sort('-purchaseDate')
        .select('-__v');
      if (orders) {
        res.status(200).send(orders);
      } else {
        res.status(204).send();
      }
    } catch (e) {
      res.status(500).send(e);
    }
  });

router.post('/',
  [
    body('orderItems').isArray().not().isEmpty(),
    body('recipient').not().isEmpty(),
    body('totalAmount').isNumeric().not().isEmpty(),
    body('delivery').isString().not().isEmpty(),
    body('deliveryPayment').isNumeric().not().isEmpty(),
    body('paymentMethod').isString().not().isEmpty(),
    body('payment').isNumeric().not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json(errors);
    } else {
      try {
        const newOrder = new Order(req.body);
        newOrder.purchaseDate = Date.now();
        if (req.cookies.jwt) {
          const payload = jwt.verify(req.cookies.jwt, config.jwt.secret);
          if (payload.user) {
            newOrder.recipientId = payload.user;
          }
        }
        const savedOrder = await newOrder.save();
        // let mail = {};
        if (savedOrder.paymentMethod === 'cache') {
          const mail = new Mail({
            subscriberMail: savedOrder.recipient.email,
            mailSubject: 'Підтвердження замовлення у магазині "CoffeeVarka"',
            mailBody: orderConfirmation(savedOrder, false),
          });
          await mail.save();
        }
        res.status(200).send({
          orderNumber: savedOrder.orderNumber,
          purchaseDate: savedOrder.purchaseDate,
        });
        await Cart.deleteOne({ _id: newOrder.recipientId });
      } catch (err) {
        res.status(400).send({ errorMessage: 'Помилка на сервері!', err });
      }
    }
  });

module.exports = router;
