const passport = require('passport');
const passportJWT = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const config = require('../config/config');
const User = require('../../models/User');

const JWTStrategy = passportJWT.Strategy;

const localStrategy = () => {
  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    session: false,
  }, async (username, password, done) => {
    const user = await User.findOne({ username });
    if (user && user.isActive && user.verifyPassword(password)) {
      return done(null, user._id);
    }
    return done(null, false);
  }));
};

const jwtStrategy = () => {
  passport.use(new JWTStrategy({
    jwtFromRequest: (req) => req.cookies.jwt,
    secretOrKey: config.jwt.secret,
    // ignoreExpiration: false,
  },
  (jwtPayload, done) => done(null, jwtPayload)));
};

module.exports = {
  localStrategy,
  jwtStrategy,
};
