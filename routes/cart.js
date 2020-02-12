const express = require('express');
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('./config/config');
const Cart = require('../models/Cart');

const router = express.Router();

/* GET  */
router.get('/',
  passport.authenticate('jwt', {
    session: false,
  }),
  async (req, res) => {
    try {
      const payload = jwt.verify(req.cookies.jwt, config.jwt.secret);
      const orderItems = await Cart.findOne({ userId: payload.user })
        .select('-_id -__v');
      if (orderItems) {
        res.status(200).send(orderItems);
      } else {
        res.status(204).send();
      }
    } catch (e) {
      res.status(500).send(e);
    }
  });


router.post('/',
  [
    body('orderItems').isArray(),
  ],
  passport.authenticate('jwt', {
    session: false,
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json(errors);
    } else {
      try {
        const payload = jwt.verify(req.cookies.jwt, config.jwt.secret);
        const orderItems = JSON.parse(JSON.stringify(req.body));
        const savedItems = await Cart.findOneAndUpdate(
          { userId: payload.user },
          { $set: orderItems },
          { upsert: true, new: true },
        ).select('-_id -__v');
        if (savedItems) {
          res.status(200).send(savedItems);
        }
      } catch (e) {
        console.log(e);
        res.status(400).send({ errorMessage: e });
      }
    }
  });

router.delete('/:id',
  passport.authenticate('jwt', {
    session: false,
  }),
  async (req, res) => {
    try {
      // req.params.id
      const payload = jwt.verify(req.cookies.jwt, config.jwt.secret);
      const deletedCart = await Cart.deleteOne(
        { userId: payload.user },
      );
      if (deletedCart.deletedCount) {
        res.status(200).send({ deletedCount: deletedCart.deletedCount });
      } else {
        res.status(404).send();
      }
    } catch (e) {
      console.log(e);
      res.status(422).send({ errorMessage: e });
    }
  });

module.exports = router;
