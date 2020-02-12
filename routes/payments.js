const express = require('express');
const { body, validationResult } = require('express-validator');
const Order = require('../models/Order');
const Payment = require('../models/Payment');
const Mail = require('../models/Mail');
const { orderConfirmation } = require('./helpers/templates/mailBodyTemplates');

const router = express.Router();

// DummyCard
const isCardValid = (req) => {
  const card = {
    cardNumber: '4242424242424242',
    expiry: '0122',
    cvv: '123',
  };
  return req.body.cardNumber === card.cardNumber
    && req.body.expiry === card.expiry
    && req.body.cvv === card.cvv;
};

router.post('/',
  [
    body('cardNumber').isLength({ min: 16, max: 16 }),
    body('expiry').isLength({ min: 4, max: 4 }),
    body('cvv').isLength({ min: 3, max: 3 }),
    body('orderNumber').isNumeric().not().isEmpty(),
    body('payment').isNumeric().not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).send(errors);
    } else {
      try {
        const order = await Order.findOne({
          orderNumber: req.body.orderNumber,
          payment: req.body.payment,
        });
        if (order) {
          if (isCardValid(req)) {
            const newPayment = new Payment(req.body);
            newPayment.orderId = order._id;
            newPayment.purchaseDate = order.purchaseDate;
            newPayment.paymentDate = Date.now();
            newPayment.isPaid = true;
            const savedPayment = await newPayment.save();
            if (savedPayment) {
              const mail = new Mail({
                subscriberMail: order.recipient.email,
                mailSubject: 'Підтвердження замовлення у магазині "CoffeeVarka"',
                mailBody: orderConfirmation(order, savedPayment.isPaid),
              });
              await mail.save();
            }
            res.status(200).send(savedPayment);
          } else {
            res.status(422).send({ errorMessage: 'Не вірні параметри платіжної картки!' });
          }
        } else {
          res.status(422).send({ errorMessage: 'Не вдалося знайти замовлення, за яке ви сплачуєте!' });
        }
      } catch (err) {
        res.status(400).send({ errorMessage: 'Помилка на сервері!' });
      }
    }
  });

module.exports = router;
