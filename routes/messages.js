const express = require('express');
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const Message = require('../models/Message');
const { captchaMiddleware } = require('./middleware');

const router = express.Router();

router.get('/',
  passport.authenticate('jwt', {
    session: false,
  }),
  async (req, res) => {
    try {
      const messages = await Message.find({})
        .select('-__v');
      if (messages) {
        res.status(200).send(messages);
      } else {
        res.status(204).send([]);
      }
    } catch (e) {
      res.status(500).send(e);
    }
  });

router.post('/',
  [
    body('fullName').isString().not().isEmpty(),
    body('email').isEmail().not().isEmpty(),
    body('subject').isString().not().isEmpty(),
    body('text').isString().not().isEmpty(),
  ],
  captchaMiddleware('message'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json(errors);
    } else {
      try {
        const newMessage = new Message(req.body);
        newMessage.received = Date.now();
        await newMessage.save();
        res.status(200).send();
      } catch (err) {
        res.status(500).send({ errorMessage: 'Помилка на сервері!', err });
      }
    }
  });

module.exports = router;
