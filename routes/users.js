const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const TokenGenerator = require('uuid-token-generator');
const axios = require('axios');
const config = require('./config/config');
const User = require('../models/User');
const Token = require('../models/Token');
const Mail = require('../models/Mail');
const { localStrategy } = require('./config/strategies');
const { userRegistration } = require('./helpers/templates/mailBodyTemplates');
const { captchaMiddleware } = require('./middleware');

const router = express.Router();

localStrategy();

// {
//   "errors": [
//   {
//     "value": "Password!",
//     "msg": "Invalid value",
//     "param": "confirmPassword",
//     "location": "body"
//   }
// ]
// }

// {
//   "errors": {
//   "tokenId": {
//     "message": "Path `tokenId` is required.",
//       "name": "ValidatorError",
//       "properties": {
//       "message": "Path `tokenId` is required.",
//         "type": "required",
//         "path": "tokenId"
//     },
//     "kind": "required",
//       "path": "tokenId"
//   }
// },
//   "_message": "User validation failed",
//   "message": "User validation failed: tokenId: Path `tokenId` is required.",
//   "name": "ValidationError"
// }

// {
//   "driver": true,
//   "name": "MongoError",
//   "index": 0,
//   "code": 11000,
//   "errmsg": "E11000 duplicate key error collection: coffeevarka_test.users index:
//              username_1 dup key: { : \"petro.velykyi@gmail.com\" }"
// }

const hashCost = 10;

// Local user registration
router.post('/register',
  [
    body('username')
      .trim()
      .isEmail()
      .withMessage('Please, provide a valid email address'),
    body('password')
      .trim()
      .exists()
      .withMessage('Password must contain at least 8 characters, including UPPER/lowercase/digits and one special symbol.')
      .isLength({ min: 8, max: 64 })
      .withMessage('Password must contain at least 8 characters, including UPPER/lowercase/digits and one special symbol.')
      .matches(/^(?=.*\d)(?=.*[a-zа-яґіїє])(?=.*[A-ZА-ЯҐІЇЄ])(?=.*[^a-zA-Zа-яА-ЯґҐіІїЇєЄ0-9])(?!.*\s).{8,24}$/)
      .withMessage('Password must contain at least 8 characters, including UPPER/lowercase/digits and one special symbol.'),
    body('confirmPassword')
      .trim()
      .exists()
      .withMessage('Password must contain at least 8 characters, including UPPER/lowercase/digits and one special symbol.')
      .isLength({ min: 8, max: 64 })
      .withMessage('Password must contain at least 8 characters, including UPPER/lowercase/digits and one special symbol.')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords dont match');
        } else {
          return value;
        }
      }),
  ],
  captchaMiddleware('registration'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).send({
        registered: false,
        errorMessage: `${errors.msg} ${errors.param}`,
      });
    } else {
      const { username, password } = req.body;
      try {
        const passwordHash = await bcrypt.hash(password, hashCost);
        const user = new User({
          username,
          passwordHash,
          fullName: '',
          phone: '',
          city: '',
          street: '',
          house: '',
          apartment: '',
          isActive: false,
        });
        const savedUser = await user.save();
        const userToken = new TokenGenerator(256, TokenGenerator.BASE62).generate();
        const token = new Token({
          userId: savedUser._id,
          token: userToken,
          date: Date.now(),
        });
        const savedToken = await token.save();
        if (savedToken.token) {
          const mail = new Mail({
            subscriberMail: savedUser.username,
            mailSubject: 'Підтвердіть створення користувача у магазині "CoffeeVarka"',
            mailBody: userRegistration(req.protocol, req.headers.host, savedToken.token),
          });
          await mail.save();
        }
        res.status(200).send({ registered: true });
      } catch (error) {
        res.status(409).send({
          registered: false,
          errorMessage: 'Користувач з такою електронною адресою вже зареєстрований!',
        });
      }
    }
  });

// Local user authentication
router.post('/login', passport.authenticate('local', {
  session: false,
}), (req, res) => {
  jwt.sign({ user: req.user },
    config.jwt.secret,
    config.jwt.options,
    (err, token) => {
      if (err) return res.status(500).json(err);
      res.cookie(
        'jwt',
        token,
        config.jwt.cookie,
      );
      return res.json({ jwt: token });
    });
});

router.get('/confirm', async (req, res) => {
  if (req.query.token && req.query.token.length === 43) {
    try {
      const token = await Token.findOne({ token: req.query.token });
      if (token) {
        const user = await User.findById(token.userId);
        if (user) {
          user.isActive = true;
          user.save();
          token.delete();
          // res.status(200).send('Ok');
          res.redirect('/profile');
        } else {
          res.status(400).send('User not found!');
        }
      } else {
        res.status(400).send('Token is not valid any more!');
      }
    } catch (error) {
      res.status(400).send(error);
    }
  }
});

// Google users authentication
router.post('/google',
  [
    body('tokenId')
      .exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const { tokenId, profileObj } = req.body;
      const googleUrl = `https://oauth2.googleapis.com/tokeninfo?id_token=${tokenId}`;
      try {
        const responseFromGoogle = await axios.get(googleUrl);
        if (responseFromGoogle.data.email === profileObj.email
            && responseFromGoogle.data.sub === profileObj.googleId) {
          try {
            const user = await User.findOne({ username: responseFromGoogle.data.email });
            if (user) {
              jwt.sign({ user: user._id },
                config.jwt.secret,
                config.jwt.options,
                (err, token) => {
                  if (err) return res.status(500).json(err);
                  res.cookie(
                    'jwt',
                    token,
                    config.jwt.cookie,
                  );
                  return res.status(200).json({ jwt: token });
                });
            } else {
              const newUser = new User({
                username: responseFromGoogle.data.email,
                passwordHash: '######',
                fullName: responseFromGoogle.data.name,
                phone: '',
                city: '',
                street: '',
                house: '',
                apartment: '',
                isActive: true,
              });
              const savedUser = await newUser.save();
              jwt.sign({ user: savedUser._id },
                config.jwt.secret,
                config.jwt.options,
                (err, token) => {
                  if (err) return res.status(500).json(err);
                  res.cookie(
                    'jwt',
                    token,
                    config.jwt.cookie,
                  );
                  return res.status(200).json({ jwt: token });
                });
            }
          } catch (e) {
            console.log('Error: ', e);
          }
        } else {
          res.status(400).send({
            registered: false,
            errorMessage: 'Користувачі не співпадають!',
          });
        }
      } catch (e) {
        res.status(400).send({
          registered: false,
          errorMessage: e.response.data.error_description,
        });
      }
    } else {
      res.status(422).send({
        registered: false,
        errorMessage: 'The length of tokenId must be sufficient!',
      });
    }
  });

// Is users authenticated
router.get('/user',
  passport.authenticate('jwt', {
    session: false,
  }),
  async (req, res) => {
    const payload = jwt.verify(req.cookies.jwt, config.jwt.secret);
    try {
      const user = await User
        .findById(payload.user)
        .select('-_id username');
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(401).send({ errorMessage: 'User is not found.' });
      }
    } catch (e) {
      res.status(401).send({ errorMessage: e });
    }
  });

// Get user profile
router.get('/user/profile',
  passport.authenticate('jwt', {
    session: false,
  }),
  async (req, res) => {
    const payload = jwt.verify(req.cookies.jwt, config.jwt.secret);
    try {
      const user = await User
        .findById(payload.user)
        .select('-_id username fullName phone city street house apartment');
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(401).send({ errorMessage: 'User is not found.' });
      }
    } catch (e) {
      res.status(401).send({ errorMessage: e });
    }
  });

// const cities = await City.find({}).select('-_id -__v');
// if (user && cities) {
//   const data = { ...user._doc, cities };
//   res.status(200).send(data);


// Update user profile
router.put('/user/profile',
  [
    body('username')
      .trim()
      .isEmail()
      .withMessage('Please, provide a valid email address'),
    body('fullName')
      .trim()
      .optional()
      .isLength({ min: 2, max: 100 })
      .withMessage('Field [fullName] must be min 2 max 100 symbols.'),
    body('phone')
      .trim()
      .optional()
      .isLength({ min: 13, max: 13 })
      .withMessage('Field [phone] must be 13 symbols.')
      .matches(/^(\+380)(50|66|67|98|97|96|68|39|63|93|95|99){1}[0-9]{7}$/)
      .withMessage('Field [phone] must be in format: +380#########'),
    body('city')
      .trim()
      .optional()
      .isLength({ max: 100 })
      .withMessage('Field [city] must be max 100 symbols.'),
    body('street')
      .trim()
      .optional()
      .isLength({ max: 100 })
      .withMessage('Field [street] must be max 100 symbols.'),
    body('house')
      .trim()
      .optional()
      .isLength({ max: 64 })
      .withMessage('Field [house] must be max 64 symbols.'),
    body('apartment')
      .trim()
      .optional()
      .isLength({ max: 64 })
      .withMessage('Field [apartment] must be max 64 symbols.'),
  ],
  passport.authenticate('jwt', {
    session: false,
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).send({ errorMessage: errors.errors });
    } else {
      const payload = jwt.verify(req.cookies.jwt, config.jwt.secret);
      try {
        const user = await User.findById(payload.user);
        if (user && user.username === req.body.username) {
          const newUser = JSON.parse(JSON.stringify(req.body));
          delete newUser.passwordHash;
          delete newUser.isActive;
          const updatedUser = await User.findOneAndUpdate(
            { _id: payload.user },
            { $set: newUser },
            { new: true },
          ).select('-_id username fullName phone city street house apartment');
          res.status(200).send(updatedUser);
        } else {
          res.status(401).send({ errorMessage: 'User is not found.' });
        }
      } catch (e) {
        res.status(401).send({ errorMessage: e });
      }
    }
  });

router.put('/user/password',
  [
    body('newPassword')
      .trim()
      .exists()
      .withMessage('Password must contain at least 8 characters, including UPPER/lowercase/digits and one special symbol.')
      .isLength({ min: 8, max: 64 })
      .withMessage('Password must contain at least 8 characters, including UPPER/lowercase/digits and one special symbol.')
      .matches(/^(?=.*\d)(?=.*[a-zа-яґіїє])(?=.*[A-ZА-ЯҐІЇЄ])(?=.*[^a-zа-яґіїєA-ZА-ЯҐІЇЄ0-9])(?!.*\s).{8,24}$/)
      .withMessage('Password must contain at least 8 characters, including UPPER/lowercase/digits and one special symbol.'),
  ],
  passport.authenticate('jwt', {
    session: false,
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).send({ errorMessage: errors.errors[0] });
    } else {
      const payload = jwt.verify(req.cookies.jwt, config.jwt.secret);
      try {
        const { newPassword } = req.body;
        const user = await User.findById(payload.user);
        if (user) {
          const passwordHash = await bcrypt.hash(newPassword, hashCost);
          const updatedUser = await User.findOneAndUpdate(
            { _id: payload.user },
            { $set: { passwordHash } },
            { new: true },
          ).select('-_id -passwordHash -isActive -__v');
          if (updatedUser) {
            res.status(200).send(updatedUser);
          } else {
            res.status(400).send({ errorMessage: 'User password is not updated!' });
          }
        } else {
          res.status(400).send({ errorMessage: 'User is not found.' });
        }
      } catch (e) {
        res.status(400).send({ errorMessage: e });
      }
    }
  });

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.clearCookie('jwt');
  res.status(200).send();
});

module.exports = router;
