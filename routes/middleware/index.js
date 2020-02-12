const { getRecaptchaStatus } = require('../helpers/helpers');

const captchaMiddleware = (action) => async (req, res, next) => {
  const status = await getRecaptchaStatus(req.query.token);
  if (status.success && status.action === action) {
    next();
  } else {
    res.status(400).send({ errorMessage: 'Recaptcha token is not verified!' });
  }
};

module.exports = {
  captchaMiddleware,
};
